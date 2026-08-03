export type KeyboardLayoutId = "abnt2" | "us-intl" | "us-qwerty" | "pt-pt";

export interface KeyboardLayout {
  id: KeyboardLayoutId;
  name: string;
  description: string;
  /** Tecla extra à direita da home row (depois de J K L) */
  extraKey: string;
  /** Se false, os textos são normalizados sem acentos nem cedilha */
  supportsAccents: boolean;
}

export const KEYBOARD_LAYOUTS: KeyboardLayout[] = [
  {
    id: "abnt2",
    name: "ABNT2",
    description: "Padrão brasileiro, com tecla Ç ao lado do L.",
    extraKey: "Ç",
    supportsAccents: true,
  },
  {
    id: "us-intl",
    name: "US Internacional",
    description: "Teclado americano com acentos pela tecla morta ' (apóstrofo).",
    extraKey: "'",
    supportsAccents: true,
  },
  {
    id: "us-qwerty",
    name: "US QWERTY",
    description: "Padrão americano puro, sem acentos e sem cedilha.",
    extraKey: ";",
    supportsAccents: false,
  },
  {
    id: "pt-pt",
    name: "Português (Portugal)",
    description: "Layout europeu, com o Ç em posição diferente do ABNT2.",
    extraKey: "Ç",
    supportsAccents: true,
  },
];

export function getLayout(id: string | null | undefined): KeyboardLayout {
  return KEYBOARD_LAYOUTS.find((l) => l.id === id) ?? KEYBOARD_LAYOUTS[0];
}

/** Remove acentos e cedilha (para layouts sem suporte a diacríticos) */
export function stripDiacritics(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export interface TypingText {
  id: string;
  source: "Hardware" | "Software" | "História";
  title: string;
  /** Tempo estimado (segundos) para concluir o texto */
  estimatedSeconds: number;
  content: string;
}

const RAW_TEXTS: TypingText[] = [
  {
    id: "hw-1",
    source: "Hardware",
    title: "Processador e memória",
    estimatedSeconds: 90,
    content:
      "O processador é o cérebro do computador: ele interpreta e executa as instruções dos programas em alta velocidade. A memória RAM guarda temporariamente os dados que estão sendo usados naquele momento, e tudo o que está nela se perde quando a máquina é desligada. Quanto mais memória disponível, mais tarefas o sistema consegue manter abertas ao mesmo tempo sem ficar lento para o usuário comum.",
  },
  {
    id: "hw-2",
    source: "Hardware",
    title: "Armazenamento e placa-mãe",
    estimatedSeconds: 90,
    content:
      "A placa-mãe conecta todas as peças do computador e permite que elas conversem entre si por meio de trilhas e conectores. O disco rígido guarda arquivos de forma permanente, enquanto o SSD faz o mesmo trabalho usando memória eletrônica, sem partes móveis, o que deixa o sistema muito mais rápido para ligar, abrir programas e salvar documentos no dia a dia.",
  },
  {
    id: "hw-3",
    source: "Hardware",
    title: "Fonte e refrigeração",
    estimatedSeconds: 90,
    content:
      "A fonte de alimentação converte a energia da tomada em tensões seguras para cada componente interno do gabinete. Já o sistema de refrigeração, formado por coolers e dissipadores, retira o calor gerado pelo processador e pela placa de vídeo. Sem uma boa ventilação, as peças reduzem o desempenho para se proteger e podem apresentar falhas com o passar do tempo.",
  },
  {
    id: "sw-1",
    source: "Software",
    title: "Sistema operacional",
    estimatedSeconds: 90,
    content:
      "O sistema operacional é o programa principal da máquina: ele controla o hardware, organiza os arquivos em pastas e oferece a interface que usamos com janelas, ícones e menus. O Windows é o mais comum nas escolas e nos escritórios, mas existem alternativas gratuitas como as distribuições Linux, muito usadas em servidores e em computadores mais antigos.",
  },
  {
    id: "sw-2",
    source: "Software",
    title: "Programas essenciais",
    estimatedSeconds: 90,
    content:
      "Um computador recém-formatado precisa de alguns programas básicos para ficar realmente útil no dia a dia. Um navegador confiável, um pacote de escritório para textos e planilhas, um leitor de arquivos em formato PDF, um compactador de pastas e um antivírus atualizado já cobrem a maior parte das tarefas de estudo e de trabalho de qualquer estudante.",
  },
  {
    id: "sw-3",
    source: "Software",
    title: "Segurança e atualizações",
    estimatedSeconds: 90,
    content:
      "Manter o sistema atualizado é uma das formas mais simples de evitar problemas de segurança no computador. As atualizações corrigem falhas que poderiam ser exploradas por programas maliciosos vindos de sites e de arquivos suspeitos. Também vale usar senhas diferentes em cada serviço e desconfiar sempre de mensagens que pedem dados pessoais com muita urgência.",
  },
  {
    id: "hi-1",
    source: "História",
    title: "Das válvulas aos transistores",
    estimatedSeconds: 90,
    content:
      "Os primeiros computadores ocupavam salas inteiras e funcionavam com válvulas que esquentavam muito e queimavam com frequência. A chegada do transistor mudou tudo, porque permitiu construir máquinas menores, mais baratas e bem mais confiáveis. Depois vieram os circuitos integrados, que reuniram milhares de componentes em uma única pastilha de silício muito pequena.",
  },
  {
    id: "hi-2",
    source: "História",
    title: "O computador pessoal",
    estimatedSeconds: 90,
    content:
      "Na década de setenta surgiram os primeiros computadores pessoais, feitos para caber em uma mesa comum de casa ou de escritório. Com o tempo, as interfaces gráficas substituíram as linhas de comando e tornaram a informática acessível a qualquer pessoa. Hoje carregamos no bolso aparelhos com muito mais poder de cálculo do que aquelas máquinas gigantes.",
  },
];

/**
 * Todos os textos sao normalizados para o MESMO numero de palavras
 * (e, com isso, praticamente o mesmo numero de caracteres),
 * garantindo que o ranking compare desempenhos de forma justa.
 */
function normalizeLength(texts: TypingText[]): TypingText[] {
  const words = texts.map((t) => t.content.trim().split(/\s+/));
  const target = Math.min(...words.map((w) => w.length));
  return texts.map((t, i) => {
    const cut = words[i].slice(0, target).join(" ").replace(/[\s,;:.]+$/, "") + ".";
    return { ...t, content: cut };
  });
}

export const TYPING_TEXTS: TypingText[] = normalizeLength(RAW_TEXTS);

export function pickRandomText(supportsAccents: boolean): TypingText {
  const base = TYPING_TEXTS[Math.floor(Math.random() * TYPING_TEXTS.length)];
  return supportsAccents
    ? base
    : { ...base, content: stripDiacritics(base.content) };
}
