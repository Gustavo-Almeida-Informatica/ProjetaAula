import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Cpu, Monitor, Image, Brain, Users, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import gustavoImg from "@/assets/gustavo.jpg";
import maxImg from "@/assets/max.jpg";
import harryImg from "@/assets/harry.jpg";
import joseImg from "@/assets/jose.jpg";

const teamMembers = [
  {
    name: "Gustavo Almeida",
    role: "Desenvolvedor",
    email: "gustavoalmeidainformatica2025@gmail.com",
    insta: "@gustavo.almeida.ofc",
    photo: gustavoImg,
  },
  {
    name: "Max Silveira",
    role: "Desenvolvedor",
    email: "maxsilveira248@gmail.com",
    insta: "@max_silveira_2023",
    photo: maxImg,
  },
  {
    name: "Harry Anderson",
    role: "Desenvolvedor",
    insta: "@harry_potter_457557",
    photo: harryImg,
  },
  {
    name: "José Antônio",
    role: "Desenvolvedor",
    photo: joseImg,
  },
];

const features = [
  { icon: Cpu, label: "Hardware", desc: "Conheça as peças do computador", to: "/hardware", color: "from-blue-500 to-cyan-400" },
  { icon: Monitor, label: "Software", desc: "Windows, programas e dicas úteis", to: "/software", color: "from-cyan-400 to-teal-400" },
  { icon: Image, label: "Conectores", desc: "Cabos de vídeo e internet", to: "/galeria", color: "from-teal-400 to-emerald-400" },
  { icon: Brain, label: "Quiz", desc: "Teste o que você aprendeu", to: "/quiz", color: "from-violet-500 to-blue-500" },
  { icon: Users, label: "Comunidade", desc: "Tire dúvidas com outros alunos", to: "/comunidade", color: "from-pink-500 to-violet-500" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Index() {
  const { profile } = useAuth();
  const greeting = profile?.role === "professor"
    ? "Bem-vindo, Professor! Explore materiais para usar em sala de aula."
    : "Bem-vindo! Aprenda informática de um jeito fácil e divertido.";

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero */}
      <section className="container py-16 md:py-24 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Conteúdo de Informática do CETEP</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="gradient-neon-text">Projeta Aula</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            {greeting}
          </p>
          <p className="mt-2 text-muted-foreground/70 max-w-md mx-auto text-xs">
            Reforce seu conhecimento em informática básica no CETEP
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/hardware"
              className="px-6 py-3 rounded-lg gradient-neon text-primary-foreground font-semibold text-sm neon-glow inline-flex items-center gap-2"
            >
              Começar a Aprender <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/quiz"
              className="px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
            >
              Fazer o Quiz
            </Link>
          </div>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      </section>

      {/* Features Grid */}
      <section className="container py-12">
        <h2 className="font-display text-2xl font-bold text-center mb-8 neon-text text-primary">
          O que você vai aprender
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                to={f.to}
                className="glass p-6 flex items-start gap-4 group hover:border-primary/30 transition-all block"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-br ${f.color} shrink-0`}>
                  <f.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {f.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container py-16">
        <h2 className="font-display text-2xl font-bold text-center mb-2 neon-text text-primary">
          Nossa Equipe
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">
          Os criadores do Projeta Aula
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass p-6 text-center group hover:border-primary/30 transition-all"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/30 neon-glow flex items-center justify-center bg-secondary">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    👨‍💻
                  </div>
                )}
              </div>
              <h3 className="font-display text-sm font-bold text-foreground">{member.name}</h3>
              <p className="text-xs text-primary mt-1">{member.role}</p>
              <div className="mt-3 space-y-1">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-3 h-3" /> E-mail
                  </a>
                )}
                {member.insta && (
                  <a href={`https://instagram.com/${member.insta.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="w-3 h-3" /> {member.insta}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 Projeta Aula — CETEP. Desenvolvido por Gustavo, Max, Harry e José.
        </p>
      </footer>
    </div>
  );
}
