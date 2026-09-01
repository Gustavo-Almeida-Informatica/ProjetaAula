import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { ANSWER_TEXT, normalizeAnswer } from "./answers.ts";

async function signHmac(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const bytes = new Uint8Array(sig);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/=+$/, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Unauthorized" }, 401);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;

    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
    const userId = userData.user.id;

    const body = await req.json().catch(() => null);
    const answers = body?.answers;
    if (!Array.isArray(answers) || answers.length === 0 || answers.length > 2000) {
      return json({ error: "Invalid payload" }, 400);
    }

    // Compute the score: count ALL correct answers (right/wrong may interleave).
    // Static questions: lookup in ANSWER_KEY by id.
    // Dynamic questions: id starts with "dyn_", entry must contain
    //   { id, selected, correct, token } and the token must HMAC-match.
    let score = 0;
    const seen = new Set<string>();
    for (const a of answers) {
      const idRaw = a?.id;
      const selected = Number(a?.selected);
      if (idRaw === undefined || idRaw === null) continue;
      const idStr = String(idRaw);
      if (seen.has(idStr)) continue;
      seen.add(idStr);
      if (!Number.isInteger(selected) || selected < 0 || selected > 3) continue;

      let isCorrect = false;
      if (idStr.startsWith("dyn_")) {
        const declaredCorrect = Number(a?.correct);
        const token = typeof a?.token === "string" ? a.token : "";
        if (!Number.isInteger(declaredCorrect) || declaredCorrect < 0 || declaredCorrect > 3) continue;
        if (!token) continue;
        const expected = await signHmac(`${idStr}|${declaredCorrect}`, SERVICE_ROLE);
        if (expected !== token) continue;
        isCorrect = selected === declaredCorrect;
      } else {
        const correctIdx = ANSWER_KEY[idStr];
        if (correctIdx === undefined) continue;
        isCorrect = selected === correctIdx;
      }

      if (isCorrect) score += 1;
    }


    if (score <= 0) {
      return json({ score: 0, saved: false });
    }
    if (score > 1000) score = 1000;

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: profile } = await admin
      .from("profiles")
      .select("full_name, role")
      .eq("id", userId)
      .single();

    const { error: insErr } = await admin.from("quiz_scores").insert({
      user_id: userId,
      user_name: profile?.full_name ?? "",
      user_role: profile?.role ?? "aluno",
      score,
    });
    if (insErr) {
      console.error("Insert error", insErr);
      return json({ error: "Could not save score" }, 500);
    }

    return json({ score, saved: true });
  } catch (e) {
    console.error("submit-quiz-score error", e);
    return json({ error: "Internal error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
