import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { MapPin } from "lucide-react";

export interface PublicProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  city: string | null;
  role: string | null;
}

/** Busca em lote os dados públicos de perfil (nome, foto, cidade, papel). */
export async function fetchPublicProfiles(ids: string[]): Promise<Map<string, PublicProfile>> {
  const map = new Map<string, PublicProfile>();
  const unique = Array.from(new Set(ids.filter(Boolean)));
  if (unique.length === 0) return map;
  const { data, error } = await supabase.functions.invoke("public-profiles", {
    body: { ids: unique },
  });
  if (error || !data?.profiles) return map;
  (data.profiles as PublicProfile[]).forEach((p) => map.set(p.id, p));
  return map;
}

export function initialsOf(name?: string | null) {
  return (name || "?")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface Props {
  profile?: PublicProfile;
  fallbackName: string;
  size?: "sm" | "md";
}

/** Avatar do usuário que abre um pequeno card de perfil ao passar o mouse. */
export default function ProfileHoverCard({ profile, fallbackName, size = "md" }: Props) {
  const [open, setOpen] = useState(false);
  const name = profile?.full_name || fallbackName || "Anônimo";
  const dim = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          aria-label={`Ver perfil de ${name}`}
          className="shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <Avatar className={`${dim} border border-border/60`}>
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={`Foto de ${name}`} className="object-cover" />
            ) : null}
            <AvatarFallback className="text-[11px] font-bold gradient-warm text-primary-foreground">
              {initialsOf(name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 glass border-border/60" side="top" align="start">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12 border border-border/60">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={`Foto de ${name}`} className="object-cover" />
            ) : null}
            <AvatarFallback className="text-xs font-bold gradient-warm text-primary-foreground">
              {initialsOf(name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{name}</p>
            {profile?.role && (
              <p className="text-[11px] text-primary">
                {profile.role === "professor" ? "👨‍🏫 Professor" : "🎓 Aluno"}
              </p>
            )}
            {profile?.city && (
              <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin className="w-3 h-3" /> {profile.city}
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
