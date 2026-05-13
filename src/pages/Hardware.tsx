import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import cpuImg from "@/assets/hw-cpu.jpg";
import ramImg from "@/assets/hw-ram.jpg";
import storageImg from "@/assets/hw-storage.jpg";
import coolerImg from "@/assets/hw-cooler.jpg";
import psuImg from "@/assets/hw-psu.jpg";
import moboImg from "@/assets/hw-mobo.jpg";
import gpuImg from "@/assets/hw-gpu.jpg";
import peripheralsImg from "@/assets/hw-peripherals.jpg";
import gabineteImg from "@/assets/hw-gabinete.jpg";
import soundcardImg from "@/assets/hw-soundcard.jpg";
import nicImg from "@/assets/hw-nic.jpg";
import modemCablesImg from "@/assets/hw-modem-cables.jpg";
import keyboardImg from "@/assets/hw-keyboard.jpg";
import mouseImg from "@/assets/hw-mouse.jpg";
import monitorImg from "@/assets/hw-monitor.jpg";
import printerImg from "@/assets/hw-printer.jpg";
import scannerImg from "@/assets/hw-scanner.jpg";
import webcamImg from "@/assets/hw-webcam.jpg";
import multimediaImg from "@/assets/hw-multimedia.jpg";
import biosImg from "@/assets/hw-bios.jpg";
import portsImg from "@/assets/hw-ports.jpg";
import slotsImg from "@/assets/hw-slots.jpg";
import chipsetImg from "@/assets/hw-chipset.jpg";
import memoryTypesImg from "@/assets/hw-memory-types.jpg";
import raidImg from "@/assets/hw-raid.jpg";
import binaryImg from "@/assets/hw-binary.jpg";

interface TopicCard {
  image?: string;
  title: string;
  desc: string;
  details: string[];
}

