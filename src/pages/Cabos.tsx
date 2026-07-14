import { motion } from "framer-motion";
import { Cable, Zap, Monitor, HardDrive, Network, Usb, Volume2, Info } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { Seo } from "@/components/Seo";

interface CableInfo {
  name: string;
  category: "energia" | "video" | "dados" | "rede" | "audio";
  icon: typeof Cable;
  description: string;
  uses: string[];
  speed?: string;
  tips: string;
}

const CABLES: CableInfo[] = [
  {
    name: "Cabo de Força (Tripolar)",
    category: "energia",
    icon: Zap,
    description:
      "Cabo padrão que leva energia da tomada até o computador, monitor ou impressora. No Brasil segue o padrão NBR 14136 (três pinos).",
    uses: ["Alimentar o gabinete (fonte)", "Ligar monitores", "Impressoras e estabilizadores"],
    tips: "O terceiro pino (redondo, no meio) é o aterramento — nunca corte ou remova, ele protege contra choques.",
  },
  {
    name: "HDMI",
    category: "video",
    icon: Monitor,
    description:
      "Transmite vídeo em alta definição e áudio digital pelo mesmo cabo. É o conector mais comum em monitores e TVs modernas.",
    uses: ["Ligar PC ao monitor/TV", "Videogames", "Notebooks a projetores"],
    speed: "Até 48 Gbps (HDMI 2.1) — suporta 4K e 8K",
    tips: "Se aparecer 'sem sinal', teste outra porta HDMI do monitor — algumas TVs têm entradas com versões diferentes.",
  },
  {
    name: "DisplayPort",
    category: "video",
    icon: Monitor,
    description:
      "Alternativa ao HDMI, muito usada em monitores gamer e profissionais. Também transmite vídeo e áudio digital.",
    uses: ["Monitores de alta taxa de atualização", "Múltiplos monitores em cadeia"],
    speed: "Até 80 Gbps (DP 2.1) — ideal para 4K a 240 Hz",
    tips: "Ao desligar o PC, alguns monitores DisplayPort 'esquecem' a conexão. Se acontecer, reencaixe o cabo.",
  },
  {
    name: "VGA (D-Sub 15)",
    category: "video",
    icon: Monitor,
    description:
      "Cabo analógico antigo com 15 pinos. Ainda aparece em projetores e monitores mais velhos.",
    uses: ["Monitores antigos", "Projetores em escolas"],
    tips: "Não transmite áudio e pode dar imagem desfocada em resoluções altas. Prefira HDMI quando houver.",
  },
  {
    name: "DVI",
    category: "video",
    icon: Monitor,
    description:
      "Intermediário entre VGA e HDMI. Foi bastante usado em desktops antigos para monitores digitais.",
    uses: ["Placas de vídeo antigas", "Adaptadores DVI→HDMI"],
    tips: "Existe em duas versões: DVI-D (só digital) e DVI-I (digital + analógico).",
  },
  {
    name: "USB-A / USB-B / USB-C",
    category: "dados",
    icon: Usb,
    description:
      "Cabo universal para dados e energia. USB-A é o retangular clássico; USB-B é quadrado (impressoras); USB-C é o novo padrão reversível.",
    uses: ["Pendrives e HDs externos", "Carregar celular", "Periféricos: mouse, teclado, webcam"],
    speed: "USB 2.0: 480 Mbps · USB 3.0: 5 Gbps · USB4: até 40 Gbps",
    tips: "USB-C pode entregar até 240 W de energia — mas nem todo cabo suporta, verifique a especificação.",
  },
  {
    name: "SATA",
    category: "dados",
    icon: HardDrive,
    description:
      "Cabo interno do gabinete que liga o HD ou SSD à placa-mãe. Fino, geralmente vermelho ou preto.",
    uses: ["Conectar HDs e SSDs 2.5\"/3.5\"", "Leitores de DVD/Blu-ray"],
    speed: "SATA III: até 600 MB/s",
    tips: "SSDs NVMe modernos não usam SATA — vão direto no slot M.2 da placa-mãe.",
  },
  {
    name: "Ethernet (RJ45)",
    category: "rede",
    icon: Network,
    description:
      "Cabo de rede que liga computador ao roteador. Mais estável e rápido que Wi-Fi para jogos, videochamadas e downloads grandes.",
    uses: ["Internet cabeada", "Redes de laboratório", "Câmeras IP"],
    speed: "Cat 5e: 1 Gbps · Cat 6: 10 Gbps · Cat 6a/7: 10 Gbps+ com blindagem",
    tips: "Se o LED da placa de rede não acende ao plugar, o cabo pode estar rompido — teste em outra porta.",
  },
  {
    name: "P2 / Áudio 3,5mm",
    category: "audio",
    icon: Volume2,
    description:
      "Plug de áudio analógico redondo, usado em fones de ouvido, caixinhas de som e microfones.",
    uses: ["Fones", "Caixas de som", "Microfones de PC"],
    tips: "Verde = saída de áudio (som); Rosa = entrada de microfone; Azul = entrada de linha.",
  },
];

