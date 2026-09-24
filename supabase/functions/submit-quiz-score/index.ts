import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

/**
 * Salva a pontuação de uma partida controlada pelo servidor (quiz-session).
 * O navegador envia apenas o ID da partida; a pontuação é o número de
 * perguntas distintas que foram apresentadas E respondidas corretamente,
 * conforme validado no servidor. Cada partida só pode ser salva uma vez.
 */
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

    const body = await req.json().catch(() => null);
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json({ error: "Invalid payload" }, 400);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: session } = await admin
      .from("quiz_sessions")
      .select("id, user_id, finished_at, final_score")
      .eq("id", sessionId)
      .maybeSingle();
    if (!session || session.user_id !== userId) return json({ error: "Invalid session" }, 403);

    // Salvamento repetido da mesma partida: não conta de novo.
    if (session.finished_at) {
      return json({ score: session.final_score ?? 0, saved: true, duplicate: true });
    }

    const { count } = await admin
      .from("quiz_session_questions")
      .select("question_id", { count: "exact", head: true })
      .eq("session_id", sessionId)
      .eq("is_correct", true);
    let score = count ?? 0;
    if (score > 1000) score = 1000;

    // Fecha a partida de forma atômica (só o primeiro pedido vence).
    const { data: closed } = await admin
      .from("quiz_sessions")
      .update({ finished_at: new Date().toISOString(), final_score: score })
      .eq("id", sessionId)
      .is("finished_at", null)
      .select("id");
    if (!closed || closed.length === 0) return json({ score, saved: true, duplicate: true });

    if (score <= 0) return json({ score: 0, saved: false });

    const { data: profile } = await admin.from("profiles").select("full_name, role").eq("id", userId).single();
    const { data: savedScore, error: saveErr } = await admin.rpc("record_quiz_high_score", {
      _user_id: userId,
      _user_name: profile?.full_name ?? "",
      _user_role: profile?.role ?? "aluno",
      _score: score,
    });
    if (saveErr) {
      console.error("High score save error", saveErr);
      // Reabre para permitir nova tentativa de salvar.
      await admin.from("quiz_sessions").update({ finished_at: null, final_score: null }).eq("id", sessionId);
      return json({ error: "Could not save score" }, 500);
    }

    return json({ score, highScore: savedScore, saved: true });
  } catch (e) {
    console.error("submit-quiz-score error", e);
    return json({ error: "Internal error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
