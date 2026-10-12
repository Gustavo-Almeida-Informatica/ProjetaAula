import { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface LightboxImage {
  src: string;
  alt: string;
}

export default function ImageLightbox({ image, onClose }: {
  image: LightboxImage | null;
  onClose: () => void;
}) {
  const openerRef = useRef<HTMLElement | null>(null);

  return (
    <DialogPrimitive.Root open={image !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onOpenAutoFocus={() => {
            openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            openerRef.current?.focus();
          }}
          onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <DialogPrimitive.Title className="sr-only">{image?.alt ?? "Imagem ampliada"}</DialogPrimitive.Title>
          {image && <img src={image.src} alt={image.alt} className="max-w-full max-h-[90dvh] object-contain rounded-lg" />}
          <DialogPrimitive.Close asChild>
            <Button type="button" variant="ghost" size="icon" aria-label="Fechar imagem"
              className="absolute top-4 right-4 rounded-full bg-background/80 text-foreground hover:bg-background">
              <X aria-hidden="true" />
            </Button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}