const CATEGORY_LABELS: Record<CableInfo["category"], { label: string; color: string }> = {
  energia: { label: "Energia", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" },
  video: { label: "Vídeo", color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
  dados: { label: "Dados", color: "text-primary border-primary/30 bg-primary/10" },
  rede: { label: "Rede", color: "text-green-400 border-green-400/30 bg-green-400/10" },
  audio: { label: "Áudio", color: "text-pink-400 border-pink-400/30 bg-pink-400/10" },
};

export default function Cabos() {
  return (
    <div className="min-h-screen pt-16 pb-12">
      <Seo
        title="Cabos de Informática — Tipos, Usos e Diferenças | Projeta Aula"
        description="Guia completo sobre cabos do computador: força, HDMI, DisplayPort, USB, SATA, Ethernet e áudio. Entenda tipos, utilidades e diferenças técnicas."
        path="/cabos"
      />
      <ScrollToTop />
      <div className="container py-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            <Cable className="w-3.5 h-3.5" /> Guia de Cabos
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-warm-text">
            Cabos e Conexões
          </h1>
          <p className="text-muted-foreground text-sm mt-3 max-w-2xl mx-auto">
            Descubra os principais cabos usados em computadores: para que servem, suas diferenças técnicas
            e dicas práticas para identificar cada um.
          </p>
        </motion.div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {Object.entries(CATEGORY_LABELS).map(([key, cat]) => (
            <span
              key={key}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${cat.color}`}
            >
              {cat.label}
            </span>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CABLES.map((cable, i) => {
            const cat = CATEGORY_LABELS[cable.category];
            const Icon = cable.icon;
            return (
              <motion.article
                key={cable.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass p-5 hover:border-primary/25 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-warm flex items-center justify-center shrink-0 warm-glow-sm">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="font-display text-base font-bold text-foreground leading-tight">
                      {cable.name}
                    </h2>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cat.color}`}
                  >
                    {cat.label}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {cable.description}
                </p>

                <div className="mb-3">
                  <h3 className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-1.5">
                    Onde é usado
                  </h3>
                  <ul className="space-y-1">
                    {cable.uses.map((u) => (
                      <li key={u} className="text-xs text-foreground/80 flex gap-2">
                        <span className="text-primary shrink-0">›</span> {u}
                      </li>
                    ))}
                  </ul>
                </div>

                {cable.speed && (
                  <div className="mb-3 flex items-center gap-2 text-[11px] bg-secondary/60 rounded-md px-2.5 py-1.5">
                    <Zap className="w-3 h-3 text-primary shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="text-foreground font-medium">Velocidade:</span> {cable.speed}
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-3 border-t border-border/40">
                  <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Dica:</span> {cable.tips}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Comparison strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 mt-10"
        >
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            Como escolher o cabo certo?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <h3 className="text-primary font-semibold mb-1">1. Identifique a porta</h3>
              <p className="text-muted-foreground">
                Olhe primeiro qual tipo de conector existe no seu equipamento (formato do encaixe).
              </p>
            </div>
            <div>
              <h3 className="text-primary font-semibold mb-1">2. Verifique a versão</h3>
              <p className="text-muted-foreground">
                HDMI 2.1, USB 3.2, Cat 6… a versão define velocidade e resolução suportadas.
              </p>
            </div>
            <div>
              <h3 className="text-primary font-semibold mb-1">3. Qualidade importa</h3>
              <p className="text-muted-foreground">
                Cabos muito baratos podem falhar em resoluções altas ou perder sinal com o tempo.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
