import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getShuffledQuestions, QuizQuestion, resolveContentLink, ContentLink } from "@/lib/quizData";
import ScrollToTop from "@/components/ScrollToTop";
import { Seo } from "@/components/Seo";
import { toast } from "sonner";
import { Trophy, RotateCcw, CheckCircle, XCircle, Zap, Square, ArrowRight, Sparkles, Cpu, Download, BookOpen, Home, LogIn, Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface LeaderboardEntry {
  user_name: string;
  user_role: string;
  score: number;
}

interface AnswerRecord {
  id: number | string;
  selected: number;
  /** Texto da alternativa escolhida (as opções são embaralhadas no cliente). */
  selectedText?: string;
  correct?: number; // included for dynamic questions
  token?: string;   // HMAC for dynamic questions
}

/** Dynamic questions arrive without `correct`; it is revealed after answering. */
type PlayQuestion = Omit<QuizQuestion, "correct"> & { correct?: number };

const PREFETCH_THRESHOLD = 3; // start fetching dynamic when only this many static remain

export default function Quiz() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<PlayQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [countdown, setCountdown] = useState(0);
  const [generatingDynamic, setGeneratingDynamic] = useState(false);
  const advanceTimerRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const answersRef = useRef<AnswerRecord[]>([]);
  const saveInFlightRef = useRef<Promise<boolean> | null>(null);
  const pendingWrongRef = useRef<{ score: number; save: Promise<boolean> } | null>(null);
  const endingAttemptRef = useRef(false);
  const fetchingRef = useRef(false);
  const usedTopicsRef = useRef<string[]>([]);

  const clearTimers = () => {
    if (advanceTimerRef.current) { window.clearTimeout(advanceTimerRef.current); advanceTimerRef.current = null; }
    if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
  };

  const startQuiz = useCallback(() => {
    clearTimers();
    setQuestions(getShuffledQuestions());
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setCountdown(0);
    setGeneratingDynamic(false);
    answersRef.current = [];
    usedTopicsRef.current = [];
    fetchingRef.current = false;
  }, []);

  useEffect(() => {
    startQuiz();
    fetchLeaderboard();
    return () => clearTimers();
  }, [startQuiz]);

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("quiz_scores")
      .select("user_name, user_role, score, user_id")
      .order("score", { ascending: false });
    if (data) {
      const bestByUser = new Map<string, LeaderboardEntry>();
      for (const row of data) {
        const key = row.user_id || row.user_name;
        if (!bestByUser.has(key) || row.score > bestByUser.get(key)!.score) {
          bestByUser.set(key, { user_name: row.user_name, user_role: row.user_role, score: row.score });
        }
      }
      const sorted = Array.from(bestByUser.values()).sort((a, b) => b.score - a.score).slice(0, 10);
      setLeaderboard(sorted);
    }
  };

  const saveScore = (answersSnapshot: AnswerRecord[] = [...answersRef.current]): Promise<boolean> => {
    if (!user || !profile || answersSnapshot.length === 0) return Promise.resolve(false);
    if (saveInFlightRef.current) return saveInFlightRef.current;

    const request = (async () => {
      const { error } = await supabase.functions.invoke("submit-quiz-score", {
        body: { answers: answersSnapshot },
      });
      if (error) {
        console.error("Score save failed", error);
        toast.error("Não foi possível salvar sua pontuação. Tente novamente.");
        return false;
      }
      await fetchLeaderboard();
      return true;
    })();

    saveInFlightRef.current = request;
    void request.finally(() => {
      if (saveInFlightRef.current === request) saveInFlightRef.current = null;
    });
    return request;
  };

  const finishAttempt = async (scoreSnapshot: number, savePromise: Promise<boolean>) => {
    if (endingAttemptRef.current) return;
    endingAttemptRef.current = true;
    clearTimers();
    const saved = await savePromise;
    if (saved) {
      toast.error(`Errou! Sua pontuação: ${scoreSnapshot}. O quiz reinicia!`);
      pendingWrongRef.current = null;
      startQuiz();
    }
    endingAttemptRef.current = false;
  };

  const fetchDynamicQuestion = useCallback(async (): Promise<PlayQuestion | null> => {
    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz-question", {
        body: { avoid: usedTopicsRef.current.slice(-8) },
      });
      if (error || !data || data.error) {
        console.error("dynamic question error", error || data?.error);
        return null;
      }
      const q: PlayQuestion = {
        id: String(data.id),
        category: String(data.category ?? "IA"),
        question: String(data.question),
        options: data.options,
        // `correct` is intentionally NOT returned by the server for dynamic
        // questions — it is only revealed after the player answers.
        explanation: String(data.explanation),
        token: String(data.token),
        dynamic: true,
        contentLink: data.contentLink && typeof data.contentLink === "object" ? data.contentLink : undefined,
      };
      // Track topic seed (first 60 chars of question) to reduce repetition
      usedTopicsRef.current.push(q.question.slice(0, 60));
      return q;
    } catch (e) {
      console.error("dynamic question fetch failed", e);
      return null;
    }
  }, []);

  // Prefetch dynamic questions in background when remaining < threshold
  useEffect(() => {
    if (!user) return;
    const remaining = questions.length - currentIndex - 1;
    if (remaining > PREFETCH_THRESHOLD || fetchingRef.current) return;
    fetchingRef.current = true;
    (async () => {
      const q = await fetchDynamicQuestion();
      if (q) {
        setQuestions((prev) => [...prev, q]);
      }
      fetchingRef.current = false;
    })();
  }, [currentIndex, questions.length, fetchDynamicQuestion, user]);

  const goNext = useCallback(async () => {
    clearTimers();
    setCountdown(0);
    setSelected(null);
    setShowResult(false);

    // If we're at the very end and have no dynamic queued, fetch one inline.
    if (currentIndex + 1 >= questions.length) {
      setGeneratingDynamic(true);
      const q = await fetchDynamicQuestion();
      setGeneratingDynamic(false);
      if (q) {
        setQuestions((prev) => [...prev, q]);
        setCurrentIndex((i) => i + 1);
        return;
      }
      // Fallback: reshuffle static if dynamic fails
      toast.info("Reembaralhando perguntas...");
      setQuestions(getShuffledQuestions());
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((i) => i + 1);
  }, [currentIndex, questions.length, fetchDynamicQuestion]);

  const handleStop = async () => {
    if (endingAttemptRef.current) return;
    endingAttemptRef.current = true;
    clearTimers();
    if (score > 0) {
      const saved = await saveScore([...answersRef.current]);
      if (!saved) {
        endingAttemptRef.current = false;
        return;
      }
      toast.info(`Você parou com ${score} ponto${score > 1 ? "s" : ""}! Sua pontuação foi salva.`);
    }
    startQuiz();
    endingAttemptRef.current = false;
  };

  const handleAnswer = async (optionIndex: number) => {
    if (showResult) return;
    setSelected(optionIndex);

    const q = questions[currentIndex];

    // Dynamic questions do not carry the answer key; ask the server to reveal
    // it only now that the player committed to an option.
    let correctIndex = q.correct;
    if (q.dynamic && correctIndex === undefined) {
      const { data, error } = await supabase.functions.invoke("verify-quiz-answer", {
        body: { id: q.id, token: q.token, selected: optionIndex },
      });
      if (error || !data || typeof data.correct !== "number") {
        setSelected(null);
        toast.error("Não foi possível validar a resposta. Tente novamente.");
        return;
      }
      correctIndex = data.correct as number;
      setQuestions((prev) =>
        prev.map((item, i) => (i === currentIndex ? { ...item, correct: correctIndex } : item))
      );
    }

    setShowResult(true);
    const isCorrect = optionIndex === correctIndex;
    const DELAY_MS = 5000;
    setCountdown(Math.ceil(DELAY_MS / 1000));
    tickRef.current = window.setInterval(() => {
      setCountdown((s) => (s > 1 ? s - 1 : 0));
    }, 1000);

    if (isCorrect) {
      const record: AnswerRecord = {
        id: q.id,
        selected: optionIndex,
        selectedText: q.options[optionIndex],
      };
      if (q.dynamic) {
        record.correct = correctIndex;
        record.token = q.token;
      }
      answersRef.current.push(record);
      setScore((s) => s + 1);
      advanceTimerRef.current = window.setTimeout(() => { goNext(); }, DELAY_MS);
    } else {
      const scoreSnapshot = score;
      const savePromise = saveScore([...answersRef.current]);
      pendingWrongRef.current = { score: scoreSnapshot, save: savePromise };
      advanceTimerRef.current = window.setTimeout(() => {
        void finishAttempt(scoreSnapshot, savePromise);
      }, DELAY_MS);
    }
  };



  const handleSkip = async () => {
    if (!showResult) return;
    const wasCorrect = selected === questions[currentIndex].correct;
    clearTimers();
    if (wasCorrect) {
      goNext();
    } else {
      const pending = pendingWrongRef.current;
      const scoreSnapshot = pending?.score ?? score;
      const savePromise = pending?.save ?? saveScore([...answersRef.current]);
      await finishAttempt(scoreSnapshot, savePromise);
    }
  };

  const current = questions[currentIndex];
  if (!user) {
    return (
      <div className="min-h-screen pt-16 pb-12 flex items-center">
        <Seo
          title="Quiz Infinito de Informática | Projeta Aula"
          description="Faça login para começar o quiz infinito de informática com mais de 150 questões."
          path="/quiz"
        />
        <div className="container max-w-lg">
          <div className="glass p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full gradient-warm flex items-center justify-center warm-glow-sm">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold gradient-warm-text">Quiz Infinito</h1>
            <p className="text-sm text-muted-foreground">
              Para participar do quiz e salvar sua pontuação no ranking, você precisa entrar ou criar uma conta gratuita.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-warm text-primary-foreground text-sm font-semibold warm-glow-sm hover:scale-[1.02] transition-all"
            >
              <LogIn className="w-4 h-4" /> Entrar / Criar Conta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen pt-16 pb-12">
      <Seo
        title="Quiz Infinito de Informática | Projeta Aula"
        description="Mais de 150 questões aleatórias de informática, com geração dinâmica por IA quando o banco acaba. Teste seus conhecimentos."
        path="/quiz"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "Quiz Infinito de Informática",
          description: "Quiz interativo com mais de 150 questões aleatórias sobre hardware, software, Windows 11, história, Brasil, smartphones, IA e redes sociais — com geração dinâmica de novas perguntas por IA.",
          learningResourceType: "Quiz",
          educationalLevel: "Beginner",
          inLanguage: "pt-BR",
          provider: { "@type": "Organization", name: "Projeta Aula" },
        }}
      />
      <ScrollToTop />
      <div className="container py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-warm-text">Quiz Infinito</h1>
          <p className="text-muted-foreground text-sm mt-3">Errou? Volta do zero! Acerte o máximo que conseguir.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Quiz Area */}
          <div className="lg:col-span-2">
            {/* Score Bar */}
            <div className="flex items-center justify-between glass px-4 py-3 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-display font-bold text-primary">{score}</span>
                <span className="text-xs text-muted-foreground">pontos</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Pergunta {currentIndex + 1}
              </span>
              <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground flex items-center gap-1">
                {current.dynamic && <Sparkles className="w-3 h-3 text-primary" />}
                {current.category}
              </span>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={String(current.id) + "-" + currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="glass p-6"
              >
                {current.dynamic && (
                  <div className="flex items-center gap-2 mb-3 text-xs text-primary">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pergunta gerada por IA com base no conteúdo do site</span>
                  </div>
                )}
                <h2 className="text-base md:text-lg font-semibold text-foreground mb-6">
                  {current.question}
                </h2>
                <div className="space-y-3">
                  {current.options.map((opt, i) => {
                    let style = "glass hover:border-primary/30 cursor-pointer";
                    if (showResult) {
                      if (i === current.correct) style = "border-green-500 bg-green-500/10 border";
                      else if (i === selected) style = "border-destructive bg-destructive/10 border";
                      else style = "glass opacity-50";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={showResult}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3 ${style}`}
                      >
                        <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                        {showResult && i === current.correct && <CheckCircle className="w-4 h-4 text-green-500 ml-auto shrink-0" />}
                        {showResult && i === selected && i !== current.correct && <XCircle className="w-4 h-4 text-destructive ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 glass p-4 space-y-3"
                  >
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Dica: {current.explanation}
                    </p>
                    {(() => {
                      const link = resolveContentLink({ correct: 0, ...current });
                      if (!link) return null;
                      const params = new URLSearchParams();
                      if (link.tab) params.set("tab", link.tab);
                      if (link.item) params.set("item", link.item);
                      const qs = params.toString();
                      const to = link.path + (qs ? `?${qs}` : "");
                      const Icon = link.path === "/hardware" ? Cpu
                        : link.path === "/history" ? BookOpen
                        : link.path === "/" ? Home
                        : Download;
                      const label = link.label
                        ?? (link.path === "/hardware" ? "Veja no guia de Hardware"
                          : link.path === "/history" ? "Leia na linha do tempo"
                          : link.path === "/" ? "Ver no site"
                          : "Conheça os Programas Essenciais");
                      return (
                        <button
                          onClick={() => navigate(to)}
                          className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all border border-border/40"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {`> ${label}`}
                          <ArrowRight className="w-3 h-3 ml-auto" />
                        </button>
                      );
                    })()}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-xs text-muted-foreground">
                        {generatingDynamic
                          ? "Gerando nova pergunta com IA..."
                          : <>Avançando em <span className="font-bold text-primary">{countdown}s</span>...</>}
                      </span>
                      <button
                        onClick={handleSkip}
                        disabled={generatingDynamic}
                        className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg gradient-warm text-primary-foreground font-semibold warm-glow-sm hover:scale-[1.02] transition-all disabled:opacity-60"
                      >
                        Pular para a próxima →
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center gap-4">
              <button onClick={startQuiz} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <RotateCcw className="w-4 h-4" /> Reiniciar
              </button>
              <button onClick={handleStop} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                <Square className="w-4 h-4" /> Parar e salvar pontos
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="glass p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="font-display text-sm font-bold">Top 10 — Melhor Pontuação</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Apenas o recorde de cada pessoa aparece aqui.</p>
            <div className="space-y-2">
              {leaderboard.length === 0 && (
                <p className="text-xs text-muted-foreground">Nenhuma pontuação ainda.</p>
              )}
              {leaderboard.map((entry, i) => (
                <div key={i} className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>
                      #{i + 1}
                    </span>
                    <span className="text-foreground">{entry.user_name || "Anônimo"}</span>
                    <span>{entry.user_role === "professor" ? "👨‍🏫" : "🎓"}</span>
                  </div>
                  <span className="font-display font-bold text-primary">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
