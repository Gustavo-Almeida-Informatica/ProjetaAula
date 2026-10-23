import { describe, it, expect } from "vitest";
import { searchAll, matchesSearch } from "@/lib/searchIndex";
import { quizQuestions, resolveContentLink } from "@/lib/quizData";
import { topics } from "@/pages/Hardware";
import { programs, content } from "@/pages/Software";
import { timeline, peripherals, extras } from "@/pages/History";
import { galleryContent } from "@/pages/Gallery";
import { slugify } from "@/lib/slug";

describe("busca sem acento", () => {
  it('"memoria" encontra "Memória RAM"', () => {
    expect(searchAll("memoria").some((r) => r.title === "Memória RAM")).toBe(true);
  });
  it("ignora maiúsculas e acentos", () => {
    expect(matchesSearch("PLACA-MAE", "Placa-Mãe")).toBe(true);
    expect(matchesSearch("xyz", "Placa-Mãe")).toBe(false);
  });
});

describe("quiz", () => {
  it("perguntas fixas não levam a resposta certa para o navegador", () => {
    expect(quizQuestions.filter((q) => q.correct !== undefined)).toEqual([]);
  });
  it('todo "Ir para o conteúdo" aponta para um item existente', () => {
    const slugs = new Set<string>([
      ...topics.map((t) => slugify(t.title)),
      ...programs.map((p) => slugify(p.name)),
      ...Object.values(content).flat().map((s) => slugify(s.title)),
      ...timeline.map((t) => slugify(t.title)),
      ...[...peripherals, ...extras].flatMap((s) => s.items.map((i) => slugify(i.name))),
      ...Object.values(galleryContent).flat().map((g) => slugify(g.title)),
    ]);
    const broken = quizQuestions
      .map((q) => ({ id: q.id, link: resolveContentLink(q) }))
      .filter(({ link }) => link?.item && !slugs.has(link.item));
    expect(broken).toEqual([]);
  });
});
