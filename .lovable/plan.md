# Trocar o vídeo das abas "Drivers e BIOS" e "Lógica Básica" pelo HTML enviado

## O que foi pedido
- Remover o vídeo atual (`/videos/em-breve.mp4`, que nunca existiu) das duas abas "em breve".
- Colocar no lugar o HTML enviado (`projeta-aula-video-autonomo-2.html`), que contém um vídeo embutido com botão "Ativar som".

## O que o HTML enviado contém
- Um único vídeo MP4 embutido (1280×720, 8 segundos, com som), que roda sozinho (autoplay), repetindo em loop, sem som até a pessoa clicar no botão laranja "Ativar som" (que alterna para "Desativar som").
- O restante do HTML é só a casca preta em volta desse vídeo.

## Plano
1. **Extrair o vídeo do HTML** e registrá-lo como ativo do site (CDN do Lovable), sem copiar o arquivo HTML de 3,3 MB para o projeto — o resultado na tela fica idêntico ao HTML, porém mais leve e mais rápido de carregar.
2. **Atualizar `src/pages/Software.tsx`** (somente o bloco `ComingSoonBlock`, usado pelas duas abas):
   - Remover o `<video>` antigo apontando para `/videos/em-breve.mp4` e a lógica de `onError` que escondia o player.
   - Colocar o vídeo novo com o mesmo comportamento do HTML: toca sozinho, sem som, em loop, e um botão laranja "Ativar som" que liga/desliga o som (o React replica exatamente o script do HTML).
   - Manter o título "(em breve)" e a frase "Este conteúdo está sendo preparado." acima do vídeo.
   - Manter o estilo do site (cantos arredondados, largura máxima `max-w-2xl`, tema escuro).
3. **Não mexer** em: outras abas, quiz, banco, rotas, índice de busca (as abas continuam sem conteúdo indexado).

## Detalhes técnicos
- Arquivo novo: `src/assets/em-breve.mp4.asset.json` (ponteiro de ativo gerado por `lovable-assets` a partir do vídeo extraído; o MP4 original fica só no CDN).
- Vídeo: `autoPlay muted loop playsInline preload="auto"`, com `useState` do som e botão `aria-label` próprio.
- Sobreposição de som com clique: o botão fica acima do vídeo (`position` relativo no contêiner), igual ao HTML original.

## Verificação
- Abrir as duas abas no navegador (desktop e celular) e confirmar: vídeo toca em loop, botão "Ativar som"/"Desativar som" funciona, nada quebra, build OK.

## Arquivos alterados
- `src/pages/Software.tsx`
- `src/assets/em-breve.mp4.asset.json` (novo, gerado pela ferramenta de ativos)
