import { useRef, useState } from "react";
import { Play, Eraser, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeEditor } from "./CodeEditor";
import { VisualgMachine, type InputRequest, type VariableView } from "../visualg/interpreter";

export const VISUALG_STARTER = `algoritmo "Meu Primeiro Programa"

var
   nome: caractere

inicio
   escreva("Digite seu nome: ")
   leia(nome)

   escreval("Ola, ", nome)

fimalgoritmo
`;

export function VisualgLab({ code, setCode, instructions }: { code: string; setCode: (c: string) => void; instructions?: React.ReactNode }) {
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "input" | "done" | "error">("idle");
  const [err, setErr] = useState<{ line: number; message: string } | null>(null);
  const [req, setReq] = useState<InputRequest | null>(null);
  const [vars, setVars] = useState<VariableView[]>([]);
  const [typed, setTyped] = useState("");
  const mRef = useRef<VisualgMachine | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (m: VisualgMachine, r: ReturnType<VisualgMachine["step"]>) => {
    setOutput(m.output); setVars(m.variables());
    if (r.status === "input") { setReq(r.request); setStatus("input"); setTimeout(() => inputRef.current?.focus(), 0); }
    else if (r.status === "error") { setErr({ line: r.line, message: r.message }); setStatus("error"); setReq(null); }
    else { setStatus("done"); setReq(null); }
  };

  const run = () => {
    setErr(null); setOutput(""); setStatus("running");
    try {
      const m = new VisualgMachine(code, (t) => setOutput(t));
      mRef.current = m;
      handle(m, m.step());
    } catch (e: unknown) {
      const ex = e as { line?: number; message?: string };
      setErr({ line: ex.line ?? 0, message: ex.message ?? "Erro ao ler o programa." }); setStatus("error");
    }
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const m = mRef.current; if (!m) return;
    const v = typed; setTyped("");
    m.output += v + "\n";
    handle(m, m.step(v));
  };

  const reset = () => { mRef.current = null; setOutput(""); setErr(null); setReq(null); setVars([]); setStatus("idle"); };

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <aside className="glass rounded-xl p-4 text-sm text-muted-foreground space-y-2">
        {instructions ?? (
          <>
            <h3 className="font-display text-foreground font-bold">Como usar</h3>
            <p>Escreva seu algoritmo e clique em <b className="text-foreground">Executar</b>. Quando o programa chegar em <code>leia</code>, digite o valor no campo de entrada e aperte Enter.</p>
            <p className="text-xs">Suporta: variáveis, vetores e matrizes, escreva/escreval/leia, se/senao, escolha/caso, para, enquanto, repita/ate, procedimentos e funções. Não suporta: arquivos, registros e comandos de depuração do Visualg.</p>
          </>
        )}
      </aside>
      <div className="space-y-3 min-w-0">
        <div className="flex flex-wrap gap-2 items-center">
          <Button onClick={run} disabled={status === "running"}><Play className="h-4 w-4 mr-1" />Executar</Button>
          <Button variant="outline" onClick={() => setOutput("")}><Eraser className="h-4 w-4 mr-1" />Limpar saída</Button>
          <Button variant="outline" onClick={() => { setCode(VISUALG_STARTER); reset(); }}><RotateCcw className="h-4 w-4 mr-1" />Reiniciar</Button>
          <span className="text-xs ml-auto text-muted-foreground flex items-center gap-1" aria-live="polite">
            {status === "input" && <><Loader2 className="h-3 w-3 animate-spin" />Aguardando entrada…</>}
            {status === "done" && "Execução concluída ✓"}
            {status === "error" && <span className="text-destructive">Erro</span>}
          </span>
        </div>
        <CodeEditor value={code} onChange={setCode} lang="visualg" label="Editor Visualg" errorLine={err?.line} />
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="text-xs text-muted-foreground mb-1">Saída</div>
          <pre className="font-mono text-[13px] whitespace-pre-wrap min-h-[80px] max-h-64 overflow-auto text-foreground" aria-live="polite">{output}</pre>
          {err && <p className="text-sm text-destructive mt-2">{err.line ? `Linha ${err.line}: ` : ""}{err.message}</p>}
          {status === "input" && req && (
            <form onSubmit={send} className="flex gap-2 mt-2">
              <Input ref={inputRef} value={typed} onChange={(e) => setTyped(e.target.value)} aria-label={`Valor para ${req.varName}`} placeholder={`Digite o valor de ${req.varName} (${req.type})`} />
              <Button type="submit">Enviar</Button>
            </form>
          )}
          {req?.error && status === "input" && <p className="text-xs text-destructive mt-1">{req.error}</p>}
        </div>
        {vars.length > 0 && (
          <details className="text-xs text-muted-foreground">
            <summary className="cursor-pointer">Variáveis ({vars.length})</summary>
            <ul className="mt-1 font-mono">{vars.map((v) => <li key={v.name}>{v.name}: {v.type} = {v.value}</li>)}</ul>
          </details>
        )}
      </div>
    </div>
  );
}
