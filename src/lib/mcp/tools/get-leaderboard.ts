import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_leaderboard",
  title: "Ranking",
  description: "Mostra o ranking do quiz ou do teste de digitação do Projeta Aula.",
  inputSchema: {
    board: z.enum(["quiz", "typing"]).describe("Qual ranking consultar."),
    limit: z.number().int().min(1).max(50).default(10).describe("Quantidade de posições (1-50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ board, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const query =
      board === "quiz"
        ? supabase
            .from("quiz_scores")
            .select("user_name, user_role, score, created_at")
            .order("score", { ascending: false })
            .limit(limit ?? 10)
        : supabase
            .from("typing_scores")
            .select("user_name, wpm, accuracy, points, created_at")
            .order("points", { ascending: false })
            .limit(limit ?? 10);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { board, entries: data ?? [] },
    };
  },
});
