import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_community_post",
  title: "Criar post na comunidade",
  description: "Publica uma nova postagem na comunidade do Projeta Aula em nome do usuário autenticado.",
  inputSchema: {
    title: z.string().trim().min(3).max(120).describe("Título da postagem."),
    content: z.string().trim().min(1).max(5000).describe("Conteúdo da postagem."),
    hashtags: z.array(z.string().trim().min(1).max(50)).max(10).optional().describe("Hashtags sem o símbolo #."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ title, content, hashtags }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId();
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", userId)
      .maybeSingle();
    const { data, error } = await supabase
      .from("community_posts")
      .insert({
        user_id: userId,
        title,
        content,
        hashtags: hashtags?.map((h) => h.replace(/^#/, "")) ?? [],
        user_name: profile?.full_name ?? "Usuário",
        user_role: profile?.role ?? "aluno",
      })
      .select("id, title, content, hashtags, created_at")
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Post criado: ${data.title}` }],
      structuredContent: { post: data },
    };
  },
});
