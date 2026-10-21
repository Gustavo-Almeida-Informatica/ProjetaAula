import { motion } from "framer-motion";
import { matchesSearch } from "@/lib/textSearch";
import ScrollToTop from "@/components/ScrollToTop";
import { SearchBar } from "@/components/SearchBar";
import { Seo } from "@/components/Seo";
import { useEffect, useRef, useState } from "react";
import emBreveVideo from "@/assets/em-breve.mp4.asset.json";
import { useSearchParams } from "react-router-dom";
import {
  Monitor, Download, Settings, Code, Shield, FolderOpen, Wrench, ExternalLink,
  Search,
} from "lucide-react";
import { slugify } from "@/lib/slug";
import { useScrollToItem } from "@/hooks/useScrollToItem";

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
  {
    name: "Firefox",
    desc: "Navegador independente da Mozilla com foco em privacidade e personalização.",
    features: [
      "Open source mantido por uma fundação sem fins lucrativos",
      "Bloqueio inteligente de rastreadores por padrão",
      "Sincroniza abas, senhas e favoritos entre dispositivos",
      "Suporta milhares de extensões da AMO",
    ],
    downloadUrl: "https://www.mozilla.org/firefox/new/",
    icon: "🦊",
  },
  {
    name: "VS Code",
    desc: "Editor de código mais popular do mundo — leve, rápido e cheio de extensões.",
    features: [
      "Suporta dezenas de linguagens de programação",
      "Marketplace com milhares de extensões",
      "Terminal integrado, Git embutido e IntelliSense",
      "Gratuito, open source e multiplataforma",
    ],
    downloadUrl: "https://code.visualstudio.com/Download",
    icon: "💻",
  },
  {
    name: "ShareX",
    desc: "Captura de tela e gravação avançada com upload automático para a nuvem.",
    features: [
      "Captura por região, janela, tela inteira ou rolagem",
      "Anota, borra e edita o print logo após a captura",
      "Grava tela em vídeo ou GIF com facilidade",
      "100% gratuito, open source e sem marca d'água",
    ],
    downloadUrl: "https://getsharex.com/",
    icon: "📸",
  },
  {
    name: "Anki",
    desc: "App de flashcards inteligentes com repetição espaçada — estude qualquer assunto.",
    features: [
      "Algoritmo de repetição espaçada que melhora a memorização",
      "Sincroniza entre PC, celular e web (AnkiWeb)",
      "Comunidade compartilha decks prontos para qualquer matéria",
      "Suporta imagens, áudio e até LaTeX nos cards",
    ],
    downloadUrl: "https://apps.ankiweb.net/",
    icon: "🧠",
  },
  {
    name: "PowerToys",
    desc: "Conjunto oficial de utilitários da Microsoft que turbinam o Windows.",
    features: [
      "FancyZones: layouts avançados para organizar janelas",
      "PowerRename: renomeia muitos arquivos de uma vez",
      "PowerToys Run: lançador rápido estilo Spotlight (Alt+Espaço)",
      "Gratuito, open source e mantido pela Microsoft",
    ],
    downloadUrl: "https://learn.microsoft.com/windows/powertoys/",
    icon: "🧰",
  },
  {
    name: "f.lux",
    desc: "Ajusta a temperatura de cor da tela para reduzir o cansaço visual à noite.",
    features: [
      "Deixa a tela mais quente automaticamente ao anoitecer",
      "Reduz a luz azul e ajuda a dormir melhor",
      "Configurável por horário e localização",
      "Gratuito e silencioso — roda em segundo plano",
    ],
    downloadUrl: "https://justgetflux.com/",
    icon: "🌙",
  },
  {
    name: "Shotcut",
    desc: "Editor de vídeo gratuito e open source com suporte a 4K e dezenas de formatos.",
    features: [
      "Edição em timeline com múltiplas trilhas",
      "Centenas de filtros e efeitos visuais",
      "Suporta 4K e quase todos os formatos via FFmpeg",
      "Gratuito, sem marca d'água e multiplataforma",
    ],
    downloadUrl: "https://shotcut.org/download/",
    icon: "🎞️",
  },
  {
    name: "Audacity",
    desc: "Editor de áudio gratuito mais popular — grave, corte, mixe e aplique efeitos.",
    features: [
      "Gravação multipista de microfones e fontes do sistema",
      "Remoção de ruído, normalização e dezenas de efeitos",
      "Exporta em MP3, WAV, OGG, FLAC e mais",
      "Open source, gratuito e multiplataforma",
    ],
    downloadUrl: "https://www.audacityteam.org/download/",
    icon: "🎙️",
  },
  {
    name: "Blender",
    desc: "Suíte 3D completa: modelagem, animação, renderização e até edição de vídeo.",
    features: [
      "Modelagem 3D, escultura e animação profissional",
      "Renderização realista com Cycles e Eevee",
      "Usado em filmes, jogos e curtas independentes",
      "Gratuito, open source e mantido pela Blender Foundation",
    ],
    downloadUrl: "https://www.blender.org/download/",
    icon: "🧊",
  },
  {
    name: "Bitwarden",
    desc: "Gerenciador de senhas open source — guarde todas as suas senhas em segurança.",
    features: [
      "Sincroniza senhas entre PC, celular e navegador",
      "Geração automática de senhas fortes",
      "Criptografia ponta a ponta — nem o servidor lê suas senhas",
      "Plano gratuito generoso e versão self-hosted",
    ],
    downloadUrl: "https://bitwarden.com/download/",
    icon: "🔐",
  },
  {
    name: "Malwarebytes",
    desc: "Anti-malware que detecta ameaças que muitos antivírus deixam passar.",
    features: [
      "Excelente contra adware, spyware e PUPs",
      "Funciona em conjunto com seu antivírus principal",
      "Versão gratuita com escaneamento sob demanda",
      "Limpeza rápida e interface simples",
    ],
    downloadUrl: "https://www.malwarebytes.com/mwb-download",
    icon: "🦠",
  },
  {
    name: "qBittorrent",
    desc: "Cliente torrent leve, sem anúncios e open source — alternativa ao uTorrent.",
    features: [
      "Interface limpa, sem propagandas",
      "Busca integrada de torrents em vários sites",
      "Controle de velocidade, filas e RSS",
      "Multiplataforma e 100% gratuito",
    ],
    downloadUrl: "https://www.qbittorrent.org/download",
    icon: "⬇️",
  },
  {
    name: "HandBrake",
    desc: "Conversor de vídeo gratuito — comprime e converte para vários formatos.",
    features: [
      "Converte para MP4, MKV e WebM com facilidade",
      "Presets prontos para celular, TV e web",
      "Reduz tamanho de arquivos sem perder muita qualidade",
      "Open source, multiplataforma e sem custo",
    ],
    downloadUrl: "https://handbrake.fr/downloads.php",
    icon: "🎬",
  },
  {
    name: "Rufus",
    desc: "Cria pendrives bootáveis em minutos — instale Windows ou Linux pelo USB.",
    features: [
      "Grava ISO do Windows e Linux em pendrives",
      "Muito mais rápido que outras ferramentas",
      "Portátil — não precisa instalar",
      "Gratuito e open source",
    ],
    downloadUrl: "https://rufus.ie/",
    icon: "💾",
  },
  {
    name: "Telegram",
    desc: "Mensageiro rápido com grupos enormes, canais públicos e envio de arquivos grandes.",
    features: [
      "Grupos com até 200 mil membros",
      "Envio de arquivos de até 2 GB",
      "Canais públicos para divulgação e estudo",
      "Funciona no celular, PC e navegador",
    ],
    downloadUrl: "https://desktop.telegram.org/",
    icon: "✈️",
  },
];

