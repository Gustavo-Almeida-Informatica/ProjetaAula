// Concise summary of the textual content of the Projeta Aula site.
// Used to ground the AI when generating dynamic quiz questions so they
// stay strictly based on what the site actually teaches.
export const SITE_CORPUS = `
PROJETA AULA — Conteúdo educativo de informática (CETEP, Brasil). Linguagem acessível para iniciantes.

==== HARDWARE ====
CPU: cérebro do PC; mais GHz = mais rápido; núcleos; cache L1/L2/L3; precisa de cooler. Exemplos: Intel Core i3/i5/i7/i9, AMD Ryzen.
RAM: memória volátil (perde tudo ao desligar); DDR2, DDR3, DDR4, DDR5 (encaixes incompatíveis).
Armazenamento: HD (mecânico, lento), SSD (flash, rápido), NVMe (SSD M.2 ultrarrápido).
Placa-mãe: ATX padrão; soquete da CPU; slots PCIe; ponte norte (CPU/RAM/GPU) e ponte sul.
GPU: processa gráficos via PCIe.
Fonte: converte AC em DC; certificação 80 Plus (≥80% eficiência).
Cooler: dissipa calor da CPU.
Gabinete: ATX/Micro-ATX.
Placa de som; Placa de rede (RJ45, MAC único, Gigabit = 1 Gbps); Modem (Modulador/Demodulador).
BIOS/UEFI: faz POST; bateria CR2032 mantém configurações. POST: 1 bip = OK; 8 bips = placa de vídeo.
Slots: ISA (antigo 8/16 bits), PCI, AGP (vídeo antigo), PCI Express.
Serial DB-9 (mouse/modem antigo, 1 bit por vez); USB suporta até 127 dispositivos; IDE Master/Slave (cabo flat, substituído por SATA).
RAID 0 (velocidade), RAID 1 (espelhamento), RAID 5 (ambos).
1 byte = 8 bits; 1 KB = 1024 bytes; sistema binário.

==== PERIFÉRICOS ====
Entrada: Teclado (membrana/mecânico; PS/2 roxo, USB, Wireless), Mouse (óptico/laser; com/sem fio), Webcam (USB; 720p/1080p/4K), Microfone (P2/USB/BT), Scanner (mesa/mão; DPI).
Saída: Monitor (LCD/LED/OLED; HD/Full HD/4K; 60-240Hz), Impressora (matricial, jato de tinta, laser/toner, térmica, 3D, multifuncional), Caixas, Fones (headset = fone + mic), Projetor.
USB: USB-A (clássico), USB-B (quadrado, impressora), Mini USB (câmeras antigas), Micro USB (Android antigo), USB-C (reversível, moderno), USB 2.0 preto 480 Mbps vs USB 3.0 azul 5 Gbps (10x).

==== HISTÓRIA — 5 GERAÇÕES ====
1ª (1940-1955) Válvulas. ENIAC (1945): 27 t, 18.000 válvulas. EDVAC (1952).
2ª (1955-1965) Transistores (1947, Bell, Bardeen/Brattain/Shockley). COBOL, FORTRAN.
3ª (1965-1975) Circuitos integrados (Jack Kilby, 1958, Texas Instruments).
4ª (1975-1990) VLSI. ALTAIR 8800 (1974). Microsoft (1975, Gates+Allen). Apple II (1977). IBM PC (1981). 286→386→486. MS-DOS.
5ª (1990-hoje) ULSI; multicore (Dual/Quad/Octa). Intel Core i3/i5/i7/i9, AMD Ryzen. WWW (Tim Berners-Lee, 1991). Google (1998). iPhone (2007). Cloud, IA, IoT.

==== BRASIL NA COMPUTAÇÃO ====
Patinho Feio (1972): primeiro computador 100% brasileiro, USP.
COBRA (1974): primeira empresa brasileira de PCs.
Reserva de Mercado (1984-1992): proibia importar PCs.
Internet comercial no Brasil: 1995 (antes restrita à RNP).
Polo Industrial de Manaus.
Pix (2020): pagamentos instantâneos do BC, referência mundial.

==== SMARTPHONES ====
Motorola DynaTAC (1983): primeiro celular comercial, ~1 kg, US$ 3.995, 30 min de bateria.
Nokia 3310 (2000): Snake, 126M+ unidades.
BlackBerry (2003): popularizou e-mail no celular, QWERTY físico.
iPhone (2007): Steve Jobs, touch capacitivo, App Store (2008), iOS.
Android (2008): Google, baseado em Linux, >70% dos celulares.
5G (2019+): latência baixíssima, gigabit, IoT em massa.

==== IA GENERATIVA ====
Deep Blue (1997, IBM) venceu Garry Kasparov no xadrez.
AlphaGo (2016, DeepMind/Google) venceu campeão mundial de Go.
GPT-3 (2020, OpenAI): 175 bilhões de parâmetros.
ChatGPT (2022): 100M usuários em 2 meses (adoção mais rápida da história).
DALL-E, Midjourney, Stable Diffusion: geram imagens a partir de texto.
Gemini, GPT-4o (2024+): multimodais (texto+imagem+áudio+vídeo).

==== REDES SOCIAIS ====
ICQ, MSN Messenger (MSN desativado em 2014).
Orkut (2004-2014, Google) dominou no Brasil.
Facebook (2004, Mark Zuckerberg, Harvard): 3B+ usuários.
YouTube (2005, comprado pelo Google em 2006).
WhatsApp (2009, comprado pelo Facebook em 2014 por US$ 19 bi).
TikTok (2016): vídeos curtos, chinesa.

==== SOFTWARE ====
Navegadores: Chrome (Google), Firefox (Mozilla, privacidade), Edge (Microsoft, Chromium desde 2020), Safari (Apple).
Office: Word, Excel, PowerPoint. LibreOffice é alternativa gratuita.
Mídia: VLC (qualquer formato), KODI (central de mídia), Stremio, Spotube.
WinRAR: compactação RAR/ZIP.
Comunicação: WhatsApp Web, Discord, Telegram, Slack, Zoom, Google Meet.
Produtividade: Google Drive, Notion, Trello (kanban), Canva.
Jogos: Steam, Epic Games Store, Xbox Game Pass, Battle.net, Hydra.
Emuladores: Dolphin (GameCube/Wii), RetroArch, BlueStacks (Android), VirtualBox.
Captura/Vídeo: OBS Studio, ShareX, Shotcut, Audacity.
Utilitários: Bitwarden, Malwarebytes, Kaspersky Free, CCleaner, Revo Uninstaller, CPU-Z, PowerToys, f.lux, Twinkle Tray, dupeGuru, Anki, Klavaro, Scratch, Keyviz.
NUNCA desfragmente SSD.

==== WINDOWS 11 ====
Atalhos: Ctrl+C/V/X/Z/S/A/P, Alt+F4, Ctrl+Shift+Esc, Win+E, Win+Shift+S, Ctrl+T, Ctrl+Win+D, Shift+Delete.
Aero Snap; Layout Snap (até 4 janelas no Win 11); áreas de trabalho virtuais.
Embutidos: Paint, Bloco de Notas, WordPad (formatação básica), Calculadora (Padrão/Científica/Programador/Conversor), Ferramenta de Captura, Edge, Lixeira, Windows Defender.

==== CONECTORES ====
Vídeo: HDMI (imagem+som padrão), DisplayPort (gamers, FreeSync/G-Sync), VGA (analógico, só imagem), DVI.
Rede: RJ45 Ethernet; Wi-Fi 2.4 GHz (alcance) vs 5 GHz (velocidade).

==== SEGURANÇA ====
Phishing: e-mails/sites falsos roubam senhas.
Senha forte: 12+ caracteres mistos. Backup = cópia. Wi-Fi público é arriscado. Windows Defender é antivírus embutido.

==== LÓGICA ====
Algoritmo (passos), variável (caixinha), SE/SENÃO (decisão), Loop (repetição); loop infinito trava.

==== EQUIPE / SITE ====
4 devs: Gustavo, Max, Harry, José (CETEP). Perfis Aluno (🎓) e Professor (👨‍🏫). Login e-mail/senha + Google OAuth. Quiz Infinito: errou volta do zero. Ranking guarda só o recorde. Tema escuro com laranja/âmbar e glassmorphism.
`;
