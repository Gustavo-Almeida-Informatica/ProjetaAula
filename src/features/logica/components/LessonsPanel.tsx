import { useState } from "react";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lesson } from "../types";

interface Group { label: string; lessons: Lesson[] }

export function LessonsPanel({ groups, isDone, onComplete, onOpenLab }: {
  groups: Group[]; isDone: (id: string) => boolean; onComplete: (id: string) => void; onOpenLab: (l: Lesson, solution?: boolean) => void;
}) {
  const all = groups.flatMap((g) => g.lessons);
  const [current, setCurrent] = useState<string | null>(null);
  const [showSol, setShowSol] = useState(false);
  const idx = all.findIndex((l) => l.id === current);
  const lesson = idx >= 0 ? all[idx] : null;

  const go = (id: string | null) => { setCurrent(id); setShowSol(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (!lesson) {
    return (
      <div className="space-y-6">
        {groups.map((g) => {
          const done = g.lessons.filter((l) => isDone(l.id)).length;
          return (
            <section key={g.label}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-foreground">{g.label}</h3>
                <span className="text-xs text-muted-foreground">{done}/{g.lessons.length} concluídas</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {g.lessons.map((l, i) => (
                  <button key={l.id} onClick={() => go(l.id)} className="glass rounded-xl p-3 text-left flex gap-3 items-start hover:border-primary/50 border border-transparent transition-colors">
                    {isDone(l.id) ? <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />}
                    <span><span className="text-xs text-muted-foreground">Aula {i + 1}</span><br /><span className="text-sm text-foreground font-medium">{l.title}</span></span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  const isVg = lesson.track === "visualg";
  return (
    <article className="space-y-5">
      <Button variant="ghost" size="sm" onClick={() => go(null)}><ChevronLeft className="h-4 w-4" />Voltar para a lista</Button>
      <header>
        <p className="text-xs text-primary uppercase tracking-wide">{lesson.level === "basico" ? "Básico" : "Intermediário"}</p>
        <h2 className="font-display text-2xl font-bold text-foreground">{lesson.title}</h2>
        <p className="text-sm text-muted-foreground mt-1"><b className="text-foreground">Objetivo:</b> {lesson.objective}</p>
      </header>
      <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">{lesson.explanation.map((p, i) => <p key={i}>{p}</p>)}</div>
      {lesson.steps && (
        <div className="glass rounded-xl p-4"><h3 className="font-bold text-foreground mb-2">Passo a passo</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-foreground/90">{lesson.steps.map((s, i) => <li key={i}>{s}</li>)}</ol></div>
      )}
      <div>
        <h3 className="font-bold text-foreground mb-2">Código de exemplo</h3>
        <pre className="rounded-lg bg-background border border-border p-3 text-[13px] font-mono overflow-auto text-foreground">{lesson.code}</pre>
        {lesson.css && <pre className="mt-2 rounded-lg bg-background border border-border p-3 text-[13px] font-mono overflow-auto text-foreground">{lesson.css}</pre>}
        <Button size="sm" variant="outline" className="mt-2" onClick={() => onOpenLab(lesson)}><FlaskConical className="h-4 w-4 mr-1" />Abrir no laboratório</Button>
      </div>
      <div><h3 className="font-bold text-foreground mb-2">Entendendo o código</h3>
        <ul className="space-y-2">{lesson.codeParts.map((c, i) => (
          <li key={i} className="glass rounded-lg p-3"><code className="block font-mono text-xs text-primary whitespace-pre-wrap mb-1">{c.code}</code><span className="text-sm text-foreground/90">{c.explanation}</span></li>
        ))}</ul>
      </div>
      <div><h3 className="font-bold text-foreground mb-2">Resultado esperado</h3>
        {lesson.sampleInput?.length ? <p className="text-xs text-muted-foreground mb-1">Valores digitados: {lesson.sampleInput.join(", ")}</p> : null}
        <pre className={`rounded-lg border border-border p-3 text-[13px] whitespace-pre-wrap ${isVg ? "font-mono bg-background" : "bg-secondary/30"} text-foreground`}>{lesson.expectedOutput}</pre>
      </div>
      <div className="glass rounded-xl p-4 space-y-2 border border-primary/30">
        <h3 className="font-bold text-foreground">Exercício</h3>
        <p className="text-sm text-foreground/90">{lesson.exercise.prompt}</p>
        {lesson.exercise.hint && <p className="text-xs text-muted-foreground">Dica: {lesson.exercise.hint}</p>}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => onOpenLab({ ...lesson, code: lesson.exercise.starterCode ?? "", css: lesson.exercise.starterCss ?? "" })}>Resolver no laboratório</Button>
          <Button size="sm" variant="ghost" onClick={() => setShowSol((s) => !s)}>{showSol ? "Esconder resolução" : "Ver uma resolução"}</Button>
        </div>
        {showSol && <pre className="rounded-lg bg-background border border-border p-3 text-[13px] font-mono overflow-auto text-foreground">{lesson.exercise.solution}{lesson.exercise.solutionCss ? "\n\n/* CSS */\n" + lesson.exercise.solutionCss : ""}</pre>}
      </div>
      <div className="flex flex-wrap gap-2 justify-between">
        <Button variant="outline" disabled={idx === 0} onClick={() => go(all[idx - 1].id)}><ChevronLeft className="h-4 w-4" />Anterior</Button>
        <Button variant={isDone(lesson.id) ? "outline" : "default"} onClick={() => onComplete(lesson.id)}>
          {isDone(lesson.id) ? "Aula concluída ✓" : "Marcar como concluída"}
        </Button>
        <Button disabled={idx === all.length - 1} onClick={() => { onComplete(lesson.id); go(all[idx + 1].id); }}>Próxima aula<ChevronRight className="h-4 w-4" /></Button>
      </div>
    </article>
  );
}
