import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type ProgressKind = "lesson" | "exercise" | "project";
type Entry = { kind: ProgressKind; score: number };
const LS_KEY = "projeta-logica-progress";

function readLocal(): Record<string, Entry> {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; }
}

/** Progresso salvo na conta (quando logado) ou no navegador (sem login). */
export function useLogicaProgress() {
  const { user } = useAuth();
  const [items, setItems] = useState<Record<string, Entry>>(readLocal);

  useEffect(() => {
    if (!user) { setItems(readLocal()); return; }
    let alive = true;
    supabase.from("logica_progress").select("item_id,kind,score").then(({ data }) => {
      if (!alive || !data) return;
      const map: Record<string, Entry> = {};
      data.forEach((r) => { map[r.item_id] = { kind: r.kind as ProgressKind, score: r.score }; });
      setItems(map);
    });
    return () => { alive = false; };
  }, [user]);

  const mark = useCallback(async (itemId: string, kind: ProgressKind, score = 100) => {
    setItems((prev) => {
      const best = Math.max(prev[itemId]?.score ?? 0, score);
      const next = { ...prev, [itemId]: { kind, score: best } };
      if (!user) localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
    if (user) {
      const best = Math.max(items[itemId]?.score ?? 0, score);
      await supabase.from("logica_progress").upsert(
        { user_id: user.id, item_id: itemId, kind, score: best },
        { onConflict: "user_id,item_id" },
      );
    }
  }, [user, items]);

  return { items, mark, isDone: (id: string) => !!items[id], signedIn: !!user };
}
