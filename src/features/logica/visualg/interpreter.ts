// Interpretador seguro de Visualg 3.0 (subconjunto). Percorre a AST gerada
// pelo parser; nunca usa eval() nem Function(). A execução é um gerador:
// ao encontrar "leia" ele pausa e pede um valor para a interface.

import {
  parseVisualg,
  VisualgError,
  type BaseType,
  type Decl,
  type Expr,
  type Program,
  type Stmt,
  type Sub,
  type TypeSpec,
  type VarRef,
} from "./parser";

export { VisualgError };

export type Value = number | string | boolean;

interface Cell {
  type: TypeSpec;
  value: Value | Value[];
}

export interface InputRequest {
  varName: string;
  type: BaseType;
  /** Mensagem de valor inválido na tentativa anterior. */
  error?: string;
}

export interface VariableView {
  name: string;
  type: string;
  value: string;
}

export const MAX_STEPS = 1_000_000;
const MAX_OUTPUT = 200_000;
const MAX_DEPTH = 500;

class BreakSignal {}
class ReturnSignal {
  constructor(public value: Value | null) {}
}

function defaultValue(base: BaseType): Value {
  if (base === "caractere") return "";
  if (base === "logico") return false;
  return 0;
}

function makeCell(type: TypeSpec): Cell {
  if (type.dims) {
    const total = type.dims.reduce((acc, [lo, hi]) => acc * (hi - lo + 1), 1);
    return { type, value: new Array<Value>(total).fill(defaultValue(type.base)) };
  }
  return { type, value: defaultValue(type.base) };
}

export function formatValue(v: Value): string {
  if (typeof v === "boolean") return v ? "VERDADEIRO" : "FALSO";
  if (typeof v === "number") {
    if (Number.isInteger(v)) return String(v);
    return String(parseFloat(v.toPrecision(12)));
  }
  return v;
}

function typeLabel(t: TypeSpec): string {
  if (!t.dims) return t.base;
  return `vetor[${t.dims.map(([a, b]) => `${a}..${b}`).join(",")}] de ${t.base}`;
}

function kindOf(v: Value): string {
  if (typeof v === "number") return "número";
  if (typeof v === "string") return "texto (caractere)";
  return "lógico";
}

function coerceTo(base: BaseType, v: Value, line: number, name: string): Value {
  switch (base) {
    case "inteiro":
      if (typeof v !== "number") throw new VisualgError(line, `A variável "${name}" é inteiro e não pode receber um ${kindOf(v)}.`);
      if (!Number.isInteger(v)) throw new VisualgError(line, `A variável "${name}" é inteiro e não pode receber o valor real ${formatValue(v)}. Use int() ou a divisão inteira \\.`);
      return v;
    case "real":
      if (typeof v !== "number") throw new VisualgError(line, `A variável "${name}" é real e não pode receber um ${kindOf(v)}.`);
      return v;
    case "caractere":
      if (typeof v !== "string") throw new VisualgError(line, `A variável "${name}" é caractere e não pode receber um ${kindOf(v)}. Para converter número em texto use numpcarac().`);
      return v;
    case "logico":
      if (typeof v !== "boolean") throw new VisualgError(line, `A variável "${name}" é logico e só aceita VERDADEIRO ou FALSO.`);
      return v;
  }
}

interface Frame {
  locals: Map<string, Cell>;
  sub: Sub | null;
}

export interface MachineIO {
  write(text: string): void;
  clear(): void;
}

type Gen<T> = Generator<InputRequest, T, string>;

export class Interpreter {
  private globals = new Map<string, Cell>();
  private frames: Frame[] = [];
  private steps = 0;
  private outLen = 0;

  constructor(private program: Program, private io: MachineIO) {
    this.declare(this.globals, program.globals);
  }

  private declare(scope: Map<string, Cell>, decls: Decl[]) {
    for (const d of decls) {
      for (const name of d.names) {
        if (scope.has(name)) throw new VisualgError(d.line, `A variável "${name}" foi declarada mais de uma vez.`);
        scope.set(name, makeCell(d.type));
      }
    }
  }

