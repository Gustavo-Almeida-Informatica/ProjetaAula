import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { ANSWER_KEY } from "./answers.ts";

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
    if (!Array.isArray(answers) || answers.length === 0 || answers.length > 1000) {
      return json({ error: "Invalid payload" }, 400);
    }

    // Compute the score: count of consecutive correct answers from the start
    // (the quiz resets on first wrong answer, so all submitted answers must be correct)
    let score = 0;
    const seen = new Set<number>();
    for (const a of answers) {
      const id = Number(a?.id);
      const selected = Number(a?.selected);
      if (!Number.isInteger(id) || !Number.isInteger(selected)) break;
      if (seen.has(id)) break; // disallow duplicates inflating the score
      seen.add(id);
      const correct = ANSWER_KEY[id];
      if (correct === undefined || correct !== selected) break;
      score += 1;
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