// ===== BANCO COMPLETO DE PROGRAMAS POR CATEGORIA =====
export interface CategoryProgram {
  name: string;
  essential?: boolean;
}

export interface ProgramCategory {
  id: string;
  label: string;
  icon: string;
  programs: CategoryProgram[];
}

export const programCategories: ProgramCategory[] = [
  { id: "navegadores", label: "Navegadores", icon: "🌐", programs: [
    { name: "Brave" }, { name: "Vivaldi" }, { name: "Firefox", essential: true }, { name: "Mullvad" },
    { name: "Chrome" }, { name: "LibreWolf" }, { name: "Ungoogled", essential: true }, { name: "Zen Browser" },
  ]},
  { id: "documentos", label: "Documentos", icon: "📄", programs: [
    { name: "Scribus" }, { name: "OnlyOffice" }, { name: "LibreOffice" }, { name: "WPS Office" },
    { name: "Sumatra PDF" }, { name: "Foxit Reader" },
  ]},
  { id: "editor-texto", label: "Editor de Texto", icon: "📝", programs: [
    { name: "VS Code" }, { name: "VSCodium" }, { name: "Notepad++" }, { name: "Sublime Text" },
  ]},
  { id: "multimidia", label: "Multimídia", icon: "🎬", programs: [
    { name: "VLC", essential: true }, { name: "AIMP" }, { name: "KODI", essential: true }, { name: "iTunes" },
    { name: "Spotify", essential: true }, { name: "Stremio", essential: true }, { name: "Spotube", essential: true },
    { name: "SMPlayer" }, { name: "MPC - HC" }, { name: "Clementine" }, { name: "K-Lite Mega" }, { name: "Foobar2000" },
  ]},
  { id: "aprendizagem", label: "Aprendizagem", icon: "🧠", programs: [
    { name: "Anki" }, { name: "Kindle", essential: true }, { name: "Keyviz", essential: true },
    { name: "Scratch", essential: true }, { name: "Klavaro", essential: true }, { name: "Espanso" },
    { name: "Hydrogen" }, { name: "TuxGuitar", essential: true }, { name: "AppFlowy" },
    { name: "Balabolka" }, { name: "Notesnook" }, { name: "Virtual Piano" }, { name: "Detran" },
  ]},
  { id: "utilitarios", label: "Utilitários", icon: "🧰", programs: [
    { name: "f.lux", essential: true }, { name: "AltSnap" }, { name: "SuperF4" }, { name: "UniGetUI" },
    { name: "dupeGuru", essential: true }, { name: "LocalSend" }, { name: "Everything" }, { name: "WinDirStat" },
    { name: "PowerToys", essential: true }, { name: "Twinkle Tray", essential: true }, { name: "Touch Portal" }, { name: "SoundSwitch" },
  ]},
  { id: "video", label: "Edição de Vídeo", icon: "🎞️", programs: [
    { name: "Olive" }, { name: "VSDC" }, { name: "Filmora" }, { name: "Capcut" },
    { name: "Shotcut", essential: true }, { name: "Kdenlive" }, { name: "Lightworks" }, { name: "DaVinci Resolve" },
  ]},
  { id: "modelagem", label: "Modelagem", icon: "🧊", programs: [
    { name: "Natron" }, { name: "Friction" }, { name: "Blender" }, { name: "FreeCAD" },
    { name: "OpenSCAD" }, { name: "Blockbench" },
  ]},
  { id: "captura", label: "Captura de Tela", icon: "📸", programs: [
    { name: "ShareX", essential: true }, { name: "Captura", essential: true }, { name: "Flameshot" }, { name: "OBS Studio" },
  ]},
  { id: "downloads-cat", label: "Downloads", icon: "⬇️", programs: [
    { name: "IDM", essential: true }, { name: "Motrix" }, { name: "AB DM" }, { name: "Free DM" },
    { name: "Neat DM" }, { name: "qBittorrent" }, { name: "TubeDigger" }, { name: "JDownloader" },
    { name: "Transmission" }, { name: "Persepolis DM" }, { name: "YTDownloader" }, { name: "Open Video DL" },
  ]},
  { id: "personalizacao", label: "Personalização", icon: "🎨", programs: [
    { name: "Files" }, { name: "Rainmeter" }, { name: "Windhawk" }, { name: "Open Shell", essential: true },
    { name: "Nilesoft Shell", essential: true }, { name: "Cairo Desktop", essential: true }, { name: "TranslucentTB" },
    { name: "Flow Launcher" }, { name: "ModernFlyouts" }, { name: "Lively Wallpaper" }, { name: "Sigma File Manag" }, { name: "7+ Taskbar Tweak" },
  ]},
  { id: "manutencao-cat", label: "Manutenção", icon: "🔧", programs: [
    { name: "CPU-Z", essential: true }, { name: "Dism++" }, { name: "Recuva" }, { name: "BleachBit" },
    { name: "LockHunter" }, { name: "ShutUp10++" }, { name: "UniExtractor" }, { name: "FreeFileSync" },
    { name: "Angry IP Scan" }, { name: "Winaero Tweak" }, { name: "Revo Uninstaller", essential: true }, { name: "Bulk Crap Uninst" },
  ]},
  { id: "imagem", label: "Edição de Imagem", icon: "🖼️", programs: [
    { name: "Krita" }, { name: "Gimp" }, { name: "Canva", essential: true }, { name: "MyPaint" },
    { name: "Darktable" }, { name: "Photopea" }, { name: "Paint.NET" }, { name: "RawTherapee" },
  ]},
  { id: "vetoriais", label: "Gráficos Vetoriais", icon: "✏️", programs: [
    { name: "Affinity", essential: true }, { name: "draw.io" }, { name: "Graphite", essential: true },
    { name: "Inkscape" }, { name: "LibreCAD" }, { name: "Glaxnimate" },
  ]},
  { id: "visualizadores", label: "Visualizadores", icon: "👁️", programs: [
    { name: "XnView" }, { name: "IrfanView" }, { name: "QuickLook" }, { name: "ImageGlass" },
  ]},
  { id: "gamer", label: "Gamer", icon: "🎮", programs: [
    { name: "Hydra", essential: true }, { name: "Steam", essential: true }, { name: "GPU-Z" }, { name: "Playnite" },
    { name: "HWiNFO" }, { name: "Fan Control" }, { name: "CapFrameX" }, { name: "Epic Games" },
    { name: "Voice Meeter" }, { name: "Heroic Games" }, { name: "MSI Afterburner" }, { name: "OP Auto Clicker" },
  ]},
  { id: "emuladores", label: "Emuladores", icon: "🕹️", programs: [
    { name: "PuTTY" }, { name: "Parsec" }, { name: "Dolphin", essential: true }, { name: "RaiDrive" },
    { name: "AnyDesk" }, { name: "RetroArch", essential: true }, { name: "VirtualBox", essential: true }, { name: "Spacedesk" },
    { name: "BlueStacks", essential: true }, { name: "Genymotion" }, { name: "TeamViewer" }, { name: "Daemon Tools" },
  ]},
  { id: "conversores", label: "Conversores", icon: "🔄", programs: [
    { name: "Calibre" }, { name: "Mp3tag", essential: true }, { name: "Upscayl" }, { name: "PDFsam" },
    { name: "HandBrake" }, { name: "ExifCleaner" }, { name: "Subtitle Edit" }, { name: "MKVToolNix" },
    { name: "File Converter" }, { name: "Format Factory" }, { name: "XMedia Recode" }, { name: "Shutter Encoder" },
  ]},
  { id: "audio", label: "Edição de Áudio", icon: "🎙️", programs: [
    { name: "LMMS" }, { name: "Reaper" }, { name: "Bespoke" }, { name: "Audacity", essential: true },
    { name: "FL Studio" }, { name: "Cakewalk" }, { name: "MuseScore" }, { name: "Bitwig Studio" },
  ]},
  { id: "seguranca-cat", label: "Segurança", icon: "🔐", programs: [
    { name: "Bitwarden", essential: true }, { name: "Portmaster" }, { name: "Malwarebytes", essential: true },
    { name: "Bitdefender AV" }, { name: "Kaspersky Free", essential: true }, { name: "VirusTotal Upload" },
  ]},
  { id: "compactadores", label: "Compactadores", icon: "📦", programs: [
    { name: "7-Zip" }, { name: "PeaZip" }, { name: "WinRAR", essential: true }, { name: "CompactGUI", essential: true },
  ]},
  { id: "bibliotecas", label: "Bibliotecas", icon: "📚", programs: [
    { name: "Python" }, { name: "DirectX" }, { name: ".NET 8.0" }, { name: "C++ 2005 até 2015+" },
    { name: "Java 8 (JRE)" }, { name: "Java 21 (JDK)" }, { name: "XNA Framework" },
  ]},
  { id: "mensageiros", label: "Mensageiros", icon: "💬", programs: [
    { name: "Stoat" }, { name: "Slack" }, { name: "Zoom" }, { name: "Signal" }, { name: "Trillian" },
    { name: "Discord" }, { name: "Session" }, { name: "Element" }, { name: "Telegram" }, { name: "WhatsApp" },
    { name: "TeamSpeak" }, { name: "Thunderbird" },
  ]},
  { id: "dispositivo", label: "Dispositivo", icon: "💾", programs: [
    { name: "Rufus" }, { name: "Ventoy" }, { name: "AnyBurn" }, { name: "ValiDrive", essential: true },
    { name: "TeraCopy" }, { name: "balenaEtcher" }, { name: "HD Tune Pro", essential: true }, { name: "CrystalDiskInfo" },
    { name: "Remote Mouse" }, { name: "Win32 Disk Img" }, { name: "Partition Assistant", essential: true }, { name: "Hard Disk Sentinel", essential: true },
  ]},
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

const COMING_SOON_TABS = ["drivers", "logica"];

function ComingSoonBlock() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Tenta tocar com som. Se o navegador bloquear o autoplay com som,
    // toca mudo e liga o som na primeira interação da pessoa.
    const unlockSound = () => {
      video.muted = false;
    };
    const tryPlayWithSound = async () => {
      video.muted = false;
      try {
        await video.play();
      } catch {
        video.muted = true;
        try {
          await video.play();
        } catch {
          // Sem autoplay possível; a primeira interação tenta de novo.
        }
        const events = ["pointerdown", "touchstart", "keydown"] as const;
        const onFirstInteraction = () => {
          unlockSound();
          void video.play().catch(() => {});
          events.forEach((e) => document.removeEventListener(e, onFirstInteraction));
        };
        events.forEach((e) => document.addEventListener(e, onFirstInteraction));
      }
    };
    void tryPlayWithSound();
  }, []);

  return (
    <div className="text-center py-10 space-y-6">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">(em breve)</h2>
      <p className="text-muted-foreground text-sm">Este conteúdo está sendo preparado.</p>
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        preload="auto"
        src={emBreveVideo.url}
        aria-label="Vídeo de apresentação do conteúdo em preparação"
        className="w-full max-w-2xl mx-auto rounded-xl"
      />
    </div>
  );
}