  private tick(line: number) {
    if (++this.steps > MAX_STEPS) {
      throw new VisualgError(line, "A execução passou de 1.000.000 de passos e foi interrompida. Verifique se algum laço nunca termina.");
    }
  }

  private out(text: string) {
    this.outLen += text.length;
    if (this.outLen > MAX_OUTPUT) throw new VisualgError(0, "O programa escreveu texto demais na tela e foi interrompido.");
    this.io.write(text);
  }

  private lookup(name: string, line: number): Cell {
    const frame = this.frames[this.frames.length - 1];
    const c = frame?.locals.get(name) ?? this.globals.get(name);
    if (!c) throw new VisualgError(line, `A variável "${name}" não foi declarada. Declare-a na seção var.`);
    return c;
  }

  private findCell(name: string): Cell | undefined {
    const frame = this.frames[this.frames.length - 1];
    return frame?.locals.get(name) ?? this.globals.get(name);
  }

  private offset(cell: Cell, name: string, idx: number[], line: number): number {
    const dims = cell.type.dims;
    if (!dims) throw new VisualgError(line, `"${name}" não é um vetor, então não pode usar [ ].`);
    if (idx.length !== dims.length) {
      throw new VisualgError(line, `"${name}" tem ${dims.length} dimensão(ões), mas foram usados ${idx.length} índice(s).`);
    }
    let off = 0;
    for (let i = 0; i < dims.length; i++) {
      const [lo, hi] = dims[i];
      const v = idx[i];
      if (!Number.isInteger(v)) throw new VisualgError(line, `O índice de "${name}" precisa ser um número inteiro.`);
      if (v < lo || v > hi) throw new VisualgError(line, `Índice ${v} fora dos limites de "${name}" (${lo}..${hi}).`);
      off = off * (hi - lo + 1) + (v - lo);
    }
    return off;
  }

  private *indices(ref: { idx: Expr[] | null }, line: number): Gen<number[]> {
    const out: number[] = [];
    for (const e of ref.idx ?? []) {
      const v = yield* this.eval(e);
      if (typeof v !== "number") throw new VisualgError(line, "O índice do vetor precisa ser um número.");
      out.push(v);
    }
    return out;
  }

  private *assign(ref: VarRef, v: Value): Gen<void> {
    const cell = this.lookup(ref.name, ref.line);
    if (ref.idx) {
      const idx = yield* this.indices(ref, ref.line);
      const off = this.offset(cell, ref.name, idx, ref.line);
      (cell.value as Value[])[off] = coerceTo(cell.type.base, v, ref.line, ref.name);
    } else {
      if (cell.type.dims) throw new VisualgError(ref.line, `"${ref.name}" é um vetor. Indique a posição, ex.: ${ref.name}[1] <- valor.`);
      cell.value = coerceTo(cell.type.base, v, ref.line, ref.name);
    }
  }

  // ---------------- execução ----------------

  *run(): Gen<void> {
    try {
      yield* this.block(this.program.body);
    } catch (e) {
      if (e instanceof BreakSignal) return;
      throw e;
    }
  }

  private *block(stmts: Stmt[]): Gen<void> {
    for (const s of stmts) yield* this.exec(s);
  }

  private *cond(e: Expr, what: string): Gen<boolean> {
    const v = yield* this.eval(e);
    if (typeof v !== "boolean") throw new VisualgError(e.line, `A condição do ${what} precisa ser VERDADEIRO ou FALSO (ex.: x > 5).`);
    return v;
  }

