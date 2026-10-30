// Analisador léxico e sintático de um subconjunto do Visualg 3.0.
// Nada aqui usa eval() nem executa código do navegador: o texto do aluno
// vira uma árvore (AST) que o interpretador percorre.

export class VisualgError extends Error {
  line: number;
  constructor(line: number, message: string) {
    super(message);
    this.line = line;
  }
}

export type BaseType = "inteiro" | "real" | "caractere" | "logico";

export interface TypeSpec {
  base: BaseType;
  /** Limites de cada dimensão ([1,5] = vetor[1..5]). Ausente = variável simples. */
  dims?: [number, number][];
}

type TokType = "id" | "kw" | "num" | "str" | "op" | "eof";

interface Token {
  type: TokType;
  value: string;
  line: number;
  num?: number;
  isReal?: boolean;
}

const KEYWORDS = new Set([
  "algoritmo", "var", "inicio", "fimalgoritmo",
  "escreva", "escreval", "leia",
  "se", "entao", "senao", "fimse",
  "escolha", "caso", "outrocaso", "fimescolha",
  "para", "de", "ate", "passo", "faca", "fimpara",
  "enquanto", "fimenquanto", "repita", "fimrepita", "interrompa",
  "e", "ou", "nao", "xou", "mod",
  "verdadeiro", "falso",
  "inteiro", "real", "caractere", "caracter", "literal", "logico", "vetor",
  "procedimento", "fimprocedimento", "funcao", "fimfuncao", "retorne",
  "limpatela",
  // reconhecidos, mas ainda não suportados neste laboratório
  "aleatorio", "arquivo", "timer", "pausa", "debug", "eco", "cronometro",
  "registro", "fimregistro", "tipo", "const",
]);

export const UNSUPPORTED_COMMANDS = [
  "aleatorio", "arquivo", "timer", "pausa", "debug", "eco", "cronometro",
  "registro", "fimregistro", "tipo", "const",
];

const TYPE_WORDS: Record<string, BaseType> = {
  inteiro: "inteiro",
  real: "real",
  caractere: "caractere",
  caracter: "caractere",
  literal: "caractere",
  logico: "logico",
};

/** Remove acentos e passa para minúsculas (Visualg não diferencia maiúsculas). */
export function normalizeWord(w: string): string {
  return w.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let line = 1;
  const n = src.length;
  const isLetter = (c: string) => /[A-Za-z_\u00C0-\u00FF]/.test(c);
  const isDigit = (c: string) => c >= "0" && c <= "9";

  while (i < n) {
    const c = src[i];
    if (c === "\n") { line++; i++; continue; }
    if (c === " " || c === "\t" || c === "\r") { i++; continue; }
    if (c === "/" && src[i + 1] === "/") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      let s = "";
      while (j < n && src[j] !== '"') {
        if (src[j] === "\n") throw new VisualgError(line, "Texto sem aspas de fechamento. Feche o texto com \" na mesma linha.");
        s += src[j];
        j++;
      }
      if (j >= n) throw new VisualgError(line, "Texto sem aspas de fechamento. Feche o texto com \".");
      tokens.push({ type: "str", value: s, line });
      i = j + 1;
      continue;
    }
    if (isDigit(c)) {
      let j = i;
      while (j < n && isDigit(src[j])) j++;
      let isReal = false;
      if (src[j] === "." && src[j + 1] !== "." && isDigit(src[j + 1] ?? "")) {
        isReal = true;
        j++;
        while (j < n && isDigit(src[j])) j++;
      }
      const text = src.slice(i, j);
      tokens.push({ type: "num", value: text, line, num: Number(text), isReal });
      i = j;
      continue;
    }
    if (isLetter(c)) {
      let j = i;
      while (j < n && (isLetter(src[j]) || isDigit(src[j]))) j++;
      const raw = src.slice(i, j);
      const word = normalizeWord(raw);
      tokens.push({ type: KEYWORDS.has(word) ? "kw" : "id", value: word, line });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (["<-", ":=", "<=", ">=", "<>", ".."].includes(two)) {
      tokens.push({ type: "op", value: two === ":=" ? "<-" : two, line });
      i += 2;
      continue;
    }
    if ("+-*/\\^%=<>()[],:;".includes(c)) {
      tokens.push({ type: "op", value: c, line });
      i++;
      continue;
    }
    throw new VisualgError(line, `Caractere inválido: "${c}".`);
  }
  tokens.push({ type: "eof", value: "", line });
  return tokens;
}

