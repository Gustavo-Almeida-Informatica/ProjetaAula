import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_my_scores",
  title: "Minhas pontuações",
  description: "Retorna o recorde do quiz e os melhores resultados do teste de digitação do usuário autenticado.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId();
    const [quiz, typing] = await Promise.all([
      supabase
        .from("quiz_scores")
        .select("score, created_at")
        .eq("user_id", userId)
        .order("score", { ascending: false })
        .limit(1),
      supabase
        .from("typing_scores")
        .select("wpm, accuracy, points, correct_words, wrong_words, created_at")
        .eq("user_id", userId)
        .order("points", { ascending: false })
        .limit(5),
    ]);
    if (quiz.error) return { content: [{ type: "text", text: quiz.error.message }], isError: true };
    if (typing.error) return { content: [{ type: "text", text: typing.error.message }], isError: true };
    const result = { quiz_best: quiz.data?.[0] ?? null, typing_top: typing.data ?? [] };
    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
      structuredContent: result,
    };
  },
});
