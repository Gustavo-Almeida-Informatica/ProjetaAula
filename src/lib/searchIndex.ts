import { topics as hardwareTopics } from "@/pages/Hardware";
import { programs as softwarePrograms, content as softwareContent } from "@/pages/Software";
import { timeline as historyTimeline, peripherals as historyPeripherals } from "@/pages/History";
import { galleryContent } from "@/pages/Gallery";
import { slugify } from "@/lib/slug";

/** Minúsculas e sem acentos: "Memória" e "memoria" ficam iguais. */
export function normalizeSearch(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function matchesSearch(query: string, ...fields: string[]): boolean {
  const q = normalizeSearch(query);
  return !q || fields.some((f) => normalizeSearch(f).includes(q));
}

export type SearchCategory = "Hardware" | "Software" | "História" | "Conectores";

export interface SearchItem {
  title: string;
  desc: string;
  category: SearchCategory;
  route: string;
  badgeClass: string;
}

const badgeClasses: Record<SearchCategory, string> = {
  Hardware: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Software: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "História": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Conectores: "bg-purple-500/15 text-purple-300 border-purple-500/30",
};

function build(): SearchItem[] {
  const items: SearchItem[] = [];

  hardwareTopics.forEach((t) =>
    items.push({
      title: t.title,
      desc: t.desc,
      category: "Hardware",
      route: `/hardware?item=${slugify(t.title)}`,
      badgeClass: badgeClasses.Hardware,
    }),
  );

  softwarePrograms.forEach((p) =>
    items.push({
      title: p.name,
      desc: p.desc,
      category: "Software",
      route: `/software?tab=programas&item=${slugify(p.name)}`,
      badgeClass: badgeClasses.Software,
    }),
  );

  Object.entries(softwareContent).forEach(([tabId, sections]) =>
    sections.forEach((s) => {
      // Abas "em breve" (Drivers e BIOS, Lógica Básica) não têm conteúdo indexado
      if (tabId === "drivers" || tabId === "logica") return;
      items.push({
        title: s.title,
        desc: s.desc,
        category: "Software",
        route: `/software?tab=${tabId}&item=${slugify(s.title)}`,
        badgeClass: badgeClasses.Software,
      });
    }),
  );

  historyTimeline.forEach((t) =>
    items.push({
      title: t.title,
      desc: t.desc,
      category: "História",
      route: `/historia?item=${slugify(t.title)}`,
      badgeClass: badgeClasses["História"],
    }),
  );

  historyPeripherals.forEach((sec) =>
    sec.items.forEach((it) =>
      items.push({
        title: it.name,
        desc: it.detail,
        category: "História",
        route: `/historia?item=${slugify(it.name)}`,
        badgeClass: badgeClasses["História"],
      }),
    ),
  );

  Object.entries(galleryContent).forEach(([catId, arr]) =>
    arr.forEach((g) =>
      items.push({
        title: g.title,
        desc: g.desc,
        category: "Conectores",
        route: `/galeria?cat=${catId}&item=${slugify(g.title)}`,
        badgeClass: badgeClasses.Conectores,
      }),
    ),
  );

  return items;
}

export const searchIndex: SearchItem[] = build();

export function searchAll(query: string, limit = 30): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .filter((it) => matchesSearch(q, it.title, it.desc))
    .slice(0, limit);
}
