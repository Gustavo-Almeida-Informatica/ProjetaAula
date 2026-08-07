import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { getTypingText, stripDiacritics } from "./texts.ts";

/**
 * Receives the RAW typed text plus the elapsed time and computes
 * wpm / accuracy / points server-side. Clients can no longer report
 * their own numbers to the leaderboard.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON =
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
    const userId = userData.user.id;

    const body = await req.json().catch(() => ({}));
    const textId = String(body?.textId ?? "");
    const typedRaw = String(body?.typed ?? "");
    const elapsedSecondsRaw = Number(body?.elapsedSeconds);
    const accents = body?.accents !== false;

    const text = getTypingText(textId);
    if (!text) return json({ error: "Invalid text" }, 400);
    if (typedRaw.length > 5000) return json({ error: "Invalid payload" }, 400);
    if (!Number.isFinite(elapsedSecondsRaw)) {
      return json({ error: "Invalid payload" }, 400);
    }

    // The test always runs within the text's time budget; clamp to it so a
    // client cannot claim an absurdly short duration.
    const elapsed = Math.min(
      Math.max(Math.round(elapsedSecondsRaw), 1),
      text.estimatedSeconds,
    );

    const target = (accents ? text.content : stripDiacritics(text.content))
      .trim()
      .split(/\s+/);
    const typedWords = typedRaw
      .replace(/[\r\n\t]+/g, " ")
      .replace(/ {2,}/g, " ")
      .trim();
    const typed = typedWords.length ? typedWords.split(" ") : [];

    let correct = 0;
    let wrong = 0;
    typed.forEach((w, i) => {
      if (i >= target.length) return;
      if (w === target[i]) correct++;
      else wrong++;
    });

    const wpm = Math.max(0, Math.min(400, Math.round(correct / (elapsed / 60))));
    const total = correct + wrong;
    const accuracy = total ? Math.round((correct / total) * 100) : 0;
    const points = Math.round((wpm * accuracy) / 100);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: profile } = await admin
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .maybeSingle();

    const { error: insErr } = await admin.from("typing_scores").insert({
      user_id: userId,
      user_name: profile?.full_name ?? "",
      wpm,
      accuracy,
      points,
      correct_words: correct,
      wrong_words: wrong,
    });
    if (insErr) {
      console.error("typing score insert error", insErr);
      return json({ error: "Could not save score" }, 500);
    }

    return json({ saved: true, wpm, accuracy, points, correct, wrong });
  } catch (e) {
    console.error("submit-typing-score error", e);
    return json({ error: "Internal error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
