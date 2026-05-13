import { topics as hardwareTopics } from "@/pages/Hardware";
import { programs as softwarePrograms, content as softwareContent } from "@/pages/Software";
import { timeline as historyTimeline, peripherals as historyPeripherals } from "@/pages/History";
import { galleryContent } from "@/pages/Gallery";

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

function makeRoute(base: string, query?: string) {
  return query ? `${base}?q=${encodeURIComponent(query)}` : base;
}

function build(): SearchItem[] {
  const items: SearchItem[] = [];

  hardwareTopics.forEach((t) =>
    items.push({
      title: t.title,
      desc: t.desc,
      category: "Hardware",
      route: makeRoute("/hardware", t.title),
      badgeClass: badgeClasses.Hardware,
    }),
  );

  softwarePrograms.forEach((p) =>
    items.push({
      title: p.name,
      desc: p.desc,
      category: "Software",
      route: makeRoute("/software", p.name),
      badgeClass: badgeClasses.Software,
    }),
  );

  Object.values(softwareContent).forEach((sections) =>
    sections.forEach((s) =>
      items.push({
        title: s.title,
        desc: s.desc,
        category: "Software",
        route: makeRoute("/software", s.title),
        badgeClass: badgeClasses.Software,
      }),
    ),
  );

  historyTimeline.forEach((t) =>
    items.push({
      title: t.title,
      desc: t.desc,
      category: "História",
      route: "/historia",
      badgeClass: badgeClasses["História"],
    }),
  );

  historyPeripherals.forEach((sec) =>
    sec.items.forEach((it) =>
      items.push({
        title: it.name,
        desc: it.detail,
        category: "História",
        route: "/historia",
        badgeClass: badgeClasses["História"],
      }),
    ),
  );

  Object.values(galleryContent).forEach((arr) =>
    arr.forEach((g) =>
      items.push({
        title: g.title,
        desc: g.desc,
        category: "Conectores",
        route: "/galeria",
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
    .filter((it) => it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q))
    .slice(0, limit);
}
