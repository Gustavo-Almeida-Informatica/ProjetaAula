# Trocar o vídeo das abas "Drivers e BIOS" e "Lógica Básica" pelo HTML enviado

## O que foi pedido
- Remover o vídeo atual (`/videos/em-breve.mp4`, que nunca existiu) das duas abas "em breve".
- Colocar no lugar o vídeo do HTML enviado (`projeta-aula-video-autonomo-2.html`), com este comportamento:
  - Toca sozinho, em loop, **com o som sempre ativo**, **sem controles e sem botão**.
  - Se o navegador bloquear o autoplay com som, o vídeo toca mudo e o som é ligado automaticamente no primeiro clique, toque ou tecla da pessoa.

## O que o HTML enviado contém
- Um único vídeo MP4 embutido (1280×720, 8 segundos, com som), rodando em loop. O restante do HTML é só a casca preta em volta — não será copiado.

## Plano
1. **Extrair o vídeo do HTML** e registrá-lo como ativo do site (CDN do Lovable), sem copiar o arquivo HTML de 3,3 MB para o projeto — o resultado na tela fica idêntico, porém mais leve e mais rápido.
2. **Atualizar `src/pages/Software.tsx`** (somente o bloco `ComingSoonBlock`, usado pelas duas abas):
   - Remover o `<video>` antigo apontando para `/videos/em-breve.mp4` e a lógica de `onError` que escondia o player.
   - Colocar o vídeo novo: `autoPlay`, `loop`, `playsInline`, `preload="auto"`, **sem `controls` e sem botão**.
   - Tentar iniciar com som (`muted = false`); se o navegador recusar o autoplay com som, tocar mudo e registrar um ouvinte único de `pointerdown`/`touchstart`/`keydown` na página que liga o som na primeira interação (e depois se remove).
   - Manter o título "(em breve)" e a frase "Este conteúdo está sendo preparado." acima do vídeo.
   - Manter o estilo do site (cantos arredondados, largura máxima `max-w-2xl`, tema escuro).
3. **Não mexer** em: outras abas, quiz, banco, rotas, índice de busca (as abas continuam sem conteúdo indexado).

## Detalhes técnicos
- Arquivo novo: `src/assets/em-breve.mp4.asset.json` (ponteiro de ativo gerado por `lovable-assets` a partir do vídeo extraído; o MP4 fica só no CDN).
- React: `useRef` no `<video>` + `useEffect` que chama `video.play()` com som; em caso de rejeição (NotAllowedError), define `muted = true`, chama `play()` de novo e adiciona `addEventListener` (uma vez) para `pointerdown`, `touchstart` e `keydown` que volta `muted` para `false`.

## Verificação
- Abrir as duas abas no navegador (desktop e celular) e confirmar: vídeo toca em loop, som liga na primeira interação quando o autoplay com som é bloqueado, nada quebra, build OK.

## Arquivos alterados
- `src/pages/Software.tsx`
- `src/assets/em-breve.mp4.asset.json` (novo, gerado pela ferramenta de ativos)
