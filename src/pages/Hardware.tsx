import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";

import cpuImg from "@/assets/hw-cpu.jpg";
import ramImg from "@/assets/hw-ram.jpg";
import storageImg from "@/assets/hw-storage.jpg";
import coolerImg from "@/assets/hw-cooler.jpg";
import psuImg from "@/assets/hw-psu.jpg";
import moboImg from "@/assets/hw-mobo.jpg";
import gpuImg from "@/assets/hw-gpu.jpg";
import peripheralsImg from "@/assets/hw-peripherals.jpg";

interface TopicCard {
  image: string;
  title: string;
  desc: string;
  details: string[];
}

const topics: TopicCard[] = [
  {
    image: cpuImg,
    title: "Processador (CPU)",
    desc: "É o 'cérebro' do computador. Ele executa todas as tarefas e cálculos que você pede.",
    details: [
      "Quanto mais GHz, mais rápido ele processa",
      "Núcleos: é como ter vários cérebros trabalhando juntos",
      "Exemplos: Intel Core i3, i5, i7 e AMD Ryzen",
      "Precisa de um cooler para não superaquecer",
    ],
  },
  {
    image: ramImg,
    title: "Memória RAM",
    desc: "Funciona como a 'mesa de trabalho' do computador — guarda temporariamente o que está sendo usado.",
    details: [
      "Quanto mais RAM, mais programas abertos ao mesmo tempo",
      "8GB é bom para uso básico, 16GB para mais desempenho",
      "Os dados somem quando o PC desliga (memória temporária)",
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
      "Certificação 80 Plus = fonte de boa qualidade",
      "Fonte ruim pode queimar as peças do PC",
      "Sempre compre fonte de marca confiável",
    ],
  },
  {
    image: moboImg,
    title: "Placa-Mãe",
    desc: "É a 'base' que conecta todas as peças do computador entre si. Sem ela, nada funciona.",
    details: [
      "Tudo se encaixa nela: processador, RAM, SSD, placa de vídeo",
      "Deve ser compatível com o processador escolhido",
      "Tem entradas USB, HDMI, áudio e rede",
      "Tamanhos: ATX (grande) e Micro-ATX (compacta)",
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
      "Quanto mais memória (VRAM), melhor para jogos",
    ],
  },
  {
    image: peripheralsImg,
    title: "Periféricos",
    desc: "São os dispositivos que você conecta ao computador para interagir com ele.",
    details: [
      "Entrada: teclado, mouse, webcam, microfone",
      "Saída: monitor, caixa de som, impressora",
      "Armazenamento externo: pendrive, HD externo",
      "Conectam via USB, HDMI, Bluetooth ou Wi-Fi",
    ],
  },
];

export default function Hardware() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <ScrollToTop />
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-neon-text">
            Hardware
          </h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">
            Conheça cada peça que faz o computador funcionar — explicado de um jeito simples!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass p-6 hover:border-primary/30 transition-all group"
            >
              <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-secondary">
                <img
                  src={topic.image}
                  alt={topic.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
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
      </div>
    </div>
  );
}