  private *exec(s: Stmt): Gen<void> {
    this.tick(s.line);
    switch (s.k) {
      case "assign": {
        const v = yield* this.eval(s.e);
        yield* this.assign(s.target, v);
        return;
      }
      case "write": {
        let text = "";
        for (const a of s.args) {
          const v = yield* this.eval(a.e);
          let str: string;
          if (a.d && typeof v === "number") {
            const d = yield* this.eval(a.d);
            str = v.toFixed(Math.max(0, Math.min(20, Number(d))));
          } else {
            str = formatValue(v);
          }
          if (a.w) {
            const w = yield* this.eval(a.w);
            str = str.padStart(Math.max(0, Math.min(200, Number(w))));
          }
          text += str;
        }
        if (s.nl) text += "\n";
        this.out(text);
        return;
      }
      case "read": {
        for (const t of s.targets) {
          const cell = this.lookup(t.name, t.line);
          const base = cell.type.base;
          let error: string | undefined;
          for (;;) {
            const raw = (yield { varName: t.name, type: base, error }) ?? "";
            const parsed = parseInput(base, raw);
            if (parsed.ok) {
              this.out(raw + "\n");
              yield* this.assign(t, parsed.value);
              break;
            }
            error = parsed.error;
          }
        }
        return;
      }
      case "if": {
        if (yield* this.cond(s.cond, "se")) yield* this.block(s.then);
        else if (s.else) yield* this.block(s.else);
        return;
      }
      case "case": {
        const v = yield* this.eval(s.e);
        for (const c of s.cases) {
          for (const val of c.values) {
            const a = yield* this.eval(val.from);
            if (val.to) {
              const b = yield* this.eval(val.to);
              if (typeof v === typeof a && typeof v === typeof b && (v as number) >= (a as number) && (v as number) <= (b as number)) {
                yield* this.block(c.body);
                return;
              }
            } else if (a === v) {
              yield* this.block(c.body);
              return;
            }
          }
        }
        if (s.other) yield* this.block(s.other);
        return;
      }
      case "for": {
        const cell = this.lookup(s.v.name, s.v.line);
        if (cell.type.dims || cell.type.base !== "inteiro") {
          throw new VisualgError(s.line, `A variável do "para" ("${s.v.name}") precisa ser do tipo inteiro.`);
        }
        const from = yield* this.eval(s.from);
        const to = yield* this.eval(s.to);
        const step = s.step ? yield* this.eval(s.step) : 1;
        if (typeof from !== "number" || typeof to !== "number" || typeof step !== "number") {
          throw new VisualgError(s.line, "Os valores do para (de, ate e passo) precisam ser números.");
        }
        if (step === 0) throw new VisualgError(s.line, "O passo do para não pode ser 0.");
        let i = from;
        try {
          while (step > 0 ? i <= to : i >= to) {
            this.tick(s.line);
            yield* this.assign(s.v, i);
            yield* this.block(s.body);
            i = (cell.value as number) + step;
          }
          yield* this.assign(s.v, i);
        } catch (e) {
          if (!(e instanceof BreakSignal)) throw e;
        }
        return;
      }
      case "while": {
        try {
          while (yield* this.cond(s.cond, "enquanto")) {
            this.tick(s.line);
            yield* this.block(s.body);
          }
        } catch (e) {
          if (!(e instanceof BreakSignal)) throw e;
        }
        return;
      }
      case "repeat": {
        try {
          for (;;) {
            this.tick(s.line);
            yield* this.block(s.body);
            if (s.cond && (yield* this.cond(s.cond, "repita/ate"))) break;
          }
        } catch (e) {
          if (!(e instanceof BreakSignal)) throw e;
        }
        return;
      }
      case "break":
        throw new BreakSignal();
      case "cls":
        this.io.clear();
        return;
      case "return": {
        const frame = this.frames[this.frames.length - 1];
        if (!frame) throw new VisualgError(s.line, '"retorne" só pode ser usado dentro de uma função.');
        const v = s.e ? yield* this.eval(s.e) : null;
        throw new ReturnSignal(v);
      }
      case "call": {
        const sub = this.program.subs.get(s.name);
        if (!sub) {
          if (BUILTINS[s.name]) {
            yield* this.eval({ k: "call", name: s.name, args: s.args, line: s.line });
            return;
          }
          if (this.findCell(s.name)) throw new VisualgError(s.line, `Para guardar um valor em "${s.name}" use "<-" (ex.: ${s.name} <- 10).`);
          throw new VisualgError(s.line, `Comando ou procedimento "${s.name}" não existe.`);
        }
        yield* this.callSub(sub, s.args, s.line);
        return;
      }
    }
  }

