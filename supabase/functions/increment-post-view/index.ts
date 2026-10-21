import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Increments the view counter of community posts using the service role. */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Only signed-in users count as views.
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const raw = Array.isArray(body?.postIds) ? body.postIds : [];
    const ids = Array.from(
      new Set(
        raw
          .map((v: unknown) => String(v ?? "").trim())
          .filter((v: string) => UUID_RE.test(v)),
      ),
    ).slice(0, 50) as string[];

    if (ids.length === 0) return json({ updated: 0 });

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Cada usuário conta no máximo 1 visualização por post.
    let updated = 0;
    for (const id of ids) {
      const { data, error } = await admin.rpc("increment_post_view_once", { _post_id: id, _user_id: userData.user.id });
      if (error) console.error("increment_post_view_once error", id, error.message);
      else if (data === true) updated++;
    }

    return json({ updated });
  } catch (e) {
    console.error("increment-post-view error", e);
    return json({ error: "Internal error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
