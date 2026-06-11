// Concise summary of the textual content of the Projeta Aula site.
// Used to ground the AI when generating dynamic quiz questions so they
// stay strictly based on what the site actually teaches.
export const SITE_CORPUS = `
PROJETA AULA — Conteúdo educativo de informática (CETEP, Brasil).
Linguagem acessível para iniciantes. Tema escuro com acentos quentes.
Seções principais do site: História, Hardware, Software, Conectores, Quiz, Comunidade, Perfil.

==== HARDWARE ====
CPU (Processador): cérebro do PC, executa instruções; mais GHz = mais rápido; núcleos múltiplos; cache L1/L2/L3; precisa de cooler. Exemplos: Intel Core i3/i5/i7/i9, AMD Ryzen.
Memória RAM: armazenamento volátil para dados em uso; perde tudo ao desligar; tipos DDR2, DDR3, DDR4, DDR5 (encaixes incompatíveis entre si).
Armazenamento: HD (mecânico, mais lento), SSD (flash, mais rápido, sem partes móveis), NVMe (SSD via slot M.2, ultrarrápido).
Placa-mãe: conecta todos componentes; formato ATX padrão; soquete para CPU; slots PCIe; ponte norte (CPU/RAM/GPU) e ponte sul.
GPU (Placa de vídeo): processa gráficos; conectada via PCIe.
Fonte de alimentação: converte AC da tomada em DC; certificação 80 Plus (eficiência ≥80%).
Cooler: dissipa calor da CPU.
Gabinete: caixa que protege componentes; formatos ATX/Micro-ATX.
Placa de som: converte digital em áudio e vice-versa.
Placa de rede: conector RJ45 para Ethernet; endereço MAC único; Gigabit Ethernet = 1 Gbps.
Modem: Modulador/Demodulador, converte digital/analógico.
BIOS/UEFI: firmware que inicia o PC; faz POST (autoteste); bateria CR2032 mantém configurações.
POST bips: 1 bip curto = OK; 8 bips = placa de vídeo.
Slots: ISA (antigo, 8/16 bits), PCI, AGP (vídeo antigo), PCI Express (atual).
Interfaces: Serial DB-9 (mouse/modem antigo, 1 bit por vez); USB suporta até 127 dispositivos; IDE Master/Slave (cabo flat antigo, substituído por SATA).
RAID: combina discos; RAID 0 (velocidade), RAID 1 (espelhamento/segurança), RAID 5 (ambos).
Bits e bytes: 1 byte = 8 bits; 1 KB = 1024 bytes; sistema binário (base 2).

==== PERIFÉRICOS ====
Entrada: Teclado (membrana barato, mecânico durável; PS/2 roxo, USB, Wireless), Mouse (óptico, laser, com/sem fio), Webcam (USB, 720p/1080p/4K), Microfone (P2, USB, Bluetooth), Scanner (mesa, mão; DPI).
Saída: Monitor (LCD/LED/OLED; HD, Full HD, 4K; 60-240Hz), Impressora (matricial, jato de tinta, laser com toner, térmica, 3D, multifuncional), Caixas de som, Fones (headset = fone + microfone), Projetor.
USB: USB-A (clássico retangular), USB-B (quadrado, impressora), Mini USB (câmeras antigas), Micro USB (Android antigos), USB-C (reversível, moderno), USB 2.0 preto (480 Mbps) vs USB 3.0 azul (5 Gbps, 10x mais rápido).

==== HISTÓRIA — 5 GERAÇÕES ====
1ª (1940–1955): Válvulas termoiônicas. ENIAC (1945): 27 toneladas, 18.000 válvulas, programado por fios. EDVAC (1952): programa armazenado. Criados para cálculos militares.
2ª (1955–1965): Transistores (inventados em 1947 nos Laboratórios Bell por Bardeen, Brattain, Shockley). Computadores menores, ~150 kg. COBOL, FORTRAN.
3ª (1965–1975): Circuitos integrados (Jack Kilby, 1958, Texas Instruments). Milhares de transistores em um chip. Burroughs B-2500. Primeiros terminais com teclado/monitor.
4ª (1975–1990): VLSI. ALTAIR 8800 (1974, primeiro PC). Microsoft fundada em 1975 (Gates e Allen). Apple II (1977). IBM PC (1981). Processadores 286→386→486. MS-DOS.
5ª (1990–hoje): ULSI (bilhões de transistores). Multicore: Dual/Quad/Octa-Core. Intel Core i3/i5/i7/i9 e AMD Ryzen. WWW criada por Tim Berners-Lee em 1991. Google fundado em 1998. iPhone (2007). Cloud (Google Drive, iCloud). IA (Alexa, Siri, ChatGPT). IoT.

==== BRASIL NA COMPUTAÇÃO ====
Patinho Feio (1972): primeiro computador 100% brasileiro, USP.
COBRA (1974): primeira empresa brasileira de computadores.
Reserva de Mercado (1984–1992): proibia importar PCs para estimular indústria nacional; trouxe atraso mas formou engenheiros.
Internet comercial no Brasil: 1995 (antes era restrita a universidades pela RNP).
Polo Industrial de Manaus: monta eletrônicos (Samsung, Positivo, Multilaser).
Pix (2020): pagamentos instantâneos do Banco Central, referência mundial.

==== EVOLUÇÃO DOS SMARTPHONES ====
Motorola DynaTAC (1983): primeiro celular comercial, ~1 kg, US$ 3.995, bateria 30 min.
Nokia 3310 (2000): tijolão icônico, jogo Snake, 126+ milhões de unidades.
BlackBerry (2003): popularizou e-mail no celular com QWERTY físico.
iPhone (2007): Steve Jobs, touch capacitivo, App Store (2008), iOS.
Android (2008): Google, baseado em Linux, aberto, hoje >70% dos celulares.
5G (2019+): latência baixíssima, gigabit, viabiliza IoT em massa.

==== IA GENERATIVA ====
Deep Blue (1997): IBM venceu Garry Kasparov no xadrez.
AlphaGo (2016): DeepMind/Google venceu campeão mundial de Go.
GPT-3 (2020): OpenAI, 175 bilhões de parâmetros.
ChatGPT (2022): 100 milhões de usuários em 2 meses (adoção mais rápida da história).
DALL-E, Midjourney, Stable Diffusion: geração de imagens por texto.
Gemini, GPT-4o (2024+): IA multimodal (texto + imagem + áudio + vídeo).

==== REDES SOCIAIS ====
ICQ e MSN Messenger: primeiros mensageiros (1990s/2000s); MSN desativado em 2014.
Orkut (2004–2014): Google, dominou no Brasil.
Facebook (2004): Mark Zuckerberg em Harvard, 3+ bilhões de usuários.
YouTube (2005): comprado pelo Google em 2006, criou o "youtuber".
WhatsApp (2009): comprado pelo Facebook por US$ 19 bilhões em 2014.
TikTok (2016): rede chinesa de vídeos curtos com algoritmo preciso.

==== SOFTWARE / PROGRAMAS ESSENCIAIS ====
Navegadores: Chrome (Google), Firefox (Mozilla, privacidade), Edge (Microsoft, baseado em Chromium desde 2020), Safari (Apple).
Office: Word (textos), Excel (planilhas), PowerPoint (apresentações). LibreOffice é alternativa gratuita.
Mídia: VLC Media Player (gratuito, abre qualquer formato), KODI (central de mídia), Stremio (filmes/séries via add-ons), Spotube (Spotify via YouTube).
Compactação: WinRAR (RAR, ZIP, com senha).
Comunicação: WhatsApp (web e Microsoft Store, sincroniza com celular), Discord (gamers/comunidades), Telegram, Slack (trabalho), Zoom, Google Meet.
Produtividade: Google Drive (nuvem), Notion, Trello (kanban), Canva (designs).
Jogos: Steam (Valve, maior loja PC), Epic Games Store (jogos grátis semanais), Xbox Game Pass (assinatura), Battle.net (Blizzard), Hydra (hub).
Emuladores: Dolphin (GameCube/Wii), RetroArch (vários consoles), BlueStacks (Android no PC), VirtualBox (máquinas virtuais).
Captura/Vídeo: OBS Studio (gravação/streaming gratuito), ShareX (captura avançada), Shotcut (editor 4K open source), Audacity (áudio).
Utilitários: Bitwarden (senhas), Malwarebytes (anti-malware), Kaspersky Free, CCleaner (limpeza), Revo Uninstaller (desinstalação profunda), CPU-Z (info do PC), PowerToys (utilitários Windows), f.lux (reduz luz azul), Twinkle Tray (brilho monitor), dupeGuru (duplicados), Anki (flashcards), Klavaro (digitação), Scratch (programação por blocos), Keyviz (mostra teclas pressionadas).
Manutenção: Desfragmentação só em HDs (NUNCA em SSDs); compactação .zip/.rar; backup é cópia de segurança.

==== WINDOWS 11 ====
Atalhos: Ctrl+C (copiar), Ctrl+V (colar), Ctrl+X (recortar), Ctrl+Z (desfazer), Ctrl+S (salvar), Ctrl+A (selecionar tudo), Ctrl+P (imprimir), Alt+F4 (fecha janela), Ctrl+Shift+Esc (Gerenciador de Tarefas), Win+E (Explorador), Win+Shift+S (captura de tela), Ctrl+T (nova guia Edge), Ctrl+Win+D (nova área de trabalho virtual), Shift+Delete (exclui sem Lixeira).
Aero Snap: organiza janelas arrastando para bordas. Layout Snap (Win 11): até 4 janelas lado a lado.
Áreas de trabalho virtuais: separar tarefas em espaços.
Ferramentas embutidas: Paint (imagens simples), Bloco de Notas (texto puro), WordPad (formatação básica), Calculadora (Padrão, Científica, Programador, Conversor), Ferramenta de Captura, Edge, Lixeira, Windows Defender (antivírus embutido).

==== CONECTORES / CABOS ====
Vídeo: HDMI (imagem+som, padrão atual), DisplayPort (gamers, taxas altas, FreeSync/G-Sync), VGA (analógico, só imagem), DVI.
Rede: RJ45 (Ethernet com fio), Wi-Fi (sem fio; 2.4 GHz alcance vs 5 GHz velocidade).
USB: ver seção Periféricos.

==== SEGURANÇA DIGITAL ====
Phishing: e-mails/sites falsos para roubar senhas.
Senha forte: 12+ caracteres misturando maiúsculas, minúsculas, números, símbolos.
Backup: cópia de segurança.
Wi-Fi público: perigoso, evite bancos.
Windows Defender: antivírus embutido no Windows.

==== LÓGICA DE PROGRAMAÇÃO ====
Algoritmo: sequência de passos para resolver um problema.
Variável: caixinha que guarda um valor (pode mudar).
SE/SENÃO: estrutura de decisão.
Loop: repetição; loop infinito trava o programa.

==== EQUIPE PROJETA AULA ====
4 desenvolvedores: Gustavo, Max, Harry, José — todos do CETEP. Cards com link Instagram.
Perfis: Aluno e Professor (👨‍🏫 prof, 🎓 aluno no ranking).
Login: e-mail/senha e Google OAuth.
Quiz Infinito: errou volta do zero; "Parar e salvar pontos"; ranking guarda só recorde de cada usuário.
Tema: escuro com laranja/âmbar, glassmorphism.
`;
