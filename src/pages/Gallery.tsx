import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { Seo } from "@/components/Seo";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Zap, MonitorPlay, Usb, HardDrive, Wifi, Volume2 } from "lucide-react";
import { slugify } from "@/lib/slug";
import { useScrollToItem } from "@/hooks/useScrollToItem";

import hdmiImg from "@/assets/cable-hdmi.jpg";
import displayportImg from "@/assets/cable-displayport.jpg";
import vgaImg from "@/assets/cable-vga.jpg";
import dviImg from "@/assets/cable-dvi.jpg";
import ethernetImg from "@/assets/cable-ethernet.jpg";
import wifiImg from "@/assets/cable-wifi.jpg";
import powerImg from "@/assets/cable-power.jpg";
import usbImg from "@/assets/cable-usb.jpg";
import sataImg from "@/assets/cable-sata.jpg";
import audioImg from "@/assets/cable-audio.jpg";

const categories = [
  { id: "energia", label: "Energia", icon: Zap },
  { id: "video", label: "Cabos de Vídeo", icon: MonitorPlay },
  { id: "dados", label: "Dados", icon: Usb },
  { id: "rede", label: "Rede e Internet", icon: Wifi },
  { id: "audio", label: "Áudio", icon: Volume2 },
];

interface GalleryItem {
  title: string;
  desc: string;
  image: string;
  specs: { label: string; value: string }[];
}

export const galleryContent: Record<string, GalleryItem[]> = {
  energia: [
    {
      title: "Cabo de Força (Tripolar)",
      image: powerImg,
      desc: "Cabo padrão que leva energia da tomada até o computador, monitor ou impressora. No Brasil segue o padrão NBR 14136 (três pinos).",
      specs: [
        { label: "O que faz", value: "Leva energia da tomada ao equipamento" },
        { label: "Onde usar", value: "Gabinete, monitor, impressora, estabilizador" },
        { label: "Padrão (BR)", value: "NBR 14136 — três pinos" },
        { label: "Aterramento", value: "Pino central protege contra choques" },
        { label: "Dica", value: "Nunca corte o pino de aterramento" },
      ],
    },
  ],
  video: [
    {
      title: "Cabo HDMI",
      image: hdmiImg,
      desc: "O cabo mais usado para conectar o computador ao monitor ou TV. Ele leva a imagem e o som pelo mesmo cabo.",
      specs: [
        { label: "O que faz", value: "Transmite imagem e som juntos" },
        { label: "Onde usar", value: "Monitores, TVs, projetores" },
        { label: "Qualidade", value: "Suporta Full HD, 4K e 8K (HDMI 2.1)" },
        { label: "Velocidade", value: "Até 48 Gbps (HDMI 2.1)" },
        { label: "Comprimento", value: "Até 15 metros sem perder qualidade" },
      ],
    },
    {
      title: "Cabo DisplayPort",
      image: displayportImg,
      desc: "Cabo preferido por quem joga ou trabalha com edição de vídeo. Suporta imagens muito rápidas e de alta qualidade.",
      specs: [
        { label: "O que faz", value: "Transmite imagem de altíssima qualidade" },
        { label: "Onde usar", value: "Monitores gamer e profissionais" },
        { label: "Velocidade", value: "Até 80 Gbps (DP 2.1)" },
        { label: "Vantagem", value: "Vários monitores em cadeia" },
        { label: "Versão menor", value: "Mini DisplayPort para notebooks" },
      ],
    },
    {
      title: "Cabo DVI",
      image: dviImg,
      desc: "Intermediário entre o VGA e o HDMI. Foi bastante usado em desktops antigos para monitores digitais.",
      specs: [
        { label: "O que faz", value: "Transmite apenas imagem (sem som)" },
        { label: "Versões", value: "DVI-D (digital) e DVI-I (digital + analógico)" },
        { label: "Onde encontrar", value: "Placas de vídeo e monitores antigos" },
        { label: "Adaptador", value: "Fácil converter para HDMI" },
        { label: "Dica", value: "Prefira HDMI ou DisplayPort quando houver" },
      ],
    },
    {
      title: "Cabo VGA (mais antigo)",
      image: vgaImg,
      desc: "Cabo antigo que só transmite imagem (sem som). Ainda encontrado em monitores e projetores mais velhos.",
      specs: [
        { label: "O que faz", value: "Transmite apenas imagem (sem som)" },
        { label: "Qualidade", value: "Até Full HD, mas com menos nitidez" },
        { label: "Conector", value: "Azul com parafusos laterais" },
        { label: "Onde encontrar", value: "Projetores e monitores antigos" },
        { label: "Dica", value: "Prefira HDMI se possível" },
      ],
    },
  ],
  dados: [
    {
      title: "Cabo USB (A / B / C)",
      image: usbImg,
      desc: "Cabo universal para transferir dados e levar energia. USB-A é o retangular clássico, USB-B é quadrado (impressoras) e USB-C é o novo padrão reversível.",
      specs: [
        { label: "O que faz", value: "Transfere dados e alimenta aparelhos" },
        { label: "Onde usar", value: "Pendrives, HDs, mouse, teclado, celular" },
        { label: "Velocidade", value: "USB 2.0: 480 Mbps · USB4: até 40 Gbps" },
        { label: "Energia (USB-C)", value: "Pode entregar até 240 W" },
        { label: "Dica", value: "USB-C é reversível — encaixa nos dois lados" },
      ],
    },
    {
      title: "Cabo SATA",
      image: sataImg,
      desc: "Cabo interno do gabinete que liga o HD ou SSD à placa-mãe. Fino, geralmente vermelho ou preto.",
      specs: [
        { label: "O que faz", value: "Conecta HDs e SSDs à placa-mãe" },
        { label: "Onde usar", value: "HD/SSD 2.5\" e 3.5\", leitor de DVD" },
        { label: "Velocidade", value: "SATA III: até 600 MB/s" },
        { label: "Formato", value: "Fino, com conector em L" },
        { label: "Dica", value: "SSDs NVMe não usam SATA — vão no slot M.2" },
      ],
    },
  ],
  rede: [
    {
      title: "Cabo de Rede (Ethernet / RJ45)",
      image: ethernetImg,
      desc: "É o cabo que conecta o computador ao roteador com fio. A internet por cabo é mais rápida e estável que o Wi-Fi.",
      specs: [
        { label: "O que faz", value: "Conecta o PC à internet com fio" },
        { label: "Vantagem", value: "Mais rápido e estável que Wi-Fi" },
        { label: "Conector", value: "RJ45 (parece um telefone, mas maior)" },
        { label: "Tipos", value: "Cat5e (1 Gbps) · Cat6 · Cat6a/7 (10 Gbps+)" },
        { label: "Ideal para", value: "Jogos online, downloads e trabalho" },
      ],
    },
    {
      title: "Wi-Fi (Internet sem fio)",
      image: wifiImg,
      desc: "Permite conectar à internet sem usar cabos. Muito prático para celulares e notebooks.",
      specs: [
        { label: "O que faz", value: "Internet sem fio pelo ar" },
        { label: "Vantagem", value: "Sem fios, muito prático" },
        { label: "Desvantagem", value: "Pode cair ou ficar lento com paredes" },
        { label: "Frequências", value: "2.4 GHz (alcance) e 5 GHz (velocidade)" },
        { label: "Dica", value: "Fique perto do roteador para melhor sinal" },
      ],
    },
  ],
  audio: [
    {
      title: "Cabo P2 (Áudio 3,5mm)",
      image: audioImg,
      desc: "Plug de áudio analógico redondo, usado em fones de ouvido, caixinhas de som e microfones.",
      specs: [
        { label: "O que faz", value: "Transmite som analógico" },
        { label: "Onde usar", value: "Fones, caixas de som, microfones" },
        { label: "Verde", value: "Saída de áudio (som)" },
        { label: "Rosa", value: "Entrada de microfone" },
        { label: "Azul", value: "Entrada de linha (line-in)" },
      ],
    },
  ],
};

