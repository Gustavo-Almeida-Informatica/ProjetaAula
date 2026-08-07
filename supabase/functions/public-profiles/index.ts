import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Returns only the public-safe profile fields (name, avatar, city, role)
 * for the given user ids. Runs with the service role so the `profiles`
 * table can stay fully private at the database level.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const raw = Array.isArray(body?.ids) ? body.ids : [];
    const ids = Array.from(
      new Set(
        raw
          .map((v: unknown) => String(v ?? "").trim())
          .filter((v: string) => UUID_RE.test(v)),
      ),
    ).slice(0, 100) as string[];

    if (ids.length === 0) return json({ profiles: [] });

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await admin
      .from("profiles")
      .select("id, full_name, avatar_url, city, role")
      .in("id", ids);

    if (error) {
      console.error("public-profiles query error", error);
      return json({ error: "Could not load profiles" }, 500);
    }

    const profiles = (data ?? []).map((p) => ({
      id: p.id,
      full_name: p.full_name ?? "",
      avatar_url: p.avatar_url ?? null,
      city: p.city ? p.city : null,
      role: p.role ?? null,
    }));

    return json({ profiles });
  } catch (e) {
    console.error("public-profiles error", e);
    return json({ error: "Internal error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