// ---------- AST ----------

export type Expr =
  | { k: "num"; v: number; real: boolean; line: number }
  | { k: "str"; v: string; line: number }
  | { k: "bool"; v: boolean; line: number }
  | { k: "var"; name: string; idx: Expr[] | null; line: number }
  | { k: "call"; name: string; args: Expr[]; line: number }
  | { k: "bin"; op: string; l: Expr; r: Expr; line: number }
  | { k: "un"; op: string; e: Expr; line: number };

export interface VarRef { name: string; idx: Expr[] | null; line: number }

export interface WriteArg { e: Expr; w: Expr | null; d: Expr | null }

export interface CaseClause {
  values: { from: Expr; to: Expr | null }[];
  body: Stmt[];
}

export type Stmt =
  | { k: "assign"; target: VarRef; e: Expr; line: number }
  | { k: "write"; args: WriteArg[]; nl: boolean; line: number }
  | { k: "read"; targets: VarRef[]; line: number }
  | { k: "if"; cond: Expr; then: Stmt[]; else: Stmt[] | null; line: number }
  | { k: "case"; e: Expr; cases: CaseClause[]; other: Stmt[] | null; line: number }
  | { k: "for"; v: VarRef; from: Expr; to: Expr; step: Expr | null; body: Stmt[]; line: number }
  | { k: "while"; cond: Expr; body: Stmt[]; line: number }
  | { k: "repeat"; body: Stmt[]; cond: Expr | null; line: number }
  | { k: "break"; line: number }
  | { k: "call"; name: string; args: Expr[]; line: number }
  | { k: "return"; e: Expr | null; line: number }
  | { k: "cls"; line: number };

export interface Decl { names: string[]; type: TypeSpec; line: number }

export interface Param { name: string; type: TypeSpec; byRef: boolean }

export interface Sub {
  kind: "proc" | "func";
  name: string;
  params: Param[];
  ret: BaseType | null;
  locals: Decl[];
  body: Stmt[];
  line: number;
}

export interface Program {
  name: string;
  globals: Decl[];
  subs: Map<string, Sub>;
  body: Stmt[];
}

const CLOSERS: Record<string, string> = {
  se: "fimse",
  escolha: "fimescolha",
  para: "fimpara",
  enquanto: "fimenquanto",
  repita: "ate",
  procedimento: "fimprocedimento",
  funcao: "fimfuncao",
  inicio: "fimalgoritmo",
};

class Parser {
  private t: Token[];
  private p = 0;
  private inFunc = false;

  constructor(tokens: Token[]) {
    this.t = tokens;
  }

  private get cur(): Token { return this.t[this.p]; }
  private peek(o = 1): Token { return this.t[Math.min(this.p + o, this.t.length - 1)]; }
  private next(): Token { const tk = this.t[this.p]; if (this.p < this.t.length - 1) this.p++; return tk; }

  private isKw(v: string, tk = this.cur) { return tk.type === "kw" && tk.value === v; }
  private isOp(v: string, tk = this.cur) { return tk.type === "op" && tk.value === v; }

  private describe(tk: Token) {
    if (tk.type === "eof") return "o fim do código";
    if (tk.type === "str") return `o texto "${tk.value}"`;
    return `"${tk.value}"`;
  }

  private expectKw(v: string, context?: string): Token {
    if (!this.isKw(v)) {
      throw new VisualgError(this.cur.line, `Esperava "${v}"${context ? " " + context : ""}, mas encontrei ${this.describe(this.cur)}.`);
    }
    return this.next();
  }

  private expectOp(v: string, context?: string): Token {
    if (!this.isOp(v)) {
      throw new VisualgError(this.cur.line, `Esperava "${v}"${context ? " " + context : ""}, mas encontrei ${this.describe(this.cur)}.`);
    }
    return this.next();
  }

  private expectId(context: string): Token {
    if (this.cur.type !== "id") {
      const extra = this.cur.type === "kw" ? ` ("${this.cur.value}" é uma palavra reservada do Visualg)` : "";
      throw new VisualgError(this.cur.line, `Esperava um nome ${context}, mas encontrei ${this.describe(this.cur)}${extra}.`);
    }
    return this.next();
  }

