import type { ClipboardEvent, KeyboardEvent, MouseEvent, SyntheticEvent } from "react";

/**
 * Props que dificultam copiar o texto exibido (Quiz e Digitação):
 * bloqueia seleção (desktop e long-press no celular), menu do botão direito
 * e o atalho Ctrl/Cmd+C. Aplicar apenas nas áreas de conteúdo.
 */
export const noCopyProps = {
  className: "select-none",
  onContextMenu: (e: MouseEvent) => e.preventDefault(),
  onCopy: (e: ClipboardEvent) => e.preventDefault(),
  onCut: (e: ClipboardEvent) => e.preventDefault(),
  onKeyDown: (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && ["c", "x", "a"].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  },
  // impede o long-press de iniciar seleção no celular
  onSelectCapture: (e: SyntheticEvent) => e.preventDefault(),
  style: {
    WebkitUserSelect: "none",
    userSelect: "none",
    // iOS Safari: remove o balão "Copiar/Selecionar" no toque longo
    WebkitTouchCallout: "none",
    // Android Chrome: remove o realce azul do toque longo
    WebkitTapHighlightColor: "transparent",
  } as const,
};
