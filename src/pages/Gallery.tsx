import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";
import { MonitorPlay, Wifi } from "lucide-react";

import hdmiImg from "@/assets/cable-hdmi.jpg";
import displayportImg from "@/assets/cable-displayport.jpg";
import vgaImg from "@/assets/cable-vga.jpg";
import ethernetImg from "@/assets/cable-ethernet.jpg";
import wifiImg from "@/assets/cable-wifi.jpg";

const categories = [
  { id: "video", label: "Cabos de Vídeo", icon: MonitorPlay },
  { id: "internet", label: "Cabos de Internet", icon: Wifi },
];

interface GalleryItem {
  title: string;
  desc: string;
  image: string;
  specs: { label: string; value: string }[];
}

const galleryContent: Record<string, GalleryItem[]> = {
  video: [
    {
      title: "Cabo HDMI",
      image: hdmiImg,
      desc: "O cabo mais usado para conectar o computador ao monitor ou TV. Ele leva a imagem e o som pelo mesmo cabo, sem precisar de outros fios.",
      specs: [
        { label: "O que faz", value: "Transmite imagem e som juntos" },
        { label: "Onde usar", value: "Monitores, TVs, projetores" },
        { label: "Qualidade", value: "Suporta Full HD e 4K" },
        { label: "Vantagem", value: "Um único cabo resolve tudo" },
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
        { label: "Vantagem", value: "Suporta vários monitores com um cabo" },
        { label: "Para gamers", value: "Imagem mais fluida nos jogos" },
        { label: "Versão menor", value: "Mini DisplayPort para notebooks" },
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
  internet: [
    {
      title: "Cabo de Rede (Ethernet / RJ45)",
      image: ethernetImg,
      desc: "É o cabo que conecta o computador ao roteador com fio. A internet por cabo é mais rápida e estável que o Wi-Fi.",
      specs: [
        { label: "O que faz", value: "Conecta o PC à internet com fio" },
        { label: "Vantagem", value: "Mais rápido e estável que Wi-Fi" },
        { label: "Conector", value: "RJ45 (parece um telefone, mas maior)" },
        { label: "Tipos", value: "Cat5e, Cat6, Cat7 (cada vez melhor)" },
        { label: "Ideal para", value: "Jogos online, downloads e trabalho" },
      ],
    },
    {
      title: "Wi-Fi (Internet sem fio)",
      image: wifiImg,
      desc: "Permite conectar à internet sem usar cabos. Muito prático para celulares e notebooks, mas pode ser instável.",
      specs: [
        { label: "O que faz", value: "Internet sem fio pelo ar" },
        { label: "Vantagem", value: "Sem fios, muito prático" },
        { label: "Desvantagem", value: "Pode cair ou ficar lento com paredes" },
        { label: "Frequências", value: "2.4 GHz (alcance) e 5 GHz (velocidade)" },
        { label: "Dica", value: "Fique perto do roteador para melhor sinal" },
      ],
    },
    {
      title: "Wi-Fi vs Cabo — Qual usar?",
      image: ethernetImg,
      desc: "O cabo é melhor para quem precisa de velocidade (jogos, trabalho). O Wi-Fi é melhor para quem quer praticidade (celular, tablet).",
      specs: [
        { label: "Mais estável", value: "Cabo de rede (sem interferência)" },
        { label: "Mais prático", value: "Wi-Fi (sem fios)" },
        { label: "Mais rápido", value: "Cabo de rede na prática" },
        { label: "Para jogos", value: "Use cabo sempre que possível" },
        { label: "Para celular", value: "Wi-Fi é a única opção" },
      ],
    },
  ],
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("video");

  return (
    <div className="min-h-screen pt-20 pb-12">
      <ScrollToTop />
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-neon-text">
            Conectores e Cabos
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Conheça os cabos que conectam as peças do computador e a internet
          </p>
        </motion.div>

        <div className="flex gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "gradient-neon text-primary-foreground neon-glow"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryContent[activeCategory]?.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 hover:border-primary/30 transition-all"
            >
              <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-secondary">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
              <div className="space-y-2">
                {item.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center text-xs border-b border-border/50 pb-1.5">
                    <span className="text-primary font-medium">{spec.label}</span>
                    <span className="text-foreground/80">{spec.value}</span>
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
