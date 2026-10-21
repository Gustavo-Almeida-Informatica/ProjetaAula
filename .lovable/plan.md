# Correções da Auditoria Técnica (lote seguro)

Já resolvido: IMG-01 (as 5 fotos com texto deformado foram trocadas na rodada anterior).

## Atenção sobre o endereço do site (SITE-01)
O endereço publicado real é **projetaaula.lovable.app** (com "aa"). Hoje os arquivos usam "projetoaula" (errado), e o relatório sugere "projetaula", que **também está errado**. Os arquivos corrigidos do relatório não devem ser aplicados como estão.

## O que será feito
1. **SITE-01** – Trocar o endereço para `https://projetaaula.lovable.app` no mapa do site, no robots.txt, no gerador do mapa e nas metas do index.html (título/descrição/JSON-LD).
2. **BUSCA-01** – Busca ignorando acentos e maiúsculas ("memoria" encontra "Memória RAM") na busca global e nas buscas de Hardware, Galeria e Software. Com um teste automático.
3. **SEG-04** – Contador de visualizações: verificar o estado atual (na rodada de segurança ele passou a exigir login). Se ainda aceitar visitantes ou repetições, limitar a 1 contagem por usuário e por post.
4. **SEG-03** – Verificar se as respostas certas das perguntas fixas ainda são enviadas ao navegador. Se forem, retirar o campo de resposta certa dos dados do navegador (a correção já é feita no servidor), sem alterar perguntas, pontuação, salvamento ou ranking.
5. **QUIZ-02** – Teste automático que confirma que todo link "Ir para o conteúdo" aponta para um item que existe nas páginas.
6. **GH-06** – Nome do projeto no package.json passa a ser "projeta-aula".

## Fora deste lote (precisam de você ou são escolhas da equipe)
- GH-02 licença, GH-03 descrição "About" no GitHub: feitas pela equipe no GitHub.
- PERF-02 fotos da equipe: já ficam hospedadas fora do código; posso reduzi-las se quiser.
- GH-04/GH-05 pastas de migração duplicadas e lockfiles: são do sistema, mexer pode quebrar.
- SEG-02 .env: só contém a chave pública, não é segredo.
- IMG-02 VGA, IMG-04, SEG-09, QUIZ-03: posso tratar em outro lote.

## Detalhes técnicos
- Normalização: `s.normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase()` em `src/lib/searchIndex.ts`, reutilizada nos filtros das páginas.
- Testes em `src/test/` (vitest): busca sem acento; links do quiz × slugs de `topics`/Gallery/Software/History.
- Sem mudanças em pontuação, ranking, rotas ou visual.
