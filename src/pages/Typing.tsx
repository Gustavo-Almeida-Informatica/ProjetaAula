import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Keyboard, Trophy, RotateCcw, ArrowLeft, Play, LogIn, Medal } from "lucide-react";
import { Seo } from "@/components/Seo";
import KeyboardPosture from "@/components/KeyboardPosture";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  KEYBOARD_LAYOUTS,
  KeyboardLayoutId,
  getLayout,
  pickRandomText,
  TypingText,
} from "@/lib/typingTexts";

type Screen = "layout" | "posture" | "test" | "ranking";

interface RankRow {
  user_id: string;
  user_name: string;
  wpm: number;
  accuracy: number;
  points: number;
}

const LS_KEY = "projeta-aula:keyboard-layout";

export default function Typing() {
  const { user, profile, loading: authLoading } = useAuth();
  const [screen, setScreen] = useState<Screen>("layout");
  const [layoutId, setLayoutId] = useState<KeyboardLayoutId | null>(null);
  const layout = getLayout(layoutId);

  // ---------- layout preference ----------
  useEffect(() => {
    let cancelled = false;
    const local = localStorage.getItem(LS_KEY) as KeyboardLayoutId | null;
    const apply = (id: KeyboardLayoutId | null) => {
      if (cancelled || !id) return;
      setLayoutId(id);
      setScreen("posture");
    };
    if (user) {
      supabase
        .from("profiles")
        .select("keyboard_layout")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          apply((data?.keyboard_layout as KeyboardLayoutId) ?? local);
        });
    } else {
      apply(local);
    }
    return () => {
      cancelled = true;
    };
  }, [user]);

  const chooseLayout = async (id: KeyboardLayoutId) => {
    setLayoutId(id);
    localStorage.setItem(LS_KEY, id);
    setScreen("posture");
    if (user) {
      await supabase.from("profiles").update({ keyboard_layout: id }).eq("id", user.id);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-16">
      <Seo
        title="Digitação — Pratique com conteúdo do site | Projeta Aula"
        description="Aprenda a posição correta dos dedos no teclado e treine sua digitação com textos de hardware, software e história da informática. Ranking por PPM e precisão."
        path="/digitacao"
      />

      <section className="container max-w-4xl py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-primary/8 border border-primary/15 text-primary text-xs font-medium">
            <Keyboard className="w-3.5 h-3.5" />
            Mundo da Digitação
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight">
            <span className="gradient-warm-text">Prática</span>{" "}
            <span className="text-foreground">de Digitação</span>
          </h1>
        </div>

        {authLoading ? (
          <div className="glass p-8 text-center text-sm text-muted-foreground">Carregando…</div>
        ) : !user ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 text-center space-y-4"
          >
            <LogIn className="w-8 h-8 text-primary mx-auto" />
            <h2 className="font-display text-xl font-bold text-foreground">
              Entre para praticar digitação
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              O teste de digitação salva seu layout de teclado e seus resultados no ranking, por isso
              é necessário estar logado.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-warm text-primary-foreground text-sm font-semibold warm-glow-sm"
            >
              <LogIn className="w-4 h-4" /> Entrar / Criar Conta
            </Link>
          </motion.div>
        ) : (
          <>
            {screen === "layout" && <LayoutScreen onChoose={chooseLayout} />}
            {screen === "posture" && (
              <PostureScreen
                layoutName={layout.name}
                layout={layout}
                onStart={() => setScreen("test")}
                onChangeLayout={() => setScreen("layout")}
              />
            )}
            {screen === "test" && (
              <TestScreen
                supportsAccents={layout.supportsAccents}
                userId={user?.id ?? null}
                userName={profile?.full_name ?? ""}
                onBack={() => setScreen("posture")}
                onRanking={() => setScreen("ranking")}
              />
            )}
            {screen === "ranking" && <RankingScreen onBack={() => setScreen("posture")} />}
          </>
        )}

      </section>
    </div>
  );
}

