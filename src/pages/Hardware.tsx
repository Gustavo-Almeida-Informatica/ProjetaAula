import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { Cpu, HardDrive, Fan, Zap, MemoryStick, CircuitBoard, Microchip, Server } from "lucide-react";

interface TopicCard {
  icon: typeof Cpu;
  title: string;
  studentDesc: string;
  teacherDesc: string;
  details: string[];
}

const topics: TopicCard[] = [
  {
    icon: Cpu,
    title: "Processador (CPU)",
    studentDesc: "O 'cérebro' do computador que executa todas as operações.",
    teacherDesc: "Unidade Central de Processamento — executa instruções em ciclos de clock. Aborde pipeline, branch prediction e multithreading.",
    details: [
      "Clock Speed: medido em GHz, indica ciclos por segundo",
      "Núcleos: processadores modernos têm 4-16+ núcleos",
      "Cache L1: ~64KB por núcleo, latência de 1-3 ciclos",
      "Cache L2: ~256KB-1MB por núcleo, latência de ~10 ciclos",
      "Cache L3: ~8-64MB compartilhado, latência de ~40 ciclos",
      "Arquitetura 64-bits permite endereçar mais de 4GB de RAM",
    ],
  },
  {
    icon: MemoryStick,
    title: "Memória RAM",
    studentDesc: "Memória temporária e ultra-rápida — pensa nela como sua mesa de trabalho.",
    teacherDesc: "Memória volátil de acesso aleatório. Explique latência CAS, dual-channel e diferenças DDR4 vs DDR5.",
    details: [
      "DDR4: 2133-5333 MHz, 1.2V",
      "DDR5: 4800-8400+ MHz, 1.1V",
      "Dual Channel dobra a largura de banda",
      "Latência CAS (CL): menor = mais rápida",
      "Capacidades comuns: 8GB, 16GB, 32GB",
    ],
  },
  {
    icon: HardDrive,
    title: "Armazenamento (SSD / HDD)",
    studentDesc: "Onde seus arquivos ficam salvos, mesmo quando o PC desliga.",
    teacherDesc: "Compare SATA III (600MB/s) vs NVMe PCIe 4.0 (7000MB/s). Aborde TRIM, wear leveling e TBW.",
    details: [
      "HDD: mecânico, 80-160 MB/s, mais barato por GB",
      "SSD SATA: sem partes móveis, até 550 MB/s",
      "SSD NVMe: usa PCIe, até 7000+ MB/s",
      "Fator de forma: 2.5\", M.2 2280",
      "TBW: Total Bytes Written (vida útil do SSD)",
    ],
  },
  {
    icon: Fan,
    title: "Coolers e Refrigeração",
    studentDesc: "Mantém o processador frio para não superaquecer.",
    teacherDesc: "Thermal Design Power (TDP), diferença entre air cooler e AIO liquid. Demonstre pasta térmica e instalação.",
    details: [
      "Air Cooler: dissipador de alumínio/cobre + ventoinha",
      "AIO Liquid: radiador com líquido refrigerante",
      "Pasta térmica: melhora condução entre CPU e cooler",
      "TDP: indica dissipação de calor necessária (ex: 65W, 125W)",
      "Fluxo de ar: positivo (mais entrada) vs negativo (mais saída)",
    ],
  },
  {
    icon: Zap,
    title: "Fonte de Alimentação (PSU)",
    studentDesc: "Transforma a energia da tomada para alimentar todos os componentes.",
    teacherDesc: "Aborde certificação 80 Plus, rails 12V, eficiência e cálculo de potência para montagens.",
    details: [
      "80 Plus: White, Bronze, Silver, Gold, Platinum, Titanium",
      "Modular vs Semi-modular vs Não-modular",
      "Rail 12V: principal alimentação da GPU e CPU",
      "Potências comuns: 450W, 550W, 650W, 750W, 850W+",
      "PFC Ativo: maior eficiência e fator de potência",
    ],
  },
  {
    icon: CircuitBoard,
    title: "Placa-Mãe",
    studentDesc: "A 'base' que conecta todos os componentes do computador.",
    teacherDesc: "Chipset, VRM, slots de expansão e compatibilidade de soquetes. Aborde ATX vs Micro-ATX vs Mini-ITX.",
    details: [
      "Soquete: deve ser compatível com o processador",
      "Chipset: controla comunicação entre componentes",
      "VRM: regula voltagem para o processador",
      "Slots PCIe: x1, x4, x8, x16 para expansão",
      "Headers: USB, áudio, RGB, ventoinhas",
    ],
  },
  {
    icon: Microchip,
    title: "Placa de Vídeo (GPU)",
    studentDesc: "Responsável pelos gráficos, jogos e edição de vídeo.",
    teacherDesc: "Shader cores, VRAM GDDR6/GDDR6X, CUDA vs OpenCL. Compare modelos para diferentes workloads.",
    details: [
      "VRAM: 4GB, 8GB, 12GB, 16GB+ (GDDR6/GDDR6X)",
      "Clock: Base e Boost clock em MHz",
      "TDP: consumo de energia (ex: 150W-450W)",
      "NVIDIA: CUDA cores | AMD: Stream processors",
      "Ray Tracing: iluminação realista em jogos",
    ],
  },
  {
    icon: Server,
    title: "PCIe e Barramentos",
    studentDesc: "As 'estradas' que transportam dados entre os componentes.",
    teacherDesc: "PCIe Gen 3 vs 4 vs 5: largura de banda por lane. Explique topologia e configurações x1-x16.",
    details: [
      "PCIe 3.0: ~1 GB/s por lane",
      "PCIe 4.0: ~2 GB/s por lane",
      "PCIe 5.0: ~4 GB/s por lane",
      "x16: usado para GPUs (16 lanes)",
      "x4: usado para SSDs NVMe (4 lanes)",
    ],
  },
];

export default function Hardware() {
  const { isProfessor } = useAuth();

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
            {isProfessor
              ? "Conteúdo técnico avançado para uso em laboratório e sala de aula."
              : "Conheça cada peça que faz o computador funcionar!"}
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
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg gradient-neon">
                  <topic.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  {topic.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {isProfessor ? topic.teacherDesc : topic.studentDesc}
              </p>
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
