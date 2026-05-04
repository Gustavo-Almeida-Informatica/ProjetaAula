## Plano: Deletar Posts e Adicionar Fotos nos Posts da Comunidade

### 1. Migration SQL
- Adicionar coluna `image_url TEXT NULL` à tabela `community_posts`
- Criar bucket público `post-images`
- Políticas RLS no `storage.objects` para `post-images`:
  - SELECT: público
  - INSERT: usuários autenticados (pasta = `auth.uid()`)
  - DELETE: dono do arquivo

### 2. Atualizar `src/pages/Community.tsx`

**Interface Post**: adicionar `image_url?: string | null`

**Formulário de novo post**:
- Novo campo de upload de imagem (input `type="file"` com ícone ImageIcon)
- Preview da imagem selecionada antes de publicar (com botão X para remover)
- Ao publicar: upload no bucket `post-images` em `${user.id}/${timestamp}-${name}`, pegar `publicUrl` e salvar em `image_url`
- Estado: `imageFile`, `imagePreview`, `uploading`

**Renderização do post**:
- Se `post.image_url` existir, exibir `<img>` em container `aspect-video` (16:9), `rounded-lg`, `object-cover`, `border border-border/30`, abaixo do conteúdo e antes das hashtags

**Botão deletar**:
- Ícone `Trash2` no canto superior direito do card, visível apenas se `post.user_id === user?.id`
- Ao clicar: `confirm("Deletar este post?")`, depois `supabase.from("community_posts").delete().eq("id", post.id)`
- Tentar remover a imagem do storage também (se `image_url` apontar para o bucket)
- Toast de sucesso/erro e `fetchPosts()`

### 3. Detalhes técnicos

- Limite de upload: 5MB, aceitar apenas `image/*`
- Validação client-side antes do upload
- Cascade dos `post_likes` e `post_comments`: serão órfãos ao deletar — adicionar `ON DELETE CASCADE` via migration (alterar colunas `post_id` para referenciar `community_posts(id) ON DELETE CASCADE`)

### Arquivos alterados

| Arquivo | Mudança |
|---|---|
| Migration | Coluna `image_url`, bucket `post-images` + RLS, FKs com cascade em likes/comments |
| `src/pages/Community.tsx` | Upload de imagem, render da imagem, botão deletar |

### O que NÃO muda
- Likes, comentários, hashtags, ordenação, busca
- Visual glass/âmbar
- Demais permissões