/* ---------------- Tela 1 ---------------- */
function LayoutScreen({ onChoose }: { onChoose: (id: KeyboardLayoutId) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 md:p-8">
      <h2 className="font-display text-xl font-bold mb-1">Qual layout de teclado você usa?</h2>
      <p className="text-sm text-muted-foreground mb-6">
        A escolha fica salva na sua conta para não perguntarmos de novo.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {KEYBOARD_LAYOUTS.map((l) => (
          <button
            key={l.id}
            onClick={() => onChoose(l.id)}
            className="text-left p-4 rounded-xl border border-border/60 bg-secondary/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-foreground">{l.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">
                {l.extraKey}
              </span>
            </div>
            <span className="text-xs text-muted-foreground leading-relaxed">{l.description}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------------- Tela 2 ---------------- */
function PostureScreen({
  layout,
  layoutName,
  onStart,
  onChangeLayout,
}: {
  layout: ReturnType<typeof getLayout>;
  layoutName: string;
  onStart: () => void;
  onChangeLayout: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass p-5 md:p-8 space-y-6">
      <div className="flex justify-center">
        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
          Layout: {layoutName}
        </span>
      </div>

      <KeyboardPosture layout={layout} />

      <div className="grid md:grid-cols-2 gap-5">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
          <h2 className="font-semibold text-sm mb-2 text-foreground">Onde começar</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            As teclas <strong className="text-primary">F</strong> e{" "}
            <strong className="text-primary">J</strong> têm um pequeno relevo. Apoie nelas os dois
            indicadores e distribua os outros dedos em <strong>A S D F</strong> (mão esquerda) e{" "}
            <strong>J K L {layout.extraKey}</strong> (mão direita). Essa é a home row, seu ponto de
            partida.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
          <h2 className="font-semibold text-sm mb-2 text-foreground">Regras básicas</h2>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
            <li>Sempre volte para a home row depois de cada tecla</li>
            <li>Use o polegar para a barra de espaço</li>
            <li>Não olhe para o teclado enquanto digita</li>
            <li>Mantenha os pulsos relaxados e as costas eretas</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onStart}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg gradient-warm text-primary-foreground text-sm font-semibold warm-glow-sm hover:scale-[1.02] transition-all"
        >
          <Play className="w-4 h-4" /> Entrar no teste de digitação
        </button>
        <button
          onClick={onChangeLayout}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Keyboard className="w-4 h-4" /> Escolher outro layout de teclado
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------- Tela 3 ---------------- */
function TestScreen({
  supportsAccents,
  userId,
  userName,
  onBack,
  onRanking,
}: {
  supportsAccents: boolean;
  userId: string | null;
  userName: string;
  onBack: () => void;
  onRanking: () => void;
}) {
  const [text, setText] = useState<TypingText>(() => pickRandomText(supportsAccents));
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [remaining, setRemaining] = useState(text.estimatedSeconds);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const words = useMemo(() => text.content.split(" "), [text]);

  // Estado derivado direto do texto digitado (sempre sincronizado, sem atraso):
  // - `completed` são as palavras já finalizadas (seguidas de espaço)
  // - `currentWord` é a palavra sendo digitada agora (nunca marcada como errada)
  const { completed, currentWord, currentIndex } = useMemo(() => {
    const tokens = typed.split(" ");
    const done = tokens.slice(0, -1);
    return {
      completed: done,
      currentWord: tokens[tokens.length - 1] ?? "",
      currentIndex: done.length,
    };
  }, [typed]);

  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          setFinished(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, finished]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentIndex]);

  const handleChange = (value: string) => {
    if (finished) return;
    // Normaliza quebras de linha e espaços repetidos para que cada palavra
    // digitada continue alinhada com a palavra correspondente do texto alvo.
    const clean = value.replace(/[\r\n\t]+/g, " ").replace(/ {2,}/g, " ").replace(/^ +/, "");
    if (!started && clean.length > 0) setStarted(true);
    setTyped(clean);
    if (clean.split(" ").slice(0, -1).length >= words.length) setFinished(true);
  };

  const stats = useMemo(() => {
    // No fim do teste conta também a última palavra (mesmo sem espaço final).
    const evaluated = finished
      ? typed.trim().length
        ? typed.trim().split(" ")
        : []
      : completed;
    let correct = 0;
    let wrong = 0;
    evaluated.forEach((w, i) => {
      if (i >= words.length) return;
      if (w === words[i]) correct++;
      else wrong++;
    });
    const usedSeconds = Math.max(1, text.estimatedSeconds - remaining);
    const wpm = Math.round(correct / (usedSeconds / 60));
    const total = correct + wrong;
    const accuracy = total ? Math.round((correct / total) * 100) : 0;
    return { correct, wrong, wpm, accuracy, points: Math.round((wpm * accuracy) / 100) };
  }, [finished, typed, completed, words, remaining, text.estimatedSeconds]);


  const saveScore = useCallback(async () => {
    if (!userId || saved) return;
    const { error } = await supabase.from("typing_scores").insert({
      user_id: userId,
      user_name: userName,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      points: stats.points,
      correct_words: stats.correct,
      wrong_words: stats.wrong,
    });
    if (error) toast.error("Não foi possível salvar seu resultado.");
    else {
      setSaved(true);
      toast.success("Resultado salvo no ranking!");
    }
  }, [userId, saved, userName, stats]);

  useEffect(() => {
    if (finished) saveScore();
  }, [finished, saveScore]);

  const restart = () => {
    const next = pickRandomText(supportsAccents);
    setText(next);
    setTyped("");
    setStarted(false);
    setFinished(false);
    setSaved(false);
    setRemaining(next.estimatedSeconds);
    inputRef.current?.focus();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass p-5 md:p-8 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs text-muted-foreground">Texto de {text.source}</p>
          <h2 className="font-semibold text-sm text-foreground">{text.title}</h2>
        </div>
        <div
          className={`font-display text-2xl font-bold tabular-nums ${
            remaining <= 10 ? "text-destructive" : "text-primary"
          }`}
          aria-live="polite"
        >
          {String(Math.floor(remaining / 60)).padStart(2, "0")}:
          {String(remaining % 60).padStart(2, "0")}
        </div>
      </div>

      <div
        ref={areaRef}
        className="max-h-48 overflow-y-auto p-4 rounded-xl bg-secondary/30 border border-border/50 leading-loose text-base"
      >
        {words.map((w, i) => {
          const isCurrent = i === currentIndex && !finished;
          const typedWord = completed[i];
          // Palavra ainda não digitada => "pending" (nunca vermelha).
          const state =
            typedWord === undefined ? "pending" : typedWord === w ? "ok" : "bad";
          // Na palavra atual, avisa só se o que já foi digitado não bate com o início dela.
          const currentMismatch = isCurrent && currentWord.length > 0 && !w.startsWith(currentWord);
          return (
            <span
              key={i}
              ref={isCurrent ? activeRef : undefined}
              className={`rounded-sm ${
                isCurrent
                  ? currentMismatch
                    ? "bg-red-500/25 text-red-300"
                    : "bg-yellow-400/30 text-foreground"
                  : state === "ok"
                  ? "text-green-400"
                  : state === "bad"
                  ? "text-red-400"
                  : "text-muted-foreground"
              }`}
            >
              {i > 0 ? " " : ""}
              {w}
            </span>
          );
        })}
      </div>

      <textarea
        ref={inputRef}
        value={typed}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        disabled={finished}

        rows={3}
        autoFocus
        spellCheck={false}
        aria-label="Campo de digitação do teste"
        placeholder="Comece a digitar aqui — o cronômetro inicia no primeiro caractere."
        className="w-full p-3 rounded-xl bg-background/60 border border-border/60 text-sm resize-none focus:outline-none focus:border-primary/60"
      />

      {finished && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="Palavras certas" value={stats.correct} tone="text-green-400" />
            <Stat label="Palavras erradas" value={stats.wrong} tone="text-red-400" />
            <Stat label="PPM" value={stats.wpm} tone="text-primary" />
          </div>
          {!userId && (
            <p className="text-xs text-center text-muted-foreground">
              <Link to="/login" className="text-primary underline">
                Entre na sua conta
              </Link>{" "}
              para salvar seu resultado no ranking.
            </p>
          )}
          <div className="flex justify-center">
            <button
              onClick={onRanking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-warm text-primary-foreground text-sm font-semibold warm-glow-sm hover:scale-[1.02] transition-all"
            >
              <Trophy className="w-4 h-4" /> Ver ranking
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
        <button
          onClick={restart}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reiniciar teste
        </button>
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para a explicação
        </button>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="p-3 rounded-xl bg-secondary/30 border border-border/50">
      <div className={`font-display text-2xl font-bold ${tone}`}>{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------------- Tela 4 ---------------- */
function RankingScreen({ onBack }: { onBack: () => void }) {
  const [rows, setRows] = useState<RankRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("typing_scores")
      .select("user_id, user_name, wpm, accuracy, points")
      .order("points", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        const best = new Map<string, RankRow>();
        (data ?? []).forEach((r) => {
          const key = r.user_id || r.user_name;
          if (!best.has(key)) best.set(key, r as RankRow);
        });
        setRows([...best.values()].sort((a, b) => b.points - a.points).slice(0, 50));
        setLoading(false);
      });
  }, []);

  const medal = (i: number) =>
    i === 0
      ? "text-yellow-400 border-yellow-400/40 bg-yellow-400/10"
      : i === 1
      ? "text-slate-300 border-slate-300/40 bg-slate-300/10"
      : i === 2
      ? "text-amber-600 border-amber-600/40 bg-amber-600/10"
      : "text-muted-foreground border-border/50";

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass p-5 md:p-8 space-y-5">
      <h2 className="font-display text-xl font-bold flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" /> Ranking de digitação
      </h2>
      <p className="text-xs text-muted-foreground -mt-3">
        Pontuação = PPM × precisão, para valorizar velocidade e acerto juntos.
      </p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ninguém registrou resultado ainda. Seja o primeiro!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground text-left">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Usuário</th>
                <th className="py-2 pr-3 text-right">PPM</th>
                <th className="py-2 pr-3 text-right">Precisão</th>
                <th className="py-2 text-right">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.user_id + i} className="border-t border-border/40">
                  <td className="py-2 pr-3">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full border text-xs font-bold ${medal(i)}`}
                    >
                      {i < 3 ? <Medal className="w-3.5 h-3.5" /> : i + 1}
                    </span>
                  </td>
                  <td className="py-2 pr-3 text-foreground">{r.user_name || "Anônimo"}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.wpm}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.accuracy}%</td>
                  <td className="py-2 text-right tabular-nums font-semibold text-primary">{r.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center pt-1">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </button>
      </div>
    </motion.div>
  );
}
