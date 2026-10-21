/** Minúsculas e sem acentos: "Memória" e "memoria" ficam iguais. */
export function normalizeSearch(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

/** true se a busca aparece em algum dos campos (ignorando acentos e maiúsculas). Busca vazia casa tudo. */
export function matchesSearch(query: string, ...fields: string[]): boolean {
  const q = normalizeSearch(query);
  return !q || fields.some((f) => normalizeSearch(f).includes(q));
}
