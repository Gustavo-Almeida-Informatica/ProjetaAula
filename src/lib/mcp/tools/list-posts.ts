import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_community_posts",
  title: "Listar posts da comunidade",
  description: "Lista as postagens mais recentes da comunidade do Projeta Aula, com filtro opcional por hashtag ou texto.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).default(10).describe("Quantidade de posts (1-50)."),
    search: z.string().trim().min(1).max(100).optional().describe("Texto para buscar no título ou conteúdo."),
    hashtag: z.string().trim().min(1).max(50).optional().describe("Hashtag (sem #) para filtrar."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, search, hashtag }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("community_posts")
      .select("id, title, content, hashtags, user_name, user_role, likes_count, views_count, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);
    if (hashtag) query = query.contains("hashtags", [hashtag.replace(/^#/, "")]);
    if (search) query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});
