

# Plano: Sincronizar Conteúdo, Adicionar História e Novo Estilo Visual

## Resumo

Três grandes mudanças: (1) sincronizar todo conteúdo entre quiz e seções educacionais, (2) adicionar nova página "História do Computador" com periféricos e peças detalhadas, (3) redesign visual inspirado no glassflow.dev — mais limpo, profissional e espaçado, sem perder nenhum dado existente.

---

## O que muda visualmente (estilo glassflow.dev)

O site atual tem um visual "neon gamer" com brilhos fortes em azul/ciano. O glassflow.dev é mais **limpo e profissional**: fundo escuro (#0a0a0a), bordas sutis, cards com vidro leve, tipografia grande e espaçada, cores de destaque mais suaves (laranja quente ao invés de neon). A transição vai manter o dark mode mas trocar o visual "gamer" por algo mais elegante e fácil de ler.

---

## Etapas de Implementação

### 1. Redesign visual (estilo glassflow.dev)
- **`src/index.css`**: Ajustar variáveis CSS — fundo mais escuro (#0a0a0a), bordas mais sutis, trocar neon-blue/cyan por tons de laranja/âmbar quente como accent, reduzir intensidade dos glows
- **`tailwind.config.ts`**: Atualizar paleta de cores para tons quentes (laranja/âmbar como primário), manter Orbitron+Inter
- **`src/components/Navbar.tsx`**: Layout mais limpo, espaçado, sem glow excessivo
- **`src/pages/Index.tsx`**: Hero mais limpo com tipografia grande, cards com bordas sutis, mais whitespace
- Aplicar o mesmo tratamento visual em todas as páginas (Hardware, Software, Gallery, Quiz, Login)

### 2. Nova página: História do Computador
- **Criar `src/pages/History.tsx`**: Página com timeline visual cobrindo:
  - ENIAC (1945) — primeiro computador
  - Transistores e circuitos integrados (1950-60)
  - Computadores pessoais (1970-80: Apple, IBM)
  - Era da internet (1990-2000)
  - Smartphones e cloud (2010-hoje)
  - Seção detalhada de periféricos de entrada e saída
  - Seção de peças internas com explicações completas
- **`src/App.tsx`**: Adicionar rota `/historia`
- **`src/components/Navbar.tsx`**: Adicionar link "História" na navegação

### 3. Sincronizar conteúdo quiz ↔ seções educacionais
- **`src/lib/quizData.ts`**: Adicionar novas perguntas cobrindo temas das seções que não estão no quiz (algoritmos, variáveis, loops, condições, BIOS, drivers, WhatsApp, LibreOffice, Chrome, etc.)
- Adicionar perguntas sobre a história do computador (ENIAC, transistores, gerações)
- Adicionar perguntas sobre periféricos detalhados (tipos de USB, tipos de teclado, etc.)
- Garantir que cada tema educacional tenha pelo menos 2-3 perguntas no quiz
- **`src/pages/Hardware.tsx`** e **`src/pages/Software.tsx`**: Adicionar conteúdo sobre temas que existem no quiz mas não nas seções (ex: impressora 3D, Windows Defender, senhas fortes)

### 4. Expandir banco de perguntas do quiz
- Meta: pelo menos **80+ perguntas** (atualmente 45) para reforçar o caráter "infinito"
- Novas categorias: "História", "Periféricos", "Tipos de USB"
- Manter respostas com posições aleatórias (não repetir padrão)

---

## Arquivos que serão modificados

| Arquivo | O que muda |
|---|---|
| `src/index.css` | Paleta de cores, efeitos glass mais sutis |
| `tailwind.config.ts` | Cores primárias (laranja/âmbar) |
| `src/pages/Index.tsx` | Visual limpo estilo glassflow |
| `src/pages/Hardware.tsx` | Novo estilo + conteúdo extra |
| `src/pages/Software.tsx` | Novo estilo + conteúdo extra |
| `src/pages/Gallery.tsx` | Novo estilo visual |
| `src/pages/Quiz.tsx` | Novo estilo visual |
| `src/pages/Login.tsx` | Novo estilo visual |
| `src/components/Navbar.tsx` | Novo estilo + link História |
| `src/lib/quizData.ts` | +35 perguntas novas |
| `src/pages/History.tsx` | **NOVO** — História do Computador |
| `src/App.tsx` | Rota /historia |

---

## O que NÃO muda
- Todos os dados da equipe (fotos, nomes, links)
- Lógica do quiz (infinito, parar e salvar, leaderboard de recorde)
- Sistema de autenticação e perfis
- Conteúdo existente (apenas adições)
- Comunidade e banco de dados

