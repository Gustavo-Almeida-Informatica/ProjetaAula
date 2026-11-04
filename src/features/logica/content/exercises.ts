import type { Exercise } from "../types";

export const exercises: Exercise[] = [
  {
    id: "ex-01",
    kind: "multipla",
    subject: "logica",
    difficulty: "basico",
    points: 10,
    prompt: "Qual alternativa descreve melhor um algoritmo?",
    options: [
      "Uma sequência organizada de passos para resolver um problema.",
      "Um programa que obrigatoriamente usa internet.",
      "Um desenho que substitui qualquer instrução.",
      "Uma lista de comandos sem ordem definida.",
    ],
    correctIndex: 0,
    explanation:
      "Um algoritmo organiza passos para atingir um objetivo, como preparar uma receita. Ele não depende da internet nem precisa ser escrito em uma linguagem de programação. A ordem importa: passos embaralhados podem produzir outro resultado.",
  },
  {
    id: "ex-02",
    kind: "multipla",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt: "Qual tipo é mais adequado para guardar a altura 1.72?",
    options: ["inteiro", "real", "logico", "caractere"],
    correctIndex: 1,
    explanation:
      "O tipo real representa números com parte decimal. Inteiro não é adequado para preservar 1.72; logico guarda verdadeiro ou falso; caractere guarda texto, não um valor destinado a cálculos numéricos.",
  },
  {
    id: "ex-03",
    kind: "multipla",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt: "Qual valor será mostrado ao executar o algoritmo?",
    code: `algoritmo "Prioridade"
var
  resultado: inteiro
inicio
  resultado <- 2 + 3 * 4
  escreval(resultado)
fimalgoritmo`,
    options: ["20", "24", "14", "9"],
    correctIndex: 2,
    explanation:
      "A multiplicação acontece antes da adição: 3 vezes 4 resulta em 12; depois, 2 mais 12 resulta em 14. O resultado 20 exigiria os parênteses (2 + 3) * 4. Os demais valores não seguem essas operações.",
  },
  {
    id: "ex-04",
    kind: "multipla",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Um menu possui opções numéricas 1, 2 e 3. Qual estrutura permite tratar diretamente cada valor de opção?",
    options: [
      "leia, porque ele executa todas as opções.",
      "var, porque ele decide qual opção executar.",
      "para, porque todo menu precisa contar até três.",
      "escolha, com um caso para cada opção.",
    ],
    correctIndex: 3,
    explanation:
      "Escolha compara uma expressão com os valores de cada caso. Leia apenas recebe dados; var declara variáveis; para repete comandos e não substitui a decisão entre opções. Um menu pode repetir, mas repetição e escolha têm funções diferentes.",
  },
  {
    id: "ex-05",
    kind: "multipla",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt: "Qual elemento representa o conteúdo principal de uma página?",
    options: ["<main>", "<footer>", "<nav>", "<span>"],
    correctIndex: 0,
    explanation:
      "Main identifica o conteúdo principal. Footer representa um rodapé, nav agrupa links de navegação e span é um contêiner textual sem significado específico. Usar semântica ajuda pessoas e tecnologias assistivas a compreender a organização da página.",
  },
  {
    id: "ex-06",
    kind: "multipla",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt:
      "Como associar corretamente um rótulo a um campo cujo id é email?",
    options: [
      '<label href="email">E-mail</label>',
      '<label for="email">E-mail</label>',
      '<label src="email">E-mail</label>',
      '<label name="email">E-mail</label>',
    ],
    correctIndex: 1,
    explanation:
      "O atributo for do label deve ter o mesmo valor do id do campo. Isso cria uma associação que ajuda leitores de tela e permite ativar o campo pelo rótulo. Href, src e name não estabelecem essa associação.",
  },
  {
    id: "ex-07",
    kind: "multipla",
    subject: "css",
    difficulty: "basico",
    points: 10,
    prompt: 'Qual seletor alcança elementos com class="aviso"?',
    options: ["#aviso", "aviso", ".aviso", "*aviso"],
    correctIndex: 2,
    explanation:
      "O ponto inicia um seletor de classe: .aviso. A cerquilha seleciona um id; aviso, sem prefixo, busca uma tag com esse nome. *aviso não é a sintaxe para selecionar a classe aviso.",
  },
  {
    id: "ex-08",
    kind: "multipla",
    subject: "css",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "No box model, qual propriedade cria espaço entre o conteúdo e a borda do próprio elemento?",
    options: ["margin", "display", "gap", "padding"],
    correctIndex: 3,
    explanation:
      "Padding é o espaçamento interno, entre conteúdo e borda. Margin é externo à borda. Display define o comportamento de layout e gap cria intervalos entre itens em layouts como flex e grid; não substitui o padding de um elemento.",
  },
  {
    id: "ex-09",
    kind: "multipla",
    subject: "css",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Qual declaração cria três colunas de mesma proporção em um contêiner que já usa display: grid?",
    options: [
      "grid-template-columns: repeat(3, 1fr);",
      "flex-direction: column;",
      "grid-template-rows: repeat(3, 1fr);",
      "text-align: center;",
    ],
    correctIndex: 0,
    explanation:
      "Grid-template-columns define as colunas; repeat(3, 1fr) cria três partes de mesma proporção. Grid-template-rows configura linhas. Flex-direction atua em flexbox, e text-align alinha conteúdo textual, não cria colunas.",
  },
  {
    id: "ex-10",
    kind: "multipla",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt: "Para que serve retorne dentro de uma função?",
    options: [
      "Para ler um valor do teclado.",
      "Para devolver o resultado da função a quem a chamou.",
      "Para declarar um vetor.",
      "Para repetir automaticamente a função para sempre.",
    ],
    correctIndex: 1,
    explanation:
      "Retorne entrega o resultado calculado pela função. Leia recebe entradas, declarações de vetores ficam na área de variáveis e repetições exigem uma estrutura própria. Devolver um resultado não significa imprimi-lo: quem chama a função decide como usá-lo.",
  },
  {
    id: "ex-11",
    kind: "vf",
    subject: "logica",
    difficulty: "basico",
    points: 10,
    prompt:
      "Uma variável pode receber outro valor durante a execução de um algoritmo.",
    answer: true,
    explanation:
      "Verdadeiro. Uma atribuição atualiza o valor guardado na variável, respeitando seu tipo. O nome continua o mesmo, mas o conteúdo pode mudar; variável não significa valor fixo.",
  },
  {
    id: "ex-12",
    kind: "vf",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt: "No Visualg, o operador = é usado para atribuir valores a variáveis.",
    answer: false,
    explanation:
      "Falso. A atribuição usa <-, enquanto = compara igualdade em expressões. Trocar esses papéis impede que a variável receba o valor pretendido.",
  },
  {
    id: "ex-13",
    kind: "vf",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Em enquanto, se a condição já for falsa na primeira verificação, o corpo não será executado.",
    answer: true,
    explanation:
      "Verdadeiro. Enquanto testa antes de entrar no corpo. Não há garantia de uma execução inicial; essa característica pertence ao repita, que verifica a condição depois dos comandos.",
  },
  {
    id: "ex-14",
    kind: "vf",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Em repita ... ate, o bloco continua repetindo enquanto a condição depois de ate for verdadeira.",
    answer: false,
    explanation:
      "Falso. Repita executa o corpo e encerra quando a condição de ate se torna verdadeira. Enquanto ela for falsa, repete. Não confunda essa condição de parada com a condição de continuidade do enquanto.",
  },
  {
    id: "ex-15",
    kind: "vf",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Um vetor declarado como vetor[1..5] de inteiro possui posições válidas de 1 a 5.",
    answer: true,
    explanation:
      "Verdadeiro. Os limites são inclusivos, totalizando cinco posições. Nesse vetor, zero e seis ficam fora dos limites; não se deve presumir que todo vetor começa em zero.",
  },
  {
    id: "ex-16",
    kind: "vf",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt:
      "Uma imagem meramente decorativa pode usar alt vazio para não acrescentar uma descrição desnecessária à leitura por tecnologia assistiva.",
    answer: true,
    explanation:
      "Verdadeiro. Alt vazio indica que uma imagem decorativa não precisa de descrição. Isso não vale para imagens informativas, que precisam de texto alternativo útil. Omitir alt não equivale a informar explicitamente que a imagem é decorativa.",
  },
  {
    id: "ex-17",
    kind: "vf",
    subject: "css",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Em flexbox, justify-content sempre controla o alinhamento horizontal, independentemente de flex-direction.",
    answer: false,
    explanation:
      "Falso. Justify-content atua no eixo principal. Com flex-direction: row, esse eixo normalmente é horizontal; com column, é vertical. Align-items atua no eixo transversal.",
  },
  {
    id: "ex-18",
    kind: "vf",
    subject: "css",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Uma media query com max-width: 600px pode aplicar regras quando a largura da área de visualização for de até 600 pixels CSS.",
    answer: true,
    explanation:
      "Verdadeiro. Max-width inclui o limite de 600 pixels CSS e permite adaptar o layout a áreas menores. Não significa aplicar regras apenas acima desse limite nem medir necessariamente a largura física do aparelho.",
  },
  {
    id: "ex-19",
    kind: "completar",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt:
      "Complete com o tipo numérico que guarda preços com parte decimal.",
    code: `algoritmo "Preco"
var
  preco: ____
inicio
  preco <- 7.5
  escreval(preco)
fimalgoritmo`,
    accepted: ["real"],
    explanation:
      "Real preserva a parte decimal do preço. Inteiro não é adequado para esse valor; caractere armazena texto e logico representa verdadeiro ou falso.",
  },
  {
    id: "ex-20",
    kind: "completar",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt:
      "Complete com o operador que obtém o resto da divisão para verificar se o número é par.",
    code: `algoritmo "Par"
var
  numero: inteiro
inicio
  leia(numero)
  se numero ____ 2 = 0 entao
    escreval("PAR")
  senao
    escreval("IMPAR")
  fimse
fimalgoritmo`,
    accepted: ["mod"],
    explanation:
      "Mod calcula o resto da divisão inteira. Resto zero ao dividir por dois identifica números pares. A divisão comum calcula um quociente e a multiplicação não verifica divisibilidade.",
  },
  {
    id: "ex-21",
    kind: "completar",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt:
      "Complete com a palavra que inicia o bloco executado quando a condição do se é falsa.",
    code: `algoritmo "Idade"
var
  idade: inteiro
inicio
  leia(idade)
  se idade >= 18 entao
    escreval("ADULTO")
  ____
    escreval("MENOR")
  fimse
fimalgoritmo`,
    accepted: ["senao"],
    explanation:
      "Senao define a alternativa do se para a condição falsa. Entao inicia o bloco da condição verdadeira; fimse encerra a estrutura e não inicia uma alternativa.",
  },
  {
    id: "ex-22",
    kind: "completar",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Complete com a palavra que encerra a repetição iniciada por para.",
    code: `algoritmo "Contagem"
var
  i: inteiro
inicio
  para i de 1 ate 3 faca
    escreval(i)
  ____
fimalgoritmo`,
    accepted: ["fimpara"],
    explanation:
      "Fimpara fecha o bloco do para. Fimenquanto fecha outra estrutura, fimse fecha uma decisão e fimalgoritmo encerra o programa, não substituindo o fechamento do laço.",
  },
  {
    id: "ex-23",
    kind: "completar",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt:
      "Complete o nome do atributo que informa o destino de um link.",
    code: `<a ____="https://example.org">Visitar exemplo</a>`,
    accepted: ["href"],
    explanation:
      "Href informa o destino do link. Src indica a origem de recursos como imagens; alt fornece texto alternativo de imagens e class identifica classes para seleção e estilo.",
  },
  {
    id: "ex-24",
    kind: "completar",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt:
      "Complete com o atributo que fornece uma descrição textual alternativa para a imagem.",
    code: `<img src="horta.jpg" ____="Horta comunitária com alfaces e cenouras">`,
    accepted: ["alt"],
    explanation:
      "Alt oferece uma alternativa textual para a imagem informativa. Title não substitui essa alternativa e src apenas informa onde está o arquivo.",
  },
  {
    id: "ex-25",
    kind: "completar",
    subject: "css",
    difficulty: "basico",
    points: 10,
    prompt: "Complete com o valor de display que ativa o flexbox.",
    code: `.menu {
  display: ____;
  gap: 12px;
}`,
    accepted: ["flex"],
    explanation:
      "Display: flex cria um contêiner flex. Block usa o fluxo em blocos e grid ativa outro modelo de layout. Gap define o intervalo, mas sozinho não ativa flexbox.",
  },
  {
    id: "ex-26",
    kind: "completar",
    subject: "css",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Complete o nome da propriedade que define as colunas de um grid.",
    code: `.galeria {
  display: grid;
  ____: repeat(2, 1fr);
}`,
    accepted: ["grid-template-columns"],
    explanation:
      "Grid-template-columns define o tamanho e a quantidade das colunas. Grid-template-rows define linhas; gap define espaçamento, sem criar essa estrutura de colunas.",
  },
  {
    id: "ex-27",
    kind: "erro",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt:
      "O objetivo é mostrar a média aritmética de duas notas. Qual correção resolve o erro?",
    code: `algoritmo "Media"
var
  a, b, media: real
inicio
  leia(a)
  leia(b)
  media <- a + b / 2
  escreval(media)
fimalgoritmo`,
    options: [
      "Trocar real por inteiro.",
      "Usar media <- (a + b) / 2.",
      "Trocar a soma por multiplicação.",
      "Remover a divisão por dois.",
    ],
    correctIndex: 1,
    explanation:
      "Os parênteses fazem a soma acontecer antes da divisão. Sem eles, apenas b é dividido por dois. Mudar o tipo não corrige a fórmula; multiplicar ou remover a divisão deixa de calcular a média aritmética.",
  },
  {
    id: "ex-28",
    kind: "erro",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "A contagem deveria mostrar 1, 2 e 3 e terminar. Qual é o erro?",
    code: `algoritmo "Contagem"
var
  i: inteiro
inicio
  i <- 1
  enquanto i <= 3 faca
    escreval(i)
  fimenquanto
fimalgoritmo`,
    options: [
      "Escreval deveria ser leia.",
      "A variável i deveria ser caractere.",
      "Falta i <- i + 1 dentro do laço.",
      "O limite deveria ser 300.",
    ],
    correctIndex: 2,
    explanation:
      "Sem atualizar i, ele permanece em 1 e a condição nunca fica falsa. Incrementar dentro do laço permite chegar a 4 e encerrar. Trocar a saída por entrada muda a tarefa; outro tipo ou limite não resolve a ausência da atualização.",
  },
  {
    id: "ex-29",
    kind: "erro",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "O programa deve preencher exatamente as três posições do vetor. Qual correção é necessária?",
    code: `algoritmo "Vetor"
var
  valores: vetor[1..3] de inteiro
  i: inteiro
inicio
  para i de 1 ate 4 faca
    leia(valores[i])
  fimpara
fimalgoritmo`,
    options: [
      "Trocar o limite do para de 4 para 3.",
      "Começar o para em zero.",
      "Remover o índice de valores[i].",
      "Trocar inteiro por real.",
    ],
    correctIndex: 0,
    explanation:
      "O vetor só possui posições de 1 a 3. O limite 4 provoca acesso fora da faixa. Começar em zero acrescenta outro índice inválido; remover o índice não seleciona uma posição e mudar o tipo não altera os limites.",
  },
  {
    id: "ex-30",
    kind: "erro",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt:
      "O rótulo deve ativar o campo de e-mail quando receber um clique. Qual é a correção?",
    code: `<label for="nome">E-mail</label>
<input id="email" name="email" type="email">`,
    options: [
      'Trocar type="email" por type="text".',
      "Remover o label.",
      'Adicionar class="nome" ao input.',
      'Trocar for="nome" por for="email".',
    ],
    correctIndex: 3,
    explanation:
      "For precisa coincidir com o id do campo. A classe não cria essa associação. Alterar o tipo muda o comportamento do campo, e remover o label elimina uma informação importante para a acessibilidade.",
  },
  {
    id: "ex-31",
    kind: "erro",
    subject: "css",
    difficulty: "basico",
    points: 10,
    prompt:
      "O CSS deveria colorir o elemento mostrado. Qual correção resolve o problema do seletor?",
    code: `<p class="destaque">Aviso importante</p>
<style>
  #destaque { color: darkblue; }
</style>`,
    options: [
      "Trocar color por background-color.",
      "Trocar #destaque por .destaque.",
      "Remover o texto do parágrafo.",
      "Trocar darkblue por blue.",
    ],
    correctIndex: 1,
    explanation:
      "O HTML usa uma classe, selecionada com ponto. A cerquilha procura um id. Mudar a propriedade ou a cor não faz o seletor alcançar o elemento; remover o texto também não corrige a seleção.",
  },
  {
    id: "ex-32",
    kind: "erro",
    subject: "css",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Os itens deveriam ficar em uma linha flexível com espaço entre eles, mas continuam no fluxo normal. Qual declaração falta?",
    code: `.linha {
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}`,
    options: [
      "color: flex;",
      "font-size: row;",
      "display: flex;",
      "border-radius: 100%;",
    ],
    correctIndex: 2,
    explanation:
      "Display: flex ativa o modelo no qual justify-content e align-items organizam os itens como desejado. Color: flex e font-size: row são valores inválidos para essas propriedades. Border-radius arredonda bordas, mas não ativa um layout.",
  },
  {
    id: "ex-33",
    kind: "desafio-visualg",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt:
      "Leia dois números inteiros, na ordem, e mostre a soma. Imprima SOMA= seguido do resultado, sem espaços. Exemplo: para 2 e 3, imprima SOMA=5.",
    explanation:
      "Leia guarda cada entrada em uma variável. A soma usa + e pode ser mostrada junto do rótulo SOMA=. Escrever apenas as entradas não calcula o resultado; usar caractere no lugar de inteiro não representa corretamente a intenção numérica.",
    starterCode: `algoritmo "Soma"
var
  a, b: inteiro
inicio
  // Leia os dois valores e mostre SOMA= com o resultado.
fimalgoritmo`,
    tests: [
      { input: ["2", "3"], expectedContains: ["SOMA=5"] },
      { input: ["-4", "9"], expectedContains: ["SOMA=5"] },
      { input: ["0", "0"], expectedContains: ["SOMA=0"] },
    ],
    solution: `algoritmo "Soma"
var
  a, b: inteiro
inicio
  leia(a)
  leia(b)
  escreval("SOMA=", a + b)
fimalgoritmo`,
  },
  {
    id: "ex-34",
    kind: "desafio-visualg",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Leia três inteiros e mostre o maior, inclusive quando houver empate ou todos forem negativos. Imprima MAIOR= seguido do valor, sem espaços.",
    explanation:
      "Inicializar maior com a primeira entrada permite tratar números negativos. Depois, cada outra entrada só substitui maior quando for superior. Começar em zero falha quando todos os números são negativos; comparar apenas dois ignora o terceiro.",
    starterCode: `algoritmo "Maior de tres"
var
  a, b, c, maior: inteiro
inicio
  // Leia a, b e c.
  // Comece maior com a e compare os outros valores.
fimalgoritmo`,
    tests: [
      { input: ["2", "9", "5"], expectedContains: ["MAIOR=9"] },
      { input: ["-3", "-8", "-1"], expectedContains: ["MAIOR=-1"] },
      { input: ["7", "7", "4"], expectedContains: ["MAIOR=7"] },
    ],
    solution: `algoritmo "Maior de tres"
var
  a, b, c, maior: inteiro
inicio
  leia(a)
  leia(b)
  leia(c)
  maior <- a
  se b > maior entao
    maior <- b
  fimse
  se c > maior entao
    maior <- c
  fimse
  escreval("MAIOR=", maior)
fimalgoritmo`,
  },
  {
    id: "ex-35",
    kind: "desafio-visualg",
    subject: "visualg",
    difficulty: "basico",
    points: 10,
    prompt:
      "Leia um inteiro. Imprima exatamente PAR se o resto da divisão por dois for zero; caso contrário, imprima IMPAR. Zero também é par.",
    explanation:
      "Mod fornece o resto da divisão por dois. O resto zero identifica os pares, inclusive zero e pares negativos. Verificar se o número é positivo não determina sua paridade, e dividir por dois sem examinar o resto não realiza a decisão.",
    starterCode: `algoritmo "Paridade"
var
  numero: inteiro
inicio
  // Leia numero e use mod para decidir entre PAR e IMPAR.
fimalgoritmo`,
    tests: [
      { input: ["8"], expectedContains: ["PAR"] },
      { input: ["7"], expectedContains: ["IMPAR"] },
      { input: ["0"], expectedContains: ["PAR"] },
    ],
    solution: `algoritmo "Paridade"
var
  numero: inteiro
inicio
  leia(numero)
  se numero mod 2 = 0 entao
    escreval("PAR")
  senao
    escreval("IMPAR")
  fimse
fimalgoritmo`,
  },
  {
    id: "ex-36",
    kind: "desafio-visualg",
    subject: "visualg",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Leia um inteiro e use para para mostrar sua tabuada de 1 a 10. Cada linha deve seguir o formato numero x multiplicador = resultado, sem espaços: por exemplo, 3x2=6.",
    explanation:
      "Para percorre os multiplicadores de 1 a 10, incluindo os dois limites. O produto usa numero * i. Somar os valores não produz uma tabuada; terminar em 9 deixa a última linha de fora.",
    starterCode: `algoritmo "Tabuada"
var
  numero, i: inteiro
inicio
  // Leia numero.
  // Use para de 1 ate 10 e imprima cada multiplicacao.
fimalgoritmo`,
    tests: [
      {
        input: ["3"],
        expectedContains: ["3x1=3", "3x5=15", "3x10=30"],
      },
      {
        input: ["0"],
        expectedContains: ["0x1=0", "0x10=0"],
      },
      {
        input: ["-2"],
        expectedContains: ["-2x1=-2", "-2x10=-20"],
      },
    ],
    solution: `algoritmo "Tabuada"
var
  numero, i: inteiro
inicio
  leia(numero)
  para i de 1 ate 10 faca
    escreval(numero, "x", i, "=", numero * i)
  fimpara
fimalgoritmo`,
  },
  {
    id: "ex-37",
    kind: "desafio-visualg",
    subject: "visualg",
    difficulty: "desafio",
    points: 25,
    prompt:
      "Leia duas notas reais entre 0 e 10 e calcule sua média aritmética. Mostre MEDIA= seguido da média, sem espaços e sem exigir casas decimais fixas. Em outra linha, imprima APROVADO para média maior ou igual a 7; caso contrário, imprima REPROVADO.",
    explanation:
      "A soma entre parênteses deve ser dividida por dois. A comparação >= inclui a média 7 na aprovação. Usar > reprovaria indevidamente esse limite; dividir somente a segunda nota produz uma média errada.",
    starterCode: `algoritmo "Media escolar"
var
  nota1, nota2, media: real
inicio
  // Leia as notas, calcule a media e decida a situacao.
fimalgoritmo`,
    tests: [
      { input: ["6", "8"], expectedContains: ["MEDIA=7", "APROVADO"] },
      { input: ["4", "5"], expectedContains: ["MEDIA=4.5", "REPROVADO"] },
      { input: ["9", "10"], expectedContains: ["MEDIA=9.5", "APROVADO"] },
    ],
    solution: `algoritmo "Media escolar"
var
  nota1, nota2, media: real
inicio
  leia(nota1)
  leia(nota2)
  media <- (nota1 + nota2) / 2
  escreval("MEDIA=", media)
  se media >= 7 entao
    escreval("APROVADO")
  senao
    escreval("REPROVADO")
  fimse
fimalgoritmo`,
  },
  {
    id: "ex-38",
    kind: "desafio-visualg",
    subject: "visualg",
    difficulty: "desafio",
    points: 25,
    prompt:
      "Leia um inteiro não negativo e use enquanto para contar até zero, incluindo zero. Para cada valor, imprima CONTAGEM= seguido do número, sem espaços. Ao terminar, imprima FIM.",
    explanation:
      "A condição >= 0 inclui zero. Subtrair um dentro do laço faz a condição se tornar falsa após a última saída. Usar > 0 exclui zero; somar um afasta o contador da condição de parada.",
    starterCode: `algoritmo "Regressiva"
var
  contador: inteiro
inicio
  // Leia contador e use enquanto para chegar a zero.
  // Ao terminar, mostre FIM.
fimalgoritmo`,
    tests: [
      {
        input: ["3"],
        expectedContains: [
          "CONTAGEM=3",
          "CONTAGEM=2",
          "CONTAGEM=1",
          "CONTAGEM=0",
          "FIM",
        ],
      },
      { input: ["0"], expectedContains: ["CONTAGEM=0", "FIM"] },
    ],
    solution: `algoritmo "Regressiva"
var
  contador: inteiro
inicio
  leia(contador)
  enquanto contador >= 0 faca
    escreval("CONTAGEM=", contador)
    contador <- contador - 1
  fimenquanto
  escreval("FIM")
fimalgoritmo`,
  },
  {
    id: "ex-39",
    kind: "pratica-web",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt:
      "Dentro de main, crie um h1 com o texto Minha primeira página e um parágrafo com o texto Estou aprendendo HTML.",
    explanation:
      "H1 representa o título principal e p representa um parágrafo; main organiza o conteúdo principal. Usar apenas texto solto ou substituir tudo por div perde o significado dessas partes. O texto pedido deve estar nos elementos correspondentes.",
    starterHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Primeira página</title>
</head>
<body>
  <main>
    <!-- Acrescente o titulo e o paragrafo aqui. -->
  </main>
</body>
</html>`,
    starterCss: "",
    checks: [
      {
        type: "selector",
        selector: "main h1",
        min: 1,
        description: "Criar um h1 dentro de main.",
      },
      {
        type: "text",
        selector: "main h1",
        includes: "Minha primeira página",
        description: "Escrever Minha primeira página no título.",
      },
      {
        type: "text",
        selector: "main p",
        includes: "Estou aprendendo HTML.",
        description: "Criar o parágrafo com o texto solicitado.",
      },
    ],
    solutionHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Primeira página</title>
</head>
<body>
  <main>
    <h1>Minha primeira página</h1>
    <p>Estou aprendendo HTML.</p>
  </main>
</body>
</html>`,
    solutionCss: "",
  },
  {
    id: "ex-40",
    kind: "pratica-web",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt:
      "Crie uma lista não ordenada com três itens: HTML, CSS e Lógica. Cada nome deve ficar em seu próprio li dentro de ul.",
    explanation:
      "Ul representa uma lista sem ordem e cada li representa um item. Quebras de linha ou parágrafos não criam essa estrutura. Ol seria uma lista ordenada, diferente da solicitada.",
    starterHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meus estudos</title>
</head>
<body>
  <main>
    <h1>Meus estudos</h1>
    <!-- Crie a lista aqui. -->
  </main>
</body>
</html>`,
    starterCss: "",
    checks: [
      {
        type: "selector",
        selector: "ul > li",
        min: 3,
        description: "Criar pelo menos três itens diretamente dentro de ul.",
      },
      {
        type: "text",
        selector: "ul > li:nth-child(1)",
        includes: "HTML",
        description: "Escrever HTML no primeiro item.",
      },
      {
        type: "text",
        selector: "ul > li:nth-child(2)",
        includes: "CSS",
        description: "Escrever CSS no segundo item.",
      },
      {
        type: "text",
        selector: "ul > li:nth-child(3)",
        includes: "Lógica",
        description: "Escrever Lógica no terceiro item.",
      },
    ],
    solutionHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meus estudos</title>
</head>
<body>
  <main>
    <h1>Meus estudos</h1>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>Lógica</li>
    </ul>
  </main>
</body>
</html>`,
    solutionCss: "",
  },
  {
    id: "ex-41",
    kind: "pratica-web",
    subject: "html",
    difficulty: "basico",
    points: 10,
    prompt:
      "Crie um link com o texto Visitar exemplo e href igual a https://example.org. Não é necessário abrir outra aba.",
    explanation:
      "Um link usa a para representar navegação e href para informar o destino. Escrever a URL em um parágrafo não cria o mesmo elemento. Src não define o destino de uma âncora; target é opcional e não substitui href.",
    starterHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Link útil</title>
</head>
<body>
  <main>
    <h1>Link útil</h1>
    <!-- Acrescente uma ancora com destino e texto. -->
  </main>
</body>
</html>`,
    starterCss: "",
    checks: [
      {
        type: "attr",
        selector: "a",
        attr: "href",
        description: "Adicionar href a uma âncora.",
      },
      {
        type: "selector",
        selector: 'a[href="https://example.org"]',
        min: 1,
        description: "Usar https://example.org como destino.",
      },
      {
        type: "text",
        selector: 'a[href="https://example.org"]',
        includes: "Visitar exemplo",
        description: "Usar Visitar exemplo como texto do link.",
      },
    ],
    solutionHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Link útil</title>
</head>
<body>
  <main>
    <h1>Link útil</h1>
    <a href="https://example.org">Visitar exemplo</a>
  </main>
</body>
</html>`,
    solutionCss: "",
  },
  {
    id: "ex-42",
    kind: "pratica-web",
    subject: "html",
    difficulty: "intermediario",
    points: 15,
    prompt:
      "Crie uma imagem informativa com src não vazio e alt exatamente igual a Círculo azul. Você pode usar uma imagem própria desse objeto ou um SVG embutido em uma URL de dados.",
    explanation:
      "Src informa o recurso visual e alt comunica seu significado quando a imagem não pode ser vista. Para esta imagem informativa, alt vazio perderia informação. Title ou uma legenda não substituem automaticamente o texto alternativo do elemento.",
    starterHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Imagem acessível</title>
</head>
<body>
  <main>
    <h1>Uma forma geométrica</h1>
    <!-- Acrescente a imagem e descreva seu conteudo no alt. -->
  </main>
</body>
</html>`,
    starterCss: "",
    checks: [
      {
        type: "attr",
        selector: "img",
        attr: "src",
        description: "Informar src na imagem.",
      },
      {
        type: "selector",
        selector: 'img[src]:not([src=""])',
        min: 1,
        description: "Usar um src não vazio.",
      },
      {
        type: "attr",
        selector: "img",
        attr: "alt",
        description: "Fornecer o atributo alt.",
      },
      {
        type: "selector",
        selector: 'img[alt="Círculo azul"]',
        min: 1,
        description: "Descrever a imagem como Círculo azul.",
      },
    ],
    solutionHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Imagem acessível</title>
</head>
<body>
  <main>
    <h1>Uma forma geométrica</h1>
    <img
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='50' fill='blue'/%3E%3C/svg%3E"
      alt="Círculo azul"
      width="120"
      height="120"
    >
  </main>
</body>
</html>`,
    solutionCss: "",
  },
  {
    id: "ex-43",
    kind: "pratica-web",
    subject: "html",
    difficulty: "desafio",
    points: 25,
    prompt:
      "Crie um formulário com label de texto E-mail associado por for ao input de id email. O campo deve ter type email, name email e required. Adicione um button de type submit com texto Enviar. O exercício monta a interface, sem enviar dados a um servidor.",
    explanation:
      "A associação entre for e id dá um nome acessível ao campo. Type email permite validação de formato, required exige preenchimento e name identifica o dado em um envio. Placeholder não substitui label; um botão sem o tipo explícito não atende ao requisito solicitado.",
    starterHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Inscrição</title>
</head>
<body>
  <main>
    <h1>Receber novidades</h1>
    <!-- Monte o formulario com rotulo, campo e botao. -->
  </main>
</body>
</html>`,
    starterCss: "",
    checks: [
      {
        type: "selector",
        selector: "form",
        min: 1,
        description: "Criar um formulário.",
      },
      {
        type: "text",
        selector: 'form label[for="email"]',
        includes: "E-mail",
        description: "Criar o rótulo E-mail associado ao id email.",
      },
      {
        type: "selector",
        selector: 'form input#email[type="email"][name="email"]',
        min: 1,
        description: "Criar o campo com id, tipo e nome solicitados.",
      },
      {
        type: "attr",
        selector: "form input#email",
        attr: "required",
        description: "Marcar o campo como obrigatório.",
      },
      {
        type: "text",
        selector: 'form button[type="submit"]',
        includes: "Enviar",
        description: "Criar o botão de envio com texto Enviar.",
      },
    ],
    solutionHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Inscrição</title>
</head>
<body>
  <main>
    <h1>Receber novidades</h1>
    <form>
      <label for="email">E-mail</label>
      <input id="email" name="email" type="email" required>
      <button type="submit">Enviar</button>
    </form>
  </main>
</body>
</html>`,
    solutionCss: "",
  },
  {
    id: "ex-44",
    kind: "pratica-web",
    subject: "css",
    difficulty: "desafio",
    points: 25,
    prompt:
      "Crie um article com classe card, contendo h2 com texto Grupo de estudos e um parágrafo com texto Aprender em companhia. No CSS de .card, aplique display: flex, border-radius: 12px e padding: 16px. Use flex-direction: column para empilhar os conteúdos.",
    explanation:
      "A classe permite selecionar o card sem depender de um id. Flex ativa o layout, column empilha os itens, padding cria espaço interno e border-radius arredonda os cantos. Margin não substitui padding, e declarar propriedades fora de uma regra CSS não estiliza o card.",
    starterHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Card de estudos</title>
</head>
<body>
  <main>
    <!-- Crie o article com classe card e seus textos. -->
  </main>
</body>
</html>`,
    starterCss: `body {
  font-family: Arial, sans-serif;
  margin: 24px;
}`,
    checks: [
      {
        type: "selector",
        selector: "article.card",
        min: 1,
        description: "Criar um article com classe card.",
      },
      {
        type: "text",
        selector: "article.card h2",
        includes: "Grupo de estudos",
        description: "Adicionar o título Grupo de estudos.",
      },
      {
        type: "text",
        selector: "article.card p",
        includes: "Aprender em companhia",
        description: "Adicionar o parágrafo solicitado.",
      },
      {
        type: "css-property",
        property: "display",
        valueIncludes: "flex",
        description: "Ativar flexbox no CSS do card.",
      },
      {
        type: "css-property",
        property: "flex-direction",
        valueIncludes: "column",
        description: "Organizar os itens em coluna.",
      },
      {
        type: "css-property",
        property: "border-radius",
        valueIncludes: "12px",
        description: "Arredondar os cantos com 12px.",
      },
      {
        type: "css-property",
        property: "padding",
        valueIncludes: "16px",
        description: "Aplicar espaçamento interno de 16px.",
      },
    ],
    solutionHtml: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Card de estudos</title>
</head>
<body>
  <main>
    <article class="card">
      <h2>Grupo de estudos</h2>
      <p>Aprender em companhia</p>
    </article>
  </main>
</body>
</html>`,
    solutionCss: `body {
  font-family: Arial, sans-serif;
  margin: 24px;
}
.card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 16px;
  gap: 8px;
  border: 1px solid #b8c5d6;
  background-color: #f0f5ff;
}
.card h2,
.card p {
  margin: 0;
}`,
  },
];
