import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";

const timeline = [
  {
    year: "1ª Geração (1940–1955)",
    title: "Válvulas Termoiônicas — ENIAC e EDVAC",
    desc: "Os primeiros computadores usavam válvulas termoiônicas — componentes enormes, frágeis e que esquentavam muito. O ENIAC foi o mais famoso.",
    details: [
      "ENIAC (1945): primeiro computador eletrônico de grande porte",
      "Pesava 27 toneladas e ocupava uma sala inteira",
      "Usava 18.000 válvulas termoiônicas",
      "Consumia tanta energia que as luzes da vizinhança piscavam",
      "Não tinha teclado nem mouse — era programado por fios e interruptores",
      "Conseguia fazer 5.000 operações por segundo (hoje um celular faz bilhões)",
      "EDVAC (1952): evoluiu o conceito com programa armazenado na memória",
      "Criado para cálculos militares durante a Segunda Guerra Mundial",
    ],
  },
  {
    year: "2ª Geração (1955–1965)",
    title: "Transistores",
    desc: "O transistor substituiu as válvulas — era muito menor, mais rápido, mais confiável e consumia menos energia.",
    details: [
      "Transistor: inventado em 1947 nos Laboratórios Bell por Bardeen, Brattain e Shockley",
      "Computadores ficaram menores (armários em vez de salas inteiras)",
      "Peso reduziu para cerca de 150 kg",
      "Consumo de energia caiu drasticamente",
      "Mais confiáveis: transistores não queimavam como as válvulas",
      "Surgimento das primeiras linguagens de programação (COBOL, FORTRAN)",
    ],
  },
  {
    year: "3ª Geração (1965–1975)",
    title: "Circuitos Integrados (Chips)",
    desc: "O circuito integrado colocou milhares de transistores em uma única peça minúscula — os computadores ficaram muito menores e baratos.",
    details: [
      "Circuito integrado inventado em 1958 por Jack Kilby (Texas Instruments)",
      "Milhares de transistores em um único chip de silício",
      "Computadores ficaram muito menores e mais acessíveis",
      "Burroughs B-2500: exemplo de computador desta geração",
      "Surgiram os primeiros terminais com teclado e monitor",
      "Uso comercial se expandiu para empresas e universidades",
    ],
  },
  {
    year: "4ª Geração (1975–1990)",
    title: "VLSI e Computadores Pessoais (PC)",
    desc: "Com a tecnologia VLSI (integração em grande escala), milhões de transistores cabem em um chip. Nasceram os PCs para uso pessoal.",
    details: [
      "VLSI (Very Large Scale Integration): milhões de transistores em um chip",
      "Atari (1972): um dos primeiros computadores pessoais/consoles",
      "ALTAIR 8800 (1974): considerado o primeiro PC de verdade",
      "Microsoft fundada em 1975 por Bill Gates e Paul Allen",
      "Apple II (1977): um dos primeiros PCs de sucesso comercial",
      "IBM PC (1981): estabeleceu o padrão que usamos até hoje",
      "Processadores evoluíram: 286 → 386 → 486",
      "Surgiu o sistema operacional MS-DOS da Microsoft",
    ],
  },
  {
    year: "5ª Geração (1990–Hoje)",
    title: "ULSI, Internet, Smartphones e IA",
    desc: "Processadores com bilhões de transistores, internet global, smartphones e inteligência artificial mudaram o mundo.",
    details: [
      "ULSI (Ultra Large Scale Integration): bilhões de transistores por chip",
      "Processadores multicore: Dual-Core, Quad-Core, Octa-Core",
      "Intel Core i3, i5, i7, i9 e AMD Ryzen dominam o mercado",
      "WWW criada por Tim Berners-Lee em 1991",
      "Google fundado em 1998",
      "Smartphones: o iPhone (2007) trouxe um computador para o bolso",
      "Cloud Computing: seus arquivos ficam na internet (Google Drive, iCloud)",
      "Inteligência Artificial: assistentes como Alexa, Siri e ChatGPT",
      "Internet das Coisas (IoT): geladeiras, relógios e TVs conectados à internet",
      "A internet discada usava a linha telefônica e era bem lenta",
    ],
  },
];