  private *callSub(sub: Sub, args: Expr[], line: number): Gen<Value | null> {
    if (args.length !== sub.params.length) {
      throw new VisualgError(line, `"${sub.name}" espera ${sub.params.length} valor(es), mas recebeu ${args.length}.`);
    }
    if (this.frames.length >= MAX_DEPTH) throw new VisualgError(line, "Chamadas demais uma dentro da outra (recursão sem fim?).");
    const locals = new Map<string, Cell>();
    for (let i = 0; i < sub.params.length; i++) {
      const p = sub.params[i];
      const a = args[i];
      if (p.byRef) {
        if (a.k !== "var" || a.idx) throw new VisualgError(line, `O parâmetro "${p.name}" é por referência (var): passe o nome de uma variável simples.`);
        const cell = this.lookup(a.name, a.line);
        if (cell.type.base !== p.type.base || !!cell.type.dims !== !!p.type.dims) {
          throw new VisualgError(line, `O parâmetro "${p.name}" espera ${typeLabel(p.type)}, mas "${a.name}" é ${typeLabel(cell.type)}.`);
        }
        locals.set(p.name, cell);
      } else if (p.type.dims) {
        if (a.k !== "var" || a.idx) throw new VisualgError(line, `O parâmetro "${p.name}" espera um vetor.`);
        const cell = this.lookup(a.name, a.line);
        if (!cell.type.dims) throw new VisualgError(line, `O parâmetro "${p.name}" espera um vetor, mas "${a.name}" não é vetor.`);
        locals.set(p.name, { type: cell.type, value: [...(cell.value as Value[])] });
      } else {
        const v = yield* this.eval(a);
        const cell = makeCell(p.type);
        cell.value = coerceTo(p.type.base, v, line, p.name);
        locals.set(p.name, cell);
      }
    }
    this.declare(locals, sub.locals);
    this.frames.push({ locals, sub });
    try {
      yield* this.block(sub.body);
      return sub.ret ? defaultValue(sub.ret) : null;
    } catch (e) {
      if (e instanceof ReturnSignal) {
        if (sub.ret && e.value !== null) return coerceTo(sub.ret, e.value, line, `retorno de ${sub.name}`);
        return sub.ret ? defaultValue(sub.ret) : null;
      }
      if (e instanceof BreakSignal) throw new VisualgError(line, '"interrompa" só pode ser usado dentro de um laço.');
      throw e;
    } finally {
      this.frames.pop();
    }
  }

  // ---------------- expressões ----------------

  private *eval(e: Expr): Gen<Value> {
    switch (e.k) {
      case "num":
      case "str":
      case "bool":
        return e.v;
      case "var": {
        const cell = this.findCell(e.name);
        if (!cell) {
          const sub = this.program.subs.get(e.name);
          if (sub && sub.kind === "func") return (yield* this.callSub(sub, [], e.line)) as Value;
          if (BUILTINS[e.name]) return BUILTINS[e.name]([], e.line);
          throw new VisualgError(e.line, `A variável "${e.name}" não foi declarada. Declare-a na seção var.`);
        }
        if (e.idx) {
          const idx = yield* this.indices(e, e.line);
          return (cell.value as Value[])[this.offset(cell, e.name, idx, e.line)];
        }
        if (cell.type.dims) throw new VisualgError(e.line, `"${e.name}" é um vetor. Indique a posição, ex.: ${e.name}[1].`);
        return cell.value as Value;
      }
      case "call": {
        const sub = this.program.subs.get(e.name);
        if (sub) {
          if (sub.kind !== "func") throw new VisualgError(e.line, `"${e.name}" é um procedimento e não devolve valor. Use uma função.`);
          return (yield* this.callSub(sub, e.args, e.line)) as Value;
        }
        const fn = BUILTINS[e.name];
        if (!fn) throw new VisualgError(e.line, `A função "${e.name}" não existe.`);
        const args: Value[] = [];
        for (const a of e.args) args.push(yield* this.eval(a));
        return fn(args, e.line);
      }
      case "un": {
        const v = yield* this.eval(e.e);
        if (e.op === "nao") {
          if (typeof v !== "boolean") throw new VisualgError(e.line, '"nao" só funciona com valores lógicos.');
          return !v;
        }
        if (typeof v !== "number") throw new VisualgError(e.line, `O sinal "${e.op}" só funciona com números.`);
        return e.op === "-" ? -v : v;
      }
      case "bin": {
        // curto-circuito para "e" / "ou"
        if (e.op === "e" || e.op === "ou") {
          const l = yield* this.eval(e.l);
          if (typeof l !== "boolean") throw new VisualgError(e.line, `"${e.op}" só funciona com valores lógicos (ex.: (x > 0) ${e.op} (x < 10)).`);
          if (e.op === "e" && !l) return false;
          if (e.op === "ou" && l) return true;
          const r = yield* this.eval(e.r);
          if (typeof r !== "boolean") throw new VisualgError(e.line, `"${e.op}" só funciona com valores lógicos.`);
          return r;
        }
        const l = yield* this.eval(e.l);
        const r = yield* this.eval(e.r);
        return binary(e.op, l, r, e.line);
      }
    }
  }

