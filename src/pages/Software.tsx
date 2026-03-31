import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";
import {
  Monitor, Download, Settings, Code, Shield,
} from "lucide-react";

const tabs = [
  { id: "windows", label: "Windows 10/11", icon: Monitor },
  { id: "programas", label: "Programas Essenciais", icon: Download },
  { id: "drivers", label: "Drivers & BIOS", icon: Settings },
  { id: "logica", label: "Lógica de Programação", icon: Code },
  { id: "seguranca", label: "Segurança", icon: Shield },
];

interface ContentSection {
  title: string;
  studentDesc: string;
  teacherDesc: string;
  items: string[];
}

const content: Record<string, ContentSection[]> = {
  windows: [
    {
      title: "Instalação do Windows",
      studentDesc: "Como instalar o Windows 10 ou 11 no seu PC passo a passo.",
      teacherDesc: "Processo de instalação via USB bootável, particionamento GPT/MBR e chaves de ativação em ambiente educacional.",
      items: [
        "Criar pendrive bootável com Rufus ou Media Creation Tool",
        "Configurar boot pela BIOS/UEFI (prioridade USB)",
        "Escolher edição: Home, Pro ou Education",
        "Particionamento: GPT para UEFI, MBR para Legacy",
        "Configuração OOBE: conta local vs conta Microsoft",
        "Windows Update: instalar atualizações após instalação",
      ],
    },
    {
      title: "Interface e Configurações",
      studentDesc: "Conheça a área de trabalho, barra de tarefas e configurações do Windows.",
      teacherDesc: "Personalizações avançadas: Group Policy, registro, gerenciamento de energia e contas de usuário para laboratório.",
      items: [
        "Barra de Tarefas: fixar apps, área de notificação",
        "Menu Iniciar: organizar atalhos e tiles",
        "Configurações vs Painel de Controle",
        "Gerenciador de Tarefas (Ctrl+Shift+Esc)",
        "Explorador de Arquivos: navegação e atalhos",
        "Atalhos essenciais: Win+E, Win+I, Win+D, Alt+Tab",
      ],
    },
  ],
  programas: [
    {
      title: "Navegador - Google Chrome",
      studentDesc: "O navegador mais usado do mundo para acessar sites.",
      teacherDesc: "Gerenciamento de extensões, perfis de navegação e configurações de proxy para laboratórios.",
      items: ["Download: google.com/chrome", "Extensões: AdBlock, Google Tradutor", "Atalhos: Ctrl+T (nova aba), Ctrl+W (fechar)"],
    },
    {
      title: "Pacote Office (Word, Excel, PowerPoint)",
      studentDesc: "Para criar documentos, planilhas e apresentações.",
      teacherDesc: "Licenciamento educacional, alternativas gratuitas (LibreOffice) e configuração em rede.",
      items: ["Word: documentos de texto", "Excel: planilhas e cálculos", "PowerPoint: apresentações", "Alternativa gratuita: LibreOffice"],
    },
    {
      title: "WinRAR",
      studentDesc: "Compacta e descompacta arquivos ZIP e RAR.",
      teacherDesc: "Compactação com senha, formatos suportados e integração ao Explorer.",
      items: ["Formatos: ZIP, RAR, 7Z, TAR", "Compactação com senha", "Integração ao menu de contexto"],
    },
    {
      title: "VLC Media Player",
      studentDesc: "Reproduz qualquer tipo de vídeo e áudio gratuitamente.",
      teacherDesc: "Codecs integrados, streaming de rede e conversão de formatos.",
      items: ["Reproduz quase todos os formatos", "Gratuito e código aberto", "Funções avançadas: legendas, filtros"],
    },
    {
      title: "Antivírus - Avast / Windows Defender",
      studentDesc: "Protege seu computador contra vírus e malwares.",
      teacherDesc: "Compare soluções gratuitas vs pagas. Windows Defender é suficiente para uso básico com boas práticas.",
      items: ["Windows Defender: integrado ao Windows", "Avast Free: proteção adicional", "Verificação periódica é essencial"],
    },
    {
      title: "WhatsApp Desktop",
      studentDesc: "Use o WhatsApp diretamente no computador.",
      teacherDesc: "Versão nativa vs WhatsApp Web. Sincronização e limitações do modo multi-dispositivo.",
      items: ["Download na Microsoft Store", "Sincroniza com o celular", "Atalhos de teclado para produtividade"],
    },
  ],
  drivers: [
    {
      title: "O que são Drivers?",
      studentDesc: "Programas que fazem o Windows 'conversar' com as peças do seu PC.",
      teacherDesc: "Software de interface hardware-SO. Aborde INF files, assinatura digital e Device Manager para troubleshooting.",
      items: [
        "Driver de vídeo: NVIDIA GeForce / AMD Radeon",
        "Driver de áudio: Realtek HD Audio",
        "Driver de rede: Wi-Fi e Ethernet",
        "Gerenciador de Dispositivos: verificar status",
        "Windows Update instala drivers básicos automaticamente",
      ],
    },
    {
      title: "BIOS / UEFI",
      studentDesc: "O primeiro programa que roda quando você liga o PC.",
      teacherDesc: "Firmware de inicialização: POST, boot order, Secure Boot, TPM 2.0 (requisito do Windows 11) e overclocking básico.",
      items: [
        "Acessar: Del, F2 ou F12 durante o boot",
        "Boot Order: ordem de inicialização dos discos",
        "Secure Boot: proteção contra malware no boot",
        "TPM 2.0: requisito do Windows 11",
        "UEFI vs Legacy BIOS: vantagens e compatibilidade",
        "Atualização de BIOS: riscos e procedimentos",
      ],
    },
  ],
  logica: [
    {
      title: "Introdução a Algoritmos",
      studentDesc: "Algoritmos são receitas — passos organizados para resolver um problema!",
      teacherDesc: "Fundamentos de computação: algoritmos, complexidade e resolução de problemas. Base para qualquer linguagem de programação.",
      items: [
        "Algoritmo = sequência finita de instruções",
        "Exemplo: receita de bolo é um algoritmo!",
        "Entrada → Processamento → Saída",
        "Fluxogramas: representação visual do algoritmo",
        "Pseudocódigo: linguagem natural estruturada",
      ],
    },
    {
      title: "Variáveis e Tipos de Dados",
      studentDesc: "Variáveis são 'caixas' que guardam informações no programa.",
      teacherDesc: "Tipagem, escopo, constantes vs variáveis. Utilize Portugol Studio ou Visualg para prática.",
      items: [
        "Inteiro: números sem decimais (1, 42, -7)",
        "Real: números com decimais (3.14, 9.99)",
        "Texto (String): \"Olá mundo\"",
        "Lógico (Boolean): VERDADEIRO ou FALSO",
        "Nomeação: use nomes descritivos (idade, nome, total)",
      ],
    },
    {
      title: "Estruturas Condicionais",
      studentDesc: "O programa toma decisões: SE acontecer isso, ENTÃO faça aquilo!",
      teacherDesc: "IF/ELSE, switch-case, operadores relacionais e lógicos. Exercícios com múltiplas condições aninhadas.",
      items: [
        "SE (condição) ENTÃO ... SENÃO ...",
        "Operadores: =, <>, >, <, >=, <=",
        "Operadores lógicos: E, OU, NÃO",
        "Condições aninhadas: SE dentro de SE",
        "Exemplo: verificar se número é par ou ímpar",
      ],
    },
    {
      title: "Estruturas de Repetição",
      studentDesc: "Loops repetem ações várias vezes sem precisar copiar código!",
      teacherDesc: "FOR, WHILE, DO-WHILE. Aborde contadores, acumuladores e condições de parada para evitar loops infinitos.",
      items: [
        "PARA (FOR): repetição com contador",
        "ENQUANTO (WHILE): repete enquanto condição é verdadeira",
        "REPITA-ATÉ (DO-WHILE): executa ao menos uma vez",
        "Contador: variável que controla as repetições",
        "Cuidado com loop infinito!",
      ],
    },
  ],
  seguranca: [
    {
      title: "Boas Práticas de Segurança",
      studentDesc: "Dicas simples para proteger seus dados e seu computador.",
      teacherDesc: "Princípios de segurança da informação: confidencialidade, integridade e disponibilidade. Implemente políticas no laboratório.",
      items: [
        "Senhas fortes: mín. 12 caracteres, letras+números+símbolos",
        "Autenticação em dois fatores (2FA)",
        "Não clicar em links suspeitos (phishing)",
        "Manter sistema e antivírus atualizados",
        "Backup regular dos arquivos importantes",
        "Cuidado com Wi-Fi público",
      ],
    },
  ],
};

export default function Software() {
  const { isProfessor } = useAuth();
  const [activeTab, setActiveTab] = useState("windows");

  return (
    <div className="min-h-screen pt-20 pb-12">
      <ScrollToTop />
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-neon-text">Software</h1>
          <p className="text-muted-foreground text-sm mt-2">
            {isProfessor ? "Material técnico para preparação de aulas." : "Aprenda sobre sistemas e programas!"}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "gradient-neon text-primary-foreground neon-glow"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {content[activeTab]?.map((section) => (
            <div key={section.title} className="glass p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{section.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {isProfessor ? section.teacherDesc : section.studentDesc}
              </p>
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
