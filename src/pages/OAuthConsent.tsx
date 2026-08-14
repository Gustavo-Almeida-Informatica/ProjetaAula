import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/** Blocks javascript:/data: style URLs before assigning window.location. */
function safeRedirect(url: unknown): string | null {
  if (typeof url !== "string" || !url) return null;
  if (/^\/(?![/\\])/.test(url)) return url;
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : null;
  } catch {
    return null;
  }
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("authorization_id ausente");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await (supabase.auth as any).oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = safeRedirect(data?.redirect_url ?? data?.redirect_to);
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const oauth = (supabase.auth as any).oauth;
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = safeRedirect(data?.redirect_url ?? data?.redirect_to);
    if (!target) {
      setBusy(false);
      return setError("O servidor de autorização não retornou um redirecionamento.");
    }
    window.location.href = target;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-8 shadow-xl">
        {error ? (
          <>
            <h1 className="font-display text-xl mb-2 gradient-warm-text">Não foi possível continuar</h1>
            <p className="text-sm text-muted-foreground">{error}</p>
          </>
        ) : !details ? (
          <p className="text-sm text-muted-foreground animate-pulse">Carregando autorização…</p>
        ) : (
          <>
            <h1 className="font-display text-xl mb-2 gradient-warm-text">
              Conectar {details.client?.name ?? "um aplicativo"} à sua conta
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Isso permite que {details.client?.name ?? "o aplicativo"} acesse o Projeta Aula como você.
            </p>
            <div className="flex gap-3">
              <button
                disabled={busy}
                onClick={() => decide(true)}
                className="flex-1 rounded-lg bg-primary text-primary-foreground py-2.5 font-medium disabled:opacity-60"
              >
                Aprovar
              </button>
              <button
                disabled={busy}
                onClick={() => decide(false)}
                className="flex-1 rounded-lg border border-border py-2.5 font-medium disabled:opacity-60"
              >
                Negar
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
