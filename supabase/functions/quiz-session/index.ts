import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { ANSWER_TEXT, normalizeAnswer } from "../_shared/quizAnswers.ts";

/**
 * Controla a partida do Quiz no servidor:
 *  - start:   cria uma partida para o usuário autenticado.
 *  - present: registra que uma pergunta foi realmente mostrada.
 *  - answer:  valida a resposta NO SERVIDOR (uma única vez por pergunta).
 * A pontuação final é calculada em submit-quiz-score a partir destes registros.
 */
const MIN_ANSWER_MS = 400; // tempo mínimo entre mostrar e responder
const SESSION_MAX_MS = 6 * 60 * 60 * 1000;

async function signHmac(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
  let str = "";
  for (const b of sig) str += String.fromCharCode(b);
  return btoa(str).replace(/=+$/, "");
}

async function dynamicCorrect(id: string, token: string, secret: string): Promise<number> {
  if (!id.startsWith("dyn_") || id.length > 64 || !token || token.length > 200) return -1;
  for (let i = 0; i < 4; i++) {
    if ((await signHmac(`${id}|${i}`, secret)) === token) return i;
  }
  return -1;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;
    const userClient = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: authHeader } } });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
    const userId = userData.user.id;
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

    const body = await req.json().catch(() => null);
    const action = body?.action;

    if (action === "start") {
      const { data, error } = await admin.from("quiz_sessions").insert({ user_id: userId }).select("id").single();
      if (error) return json({ error: "Could not start" }, 500);
      return json({ sessionId: data.id });
    }

    const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
    const questionId = body?.questionId === undefined || body?.questionId === null ? "" : String(body.questionId);
    if (!/^[0-9a-f-]{36}$/i.test(sessionId) || !questionId || questionId.length > 64) {
      return json({ error: "Invalid payload" }, 400);
    }

    const { data: session } = await admin
      .from("quiz_sessions")
      .select("id, user_id, created_at, failed_at, finished_at")
      .eq("id", sessionId)
      .maybeSingle();
    if (!session || session.user_id !== userId) return json({ error: "Invalid session" }, 403);
    if (session.finished_at || session.failed_at) return json({ error: "Session closed" }, 409);
    if (Date.now() - new Date(session.created_at).getTime() > SESSION_MAX_MS) {
      return json({ error: "Session expired" }, 409);
    }

    const isDynamic = questionId.startsWith("dyn_");
    const token = typeof body?.token === "string" ? body.token : "";

    if (action === "present") {
      if (isDynamic) {
        if ((await dynamicCorrect(questionId, token, SERVICE_ROLE)) < 0) return json({ error: "Unknown question" }, 400);
      } else if (ANSWER_TEXT[questionId] === undefined) {
        return json({ error: "Unknown question" }, 400);
      }
      await admin
        .from("quiz_session_questions")
        .upsert({ session_id: sessionId, question_id: questionId }, { onConflict: "session_id,question_id", ignoreDuplicates: true });
      return json({ ok: true });
    }

    if (action === "answer") {
      const { data: row } = await admin
        .from("quiz_session_questions")
        .select("presented_at, answered_at")
        .eq("session_id", sessionId)
        .eq("question_id", questionId)
        .maybeSingle();
      if (!row) return json({ error: "Question not presented" }, 409);
      if (row.answered_at) return json({ error: "Already answered" }, 409);
      if (Date.now() - new Date(row.presented_at).getTime() < MIN_ANSWER_MS) {
        return json({ error: "Too fast" }, 429);
      }

      let isCorrect = false;
      let correct: number | undefined;
      let correctText: string | undefined;
      if (isDynamic) {
        const selected = Number(body?.selected);
        const c = await dynamicCorrect(questionId, token, SERVICE_ROLE);
        if (c < 0 || !Number.isInteger(selected) || selected < 0 || selected > 3) return json({ error: "Invalid answer" }, 400);
        correct = c;
        isCorrect = selected === c;
      } else {
        const selectedText = typeof body?.selectedText === "string" ? body.selectedText : "";
        if (!selectedText || selectedText.length > 500) return json({ error: "Invalid answer" }, 400);
        isCorrect = normalizeAnswer(selectedText) === normalizeAnswer(ANSWER_TEXT[questionId]);
        correctText = ANSWER_TEXT[questionId];
      }

      // Marca como respondida só se ainda não estava (evita corrida/duplo envio).
      const { data: updated } = await admin
        .from("quiz_session_questions")
        .update({ answered_at: new Date().toISOString(), is_correct: isCorrect })
        .eq("session_id", sessionId)
        .eq("question_id", questionId)
        .is("answered_at", null)
        .select("question_id");
      if (!updated || updated.length === 0) return json({ error: "Already answered" }, 409);

      if (!isCorrect) {
        await admin.from("quiz_sessions").update({ failed_at: new Date().toISOString() }).eq("id", sessionId).is("failed_at", null);
      }
      return json({ isCorrect, correct, correctText });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("quiz-session error", e);
    return json({ error: "Internal error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
