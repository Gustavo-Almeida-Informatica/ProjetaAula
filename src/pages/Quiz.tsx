import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getShuffledQuestions, QuizQuestion } from "@/lib/quizData";
import ScrollToTop from "@/components/ScrollToTop";
import { toast } from "sonner";
import { Trophy, RotateCcw, CheckCircle, XCircle, Zap } from "lucide-react";

interface LeaderboardEntry {
  user_name: string;
  user_role: string;
  score: number;
}

export default function Quiz() {
  const { user, profile } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const startQuiz = useCallback(() => {
    setQuestions(getShuffledQuestions());
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameOver(false);
  }, []);

  useEffect(() => {
    startQuiz();
    fetchLeaderboard();
  }, [startQuiz]);

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("quiz_scores")
      .select("user_name, user_role, score")
      .order("score", { ascending: false })
      .limit(10);
    if (data) setLeaderboard(data as LeaderboardEntry[]);
  };

  const saveScore = async (finalScore: number) => {
    if (!user || !profile) return;
    await supabase.from("quiz_scores").insert({
      user_id: user.id,
      user_name: profile.full_name || "Anônimo",
      user_role: profile.role,
      score: finalScore,
    });
    fetchLeaderboard();
  };

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    setSelected(optionIndex);
    setShowResult(true);

    const isCorrect = optionIndex === questions[currentIndex].correct;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
          setShowResult(false);
        } else {
          setGameOver(true);
          saveScore(newScore);
          toast.success(`Incrível! Você completou o quiz com ${newScore} pontos!`);
        }
      }, 1500);
    } else {
      // Wrong answer — game over
      setTimeout(() => {
        saveScore(score);
        toast.error(`Errou! Sua pontuação: ${score}. O quiz reinicia!`);
        startQuiz();
      }, 2000);
    }
  };

  const current = questions[currentIndex];
  if (!current) return null;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <ScrollToTop />
      <div className="container py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-neon-text">Quiz Infinito</h1>
          <p className="text-muted-foreground text-sm mt-2">Errou? Volta do zero! Prove que você sabe tudo.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs glass px-2 py-1">{current.category}</span>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
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
                    let style = "glass hover:border-primary/40 cursor-pointer";
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
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-xs text-muted-foreground glass p-3"
                  >
                    💡 {current.explanation}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>

            <button onClick={startQuiz} className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <RotateCcw className="w-4 h-4" /> Reiniciar Quiz
            </button>
          </div>

          {/* Leaderboard */}
          <div className="glass p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="font-display text-sm font-bold">Top 10</h3>
            </div>
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
