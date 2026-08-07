// Server-side copy of the typing corpus. MUST stay in sync with
// src/lib/typingTexts.ts so scores are computed against the same texts.

export interface TypingText {
  id: string;
  estimatedSeconds: number;
  content: string;
}

export function stripDiacritics(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const RAW_TEXTS: TypingText[] = [
  {
    id: "hw-1",
    estimatedSeconds: 90,
    content:
      "O processador é o cérebro do computador: ele interpreta e executa as instruções dos programas em alta velocidade. A memória RAM guarda temporariamente os dados que estão sendo usados naquele momento, e tudo o que está nela se perde quando a máquina é desligada. Quanto mais memória disponível, mais tarefas o sistema consegue manter abertas ao mesmo tempo sem ficar lento para o usuário comum.",
  },
  {
    id: "hw-2",
    estimatedSeconds: 90,
    content:
      "A placa-mãe conecta todas as peças do computador e permite que elas conversem entre si por meio de trilhas e conectores. O disco rígido guarda arquivos de forma permanente, enquanto o SSD faz o mesmo trabalho usando memória eletrônica, sem partes móveis, o que deixa o sistema muito mais rápido para ligar, abrir programas e salvar documentos no dia a dia.",
  },
  {
    id: "hw-3",
    estimatedSeconds: 90,
    content:
      "A fonte de alimentação converte a energia da tomada em tensões seguras para cada componente interno do gabinete. Já o sistema de refrigeração, formado por coolers e dissipadores, retira o calor gerado pelo processador e pela placa de vídeo. Sem uma boa ventilação, as peças reduzem o desempenho para se proteger e podem apresentar falhas com o passar do tempo.",
  },
  {
    id: "sw-1",
    estimatedSeconds: 90,
    content:
      "O sistema operacional é o programa principal da máquina: ele controla o hardware, organiza os arquivos em pastas e oferece a interface que usamos com janelas, ícones e menus. O Windows é o mais comum nas escolas e nos escritórios, mas existem alternativas gratuitas como as distribuições Linux, muito usadas em servidores e em computadores mais antigos.",
  },
  {
    id: "sw-2",
    estimatedSeconds: 90,
    content:
      "Um computador recém-formatado precisa de alguns programas básicos para ficar realmente útil no dia a dia. Um navegador confiável, um pacote de escritório para textos e planilhas, um leitor de arquivos em formato PDF, um compactador de pastas e um antivírus atualizado já cobrem a maior parte das tarefas de estudo e de trabalho de qualquer estudante.",
  },
  {
    id: "sw-3",
    estimatedSeconds: 90,
    content:
      "Manter o sistema atualizado é uma das formas mais simples de evitar problemas de segurança no computador. As atualizações corrigem falhas que poderiam ser exploradas por programas maliciosos vindos de sites e de arquivos suspeitos. Também vale usar senhas diferentes em cada serviço e desconfiar sempre de mensagens que pedem dados pessoais com muita urgência.",
  },
  {
    id: "hi-1",
    estimatedSeconds: 90,
    content:
      "Os primeiros computadores ocupavam salas inteiras e funcionavam com válvulas que esquentavam muito e queimavam com frequência. A chegada do transistor mudou tudo, porque permitiu construir máquinas menores, mais baratas e bem mais confiáveis. Depois vieram os circuitos integrados, que reuniram milhares de componentes em uma única pastilha de silício muito pequena.",
  },
  {
    id: "hi-2",
    estimatedSeconds: 90,
    content:
      "Na década de setenta surgiram os primeiros computadores pessoais, feitos para caber em uma mesa comum de casa ou de escritório. Com o tempo, as interfaces gráficas substituíram as linhas de comando e tornaram a informática acessível a qualquer pessoa. Hoje carregamos no bolso aparelhos com muito mais poder de cálculo do que aquelas máquinas gigantes.",
  },
];

function normalizeLength(texts: TypingText[]): TypingText[] {
  const words = texts.map((t) => t.content.trim().split(/\s+/));
  const target = Math.min(...words.map((w) => w.length));
  return texts.map((t, i) => {
    const cut =
      words[i].slice(0, target).join(" ").replace(/[\s,;:.]+$/, "") + ".";
    return { ...t, content: cut };
  });
}

export const TYPING_TEXTS: TypingText[] = normalizeLength(RAW_TEXTS);

export function getTypingText(id: string): TypingText | undefined {
  return TYPING_TEXTS.find((t) => t.id === id);
}