  parseProgram(): Program {
    this.expectKw("algoritmo", "no início do programa");
    let name = "";
    if (this.cur.type === "str") name = this.next().value;
    else throw new VisualgError(this.cur.line, 'Depois de "algoritmo" coloque o nome entre aspas, ex.: algoritmo "Meu Programa".');

    const globals: Decl[] = [];
    const subs = new Map<string, Sub>();
    for (;;) {
      if (this.isKw("var")) { this.next(); continue; }
      if (this.cur.type === "id") { globals.push(this.parseDecl()); continue; }
      if (this.isKw("procedimento") || this.isKw("funcao")) {
        const sub = this.parseSub();
        if (subs.has(sub.name)) throw new VisualgError(sub.line, `Já existe uma sub-rotina chamada "${sub.name}".`);
        subs.set(sub.name, sub);
        continue;
      }
      if (this.isKw("inicio")) break;
      this.unsupportedCheck();
      throw new VisualgError(this.cur.line, `Esperava a declaração de variáveis ou "inicio", mas encontrei ${this.describe(this.cur)}.`);
    }
    const start = this.next();
    const body = this.parseBlock(["fimalgoritmo"], "inicio", start.line);
    this.expectKw("fimalgoritmo");
    return { name, globals, subs, body };
  }

  private unsupportedCheck() {
    if (this.cur.type === "kw" && UNSUPPORTED_COMMANDS.includes(this.cur.value)) {
      throw new VisualgError(
        this.cur.line,
        `O comando "${this.cur.value}" existe no Visualg, mas ainda não é suportado neste laboratório.`,
      );
    }
  }

  private parseDecl(): Decl {
    const line = this.cur.line;
    const names = [this.expectId("de variável").value];
    while (this.isOp(",")) {
      this.next();
      names.push(this.expectId("de variável").value);
    }
    this.expectOp(":", "depois do nome da variável");
    const type = this.parseType();
    if (this.isOp(";")) this.next();
    return { names, type, line };
  }

  private parseBound(): number {
    let sign = 1;
    if (this.isOp("-")) { this.next(); sign = -1; }
    const tk = this.cur;
    if (tk.type !== "num" || tk.isReal) throw new VisualgError(tk.line, "O tamanho do vetor deve usar números inteiros, ex.: vetor[1..10].");
    this.next();
    return sign * (tk.num as number);
  }

  private parseType(): TypeSpec {
    if (this.isKw("vetor")) {
      this.next();
      this.expectOp("[", 'depois de "vetor"');
      const dims: [number, number][] = [];
      for (;;) {
        const lo = this.parseBound();
        this.expectOp("..", "entre os limites do vetor (ex.: 1..10)");
        const hi = this.parseBound();
        if (hi < lo) throw new VisualgError(this.cur.line, "O limite final do vetor deve ser maior ou igual ao inicial.");
        dims.push([lo, hi]);
        if (this.isOp(",")) { this.next(); continue; }
        break;
      }
      this.expectOp("]", "para fechar o tamanho do vetor");
      this.expectKw("de", 'depois do tamanho do vetor (ex.: vetor[1..5] de inteiro)');
      const base = this.parseBaseType();
      const total = dims.reduce((acc, [lo, hi]) => acc * (hi - lo + 1), 1);
      if (total > 100000) throw new VisualgError(this.cur.line, "Vetor grande demais para o laboratório (máximo de 100.000 posições).");
      return { base, dims };
    }
    return { base: this.parseBaseType() };
  }

  private parseBaseType(): BaseType {
    const tk = this.cur;
    if (tk.type === "kw" && TYPE_WORDS[tk.value]) { this.next(); return TYPE_WORDS[tk.value]; }
    throw new VisualgError(tk.line, `Tipo desconhecido ${this.describe(tk)}. Use inteiro, real, caractere ou logico.`);
  }

