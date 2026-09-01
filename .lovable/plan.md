# Corrigir a pontuação do Quiz (ranking travado em 1 ponto)

## O que está acontecendo

Verifiquei os dados do ranking: quase todos os registros salvos têm score 1 (alguns 0, raros 3 e 6). A causa está confirmada no código:

1. **As alternativas são embaralhadas no navegador.** Cada pergunta passa por um embaralhamento (Fisher-Yates) que muda a posição da resposta certa antes de ser exibida.
2. **O servidor confere pela posição original.** A função que salva a pontuação usa uma tabela de gabarito com o número da posição correta da lista original. Como a ordem exibida foi embaralhada, o número enviado quase nunca bate — o acerto é descartado. Por isso a pontuação salva fica bem menor que a real (normalmente 1).
3. **27 perguntas nem estão no gabarito do servidor.** O banco tem 263 perguntas, o gabarito do servidor tem 236. Acertos nessas 27 (várias da categoria "Projeta Aula" e "História") nunca contam.

## Correção proposta

- Trocar o gabarito do servidor de "número da posição" para o **texto da alternativa correta** de cada pergunta, gerado automaticamente a partir do banco de perguntas — assim o embaralhamento deixa de importar.
- O quiz passa a enviar, junto com a resposta, o **texto da alternativa escolhida**; o servidor compara com o gabarito (comparação normalizada: sem diferença de acentos/maiúsculas/espaços).
- Regenerar o gabarito cobrindo **todas as 263 perguntas**, eliminando as 27 faltantes, e deixar um script de geração para manter sincronizado quando novas perguntas forem criadas.
- Manter intacta a validação por token/HMAC das perguntas geradas por IA e todas as demais regras de segurança (limite de pontos, deduplicação por pergunta, autenticação do usuário).

## Verificação

- Rodar uma sessão real do quiz no navegador acertando várias perguntas seguidas, parar e salvar, e conferir no banco que o registro gravado tem o número correto de pontos.
- Conferir que o Top 10 passa a exibir o recorde real de cada pessoa.

## Detalhes técnicos

- `supabase/functions/submit-quiz-score/answers.ts`: passa a exportar `ANSWER_TEXTS: Record<string, string>` gerado do `src/lib/quizData.ts` (todas as ids, inclusive 500-547).
- `supabase/functions/submit-quiz-score/index.ts`: para perguntas estáticas, valida `normalize(a.selectedText) === normalize(ANSWER_TEXTS[id])`; fallback para o índice antigo apenas se o texto não vier. Bloco das perguntas dinâmicas (`dyn_`, HMAC) permanece igual.
- `src/pages/Quiz.tsx`: `AnswerRecord` ganha `selectedText: string` preenchido com `q.options[optionIndex]`.
- Script `scripts/generate-quiz-answers.ts` para regenerar `answers.ts` a partir do banco de perguntas.
- Sem alterações de schema do banco.
