import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";

type AuthMode = "login" | "register";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawNext = searchParams.get("next") ?? "";
  // Only allow same-origin relative paths (blocks //evil.com, /\evil.com and absolute URLs).
  const nextPath = /^\/(?![/\\])[^\s]*$/.test(rawNext) ? rawNext : "/";
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const trimmedEmail = email.trim().toLowerCase();
  const trimmedName = fullName.trim();
  const isRegisterMode = mode === "register";
  const activeActionLabel = isRegisterMode ? "Criar Conta" : "Entrar";
  const activeActionDescription = isRegisterMode
    ? "Modo cadastro ativo: este botão cria sua conta e libera o acesso ao site."
    : "Modo login ativo: este botão entra com uma conta que já existe.";

  useEffect(() => {
    if (!loading && session) {
      navigate(nextPath, { replace: true });
    }
  }, [loading, session, navigate, nextPath]);

  const validatePassword = (pw: string): string | null => {
    if (pw.length < 6) return "A senha precisa de pelo menos 6 caracteres.";
    if (pw.length > 72) return "A senha pode ter no máximo 72 caracteres.";
    return null;
  };

  const validateEmail = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return "Informe seu e-mail.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(trimmed)) return "E-mail inválido. Confira e tente novamente.";
    if (trimmed.length > 255) return "E-mail muito longo.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      return;
    }

    if (isRegisterMode) {
      if (!trimmedName) {
        toast.error("Informe seu nome completo.");
        return;
      }
      if (trimmedName.length < 2) {
        toast.error("Nome muito curto.");
        return;
      }
      if (trimmedName.length > 120) {
        toast.error("Nome muito longo (máx. 120 caracteres).");
        return;
      }
    }

    const pwError = validatePassword(password);
    if (pwError) {
      toast.error(pwError);
      return;
    }

    setSubmitting(true);

    try {
      if (isRegisterMode) {
        toast.info("Criando sua conta...");
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: { full_name: trimmedName },
          },
        });
        if (error) throw error;

        if (data.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .update({ full_name: trimmedName })
            .eq("id", data.user.id);

          if (profileError) console.error("Profile update error:", profileError);
        }

        if (!data.session) {
          const { error: signInErr } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
          if (signInErr) throw signInErr;
        }

        toast.success("Conta criada! Entrando no site...");
        navigate("/", { replace: true });
      } else {
        toast.info("Entrando na sua conta...");
        const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
        if (error) throw error;
        toast.success("Login realizado! Entrando no site...");
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      const code = err?.code;
      const msg = typeof err?.message === "string" ? err.message : "";

      let friendly: string;
      if (code === "weak_password" || /weak|pwned|known to be/i.test(msg)) {
        friendly =
          "Essa senha é muito fraca. Use pelo menos 6 caracteres e escolha uma senha diferente.";
      } else if (code === "user_already_exists" || /already registered|already exists/i.test(msg)) {
        setMode("login");
        friendly = "Este e-mail já está cadastrado. Mudei para Entrar: informe a senha dessa conta.";
      } else if (/password/i.test(msg) && /(short|6|8|character|caractere)/i.test(msg)) {
        friendly = "A senha precisa de pelo menos 6 caracteres.";
      } else if (code === "email_not_confirmed" || /email not confirmed|not confirmed/i.test(msg)) {
        friendly = "A confirmação por e-mail foi desativada para novos cadastros. Crie a conta novamente ou use outro e-mail.";
      } else if (code === "invalid_credentials" || /invalid login|invalid credentials/i.test(msg)) {
        friendly = isRegisterMode
          ? "Este e-mail já pode existir. Tente entrar com ele ou use outro e-mail para criar uma nova conta."
          : "E-mail ou senha inválidos. Confira os dados e tente novamente.";
      } else if (/email/i.test(msg) && /invalid/i.test(msg)) {
        friendly = "E-mail inválido. Confira e tente novamente.";
      } else {
        friendly =
          isRegisterMode
            ? "Não foi possível criar a conta. Verifique os dados e tente novamente."
            : "E-mail ou senha inválidos.";
      }
      toast.error(friendly);
    } finally {
      setSubmitting(false);
    }
  };


  const handleGoogleLogin = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri:
        nextPath !== "/"
          ? `${window.location.origin}/login?next=${encodeURIComponent(nextPath)}`
          : window.location.origin,
    });
    if (result.error) toast.error(result.error.message);
  };

  if (loading || session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-warm font-display text-2xl gradient-warm-text">Projeta Aula</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background relative">
      <Seo
        title="Entrar — Projeta Aula"
        description="Acesse sua conta de aluno ou professor do Projeta Aula para estudar informática básica do CETEP."
        path="/login"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm glass p-8 space-y-6 relative"
      >
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold gradient-warm-text">Projeta Aula</h1>
          <p className="text-muted-foreground text-xs mt-2">Informática para reforçar seu conhecimento no CETEP</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg gradient-warm text-primary-foreground text-sm font-semibold warm-glow-sm hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" opacity=".9" />
            <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" opacity=".7" />
            <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" opacity=".85" />
          </svg>
          Continuar com Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">ou com e-mail</span>
          </div>
        </div>

        <div className="flex rounded-lg overflow-hidden border border-border" aria-label="Escolha entre entrar ou criar conta">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              !isRegisterMode ? "gradient-warm text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={!isRegisterMode}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              isRegisterMode ? "gradient-warm text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={isRegisterMode}
          >
            Criar Conta
          </button>
        </div>

        <div className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 flex items-start gap-2" role="status" aria-live="polite">
          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-foreground">Ação selecionada: {activeActionLabel}</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{activeActionDescription}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegisterMode && (
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Seu nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                maxLength={120}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type={showPw ? "text" : "password"}
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {isRegisterMode && (
            <p className="text-[11px] text-muted-foreground -mt-1 px-1">
              Senha simples permitida: use pelo menos 6 caracteres. Pode ser só letras ou só números.
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-secondary disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isRegisterMode ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            {submitting ? "Carregando..." : activeActionLabel}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
