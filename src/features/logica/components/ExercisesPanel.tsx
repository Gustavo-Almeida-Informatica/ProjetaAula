import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeEditor } from "./CodeEditor";
import { exercises } from "../content/exercises";
import { checkFill, checkVisualg, checkWeb } from "../checkers";
import type { Exercise, ExerciseSubject } from "../types";

const SUBJECTS: { id: ExerciseSubject | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" }, { id: "logica", label: "Lógica" }, { id: "visualg", label: "Visualg" }, { id: "html", label: "HTML" }, { id: "css", label: "CSS" },
];
const KIND_LABEL: Record<Exercise["kind"], string> = {
  multipla: "Múltipla escolha", vf: "Verdadeiro ou falso", completar: "Complete o código", erro: "Encontre o erro", "desafio-visualg": "Desafio de programação", "pratica-web": "Prática HTML/CSS",
};
const DIFF: Record<string, string> = { basico: "Básico", intermediario: "Intermediário", desafio: "Desafio" };

function ExerciseCard({ ex, done, onResult }: { ex: Exercise; done: boolean; onResult: (ok: boolean) => void }) {
  const [result, setResult] = useState<null | { ok: boolean; details?: { ok: boolean; text: string }[] }>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [code, setCode] = useState(ex.kind === "desafio-visualg" ? ex.starterCode : ex.kind === "pratica-web" ? ex.starterHtml : "");
  const [css, setCss] = useState(ex.kind === "pratica-web" ? ex.starterCss : "");

  const finish = (ok: boolean, details?: { ok: boolean; text: string }[]) => { setResult({ ok, details }); onResult(ok); };
  const retry = () => { setResult(null); setChoice(null); setText(""); };

  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <div className="flex flex-wrap gap-2 text-[11px]">
        <span className="px-2 py-0.5 rounded bg-primary/15 text-primary">{KIND_LABEL[ex.kind]}</span>
        <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground">{DIFF[ex.difficulty]}</span>
        <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground">{ex.points} pts</span>
        {done && <span className="text-primary ml-auto">✓ já acertou</span>}
      </div>
      <p className="text-sm text-foreground">{ex.prompt}</p>
      {ex.code && ex.kind !== "desafio-visualg" && <pre className="rounded-lg bg-background border border-border p-3 text-[13px] font-mono overflow-auto text-foreground">{ex.code}</pre>}

      {(ex.kind === "multipla" || ex.kind === "erro") && (
        <div className="grid gap-2">{ex.options.map((o, i) => (
          <button key={i} disabled={!!result} onClick={() => { setChoice(i); finish(i === ex.correctIndex); }}
            className={`text-left text-sm rounded-lg border p-2 transition-colors ${result && i === ex.correctIndex ? "border-primary bg-primary/10" : result && i === choice ? "border-destructive bg-destructive/10" : "border-border hover:border-primary/50"} text-foreground`}>{o}</button>
        ))}</div>
      )}
      {ex.kind === "vf" && (
        <div className="flex gap-2">{[true, false].map((v) => (
          <Button key={String(v)} variant="outline" disabled={!!result} onClick={() => finish(v === ex.answer)}>{v ? "Verdadeiro" : "Falso"}</Button>
        ))}</div>
      )}
      {ex.kind === "completar" && (
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (text.trim()) finish(checkFill(text, ex.accepted)); }}>
          <Input value={text} onChange={(e) => setText(e.target.value)} disabled={!!result} placeholder="O que vai no lugar de ____ ?" aria-label="Resposta" />
          <Button type="submit" disabled={!!result}>Verificar</Button>
        </form>
      )}
      {ex.kind === "desafio-visualg" && (
        <>
          <CodeEditor value={code} onChange={setCode} lang="visualg" label="Código do desafio" minRows={12} />
          <div className="flex gap-2">
            <Button onClick={() => { const r = checkVisualg(code, ex.tests); finish(r.every((x) => x.ok), r.map((x, i) => ({ ok: x.ok, text: `Teste ${i + 1} (entradas: ${x.input.join(", ") || "nenhuma"})${x.error ? " — " + x.error : ""}` }))); }}>Testar código</Button>
            <Button variant="ghost" onClick={() => setCode(ex.solution)}>Ver resolução</Button>
          </div>
        </>
      )}
      {ex.kind === "pratica-web" && (
        <>
          <div className="grid gap-2 lg:grid-cols-2">
            <CodeEditor value={code} onChange={setCode} lang="html" label="HTML do exercício" minRows={10} />
            <CodeEditor value={css} onChange={setCss} lang="css" label="CSS do exercício" minRows={10} />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { const r = checkWeb(code, css, ex.checks); finish(r.every((x) => x.ok), r.map((x) => ({ ok: x.ok, text: x.description }))); }}>Verificar</Button>
            <Button variant="ghost" onClick={() => { setCode(ex.solutionHtml); setCss(ex.solutionCss); }}>Ver resolução</Button>
          </div>
        </>
      )}

      {result && (
        <div className={`rounded-lg p-3 text-sm border ${result.ok ? "border-primary/40 bg-primary/10" : "border-destructive/40 bg-destructive/10"}`} aria-live="polite">
          <p className="font-bold flex items-center gap-1 text-foreground">{result.ok ? <><CheckCircle2 className="h-4 w-4 text-primary" />Correto! +{ex.points} pts</> : <><XCircle className="h-4 w-4 text-destructive" />Ainda não</>}</p>
          {result.details && <ul className="mt-1 space-y-0.5">{result.details.map((d, i) => <li key={i} className="text-xs text-foreground/90">{d.ok ? "✓" : "✗"} {d.text}</li>)}</ul>}
          <p className="mt-2 text-foreground/90">{ex.explanation}</p>
          <Button size="sm" variant="outline" className="mt-2" onClick={retry}><RotateCcw className="h-3 w-3 mr-1" />Tentar novamente</Button>
        </div>
      )}
    </div>
  );
}

export function ExercisesPanel({ isDone, onCorrect, scoreOf }: { isDone: (id: string) => boolean; onCorrect: (id: string) => void; scoreOf: number }) {
  const [subject, setSubject] = useState<ExerciseSubject | "todos">("todos");
  const list = useMemo(() => exercises.filter((e) => subject === "todos" || e.subject === subject), [subject]);
  const done = exercises.filter((e) => isDone(e.id)).length;
  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-4 flex flex-wrap gap-4 items-center">
        <div><p className="text-xs text-muted-foreground">Exercícios acertados</p><p className="font-display text-xl text-foreground">{done}/{exercises.length}</p></div>
        <div><p className="text-xs text-muted-foreground">Pontuação</p><p className="font-display text-xl text-primary">{scoreOf} pts</p></div>
        <div className="flex flex-wrap gap-1 ml-auto">{SUBJECTS.map((s) => (
          <Button key={s.id} size="sm" variant={subject === s.id ? "default" : "outline"} onClick={() => setSubject(s.id)}>{s.label}</Button>
        ))}</div>
      </div>
      {list.map((ex) => <ExerciseCard key={ex.id} ex={ex} done={isDone(ex.id)} onResult={(ok) => ok && onCorrect(ex.id)} />)}
    </div>
  );
}
