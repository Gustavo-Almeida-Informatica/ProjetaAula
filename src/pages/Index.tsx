import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Cpu, Monitor, Image, Brain, Users, BookOpen, ChevronRight, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { useMemo, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { searchAll } from "@/lib/searchIndex";
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
  { icon: BookOpen, label: "História", desc: "A evolução dos computadores", to: "/historia" },
  { icon: Cpu, label: "Hardware", desc: "Conheça as peças do computador", to: "/hardware" },
  { icon: Monitor, label: "Software", desc: "Windows, programas e dicas úteis", to: "/software" },
  { icon: Image, label: "Conectores", desc: "Cabos de vídeo e internet", to: "/galeria" },
  { icon: Brain, label: "Quiz", desc: "Teste o que você aprendeu", to: "/quiz" },
  { icon: Users, label: "Comunidade", desc: "Tire dúvidas com outros alunos", to: "/comunidade" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function Index() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const results = useMemo(() => searchAll(searchQuery), [searchQuery]);
  const isSearching = searchQuery.trim().length > 0;
  const greeting = profile?.role === "professor"
    ? "Bem-vindo, Professor! Explore materiais para usar em sala de aula."
    : "Bem-vindo! Aprenda informática de um jeito fácil e divertido.";

  return (
    <div className="min-h-screen pt-16 pb-12">
      {/* Hero */}
      <section className="container py-20 md:py-32 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 bg-primary/8 border border-primary/15 text-primary text-xs font-medium">
            Conteúdo de Informática do CETEP
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
            <span className="gradient-warm-text">Projeta</span>
            <br />
            <span className="text-foreground">Aula</span>
          </h1>
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            {greeting}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/hardware"
              className="px-7 py-3.5 rounded-xl gradient-warm text-primary-foreground font-semibold text-sm warm-glow-sm inline-flex items-center gap-2 transition-transform hover:scale-[1.02]"
            >
              Começar a Aprender <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/quiz"
              className="px-7 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
            >
              Fazer o Quiz
            </Link>
          </div>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      </section>

      {/* Global Search */}
      <section className="container -mt-8 md:-mt-12 mb-8 relative z-10">
        <SearchBar
          placeholder="Pesquise por Hardware ou Software (ex: SSD, Discord...)"
          onSearch={setSearchQuery}
          value={searchQuery}
        />
      </section>

      {/* Features Grid OR Search Results */}
      <section className="container py-8">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
                <h2 className="font-display text-base md:text-lg font-bold text-foreground">
                  {results.length} resultado{results.length === 1 ? "" : "s"} para "{searchQuery}"
                </h2>
              </div>
              {results.length === 0 ? (
                <div className="glass p-8 text-center rounded-xl max-w-3xl mx-auto">
                  <p className="text-muted-foreground text-sm">
                    Nenhum resultado encontrado em Hardware, Software, História ou Conectores. Tente outro termo!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                  {results.map((r, i) => (
                    <motion.button
                      key={`${r.category}-${r.title}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => {
                        setSearchQuery("");
                        navigate(r.route);
                      }}
                      className="glass p-4 text-left group hover:border-primary/30 transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${r.badgeClass}`}>
                          {r.category}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {r.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{r.desc}</p>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="font-display text-xl md:text-2xl font-bold text-center mb-10 text-foreground">
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
                      className="glass p-6 flex items-start gap-4 group hover:border-primary/20 transition-all block"
                    >
                      <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                        <f.icon className="w-5 h-5 text-primary" />
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
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Team */}
      <section className="container py-20">
        <h2 className="font-display text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
          Nossa Equipe
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-12">
          Os criadores do Projeta Aula
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass p-6 text-center group hover:border-primary/20 transition-all"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border border-primary/20 flex items-center justify-center bg-secondary">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">👨‍💻</div>
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
      <footer className="container py-8 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 Projeta Aula — CETEP. Desenvolvido por Gustavo, Max, Harry e José.
        </p>
      </footer>
    </div>
  );
}
