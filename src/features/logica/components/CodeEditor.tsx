import { useRef } from "react";

export type Lang = "visualg" | "html" | "css";

const VG_KW = /\b(algoritmo|fimalgoritmo|var|inicio|escreva|escreval|leia|se|entao|senao|fimse|escolha|caso|outrocaso|fimescolha|para|de|ate|passo|faca|fimpara|enquanto|fimenquanto|repita|e|ou|nao|xou|mod|div|procedimento|fimprocedimento|funcao|fimfuncao|retorne|vetor|inteiro|real|caractere|logico|verdadeiro|falso|limpatela|const)\b/gi;

function esc(s: string) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function highlight(code: string, lang: Lang): string {
  const out: string[] = [];
  const re = lang === "visualg"
    ? /(\/\/.*$)|("[^"\n]*"?)|([A-Za-zÀ-ú_]\w*)|(\d+(?:\.\d+)?)|([\s\S])/gm
    : lang === "html"
      ? /(<!--[\s\S]*?-->)|("[^"\n]*"?)|(<\/?[a-zA-Z][\w-]*|\/?>)|([a-zA-Z-]+(?==))|([\s\S])/gm
      : /(\/\*[\s\S]*?\*\/)|("[^"\n]*"?|'[^'\n]*'?)|([a-zA-Z-]+(?=\s*:))|(#[0-9a-fA-F]{3,8}\b|\d+(?:\.\d+)?(?:px|rem|em|%|s|vh|vw|fr)?)|([\s\S])/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    const [t, c1, c2, c3, c4] = m;
    if (c1) out.push(`<span class="text-muted-foreground italic">${esc(t)}</span>`);
    else if (c2) out.push(`<span class="text-accent">${esc(t)}</span>`);
    else if (c3) {
      if (lang === "visualg") {
        VG_KW.lastIndex = 0;
        out.push(VG_KW.test(t) && t.match(VG_KW)?.[0].length === t.length ? `<span class="text-primary font-semibold">${esc(t)}</span>` : esc(t));
      } else out.push(`<span class="text-primary">${esc(t)}</span>`);
    } else if (c4) out.push(`<span class="${lang === "html" ? "text-secondary-foreground" : "text-accent"}">${esc(t)}</span>`);
    else out.push(esc(t));
  }
  return out.join("") + "\n";
}

interface Props { value: string; onChange: (v: string) => void; lang: Lang; label: string; minRows?: number; errorLine?: number }

export function CodeEditor({ value, onChange, lang, label, minRows = 14, errorLine }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const gutRef = useRef<HTMLDivElement>(null);
  const lines = Math.max(value.split("\n").length, minRows);
  const font = "font-mono text-[13px] leading-6";
  return (
    <div className="relative flex rounded-lg border border-border bg-background/80 overflow-hidden" style={{ height: `${minRows * 24 + 16}px` }}>
      <div ref={gutRef} aria-hidden className={`select-none overflow-hidden py-2 px-2 text-right text-muted-foreground/60 bg-secondary/30 ${font}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={errorLine === i + 1 ? "text-destructive font-bold" : ""}>{i + 1}</div>
        ))}
      </div>
      <div className="relative flex-1">
        <pre ref={preRef} aria-hidden className={`absolute inset-0 m-0 overflow-hidden whitespace-pre p-2 text-foreground ${font}`}
          dangerouslySetInnerHTML={{ __html: highlight(value, lang) }} />
        <textarea
          aria-label={label}
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={(e) => {
            const t = e.currentTarget;
            if (preRef.current) { preRef.current.scrollTop = t.scrollTop; preRef.current.scrollLeft = t.scrollLeft; }
            if (gutRef.current) gutRef.current.scrollTop = t.scrollTop;
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const t = e.currentTarget; const s = t.selectionStart;
              const v = value.slice(0, s) + "   " + value.slice(t.selectionEnd);
              onChange(v);
              requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 3; });
            }
          }}
          className={`absolute inset-0 resize-none whitespace-pre overflow-auto bg-transparent p-2 text-transparent caret-foreground outline-none ${font}`}
        />
      </div>
    </div>
  );
}
