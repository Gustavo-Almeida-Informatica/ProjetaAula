import type { ClipboardEvent, KeyboardEvent, MouseEvent } from "react";

/**
 * Props que dificultam copiar o texto exibido (Quiz e Digitação):
 * bloqueia seleção, menu do botão direito e o atalho Ctrl/Cmd+C.
 * Aplicar apenas nas áreas de conteúdo — nunca no campo de digitação.
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
  onDragStart: (e: MouseEvent) => e.preventDefault(),
  style: { WebkitUserSelect: "none", userSelect: "none" } as const,
};