  private parseSub(): Sub {
    const kwTok = this.next();
    const kind = kwTok.value === "funcao" ? "func" : "proc";
    const name = this.expectId(kind === "func" ? "para a função" : "para o procedimento").value;
    const params: Param[] = [];
    if (this.isOp("(")) {
      this.next();
      while (!this.isOp(")")) {
        let byRef = false;
        if (this.isKw("var")) { this.next(); byRef = true; }
        const names = [this.expectId("de parâmetro").value];
        while (this.isOp(",")) { this.next(); names.push(this.expectId("de parâmetro").value); }
        this.expectOp(":", "depois do nome do parâmetro");
        const type = this.parseType();
        names.forEach((nm) => params.push({ name: nm, type, byRef }));
        if (this.isOp(";") || this.isOp(",")) { this.next(); continue; }
        if (!this.isOp(")")) throw new VisualgError(this.cur.line, `Esperava ")" para fechar os parâmetros, mas encontrei ${this.describe(this.cur)}.`);
      }
      this.next();
    }
    let ret: BaseType | null = null;
    if (kind === "func") {
      this.expectOp(":", "com o tipo de retorno da função (ex.: funcao soma(a, b: inteiro): inteiro)");
      ret = this.parseBaseType();
    }
    const locals: Decl[] = [];
    if (this.isKw("var")) {
      this.next();
      while (this.cur.type === "id") locals.push(this.parseDecl());
    }
    const startTok = this.expectKw("inicio", `para começar o corpo ${kind === "func" ? "da função" : "do procedimento"} "${name}"`);
    const closer = kind === "func" ? "fimfuncao" : "fimprocedimento";
    const prevInFunc = this.inFunc;
    this.inFunc = kind === "func";
    const body = this.parseBlock([closer], kind === "func" ? "funcao" : "procedimento", startTok.line);
    this.inFunc = prevInFunc;
    this.expectKw(closer);
    return { kind, name, params, ret, locals, body, line: kwTok.line };
  }

  private parseBlock(terminators: string[], opener: string, openLine: number): Stmt[] {
    const stmts: Stmt[] = [];
    for (;;) {
      const tk = this.cur;
      if (tk.type === "kw" && terminators.includes(tk.value)) return stmts;
      if (tk.type === "eof") {
        const closer = CLOSERS[opener] ?? terminators[0];
        throw new VisualgError(openLine, `Faltou "${closer}" para fechar o "${opener}" da linha ${openLine}.`);
      }
      if (tk.type === "kw" && Object.values(CLOSERS).includes(tk.value) && !terminators.includes(tk.value)) {
        throw new VisualgError(tk.line, `"${tk.value}" apareceu fora do lugar. Confira se cada bloco foi aberto e fechado na ordem certa (o "${opener}" da linha ${openLine} ainda está aberto).`);
      }
      stmts.push(this.parseStmt());
    }
  }

  private parseVarRef(): VarRef {
    const tk = this.expectId("de variável");
    let idx: Expr[] | null = null;
    if (this.isOp("[")) {
      this.next();
      idx = [this.parseExpr()];
      while (this.isOp(",")) { this.next(); idx.push(this.parseExpr()); }
      this.expectOp("]", "para fechar o índice do vetor");
    }
    return { name: tk.value, idx, line: tk.line };
  }

  private parseArgs(): Expr[] {
    const args: Expr[] = [];
    this.expectOp("(");
    if (!this.isOp(")")) {
      args.push(this.parseExpr());
      while (this.isOp(",")) { this.next(); args.push(this.parseExpr()); }
    }
    this.expectOp(")", "para fechar os parênteses");
    return args;
  }