export default function Software() {
  const [params] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const tabParam = params.get("tab");
  const itemParam = params.get("item");
  const validTabs = tabs.map((t) => t.id);
  const initialTab = tabParam && validTabs.includes(tabParam)
    ? tabParam
    : initialQ
      ? "programas"
      : "windows";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialQ);

  useScrollToItem(itemParam, [activeTab]);

  const filteredPrograms = programs.filter(
    (prog) =>
      matchesSearch(searchQuery, prog.name, prog.desc)
  );

  const filteredContent = (tabContent: ContentSection[] | undefined) => {
    if (!tabContent) return [];
    return tabContent.filter(
      (section) =>
        matchesSearch(searchQuery, section.title, section.desc)
    );
  };

  const isComingSoon = COMING_SOON_TABS.includes(activeTab);
  const hasResults =
    activeTab === "programas"
      ? filteredPrograms.length > 0
      : isComingSoon
        ? true
        : filteredContent(content[activeTab]).length > 0;

  return (
    <div className="min-h-screen pt-16 pb-12">
      <Seo
        title="Software — Windows 11, Programas e Segurança | Projeta Aula"
        description="Windows 11, programas essenciais, manutenção, drivers, lógica básica e segurança digital explicados para iniciantes."
        path="/software"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Software — Windows 11, Programas e Segurança",
          description: "Guia de software para iniciantes em informática.",
          image: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73d829a0-0810-4fd5-ba2a-7ea4362b1c21/id-preview-f5694e5e--865c5095-4c20-4522-a423-bd0277f444cd.lovable.app-1775506888859.png",
          author: { "@type": "Organization", name: "Equipe Projeta Aula" },
          publisher: { "@type": "Organization", name: "Projeta Aula" },
        }}
      />
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
                    id={slugify(prog.name)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="glass p-6 hover:border-primary/20 transition-all scroll-mt-24 rounded-xl border border-transparent"
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

              {/* Catálogo completo por categoria */}
              <div className="glass p-6 mt-8">
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  📚 Catálogo Completo por Categoria
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Mais de 180 programas organizados por uso. Itens marcados com <span className="text-primary font-bold">★</span> são considerados essenciais.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {programCategories
                    .filter((cat) =>
                      !searchQuery ||
                      matchesSearch(searchQuery, cat.label) ||
                      cat.programs.some((p) => matchesSearch(searchQuery, p.name))
                    )
                    .map((cat) => (
                      <div key={cat.id} className="glass p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{cat.icon}</span>
                          <h3 className="font-display text-sm font-bold text-foreground">{cat.label}</h3>
                          <span className="ml-auto text-[10px] text-muted-foreground">{cat.programs.length}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.programs.map((p) => (
                            <span
                              key={p.name}
                              className={`text-[11px] px-2 py-1 rounded-md border transition-colors ${
                                p.essential
                                  ? "bg-primary/15 text-primary border-primary/30 font-semibold"
                                  : "bg-secondary/50 text-foreground/80 border-border/50"
                              }`}
                            >
                              {p.essential && <span className="mr-0.5">★</span>}
                              {p.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : isComingSoon ? (
            <ComingSoonBlock />
          ) : (
            <div className="space-y-5">
              {filteredContent(content[activeTab])?.map((section) => (
                <div key={section.title} id={slugify(section.title)} className="glass p-6 scroll-mt-24 rounded-xl border border-transparent">
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