const peripherals = [
  {
    category: "Periféricos de Entrada",
    desc: "São os dispositivos que você usa para enviar informações para o computador.",
    items: [
      { name: "Teclado", detail: "Dispositivo para digitar textos, comandos e atalhos. Tipos: membrana (mais barato) e mecânico (mais durável e responsivo). Conexões: PS/2 (roxo, antigo), USB e Wireless." },
      { name: "Mouse", detail: "Dispositivo para apontar e clicar na tela. Tipos: óptico (LED), laser (mais preciso), com fio (USB) e sem fio (Bluetooth/receptor). Ações: clique simples, duplo, direito, scroll, drag and drop." },
      { name: "Webcam", detail: "Câmera acoplada ao computador para videochamadas e gravação de vídeo. Usa sensor CCD/CMOS, conexão USB. Resoluções: 720p, 1080p, 4K." },
      { name: "Microfone", detail: "Capta áudio para chamadas, gravações e comandos de voz. Conexão via P2 (3.5mm), USB ou Bluetooth." },
      { name: "Scanner", detail: "Digitaliza documentos físicos em arquivo digital (PDF/imagem). Tipos: mesa (documento no vidro) e mão (portátil). Resolução em DPI." },
    ],
  },
  {
    category: "Periféricos de Saída",
    desc: "São os dispositivos que mostram ou reproduzem as informações do computador para você.",
    items: [
      { name: "Monitor", detail: "Tela que exibe imagens e textos. Tipos: LCD, LED, OLED. Resolução: HD, Full HD, 4K. Taxa de atualização: 60Hz a 240Hz." },
      { name: "Impressora", detail: "Tipos: Matricial (agulhas, notas fiscais), Jato de Tinta (fotos), Laser (toner, textos rápidos), Térmica (cupons), 3D (objetos físicos). Multifuncional = impressora + scanner + copiadora." },
      { name: "Caixas de Som", detail: "Reproduzem áudio do computador. Podem ser com fio (P2/USB) ou Bluetooth." },
      { name: "Fones de Ouvido", detail: "Para ouvir áudio sem incomodar os outros. Headsets incluem microfone para chamadas e jogos." },
      { name: "Projetor", detail: "Projeta a tela do computador em paredes ou telas grandes. Usado em salas de aula e apresentações." },
    ],
  },
  {
    category: "Tipos de USB",
    desc: "O USB é o conector mais comum para ligar periféricos ao computador. Existem vários tipos:",
    items: [
      { name: "USB-A", detail: "O conector retangular clássico, presente em pendrives, mouses e teclados." },
      { name: "USB-B", detail: "Conector quadrado usado em impressoras e scanners." },
      { name: "Mini USB", detail: "Conector menor, usado em câmeras digitais e dispositivos antigos." },
      { name: "Micro USB", detail: "Conector fino usado em celulares Android antigos e controles de videogame." },
      { name: "USB-C", detail: "O mais moderno — reversível (encaixa dos dois lados). Usado em celulares novos, notebooks e até carregadores." },
      { name: "USB 2.0 vs 3.0", detail: "USB 2.0 (preto) é mais lento (480 Mbps). USB 3.0 (azul) transfere dados até 10x mais rápido (5 Gbps)." },
    ],
  },
];

export default function History() {
  return (
    <div className="min-h-screen pt-16 pb-12">
      <ScrollToTop />
      <div className="container py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-warm-text">
            História do Computador
          </h1>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg mx-auto">
            Das válvulas gigantes até a inteligência artificial — conheça as 5 gerações da computação
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/50" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative mb-10 md:mb-14 ${
                i % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
              } pl-12 md:pl-0`}
            >
              {/* Dot */}
              <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />

              <div className="glass p-6">
                <span className="inline-block text-xs font-display font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                  {item.year}
                </span>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <ul className="space-y-1.5">
                  {item.details.map((d) => (
                    <li key={d} className="text-xs text-foreground/80 flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Peripherals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="font-display text-2xl font-bold text-center mb-10 gradient-warm-text">
            Periféricos e Tipos de USB
          </h2>

          <div className="space-y-8">
            {peripherals.map((section) => (
              <div key={section.category} className="glass p-6">
                <h3 className="font-display text-base font-bold text-foreground mb-2">{section.category}</h3>
                <p className="text-sm text-muted-foreground mb-4">{section.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {section.items.map((item) => (
                    <div key={item.name} className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="text-sm font-bold text-primary mb-1">{item.name}</h4>
                      <p className="text-xs text-foreground/80 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