  snapshot(): VariableView[] {
    const list: VariableView[] = [];
    for (const [name, cell] of this.globals) {
      const v = Array.isArray(cell.value)
        ? `[${cell.value.slice(0, 30).map((x) => (typeof x === "string" ? `"${x}"` : formatValue(x))).join(", ")}${cell.value.length > 30 ? ", …" : ""}]`
        : typeof cell.value === "string"
          ? `"${cell.value}"`
          : formatValue(cell.value);
      list.push({ name, type: typeLabel(cell.type), value: v });
    }
    return list;
  }
}

function binary(op: string, l: Value, r: Value, line: number): Value {
  if (op === "xou") {
    if (typeof l !== "boolean" || typeof r !== "boolean") throw new VisualgError(line, '"xou" só funciona com valores lógicos.');
    return l !== r;
  }
  if (["=", "<>", "<", ">", "<=", ">="].includes(op)) {
    if (typeof l !== typeof r) throw new VisualgError(line, `Não dá para comparar ${kindOf(l)} com ${kindOf(r)}.`);
    if (typeof l === "boolean" && !["=", "<>"].includes(op)) throw new VisualgError(line, "Valores lógicos só podem ser comparados com = ou <>.");
    switch (op) {
      case "=": return l === r;
      case "<>": return l !== r;
      case "<": return l < r;
      case ">": return l > r;
      case "<=": return l <= r;
      default: return l >= r;
    }
  }
  if (op === "+" && typeof l === "string" && typeof r === "string") return l + r;
  if (typeof l !== "number" || typeof r !== "number") {
    if (op === "+" && (typeof l === "string" || typeof r === "string")) {
      throw new VisualgError(line, "Não é possível somar texto com número. Para juntar, converta o número com numpcarac() ou use vírgulas no escreva.");
    }
    throw new VisualgError(line, `A operação "${op}" só funciona com números.`);
  }
  switch (op) {
    case "+": return l + r;
    case "-": return l - r;
    case "*": return l * r;
    case "/":
      if (r === 0) throw new VisualgError(line, "Divisão por zero.");
      return l / r;
    case "\\":
      if (!Number.isInteger(l) || !Number.isInteger(r)) throw new VisualgError(line, 'A divisão inteira "\\" só funciona com números inteiros.');
      if (r === 0) throw new VisualgError(line, "Divisão por zero.");
      return Math.trunc(l / r);
    case "mod":
      if (!Number.isInteger(l) || !Number.isInteger(r)) throw new VisualgError(line, '"mod" só funciona com números inteiros.');
      if (r === 0) throw new VisualgError(line, "Divisão por zero no mod.");
      return l % r;
    case "^":
      return Math.pow(l, r);
  }
  throw new VisualgError(line, `Operação desconhecida "${op}".`);
}