export default function Gallery() {
  const [params] = useSearchParams();
  const catParam = params.get("cat");
  const itemParam = params.get("item");
  const [activeCategory, setActiveCategory] = useState(
    catParam && galleryContent[catParam] ? catParam : "energia",
  );
  useScrollToItem(itemParam, [activeCategory]);

  return (
    <div className="min-h-screen pt-16 pb-12">
      <Seo
        title="Conectores e Cabos — HDMI, USB, SATA, RJ45 e mais | Projeta Aula"
        description="Galeria completa de cabos e conectores: energia, vídeo (HDMI, DisplayPort, VGA, DVI), dados (USB, SATA), rede (Ethernet, Wi-Fi) e áudio (P2)."
        path="/galeria"
      />
      <ScrollToTop />
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-warm-text">
            Conectores e Cabos
          </h1>
          <p className="text-muted-foreground text-sm mt-3">
            Conheça os cabos que conectam as peças do computador, a energia, a internet e o áudio
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "gradient-warm text-primary-foreground warm-glow-sm"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {galleryContent[activeCategory]?.map((item, i) => (
            <motion.div
              key={item.title}
              id={slugify(item.title)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 hover:border-primary/20 transition-all scroll-mt-24 rounded-xl border border-transparent"
            >
              <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-secondary">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
              <div className="space-y-2">
                {item.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center gap-3 text-xs border-b border-border/30 pb-1.5">
                    <span className="text-primary font-medium shrink-0">{spec.label}</span>
                    <span className="text-foreground/80 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
