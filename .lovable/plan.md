# Diagnóstico

Analisei os logs de autenticação e requisições de rede. O problema **não é** validação de senha, chaves do Supabase ou botões trocados. O sistema está funcionando — o cadastro é criado com sucesso (status 200 em `/signup`). O que falha é o **login automático logo em seguida**:

- Primeiro usuário: `400: Email not confirmed`
- Usuários seguintes: `400: Invalid credentials` (mesma causa — conta existe mas e-mail não foi confirmado; o Supabase retorna `invalid_credentials` quando a confirmação é exigida e ainda não ocorreu)

Ou seja: **a confirmação de e-mail está ativa** no projeto, mas o código em `src/pages/Login.tsx` tenta chamar `signInWithPassword` imediatamente após o `signUp`, o que sempre vai falhar até o usuário clicar no link do e-mail.

# Opções para resolver

Preciso que você escolha uma das duas abordagens antes de eu implementar:

**Opção A — Manter confirmação de e-mail (mais seguro)**
- Remover a tentativa de login automático pós-cadastro.
- Após cadastro bem-sucedido, mostrar uma tela/toast claro: *"Conta criada! Confira seu e-mail (inclusive spam) e clique no link de confirmação para entrar."*
- Adicionar botão "Reenviar e-mail de confirmação".
- Tratar o erro `email_not_confirmed` no login com mensagem específica em vez de "e-mail ou senha inválidos".

**Opção B — Desativar confirmação de e-mail (mais simples, menos seguro)**
- Ativar `auto_confirm_email` no Supabase Auth via `configure_auth`.
- Manter o fluxo atual de login automático pós-cadastro (funcionará imediatamente).
- Aviso: qualquer pessoa poderá criar conta com e-mails que não são seus.

# O que NÃO vou mexer

- Chaves/URL do Supabase (`.env`): estão corretas, as requisições retornam 200.
- Validação de senha no frontend: já está em 6 caracteres mínimo, sem regras extras.
- Botões de "Entrar" vs "Criar Conta": o código está correto, chamam funções distintas.

# Qual opção você prefere, A ou B?
