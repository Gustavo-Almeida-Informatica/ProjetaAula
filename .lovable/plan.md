## Problema

O Instagram do José Antônio foi adicionado ao array `teamMembers` em `src/pages/Index.tsx`, mas o link não está abrindo a página correta do Instagram.

A URL atual é construída assim:
```
https://instagram.com/${member.insta.replace("@", "")}
```

Isso deveria gerar `https://instagram.com/joseantoniofilho365`, que é válido. Possíveis causas do problema:
1. O cache do navegador não atualizou após a última alteração.
2. O link está apontando para o domínio antigo `instagram.com` em vez do oficial `www.instagram.com/`, o que em alguns casos (especialmente em apps embarcados) não abre corretamente.

## Plano

1. **Atualizar `src/pages/Index.tsx`** — usar a URL oficial completa `https://www.instagram.com/<user>/` (com `www.` e barra final) para garantir que o link funcione em todos os navegadores e apps.
2. **Confirmar** que o campo `insta: "@joseantoniofilho365"` está correto para o José Antônio.
3. **Manter** `target="_blank"` e `rel="noopener noreferrer"` (já estão presentes) para abrir em nova aba com segurança.

Nenhuma outra página será alterada.