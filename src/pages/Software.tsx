import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";
import {
  Monitor, Download, Settings, Code, Shield,
} from "lucide-react";

const tabs = [
  { id: "windows", label: "Windows", icon: Monitor },
  { id: "programas", label: "Programas Úteis", icon: Download },
  { id: "drivers", label: "Drivers e BIOS", icon: Settings },
  { id: "logica", label: "Lógica Básica", icon: Code },
  { id: "seguranca", label: "Segurança", icon: Shield },
];

interface ContentSection {
  title: string;
  desc: string;
  items: string[];
}

const content: Record<string, ContentSection[]> = {
  windows: [
    {
      title: "O que é o Windows?",
      desc: "O Windows é o sistema operacional (programa principal) que faz o computador funcionar. Ele gerencia tudo: programas, arquivos e as peças do PC.",
      items: [
        "É o sistema mais usado no mundo",
        "Versões mais comuns: Windows 10 e Windows 11",
        "Sem ele, o computador não faz nada",
        "Ele gerencia tudo: teclado, mouse, tela, programas",
      ],
    },
    {
      title: "Área de Trabalho e Barra de Tarefas",
      desc: "A área de trabalho é a tela principal que aparece quando o PC liga. A barra de tarefas fica embaixo e mostra os programas abertos.",
      items: [
        "Área de trabalho: onde ficam os ícones dos programas",
        "Barra de tarefas: mostra o que está aberto e acesso rápido",
        "Menu Iniciar: clique para ver todos os programas",
        "Atalhos úteis: Win+E (pastas), Alt+Tab (trocar janela)",
      ],
    },
    {
      title: "Organizando Arquivos e Pastas",
      desc: "O Explorador de Arquivos (Win+E) permite criar pastas, mover e organizar seus arquivos como documentos, fotos e downloads.",
      items: [
        "Crie pastas para organizar: Documentos, Fotos, Trabalhos",
        "Ctrl+C copia, Ctrl+X recorta, Ctrl+V cola",
        "Clique direito no arquivo para ver opções (renomear, excluir)",
        "Use a barra de pesquisa para encontrar arquivos rapidamente",
      ],
    },
    {
      title: "Gerenciador de Tarefas",
      desc: "Ferramenta que mostra todos os programas abertos e o quanto de CPU, RAM e disco estão sendo usados.",
      items: [
        "Abra com Ctrl+Shift+Esc",
        "Serve para fechar programas travados",
        "Mostra quanto de CPU e RAM cada programa usa",
        "Aba 'Inicializar' controla o que abre junto com o Windows",
      ],
    },
  ],
  programas: [
    {
      title: "Google Chrome",
      desc: "O navegador mais usado para acessar sites e fazer pesquisas na internet.",
      items: [
        "Baixe em: google.com/chrome",
        "Ctrl+T abre uma nova aba",
        "Ctrl+W fecha a aba atual",
        "Você pode salvar sites favoritos para acessar depois",
      ],
    },
    {
      title: "Pacote Office (Word, Excel, PowerPoint)",
      desc: "Conjunto de programas para criar textos, planilhas e apresentações.",
      items: [
        "Word: para escrever textos e trabalhos",
        "Excel: para fazer planilhas e cálculos",
        "PowerPoint: para fazer apresentações com slides",
        "Alternativa gratuita: LibreOffice faz a mesma coisa",
      ],
    },
    {
      title: "WinRAR",
      desc: "Programa para compactar (diminuir o tamanho) e descompactar arquivos.",
      items: [
        "Abre arquivos ZIP e RAR",
        "Útil para enviar vários arquivos de uma vez por e-mail",
        "Clique direito > 'Extrair aqui' para descompactar",
      ],
    },
    {
      title: "VLC Media Player",
      desc: "Reprodutor de vídeo e música gratuito que abre praticamente qualquer formato.",
      items: [
        "Abre vídeos MP4, AVI, MKV e muito mais",
        "Gratuito e não tem propaganda",
        "Pode colocar legendas nos vídeos",
      ],
    },
    {
      title: "WhatsApp no Computador",
      desc: "Use o WhatsApp pelo computador para digitar mais rápido e ver fotos em tela grande.",
      items: [
        "Baixe na Microsoft Store ou acesse web.whatsapp.com",
        "Sincroniza com seu celular automaticamente",
        "Mais fácil de digitar textos longos",
      ],
    },
    {
      title: "Windows Defender",
      desc: "Antivírus que já vem instalado no Windows. Protege contra vírus e ameaças automaticamente.",
      items: [
        "Já vem ativado no Windows 10 e 11",
        "Faz verificações em tempo real",
        "Atualiza automaticamente com o Windows Update",
        "Para uso doméstico, é suficiente — não precisa instalar outro antivírus",
      ],
    },
  ],
  drivers: [
    {
      title: "O que são Drivers?",
      desc: "Drivers são programas que fazem o Windows 'conversar' com as peças do computador. Sem eles, o PC não reconhece impressora, placa de vídeo, etc.",
      items: [
        "O Windows instala os drivers mais comuns sozinho",
        "Se algo não funcionar, pode ser driver faltando",
        "Exemplos: driver de vídeo, áudio, impressora, Wi-Fi",
        "Gerenciador de Dispositivos mostra se tem algo com problema",
      ],
    },
    {
      title: "O que é o BIOS/UEFI?",
      desc: "É o primeiro programa que aparece quando você liga o PC, antes mesmo do Windows carregar. Ele testa se tudo está funcionando.",
      items: [
        "Para acessar: aperte Del, F2 ou F12 ao ligar o PC",
        "Mostra informações sobre hardware instalado",
        "Permite escolher de onde o PC inicia (HD, pendrive, DVD)",
        "Normalmente você não precisa mexer no BIOS",
        "POST (Power-On Self Test): teste automático que o BIOS faz ao ligar para verificar se as peças estão OK",
      ],
    },
  ],
  logica: [
    {
      title: "O que é um Algoritmo?",
      desc: "Algoritmo é uma 'receita' — uma lista de passos organizados para resolver um problema. A receita de um bolo é um algoritmo!",
      items: [
        "Sequência de passos: faça isso, depois aquilo",
        "Exemplo: acordar → escovar dentes → tomar café",
        "Na programação, o computador segue esses passos",
        "É a base de todo programa e aplicativo",
      ],
    },
    {
      title: "Variáveis",
      desc: "Variáveis são como 'caixinhas' que guardam informações no programa. Cada caixa tem um nome e guarda um valor.",
      items: [
        "Exemplo: nome = \"Maria\" (guarda um texto)",
        "Exemplo: idade = 25 (guarda um número)",
        "Você pode mudar o valor a qualquer momento",
        "Use nomes que fazem sentido: 'nota', 'total', 'nome'",
      ],
    },
    {
      title: "Condições (SE / SENÃO)",
      desc: "O programa toma decisões: SE acontecer isso, faça aquilo. SENÃO, faça outra coisa.",
      items: [
        "SE (nota >= 7) ENTÃO 'Aprovado'",
        "SENÃO 'Reprovado'",
        "É como uma bifurcação na estrada",
        "O computador escolhe o caminho baseado na condição",
      ],
    },
    {
      title: "Repetição (Loops)",
      desc: "Loops fazem o computador repetir uma ação várias vezes sem você precisar escrever tudo de novo.",
      items: [
        "PARA i de 1 até 10: escreva i (conta de 1 a 10)",
        "ENQUANTO houver alunos: chame o próximo",
        "Útil para processar listas e dados grandes",
        "Cuidado: se a condição nunca parar, o loop é infinito!",
      ],
    },
  ],
  seguranca: [
    {
      title: "Dicas de Segurança no Computador",
      desc: "Proteja seus dados e seu computador com essas dicas simples que todo mundo deveria seguir.",
      items: [
        "Crie senhas fortes: misture letras, números e símbolos (mínimo 12 caracteres)",
        "Nunca use a mesma senha em todos os sites",
        "Não clique em links suspeitos (pode ser golpe/phishing)",
        "Mantenha o Windows e o antivírus sempre atualizados",
        "Faça backup dos seus arquivos importantes (pendrive, HD externo ou nuvem)",
        "Cuidado com Wi-Fi público (shoppings, cafés) — hackers podem espionar seus dados",
      ],
    },
    {
      title: "O que é Phishing?",
      desc: "Phishing é quando alguém tenta enganar você com e-mails ou sites falsos para roubar seus dados.",
      items: [
        "Exemplo: e-mail dizendo 'Seu banco precisa que confirme sua senha'",
        "Nunca clique em links de e-mails suspeitos",
        "Verifique sempre o endereço do site (URL) antes de digitar senhas",
        "Bancos e empresas nunca pedem senhas por e-mail",
      ],
    },
  ],
};

export default function Software() {
  const [activeTab, setActiveTab] = useState("windows");

  return (
    <div className="min-h-screen pt-16 pb-12">
      <ScrollToTop />
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-warm-text">Software</h1>
          <p className="text-muted-foreground text-sm mt-3">
            Aprenda sobre o Windows, programas úteis e segurança digital
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "gradient-warm text-primary-foreground warm-glow-sm"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {content[activeTab]?.map((section) => (
            <div key={section.title} className="glass p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{section.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{section.desc}</p>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="text-xs text-foreground/80 flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
