// Tipos compartilhados da área Software → Lógica Básica.

export type Track = "visualg" | "html" | "css";
export type Level = "basico" | "intermediario";

export interface CodePart {
  /** Trecho do código de exemplo (copiado literalmente do exemplo). */
  code: string;
  /** Explicação simples do que esse trecho faz. */
  explanation: string;
}

export interface LessonExercise {
  /** Enunciado do exercício para o aluno resolver. */
  prompt: string;
  /** Dica opcional. */
  hint?: string;
  /** Código inicial que abre no laboratório (opcional). */
  starterCode?: string;
  /** CSS inicial (somente aulas de HTML/CSS). */
  starterCss?: string;
  /** Uma resolução possível, mostrada quando o aluno pede. */
  solution: string;
  /** CSS da resolução (somente aulas de HTML/CSS). */
  solutionCss?: string;
}

export interface Lesson {
  /** Identificador estável, ex.: "vg-b-01", "html-i-03", "css-b-12". */
  id: string;
  track: Track;
  level: Level;
  title: string;
  objective: string;
  /** Parágrafos da explicação, em linguagem simples. */
  explanation: string[];
  /** Passo a passo para construir o exemplo (opcional, recomendado). */
  steps?: string[];
  /** Código de exemplo: Visualg (track visualg) ou HTML (tracks html/css). */
  code: string;
  /** CSS do exemplo (tracks html/css; pode ser vazio). */
  css?: string;
  codeParts: CodePart[];
  /**
   * Visualg: texto exato que aparece no console ao executar o exemplo com
   * `sampleInput`, incluindo os valores digitados ecoados (cada valor lido
   * aparece seguido de quebra de linha).
   * HTML/CSS: descrição do que aparece na pré-visualização.
   */
  expectedOutput: string;
  /** Visualg: valores digitados em cada "leia", na ordem. */
  sampleInput?: string[];
  exercise: LessonExercise;
}

export type ExerciseKind =
  | "multipla"
  | "vf"
  | "completar"
  | "erro"
  | "desafio-visualg"
  | "pratica-web";

export type ExerciseSubject = "logica" | "visualg" | "html" | "css";
export type ExerciseDifficulty = "basico" | "intermediario" | "desafio";

interface ExerciseBase {
  id: string;
  kind: ExerciseKind;
  subject: ExerciseSubject;
  difficulty: ExerciseDifficulty;
  /** Pergunta/enunciado. */
  prompt: string;
  /** Código mostrado junto com a pergunta (opcional). */
  code?: string;
  /** Explicação mostrada depois da resposta (por que está certo/errado). */
  explanation: string;
  /** Pontos ao acertar. */
  points: number;
}

export interface MultipleChoiceExercise extends ExerciseBase {
  kind: "multipla" | "erro";
  options: string[];
  /** Índice da alternativa correta em `options`. */
  correctIndex: number;
}

export interface TrueFalseExercise extends ExerciseBase {
  kind: "vf";
  answer: boolean;
}

export interface FillExercise extends ExerciseBase {
  kind: "completar";
  /** Código com a lacuna marcada como ____ (quatro sublinhados). */
  code: string;
  /** Respostas aceitas (comparação sem diferenciar maiúsculas/espaços extras). */
  accepted: string[];
}

export interface VisualgTestCase {
  input: string[];
  /** Texto que deve aparecer na saída (comparação ignora espaços extras e maiúsculas). */
  expectedContains: string[];
}

export interface VisualgChallengeExercise extends ExerciseBase {
  kind: "desafio-visualg";
  starterCode: string;
  tests: VisualgTestCase[];
  solution: string;
}

export type WebCheck =
  | { type: "selector"; selector: string; min?: number; description: string }
  | { type: "text"; selector: string; includes: string; description: string }
  | { type: "attr"; selector: string; attr: string; description: string }
  | { type: "css-property"; property: string; valueIncludes?: string; description: string };

export interface WebPracticeExercise extends ExerciseBase {
  kind: "pratica-web";
  starterHtml: string;
  starterCss: string;
  checks: WebCheck[];
  solutionHtml: string;
  solutionCss: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | TrueFalseExercise
  | FillExercise
  | VisualgChallengeExercise
  | WebPracticeExercise;

export interface Project {
  id: string;
  module: "visualg" | "web";
  title: string;
  description: string;
  objective: string;
  requirements: string[];
  challenge: string;
  /** Código inicial para abrir no laboratório. */
  starterCode: string;
  /** CSS inicial (projetos web). */
  starterCss?: string;
}
