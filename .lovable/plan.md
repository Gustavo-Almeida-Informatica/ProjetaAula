

# Plano: Alimentar Site com Apostilas + Sincronizar Quiz

## Resumo

Adicionar todo o conteudo das apostilas de Hardware e Windows 11 no site, e criar perguntas no quiz para cada tema adicionado. Total estimado: ~40 novas perguntas (chegando a ~120+).

---

## Novos conteudos a adicionar

### Hardware.tsx (novas secoes)
- **Gabinete**: desktop vs minitorre, formatos AT e ATX
- **Placa de Som**: converte digital/analogico
- **Placa de Rede (NIC)**: RJ45, par trancado, wireless
- **Placa Fax/Modem**: modulacao/demodulacao de sinais
- **Flat Cable**: cabos internos IDE/SATA
- **Teclado detalhado**: tipos de teclas (alfanumericas, funcao, controle), PS/2 vs USB vs wireless
- **Mouse detalhado**: optico, laser, clique duplo, scroll, drag and drop
- **Monitor**: LCD vs LED, resolucao, tamanho
- **Impressora detalhada**: matricial, jato de tinta, laser, termica
- **Scanner**: mesa vs mao, digitalizacao
- **Webcam**: CCD, conexao USB
- **Kit Multimidia**: caixas de som + microfone
- **BIOS/CMOS/POST detalhado**: chips PLCC, bateria, bips de erro (1 bip = OK, 2-4 = memoria, 8 = video, 9 = BIOS)
- **Interfaces**: Serial DB-9, Paralela DB-25, USB, SCSI, IDE, Master/Slave
- **Slots de barramento**: ISA (8/16 bits), PCI (33MHz), AGP (video dedicado), PCI Express
- **Chipsets**: ponte norte (CPU, RAM, video) e ponte sul (USB, audio, disco)
- **Memorias avancadas**: SDRAM, DDR2, DDR3, diferencas de velocidade
- **RAID**: conceito, niveis 0, 1, 5
- **Sistemas numericos**: binario, decimal, hexadecimal, bits/bytes/KB/MB/GB/TB

### Software.tsx (novas secoes na tab Windows)
- **Layout do Windows 11**: menu iniciar centralizado, barra de tarefas no centro
- **Aero Snap**: arrastar janela para extremidade para organizar tela
- **Layout Snap**: botao Maximizar com layouts predefinidos (ate 4 janelas)
- **Areas de trabalho virtuais**: Win+Tab, criar nova area, alternar com Ctrl+setas
- **Atalhos completos**: Alt+Tab (alternar janelas), Win+E (explorador), Win+Shift+S (captura)
- **Paint**: ferramentas basicas, Ctrl+Z desfaz, salvar projeto
- **Ferramenta de Captura**: Win+Shift+S, tipos (retangular, livre, janela, tela inteira)
- **WordPad**: digitacao, formatacao, Localizar e Substituir, inserir imagem/data
- **Bloco de Notas**: editor simples, extensao .txt
- **Sticky Notes**: notas autoadesivas, lembretes
- **Calculadora**: padrao, cientifica, conversor de unidades/moedas
- **Microsoft Edge**: navegador nativo, Ctrl+T nova guia, Ctrl+W fecha, Ctrl+Tab alterna

Nova tab "Explorador de Arquivos":
- **Layout do programa**: painel navegacao, barra classificacao
- **Selecao de arquivos**: clicar+arrastar, Ctrl+A, Shift+clique, Ctrl+clique
- **Lixeira**: esvaziar, restaurar, Shift+Delete (excluir permanentemente)
- **Copiar/Colar/Recortar**: metodos e atalhos
- **Pastas pessoais**: Documentos, Downloads, Imagens, Videos
- **Bibliotecas**: adicionar/remover locais

Nova tab "Manutencao":
- **Configuracoes do Windows**: Sistema, Personalizacao, Aplicativos, Contas
- **Disco Rigido e Unidades**: C:, D:, ferramentas
- **CCleaner**: limpeza de arquivos temporarios
- **Defraggler**: desfragmentacao de disco
- **Compactacao**: WinRAR, pasta compactada do Windows
- **Seguranca**: Windows Defender, atualizacao, Avast

### History.tsx (expandir timeline)
- Detalhar as 5 geracoes com dados das apostilas:
  - 1a: valvulas, ENIAC 27 ton, 18.000 valvulas, EDVAC 1952
  - 2a: transistores anos 50, 150kg, menor consumo
  - 3a: circuitos integrados 1959 Jack Kilby, Burroughs B-2500
  - 4a: VLSI, Atari 1972, ALTAIR 1974, Microsoft 1975, 286/386/486
  - 5a: ULSI, processadores paralelos, Dual-Core, i3/i5/i7

### quizData.ts (~40 novas perguntas)
Cada tema acima tera 1-2 perguntas. Exemplos:
- Gabinete: "O que e o gabinete do computador?" / "Qual formato de placa-mae e padrao atualmente?"
- BIOS bips: "O que significa 1 bip ao ligar o PC?" / "8 bips indicam problema em qual componente?"
- CMOS: "Para que serve a bateria da placa-mae?"
- Interfaces: "O que e a porta Serial DB-9?" / "Quantos perifericos o USB suporta simultaneamente?"
- Slots: "O que e o slot ISA?" / "Qual barramento substituiu o AGP?"
- Memorias: "Qual a diferenca entre DDR2 e DDR3?"
- RAID: "O que e RAID?"
- Binario: "Quantos bits formam 1 byte?" / "1 KB equivale a quantos bytes?"
- Aero Snap: "O que e o Aero Snap no Windows?"
- Layout Snap: "Quantas janelas o Layout Snap organiza?"
- Areas virtuais: "Qual atalho cria nova area de trabalho?"
- Paint: "Para que serve o Paint?"
- Captura: "Qual atalho faz captura de tela no Windows 11?"
- WordPad: "O que o WordPad faz?"
- Calculadora: "A calculadora do Windows tem modo cientifico?"
- Edge: "Qual atalho abre nova guia no Edge?"
- Lixeira: "O que Shift+Delete faz?" / "Como restaurar arquivo da Lixeira?"
- Selecao: "Qual tecla seleciona todos os arquivos?"
- CCleaner: "Para que serve o CCleaner?"
- Defraggler: "O que e desfragmentacao de disco?"
- Compactacao: "O que e compactar um arquivo?"
- Impressora tipos: "Qual tipo de impressora usa toner?"
- Scanner: "O que faz um scanner de mesa?"
- Placa de rede: "Qual conector a placa de rede usa?"
- Placa de som: "O que a placa de som faz?"
- Chipsets: "O que e a ponte norte do chipset?"

---

## Arquivos modificados

| Arquivo | Mudanca |
|---|---|
| `src/pages/Hardware.tsx` | +15 novas secoes (gabinete, interfaces, slots, RAID, binario, etc.) |
| `src/pages/Software.tsx` | +2 novas tabs + ~12 secoes (Win11, Paint, WordPad, Lixeira, CCleaner, etc.) |
| `src/pages/History.tsx` | Expandir timeline com 5 geracoes detalhadas |
| `src/lib/quizData.ts` | +40 perguntas novas (total ~120+) |

## O que NAO muda
- Visual/estilo atual (glass/ambar)
- Equipe, fotos, links
- Quiz logica (infinito, parar, leaderboard)
- Autenticacao, comunidade, perfil
- Conteudo existente (apenas adicoes)

