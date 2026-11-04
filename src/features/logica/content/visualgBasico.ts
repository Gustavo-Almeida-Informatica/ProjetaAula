import type { Lesson } from "../types";

export const visualgBasico: Lesson[] = [
  {
    id: "vg-b-01",
    track: "visualg",
    level: "basico",
    title: "O que é lógica de programação?",
    objective: "Organizar instruções em uma sequência que resolva um problema.",
    explanation: [
      "Lógica de programação é organizar o raciocínio para resolver um problema por meio de instruções. Pense em preparar um pão com queijo: primeiro você abre o pão, depois coloca o queijo e, por fim, fecha o pão. A ordem faz diferença no resultado.",
      "O computador não adivinha o que queremos. Precisamos dizer quais ações ele deve executar e em qual ordem. Nesta primeira experiência, vamos representar uma tarefa cotidiana usando mensagens na tela. Cada mensagem será uma instrução do nosso programa.",
      "Leia o exemplo de cima para baixo. O comando escreval mostra uma mensagem e passa para a linha seguinte. Nosso programa apenas apresenta as etapas de preparar o pão; ele não controla uma cozinha. Mesmo assim, permite observar uma ideia central: uma sequência clara pode descrever uma solução.",
    ],
    steps: [
      "Abra o programa com algoritmo e dê a ele o nome Preparo do lanche.",
      "Escreva var para marcar a área de declarações, ainda sem variáveis.",
      "Depois de inicio, escreva uma mensagem para cada etapa do preparo.",
      "Feche com fimalgoritmo e confira se as mensagens aparecem na ordem desejada.",
    ],
    code: `algoritmo "Preparo do lanche"
var
inicio
  escreval("1. Abrir o pao")
  escreval("2. Colocar o queijo")
  escreval("3. Fechar o pao")
fimalgoritmo`,
    codeParts: [
      { code: `algoritmo "Preparo do lanche"`, explanation: "Identifica o programa com um nome que descreve sua tarefa." },
      { code: `escreval("1. Abrir o pao")`, explanation: "Apresenta a primeira etapa e termina a linha." },
      {
        code: `escreval("2. Colocar o queijo")
  escreval("3. Fechar o pao")`,
        explanation: "Executa as duas etapas seguintes na ordem em que foram escritas.",
      },
    ],
    sampleInput: [],
    expectedOutput: `1. Abrir o pao
2. Colocar o queijo
3. Fechar o pao
`,
    exercise: {
      prompt: "Escreva um programa que mostre três etapas para escovar os dentes: colocar pasta na escova, escovar os dentes e enxaguar a boca.",
      hint: "Use um escreval para cada etapa. Não é necessário declarar variáveis.",
      starterCode: `algoritmo "Escovar os dentes"
var
inicio
  // Escreva as tres etapas em ordem.
fimalgoritmo`,
      solution: `algoritmo "Escovar os dentes"
var
inicio
  escreval("1. Colocar pasta na escova")
  escreval("2. Escovar os dentes")
  escreval("3. Enxaguar a boca")
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-02",
    track: "visualg",
    level: "basico",
    title: "O que é algoritmo?",
    objective: "Reconhecer um algoritmo como uma sequência finita de instruções claras.",
    explanation: [
      "Um algoritmo é uma sequência de instruções claras que termina e resolve uma tarefa. Uma receita é uma boa comparação: ela informa o que fazer, em que ordem e quando o preparo termina. Dizer apenas “faça o almoço” não detalha suficientemente as ações.",
      "Na programação, podemos separar uma solução em dados de entrada, processamento e saída. Imagine uma compra com dois produtos: os preços são os dados, a soma é o processamento e o total apresentado é a saída. Os dados podem estar escritos no próprio programa ou ser informados por uma pessoa.",
      "Neste exemplo, os preços 4 e 6 já estão no código. O computador calcula 4 + 6 antes de mostrar o resultado. Assim, o algoritmo não apenas lista ações: ele também transforma dados em uma resposta útil. Depois da mensagem, o programa termina.",
    ],
    steps: [
      "Crie um algoritmo chamado Total da compra.",
      "Mantenha a seção var vazia, pois os valores serão usados diretamente.",
      "Dentro de inicio, escreva uma mensagem que apresente a conta.",
      "Use 4 + 6 fora das aspas para pedir o cálculo e encerre o algoritmo.",
    ],
    code: `algoritmo "Total da compra"
var
inicio
  escreval("Precos: 4 e 6")
  escreval("Total: ", 4 + 6)
fimalgoritmo`,
    codeParts: [
      { code: `algoritmo "Total da compra"`, explanation: "Dá um nome à sequência de instruções." },
      { code: `escreval("Precos: 4 e 6")`, explanation: "Mostra um texto com os preços usados nesta simulação." },
      { code: `escreval("Total: ", 4 + 6)`, explanation: "Calcula a soma e apresenta o resultado depois do texto." },
    ],
    sampleInput: [],
    expectedOutput: `Precos: 4 e 6
Total: 10
`,
    exercise: {
      prompt: "Crie um algoritmo que calcule o preço de três cadernos de 7 reais cada e mostre Total: 21.",
      hint: "Use 3 * 7 fora das aspas. O símbolo * representa multiplicação.",
      starterCode: `algoritmo "Compra de cadernos"
var
inicio
  // Calcule e apresente o total.
fimalgoritmo`,
      solution: `algoritmo "Compra de cadernos"
var
inicio
  escreval("Total: ", 3 * 7)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-03",
    track: "visualg",
    level: "basico",
    title: "O que é o Visualg 3.0?",
    objective: "Entender o papel do Visualg e executar um primeiro programa em portugol.",
    explanation: [
      "O Visualg 3.0 é um ambiente usado para estudar algoritmos com comandos próximos do português. A linguagem desses algoritmos costuma ser chamada de portugol. Ela ajuda a praticar raciocínio sem exigir, no começo, a sintaxe de uma linguagem usada em sistemas profissionais.",
      "Pense no ambiente como uma bancada de estudos. Você escreve o algoritmo no editor e pede sua execução. O interpretador lê os comandos, faz os cálculos e apresenta as mensagens na área de saída. Neste site, o laboratório executa o subconjunto de comandos ensinado nas aulas.",
      "O exemplo mostra uma saudação e uma conta. As palavras algoritmo, var, inicio e fimalgoritmo organizam o programa. Já escreval produz a saída. Ao testar, compare o que você imaginou com o que apareceu: essa comparação ajuda a encontrar erros e compreender cada instrução.",
    ],
    steps: [
      "Abra o laboratório de Visualg e localize o editor de código.",
      "Digite a estrutura completa do exemplo, incluindo o nome entre aspas.",
      "Coloque as duas chamadas de escreval entre inicio e fimalgoritmo.",
      "Execute e compare as duas linhas da saída com o resultado previsto.",
    ],
    code: `algoritmo "Primeiro teste"
var
inicio
  escreval("Ola! Estou aprendendo Visualg.")
  escreval("Dobro de 5: ", 5 * 2)
fimalgoritmo`,
    codeParts: [
      {
        code: `var
inicio`,
        explanation: "Separa a área de declarações do começo das instruções executadas.",
      },
      { code: `escreval("Ola! Estou aprendendo Visualg.")`, explanation: "Envia uma saudação para a área de saída." },
      { code: `escreval("Dobro de 5: ", 5 * 2)`, explanation: "Pede ao interpretador que calcule o dobro de 5 e mostre o resultado." },
    ],
    sampleInput: [],
    expectedOutput: `Ola! Estou aprendendo Visualg.
Dobro de 5: 10
`,
    exercise: {
      prompt: "Faça um programa que mostre Estou praticando! e, na linha seguinte, Triplo de 4: 12.",
      hint: "Escreva a mensagem entre aspas e calcule o triplo com 4 * 3.",
      starterCode: `algoritmo "Minha pratica"
var
inicio
  // Acrescente as duas mensagens.
fimalgoritmo`,
      solution: `algoritmo "Minha pratica"
var
inicio
  escreval("Estou praticando!")
  escreval("Triplo de 4: ", 4 * 3)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-04",
    track: "visualg",
    level: "basico",
    title: "Estrutura básica de um algoritmo",
    objective: "Distinguir identificação, declaração de variáveis e comandos executáveis.",
    explanation: [
      "A estrutura de um algoritmo funciona como a organização de uma ficha. No começo fica o nome da tarefa. Depois vem a área que informa quais dados serão guardados. Por último aparecem as instruções que usam esses dados.",
      "A linha algoritmo recebe um nome entre aspas. A seção var declara as variáveis, que são espaços nomeados para guardar valores. A palavra inicio marca o começo dos comandos executáveis, enquanto fimalgoritmo marca o término do programa.",
      "Vamos calcular o gasto de uma viagem curta. Declaramos passagens como inteiro, pois contaremos unidades sem parte decimal. Depois de inicio, a seta <- guarda 2 nessa variável. Só então usamos seu valor em uma multiplicação. A ordem importa: primeiro preparamos o dado, depois fazemos a conta.",
    ],
    steps: [
      "Dê ao algoritmo o nome Gasto com passagens.",
      "Na seção var, declare passagens com o tipo inteiro.",
      "Depois de inicio, atribua 2 à variável usando <-.",
      "Mostre a quantidade de passagens e o custo de 5 reais por passagem.",
      "Finalize com fimalgoritmo.",
    ],
    code: `algoritmo "Gasto com passagens"
var
  passagens: inteiro
inicio
  passagens <- 2
  escreval("Passagens: ", passagens)
  escreval("Gasto: ", passagens * 5)
fimalgoritmo`,
    codeParts: [
      { code: `passagens: inteiro`, explanation: "Declara um espaço chamado passagens para guardar um número inteiro." },
      { code: `passagens <- 2`, explanation: "Guarda o valor 2 na variável durante a execução." },
      { code: `escreval("Gasto: ", passagens * 5)`, explanation: "Multiplica a quantidade pelo preço e apresenta o gasto." },
    ],
    sampleInput: [],
    expectedOutput: `Passagens: 2
Gasto: 10
`,
    exercise: {
      prompt: "Declare livros como inteiro, guarde 3 e mostre o custo total considerando 12 reais por livro.",
      hint: "Declare livros antes de inicio e atribua seu valor depois de inicio.",
      starterCode: `algoritmo "Compra de livros"
var
  livros: inteiro
inicio
  livros <- 0
  // Ajuste a quantidade e mostre o custo.
fimalgoritmo`,
      solution: `algoritmo "Compra de livros"
var
  livros: inteiro
inicio
  livros <- 3
  escreval("Custo: ", livros * 12)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-05",
    track: "visualg",
    level: "basico",
    title: "Variáveis e constantes",
    objective: "Diferenciar valores que podem mudar de valores mantidos fixos.",
    explanation: [
      "Uma variável é como uma caixa com etiqueta: ela guarda um valor que pode ser substituído. Se uma caixa chamada saldo recebe 20 e depois recebe 15, seu valor atual passa a ser 15. A atribuição <- guarda o novo valor; ela não mantém um histórico dos valores anteriores.",
      "Uma constante representa um valor que não muda. Neste curso, não usamos uma seção const no Visualg. Para representar um preço fixo durante uma execução, vamos atribuir seu valor uma única vez e não alterá-lo. A variável ainda poderia receber outro valor, mas nosso algoritmo escolhe mantê-la fixa.",
      "O Visualg também oferece pi, um valor matemático pronto, aproximadamente 3,14159. No exemplo, precoUnitario permanece em 4, quantidade muda de 2 para 3 e pi participa do cálculo do comprimento de uma circunferência. Escrever pi:6:2 apresenta esse valor com duas casas decimais e largura mínima de seis caracteres.",
    ],
    steps: [
      "Declare quantidade como inteiro e os valores monetários e o raio como real.",
      "Atribua 4 ao preço uma única vez e comece com duas unidades.",
      "Calcule e mostre o primeiro total.",
      "Altere apenas a quantidade para 3 e apresente o novo total.",
      "Guarde 1 no raio e use pi para calcular 2 * pi * raio.",
    ],
    code: `algoritmo "Valores fixos e variaveis"
var
  quantidade: inteiro
  precoUnitario, raio: real
inicio
  precoUnitario <- 4
  quantidade <- 2
  escreval("Primeiro total: ", precoUnitario * quantidade)
  quantidade <- 3
  escreval("Novo total: ", precoUnitario * quantidade)
  raio <- 1
  escreval("Pi: ", pi:6:2)
  escreval("Comprimento: ", (2 * pi * raio):6:2)
fimalgoritmo`,
    codeParts: [
      { code: `precoUnitario <- 4`, explanation: "Define um preço que será mantido fixo nesta execução por escolha do algoritmo." },
      { code: `quantidade <- 3`, explanation: "Substitui a quantidade anterior, mostrando que uma variável pode mudar." },
      { code: `escreval("Pi: ", pi:6:2)`, explanation: "Usa o valor embutido pi e o exibe com duas casas decimais." },
      { code: `escreval("Comprimento: ", (2 * pi * raio):6:2)`, explanation: "Calcula o comprimento da circunferência e formata o resultado." },
    ],
    sampleInput: [],
    expectedOutput: `Primeiro total: 8
Novo total: 12
Pi:   3.14
Comprimento:   6.28
`,
    exercise: {
      prompt: "Mantenha o preço de um ingresso em 8 reais. Mostre o total para 2 ingressos e depois para 5 ingressos, alterando apenas a quantidade.",
      hint: "Atribua o preço uma única vez. Reutilize a mesma variável quantidade nas duas contas.",
      starterCode: `algoritmo "Ingressos"
var
  preco: real
  quantidade: inteiro
inicio
  preco <- 8
  quantidade <- 2
  // Mostre o primeiro total e depois altere a quantidade.
fimalgoritmo`,
      solution: `algoritmo "Ingressos"
var
  preco: real
  quantidade: inteiro
inicio
  preco <- 8
  quantidade <- 2
  escreval("Total inicial: ", preco * quantidade)
  quantidade <- 5
  escreval("Total final: ", preco * quantidade)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-06",
    track: "visualg",
    level: "basico",
    title: "Tipos de dados: inteiro, real, caractere e lógico",
    objective: "Escolher o tipo adequado para números, textos e valores de verdade.",
    explanation: [
      "Cada variável tem um tipo, como uma embalagem preparada para determinado conteúdo. O tipo inteiro guarda números sem parte decimal, como uma quantidade de cadeiras. O tipo real permite representar valores com parte decimal, como a altura de uma pessoa ou o preço de um produto.",
      "O tipo caractere guarda texto, incluindo palavras e frases. Os valores de texto ficam entre aspas duplas. Já o tipo logico guarda verdadeiro ou falso, sem aspas. Ele é útil para representar uma situação com duas possibilidades, como estar ou não com a matrícula ativa.",
      "Vamos montar uma ficha simples. A idade será inteira, a altura será real, o nome será texto e a situação da matrícula será lógica. No código, escrevemos 1.65 com ponto. Ao imprimir um valor lógico, o interpretador mostra VERDADEIRO ou FALSO em letras maiúsculas.",
    ],
    steps: [
      "Declare idade como inteiro e altura como real.",
      "Declare nome como caractere e matriculaAtiva como logico.",
      "Atribua os valores, usando aspas apenas no nome.",
      "Mostre cada campo com um rótulo para tornar a ficha compreensível.",
    ],
    code: `algoritmo "Ficha do estudante"
var
  idade: inteiro
  altura: real
  nome: caractere
  matriculaAtiva: logico
inicio
  idade <- 18
  altura <- 1.65
  nome <- "Ana"
  matriculaAtiva <- verdadeiro
  escreval("Nome: ", nome)
  escreval("Idade: ", idade)
  escreval("Altura: ", altura)
  escreval("Matricula ativa: ", matriculaAtiva)
fimalgoritmo`,
    codeParts: [
      {
        code: `idade: inteiro
  altura: real`,
        explanation: "Escolhe um tipo sem parte decimal para a idade e um tipo com parte decimal para a altura.",
      },
      { code: `nome <- "Ana"`, explanation: "Guarda um texto; as aspas delimitam o conteúdo e não aparecem na saída." },
      { code: `matriculaAtiva <- verdadeiro`, explanation: "Guarda um valor lógico, sem tratá-lo como texto." },
      { code: `escreval("Matricula ativa: ", matriculaAtiva)`, explanation: "Apresenta o valor lógico como VERDADEIRO." },
    ],
    sampleInput: [],
    expectedOutput: `Nome: Ana
Idade: 18
Altura: 1.65
Matricula ativa: VERDADEIRO
`,
    exercise: {
      prompt: "Monte uma ficha de produto com nome Arroz, quantidade 2, preco 6.5 e disponivel verdadeiro. Declare os quatro tipos adequados e mostre todos os campos.",
      hint: "Use caractere para nome, inteiro para quantidade, real para preco e logico para disponivel.",
      starterCode: `algoritmo "Ficha do produto"
var
  nome: caractere
  quantidade: inteiro
  preco: real
  disponivel: logico
inicio
  // Preencha e mostre os quatro campos.
fimalgoritmo`,
      solution: `algoritmo "Ficha do produto"
var
  nome: caractere
  quantidade: inteiro
  preco: real
  disponivel: logico
inicio
  nome <- "Arroz"
  quantidade <- 2
  preco <- 6.5
  disponivel <- verdadeiro
  escreval("Nome: ", nome)
  escreval("Quantidade: ", quantidade)
  escreval("Preco: ", preco)
  escreval("Disponivel: ", disponivel)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-07",
    track: "visualg",
    level: "basico",
    title: 'Comandos "escreva" e "escreval"',
    objective: "Controlar a apresentação de mensagens e as quebras de linha.",
    explanation: [
      "Os comandos escreva e escreval apresentam dados na tela. Pense neles como alguém preenchendo um cartaz: escreva continua na mesma linha, enquanto escreval termina sua parte e passa para a próxima linha. Essa diferença permite organizar recibos, perguntas e resultados.",
      "Dentro dos parênteses, podemos colocar textos, números e variáveis separados por vírgulas. As vírgulas separam os argumentos do comando, mas não criam espaços na saída. Se quiser um espaço entre duas informações, inclua esse espaço dentro do texto.",
      "No exemplo, duas chamadas de escreva e uma de escreval formam a primeira linha do recibo. Depois mostramos quantidade e total em linhas separadas. A chamada escreval() não recebe valores e produz apenas uma quebra de linha, deixando uma linha vazia antes da despedida.",
    ],
    steps: [
      "Declare e preencha produto, quantidade e preco.",
      "Use escreva para mostrar o começo do título sem quebrar a linha.",
      "Continue a mesma linha com o nome do produto e encerre com escreval.",
      "Apresente a quantidade e o total em linhas próprias.",
      "Use escreval() antes da mensagem final para separar visualmente o recibo.",
    ],
    code: `algoritmo "Recibo simples"
var
  produto: caractere
  quantidade: inteiro
  preco: real
inicio
  produto <- "Pao"
  quantidade <- 3
  preco <- 2
  escreva("Compra: ")
  escreva(produto)
  escreval(" concluida")
  escreval("Quantidade: ", quantidade)
  escreval("Total: ", quantidade * preco)
  escreval()
  escreval("Obrigado!")
fimalgoritmo`,
    codeParts: [
      {
        code: `escreva("Compra: ")
  escreva(produto)
  escreval(" concluida")`,
        explanation: "Monta uma única linha com três comandos; só o último termina a linha.",
      },
      { code: `escreval("Quantidade: ", quantidade)`, explanation: "O espaço depois dos dois-pontos pertence ao texto, não à vírgula." },
      { code: `escreval()`, explanation: "Produz uma quebra de linha sem escrever nenhum valor." },
    ],
    sampleInput: [],
    expectedOutput: `Compra: Pao concluida
Quantidade: 3
Total: 6

Obrigado!
`,
    exercise: {
      prompt: "Use duas chamadas de escreva para mostrar Pedido: e Suco na mesma linha. Encerre essa linha com escreval e mostre Total: 5 na próxima.",
      hint: "Inclua um espaço após os dois-pontos e use escreval() para terminar a primeira linha.",
      starterCode: `algoritmo "Pedido de suco"
var
inicio
  // Monte as duas linhas do pedido.
fimalgoritmo`,
      solution: `algoritmo "Pedido de suco"
var
inicio
  escreva("Pedido: ")
  escreva("Suco")
  escreval()
  escreval("Total: ", 5)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-08",
    track: "visualg",
    level: "basico",
    title: 'Comando "leia"',
    objective: "Receber dados digitados e armazená-los nas variáveis corretas.",
    explanation: [
      "Até agora, os valores estavam definidos no código. O comando leia permite que a pessoa informe dados durante a execução. É como preencher uma ficha em um balcão: o programa pergunta, espera a resposta e guarda o conteúdo no campo indicado.",
      "Antes de ler, declare a variável com o tipo adequado. Use caractere para um nome e inteiro para uma idade. Uma mensagem com escreva ajuda a pessoa a saber o que digitar e deixa o cursor na mesma linha da pergunta. Depois, leia(nome) guarda o texto na variável nome.",
      "Neste laboratório, o valor digitado aparece no console seguido de uma quebra de linha. Por isso, a saída prevista inclui as respostas Ana e 20. Quando o programa calcula idade + 1, ele usa o número recebido, não um valor fixo escrito dentro do cálculo.",
    ],
    steps: [
      "Declare nome como caractere e idade como inteiro.",
      "Mostre Nome: com escreva e leia o nome logo depois.",
      "Mostre Idade: e leia a idade na variável correspondente.",
      "Apresente uma saudação com o nome recebido.",
      "Calcule a idade do próximo aniversário somando 1.",
    ],
    code: `algoritmo "Apresentacao"
var
  nome: caractere
  idade: inteiro
inicio
  escreva("Nome: ")
  leia(nome)
  escreva("Idade: ")
  leia(idade)
  escreval("Ola, ", nome, "!")
  escreval("No proximo aniversario: ", idade + 1)
fimalgoritmo`,
    codeParts: [
      {
        code: `escreva("Nome: ")
  leia(nome)`,
        explanation: "Solicita um texto e o armazena na variável nome.",
      },
      {
        code: `escreva("Idade: ")
  leia(idade)`,
        explanation: "Solicita um número inteiro e o guarda em idade.",
      },
      { code: `escreval("No proximo aniversario: ", idade + 1)`, explanation: "Usa o dado informado em uma conta sem alterar a variável idade." },
    ],
    sampleInput: ["Ana", "20"],
    expectedOutput: `Nome: Ana
Idade: 20
Ola, Ana!
No proximo aniversario: 21
`,
    exercise: {
      prompt: "Leia o nome de uma cidade e a quantidade inteira de dias de uma viagem. Depois mostre os dois dados com rótulos.",
      hint: "Declare cidade como caractere e dias como inteiro. Faça uma pergunta antes de cada leia.",
      starterCode: `algoritmo "Dados da viagem"
var
  cidade: caractere
  dias: inteiro
inicio
  // Pergunte, leia e apresente os dados.
fimalgoritmo`,
      solution: `algoritmo "Dados da viagem"
var
  cidade: caractere
  dias: inteiro
inicio
  escreva("Cidade: ")
  leia(cidade)
  escreva("Dias: ")
  leia(dias)
  escreval("Destino: ", cidade)
  escreval("Duracao: ", dias, " dias")
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-09",
    track: "visualg",
    level: "basico",
    title: "Operadores aritméticos (+ - * / \\ mod ^)",
    objective: "Aplicar as sete operações aritméticas e distinguir divisão real, quociente inteiro e resto.",
    explanation: [
      "Os operadores aritméticos fazem contas com os dados. Usamos + para somar, - para subtrair e * para multiplicar. Em uma compra, podemos somar preços, subtrair um desconto e multiplicar o preço pela quantidade. O símbolo ^ calcula uma potência: 2 ^ 3 significa 2 * 2 * 2.",
      "A divisão / produz um resultado real: 17 / 5 resulta em 3.4. Já a divisão inteira, escrita com uma barra invertida, fornece o quociente inteiro. Com números positivos, 17 dividido em grupos de 5 forma 3 grupos completos. O operador mod informa a sobra: nesse caso, restam 2 unidades.",
      "Vamos experimentar os operadores com 17 e 5. O programa recebe esses valores para você poder testar outras combinações. Use um segundo valor diferente de zero, pois não podemos dividir por zero. Quando precisar mudar a ordem de uma conta, use parênteses, como em (a + b) * 2.",
    ],
    steps: [
      "Declare a e b como inteiros.",
      "Pergunte os dois valores e use 17 e 5 no teste.",
      "Mostre soma, subtração e multiplicação.",
      "Compare a divisão real com a divisão inteira e o resto.",
      "Apresente 2 ^ 3 para observar uma potência.",
    ],
    code: `algoritmo "Calculadora de operadores"
var
  a, b: inteiro
inicio
  escreva("Primeiro numero: ")
  leia(a)
  escreva("Segundo numero diferente de zero: ")
  leia(b)
  escreval("Soma: ", a + b)
  escreval("Subtracao: ", a - b)
  escreval("Multiplicacao: ", a * b)
  escreval("Divisao real: ", a / b)
  escreval("Divisao inteira: ", a \\ b)
  escreval("Resto: ", a mod b)
  escreval("Potencia: ", 2 ^ 3)
fimalgoritmo`,
    codeParts: [
      {
        code: `escreval("Soma: ", a + b)
  escreval("Subtracao: ", a - b)
  escreval("Multiplicacao: ", a * b)`,
        explanation: "Realiza três operações diferentes com os mesmos valores de entrada.",
      },
      { code: `escreval("Divisao real: ", a / b)`, explanation: "Divide os valores preservando a parte fracionária do resultado." },
      {
        code: `escreval("Divisao inteira: ", a \\ b)
  escreval("Resto: ", a mod b)`,
        explanation: "Mostra quantos grupos completos podem ser formados e quanto sobra.",
      },
      { code: `escreval("Potencia: ", 2 ^ 3)`, explanation: "Eleva 2 à terceira potência, resultando em 8." },
    ],
    sampleInput: ["17", "5"],
    expectedOutput: `Primeiro numero: 17
Segundo numero diferente de zero: 5
Soma: 22
Subtracao: 12
Multiplicacao: 85
Divisao real: 3.4
Divisao inteira: 3
Resto: 2
Potencia: 8
`,
    exercise: {
      prompt: "Leia uma quantidade inteira de minutos, maior ou igual a zero. Mostre quantas horas completas ela representa e quantos minutos sobram.",
      hint: "Uma hora tem 60 minutos. Use divisão inteira por 60 e mod 60.",
      starterCode: `algoritmo "Conversao de minutos"
var
  minutos: inteiro
inicio
  escreva("Minutos: ")
  leia(minutos)
  // Calcule as horas completas e os minutos restantes.
fimalgoritmo`,
      solution: `algoritmo "Conversao de minutos"
var
  minutos: inteiro
inicio
  escreva("Minutos: ")
  leia(minutos)
  escreval("Horas completas: ", minutos \\ 60)
  escreval("Minutos restantes: ", minutos mod 60)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-10",
    track: "visualg",
    level: "basico",
    title: "Operadores relacionais",
    objective: "Comparar valores e interpretar os resultados lógicos das comparações.",
    explanation: [
      "Operadores relacionais comparam dois valores. É como conferir se o dinheiro disponível é suficiente para uma compra: a pergunta não pede uma soma, mas uma resposta verdadeira ou falsa. No Visualg, toda comparação produz um valor lógico.",
      "Usamos = para verificar igualdade e <> para diferença. Os símbolos > e < verificam se um valor é maior ou menor que outro. Já >= e <= incluem a possibilidade de igualdade. Por exemplo, 7 >= 7 é verdadeiro, enquanto 7 > 7 é falso.",
      "Não confunda comparação com atribuição. A instrução a <- 7 guarda um valor; a expressão a = b verifica se os valores são iguais. No exemplo, recebemos 7 e 5 e mostramos as seis comparações. Depois, trocar as entradas por dois números iguais ajuda a perceber a diferença entre > e >=.",
    ],
    steps: [
      "Declare dois números inteiros chamados a e b.",
      "Leia os valores 7 e 5, nessa ordem.",
      "Mostre as comparações de igualdade e diferença.",
      "Mostre as comparações de maior, menor, maior ou igual e menor ou igual.",
      "Repita o teste com números iguais e observe quais respostas mudam.",
    ],
    code: `algoritmo "Comparando numeros"
var
  a, b: inteiro
inicio
  escreva("Valor A: ")
  leia(a)
  escreva("Valor B: ")
  leia(b)
  escreval("A igual a B: ", a = b)
  escreval("A diferente de B: ", a <> b)
  escreval("A maior que B: ", a > b)
  escreval("A menor que B: ", a < b)
  escreval("A maior ou igual a B: ", a >= b)
  escreval("A menor ou igual a B: ", a <= b)
fimalgoritmo`,
    codeParts: [
      { code: `leia(a)`, explanation: "Guarda o primeiro valor que será usado nas comparações." },
      {
        code: `escreval("A igual a B: ", a = b)
  escreval("A diferente de B: ", a <> b)`,
        explanation: "Verifica se os valores coincidem ou são diferentes.",
      },
      {
        code: `escreval("A maior que B: ", a > b)
  escreval("A menor que B: ", a < b)`,
        explanation: "Compara os valores sem aceitar a igualdade.",
      },
      {
        code: `escreval("A maior ou igual a B: ", a >= b)
  escreval("A menor ou igual a B: ", a <= b)`,
        explanation: "Faz comparações que também aceitam valores iguais.",
      },
    ],
    sampleInput: ["7", "5"],
    expectedOutput: `Valor A: 7
Valor B: 5
A igual a B: FALSO
A diferente de B: VERDADEIRO
A maior que B: VERDADEIRO
A menor que B: FALSO
A maior ou igual a B: VERDADEIRO
A menor ou igual a B: FALSO
`,
    exercise: {
      prompt: "Leia uma idade inteira e mostre o resultado de duas comparações: idade maior ou igual a 18 e idade igual a 18.",
      hint: "Use >= na primeira comparação e = na segunda. Não é necessário usar uma estrutura de decisão.",
      starterCode: `algoritmo "Comparando idade"
var
  idade: inteiro
inicio
  escreva("Idade: ")
  leia(idade)
  // Mostre as duas comparacoes.
fimalgoritmo`,
      solution: `algoritmo "Comparando idade"
var
  idade: inteiro
inicio
  escreva("Idade: ")
  leia(idade)
  escreval("Maior ou igual a 18: ", idade >= 18)
  escreval("Exatamente 18: ", idade = 18)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-11",
    track: "visualg",
    level: "basico",
    title: "Operadores lógicos (e, ou, nao)",
    objective: "Combinar e inverter condições para representar regras simples.",
    explanation: [
      "Os operadores lógicos trabalham com valores verdadeiro e falso. O operador e exige que as duas condições sejam verdadeiras. Imagine uma atividade que exige idade mínima e inscrição: cumprir apenas uma dessas exigências não basta.",
      "O operador ou resulta em verdadeiro quando pelo menos uma das condições é verdadeira, inclusive quando as duas são verdadeiras. Já nao inverte um valor lógico: nao verdadeiro resulta em falso. Use parênteses para deixar claro quais comparações fazem parte de cada regra.",
      "No exemplo, uma pessoa informa idade e quantidade de inscrições. A regra de participação exige idade maior ou igual a 16 e pelo menos uma inscrição. A regra de prioridade aceita idade menor que 18 ou idade maior ou igual a 60. Por fim, nao verifica a ausência de inscrição invertendo a condição inscricoes > 0.",
    ],
    steps: [
      "Declare idade e inscricoes como inteiros e podeParticipar como logico.",
      "Leia a idade e a quantidade de inscrições.",
      "Combine as duas exigências de participação usando e.",
      "Mostre a prioridade usando ou entre duas faixas de idade.",
      "Use nao para apresentar se a pessoa está sem inscrição.",
    ],
    code: `algoritmo "Regras da atividade"
var
  idade, inscricoes: inteiro
  podeParticipar: logico
inicio
  escreva("Idade: ")
  leia(idade)
  escreva("Quantidade de inscricoes: ")
  leia(inscricoes)
  podeParticipar <- (idade >= 16) e (inscricoes > 0)
  escreval("Pode participar: ", podeParticipar)
  escreval("Tem prioridade: ", (idade < 18) ou (idade >= 60))
  escreval("Sem inscricao: ", nao (inscricoes > 0))
fimalgoritmo`,
    codeParts: [
      { code: `podeParticipar: logico`, explanation: "Declara uma variável que guardará o resultado de uma regra." },
      { code: `podeParticipar <- (idade >= 16) e (inscricoes > 0)`, explanation: "Só guarda verdadeiro quando a idade mínima e a inscrição são atendidas." },
      { code: `escreval("Tem prioridade: ", (idade < 18) ou (idade >= 60))`, explanation: "Aceita qualquer uma das duas faixas de idade para a prioridade desta atividade fictícia." },
      { code: `escreval("Sem inscricao: ", nao (inscricoes > 0))`, explanation: "Inverte a condição de ter inscrição para verificar sua ausência." },
    ],
    sampleInput: ["17", "1"],
    expectedOutput: `Idade: 17
Quantidade de inscricoes: 1
Pode participar: VERDADEIRO
Tem prioridade: VERDADEIRO
Sem inscricao: FALSO
`,
    exercise: {
      prompt: "Leia uma nota real entre 0 e 10 e uma quantidade inteira de faltas. Mostre se o estudante atende à regra nota >= 6 e faltas <= 5. Mostre também a negação desse resultado.",
      hint: "Guarde a combinação em uma variável logica chamada atendeRegra e depois use nao atendeRegra.",
      starterCode: `algoritmo "Regra da turma"
var
  nota: real
  faltas: inteiro
  atendeRegra: logico
inicio
  // Leia os dados e avalie a regra.
fimalgoritmo`,
      solution: `algoritmo "Regra da turma"
var
  nota: real
  faltas: inteiro
  atendeRegra: logico
inicio
  escreva("Nota: ")
  leia(nota)
  escreva("Faltas: ")
  leia(faltas)
  atendeRegra <- (nota >= 6) e (faltas <= 5)
  escreval("Atende a regra: ", atendeRegra)
  escreval("Nao atende a regra: ", nao atendeRegra)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-12",
    track: "visualg",
    level: "basico",
    title: "Entrada e saída de dados",
    objective: "Construir um programa completo com entrada, processamento e saída.",
    explanation: [
      "Muitos programas seguem um caminho simples: recebem dados, fazem um processamento e apresentam uma resposta. Pense em um caixa de loja. Ele recebe a quantidade e o preço dos produtos, calcula o valor da compra e mostra o total ao cliente.",
      "Vamos simular uma venda de um único produto. A entrada será composta pelo nome do produto, pela quantidade, pelo preço unitário e pelo valor pago. Cada dado deve ser lido em uma variável adequada. Para os valores reais digitados neste laboratório, use ponto como separador decimal.",
      "No processamento, total recebe quantidade * precoUnitario e troco recebe valorPago - total. A saída apresenta um resumo com rótulos. Neste exemplo, consideramos quantidade positiva, preço positivo e pagamento suficiente. O programa ainda não verifica essas condições; use entradas que respeitem essa combinação.",
    ],
    steps: [
      "Declare produto como caractere, quantidade como inteiro e os valores monetários como real.",
      "Pergunte e leia os quatro dados na ordem indicada.",
      "Calcule total multiplicando quantidade por precoUnitario.",
      "Calcule troco subtraindo total de valorPago.",
      "Mostre o resumo da compra com produto, total e troco.",
    ],
    code: `algoritmo "Caixa da loja"
var
  produto: caractere
  quantidade: inteiro
  precoUnitario, valorPago, total, troco: real
inicio
  escreva("Produto: ")
  leia(produto)
  escreva("Quantidade: ")
  leia(quantidade)
  escreva("Preco unitario: ")
  leia(precoUnitario)
  escreva("Valor pago: ")
  leia(valorPago)
  total <- quantidade * precoUnitario
  troco <- valorPago - total
  escreval("Resumo da compra")
  escreval("Produto: ", produto)
  escreval("Total: ", total)
  escreval("Troco: ", troco)
fimalgoritmo`,
    codeParts: [
      {
        code: `escreva("Produto: ")
  leia(produto)`,
        explanation: "Realiza a entrada do nome do produto com uma pergunta clara.",
      },
      { code: `total <- quantidade * precoUnitario`, explanation: "Transforma quantidade e preço em um valor total." },
      { code: `troco <- valorPago - total`, explanation: "Calcula quanto deve ser devolvido ao cliente." },
      {
        code: `escreval("Resumo da compra")
  escreval("Produto: ", produto)
  escreval("Total: ", total)
  escreval("Troco: ", troco)`,
        explanation: "Apresenta os resultados organizados depois de concluir as contas.",
      },
    ],
    sampleInput: ["Caderno", "3", "4.5", "20"],
    expectedOutput: `Produto: Caderno
Quantidade: 3
Preco unitario: 4.5
Valor pago: 20
Resumo da compra
Produto: Caderno
Total: 13.5
Troco: 6.5
`,
    exercise: {
      prompt: "Leia a largura e o comprimento reais de um terreno retangular. Calcule e mostre sua área e seu perímetro. Considere medidas positivas.",
      hint: "A área é largura * comprimento. O perímetro é 2 * (largura + comprimento).",
      starterCode: `algoritmo "Medidas do terreno"
var
  largura, comprimento, area, perimetro: real
inicio
  // Receba as medidas, calcule e apresente os resultados.
fimalgoritmo`,
      solution: `algoritmo "Medidas do terreno"
var
  largura, comprimento, area, perimetro: real
inicio
  escreva("Largura: ")
  leia(largura)
  escreva("Comprimento: ")
  leia(comprimento)
  area <- largura * comprimento
  perimetro <- 2 * (largura + comprimento)
  escreval("Area: ", area)
  escreval("Perimetro: ", perimetro)
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-13",
    track: "visualg",
    level: "basico",
    title: "Operações matemáticas (raizq, quad, abs, int e formatação x:6:2)",
    objective: "Usar funções matemáticas e apresentar números com largura e casas decimais definidas.",
    explanation: [
      "Uma função matemática recebe um valor e devolve um resultado. É como uma ferramenta pronta: você informa o material de entrada e recebe algo transformado. A função raizq calcula a raiz quadrada, enquanto quad calcula o quadrado de um número. Para uma raiz real válida, use um valor maior ou igual a zero.",
      "A função abs devolve o valor absoluto, isto é, a distância até zero sem sinal negativo. Assim, abs(-7.8) resulta em 7.8. A função int retira a parte fracionária em direção a zero: int(-7.8) resulta em -7. Ela não arredonda para o inteiro mais próximo.",
      "Também podemos escolher como um número aparece na saída. A notação x:6:2 usa duas casas decimais e largura mínima de seis caracteres, alinhando à direita com espaços. O número 3.5 aparece como dois espaços seguidos de 3.50. Essa formatação muda a apresentação, não o valor guardado na variável.",
    ],
    steps: [
      "Declare area, valor e lado como reais.",
      "Leia uma área não negativa e calcule seu lado com raizq.",
      "Mostre o lado com duas casas decimais e largura mínima de seis caracteres.",
      "Use quad(lado) para recuperar a área do quadrado.",
      "Leia um valor e apresente abs(valor) e int(valor).",
      "Mostre 3.5 com o mesmo formato para observar o preenchimento com espaços.",
    ],
    code: `algoritmo "Ferramentas matematicas"
var
  area, valor, lado: real
inicio
  escreva("Area do quadrado: ")
  leia(area)
  lado <- raizq(area)
  escreval("Lado: ", lado:6:2)
  escreval("Quadrado do lado: ", quad(lado):6:2)
  escreva("Valor para analisar: ")
  leia(valor)
  escreval("Absoluto: ", abs(valor):6:2)
  escreval("Parte inteira: ", int(valor))
  escreval("Formato de 3.5: ", 3.5:6:2)
fimalgoritmo`,
    codeParts: [
      { code: `lado <- raizq(area)`, explanation: "Calcula a medida do lado de um quadrado a partir de sua área." },
      { code: `escreval("Lado: ", lado:6:2)`, explanation: "Reserva no mínimo seis caracteres para o número e mostra duas casas decimais." },
      { code: `escreval("Quadrado do lado: ", quad(lado):6:2)`, explanation: "Eleva o lado ao quadrado e apresenta o resultado formatado." },
      { code: `escreval("Absoluto: ", abs(valor):6:2)`, explanation: "Remove o sinal negativo do valor, caso exista, e formata a saída." },
      { code: `escreval("Parte inteira: ", int(valor))`, explanation: "Descarta a parte fracionária em direção a zero, sem arredondar." },
    ],
    sampleInput: ["81", "-7.8"],
    expectedOutput: `Area do quadrado: 81
Lado:   9.00
Quadrado do lado:  81.00
Valor para analisar: -7.8
Absoluto:   7.80
Parte inteira: -7
Formato de 3.5:   3.50
`,
    exercise: {
      prompt: "Leia um número real não negativo. Mostre sua raiz quadrada e seu quadrado com duas casas decimais em campos de largura mínima 6. Mostre também sua parte inteira sem formatação.",
      hint: "Use raizq(numero), quad(numero) e int(numero). Coloque :6:2 depois das expressões que devem ser formatadas.",
      starterCode: `algoritmo "Explorando um numero"
var
  numero: real
inicio
  escreva("Numero nao negativo: ")
  leia(numero)
  // Mostre os tres resultados.
fimalgoritmo`,
      solution: `algoritmo "Explorando um numero"
var
  numero: real
inicio
  escreva("Numero nao negativo: ")
  leia(numero)
  escreval("Raiz: ", raizq(numero):6:2)
  escreval("Quadrado: ", quad(numero):6:2)
  escreval("Parte inteira: ", int(numero))
fimalgoritmo`,
    },
  },
  {
    id: "vg-b-14",
    track: "visualg",
    level: "basico",
    title: "Comentários no código",
    objective: "Documentar a intenção dos comandos sem alterar sua execução.",
    explanation: [
      "Comentários são anotações para quem lê o código. Eles funcionam como bilhetes em uma receita: podem explicar uma escolha, lembrar uma unidade de medida ou indicar uma etapa importante. O interpretador ignora o comentário durante a execução.",
      "No Visualg, duas barras, //, iniciam um comentário que vai até o fim da linha. Ele pode ocupar uma linha inteira ou aparecer depois de um comando. Dentro de um texto entre aspas, porém, esses símbolos fazem parte do texto. Para manter os exemplos compatíveis com o laboratório, escrevemos também os comentários do código sem acentos.",
      "Um bom comentário explica a intenção, não apenas repete o comando. Em uma compra com desconto, vale registrar que a porcentagem deve ser convertida em uma fração dividindo por 100. No exemplo, separamos entrada, processamento e saída. Nenhuma dessas anotações aparece no recibo; somente as chamadas de escreva e escreval geram mensagens.",
    ],
    steps: [
      "Declare os valores da compra como reais.",
      "Adicione um comentário antes das perguntas para identificar a entrada.",
      "Leia o preço e a porcentagem de desconto.",
      "Explique em um comentário por que a conta divide a porcentagem por 100.",
      "Calcule o desconto e o preço final.",
      "Apresente os resultados com duas casas decimais e confira que os comentários não aparecem.",
    ],
    code: `algoritmo "Compra com comentarios"
var
  preco, percentual, desconto, total: real
inicio
  // Entrada: valores informados pela pessoa.
  escreva("Preco: ")
  leia(preco)
  escreva("Desconto percentual: ")
  leia(percentual)

  // Dividir por 100 converte a porcentagem em fracao.
  desconto <- preco * percentual / 100
  total <- preco - desconto // Valor que sera pago.

  // Saida: resumo com duas casas decimais.
  escreval("Desconto: ", desconto:6:2)
  escreval("Total a pagar: ", total:6:2)
fimalgoritmo`,
    codeParts: [
      { code: `// Entrada: valores informados pela pessoa.`, explanation: "Documenta o papel do próximo grupo de comandos, sem produzir saída." },
      {
        code: `// Dividir por 100 converte a porcentagem em fracao.
  desconto <- preco * percentual / 100`,
        explanation: "Explica a razão da divisão usada para calcular o desconto.",
      },
      { code: `total <- preco - desconto // Valor que sera pago.`, explanation: "Executa a subtração e ignora o comentário que aparece depois dela." },
      {
        code: `// Saida: resumo com duas casas decimais.
  escreval("Desconto: ", desconto:6:2)
  escreval("Total a pagar: ", total:6:2)`,
        explanation: "Identifica a etapa de saída; apenas os dois comandos escreval imprimem informações.",
      },
    ],
    sampleInput: ["80", "15"],
    expectedOutput: `Preco: 80
Desconto percentual: 15
Desconto:  12.00
Total a pagar:  68.00
`,
    exercise: {
      prompt: "Leia a distância de uma viagem em quilômetros e o consumo do veículo em quilômetros por litro. Calcule os litros necessários e mostre o resultado com duas casas decimais. Inclua comentários sobre as unidades e sobre a divisão. Considere distância não negativa e consumo maior que zero.",
      hint: "Divida distancia por consumo. Use // para explicar por que essa divisão produz uma quantidade em litros.",
      starterCode: `algoritmo "Combustivel da viagem"
var
  distancia, consumo, litros: real
inicio
  // Leia os dados e documente as unidades.
  // Calcule e mostre o combustivel necessario.
fimalgoritmo`,
      solution: `algoritmo "Combustivel da viagem"
var
  distancia, consumo, litros: real
inicio
  // A distancia e informada em quilometros.
  escreva("Distancia em km: ")
  leia(distancia)
  // O consumo indica quantos quilometros cabem em um litro.
  escreva("Consumo em km por litro: ")
  leia(consumo)
  // Quilometros divididos por km por litro resultam em litros.
  litros <- distancia / consumo
  escreval("Litros necessarios: ", litros:6:2)
fimalgoritmo`,
    },
  },
];