  private parseStmt(): Stmt {
    const tk = this.cur;
    const line = tk.line;
    if (tk.type === "id") {
      const nxt = this.peek();
      if (this.isOp("<-", nxt) || this.isOp("[", nxt)) {
        const target = this.parseVarRef();
        if (this.isOp("=")) throw new VisualgError(this.cur.line, 'Para guardar um valor na variável use "<-" (ex.: x <- 10), não "=".');
        this.expectOp("<-", "para atribuir um valor (ex.: x <- 10)");
        return { k: "assign", target, e: this.parseExpr(), line };
      }
      if (this.isOp("=", nxt)) throw new VisualgError(line, `Para guardar um valor em "${tk.value}" use "<-" (ex.: ${tk.value} <- 10), não "=".`);
      this.next();
      const args = this.isOp("(") ? this.parseArgs() : [];
      return { k: "call", name: tk.value, args, line };
    }
    if (tk.type !== "kw") {
      throw new VisualgError(line, `Comando inesperado: ${this.describe(tk)}.`);
    }
    switch (tk.value) {
      case "escreva":
      case "escreval": {
        this.next();
        const args: WriteArg[] = [];
        if (this.isOp("(")) {
          this.next();
          if (!this.isOp(")")) {
            for (;;) {
              const e = this.parseExpr();
              let w: Expr | null = null;
              let d: Expr | null = null;
              if (this.isOp(":")) {
                this.next(); w = this.parseExpr();
                if (this.isOp(":")) { this.next(); d = this.parseExpr(); }
              }
              args.push({ e, w, d });
              if (this.isOp(",")) { this.next(); continue; }
              break;
            }
          }
          this.expectOp(")", `para fechar o ${tk.value}`);
        }
        return { k: "write", args, nl: tk.value === "escreval", line };
      }
      case "leia": {
        this.next();
        this.expectOp("(", 'depois de "leia"');
        const targets = [this.parseVarRef()];
        while (this.isOp(",")) { this.next(); targets.push(this.parseVarRef()); }
        this.expectOp(")", "para fechar o leia");
        return { k: "read", targets, line };
      }
      case "se": {
        this.next();
        const cond = this.parseExpr();
        this.expectKw("entao", "depois da condição do se");
        const thenB = this.parseBlock(["senao", "fimse"], "se", line);
        let elseB: Stmt[] | null = null;
        if (this.isKw("senao")) {
          this.next();
          elseB = this.parseBlock(["fimse"], "se", line);
        }
        this.expectKw("fimse");
        return { k: "if", cond, then: thenB, else: elseB, line };
      }
      case "escolha": {
        this.next();
        const e = this.parseExpr();
        const cases: CaseClause[] = [];
        let other: Stmt[] | null = null;
        for (;;) {
          if (this.isKw("caso")) {
            this.next();
            const values: CaseClause["values"] = [];
            for (;;) {
              const from = this.parseExpr();
              let to: Expr | null = null;
              if (this.isKw("ate")) { this.next(); to = this.parseExpr(); }
              values.push({ from, to });
              if (this.isOp(",")) { this.next(); continue; }
              break;
            }
            const body = this.parseBlock(["caso", "outrocaso", "fimescolha"], "escolha", line);
            cases.push({ values, body });
            continue;
          }
          if (this.isKw("outrocaso")) {
            this.next();
            other = this.parseBlock(["fimescolha"], "escolha", line);
            continue;
          }
          if (this.isKw("fimescolha")) { this.next(); break; }
          if (this.cur.type === "eof") throw new VisualgError(line, `Faltou "fimescolha" para fechar o "escolha" da linha ${line}.`);
          throw new VisualgError(this.cur.line, `Dentro do escolha, use "caso", "outrocaso" ou "fimescolha" (encontrei ${this.describe(this.cur)}).`);
        }
        return { k: "case", e, cases, other, line };
      }
      case "para": {
        this.next();
        const v = this.parseVarRef();
        this.expectKw("de", "depois da variável do para (ex.: para i de 1 ate 10 faca)");
        const from = this.parseExpr();
        this.expectKw("ate", "no para (ex.: para i de 1 ate 10 faca)");
        const to = this.parseExpr();
        let step: Expr | null = null;
        if (this.isKw("passo")) { this.next(); step = this.parseExpr(); }
        this.expectKw("faca", "no final da linha do para");
        const body = this.parseBlock(["fimpara"], "para", line);
        this.expectKw("fimpara");
        return { k: "for", v, from, to, step, body, line };
      }
      case "enquanto": {
        this.next();
        const cond = this.parseExpr();
        this.expectKw("faca", "depois da condição do enquanto");
        const body = this.parseBlock(["fimenquanto"], "enquanto", line);
        this.expectKw("fimenquanto");
        return { k: "while", cond, body, line };
      }
      case "repita": {
        this.next();
        const body = this.parseBlock(["ate", "fimrepita"], "repita", line);
        if (this.isKw("fimrepita")) { this.next(); return { k: "repeat", body, cond: null, line }; }
        this.next();
        const cond = this.parseExpr();
        return { k: "repeat", body, cond, line };
      }
      case "interrompa":
        this.next();
        return { k: "break", line };
      case "limpatela":
        this.next();
        return { k: "cls", line };
      case "retorne": {
        this.next();
        if (!this.inFunc) return { k: "return", e: null, line };
        return { k: "return", e: this.parseExpr(), line };
      }
      default:
        this.unsupportedCheck();
        throw new VisualgError(line, `Comando inesperado: ${this.describe(tk)}.`);
    }
  }

