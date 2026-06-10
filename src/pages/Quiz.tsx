import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getShuffledQuestions, QuizQuestion } from "@/lib/quizData";
import ScrollToTop from "@/components/ScrollToTop";
import { Seo } from "@/components/Seo";
import { toast } from "sonner";
import { Trophy, RotateCcw, CheckCircle, XCircle, Zap, Square, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LeaderboardEntry {
  user_name: string;
  user_role: string;
  score: number;
}

export default function Quiz() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [countdown, setCountdown] = useState(0);
  const advanceTimerRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const answersRef = useRef<{ id: number; selected: number }[]>([]);

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
    answersRef.current = [];
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

  const saveScore = async () => {
    if (!user || !profile) return;
    const answers = answersRef.current;
    if (answers.length === 0) return;
    const { error } = await supabase.functions.invoke("submit-quiz-score", {
      body: { answers },
    });
    if (error) {
      console.error("Score save failed", error);
    }
    fetchLeaderboard();
  };

  const handleStop = () => {
    clearTimers();
    if (score > 0) {
      saveScore();
      toast.info(`Você parou com ${score} ponto${score > 1 ? "s" : ""}! Sua pontuação foi salva.`);
    }
    startQuiz();
  };

  const goNext = useCallback(() => {
    clearTimers();
    setCountdown(0);
    setSelected(null);
    setShowResult(false);
    setCurrentIndex((i) => {
      if (i + 1 < questions.length) return i + 1;
      setQuestions(getShuffledQuestions());
      toast.success("Todas as perguntas respondidas! Continuando com novas perguntas...");
      return 0;
    });
  }, [questions.length]);

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    setSelected(optionIndex);
    setShowResult(true);

    const q = questions[currentIndex];
    const isCorrect = optionIndex === q.correct;
    const DELAY_MS = 5000;
    setCountdown(Math.ceil(DELAY_MS / 1000));
    tickRef.current = window.setInterval(() => {
      setCountdown((s) => (s > 1 ? s - 1 : 0));
    }, 1000);

    if (isCorrect) {
      answersRef.current.push({ id: q.id, selected: optionIndex });
      setScore((s) => s + 1);
      advanceTimerRef.current = window.setTimeout(goNext, DELAY_MS);
    } else {
      advanceTimerRef.current = window.setTimeout(() => {
        saveScore();
        toast.error(`Errou! Sua pontuação: ${score}. O quiz reinicia!`);
        startQuiz();
      }, DELAY_MS);
    }
  };


  const handleSkip = () => {
    if (!showResult) return;
    const wasCorrect = selected === questions[currentIndex].correct;
    clearTimers();
    if (wasCorrect) {
      goNext();
    } else {
      saveScore();
      toast.error(`Errou! Sua pontuação: ${score}. O quiz reinicia!`);
      startQuiz();
    }
  };

  const current = questions[currentIndex];
  if (!current) return null;

  return (
    <div className="min-h-screen pt-16 pb-12">
      <Seo
        title="Quiz Infinito de Informática | Projeta Aula"
        description="Mais de 120 questões aleatórias de informática. Teste seus conhecimentos e entre no ranking dos melhores."
        path="/quiz"
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
              <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">{current.category}</span>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-" + currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="glass p-6"
              >
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
                    <button
                      onClick={() => navigate("/software")}
                      className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Conheça os Programas Essenciais
                    </button>
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-xs text-muted-foreground">
                        Avançando em <span className="font-bold text-primary">{countdown}s</span>...
                      </span>
                      <button
                        onClick={handleSkip}
                        className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg gradient-warm text-primary-foreground font-semibold warm-glow-sm hover:scale-[1.02] transition-all"
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
