import { runVisualg } from "./visualg/interpreter";
import type { VisualgTestCase, WebCheck } from "./types";

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

export function checkFill(answer: string, accepted: string[]) {
  return accepted.some((a) => norm(a) === norm(answer));
}

export function checkVisualg(code: string, tests: VisualgTestCase[]) {
  return tests.map((t) => {
    const r = runVisualg(code, t.input);
    const out = norm(r.output);
    const ok = !r.error && t.expectedContains.every((e) => out.includes(norm(e)));
    return { ok, input: t.input, error: r.error?.message, output: r.output };
  });
}

export function checkWeb(html: string, css: string, checks: WebCheck[]) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const cssN = css.toLowerCase().replace(/\/\*[\s\S]*?\*\//g, "");
  return checks.map((c) => {
    let ok = false;
    try {
      if (c.type === "selector") ok = doc.querySelectorAll(c.selector).length >= (c.min ?? 1);
      else if (c.type === "text") ok = Array.from(doc.querySelectorAll(c.selector)).some((el) => norm(el.textContent ?? "").includes(norm(c.includes)));
      else if (c.type === "attr") ok = Array.from(doc.querySelectorAll(c.selector)).some((el) => (el.getAttribute(c.attr) ?? "").trim() !== "");
      else {
        const re = new RegExp(`(^|[\\s;{])${c.property.toLowerCase().replace(/[-]/g, "\\-")}\\s*:\\s*([^;}]*)`, "g");
        let m: RegExpExecArray | null;
        while ((m = re.exec(cssN))) if (!c.valueIncludes || m[2].includes(c.valueIncludes.toLowerCase())) { ok = true; break; }
      }
    } catch { ok = false; }
    return { ok, description: c.description };
  });
}
