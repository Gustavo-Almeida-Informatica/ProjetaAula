## Plano para corrigir Cadastro e Login

### Objetivo
Fazer o fluxo funcionar de forma simples: o usuário cria conta, entra no site sem precisar confirmar e-mail, e os botões deixam claro qual ação está sendo executada.

### O que vou ajustar

1. **Garantir cadastro sem verificação de e-mail**
   - Confirmar/ativar a configuração do backend para não exigir confirmação por e-mail.
   - Manter o cadastro por e-mail e senha funcionando imediatamente após criar a conta.

2. **Separar visualmente Sign Up e Sign In**
   - Quando estiver em **Criar Conta**, mostrar uma confirmação visual clara de que o formulário vai registrar uma nova conta.
   - Quando estiver em **Entrar**, mostrar uma confirmação visual clara de que o formulário vai fazer login.
   - Evitar qualquer dúvida entre os botões “Criar Conta” e “Entrar”.

3. **Corrigir a lógica do formulário**
   - No modo **Criar Conta**, chamar somente o fluxo de cadastro primeiro.
   - Depois do cadastro bem-sucedido, entrar automaticamente no site.
   - No modo **Entrar**, chamar somente o fluxo de login.
   - Remover qualquer comportamento que tente trocar de função ou rota indevidamente.

4. **Melhorar mensagens de erro**
   - Se o e-mail já existir: orientar a clicar em “Entrar”.
   - Se a senha estiver errada: mostrar mensagem clara.
   - Se a senha tiver menos de 6 caracteres: mostrar a regra correta.
   - Se houver erro de autenticação, não mostrar mensagem genérica confusa.

5. **Validar o fluxo no preview**
   - Testar visualmente o formulário em `/login`.
   - Confirmar que os botões mostram o estado correto.
   - Confirmar que o código não está tentando exigir confirmação de e-mail.

### Arquivos prováveis
- `src/pages/Login.tsx`
- Configuração de autenticação do backend, se ainda estiver exigindo confirmação por e-mail

### Resultado esperado
O usuário poderá criar conta com nome, e-mail e senha de pelo menos 6 caracteres, sem confirmação por e-mail, e será direcionado para dentro do site após cadastro/login bem-sucedido.