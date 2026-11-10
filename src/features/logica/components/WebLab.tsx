import { useState } from "react";
import { Play, Eraser, RotateCcw, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "./CodeEditor";

export const HTML_STARTER = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha primeira página</title>
</head>
<body>
    <h1>Olá, mundo!</h1>
    <p>Estou aprendendo HTML.</p>
</body>
</html>
`;
export const CSS_STARTER = `body {
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
    text-align: center;
}

h1 {
    color: #f97316;
}
`;

export function buildDoc(html: string, css: string) {
  const style = `<style>${css}</style>`;
  return /<\/head>/i.test(html) ? html.replace(/<\/head>/i, `${style}</head>`) : `${style}${html}`;
}

export function WebLab({ html, css, setHtml, setCss }: { html: string; css: string; setHtml: (v: string) => void; setCss: (v: string) => void }) {
  const [doc, setDoc] = useState(() => buildDoc(html, css));
  const [mobile, setMobile] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setDoc(buildDoc(html, css))}><Play className="h-4 w-4 mr-1" />Executar</Button>
        <Button variant="outline" onClick={() => { setHtml(""); setCss(""); setDoc(""); }}><Eraser className="h-4 w-4 mr-1" />Limpar</Button>
        <Button variant="outline" onClick={() => { setHtml(HTML_STARTER); setCss(CSS_STARTER); setDoc(buildDoc(HTML_STARTER, CSS_STARTER)); }}><RotateCcw className="h-4 w-4 mr-1" />Restaurar exemplo</Button>
        <div className="ml-auto flex gap-1">
          <Button size="sm" variant={mobile ? "outline" : "default"} onClick={() => setMobile(false)} aria-label="Ver como computador"><Monitor className="h-4 w-4" /></Button>
          <Button size="sm" variant={mobile ? "default" : "outline"} onClick={() => setMobile(true)} aria-label="Ver como celular"><Smartphone className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div><div className="text-xs text-muted-foreground mb-1">HTML</div><CodeEditor value={html} onChange={setHtml} lang="html" label="Editor HTML" minRows={12} /></div>
        <div><div className="text-xs text-muted-foreground mb-1">CSS</div><CodeEditor value={css} onChange={setCss} lang="css" label="Editor CSS" minRows={12} /></div>
      </div>
      <div className="rounded-lg border border-border bg-secondary/30 p-3 flex justify-center">
        <iframe title="Pré-visualização da página" sandbox="" srcDoc={doc}
          className="bg-background rounded-md border border-border h-[420px] transition-all"
          style={{ width: mobile ? 375 : "100%", background: "white" }} />
      </div>
    </div>
  );
}
