

# Plano: Fotos Reais, Programas com Download, Foto de Perfil e Verificação de Login

## Resumo

Quatro entregas: (1) adicionar imagens reais nas seções de Hardware que estão sem foto, (2) criar área de "Programas Essenciais" com explicações, prints e links de download, (3) foto de perfil com upload e integração com Google, (4) desativar auto-confirm de email para exigir verificação no cadastro.

---

## 1. Adicionar fotos reais nas seções sem imagem (Hardware)

Atualmente, apenas as 8 primeiras seções do Hardware têm fotos. As 15 seções novas (Gabinete, Placa de Som, Placa de Rede, Teclado, Mouse, Monitor, Impressora, Scanner, Webcam, Kit Multimídia, BIOS/POST, Interfaces, Slots, Chipsets, Memórias, RAID, Binário) estão **sem imagem**.

**Solução**: Buscar imagens reais de alta qualidade (Unsplash/Pexels, royalty-free) para cada seção e adicioná-las como assets. Serão ~15 novas imagens cobrindo:
- Gabinete (desktop e torre)
- Placa de som, placa de rede, modem
- Teclado, mouse, monitor, impressora, scanner, webcam
- Kit multimídia, BIOS/POST na tela
- Interfaces/portas traseiras do PC
- Slots de expansão, chipset, memórias RAM
- Discos em RAID, código binário

**Arquivo**: `src/pages/Hardware.tsx` — adicionar campo `image` em cada TopicCard que está faltando.

---

## 2. Programas Essenciais com Explicação e Área de Download

Transformar a tab "Programas Úteis" do Software.tsx em uma seção mais completa com:
- **Imagens reais** (screenshots dos programas)
- **Link de download** direto para cada programa
- **Explicação simples** de para que serve

Programas a incluir (com link de download):
- Google Chrome, LibreOffice, VLC, WinRAR, WhatsApp Desktop, Windows Defender, CCleaner, 7-Zip, Zoom, Canva

Cada programa terá: nome, ícone/screenshot, descrição, lista de funcionalidades e botão "Baixar".

**Arquivo**: `src/pages/Software.tsx` — reformular a tab "programas" com cards que incluem imagem e botão de download.

---

## 3. Foto de Perfil (Upload + Google como padrão)

### Banco de dados
- Criar storage bucket `avatars` (público) com RLS para upload/delete pelo dono
- O campo `avatar_url` já existe na tabela `profiles`

### Lógica
- Se o usuário logou com Google, usar a foto do Google como avatar padrão (extrair de `user.user_metadata.avatar_url`)
- O trigger `handle_new_user` será atualizado para salvar `avatar_url` do Google automaticamente
- Na página de Perfil: exibir foto atual com botão "Trocar Foto"
- Upload via input file → enviar para storage bucket → salvar URL no perfil
- Exibir avatar na Navbar ao lado do nome

### Arquivos modificados
- **Migration SQL**: criar bucket `avatars` + atualizar trigger
- **`src/pages/Profile.tsx`**: adicionar upload de foto com preview
- **`src/contexts/AuthContext.tsx`**: incluir `avatar_url` no Profile interface (já existe)
- **`src/components/Navbar.tsx`**: exibir avatar do usuário

---

## 4. Desativar Auto-Confirm de Email (Verificação no Login)

A memória do projeto indica que auto-confirm está ativado. A suspeita do usuário é correta: atualmente qualquer pessoa pode criar conta e entrar sem verificar o email.

**Solução**:
- Usar `configure_auth` para desativar auto-confirm (`enable_signup: true`, `double_confirm_changes: true`, sem auto-confirm)
- Atualizar `Login.tsx` para mostrar mensagem "Verifique seu email" após registro, em vez de logar automaticamente
- Adicionar verificação `email_confirmed_at` antes de permitir login

---

## Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/pages/Hardware.tsx` | Adicionar ~15 imagens reais nas seções sem foto |
| `src/pages/Software.tsx` | Reformular tab Programas com screenshots e links de download |
| `src/pages/Profile.tsx` | Upload de foto de perfil com preview e troca |
| `src/components/Navbar.tsx` | Exibir avatar do usuário logado |
| `src/contexts/AuthContext.tsx` | Garantir avatar_url no perfil |
| `src/pages/Login.tsx` | Mensagem de verificação de email após cadastro |
| **Migration SQL** | Bucket avatars + RLS + atualizar trigger para foto Google |
| **Auth config** | Desativar auto-confirm de email |

## O que NÃO muda
- Conteúdo educacional existente
- Quiz e lógica de pontuação
- Equipe e comunidade
- Visual glass/âmbar