  // ----- expressões -----
  parseExpr(): Expr {
    let l = this.parseAnd();
    while (this.isKw("ou") || this.isKw("xou")) {
      const op = this.next();
      l = { k: "bin", op: op.value, l, r: this.parseAnd(), line: op.line };
    }
    return l;
  }

  private parseAnd(): Expr {
    let l = this.parseNot();
    while (this.isKw("e")) {
      const op = this.next();
      l = { k: "bin", op: "e", l, r: this.parseNot(), line: op.line };
    }
    return l;
  }

  private parseNot(): Expr {
    if (this.isKw("nao")) {
      const op = this.next();
      return { k: "un", op: "nao", e: this.parseNot(), line: op.line };
    }
    return this.parseRel();
  }

  private parseRel(): Expr {
    const l = this.parseAdd();
    const tk = this.cur;
    if (tk.type === "op" && ["=", "<>", "<", ">", "<=", ">="].includes(tk.value)) {
      this.next();
      return { k: "bin", op: tk.value, l, r: this.parseAdd(), line: tk.line };
    }
    return l;
  }

  private parseAdd(): Expr {
    let l = this.parseMul();
    while (this.isOp("+") || this.isOp("-")) {
      const op = this.next();
      l = { k: "bin", op: op.value, l, r: this.parseMul(), line: op.line };
    }
    return l;
  }

  private parseMul(): Expr {
    let l = this.parseUnary();
    while (this.isOp("*") || this.isOp("/") || this.isOp("\\") || this.isOp("%") || this.isKw("mod")) {
      const op = this.next();
      const name = op.value === "%" ? "mod" : op.value;
      l = { k: "bin", op: name, l, r: this.parseUnary(), line: op.line };
    }
    return l;
  }

  private parseUnary(): Expr {
    if (this.isOp("-") || this.isOp("+")) {
      const op = this.next();
      return { k: "un", op: op.value, e: this.parseUnary(), line: op.line };
    }
    return this.parsePow();
  }

  private parsePow(): Expr {
    const base = this.parsePrimary();
    if (this.isOp("^")) {
      const op = this.next();
      return { k: "bin", op: "^", l: base, r: this.parseUnary(), line: op.line };
    }
    return base;
  }

  private parsePrimary(): Expr {
    const tk = this.cur;
    if (tk.type === "num") { this.next(); return { k: "num", v: tk.num as number, real: !!tk.isReal, line: tk.line }; }
    if (tk.type === "str") { this.next(); return { k: "str", v: tk.value, line: tk.line }; }
    if (this.isKw("verdadeiro")) { this.next(); return { k: "bool", v: true, line: tk.line }; }
    if (this.isKw("falso")) { this.next(); return { k: "bool", v: false, line: tk.line }; }
    if (this.isOp("(")) {
      this.next();
      const e = this.parseExpr();
      this.expectOp(")", "para fechar os parênteses");
      return e;
    }
    if (tk.type === "id") {
      this.next();
      if (this.isOp("(")) return { k: "call", name: tk.value, args: this.parseArgs(), line: tk.line };
      if (this.isOp("[")) {
        this.next();
        const idx = [this.parseExpr()];
        while (this.isOp(",")) { this.next(); idx.push(this.parseExpr()); }
        this.expectOp("]", "para fechar o índice do vetor");
        return { k: "var", name: tk.value, idx, line: tk.line };
      }
      return { k: "var", name: tk.value, idx: null, line: tk.line };
    }
    this.unsupportedCheck();
    if (tk.type === "eof") throw new VisualgError(tk.line, "A expressão terminou antes da hora. Falta um valor ou variável.");
    throw new VisualgError(tk.line, `Esperava um valor, variável ou expressão, mas encontrei ${this.describe(tk)}.`);
  }
}

/** Converte o texto do aluno em um programa (AST). Lança VisualgError em erros de sintaxe. */
export function parseVisualg(source: string): Program {
  const tokens = tokenize(source);
  return new Parser(tokens).parseProgram();
}
