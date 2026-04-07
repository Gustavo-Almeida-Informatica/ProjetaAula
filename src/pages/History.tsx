import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";

const timeline = [
  {
    year: "1945",
    title: "ENIAC — O Primeiro Computador",
    desc: "O ENIAC foi o primeiro computador eletrônico de grande porte. Pesava 27 toneladas, ocupava uma sala inteira e foi criado nos EUA para cálculos militares durante a Segunda Guerra Mundial.",
    details: [
      "Usava válvulas termoiônicas (18.000 delas!)",
      "Consumia tanta energia que as luzes da vizinhança piscavam",
      "Não tinha teclado nem mouse — era programado por fios e interruptores",
      "Conseguia fazer 5.000 operações por segundo (hoje um celular faz bilhões)",
    ],
  },
  {
    year: "1947–1960",
    title: "Transistores e Circuitos Integrados",
    desc: "O transistor substituiu as válvulas — era menor, mais rápido e esquentava menos. Depois vieram os circuitos integrados (chips), que colocaram milhares de transistores em uma única peça minúscula.",
    details: [
      "Transistor: inventado em 1947 nos Laboratórios Bell",
      "Circuito integrado (chip): inventado em 1958 por Jack Kilby",
      "Os computadores ficaram menores, mais baratos e mais confiáveis",
      "Essa evolução é a base de toda tecnologia moderna",
    ],
  },
  {
    year: "1970–1980",
    title: "Computadores Pessoais (PC)",
    desc: "Pela primeira vez, computadores começaram a caber em uma mesa! Empresas como Apple e IBM criaram máquinas para uso pessoal e escritórios.",
    details: [
      "Apple II (1977): um dos primeiros PCs de sucesso comercial",
      "IBM PC (1981): estabeleceu o padrão que usamos até hoje",
      "Surgiu o sistema operacional MS-DOS da Microsoft",
      "Os PCs ainda eram caros, mas revolucionaram escritórios",
    ],
  },
  {
    year: "1990–2000",
    title: "A Era da Internet",
    desc: "A internet conectou computadores do mundo inteiro. Surgiu a World Wide Web (WWW), e-mail se popularizou, e empresas como Google e Amazon nasceram.",
    details: [
      "WWW criada por Tim Berners-Lee em 1991",
      "Navegadores como Netscape e Internet Explorer popularizaram a web",
      "Google foi fundado em 1998",
      "A internet discada usava a linha telefônica e era bem lenta",
      "E-mail, chats e sites mudaram a comunicação do mundo",
    ],
  },
  {
    year: "2007–Hoje",
    title: "Smartphones, Cloud e Inteligência Artificial",
    desc: "O iPhone (2007) mudou tudo — um computador no bolso. Hoje usamos a nuvem (cloud) para guardar arquivos e a inteligência artificial está em todo lugar.",
    details: [
      "Smartphones são mais potentes que os computadores dos anos 90",
      "Cloud: seus arquivos ficam guardados na internet (Google Drive, iCloud)",
      "Inteligência Artificial: assistentes como Alexa, Siri e ChatGPT",
      "Internet das Coisas (IoT): geladeiras, relógios e TVs conectados à internet",
    ],
  },
];

const peripherals = [
  {
    category: "Periféricos de Entrada",
    desc: "São os dispositivos que você usa para enviar informações para o computador.",
    items: [
      { name: "Teclado", detail: "Dispositivo para digitar textos, comandos e atalhos. Tipos: membrana (mais barato) e mecânico (mais durável e responsivo)." },
      { name: "Mouse", detail: "Dispositivo para apontar e clicar na tela. Tipos: com fio (USB), sem fio (Bluetooth ou receptor USB) e trackpad (em notebooks)." },
      { name: "Webcam", detail: "Câmera acoplada ao computador para videochamadas e gravação de vídeo." },
      { name: "Microfone", detail: "Capta áudio para chamadas, gravações e comandos de voz." },
      { name: "Scanner", detail: "Digitaliza documentos físicos, transformando papel em arquivo digital (PDF ou imagem)." },
    ],
  },
  {
    category: "Periféricos de Saída",
    desc: "São os dispositivos que mostram ou reproduzem as informações do computador para você.",
    items: [
      { name: "Monitor", detail: "Tela que exibe imagens e textos. Tipos: LCD, LED e OLED. Tamanhos comuns: 21\" a 27\"." },
      { name: "Impressora", detail: "Imprime documentos e fotos. Tipos: jato de tinta (fotos) e laser (textos rápidos). Impressora 3D cria objetos físicos." },
      { name: "Caixas de Som", detail: "Reproduzem áudio do computador. Podem ser com fio (P2/USB) ou Bluetooth." },
      { name: "Fones de Ouvido", detail: "Para ouvir áudio sem incomodar os outros. Headsets incluem microfone para chamadas." },
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
      { name: "USB 2.0 vs 3.0", detail: "USB 2.0 (preto) é mais lento. USB 3.0 (azul) transfere dados até 10x mais rápido." },
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
            De máquinas gigantes até o celular no seu bolso — conheça a evolução da tecnologia
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
