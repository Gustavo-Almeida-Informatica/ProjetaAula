# Corrigir a pontuação máxima do Quiz Infinito

## Diagnóstico confirmado

- Em `src/pages/Quiz.tsx`, os acertos da tentativa são mantidos em `answersRef` e o erro chama `saveScore()`, mas o fluxo reinicia imediatamente sem aguardar a gravação.
- Em `supabase/functions/submit-quiz-score/index.ts`, cada salvamento cria uma nova linha com `insert`; não existe atualização do recorde anterior.
- Os dados atuais confirmam vários registros para o mesmo usuário. A tela mascara isso agrupando no navegador e escolhendo o maior valor, mas o banco ainda contém duplicatas.
- O servidor já recalcula os pontos pelas respostas validadas e mantém a proteção HMAC das perguntas dinâmicas. Essa segurança será preservada.

## Correção

1. **Salvar antes de reiniciar**
   - Tornar o salvamento aguardável e usar um bloqueio para impedir chamadas duplicadas.
   - Nos dois caminhos de erro — avanço automático e botão “Pular para a próxima” — capturar a tentativa atual, aguardar sua persistência e somente depois zerar/reiniciar.
   - Aplicar a mesma segurança ao botão “Parar e salvar pontos”, sem mudar sua aparência ou comportamento visual.

2. **Transformar o ranking existente em high score real**
   - Consolidar os registros atuais de cada usuário, preservando sua maior pontuação.
   - Garantir um único registro por `user_id` na tabela existente `quiz_scores`.
   - Criar uma operação atômica no banco que faça INSERT para o primeiro resultado e UPDATE somente quando o novo valor for maior, usando `GREATEST`/conflito por usuário.
   - Manter nome e papel vinculados ao perfil autenticado, nunca a dados enviados pelo navegador.

3. **Usar a persistência segura no servidor**
   - Manter o recálculo atual das respostas estáticas por texto e das dinâmicas por token/HMAC.
   - Substituir o `insert` simples pelo registro atômico do high score.
   - Retornar ao navegador o recorde persistido e só então atualizar o ranking existente.

## Verificação obrigatória

- Validar as sequências `3 → erro`, `5 → erro`, `2 → erro` com recorde 5 e `10 → erro`, confirmando respectivamente 3, 5, 5 e 10.
- Confirmar no banco que existe apenas uma linha por usuário e que chamadas repetidas não reduzem nem duplicam o recorde.
- Atualizar a página e entrar novamente para confirmar que o valor 10 permanece.
- Validar dois usuários separados, ordenação decrescente e manutenção correta do nome.
- Conferir também os fluxos de avanço automático, “Pular para a próxima” e “Parar e salvar pontos”.
- Revisar logs, compilação e uma sessão real no navegador após publicar a função atualizada.

## Arquivos e estruturas previstos

- `src/pages/Quiz.tsx`: aguardar o salvamento antes do reset e bloquear gravações duplicadas.
- `supabase/functions/submit-quiz-score/index.ts`: persistir somente o maior resultado validado.
- Nova migração do banco: consolidar duplicatas, garantir unicidade por usuário e registrar o high score atomicamente.
- Nenhuma alteração de layout, cores, perguntas, respostas, navegação, autenticação ou ranking visual.