import { motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Monitor, Download, Settings, Code, Shield, FolderOpen, Wrench, ExternalLink,
  Search,
} from "lucide-react";

const tabs = [
  { id: "windows", label: "Windows", icon: Monitor },
  { id: "programas", label: "Programas Essenciais", icon: Download },
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

interface ProgramCard {
  name: string;
  desc: string;
  features: string[];
  downloadUrl: string;
  icon: string;
}

export const programs: ProgramCard[] = [
  {
    name: "Steam",
    desc: "Plataforma de jogos mais popular do mundo — compre, baixe e jogue milhares de títulos.",
    features: [
      "Biblioteca digital: seus jogos ficam salvos na conta, pode baixar em qualquer PC",
      "Ofertas frequentes com descontos de até 90%",
      "Modo offline: jogue sem internet depois de baixar",
      "Suporte a controle e jogos multiplayer online",
    ],
    downloadUrl: "https://store.steampowered.com/about/",
    icon: "🎮",
  },
  {
    name: "Epic Games",
    desc: "Loja de jogos com títulos exclusivos e jogos gratuitos toda semana.",
    features: [
      "Jogos gratuitos toda semana — permanentes na sua biblioteca",
      "Exclusivos como Fortnite e Rocket League",
      "Integra com Unreal Engine para criadores",
      "Amigos e convites para jogar juntos",
    ],
    downloadUrl: "https://www.epicgames.com/store/download",
    icon: "🎯",
  },
  {
    name: "Discord",
    desc: "Aplicativo de conversa por voz, vídeo e texto — ideal para jogar e estudar em grupo.",
    features: [
      "Chamadas de voz em grupo com qualidade alta e baixo delay",
      "Crie servidores privados para amigos ou turmas",
      "Compartilhamento de tela para apresentações",
      "Gratuito e funciona no PC, celular e navegador",
    ],
    downloadUrl: "https://discord.com/download",
    icon: "🎧",
  },
  {
    name: "Google Chrome",
    desc: "O navegador mais usado no mundo. Rápido, seguro e com milhares de extensões.",
    features: [
      "Sincroniza favoritos, senhas e histórico com sua conta Google",
      "Ctrl+T abre nova aba, Ctrl+W fecha, Ctrl+Tab alterna",
      "Modo anônimo: Ctrl+Shift+N",
      "Suporta extensões da Chrome Web Store",
    ],
    downloadUrl: "https://www.google.com/chrome/",
    icon: "🌐",
  },
  {
    name: "Brave",
    desc: "Navegador rápido que bloqueia anúncios e rastreadores automaticamente.",
    features: [
      "Bloqueia anúncios e pop-ups sem precisar instalar extensões",
      "Carrega sites até 3x mais rápido que outros navegadores",
      "Modo nocturno e leitor integrado",
      "Baseado no Chrome — funciona com todas as extensões",
    ],
    downloadUrl: "https://brave.com/download/",
    icon: "🦁",
  },
  {
    name: "Opera GX",
    desc: "Navegador feito para gamers, com controles de CPU, RAM e rede.",
    features: [
      "Limitador de RAM e CPU — o navegador não trava seu jogo",
      "Twitch, Discord e WhatsApp integrados na barra lateral",
      "Temas escuros e sons personalizáveis",
      "VPN gratuita integrada para mais privacidade",
    ],
    downloadUrl: "https://www.opera.com/gx",
    icon: "🕹️",
  },
  {
    name: "Spotify",
    desc: "O maior serviço de streaming de música do mundo — milhões de músicas e podcasts.",
    features: [
      "Escute música e podcasts online e offline (com Premium)",
      "Crie playlists personalizadas e compartilhe com amigos",
      "Descoberta semanal com músicas baseadas no seu gosto",
      "Disponível para PC, celular, TV e videogame",
    ],
    downloadUrl: "https://www.spotify.com/download/",
    icon: "🎵",
  },
  {
    name: "OBS Studio",
    desc: "Gravador de tela e transmissão ao vivo gratuito — ideal para aulas e jogos.",
    features: [
      "Grave a tela do computador com ou sem webcam",
      "Transmita ao vivo para YouTube, Twitch e outras plataformas",
      "Cenas e fontes personalizáveis (webcam, tela, imagens)",
      "100% gratuito, sem marcas d'água e de código aberto",
    ],
    downloadUrl: "https://obsproject.com/download",
    icon: "📺",
  },
  {
    name: "LibreOffice",
    desc: "Pacote de escritório gratuito — substituto completo do Microsoft Office.",
    features: [
      "Writer: editor de textos (substitui o Word)",
      "Calc: planilhas (substitui o Excel)",
      "Impress: apresentações (substitui o PowerPoint)",
      "100% gratuito e de código aberto",
    ],
    downloadUrl: "https://pt-br.libreoffice.org/baixe-ja/",
    icon: "📝",
  },
  {
    name: "Notion",
    desc: "Ferramenta tudo-em-um para anotações, tarefas, projetos e colaboração.",
    features: [
      "Crie páginas com textos, listas, tabelas e calendários",
      "Templates prontos para estudos, projetos e hábitos",
      "Compartilhe páginas com colegas para trabalhar junto",
      "Sincroniza em todos os dispositivos — PC, celular e web",
    ],
    downloadUrl: "https://www.notion.so/desktop",
    icon: "📋",
  },
  {
    name: "Trello",
    desc: "Organize tarefas e projetos com quadros visuais estilo cartões.",
    features: [
      "Crie quadros com listas e cartões para organizar qualquer projeto",
      "Arraste os cartões entre colunas: A Fazer, Fazendo, Feito",
      "Adicione prazos, etiquetas e checklists dentro dos cartões",
      "Ideal para trabalho em equipe e estudos",
    ],
    downloadUrl: "https://trello.com/platforms",
    icon: "🗂️",
  },
  {
    name: "VLC Media Player",
    desc: "Reprodutor de vídeo e música gratuito que abre praticamente qualquer formato de mídia.",
    features: [
      "Abre MP4, AVI, MKV, MP3, FLAC e muitos outros",
      "Gratuito, sem propagandas e sem vírus",
      "Suporta legendas em vários formatos (SRT, SSA)",
      "Funciona no Windows, Mac e Linux",
    ],
    downloadUrl: "https://www.videolan.org/vlc/",
    icon: "🎬",
  },
  {
    name: "7-Zip",
    desc: "Compactador de arquivos gratuito — cria e abre ZIP, RAR, 7z e muitos outros formatos.",
    features: [
      "Compacta e descompacta arquivos em vários formatos",
      "Formato 7z tem melhor compressão que ZIP e RAR",
      "Integra com o menu de clique direito do Windows",
      "100% gratuito e de código aberto",
    ],
    downloadUrl: "https://www.7-zip.org/",
    icon: "📦",
  },
  {
    name: "WinRAR",
    desc: "Compactador de arquivos popular para criar e extrair arquivos RAR e ZIP.",
    features: [
      "Abre e cria arquivos ZIP e RAR",
      "Clique direito > 'Extrair aqui' para descompactar",
      "Pode proteger arquivos com senha",
      "Útil para enviar vários arquivos por e-mail",
    ],
    downloadUrl: "https://www.win-rar.com/download.html",
    icon: "🗜️",
  },
  {
    name: "WhatsApp Desktop",
    desc: "Use o WhatsApp pelo computador para digitar mais rápido e compartilhar arquivos.",
    features: [
      "Sincroniza mensagens com o celular automaticamente",
      "Mais fácil de digitar textos longos pelo teclado",
      "Envie e receba fotos e documentos em tela grande",
      "Disponível na Microsoft Store ou site oficial",
    ],
    downloadUrl: "https://www.whatsapp.com/download",
    icon: "💬",
  },
  {
    name: "Zoom",
    desc: "Plataforma de videochamadas para aulas online, reuniões e webinars.",
    features: [
      "Reuniões com até 100 participantes na versão gratuita",
      "Compartilhamento de tela para apresentações",
      "Chat durante a reunião",
      "Gravação de reuniões (versão paga)",
    ],
    downloadUrl: "https://zoom.us/download",
    icon: "📹",
  },
  {
    name: "CCleaner",
    desc: "Programa de limpeza que remove arquivos temporários e libera espaço no disco.",
    features: [
      "Remove arquivos temporários do Windows e navegadores",
      "Limpa cache, histórico e cookies",
      "Gerencia programas que iniciam com o Windows",
      "Versão gratuita é suficiente para uso básico",
    ],
    downloadUrl: "https://www.ccleaner.com/pt-br/ccleaner/download",
    icon: "🧹",
  },
  {
    name: "Windows Defender",
    desc: "Antivírus gratuito que já vem no Windows. Proteção em tempo real contra vírus.",
    features: [
      "Já vem ativado no Windows 10 e 11",
      "Faz verificações em tempo real automaticamente",
      "Atualiza com o Windows Update",
      "Para uso doméstico, é suficiente — não precisa de outro antivírus",
    ],
    downloadUrl: "https://www.microsoft.com/pt-br/windows/comprehensive-security",
    icon: "🛡️",
  },
  {
    name: "Canva",
    desc: "Ferramenta online para criar designs, apresentações, posts e muito mais — sem precisar instalar.",
    features: [
      "Milhares de templates prontos para editar",
      "Crie posts para redes sociais, cartões, apresentações",
      "Funciona direto no navegador (não precisa instalar)",
      "Versão gratuita com muitos recursos",
    ],
    downloadUrl: "https://www.canva.com/",
    icon: "🎨",
  },
];

export const content: Record<string, ContentSection[]> = {
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
  const [params] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  // If a query was passed (likely from global search for a program), default to programs tab
  const [activeTab, setActiveTab] = useState(initialQ ? "programas" : "windows");
  const [searchQuery, setSearchQuery] = useState(initialQ);

  const filteredPrograms = programs.filter(
    (prog) =>
      prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContent = (tabContent: ContentSection[] | undefined) => {
    if (!tabContent) return [];
    return tabContent.filter(
      (section) =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const currentContent =
    activeTab === "programas"
      ? filteredPrograms
      : filteredContent(content[activeTab]);

  const hasResults =
    activeTab === "programas"
      ? filteredPrograms.length > 0
      : filteredContent(content[activeTab]).length > 0;

  return (
    <div className="min-h-screen pt-16 pb-12">
      <ScrollToTop />
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-warm-text">Software</h1>
          <p className="text-muted-foreground text-sm mt-3">
            Aprenda sobre o Windows, programas úteis e segurança digital
          </p>
        </motion.div>

        <div className="mb-6">
          <SearchBar
            placeholder="Pesquise por um programa ou tema (ex: Steam, Windows, RAM)..."
            onSearch={setSearchQuery}
            value={searchQuery}
          />
        </div>

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
        >
          {!hasResults ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 text-center rounded-xl"
            >
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                Nenhum componente encontrado com este nome. Tente outro termo!
              </p>
            </motion.div>
          ) : activeTab === "programas" ? (
            <div className="space-y-6">
              <div className="glass p-6 text-center">
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  📥 Programas Essenciais para Iniciantes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Estes são os programas que toda pessoa precisa ter no computador. Clique em "Baixar" para ir ao site oficial de cada programa.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPrograms.map((prog, i) => (
                  <motion.div
                    key={prog.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="glass p-6 hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{prog.icon}</span>
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground">{prog.name}</h3>
                        <p className="text-xs text-muted-foreground">{prog.desc}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {prog.features.map((f) => (
                        <li key={f} className="text-xs text-foreground/80 flex items-start gap-2">
                          <span className="text-primary mt-0.5">▸</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={prog.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-warm text-primary-foreground text-xs font-semibold warm-glow-sm hover:scale-[1.02] transition-transform"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Baixar {prog.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredContent(content[activeTab])?.map((section) => (
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
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
