import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, UserCircle, Instagram, Mail } from "lucide-react";
import gustavoImg from "@/assets/gustavo.jpg";
import maxImg from "@/assets/max.jpg";
import harryImg from "@/assets/harry.jpg";
import joseImg from "@/assets/jose.jpg";
import ricardoAsset from "@/assets/ricardo.png.asset.json";
import williamAsset from "@/assets/william.jpg.asset.json";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const orientationTeam = [
  {
    name: "Ricardo Wellington Ribeiro Brandão Teles",
    role: "Professor Orientador",
    initials: "RT",
    photo: ricardoAsset.url,
  },
  {
    name: "Willian Marques dos Santos",
    role: "Supervisor",
    initials: "WM",
    photo: williamAsset.url,
  },
];


/**
 * Dados da equipe — edite apenas aqui (foto, Instagram e e-mail).
 * Deixe `instagram` ou `email` como undefined para não exibir o item no card.
 */
interface Developer {
  name: string;
  initials: string;
  photo?: string;
  instagram?: string;
  email?: string;
}

const developers: Developer[] = [
  {
    name: "Gustavo",
    initials: "GU",
    photo: gustavoImg,
    instagram: "@gustavo.almeida.ofc",
    email: "gustavoalmeidainformatica2025@gmail.com",
  },
  {
    name: "Harry",
    initials: "HA",
    photo: harryImg,
    instagram: "@harry_potter_457557",
  },
  {
    name: "José Antônio",
    initials: "JA",
    photo: joseImg,
    instagram: "@joseantoniofilho365",
  },
  {
    name: "Max",
    initials: "MA",
    photo: maxImg,
    instagram: "@max_silveira_2023",
    email: "maxsilveira248@gmail.com",
  },
];


export default function About() {
  return (
    <div className="min-h-screen pt-16 pb-12">
      <Seo
        title="Sobre o Projeto — Projeta Aula"
        description="Conheça a orientação, o objetivo e a equipe por trás do Projeta Aula, uma ferramenta educacional de informática básica para alunos do CETEP."
        path="/sobre"
      />

      {/* Hero */}
      <section className="container py-16 md:py-24 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 bg-primary/8 border border-primary/15 text-primary text-xs font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            Trabalho de Conclusão de Curso
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight">
            <span className="gradient-warm-text">Sobre</span>{" "}
            <span className="text-foreground">o Projeto</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Conheça a orientação acadêmica, a proposta e a equipe de desenvolvedores do Projeta Aula.
          </p>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      </section>

      {/* Orientation cards */}
      <section className="container -mt-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {orientationTeam.map((person, i) => (
            <motion.div
              key={person.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass p-6 flex flex-col items-center text-center"
            >
              <Avatar className="w-24 h-24 mb-4 border-2 border-primary/20">
                {person.photo && (
                  <AvatarImage src={person.photo} alt={`Foto de ${person.name}`} className="object-cover" />
                )}
                <AvatarFallback className="bg-secondary text-primary text-2xl font-display font-bold">
                  <UserCircle className="w-10 h-10" />
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                {person.role}
              </span>
              <h2 className="font-display text-sm md:text-base font-bold text-foreground leading-snug">
                {person.name}
              </h2>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project presentation */}
      <section className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 md:p-10 max-w-3xl mx-auto space-y-6"
        >
          <p className="text-sm md:text-base text-foreground leading-relaxed">
            Este projeto foi criado por Gustavo, Harry, José Antônio e Max e tem como finalidade orientar pessoas que estudam na área de informática. O site, chamado Projeta Aula, foi desenvolvido como uma ferramenta educacional voltada para alunos do CETEP que desejam aprender ou revisar os conceitos fundamentais da informática básica de forma clara, organizada e acessível.
          </p>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">Objetivo do site</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              O propósito central do Projeta Aula é democratizar o acesso ao conhecimento em informática, reunindo em um só lugar os principais conteúdos que costumam ser trabalhados em aulas introdutórias sobre computação. Em vez de depender apenas de explicações em sala de aula ou de materiais dispersos, os estudantes contam com uma plataforma única onde podem estudar no seu próprio ritmo, revisitar os conteúdos quantas vezes forem necessárias e testar seus conhecimentos de maneira prática.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">Conteúdo sobre Hardware</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Uma das seções do site é dedicada ao hardware, ou seja, à parte física do computador. Aqui, o aluno encontra explicações sobre os componentes que compõem uma máquina, como processador, memória, placa-mãe, dispositivos de entrada e saída, entre outros elementos essenciais para o funcionamento de um computador. O objetivo dessa parte é fazer com que o estudante compreenda como as peças físicas trabalham juntas para que o computador execute suas funções.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">Conteúdo sobre Software</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Outra seção trata do software, isto é, os programas e sistemas que "dão vida" ao hardware. Nessa parte, são explicados conceitos como sistemas operacionais, aplicativos e a diferença entre os diversos tipos de programas existentes. A intenção é mostrar como o software interage com o hardware para que o usuário consiga realizar tarefas no dia a dia, desde as mais simples até as mais complexas.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">História dos Computadores</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              O site também apresenta uma seção sobre a história dos computadores, contando como a tecnologia evoluiu ao longo das décadas — desde as primeiras máquinas de grande porte até os computadores pessoais e dispositivos modernos que usamos atualmente. Essa parte tem um papel importante para que o estudante entenda o contexto histórico por trás da tecnologia, percebendo como cada avanço contribuiu para o cenário digital atual.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">Quiz Interativo</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Por fim, o site conta com um quiz interativo, pensado para tornar o aprendizado mais dinâmico e envolvente. Depois de estudar os conteúdos de hardware, software e história, o aluno pode testar o que aprendeu respondendo a perguntas relacionadas aos temas abordados. Essa ferramenta ajuda a fixar o conhecimento e permite que o próprio estudante identifique quais pontos ainda precisa reforçar.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">Considerações finais</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              De forma geral, o Projeta Aula funciona como um verdadeiro guia de estudos para quem está começando na área de informática. Combinando teoria e prática por meio do quiz, o site cumpre bem seu papel de orientar e apoiar o aprendizado dos alunos do CETEP, tornando o processo de estudo mais acessível, interativo e organizado.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Developers */}
      <section className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Equipe de Desenvolvedores
          </h2>
          <p className="text-sm text-muted-foreground">
            Os responsáveis pela criação do Projeta Aula
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
          {developers.map((dev, i) => (
            <motion.div
              key={dev.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass p-6 flex flex-col items-center text-center"
            >
              <Avatar className="w-20 h-20 mb-4 border-2 border-primary/20">
                {dev.photo && <AvatarImage src={dev.photo} alt={`Foto de ${dev.name}`} className="object-cover" />}
                <AvatarFallback className="bg-secondary text-primary text-xl font-display font-bold">
                  {dev.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-display text-sm font-bold text-foreground">{dev.name}</h3>
              <div className="mt-3 space-y-1.5 w-full">
                {dev.instagram && (
                  <a
                    href={`https://www.instagram.com/${dev.instagram.replace("@", "")}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    <Instagram className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{dev.instagram}</span>
                  </a>
                )}
                {dev.email && (
                  <a
                    href={`mailto:${dev.email}`}
                    className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{dev.email}</span>
                  </a>
                )}
              </div>

            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
