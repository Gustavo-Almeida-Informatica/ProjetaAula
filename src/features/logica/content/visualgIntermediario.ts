import type { Lesson } from "../types";

export const visualgIntermediario: Lesson[] = [
  {
    id: "vg-i-01",
    track: "visualg",
    level: "intermediario",
    title: 'Estrutura condicional "se", "entao" e "senao"',
    objective: "Escolher entre dois caminhos usando uma comparação.",
    explanation: [
      "Uma decisão muda o caminho do programa. Para verificar se alguém pode votar pela regra simplificada deste exemplo, vamos comparar sua idade com 16.",
      'Depois de "se", escrevemos uma condição. Se ela for verdadeira, o programa executa o bloco depois de "entao". Caso contrário, executa o bloco depois de "senao".',
      'O comando "fimse" encerra a decisão. Apenas um dos dois blocos será executado. O operador >= inclui o limite: a idade 16 também atende à condição.',
    ],
    steps: [
      "Declare a idade como inteiro.",
      "Leia a idade informada.",
      "Compare a idade com 16.",
      "Escreva uma mensagem em cada caminho e feche com fimse.",
    ],
    code: `algoritmo "Idade para votar"
var
  idade: inteiro
inicio
  escreva("Idade: ")
  leia(idade)
  se idade >= 16 entao
    escreval("Pode votar.")
  senao
    escreval("Ainda nao pode votar.")
  fimse
fimalgoritmo`,
    codeParts: [
      { code: "leia(idade)", explanation: "Guarda a idade digitada." },
      { code: "se idade >= 16 entao", explanation: "Testa se a idade chegou ao limite." },
      {
        code: `senao
    escreval("Ainda nao pode votar.")
  fimse`,
        explanation: "Trata a condição falsa e encerra a decisão.",
      },
    ],
    sampleInput: ["15"],
    expectedOutput: "Idade: 15\nAinda nao pode votar.\n",
    exercise: {
      prompt: "Leia uma temperatura inteira. Mostre 'Calor' se ela for maior ou igual a 30 e 'Sem calor' nos demais casos.",
      hint: "Use uma comparação com >= e dois caminhos.",
      starterCode: `algoritmo "Temperatura"
var
  temperatura: inteiro
inicio
  leia(temperatura)
  // Acrescente a decisao.
  escreval("Temperatura lida: ", temperatura)
fimalgoritmo`,
      solution: `algoritmo "Temperatura"
var
  temperatura: inteiro
inicio
  leia(temperatura)
  se temperatura >= 30 entao
    escreval("Calor")
  senao
    escreval("Sem calor")
  fimse
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-02",
    track: "visualg",
    level: "intermediario",
    title: "Condições compostas",
    objective: "Combinar comparações para verificar intervalos e alternativas.",
    explanation: [
      "Uma condição composta reúne mais de uma comparação. Uma loja pode aceitar pedidos apenas quando a quantidade está dentro de um intervalo.",
      'Usamos "e" para exigir duas condições ao mesmo tempo. No exemplo, a quantidade deve ser maior ou igual a 1 e menor ou igual a 5. As duas pontas do intervalo são aceitas.',
      'Também podemos reconhecer valores fora do intervalo com "ou": quantidade < 1 ou quantidade > 5. Os parênteses ajudam a separar cada comparação e deixam a regra mais fácil de ler.',
    ],
    steps: [
      "Declare uma quantidade inteira.",
      "Leia a quantidade do pedido.",
      "Una as duas comparações com e.",
      "Informe se o pedido está dentro do intervalo permitido.",
    ],
    code: `algoritmo "Limite do pedido"
var
  quantidade: inteiro
inicio
  escreva("Quantidade: ")
  leia(quantidade)
  se (quantidade >= 1) e (quantidade <= 5) entao
    escreval("Pedido aceito.")
  senao
    escreval("Escolha de 1 a 5 unidades.")
  fimse
fimalgoritmo`,
    codeParts: [
      { code: "quantidade: inteiro", explanation: "Representa uma contagem de unidades." },
      {
        code: "(quantidade >= 1) e (quantidade <= 5)",
        explanation: "Exige que a quantidade respeite os dois limites.",
      },
      {
        code: 'escreval("Escolha de 1 a 5 unidades.")',
        explanation: "Orienta quem informou uma quantidade fora do intervalo.",
      },
    ],
    sampleInput: ["3"],
    expectedOutput: "Quantidade: 3\nPedido aceito.\n",
    exercise: {
      prompt: "Leia uma nota real. Mostre 'Nota valida' se estiver entre 0 e 10, incluindo os limites. Caso contrário, mostre 'Nota invalida'.",
      hint: "Teste o limite inferior e o superior com e.",
      starterCode: `algoritmo "Validar nota"
var
  nota: real
inicio
  leia(nota)
  // Verifique o intervalo.
  escreval("Nota: ", nota)
fimalgoritmo`,
      solution: `algoritmo "Validar nota"
var
  nota: real
inicio
  leia(nota)
  se (nota >= 0) e (nota <= 10) entao
    escreval("Nota valida")
  senao
    escreval("Nota invalida")
  fimse
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-03",
    track: "visualg",
    level: "intermediario",
    title: 'Estrutura "escolha" e "caso"',
    objective: "Selecionar uma ação entre opções com valores definidos.",
    explanation: [
      'Quando uma variável pode conter opções conhecidas, "escolha" organiza a decisão. Um pequeno cardápio pode usar 1 para água e 2 para suco.',
      'Cada "caso" informa qual valor ativa aquele bloco. A escolha compara o valor da variável com as opções e executa apenas o caso correspondente.',
      'O bloco "outrocaso" atende valores não previstos. Termine com "fimescolha". Para intervalos ou regras com várias comparações, prefira a estrutura se.',
    ],
    steps: [
      "Apresente as opções do cardápio.",
      "Leia um código inteiro.",
      "Crie um caso para cada bebida.",
      "Use outrocaso para códigos desconhecidos.",
    ],
    code: `algoritmo "Bebidas"
var
  opcao: inteiro
inicio
  escreval("1 - Agua | 2 - Suco")
  leia(opcao)
  escolha opcao
    caso 1
      escreval("Agua escolhida.")
    caso 2
      escreval("Suco escolhido.")
    outrocaso
      escreval("Opcao invalida.")
  fimescolha
fimalgoritmo`,
    codeParts: [
      { code: "escolha opcao", explanation: "Usa o código lido para selecionar um caminho." },
      {
        code: `caso 2
      escreval("Suco escolhido.")`,
        explanation: "Executa esta mensagem quando a opção vale 2.",
      },
      {
        code: `outrocaso
      escreval("Opcao invalida.")`,
        explanation: "Atende qualquer valor diferente de 1 e 2.",
      },
    ],
    sampleInput: ["2"],
    expectedOutput: "1 - Agua | 2 - Suco\n2\nSuco escolhido.\n",
    exercise: {
      prompt: "Leia um código: 1 representa caminhada e 2 representa bicicleta. Mostre 'Caminhada', 'Bicicleta' ou 'Codigo invalido' usando escolha.",
      hint: "Crie dois casos e um outrocaso.",
      starterCode: `algoritmo "Atividade"
var
  codigo: inteiro
inicio
  leia(codigo)
  // Acrescente a escolha.
  escreval("Codigo: ", codigo)
fimalgoritmo`,
      solution: `algoritmo "Atividade"
var
  codigo: inteiro
inicio
  leia(codigo)
  escolha codigo
    caso 1
      escreval("Caminhada")
    caso 2
      escreval("Bicicleta")
    outrocaso
      escreval("Codigo invalido")
  fimescolha
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-04",
    track: "visualg",
    level: "intermediario",
    title: 'Operadores lógicos "e", "ou" e "nao" em decisões',
    objective: "Aplicar operadores lógicos a uma regra de acesso.",
    explanation: [
      "Variáveis do tipo logico guardam verdadeiro ou falso. Elas podem representar situações como ter ingresso, estar na lista ou ter um bloqueio.",
      'O operador "ou" exige pelo menos uma condição verdadeira. O operador "e" exige que as duas sejam verdadeiras. Já "nao" inverte o valor lógico.',
      "Neste exemplo, a pessoa precisa ter ingresso ou estar na lista, mas não pode estar bloqueada. Os parênteses agrupam as alternativas antes de combinar o resultado com a ausência de bloqueio.",
    ],
    steps: [
      "Declare três variáveis lógicas.",
      "Defina a situação de uma pessoa.",
      "Agrupe ingresso ou lista entre parênteses.",
      "Exija também nao bloqueado e mostre a decisão.",
    ],
    code: `algoritmo "Entrada no evento"
var
  ingresso, lista, bloqueado: logico
inicio
  ingresso <- falso
  lista <- verdadeiro
  bloqueado <- falso
  se (ingresso ou lista) e (nao bloqueado) entao
    escreval("Entrada liberada.")
  senao
    escreval("Entrada negada.")
  fimse
fimalgoritmo`,
    codeParts: [
      { code: "ingresso, lista, bloqueado: logico", explanation: "Declara estados de verdadeiro ou falso." },
      { code: "ingresso ou lista", explanation: "Aceita qualquer uma das duas formas de autorização." },
      { code: "(nao bloqueado)", explanation: "Só fica verdadeiro quando não existe bloqueio." },
    ],
    sampleInput: [],
    expectedOutput: "Entrada liberada.\n",
    exercise: {
      prompt: "Defina cadastrado como verdadeiro e suspenso como falso. Use e e nao para mostrar 'Pode reservar' somente se houver cadastro e não houver suspensão. Caso contrário, mostre 'Reserva negada'.",
      hint: "A condição pode ser cadastrado e (nao suspenso).",
      starterCode: `algoritmo "Reserva"
var
  cadastrado, suspenso: logico
inicio
  cadastrado <- verdadeiro
  suspenso <- falso
  // Acrescente a regra de reserva.
  escreval("Cadastro: ", cadastrado)
fimalgoritmo`,
      solution: `algoritmo "Reserva"
var
  cadastrado, suspenso: logico
inicio
  cadastrado <- verdadeiro
  suspenso <- falso
  se cadastrado e (nao suspenso) entao
    escreval("Pode reservar")
  senao
    escreval("Reserva negada")
  fimse
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-05",
    track: "visualg",
    level: "intermediario",
    title: 'Estrutura de repetição "para"',
    objective: "Repetir uma tarefa uma quantidade conhecida de vezes.",
    explanation: [
      'Use "para" quando souber quantas repetições deseja fazer. Para imprimir três etiquetas, podemos percorrer os números de 1 até 3.',
      "A variável de controle precisa ser inteira. Ela recebe o valor inicial e avança automaticamente a cada repetição. Sem passo explícito, o avanço é de uma unidade.",
      'O limite final também participa da repetição. O bloco termina em "fimpara". Não altere a variável de controle dentro do bloco: deixe o próprio laço cuidar do avanço.',
    ],
    steps: [
      "Declare o índice i como inteiro.",
      "Inicie o para em 1 e termine em 3.",
      "Mostre o número da etiqueta dentro do laço.",
      "Encerre a repetição com fimpara.",
    ],
    code: `algoritmo "Etiquetas"
var
  i: inteiro
inicio
  para i de 1 ate 3 faca
    escreval("Etiqueta ", i)
  fimpara
fimalgoritmo`,
    codeParts: [
      { code: "i: inteiro", explanation: "Declara o índice usado pelo para." },
      { code: "para i de 1 ate 3 faca", explanation: "Percorre 1, 2 e 3, nessa ordem." },
      { code: 'escreval("Etiqueta ", i)', explanation: "Repete a mensagem com o índice atual." },
    ],
    sampleInput: [],
    expectedOutput: "Etiqueta 1\nEtiqueta 2\nEtiqueta 3\n",
    exercise: {
      prompt: "Use para para mostrar os números pares de 2 até 10, um por linha.",
      hint: "Use passo 2 para avançar de dois em dois.",
      starterCode: `algoritmo "Pares"
var
  i: inteiro
inicio
  // Acrescente um para com passo 2.
  escreval("Pares de 2 a 10")
fimalgoritmo`,
      solution: `algoritmo "Pares"
var
  i: inteiro
inicio
  para i de 2 ate 10 passo 2 faca
    escreval(i)
  fimpara
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-06",
    track: "visualg",
    level: "intermediario",
    title: 'Estrutura de repetição "enquanto"',
    objective: "Repetir comandos enquanto uma condição continuar verdadeira.",
    explanation: [
      'O "enquanto" testa a condição antes de executar o bloco. Se ela já começar falsa, o bloco não será executado nenhuma vez.',
      "Vamos simular um estoque de três unidades. Enquanto houver estoque, o programa informa a quantidade disponível e retira uma unidade.",
      "A atualização do estoque faz a repetição terminar. Sem ela, a condição continuaria verdadeira e o programa entraria em um laço infinito. Sempre identifique o que aproxima o laço do fim.",
    ],
    steps: [
      "Declare e inicialize o estoque com 3.",
      "Teste se o estoque é maior que zero.",
      "Mostre a quantidade disponível.",
      "Diminua o estoque e feche com fimenquanto.",
    ],
    code: `algoritmo "Baixa de estoque"
var
  estoque: inteiro
inicio
  estoque <- 3
  enquanto estoque > 0 faca
    escreval("Disponiveis: ", estoque)
    estoque <- estoque - 1
  fimenquanto
  escreval("Estoque vazio.")
fimalgoritmo`,
    codeParts: [
      { code: "enquanto estoque > 0 faca", explanation: "Só permite repetir enquanto houver unidades." },
      { code: "estoque <- estoque - 1", explanation: "Retira uma unidade e aproxima o laço do fim." },
      { code: 'escreval("Estoque vazio.")', explanation: "Executa depois que a repetição termina." },
    ],
    sampleInput: [],
    expectedOutput: "Disponiveis: 3\nDisponiveis: 2\nDisponiveis: 1\nEstoque vazio.\n",
    exercise: {
      prompt: "Use enquanto para mostrar uma contagem de 5 até 1. Ao terminar, mostre 'Partiu!'.",
      hint: "Comece em 5, teste > 0 e diminua uma unidade a cada volta.",
      starterCode: `algoritmo "Contagem"
var
  numero: inteiro
inicio
  numero <- 5
  // Acrescente a repeticao.
  escreval("Partiu!")
fimalgoritmo`,
      solution: `algoritmo "Contagem"
var
  numero: inteiro
inicio
  numero <- 5
  enquanto numero > 0 faca
    escreval(numero)
    numero <- numero - 1
  fimenquanto
  escreval("Partiu!")
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-07",
    track: "visualg",
    level: "intermediario",
    title: 'Estrutura "repita" e "ate"',
    objective: "Validar uma entrada repetindo a leitura até ela ser aceita.",
    explanation: [
      'O bloco "repita" executa antes de testar a condição. Por isso, ele sempre roda pelo menos uma vez. É uma boa opção quando precisamos ler um valor antes de validá-lo.',
      'Depois de "ate", escrevemos a condição de parada. Aqui, a leitura termina quando a quantidade fica maior que zero. Se a condição for falsa, o bloco será repetido.',
      'A diferença para "enquanto" é importante: enquanto repete com condição verdadeira; repita encerra com condição verdadeira. Uma mensagem antes da leitura ajuda a pessoa a corrigir a entrada.',
    ],
    steps: [
      "Declare a quantidade inteira.",
      "Abra um bloco repita.",
      "Peça e leia uma quantidade positiva.",
      "Pare quando quantidade > 0 e confirme o valor.",
    ],
    code: `algoritmo "Quantidade positiva"
var
  quantidade: inteiro
inicio
  repita
    escreva("Quantidade positiva: ")
    leia(quantidade)
  ate quantidade > 0
  escreval("Aceita: ", quantidade)
fimalgoritmo`,
    codeParts: [
      {
        code: `repita
    escreva("Quantidade positiva: ")
    leia(quantidade)`,
        explanation: "Pede um valor pelo menos uma vez.",
      },
      { code: "ate quantidade > 0", explanation: "Encerra somente quando o valor é positivo." },
      { code: 'escreval("Aceita: ", quantidade)', explanation: "Confirma a entrada validada." },
    ],
    sampleInput: ["0", "3"],
    expectedOutput: "Quantidade positiva: 0\nQuantidade positiva: 3\nAceita: 3\n",
    exercise: {
      prompt: "Leia uma nota real até ela estar entre 0 e 10, incluindo os limites. Depois, mostre 'Nota aceita'.",
      hint: "A condição depois de ate deve exigir os dois limites com e.",
      starterCode: `algoritmo "Ler nota"
var
  nota: real
inicio
  leia(nota)
  // Coloque a leitura em uma repeticao de validacao.
  escreval("Nota lida: ", nota)
fimalgoritmo`,
      solution: `algoritmo "Ler nota"
var
  nota: real
inicio
  repita
    escreva("Nota de 0 a 10: ")
    leia(nota)
  ate (nota >= 0) e (nota <= 10)
  escreval("Nota aceita")
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-08",
    track: "visualg",
    level: "intermediario",
    title: "Contadores e acumuladores",
    objective: "Contar ocorrências e somar valores durante uma repetição.",
    explanation: [
      "Um contador registra quantas vezes algo aconteceu. Um acumulador guarda uma soma que cresce a cada novo valor. Ambos precisam começar com um valor conhecido, normalmente zero.",
      "Vamos ler três gastos. O acumulador total recebe o valor anterior mais o gasto atual. Um contador separado registra apenas os gastos maiores que 10.",
      "O índice i controla as três leituras, mas não substitui o contador da condição. Ao final, o total mostra quanto foi gasto e o contador mostra quantos gastos passaram do limite.",
    ],
    steps: [
      "Declare índice, contador, gasto e total.",
      "Inicialize total e contador com zero.",
      "Leia três gastos usando para.",
      "Some cada gasto e conte os que forem maiores que 10.",
      "Mostre os dois resultados depois do laço.",
    ],
    code: `algoritmo "Resumo de gastos"
var
  i, acima: inteiro
  gasto, total: real
inicio
  total <- 0
  acima <- 0
  para i de 1 ate 3 faca
    leia(gasto)
    total <- total + gasto
    se gasto > 10 entao
      acima <- acima + 1
    fimse
  fimpara
  escreval("Total: ", total)
  escreval("Gastos acima de 10: ", acima)
fimalgoritmo`,
    codeParts: [
      {
        code: `total <- 0
  acima <- 0`,
        explanation: "Prepara o acumulador e o contador antes das leituras.",
      },
      { code: "total <- total + gasto", explanation: "Acrescenta o gasto à soma anterior." },
      {
        code: `se gasto > 10 entao
      acima <- acima + 1
    fimse`,
        explanation: "Conta somente os gastos que passam de 10.",
      },
    ],
    sampleInput: ["8", "12", "15"],
    expectedOutput: "8\n12\n15\nTotal: 35\nGastos acima de 10: 2\n",
    exercise: {
      prompt: "Leia quatro números inteiros. Mostre a soma deles e quantos são positivos. Zero não conta como positivo.",
      hint: "Some todos os valores, mas só aumente o contador quando numero > 0.",
      starterCode: `algoritmo "Resumo de numeros"
var
  i, numero, soma, positivos: inteiro
inicio
  soma <- 0
  positivos <- 0
  // Leia quatro numeros e atualize os resultados.
  escreval("Soma: ", soma)
  escreval("Positivos: ", positivos)
fimalgoritmo`,
      solution: `algoritmo "Resumo de numeros"
var
  i, numero, soma, positivos: inteiro
inicio
  soma <- 0
  positivos <- 0
  para i de 1 ate 4 faca
    leia(numero)
    soma <- soma + numero
    se numero > 0 entao
      positivos <- positivos + 1
    fimse
  fimpara
  escreval("Soma: ", soma)
  escreval("Positivos: ", positivos)
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-09",
    track: "visualg",
    level: "intermediario",
    title: "Vetores",
    objective: "Guardar e percorrer vários valores do mesmo tipo.",
    explanation: [
      "Um vetor reúne várias posições sob um único nome. Pense em três caixas numeradas, cada uma guardando uma nota. O índice informa qual caixa queremos acessar.",
      "A declaração vetor[1..3] de real cria três posições: notas[1], notas[2] e notas[3]. Todas guardam valores reais. Um índice fora desses limites não é uma posição válida.",
      "No primeiro laço, lemos e guardamos as notas. No segundo, recuperamos os valores e calculamos a soma. Isso mostra a vantagem do vetor: os dados continuam disponíveis depois da leitura.",
    ],
    steps: [
      "Declare um vetor de três notas reais.",
      "Use um índice inteiro para preencher as posições.",
      "Percorra novamente o vetor para somar as notas.",
      "Divida a soma por 3 e mostre a média.",
    ],
    code: `algoritmo "Notas guardadas"
var
  notas: vetor[1..3] de real
  i: inteiro
  soma: real
inicio
  para i de 1 ate 3 faca
    leia(notas[i])
  fimpara
  soma <- 0
  para i de 1 ate 3 faca
    soma <- soma + notas[i]
  fimpara
  escreval("Media: ", soma / 3)
fimalgoritmo`,
    codeParts: [
      { code: "notas: vetor[1..3] de real", explanation: "Reserva três posições para notas reais." },
      { code: "leia(notas[i])", explanation: "Guarda a entrada na posição indicada por i." },
      { code: "soma <- soma + notas[i]", explanation: "Recupera a nota de cada posição para somar." },
    ],
    sampleInput: ["6", "9", "9"],
    expectedOutput: "6\n9\n9\nMedia: 8\n",
    exercise: {
      prompt: "Leia três números inteiros em um vetor. Depois, mostre os valores na ordem inversa, um por linha.",
      hint: "Preencha de 1 até 3 e percorra de 3 até 1 com passo -1.",
      starterCode: `algoritmo "Ordem inversa"
var
  numeros: vetor[1..3] de inteiro
  i: inteiro
inicio
  para i de 1 ate 3 faca
    leia(numeros[i])
  fimpara
  // Mostre as posicoes em ordem inversa.
fimalgoritmo`,
      solution: `algoritmo "Ordem inversa"
var
  numeros: vetor[1..3] de inteiro
  i: inteiro
inicio
  para i de 1 ate 3 faca
    leia(numeros[i])
  fimpara
  para i de 3 ate 1 passo -1 faca
    escreval(numeros[i])
  fimpara
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-10",
    track: "visualg",
    level: "intermediario",
    title: "Matrizes",
    objective: "Organizar valores em linhas e colunas usando dois índices.",
    explanation: [
      "Uma matriz organiza dados como uma pequena tabela. Para localizar uma posição, usamos dois índices: primeiro a linha, depois a coluna.",
      "A declaração vetor[1..2,1..2] de inteiro cria duas linhas e duas colunas. A posição vendas[2,1] fica na segunda linha e na primeira coluna.",
      "Dois laços encaixados percorrem a tabela inteira. Para cada linha, o laço interno visita todas as colunas. Neste exemplo, as linhas representam dias e as colunas representam produtos.",
    ],
    steps: [
      "Declare uma matriz inteira de duas linhas e duas colunas.",
      "Declare os índices linha e coluna.",
      "Leia cada posição usando dois laços.",
      "Some cada valor lido ao total.",
      "Mostre o total depois de terminar os dois laços.",
    ],
    code: `algoritmo "Tabela de vendas"
var
  vendas: vetor[1..2,1..2] de inteiro
  linha, coluna, total: inteiro
inicio
  total <- 0
  para linha de 1 ate 2 faca
    para coluna de 1 ate 2 faca
      leia(vendas[linha,coluna])
      total <- total + vendas[linha,coluna]
    fimpara
  fimpara
  escreval("Unidades vendidas: ", total)
fimalgoritmo`,
    codeParts: [
      { code: "vendas: vetor[1..2,1..2] de inteiro", explanation: "Cria uma tabela com quatro posições." },
      {
        code: `para linha de 1 ate 2 faca
    para coluna de 1 ate 2 faca`,
        explanation: "Percorre todas as colunas de cada linha.",
      },
      { code: "vendas[linha,coluna]", explanation: "Acessa a posição indicada pelos dois índices." },
    ],
    sampleInput: ["2", "3", "4", "1"],
    expectedOutput: "2\n3\n4\n1\nUnidades vendidas: 10\n",
    exercise: {
      prompt: "Leia os quatro valores de uma matriz inteira 2 por 2. Mostre a soma da diagonal principal: posições [1,1] e [2,2].",
      hint: "Depois de preencher a matriz, some apenas as posições com os dois índices iguais.",
      starterCode: `algoritmo "Diagonal"
var
  m: vetor[1..2,1..2] de inteiro
  linha, coluna: inteiro
inicio
  para linha de 1 ate 2 faca
    para coluna de 1 ate 2 faca
      leia(m[linha,coluna])
    fimpara
  fimpara
  // Mostre a soma da diagonal principal.
fimalgoritmo`,
      solution: `algoritmo "Diagonal"
var
  m: vetor[1..2,1..2] de inteiro
  linha, coluna: inteiro
inicio
  para linha de 1 ate 2 faca
    para coluna de 1 ate 2 faca
      leia(m[linha,coluna])
    fimpara
  fimpara
  escreval("Diagonal: ", m[1,1] + m[2,2])
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-11",
    track: "visualg",
    level: "intermediario",
    title: "Procedimentos e funções",
    objective: "Separar tarefas em subrotinas e distinguir ação de resultado.",
    explanation: [
      "Uma subrotina reúne comandos para uma tarefa específica. Assim, podemos dar um nome à tarefa e chamá-la sem repetir seus comandos no programa principal.",
      'Um procedimento executa uma ação, como mostrar um cabeçalho. Uma função devolve um valor com "retorne". Esse valor pode ser guardado em uma variável ou usado em uma expressão.',
      "As subrotinas ficam depois das declarações globais e antes do inicio principal. No exemplo, o procedimento apresenta o programa e a função calcula o dobro de um inteiro. O tipo escrito após os parâmetros da função indica o tipo do resultado.",
    ],
    steps: [
      "Declare a variável que receberá o resultado.",
      "Crie um procedimento para mostrar o cabeçalho.",
      "Crie uma função inteira que retorne o dobro.",
      "Chame o procedimento no programa principal.",
      "Guarde o retorno da função e mostre o resultado.",
    ],
    code: `algoritmo "Subrotinas"
var
  resultado: inteiro

procedimento cabecalho()
inicio
  escreval("Calculadora de dobro")
fimprocedimento

funcao dobro(numero: inteiro): inteiro
inicio
  retorne numero * 2
fimfuncao

inicio
  cabecalho()
  resultado <- dobro(4)
  escreval("Dobro: ", resultado)
fimalgoritmo`,
    codeParts: [
      {
        code: `procedimento cabecalho()
inicio
  escreval("Calculadora de dobro")
fimprocedimento`,
        explanation: "Define uma ação que apenas apresenta uma mensagem.",
      },
      {
        code: `funcao dobro(numero: inteiro): inteiro
inicio
  retorne numero * 2
fimfuncao`,
        explanation: "Define um cálculo que devolve um resultado inteiro.",
      },
      { code: "resultado <- dobro(4)", explanation: "Chama a função e guarda o valor retornado." },
    ],
    sampleInput: [],
    expectedOutput: "Calculadora de dobro\nDobro: 8\n",
    exercise: {
      prompt: "Crie um procedimento que mostre 'Calculadora de triplo' e uma função triplo que receba um inteiro e retorne seu triplo. Chame ambos usando o número 5.",
      hint: "O procedimento escreve; a função retorna numero * 3.",
      starterCode: `algoritmo "Triplo"
var
  resultado: inteiro

funcao triplo(numero: inteiro): inteiro
inicio
  // Substitua pelo calculo do triplo.
  retorne numero
fimfuncao

inicio
  resultado <- triplo(5)
  escreval("Triplo: ", resultado)
fimalgoritmo`,
      solution: `algoritmo "Triplo"
var
  resultado: inteiro

procedimento cabecalho()
inicio
  escreval("Calculadora de triplo")
fimprocedimento

funcao triplo(numero: inteiro): inteiro
inicio
  retorne numero * 3
fimfuncao

inicio
  cabecalho()
  resultado <- triplo(5)
  escreval("Triplo: ", resultado)
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-12",
    track: "visualg",
    level: "intermediario",
    title: "Parâmetros por valor e por referência",
    objective: 'Distinguir cópias de valores e alterações na variável original com "var".',
    explanation: [
      "Um parâmetro permite enviar dados para uma subrotina. Na passagem por valor, o parâmetro recebe uma cópia. Alterar essa cópia não altera a variável usada na chamada.",
      'Na passagem por referência, escrevemos "var" antes do parâmetro. Ele passa a representar a variável original. Uma atribuição dentro da subrotina também modifica essa variável fora dela.',
      "O exemplo chama duas versões de um aumento. A primeira muda apenas a cópia; a segunda muda o saldo original. Ao chamar um parâmetro por referência, envie uma variável compatível, não uma conta ou um número solto.",
    ],
    steps: [
      "Declare um saldo inteiro e inicie com 10.",
      "Crie um procedimento com parâmetro por valor.",
      "Crie outro procedimento com parâmetro var.",
      "Chame a versão por valor e mostre o saldo.",
      "Chame a versão por referência e compare o resultado.",
    ],
    code: `algoritmo "Valor e referencia"
var
  saldo: inteiro

procedimento aumentarCopia(valor: inteiro)
inicio
  valor <- valor + 5
fimprocedimento

procedimento aumentarOriginal(var valor: inteiro)
inicio
  valor <- valor + 5
fimprocedimento

inicio
  saldo <- 10
  aumentarCopia(saldo)
  escreval("Depois da copia: ", saldo)
  aumentarOriginal(saldo)
  escreval("Depois da referencia: ", saldo)
fimalgoritmo`,
    codeParts: [
      {
        code: "procedimento aumentarCopia(valor: inteiro)",
        explanation: "Recebe uma cópia do saldo, sem modificar a variável original.",
      },
      {
        code: "procedimento aumentarOriginal(var valor: inteiro)",
        explanation: "Usa var para permitir a alteração do saldo original.",
      },
      {
        code: `aumentarOriginal(saldo)
  escreval("Depois da referencia: ", saldo)`,
        explanation: "Altera o saldo e mostra o efeito fora do procedimento.",
      },
    ],
    sampleInput: [],
    expectedOutput: "Depois da copia: 10\nDepois da referencia: 15\n",
    exercise: {
      prompt: "Crie um procedimento troca com dois parâmetros inteiros por referência. Use uma variável local auxiliar para trocar x = 2 e y = 7. Mostre os valores após a troca.",
      hint: "Guarde a em auxiliar antes de substituir a por b.",
      starterCode: `algoritmo "Trocar valores"
var
  x, y: inteiro

procedimento troca(var a, b: inteiro)
inicio
  // Acrescente uma variavel local e realize a troca.
fimprocedimento

inicio
  x <- 2
  y <- 7
  troca(x, y)
  escreval("x: ", x)
  escreval("y: ", y)
fimalgoritmo`,
      solution: `algoritmo "Trocar valores"
var
  x, y: inteiro

procedimento troca(var a, b: inteiro)
var
  auxiliar: inteiro
inicio
  auxiliar <- a
  a <- b
  b <- auxiliar
fimprocedimento

inicio
  x <- 2
  y <- 7
  troca(x, y)
  escreval("x: ", x)
  escreval("y: ", y)
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-13",
    track: "visualg",
    level: "intermediario",
    title: "Algoritmos do cotidiano: troco e conta de luz",
    objective: "Traduzir situações comuns em entradas, cálculos e decisões.",
    explanation: [
      "Para resolver um problema do cotidiano, primeiro separe os dados de entrada e o resultado desejado. No troco, precisamos do valor da compra e do pagamento. A diferença só é um troco válido quando o pagamento cobre a compra.",
      "Uma estimativa de conta de luz pode multiplicar o consumo em kWh pela tarifa e somar uma taxa fixa. Aqui usamos tarifa fictícia de 0.75 por kWh e taxa de 5. Uma conta real pode incluir impostos e outras cobranças.",
      "O exemplo recebe valores não negativos e resolve as duas situações. Se faltar dinheiro, informa a diferença. Depois calcula a conta estimada. Em aplicações financeiras reais, também é preciso definir regras de arredondamento.",
    ],
    steps: [
      "Declare os valores monetários e o consumo como reais.",
      "Leia compra e pagamento.",
      "Mostre o troco ou o valor que falta.",
      "Leia o consumo em kWh.",
      "Calcule consumo vezes 0.75 mais 5 e mostre a estimativa.",
    ],
    code: `algoritmo "Contas do dia"
var
  compra, pagamento, consumo, conta: real
inicio
  escreva("Compra: ")
  leia(compra)
  escreva("Pagamento: ")
  leia(pagamento)
  se pagamento >= compra entao
    escreval("Troco: ", pagamento - compra)
  senao
    escreval("Faltam: ", compra - pagamento)
  fimse
  escreva("Consumo em kWh: ")
  leia(consumo)
  conta <- consumo * 0.75 + 5
  escreval("Conta estimada: ", conta)
fimalgoritmo`,
    codeParts: [
      { code: "se pagamento >= compra entao", explanation: "Verifica se o pagamento cobre a compra." },
      { code: 'escreval("Troco: ", pagamento - compra)', explanation: "Calcula quanto deve ser devolvido." },
      { code: "conta <- consumo * 0.75 + 5", explanation: "Aplica a tarifa fictícia e acrescenta a taxa fixa." },
    ],
    sampleInput: ["18.5", "20", "100"],
    expectedOutput: "Compra: 18.5\nPagamento: 20\nTroco: 1.5\nConsumo em kWh: 100\nConta estimada: 80\n",
    exercise: {
      prompt: "Leia um consumo real não negativo. Calcule a conta com tarifa fictícia de 0.8 por kWh e taxa fixa de 6. Leia o pagamento e mostre o troco ou quanto falta.",
      hint: "Primeiro calcule conta <- consumo * 0.8 + 6. Depois compare pagamento com conta.",
      starterCode: `algoritmo "Pagar conta"
var
  consumo, conta, pagamento: real
inicio
  leia(consumo)
  leia(pagamento)
  conta <- 0
  // Calcule a conta e verifique o pagamento.
  escreval("Conta: ", conta)
fimalgoritmo`,
      solution: `algoritmo "Pagar conta"
var
  consumo, conta, pagamento: real
inicio
  leia(consumo)
  conta <- consumo * 0.8 + 6
  escreval("Conta: ", conta)
  leia(pagamento)
  se pagamento >= conta entao
    escreval("Troco: ", pagamento - conta)
  senao
    escreval("Faltam: ", conta - pagamento)
  fimse
fimalgoritmo`,
    },
  },
  {
    id: "vg-i-14",
    track: "visualg",
    level: "intermediario",
    title: "Pequenos programas: menu com escolha, repita e função",
    objective: "Integrar um menu repetido, decisões e uma função de cálculo.",
    explanation: [
      "Um pequeno programa pode oferecer ações por meio de um menu. O laço repita apresenta o menu pelo menos uma vez e permite escolher outra ação depois de concluir um cálculo.",
      "A estrutura escolha encaminha cada opção para seu bloco. Aqui, 1 calcula o dobro, 0 encerra e qualquer outro valor mostra uma mensagem de erro. A condição ate opcao = 0 determina a saída.",
      "A função dobro fica responsável apenas pelo cálculo. O programa principal cuida das leituras e mensagens. Essa divisão facilita incluir novas opções e testar cada parte separadamente.",
    ],
    steps: [
      "Declare a opção e o número como inteiros.",
      "Crie uma função que calcule o dobro.",
      "Abra um repita e apresente o menu.",
      "Use escolha para calcular, sair ou avisar sobre uma opção inválida.",
      "Encerre o laço quando a opção for zero.",
    ],
    code: `algoritmo "Menu de calculos"
var
  opcao, numero: inteiro

funcao dobro(valor: inteiro): inteiro
inicio
  retorne valor * 2
fimfuncao

inicio
  repita
    escreval("1 - Dobro | 0 - Sair")
    leia(opcao)
    escolha opcao
      caso 1
        escreva("Numero: ")
        leia(numero)
        escreval("Resultado: ", dobro(numero))
      caso 0
        escreval("Ate logo!")
      outrocaso
        escreval("Opcao invalida.")
    fimescolha
  ate opcao = 0
fimalgoritmo`,
    codeParts: [
      {
        code: `funcao dobro(valor: inteiro): inteiro
inicio
  retorne valor * 2
fimfuncao`,
        explanation: "Isola o cálculo e devolve um valor inteiro.",
      },
      {
        code: `caso 1
        escreva("Numero: ")
        leia(numero)
        escreval("Resultado: ", dobro(numero))`,
        explanation: "Lê um número e usa a função quando a opção é 1.",
      },
      { code: "ate opcao = 0", explanation: "Mantém o menu em funcionamento até a opção de saída." },
    ],
    sampleInput: ["1", "4", "0"],
    expectedOutput: "1 - Dobro | 0 - Sair\n1\nNumero: 4\nResultado: 8\n1 - Dobro | 0 - Sair\n0\nAte logo!\n",
    exercise: {
      prompt: "Crie um menu com 1 para calcular o quadrado de um inteiro e 0 para sair. Use uma função quadrado, escolha e repita. Para outras opções, mostre 'Opcao invalida.'.",
      hint: "A função retorna valor * valor. Leia o número somente no caso 1 e pare com ate opcao = 0.",
      starterCode: `algoritmo "Menu de quadrados"
var
  opcao, numero: inteiro

funcao quadrado(valor: inteiro): inteiro
inicio
  // Substitua pelo calculo do quadrado.
  retorne valor
fimfuncao

inicio
  repita
    escreval("1 - Quadrado | 0 - Sair")
    leia(opcao)
    // Acrescente a escolha e a chamada da funcao.
  ate opcao = 0
fimalgoritmo`,
      solution: `algoritmo "Menu de quadrados"
var
  opcao, numero: inteiro

funcao quadrado(valor: inteiro): inteiro
inicio
  retorne valor * valor
fimfuncao

inicio
  repita
    escreval("1 - Quadrado | 0 - Sair")
    leia(opcao)
    escolha opcao
      caso 1
        escreva("Numero: ")
        leia(numero)
        escreval("Resultado: ", quadrado(numero))
      caso 0
        escreval("Ate logo!")
      outrocaso
        escreval("Opcao invalida.")
    fimescolha
  ate opcao = 0
fimalgoritmo`,
    },
  },
];