export const topics: TopicCard[] = [
  {
    image: cpuImg,
    title: "Processador (CPU)",
    desc: "É o 'cérebro' do computador. Ele executa todas as tarefas e cálculos que você pede.",
    details: [
      "Quanto mais GHz, mais rápido ele processa",
      "Núcleos: é como ter vários cérebros trabalhando juntos",
      "Exemplos: Intel Core i3, i5, i7 e AMD Ryzen",
      "Precisa de um cooler para não superaquecer",
      "Cache L1, L2 e L3: memórias ultrarrápidas dentro do processador que guardam dados usados com frequência",
    ],
  },
  {
    image: ramImg,
    title: "Memória RAM",
    desc: "Funciona como a 'mesa de trabalho' do computador — guarda temporariamente o que está sendo usado.",
    details: [
      "Quanto mais RAM, mais programas abertos ao mesmo tempo",
      "8GB é bom para uso básico, 16GB para mais desempenho",
      "Os dados somem quando o PC desliga (memória temporária/volátil)",
      "Tipos: DDR4 (mais comum) e DDR5 (mais novo e rápido)",
    ],
  },
  {
    image: storageImg,
    title: "Armazenamento (HD e SSD)",
    desc: "Onde seus arquivos ficam guardados mesmo com o PC desligado: fotos, vídeos, programas e o Windows.",
    details: [
      "HD: mais barato, mas mais lento (usa discos girando)",
      "SSD: muito mais rápido, o PC liga em segundos",
      "O ideal é ter SSD para o sistema e HD para arquivos grandes",
      "Capacidades comuns: 256GB, 512GB, 1TB",
      "NVMe: tipo de SSD ainda mais rápido que conecta via slot M.2",
    ],
  },
  {
    image: coolerImg,
    title: "Cooler (Ventilador)",
    desc: "Mantém o processador na temperatura certa. Sem ele, o PC superaquece e desliga sozinho.",
    details: [
      "Fica em cima do processador, soprando ar frio",
      "Pasta térmica: gel que melhora a transferência de calor",
      "Existem coolers a ar (ventoinha) e a água (mais silencioso)",
      "Se o PC está muito quente ou barulhento, pode ser o cooler",
    ],
  },
  {
    image: psuImg,
    title: "Fonte de Alimentação",
    desc: "Transforma a energia da tomada para o tipo que as peças do computador precisam.",
    details: [
      "Potências comuns: 450W, 550W, 650W",
      "Certificação 80 Plus = fonte de boa qualidade e eficiente",
      "Fonte ruim pode queimar as peças do PC",
      "Sempre compre fonte de marca confiável",
      "Converte corrente alternada (AC) da tomada em corrente contínua (DC) para os componentes",
    ],
  },
  {
    image: moboImg,
    title: "Placa-Mãe",
    desc: "É a 'base' que conecta todas as peças do computador entre si. Sem ela, nada funciona.",
    details: [
      "Tudo se encaixa nela: processador, RAM, SSD, placa de vídeo",
      "Deve ser compatível com o processador escolhido (soquete)",
      "Tem entradas USB, HDMI, áudio e rede",
      "Tamanhos: ATX (grande) e Micro-ATX (compacta)",
      "Slots PCIe: onde conecta placa de vídeo e outros componentes",
    ],
  },
  {
    image: gpuImg,
    title: "Placa de Vídeo (GPU)",
    desc: "Processa tudo que aparece na tela: desde a área de trabalho até jogos pesados.",
    details: [
      "Essencial para jogos, edição de vídeo e design",
      "Marcas: NVIDIA GeForce e AMD Radeon",
      "Para uso básico, a placa integrada no processador basta",
      "Quanto mais memória (VRAM), melhor para jogos e edição",
    ],
  },
  {
    image: peripheralsImg,
    title: "Periféricos",
    desc: "São os dispositivos que você conecta ao computador para interagir com ele.",
    details: [
      "Entrada: teclado, mouse, webcam, microfone, scanner",
      "Saída: monitor, caixa de som, impressora, fones de ouvido",
      "Armazenamento externo: pendrive, HD externo, cartão SD",
      "Conectam via USB, HDMI, Bluetooth ou Wi-Fi",
      "Impressora 3D: cria objetos físicos camada por camada a partir de modelos digitais",
    ],
  },
  {
    image: gabineteImg,
    title: "Gabinete",
    desc: "É a 'caixa' onde todas as peças internas do computador ficam organizadas e protegidas.",
    details: [
      "Tipos: Desktop (horizontal) e Minitorre/Torre (vertical)",
      "Formato AT (antigo): botão liga/desliga manual, sem desligamento pelo Windows",
      "Formato ATX (atual): desliga sozinho pelo sistema operacional",
      "O gabinete protege os componentes contra poeira e impactos",
      "Possui espaços para HD, SSD, fonte e ventoinhas extras",
    ],
  },
  {
    image: soundcardImg,
    title: "Placa de Som",
    desc: "Converte os dados digitais do computador em som que você pode ouvir nas caixas de som ou fones.",
    details: [
      "Faz a conversão digital → analógico (DAC) para reproduzir áudio",
      "Faz a conversão analógico → digital (ADC) para gravar áudio do microfone",
      "A maioria das placas-mãe já tem som embutido (onboard)",
      "Placas de som dedicadas oferecem melhor qualidade para músicos e estúdios",
    ],
  },
  {
    image: nicImg,
    title: "Placa de Rede (NIC)",
    desc: "Permite que o computador se conecte à internet e a outros computadores em rede.",
    details: [
      "Usa conector RJ45 para cabo de rede Ethernet (par trançado)",
      "Cada placa tem um endereço MAC único (como um 'CPF' do dispositivo na rede)",
      "Existem placas com fio (Ethernet) e sem fio (Wi-Fi/Wireless)",
      "A maioria das placas-mãe atuais já vem com rede embutida (onboard)",
      "Velocidades comuns: 100 Mbps (Fast Ethernet) e 1 Gbps (Gigabit Ethernet)",
    ],
  },
  {
    image: modemCablesImg,
    title: "Placa Fax/Modem",
    desc: "Permitia ao computador enviar e receber dados pela linha telefônica — essencial na era da internet discada.",
    details: [
      "Modem = MOdulador/DEModulador: converte sinais digitais em analógicos e vice-versa",
      "Usava a linha telefônica para conectar à internet",
      "Velocidade máxima: 56 Kbps (muito lenta pelos padrões atuais)",
      "Também servia para enviar e receber fax pelo computador",
      "Hoje foi substituída por conexões banda larga (fibra óptica, cabo, DSL)",
    ],
  },
  {
    image: modemCablesImg,
    title: "Flat Cable (Cabos Internos)",
    desc: "Cabos achatados que fazem a conexão entre a placa-mãe e os dispositivos de armazenamento dentro do gabinete.",
    details: [
      "IDE (PATA): cabo largo e achatado com 40 ou 80 fios, usado em HDs e CDs antigos",
      "SATA: cabo fino e moderno, mais rápido e organizado que o IDE",
      "O cabo IDE permitia conectar 2 dispositivos (Master e Slave) no mesmo cabo",
      "O SATA é ponto a ponto: um cabo por dispositivo",
      "Hoje quase todos os PCs usam SATA ou NVMe (sem cabo, direto no slot M.2)",
    ],
  },
  {
    image: keyboardImg,
    title: "Teclado (Detalhado)",
    desc: "Principal dispositivo de entrada: permite digitar textos, comandos e atalhos no computador.",
    details: [
      "Teclas alfanuméricas: letras (A-Z) e números (0-9)",
      "Teclas de função: F1 a F12, cada programa usa de um jeito",
      "Teclas de controle: Ctrl, Alt, Shift, Esc, Tab, Enter, Caps Lock, Backspace, Delete",
      "Teclado numérico: bloco à direita com números e operações matemáticas",
      "Conexões: PS/2 (conector roxo, antigo), USB (atual) e Wireless (sem fio)",
      "Tipos: membrana (mais barato e silencioso) e mecânico (mais durável e responsivo)",
    ],
  },
  {
    image: mouseImg,
    title: "Mouse (Detalhado)",
    desc: "Dispositivo de entrada que controla o ponteiro na tela, permitindo clicar, arrastar e selecionar.",
    details: [
      "Clique simples: seleciona um item ou clica em botões",
      "Clique duplo: abre arquivos, pastas e programas",
      "Clique direito: abre menu de opções (renomear, copiar, excluir)",
      "Scroll (rodinha): rola a página para cima e para baixo",
      "Drag and Drop: clicar, segurar e arrastar para mover itens",
      "Tipos: óptico (luz LED), laser (mais preciso), com fio (USB), sem fio (Bluetooth/receptor USB)",
    ],
  },
  {
    image: monitorImg,
    title: "Monitor (Detalhado)",
    desc: "Periférico de saída que exibe as imagens, textos e vídeos do computador na tela.",
    details: [
      "LCD (Liquid Crystal Display): tela de cristal líquido, econômica e fina",
      "LED: variação do LCD com iluminação por LEDs, melhor contraste e menor consumo",
      "Resolução: quantidade de pixels na tela (Full HD = 1920x1080, 4K = 3840x2160)",
      "Tamanhos comuns: 21\", 24\", 27\" e 32\"",
      "Taxa de atualização: 60Hz (básico), 144Hz ou 240Hz (gamers)",
      "Conecta via HDMI, DisplayPort ou VGA (antigo)",
    ],
  },
  {
    image: printerImg,
    title: "Impressora (Tipos)",
    desc: "Periférico de saída que transfere texto e imagens do computador para o papel.",
    details: [
      "Matricial: usa agulhas e fita, impressão em formulário contínuo — usada em empresas para notas fiscais",
      "Jato de Tinta: borrifa gotículas de tinta no papel — boa para fotos e uso doméstico",
      "Laser: usa toner (pó) e calor — impressão muito rápida e nítida para textos",
      "Térmica: usa calor para imprimir em papel especial — cupons fiscais e etiquetas",
      "Impressora 3D: cria objetos físicos tridimensionais camada por camada",
      "Multifuncional: impressora + scanner + copiadora em um só aparelho",
    ],
  },
  {
    image: scannerImg,
    title: "Scanner (Detalhado)",
    desc: "Periférico de entrada que digitaliza documentos e imagens físicas, transformando papel em arquivo digital.",
    details: [
      "Scanner de mesa: o documento é colocado sobre o vidro e a luz percorre toda a superfície",
      "Scanner de mão: portátil, você passa manualmente sobre o documento",
      "Formatos de saída: PDF, JPEG, PNG, TIFF",
      "Resolução medida em DPI (pontos por polegada) — quanto maior, mais detalhado",
      "Muitas impressoras multifuncionais já incluem scanner embutido",
    ],
  },
  {
    image: webcamImg,
    title: "Webcam",
    desc: "Câmera pequena conectada ao computador para videochamadas, gravação e streaming.",
    details: [
      "Usa sensor CCD ou CMOS para capturar imagens",
      "Conexão principal: USB",
      "Resolução: 720p (HD), 1080p (Full HD) ou 4K",
      "Notebooks já possuem webcam embutida na tela",
      "Muito usada para aulas online, reuniões e lives",
    ],
  },
  {
    image: multimediaImg,
    title: "Kit Multimídia",
    desc: "Conjunto de caixa de som e microfone para reprodução e captação de áudio no computador.",
    details: [
      "Caixas de som: reproduzem o áudio do computador (músicas, vídeos, notificações)",
      "Microfone: capta sua voz para chamadas, gravações e comandos",
      "Conexão via P2 (3.5mm), USB ou Bluetooth",
      "Headsets combinam fone + microfone em um único dispositivo",
      "Webcams com microfone embutido dispensam microfone separado",
    ],
  },
  {
    image: biosImg,
    title: "BIOS / CMOS / POST (Detalhado)",
    desc: "Sistema fundamental que inicia o computador, testa as peças e carrega o Windows.",
    details: [
      "BIOS (Basic Input/Output System): firmware gravado em chip na placa-mãe",
      "CMOS: chip que armazena as configurações do BIOS (data/hora, ordem de boot, etc.)",
      "Bateria CR2032: mantém as configurações do CMOS quando o PC está desligado",
      "POST (Power-On Self Test): teste automático ao ligar o PC",
      "Bips do POST: 1 bip curto = tudo OK",
      "2 a 4 bips = problema na memória RAM",
      "8 bips = problema na placa de vídeo",
      "9 bips = erro na BIOS/ROM",
      "Bips contínuos = problema na memória ou alimentação",
      "Para acessar: pressione Del, F2 ou F12 ao ligar o PC",
    ],
  },
  {
    image: portsImg,
    title: "Interfaces e Portas",
    desc: "São as conexões físicas na parte traseira (e frontal) do computador para ligar periféricos.",
    details: [
      "Serial (DB-9): porta antiga com 9 pinos, usada para mouse e modems antigos — transmite 1 bit por vez",
      "Paralela (DB-25): porta com 25 pinos, usada para impressoras antigas — transmite 8 bits por vez",
      "USB: porta universal que suporta até 127 periféricos conectados simultaneamente",
      "IDE (PATA): interface interna para HD e CD/DVD (cabo flat largo)",
      "SATA: substituiu o IDE — mais rápido e com cabo fino",
      "SCSI: interface para servidores, suporta até 16 dispositivos em cadeia",
      "Master/Slave: configuração dos dispositivos IDE — o Master é o principal, o Slave é o secundário",
    ],
  },
  {
    image: slotsImg,
    title: "Slots de Barramento",
    desc: "São encaixes na placa-mãe onde você instala placas de expansão (vídeo, som, rede, etc.).",
    details: [
      "ISA (Industry Standard Architecture): barramento antigo de 8 ou 16 bits, muito lento",
      "PCI (Peripheral Component Interconnect): barramento de 32 bits a 33 MHz, usado para placas de som e rede",
      "AGP (Accelerated Graphics Port): slot exclusivo para placa de vídeo, mais rápido que o PCI",
      "PCI Express (PCIe): o barramento atual — muito mais rápido, usado para GPUs, SSDs NVMe e placas de rede",
      "PCIe tem versões: x1, x4, x8, x16 — quanto mais 'lanes', mais rápido",
    ],
  },
  {
    image: chipsetImg,
    title: "Chipsets (Ponte Norte e Ponte Sul)",
    desc: "São chips na placa-mãe que controlam a comunicação entre os componentes do computador.",
    details: [
      "Ponte Norte (Northbridge): gerencia a comunicação rápida entre CPU, RAM e placa de vídeo",
      "Ponte Sul (Southbridge): gerencia periféricos mais lentos como USB, áudio, HD e rede",
      "Em processadores modernos, a ponte norte foi integrada diretamente na CPU",
      "O chipset define quais recursos a placa-mãe suporta (tipo de RAM, quantidade de USB, etc.)",
    ],
  },
  {
    image: memoryTypesImg,
    title: "Memórias Avançadas (SDRAM, DDR2, DDR3)",
    desc: "A memória RAM evoluiu ao longo dos anos, ficando mais rápida e eficiente a cada geração.",
    details: [
      "SDRAM: memória síncrona, primeira a acompanhar o clock da placa-mãe",
      "DDR (Double Data Rate): transfere dados duas vezes por ciclo de clock",
      "DDR2: mais rápida que DDR, operava a 400-800 MHz",
      "DDR3: mais eficiente que DDR2, operava a 800-1600 MHz e menor consumo de energia",
      "DDR4: a mais comum atualmente, 2133-3200 MHz",
      "DDR5: a mais nova, ainda mais rápida e eficiente",
      "Cada geração tem encaixe diferente — DDR3 não encaixa no slot de DDR4",
    ],
  },
  {
    image: raidImg,
    title: "RAID (Redundant Array of Independent Disks)",
    desc: "Sistema que combina vários HDs ou SSDs para aumentar velocidade ou proteção dos dados.",
    details: [
      "RAID 0 (Stripping): divide dados entre 2+ discos para maior velocidade, mas sem proteção — se um disco falhar, perde tudo",
      "RAID 1 (Mirroring): espelha os dados em 2 discos — se um falhar, o outro tem a cópia completa",
      "RAID 5: usa 3+ discos com dados + paridade, equilibrando velocidade e segurança",
      "RAID é usado em servidores e empresas onde perder dados é inaceitável",
      "Não substitui o backup — é uma camada extra de proteção",
    ],
  },
  {
    image: binaryImg,
    title: "Sistemas Numéricos (Binário, Bits e Bytes)",
    desc: "O computador entende apenas 0 e 1 (binário). Toda informação é convertida para esse formato.",
    details: [
      "Binário: sistema de base 2, usa apenas 0 e 1",
      "Decimal: sistema que usamos no dia a dia, base 10 (0 a 9)",
      "Hexadecimal: base 16 (0-9 e A-F), usado em cores e endereços de memória",
      "Bit: a menor unidade de informação (0 ou 1)",
      "Byte: 8 bits agrupados (ex: 01001010)",
      "1 KB (Kilobyte) = 1.024 bytes",
      "1 MB (Megabyte) = 1.024 KB",
      "1 GB (Gigabyte) = 1.024 MB",
      "1 TB (Terabyte) = 1.024 GB",
    ],
  },
];

export default function Hardware() {
  const [params] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(params.get("q") ?? "");

  const filteredTopics = topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16 pb-12">
      <ScrollToTop />
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-warm-text">
            Hardware
          </h1>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg mx-auto">
            Conheça cada peça que faz o computador funcionar — explicado de um jeito simples!
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar
            placeholder="Pesquise por um componente (ex: RAM, CPU, Placa-Mãe)..."
            onSearch={setSearchQuery}
            value={searchQuery}
          />
        </div>

        {filteredTopics.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 text-center rounded-xl"
          >
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Nenhum componente encontrado com este nome. Tente outro termo!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTopics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass p-6 hover:border-primary/20 transition-all"
              >
                {topic.image && (
                  <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-secondary">
                    <img
                      src={topic.image}
                      alt={topic.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="font-display text-base font-bold text-foreground mb-2">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{topic.desc}</p>
                <ul className="space-y-1.5">
                  {topic.details.map((d) => (
                    <li key={d} className="text-xs text-foreground/80 flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
