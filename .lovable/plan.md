# Botão "Ir para o conteúdo" no Quiz

## Objetivo
Após cada resposta (certa ou errada), exibir um botão que leva o usuário à seção exata do site que explica o assunto da pergunta — funcionando tanto para perguntas estáticas quanto para as geradas por IA.

## 1. Estrutura de dados

Adicionar um campo opcional em `QuizQuestion` (`src/lib/quizData.ts`):

```ts
contentLink?: {
  path: string;     // ex: "/software"
  anchor?: string;  // ex: "ungoogled-chromium" (id da seção, sem o #)
  label?: string;   // texto do botão; default por página
};
```

Defaults de label por página:
- `/software` → "Conheça os Programas Essenciais"
- `/hardware` → "Veja no guia de Hardware"
- `/history` → "Leia na linha do tempo"

Âncoras já existem no DOM via `slugify(title|name)` em `Hardware.tsx`, `Software.tsx`, `History.tsx` — basta reusar os mesmos slugs (ex: `slugify("Ungoogled Chromium")` → `ungoogled-chromium`).

## 2. Mapeamento das perguntas estáticas

Preencher `contentLink` para as ~70 perguntas existentes, agrupadas por categoria:

- **Hardware / Cabos / Periféricos** → `/hardware` + âncora do tópico correspondente (CPU, RAM, SSD, HDMI, RJ45, etc.)
- **Windows / Uso do PC** → `/software` âncora da seção "Windows 11" ou atalhos
- **Programas / Segurança (software)** → `/software` âncora do programa (chrome, libreoffice, vlc, winrar, whatsapp, windows-defender, ungoogled-chromium…)
- **História / Brasil / Smartphones / IA / Redes Sociais / Conceitos históricos** → `/history` âncora do item (eniac, arpanet, www, iphone, chatgpt…)

Onde não houver âncora 1-para-1, usar apenas `path` (rola para o topo da página correta).

## 3. Geração dinâmica (Edge function)

`supabase/functions/generate-quiz-question/index.ts`:
- Ampliar o system prompt para também devolver `contentLink: { path, anchor }` escolhendo entre um catálogo curto de páginas + âncoras válidas (incluído no prompt).
- Validar no servidor: `path` deve estar em allowlist (`/hardware`, `/software`, `/history`); `anchor` é opcional, string `[a-z0-9-]*`.
- Incluir `contentLink` no payload assinado opcionalmente (não é sensível — não precisa entrar no HMAC).

`submit-quiz-score` não muda (continua validando só `correct` + token).

## 4. UI do card de feedback (`src/pages/Quiz.tsx`)

Substituir o botão fixo atual ("Conheça os Programas Essenciais" → `/software`) por um botão dinâmico:

- Se `current.contentLink` existir: navegar para `path` + (se anchor) `#anchor` via `navigate()`. Quando a rota destino for a mesma página, usar `scrollIntoView` suave.
- Reusar o utilitário `useScrollToItem` / padrão `scroll-mt-24` já presente nas seções.
- Fallback (sem `contentLink`): botão genérico "Ver no site" → `/` (ou esconder).

Estilo mantém o visual atual do botão (`bg-secondary` + ícone). Ícone muda conforme a página de destino (Download para /software, Cpu para /hardware, BookOpen para /history).

## Arquivos afetados

- `src/lib/quizData.ts` — novo campo + mapeamento de todas as questões
- `src/pages/Quiz.tsx` — render do botão dinâmico e navegação suave
- `supabase/functions/generate-quiz-question/index.ts` — gerar/validar `contentLink`
- (opcional) `src/hooks/useScrollToItem.ts` — reutilização do efeito de highlight ao chegar via âncora

## Fora do escopo
- Não altera tabela `quiz_scores` nem o fluxo de pontuação.
- Não altera conteúdo das páginas — só consome âncoras já existentes.