type Builtin = (args: Value[], line: number) => Value;

function num(args: Value[], i: number, fn: string, line: number): number {
  const v = args[i];
  if (typeof v !== "number") throw new VisualgError(line, `A função ${fn} espera um número.`);
  return v;
}
function str(args: Value[], i: number, fn: string, line: number): string {
  const v = args[i];
  if (typeof v !== "string") throw new VisualgError(line, `A função ${fn} espera um texto (caractere).`);
  return v;
}
function arity(args: Value[], n: number, fn: string, line: number) {
  if (args.length !== n) throw new VisualgError(line, `A função ${fn} espera ${n} valor(es), mas recebeu ${args.length}.`);
}

const BUILTINS: Record<string, Builtin> = {
  abs: (a, l) => (arity(a, 1, "abs", l), Math.abs(num(a, 0, "abs", l))),
  int: (a, l) => (arity(a, 1, "int", l), Math.trunc(num(a, 0, "int", l))),
  raizq: (a, l) => {
    arity(a, 1, "raizq", l);
    const x = num(a, 0, "raizq", l);
    if (x < 0) throw new VisualgError(l, "raizq não aceita número negativo.");
    return Math.sqrt(x);
  },
  quad: (a, l) => (arity(a, 1, "quad", l), num(a, 0, "quad", l) ** 2),
  exp: (a, l) => {
    if (a.length === 2) return Math.pow(num(a, 0, "exp", l), num(a, 1, "exp", l));
    arity(a, 1, "exp", l);
    return Math.exp(num(a, 0, "exp", l));
  },
  log: (a, l) => (arity(a, 1, "log", l), Math.log10(num(a, 0, "log", l))),
  logn: (a, l) => (arity(a, 1, "logn", l), Math.log(num(a, 0, "logn", l))),
  sen: (a, l) => (arity(a, 1, "sen", l), Math.sin(num(a, 0, "sen", l))),
  cos: (a, l) => (arity(a, 1, "cos", l), Math.cos(num(a, 0, "cos", l))),
  tan: (a, l) => (arity(a, 1, "tan", l), Math.tan(num(a, 0, "tan", l))),
  arctan: (a, l) => (arity(a, 1, "arctan", l), Math.atan(num(a, 0, "arctan", l))),
  grauprad: (a, l) => (arity(a, 1, "grauprad", l), (num(a, 0, "grauprad", l) * Math.PI) / 180),
  radpgrau: (a, l) => (arity(a, 1, "radpgrau", l), (num(a, 0, "radpgrau", l) * 180) / Math.PI),
  pi: (a, l) => (arity(a, 0, "pi", l), Math.PI),
  rand: (a, l) => (arity(a, 0, "rand", l), Math.random()),
  randi: (a, l) => (arity(a, 1, "randi", l), Math.floor(Math.random() * num(a, 0, "randi", l))),
  compr: (a, l) => (arity(a, 1, "compr", l), str(a, 0, "compr", l).length),
  copia: (a, l) => {
    arity(a, 3, "copia", l);
    const s = str(a, 0, "copia", l);
    const ini = num(a, 1, "copia", l);
    const q = num(a, 2, "copia", l);
    return s.substr(Math.max(0, ini - 1), Math.max(0, q));
  },
  maiusc: (a, l) => (arity(a, 1, "maiusc", l), str(a, 0, "maiusc", l).toUpperCase()),
  minusc: (a, l) => (arity(a, 1, "minusc", l), str(a, 0, "minusc", l).toLowerCase()),
  pos: (a, l) => (arity(a, 2, "pos", l), str(a, 1, "pos", l).indexOf(str(a, 0, "pos", l)) + 1),
  asc: (a, l) => {
    arity(a, 1, "asc", l);
    const s = str(a, 0, "asc", l);
    return s.length ? s.charCodeAt(0) : 0;
  },
  carac: (a, l) => (arity(a, 1, "carac", l), String.fromCharCode(num(a, 0, "carac", l))),
  numpcarac: (a, l) => (arity(a, 1, "numpcarac", l), formatValue(num(a, 0, "numpcarac", l))),
  caracpnum: (a, l) => {
    arity(a, 1, "caracpnum", l);
    const s = str(a, 0, "caracpnum", l).trim().replace(",", ".");
    const v = Number(s);
    if (s === "" || Number.isNaN(v)) throw new VisualgError(l, `caracpnum: "${s}" não é um número.`);
    return v;
  },
};

