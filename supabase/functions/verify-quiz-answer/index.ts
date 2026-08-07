import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

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

/**
 * Reveals the correct index of a dynamic (AI generated) question ONLY after
 * the player has committed to an answer. The correct index is never sent with
 * the question itself; it is recovered here from the signed token.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON =
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);
    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const id = String(body?.id ?? "");
    const token = String(body?.token ?? "");
    const selected = Number(body?.selected);

    if (!id.startsWith("dyn_") || id.length > 64) return json({ error: "bad_id" }, 400);
    if (!token || token.length > 200) return json({ error: "bad_token" }, 400);
    if (!Number.isInteger(selected) || selected < 0 || selected > 3) {
      return json({ error: "bad_selected" }, 400);
    }

    let correct = -1;
    for (let i = 0; i < 4; i++) {
      const expected = await signHmac(`${id}|${i}`, SECRET);
      if (expected === token) {
        correct = i;
        break;
      }
    }
    if (correct < 0) return json({ error: "invalid_token" }, 400);

    return json({ correct, isCorrect: selected === correct });
  } catch (e) {
    console.error("verify-quiz-answer error", e);
    return json({ error: "internal" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
