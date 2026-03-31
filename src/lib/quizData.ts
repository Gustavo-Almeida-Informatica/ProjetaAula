export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Hardware
  { id: 1, category: "Hardware", question: "Qual componente é considerado o 'cérebro' do computador?", options: ["RAM", "CPU", "HD", "GPU"], correct: 1, explanation: "A CPU (Unidade Central de Processamento) é responsável por executar as instruções dos programas." },
  { id: 2, category: "Hardware", question: "Qual é a função da memória RAM?", options: ["Armazenar dados permanentemente", "Processar gráficos", "Armazenar dados temporariamente para acesso rápido", "Conectar periféricos"], correct: 2, explanation: "A RAM armazena dados temporariamente enquanto o computador está ligado, permitindo acesso rápido pela CPU." },
  { id: 3, category: "Hardware", question: "O que significa a sigla SSD?", options: ["Super Speed Disk", "Solid State Drive", "System Storage Device", "Serial Speed Drive"], correct: 1, explanation: "SSD significa Solid State Drive, um dispositivo de armazenamento sem partes mecânicas." },
  { id: 4, category: "Hardware", question: "Qual certificação garante eficiência energética em fontes de alimentação?", options: ["Energy Star", "80 Plus", "ISO 9001", "CE"], correct: 1, explanation: "A certificação 80 Plus garante que a fonte tem pelo menos 80% de eficiência energética." },
  { id: 5, category: "Hardware", question: "O que é o cache L1 do processador?", options: ["Memória mais lenta e maior", "Memória mais rápida e menor, dentro do núcleo", "Memória externa ao processador", "Memória de vídeo"], correct: 1, explanation: "O cache L1 é a memória mais rápida e menor, localizada dentro de cada núcleo do processador." },
  { id: 6, category: "Hardware", question: "O que é PCIe?", options: ["Um tipo de processador", "Um barramento de expansão de alta velocidade", "Um tipo de memória", "Um sistema operacional"], correct: 1, explanation: "PCIe (Peripheral Component Interconnect Express) é um barramento de expansão de alta velocidade para placas de vídeo, SSDs NVMe, etc." },
  { id: 7, category: "Hardware", question: "Qual a diferença entre arquitetura 32-bits e 64-bits?", options: ["Velocidade do HD", "Quantidade de RAM suportada e tamanho dos registradores", "Tipo de monitor", "Marca do processador"], correct: 1, explanation: "Processadores 64-bits podem endereçar mais memória RAM e processar dados em blocos maiores." },
  { id: 8, category: "Hardware", question: "Para que serve o cooler do processador?", options: ["Aumentar a velocidade", "Dissipar o calor gerado pelo processador", "Armazenar dados", "Conectar à internet"], correct: 1, explanation: "O cooler dissipa o calor gerado pelo processador durante o funcionamento, evitando superaquecimento." },

  // Windows
  { id: 9, category: "Windows", question: "Qual atalho abre o Gerenciador de Tarefas no Windows?", options: ["Ctrl+Alt+Del", "Ctrl+Shift+Esc", "Alt+F4", "Win+R"], correct: 1, explanation: "Ctrl+Shift+Esc abre diretamente o Gerenciador de Tarefas." },
  { id: 10, category: "Windows", question: "O que é o BIOS/UEFI?", options: ["Um programa de edição", "O firmware que inicializa o hardware antes do SO", "Um navegador web", "Um antivírus"], correct: 1, explanation: "BIOS/UEFI é o firmware responsável por inicializar e testar o hardware antes de carregar o sistema operacional." },
  { id: 11, category: "Windows", question: "Qual o sistema de arquivos padrão do Windows 10/11?", options: ["FAT32", "EXT4", "NTFS", "APFS"], correct: 2, explanation: "O NTFS (New Technology File System) é o sistema de arquivos padrão do Windows moderno." },
  { id: 12, category: "Windows", question: "O que são drivers?", options: ["Programas de jogos", "Software que permite o SO comunicar com o hardware", "Vírus de computador", "Tipos de memória"], correct: 1, explanation: "Drivers são softwares que fazem a ponte entre o sistema operacional e os dispositivos de hardware." },
  { id: 13, category: "Windows", question: "O que é o Painel de Controle do Windows?", options: ["Um jogo", "Central de configurações do sistema", "Um navegador", "Um editor de texto"], correct: 1, explanation: "O Painel de Controle permite configurar e personalizar diversas opções do sistema Windows." },

  // Programas Essenciais
  { id: 14, category: "Programas", question: "Qual navegador é desenvolvido pelo Google?", options: ["Firefox", "Edge", "Chrome", "Safari"], correct: 2, explanation: "O Google Chrome é o navegador desenvolvido pelo Google, sendo o mais utilizado no mundo." },
  { id: 15, category: "Programas", question: "Para que serve o WinRAR?", options: ["Editar fotos", "Compactar e descompactar arquivos", "Reproduzir vídeos", "Navegar na internet"], correct: 1, explanation: "O WinRAR é usado para compactar e descompactar arquivos nos formatos RAR, ZIP e outros." },
  { id: 16, category: "Programas", question: "Qual programa do pacote Office é usado para criar planilhas?", options: ["Word", "PowerPoint", "Excel", "Access"], correct: 2, explanation: "O Microsoft Excel é o programa do Office destinado à criação e edição de planilhas eletrônicas." },
  { id: 17, category: "Programas", question: "O que é o VLC Media Player?", options: ["Um editor de texto", "Um reprodutor multimídia gratuito", "Um antivírus", "Um sistema operacional"], correct: 1, explanation: "O VLC é um reprodutor multimídia gratuito e de código aberto que suporta diversos formatos." },
  { id: 18, category: "Programas", question: "Qual a principal função de um antivírus como o Avast?", options: ["Editar documentos", "Proteger o computador contra malwares", "Acelerar a internet", "Fazer backup"], correct: 1, explanation: "Antivírus como o Avast protegem o computador detectando e removendo vírus, malwares e ameaças." },

  // Cabos e Conectores
  { id: 19, category: "Cabos", question: "Qual cabo é mais comum para conectar monitores modernos?", options: ["VGA", "DVI", "HDMI", "PS/2"], correct: 2, explanation: "O HDMI é o padrão mais comum para conexão de monitores e TVs modernos, transmitindo áudio e vídeo." },
  { id: 20, category: "Cabos", question: "Qual a vantagem do DisplayPort sobre o HDMI?", options: ["É mais barato", "Suporta maiores resoluções e taxas de atualização", "É mais colorido", "Não precisa de cabo"], correct: 1, explanation: "O DisplayPort geralmente suporta resoluções e taxas de atualização mais altas que o HDMI." },
  { id: 21, category: "Cabos", question: "O que é um cabo RJ45?", options: ["Cabo de energia", "Cabo de rede Ethernet", "Cabo de áudio", "Cabo USB"], correct: 1, explanation: "O cabo RJ45 é o conector padrão para cabos de rede Ethernet, usado para conexões com fio." },
  { id: 22, category: "Cabos", question: "Qual a diferença entre Wi-Fi e cabo Ethernet?", options: ["Não há diferença", "Wi-Fi é sem fio e geralmente mais lento; Ethernet é cabeado e mais estável", "Ethernet é sem fio", "Wi-Fi é mais rápido sempre"], correct: 1, explanation: "Wi-Fi é conexão sem fio (mais prática), enquanto Ethernet usa cabo (mais estável e geralmente mais rápida)." },

  // Lógica de Programação
  { id: 23, category: "Lógica", question: "O que é um algoritmo?", options: ["Um tipo de vírus", "Uma sequência lógica de passos para resolver um problema", "Um componente de hardware", "Um sistema operacional"], correct: 1, explanation: "Um algoritmo é uma sequência finita e ordenada de instruções para resolver um problema." },
  { id: 24, category: "Lógica", question: "O que é uma variável em programação?", options: ["Um erro no código", "Um espaço na memória que armazena dados", "Um tipo de cabo", "Uma tela do computador"], correct: 1, explanation: "Uma variável é um espaço nomeado na memória usado para armazenar valores durante a execução do programa." },
  { id: 25, category: "Lógica", question: "O que faz uma estrutura condicional 'SE' (IF)?", options: ["Repete um bloco de código", "Executa um bloco apenas se uma condição for verdadeira", "Encerra o programa", "Declara uma variável"], correct: 1, explanation: "A estrutura IF executa um bloco de código somente quando a condição especificada é verdadeira." },
  { id: 26, category: "Lógica", question: "O que é um loop (laço de repetição)?", options: ["Um erro infinito", "Uma estrutura que repete instruções enquanto uma condição for verdadeira", "Um tipo de variável", "Uma função matemática"], correct: 1, explanation: "Um loop repete um bloco de código enquanto uma condição permanecer verdadeira (ex: FOR, WHILE)." },
  { id: 27, category: "Lógica", question: "O que é pseudocódigo?", options: ["Código em Python", "Uma forma de representar algoritmos em linguagem natural estruturada", "Um tipo de malware", "Código HTML"], correct: 1, explanation: "Pseudocódigo é uma representação de algoritmos usando linguagem natural estruturada, sem sintaxe rígida." },
];

export function getShuffledQuestions(): QuizQuestion[] {
  return [...quizQuestions].sort(() => Math.random() - 0.5);
}