export const BUILTIN_NAMES = Object.keys(BUILTINS);

export function parseInput(base: BaseType, raw: string): { ok: true; value: Value } | { ok: false; error: string } {
  const t = raw.trim();
  switch (base) {
    case "caractere":
      return { ok: true, value: raw };
    case "inteiro":
      if (/^[+-]?\d+$/.test(t)) return { ok: true, value: parseInt(t, 10) };
      return { ok: false, error: `"${raw}" não é um número inteiro. Digite só números, sem vírgula (ex.: 25).` };
    case "real": {
      const s = t.replace(",", ".");
      if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return { ok: true, value: parseFloat(s) };
      return { ok: false, error: `"${raw}" não é um número. Exemplos válidos: 7, 7.5 ou 7,5.` };
    }
    case "logico": {
      const w = t.toUpperCase();
      if (["VERDADEIRO", "V"].includes(w)) return { ok: true, value: true };
      if (["FALSO", "F"].includes(w)) return { ok: true, value: false };
      return { ok: false, error: "Digite VERDADEIRO (ou V) ou FALSO (ou F)." };
    }
  }
}

// ---------------- máquina usada pela interface ----------------

export type StepResult =
  | { status: "input"; request: InputRequest }
  | { status: "done" }
  | { status: "error"; line: number; message: string };

export class VisualgMachine {
  output = "";
  private interp: Interpreter | null = null;
  private gen: Gen<void> | null = null;
  private onChange?: (text: string) => void;

  constructor(source: string, onChange?: (text: string) => void) {
    this.onChange = onChange;
    const program = parseVisualg(source);
    this.interp = new Interpreter(program, {
      write: (t) => { this.output += t; this.onChange?.(this.output); },
      clear: () => { this.output = ""; this.onChange?.(this.output); },
    });
    this.gen = this.interp.run();
  }

  /** Avança até precisar de entrada ou terminar. */
  step(input?: string): StepResult {
    if (!this.gen) return { status: "done" };
    try {
      const r = input === undefined ? this.gen.next("") : this.gen.next(input);
      if (r.done) { this.gen = null; return { status: "done" }; }
      return { status: "input", request: r.value };
    } catch (e) {
      this.gen = null;
      if (e instanceof VisualgError) return { status: "error", line: e.line, message: e.message };
      return { status: "error", line: 0, message: "Erro inesperado ao executar o programa." };
    }
  }

  variables(): VariableView[] {
    return this.interp?.snapshot() ?? [];
  }
}

export interface RunResult {
  output: string;
  error: { line: number; message: string } | null;
  variables: VariableView[];
}

/** Executa um programa com entradas pré-definidas (usado na correção de desafios e nos testes). */
export function runVisualg(source: string, inputs: string[] = []): RunResult {
  let machine: VisualgMachine;
  try {
    machine = new VisualgMachine(source);
  } catch (e) {
    if (e instanceof VisualgError) return { output: "", error: { line: e.line, message: e.message }, variables: [] };
    throw e;
  }
  const queue = [...inputs];
  let res = machine.step();
  while (res.status === "input") {
    if (res.request.error) {
      return { output: machine.output, error: { line: 0, message: res.request.error }, variables: machine.variables() };
    }
    if (!queue.length) {
      return {
        output: machine.output,
        error: { line: 0, message: `O programa pediu um valor para "${res.request.varName}", mas as entradas acabaram.` },
        variables: machine.variables(),
      };
    }
    res = machine.step(queue.shift());
  }
  return {
    output: machine.output,
    error: res.status === "error" ? { line: res.line, message: res.message } : null,
    variables: machine.variables(),
  };
}
