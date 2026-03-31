import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";
import { MonitorPlay, Wifi } from "lucide-react";

const categories = [
  { id: "video", label: "Vídeo", icon: MonitorPlay },
  { id: "internet", label: "Internet", icon: Wifi },
];

interface GalleryItem {
  title: string;
  studentDesc: string;
  teacherDesc: string;
  specs: { label: string; value: string }[];
}

const galleryContent: Record<string, GalleryItem[]> = {
  video: [
    {
      title: "HDMI (High-Definition Multimedia Interface)",
      studentDesc: "O cabo mais comum para conectar PC a monitor ou TV. Transmite imagem e som pelo mesmo cabo!",
      teacherDesc: "Padrão TMDS, versões 1.4 a 2.1. HDMI 2.1 suporta 4K@120Hz e 8K@60Hz com eARC para áudio lossless.",
      specs: [
        { label: "HDMI 1.4", value: "4K@30Hz, Full HD@120Hz" },
        { label: "HDMI 2.0", value: "4K@60Hz, HDR10" },
        { label: "HDMI 2.1", value: "4K@120Hz, 8K@60Hz, VRR" },
        { label: "Áudio", value: "Transmite áudio e vídeo" },
        { label: "Comprimento máx.", value: "15m (passivo)" },
      ],
    },
    {
      title: "DisplayPort",
      studentDesc: "Cabo preferido por gamers! Suporta taxas de atualização altíssimas para jogos fluidos.",
      teacherDesc: "Protocolo packetizado com micro-pacotes. Suporta daisy-chain (MST) e taxas superiores ao HDMI para monitores profissionais.",
      specs: [
        { label: "DP 1.2", value: "4K@60Hz, MST" },
        { label: "DP 1.4", value: "4K@120Hz, 8K@60Hz, DSC" },
        { label: "DP 2.0", value: "16K@60Hz, 4K@240Hz" },
        { label: "Vantagem", value: "FreeSync / G-Sync nativo" },
        { label: "Mini DP", value: "Versão compacta, mesma qualidade" },
      ],
    },
    {
      title: "HDMI vs DisplayPort — Comparação",
      studentDesc: "HDMI é mais universal (TVs e monitores). DisplayPort é melhor para gaming e múltiplos monitores.",
      teacherDesc: "Para laboratórios: HDMI pela universalidade. Para estações de alto desempenho: DisplayPort pelo MST e adaptive sync.",
      specs: [
        { label: "Universalidade", value: "HDMI vence (TVs, projetores)" },
        { label: "Gaming", value: "DisplayPort vence (adaptive sync)" },
        { label: "Multi-monitor", value: "DisplayPort com daisy-chain" },
        { label: "Áudio", value: "Ambos transmitem áudio" },
        { label: "Custo", value: "HDMI geralmente mais barato" },
      ],
    },
  ],
  internet: [
    {
      title: "Cabo Ethernet (RJ45)",
      studentDesc: "Conexão com fio — mais estável e rápida que Wi-Fi para jogos e downloads.",
      teacherDesc: "Categorias Cat5e a Cat8, blindagem UTP vs STP. Configure redes em estrela no laboratório com switch gerenciável.",
      specs: [
        { label: "Cat5e", value: "1 Gbps, 100m" },
        { label: "Cat6", value: "10 Gbps (55m), 1 Gbps (100m)" },
        { label: "Cat6a", value: "10 Gbps até 100m" },
        { label: "Cat7", value: "10 Gbps, blindagem individual" },
        { label: "Conector", value: "RJ45 (8P8C)" },
      ],
    },
    {
      title: "Wi-Fi (Wireless)",
      studentDesc: "Internet sem fio! Prático para celulares e notebooks, mas pode ser instável.",
      teacherDesc: "Padrões IEEE 802.11 (ac/ax/be). Configure SSIDs separados para alunos e administração com isolamento de rede.",
      specs: [
        { label: "Wi-Fi 5 (802.11ac)", value: "até 3.5 Gbps, 5 GHz" },
        { label: "Wi-Fi 6 (802.11ax)", value: "até 9.6 Gbps, 2.4+5 GHz" },
        { label: "Wi-Fi 6E", value: "Adiciona banda 6 GHz" },
        { label: "Wi-Fi 7 (802.11be)", value: "até 46 Gbps, tri-band" },
        { label: "Alcance", value: "2.4GHz: maior | 5GHz: menor, mais rápido" },
      ],
    },
    {
      title: "Wi-Fi vs Cabo — Comparação",
      studentDesc: "Cabo = mais rápido e estável. Wi-Fi = mais prático e sem fios. Depende do uso!",
      teacherDesc: "Para laboratórios: sempre preferir cabo para estações fixas. Wi-Fi para dispositivos móveis com QoS configurado.",
      specs: [
        { label: "Estabilidade", value: "Cabo vence (sem interferência)" },
        { label: "Velocidade", value: "Cabo vence na prática" },
        { label: "Praticidade", value: "Wi-Fi vence (sem fios)" },
        { label: "Latência", value: "Cabo: ~1ms | Wi-Fi: 5-20ms" },
        { label: "Recomendação", value: "Gaming/trabalho: cabo | Casual: Wi-Fi" },
      ],
    },
  ],
};

export default function Gallery() {
  const { isProfessor } = useAuth();
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
            Galeria Técnica
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {isProfessor ? "Comparativos técnicos para demonstração em aula." : "Explore conectores de vídeo e internet!"}
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
              <h3 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {isProfessor ? item.teacherDesc : item.studentDesc}
              </p>
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
