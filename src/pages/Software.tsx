import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";
import {
  Monitor, Download, Settings, Code, Shield, FolderOpen, Wrench,
} from "lucide-react";

const tabs = [
  { id: "windows", label: "Windows", icon: Monitor },
  { id: "programas", label: "Programas Úteis", icon: Download },
  { id: "explorador", label: "Explorador de Arquivos", icon: FolderOpen },
  { id: "manutencao", label: "Manutenção", icon: Wrench },
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
      title: "Layout do Windows 11",
      desc: "O Windows 11 trouxe um visual renovado com o Menu Iniciar centralizado na barra de tarefas.",
      items: [
        "Menu Iniciar: centralizado na barra de tarefas (diferente do Windows 10 que ficava à esquerda)",
        "Barra de tarefas: fixa na parte inferior, com ícones centralizados",
        "Cantos arredondados em janelas e menus para visual mais moderno",
        "Widgets: painel lateral com notícias, previsão do tempo e agenda",
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
      title: "Aero Snap (Organizar Janelas)",
      desc: "Recurso do Windows que organiza janelas automaticamente ao arrastá-las para as bordas da tela.",
      items: [
        "Arraste uma janela para a borda esquerda ou direita: ela ocupa metade da tela",
        "Arraste para o canto: a janela ocupa 1/4 da tela",
        "Atalho: Win + Seta Esquerda/Direita para encaixar a janela",
        "Muito útil para trabalhar com 2 programas lado a lado",
      ],
    },
    {
      title: "Layout Snap (Windows 11)",
      desc: "Evolução do Aero Snap — passe o mouse sobre o botão Maximizar e escolha um layout predefinido.",
      items: [
        "Passe o mouse sobre o botão Maximizar (quadradinho) da janela",
        "Escolha entre layouts: 2 janelas, 3 janelas ou 4 janelas lado a lado",
        "Organize sua tela em segundos sem precisar arrastar",
        "Atalho: Win+Z para abrir os layouts disponíveis",
      ],
    },
    {
      title: "Áreas de Trabalho Virtuais",
      desc: "Crie múltiplas áreas de trabalho para organizar tarefas — uma para estudos, outra para diversão, etc.",
      items: [
        "Win+Tab: abre a visão de tarefas e mostra todas as áreas",
        "Clique em 'Nova área de trabalho' para criar outra",
        "Ctrl+Win+Seta Direita/Esquerda: alterna entre as áreas",
        "Ctrl+Win+D: cria uma nova área de trabalho diretamente",
        "Cada área tem seus próprios programas abertos — não se misturam",
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
      title: "Atalhos do Windows (Completo)",
      desc: "Atalhos de teclado que agilizam o uso do computador — decore os mais úteis!",
      items: [
        "Alt+Tab: alterna entre janelas abertas",
        "Win+E: abre o Explorador de Arquivos",
        "Win+Shift+S: captura de tela (recorte)",
        "Win+L: bloqueia o computador",
        "Win+D: mostra/esconde a área de trabalho",
        "Win+I: abre as Configurações",
        "Ctrl+Shift+Esc: abre o Gerenciador de Tarefas",
        "F2: renomeia o item selecionado",
        "F5: atualiza/recarrega a janela",
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
    {
      title: "Paint",
      desc: "Editor de imagens simples que já vem instalado no Windows — ideal para desenhos rápidos e edições básicas.",
      items: [
        "Ferramentas: lápis, pincel, borracha, balde de tinta, formas geométricas",
        "Ctrl+Z: desfaz a última ação",
        "Ctrl+S: salva o projeto",
        "Pode salvar em PNG, JPEG, BMP e GIF",
        "Ideal para recortar, redimensionar e anotar imagens",
      ],
    },
    {
      title: "Ferramenta de Captura (Snipping Tool)",
      desc: "Tire prints (capturas de tela) de partes específicas da tela no Windows 11.",
      items: [
        "Atalho principal: Win+Shift+S",
        "Captura retangular: selecione uma área retangular",
        "Captura de forma livre: desenhe a área que quer capturar",
        "Captura de janela: capture apenas uma janela específica",
        "Captura de tela inteira: captura tudo o que está na tela",
        "A imagem fica na área de transferência — cole com Ctrl+V em qualquer lugar",
      ],
    },
    {
      title: "WordPad",
      desc: "Editor de texto intermediário entre o Bloco de Notas e o Word — permite formatação básica.",
      items: [
        "Permite negrito, itálico, sublinhado e cores",
        "Pode inserir imagens e data/hora no texto",
        "Ctrl+H: abre Localizar e Substituir",
        "Salva em RTF (Rich Text Format) e outros formatos",
        "Mais simples que o Word, mas com mais recursos que o Bloco de Notas",
      ],
    },
    {
      title: "Bloco de Notas e Sticky Notes",
      desc: "Ferramentas simples para anotações rápidas no Windows.",
      items: [
        "Bloco de Notas: editor de texto puro, sem formatação — salva em .txt",
        "Ideal para notas rápidas, códigos e listas simples",
        "Sticky Notes: notas autoadesivas na área de trabalho",
        "As Sticky Notes sincronizam com sua conta Microsoft",
        "Use para lembretes, listas de tarefas e anotações rápidas",
      ],
    },
    {
      title: "Calculadora do Windows",
      desc: "Aplicativo de calculadora que vai muito além das contas básicas.",
      items: [
        "Modo Padrão: soma, subtração, multiplicação, divisão",
        "Modo Científico: funções avançadas como raiz, potência, seno, cosseno",
        "Conversor de unidades: converte comprimento, peso, temperatura, velocidade",
        "Conversor de moedas: converte entre real, dólar, euro, etc.",
        "Modo Programador: converte entre binário, decimal, octal e hexadecimal",
      ],
    },
    {
      title: "Microsoft Edge",
      desc: "Navegador web nativo do Windows 11 — o substituto do Internet Explorer.",
      items: [
        "Ctrl+T: abre uma nova guia (aba)",
        "Ctrl+W: fecha a guia atual",
        "Ctrl+Tab: alterna entre as guias abertas",
        "Ctrl+L: seleciona a barra de endereço para digitar um site",
        "Suporta extensões da Chrome Web Store",
        "Modo InPrivate: navegação anônima (Ctrl+Shift+N)",
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
  explorador: [
    {
      title: "Layout do Explorador de Arquivos",
      desc: "O programa que você usa para navegar por todos os seus arquivos e pastas no computador.",
      items: [
        "Painel de navegação (esquerda): acesso rápido a pastas favoritas, Área de Trabalho, Downloads, etc.",
        "Área de conteúdo (centro): mostra os arquivos e pastas da pasta atual",
        "Barra de endereço (topo): mostra onde você está (ex: C:\\Usuários\\João\\Documentos)",
        "Barra de pesquisa: digite o nome do arquivo para encontrá-lo rapidamente",
        "Barra de classificação: organize por Nome, Data, Tipo ou Tamanho",
        "Modos de exibição: ícones grandes, ícones pequenos, lista, detalhes",
      ],
    },
    {
      title: "Seleção de Arquivos",
      desc: "Métodos para selecionar um ou vários arquivos de uma vez.",
      items: [
        "Clicar+arrastar: cria uma caixa de seleção ao redor dos arquivos",
        "Ctrl+A: seleciona todos os arquivos da pasta",
        "Shift+clique: seleciona um intervalo contínuo (do primeiro ao último clicado)",
        "Ctrl+clique: seleciona arquivos específicos (um por um, não precisam estar juntos)",
        "Depois de selecionar, você pode copiar, mover ou excluir todos de uma vez",
      ],
    },
    {
      title: "Lixeira",
      desc: "Quando você exclui um arquivo, ele vai para a Lixeira — pode ser recuperado antes de esvaziar.",
      items: [
        "Delete: envia o arquivo para a Lixeira",
        "Shift+Delete: exclui permanentemente (NÃO vai para a Lixeira!)",
        "Restaurar: clique direito no item da Lixeira > 'Restaurar' — volta ao local original",
        "Esvaziar Lixeira: clique direito no ícone da Lixeira > 'Esvaziar' — apaga tudo definitivamente",
        "A Lixeira tem limite de espaço — arquivos muito antigos são apagados automaticamente",
      ],
    },
    {
      title: "Copiar, Colar e Recortar",
      desc: "As operações mais usadas para mover e duplicar arquivos no computador.",
      items: [
        "Ctrl+C: copia o arquivo (cria uma duplicata no destino, mantém o original)",
        "Ctrl+X: recorta o arquivo (move — remove do original e coloca no destino)",
        "Ctrl+V: cola o arquivo no local atual",
        "Clique direito > Copiar/Recortar/Colar: faz a mesma coisa pelo menu",
        "Arrastar com Ctrl segurado: copia para o destino",
        "Arrastar sem Ctrl: move para o destino (na mesma unidade)",
      ],
    },
    {
      title: "Pastas Pessoais",
      desc: "O Windows cria pastas padrão para organizar seus arquivos por tipo.",
      items: [
        "Documentos: textos, PDFs, trabalhos",
        "Downloads: tudo que você baixa da internet vai aqui por padrão",
        "Imagens: fotos, prints, imagens baixadas",
        "Vídeos: vídeos gravados ou baixados",
        "Música: arquivos de áudio e músicas",
        "Área de Trabalho: os ícones que aparecem na tela inicial",
      ],
    },
    {
      title: "Bibliotecas",
      desc: "Recurso do Windows que agrupa pastas de diferentes locais em um só lugar virtual.",
      items: [
        "Exemplo: a Biblioteca 'Documentos' pode mostrar pastas do PC local + HD externo + OneDrive",
        "Não move os arquivos — apenas cria uma visualização unificada",
        "Você pode criar bibliotecas personalizadas e adicionar pastas a elas",
        "Útil para quem tem arquivos espalhados em vários discos ou pastas",
      ],
    },
  ],
  manutencao: [
    {
      title: "Configurações do Windows",
      desc: "Painel central para personalizar e configurar tudo no Windows 11.",
      items: [
        "Acesse com Win+I ou pelo Menu Iniciar",
        "Sistema: tela, som, notificações, energia, armazenamento",
        "Personalização: papel de parede, cores, temas, tela de bloqueio",
        "Aplicativos: gerenciar, desinstalar e definir aplicativos padrão",
        "Contas: sua conta Microsoft, outros usuários, opções de login",
        "Atualização e Segurança: Windows Update, Defender, backup",
      ],
    },
    {
      title: "Disco Rígido e Unidades",
      desc: "O Windows organiza seus discos em unidades identificadas por letras (C:, D:, etc.).",
      items: [
        "C: é geralmente o disco principal onde o Windows está instalado",
        "D: pode ser um segundo HD, SSD ou partição",
        "Pendrive e HD externo recebem letras como E:, F:, G:",
        "Para ver todas as unidades: abra 'Este Computador' ou 'Meu Computador'",
        "Clique direito na unidade > Propriedades para ver espaço livre e usado",
      ],
    },
    {
      title: "CCleaner (Limpeza)",
      desc: "Programa gratuito que limpa arquivos temporários, cache e lixo do sistema para liberar espaço.",
      items: [
        "Remove arquivos temporários do Windows e navegadores",
        "Limpa cache, histórico e cookies",
        "Possui limpador de registro do Windows",
        "Ajuda a liberar espaço e melhorar o desempenho",
        "Use com moderação — não apague tudo sem saber o que é",
      ],
    },
    {
      title: "Defraggler (Desfragmentação)",
      desc: "Reorganiza os dados espalhados pelo HD para que fiquem em sequência, melhorando a velocidade de leitura.",
      items: [
        "Com o uso, os arquivos ficam 'fragmentados' (espalhados pelo disco)",
        "A desfragmentação junta os pedaços, tornando a leitura mais rápida",
        "Útil APENAS para HD (disco rígido mecânico)",
        "NÃO use em SSD — pode reduzir a vida útil do disco",
        "O Windows já tem desfragmentador embutido (Otimizar Unidades)",
      ],
    },
    {
      title: "Compactação de Arquivos",
      desc: "Reduz o tamanho de arquivos agrupando-os em um único arquivo compactado (.zip, .rar).",
      items: [
        "WinRAR: programa popular para compactar/descompactar em RAR e ZIP",
        "Pasta compactada do Windows: clique direito > 'Compactar para arquivo ZIP' — sem precisar de programa extra",
        "Útil para enviar vários arquivos por e-mail de uma vez",
        "Arquivos compactados ocupam menos espaço no disco",
        "Para descompactar: clique direito > 'Extrair tudo' ou 'Extrair aqui'",
      ],
    },
    {
      title: "Segurança e Antivírus",
      desc: "Mantenha seu computador protegido contra vírus, malwares e ameaças online.",
      items: [
        "Windows Defender: antivírus gratuito que já vem no Windows — suficiente para a maioria dos usuários",
        "Avast: antivírus gratuito popular como alternativa ao Defender",
        "Mantenha o Windows sempre atualizado (Windows Update)",
        "Verificação completa: faça uma varredura completa pelo menos 1x por mês",
        "Não baixe programas de sites desconhecidos",
        "Cuidado com anexos de e-mail de remetentes desconhecidos",
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
