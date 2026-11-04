import type { Lesson } from "../types";

function documentHtml(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
${body}
</body>
</html>`;
}

const baseCss = `* { box-sizing: border-box; }
body {
  margin: 0;
  padding: 24px;
  font-family: Arial, sans-serif;
  color: #18334a;
  background: #edf3f8;
}
button, input { font: inherit; }
`;

type LessonData = {
  id: string;
  level: Lesson["level"];
  title: string;
  objective: string;
  explanation: string[];
  steps: string[];
  body: string;
  css: string;
  codeParts: Lesson["codeParts"];
  expectedOutput: string;
  task: string;
  hint: string;
  answerCss: string;
};

/**
 * Cada exercício parte do exemplo funcionando.
 * A resolução acrescenta regras ao final do CSS inicial:
 * com a mesma especificidade, a declaração posterior prevalece.
 */
function lesson(data: LessonData): Lesson {
  const code = documentHtml(data.title, data.body);
  const css = baseCss + data.css;

  return {
    id: data.id,
    track: "css",
    level: data.level,
    title: data.title,
    objective: data.objective,
    explanation: data.explanation,
    steps: data.steps,
    code,
    css,
    codeParts: data.codeParts,
    expectedOutput: data.expectedOutput,
    exercise: {
      prompt: data.task,
      hint: data.hint,
      starterCode: code,
      starterCss: css,
      solution: code,
      solutionCss: css + "\n\n" + data.answerCss,
    },
  };
}

export const cssBasico: Lesson[] = [
  lesson({
    id: "css-b-01",
    level: "basico",
    title: "O que é CSS?",
    objective: "Entender como o CSS transforma a apresentação de um HTML.",
    explanation: [
      "O HTML organiza o conteúdo: títulos, parágrafos e outras partes da página. O CSS cuida da apresentação, como cores, tamanhos e espaços. Assim, o mesmo conteúdo pode ganhar aparências diferentes.",
      "Uma regra CSS tem um seletor e um bloco entre chaves. Em h1 { color: navy; }, h1 escolhe os títulos e color define a cor do texto. Cada declaração usa dois-pontos e termina com ponto e vírgula.",
      "Neste exemplo, o artigo vira um cartão branco e o título fica azul. No laboratório, o campo CSS já é aplicado à página: altere uma propriedade por vez e observe o resultado.",
    ],
    steps: [
      "Crie um artigo com título e parágrafo.",
      "Escolha o artigo usando o seletor article.",
      "Defina fundo, espaço interno e cantos arredondados.",
      "Aplique uma cor ao título e compare a prévia.",
    ],
    body: `<article>
  <h1>Minha primeira página com estilo</h1>
  <p>Aprender CSS é dar personalidade ao conteúdo.</p>
</article>`,
    css: `article {
  max-width: 460px;
  padding: 24px;
  background: white;
  border-radius: 16px;
}
h1 { color: #2457c5; }`,
    codeParts: [
      {
        code: "<h1>Minha primeira página com estilo</h1>",
        explanation: "O HTML informa que este texto é o título principal.",
      },
      {
        code: "background: white;",
        explanation: "A propriedade background pinta o fundo do artigo.",
      },
      {
        code: "h1 { color: #2457c5; }",
        explanation: "O seletor h1 encontra o título e muda sua cor.",
      },
    ],
    expectedOutput:
      "Um cartão branco com cantos arredondados, título azul e um parágrafo, sobre um fundo claro.",
    task: "Acrescente CSS ao final para deixar o título roxo e o fundo do artigo amarelo-claro.",
    hint: "Use os seletores h1 e article, com color e background.",
    answerCss: `h1 { color: #7e22ce; }
article { background: #fff7cc; }`,
  }),
  lesson({
    id: "css-b-02",
    level: "basico",
    title: "Como adicionar CSS ao HTML",
    objective: "Distinguir CSS inline, interno e externo.",
    explanation: [
      "Existem três formas comuns de conectar CSS ao HTML. O estilo inline fica no atributo style de um elemento. O título do exemplo usa essa forma; ela serve para alterações pontuais, mas espalhar estilos pelo HTML dificulta a manutenção.",
      "O CSS interno fica dentro de uma tag <style> no head. O CSS externo fica em um arquivo, como estilos.css, ligado pelo elemento <link rel=\"stylesheet\" href=\"estilos.css\"> no head. Um arquivo externo pode ser compartilhado por várias páginas.",
      "No laboratório, escrevemos as regras no campo CSS, que é aplicado automaticamente. Por isso, a página não precisa de uma tag style nem de um link real. Os cartões mostram essas formas como texto, sem tentar carregar outro arquivo.",
    ],
    steps: [
      "Observe o atributo style no título.",
      "Leia a representação de CSS interno no segundo cartão.",
      "Leia a ligação com arquivo externo no terceiro cartão.",
      "Edite o campo CSS para modificar os cartões.",
    ],
    body: `<main>
  <h1 style="color: #7e22ce;">Três caminhos para o CSS</h1>
  <article>
    <h2>Inline</h2>
    <code>&lt;h1 style="color: purple;"&gt;Olá&lt;/h1&gt;</code>
  </article>
  <article>
    <h2>Interno: no head</h2>
    <code>&lt;style&gt;h1 { color: purple; }&lt;/style&gt;</code>
  </article>
  <article>
    <h2>Externo: no head</h2>
    <code>&lt;link rel="stylesheet" href="estilos.css"&gt;</code>
  </article>
</main>`,
    css: `main { max-width: 680px; }
article {
  padding: 18px;
  margin-bottom: 12px;
  background: white;
  border-left: 4px solid #7e22ce;
}
code { overflow-wrap: anywhere; }`,
    codeParts: [
      {
        code: '<h1 style="color: #7e22ce;">Três caminhos para o CSS</h1>',
        explanation: "O atributo style aplica uma declaração diretamente ao título.",
      },
      {
        code: "&lt;style&gt;h1 { color: purple; }&lt;/style&gt;",
        explanation: "As entidades exibem a sintaxe do CSS interno como texto.",
      },
      {
        code: "&lt;link rel=\"stylesheet\" href=\"estilos.css\"&gt;",
        explanation: "Este texto mostra como conectar um arquivo CSS externo no head.",
      },
      {
        code: "border-left: 4px solid #7e22ce;",
        explanation: "Esta declaração fica no campo CSS e cria a faixa dos cartões.",
      },
    ],
    expectedOutput:
      "Um título roxo e três cartões brancos que apresentam as formas inline, interna e externa de adicionar CSS.",
    task: "Sem modificar o HTML nem o estilo inline, acrescente CSS para deixar a borda esquerda dos três cartões verde e com 8px de espessura.",
    hint: "Selecione article e redefina border-left no campo CSS.",
    answerCss: `article { border-left: 8px solid #15803d; }`,
  }),
  lesson({
    id: "css-b-03",
    level: "basico",
    title: "Seletores",
    objective: "Selecionar elementos por tag, classe, ID, descendência e agrupamento.",
    explanation: [
      "Um seletor indica quais elementos recebem uma regra. O seletor de tag, como article, encontra todas as ocorrências dessa tag. O seletor de classe começa com ponto e pode ser reutilizado, como .destaque.",
      "Um ID começa com # no CSS e deve identificar apenas um elemento no documento. Já .card p seleciona parágrafos dentro de elementos com a classe card, mesmo quando há outros elementos entre eles.",
      "A vírgula agrupa seletores: h1, h2 aplica a mesma regra aos dois tipos de título. Observe que o parágrafo fora do cartão não recebe a cor definida por .card p.",
    ],
    steps: [
      "Estilize todos os artigos pelo nome da tag.",
      "Marque um artigo com a classe destaque.",
      "Use o ID principal em apenas um título.",
      "Compare o seletor descendente com o agrupamento por vírgula.",
    ],
    body: `<main>
  <h1 id="principal">Trilhas de estudo</h1>
  <p>Escolha por onde começar.</p>
  <article class="card destaque">
    <h2>HTML e CSS</h2>
    <p>Estrutura e apresentação juntas.</p>
  </article>
  <article class="card">
    <h2>Lógica</h2>
    <p>Um passo de cada vez.</p>
  </article>
</main>`,
    css: `article { padding: 18px; margin-bottom: 12px; background: white; }
.destaque { border-left: 6px solid #d97706; }
#principal { letter-spacing: 1px; }
.card p { color: #526477; }
h1, h2 { color: #2457c5; }`,
    codeParts: [
      {
        code: "article { padding: 18px; margin-bottom: 12px; background: white; }",
        explanation: "A tag seleciona os dois artigos.",
      },
      {
        code: ".destaque { border-left: 6px solid #d97706; }",
        explanation: "A classe seleciona somente o artigo marcado como destaque.",
      },
      {
        code: "#principal { letter-spacing: 1px; }",
        explanation: "O ID encontra o título principal.",
      },
      {
        code: ".card p { color: #526477; }",
        explanation: "O espaço indica parágrafos descendentes dos cartões.",
      },
      {
        code: "h1, h2 { color: #2457c5; }",
        explanation: "A vírgula compartilha a regra entre títulos de dois níveis.",
      },
    ],
    expectedOutput:
      "Dois cartões com títulos azuis; o primeiro tem faixa laranja. Os parágrafos dos cartões têm uma cor própria.",
    task: "Acrescente uma regra para deixar apenas os parágrafos dentro dos cartões verdes e outra para centralizar h1 e h2 usando agrupamento.",
    hint: "Combine .card p com h1, h2; não altere o parágrafo de introdução.",
    answerCss: `.card p { color: #15803d; }
h1, h2 { text-align: center; }`,
  }),
  lesson({
    id: "css-b-04",
    level: "basico",
    title: "Cores",
    objective: "Experimentar cores com nomes, hexadecimal, RGB e HSL.",
    explanation: [
      "CSS aceita nomes de cores em inglês, como navy e white. Também aceita códigos hexadecimais, como #7c3aed, que representam a mistura de vermelho, verde e azul.",
      "Em rgb(22, 101, 52), cada número indica a intensidade de um canal, de 0 a 255. Em hsl(24, 95%, 35%), usamos matiz, saturação e luminosidade: a matiz percorre um círculo de cores.",
      "color altera o texto; background altera o fundo. Escolha combinações com contraste suficiente: um texto escuro sobre um fundo claro costuma ser mais legível do que duas cores muito parecidas.",
    ],
    steps: [
      "Crie quatro cartões com classes diferentes.",
      "Aplique uma cor usando um nome.",
      "Experimente as notações hexadecimal, RGB e HSL.",
      "Confira se o texto continua fácil de ler.",
    ],
    body: `<main>
  <h1>Paleta de estudos</h1>
  <p class="nome">Nome: navy</p>
  <p class="hex">Hexadecimal: #7c3aed</p>
  <p class="rgb">RGB: 22, 101, 52</p>
  <p class="hsl">HSL: 24, 95%, 35%</p>
</main>`,
    css: `main { max-width: 500px; }
main p { padding: 20px; border-radius: 12px; color: white; }
.nome { background: navy; }
.hex { background: #7c3aed; }
.rgb { background: rgb(22, 101, 52); }
.hsl { background: hsl(24, 95%, 35%); }`,
    codeParts: [
      {
        code: ".nome { background: navy; }",
        explanation: "Usa um nome de cor reconhecido pelo CSS.",
      },
      {
        code: ".hex { background: #7c3aed; }",
        explanation: "O código hexadecimal define um tom de roxo.",
      },
      {
        code: ".rgb { background: rgb(22, 101, 52); }",
        explanation: "Os três canais formam um verde escuro.",
      },
      {
        code: ".hsl { background: hsl(24, 95%, 35%); }",
        explanation: "A notação HSL produz um tom alaranjado escuro.",
      },
    ],
    expectedOutput:
      "Quatro faixas arredondadas em azul-marinho, roxo, verde e laranja escuro, com textos brancos.",
    task: "Mude o fundo do cartão .rgb para rgb(30, 64, 175) e o do cartão .hsl para hsl(280, 60%, 35%).",
    hint: "Mantenha as funções rgb() e hsl() e substitua somente os valores.",
    answerCss: `.rgb { background: rgb(30, 64, 175); }
.hsl { background: hsl(280, 60%, 35%); }`,
  }),
  lesson({
    id: "css-b-05",
    level: "basico",
    title: "Fontes e textos",
    objective: "Controlar família, tamanho, peso, alinhamento e entrelinha.",
    explanation: [
      "font-family define a família de fontes. Uma lista como Georgia, serif tenta usar Georgia e, se ela não estiver disponível, escolhe uma fonte serifada do sistema. Não precisamos baixar fontes para criar uma composição agradável.",
      "font-size controla o tamanho, font-weight controla o peso e line-height define a altura das linhas. Uma entrelinha sem unidade, como 1.6, acompanha o tamanho da fonte e facilita a leitura.",
      "text-align alinha o conteúdo textual. text-transform muda sua apresentação para maiúsculas ou minúsculas, enquanto letter-spacing ajusta o espaço entre letras. Use esses recursos com moderação, especialmente em textos longos.",
    ],
    steps: [
      "Organize uma chamada, um título e uma descrição.",
      "Escolha uma fonte serifada para o título.",
      "Ajuste tamanho e entrelinha da descrição.",
      "Centralize o cartão e destaque a chamada.",
    ],
    body: `<article class="leitura">
  <p class="categoria">Biblioteca aberta</p>
  <h1>Uma página por dia</h1>
  <p class="descricao">Pequenos momentos de leitura ajudam a descobrir novas ideias e ampliar o vocabulário.</p>
</article>`,
    css: `.leitura {
  max-width: 520px;
  padding: 28px;
  background: white;
  text-align: center;
}
.categoria { text-transform: uppercase; letter-spacing: 2px; font-size: 12px; }
h1 { font-family: Georgia, serif; font-size: 32px; font-weight: 700; }
.descricao { font-size: 18px; line-height: 1.6; }`,
    codeParts: [
      {
        code: "font-family: Georgia, serif;",
        explanation: "Usa Georgia quando disponível e uma serifada como alternativa.",
      },
      {
        code: ".descricao { font-size: 18px; line-height: 1.6; }",
        explanation: "Aumenta o texto e deixa as linhas mais arejadas.",
      },
      {
        code: "text-align: center;",
        explanation: "Centraliza o texto dentro do cartão.",
      },
      {
        code: ".categoria { text-transform: uppercase; letter-spacing: 2px; font-size: 12px; }",
        explanation: "Transforma a chamada em uma pequena etiqueta visual.",
      },
    ],
    expectedOutput:
      "Um cartão branco centralizando uma chamada em maiúsculas, um título serifado e uma descrição com linhas espaçadas.",
    task: "Deixe a descrição alinhada à esquerda, com tamanho de 20px e entrelinha de 1.8.",
    hint: "Acrescente uma regra para .descricao com três declarações.",
    answerCss: `.descricao {
  text-align: left;
  font-size: 20px;
  line-height: 1.8;
}`,
  }),
  lesson({
    id: "css-b-06",
    level: "basico",
    title: "Background",
    objective: "Usar cor e imagem de fundo com tamanho e posição.",
    explanation: [
      "O fundo aparece atrás do conteúdo e do preenchimento de um elemento. background-color escolhe uma cor; background-image pode carregar uma imagem usando url(). A cor ainda serve como alternativa se a imagem não carregar.",
      "background-size: cover preenche a área inteira, mas pode cortar partes da imagem. background-position: center centraliza esse recorte. background-repeat: no-repeat impede que a imagem seja repetida como um mosaico.",
      "Uma imagem de fundo é decorativa e não tem texto alternativo. Para uma imagem que transmite informação importante, prefira a tag img com alt. Aqui, o texto fica sobre um painel branco para manter a leitura independentemente da foto sorteada.",
    ],
    steps: [
      "Crie uma seção com uma mensagem de viagem.",
      "Escolha uma cor de fundo de reserva.",
      "Adicione a imagem, sem repetição e com cover.",
      "Coloque o texto sobre um painel claro.",
    ],
    body: `<section class="viagem">
  <div class="mensagem">
    <h1>Uma pausa para explorar</h1>
    <p>Descubra novos lugares no próximo fim de semana.</p>
  </div>
</section>`,
    css: `.viagem {
  max-width: 680px;
  min-height: 320px;
  padding: 28px;
  background-color: #b9d8e5;
  background-image: url("https://picsum.photos/seed/viagem/400/250");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.mensagem { max-width: 320px; padding: 18px; background: white; }`,
    codeParts: [
      {
        code: "background-color: #b9d8e5;",
        explanation: "Define uma cor visível mesmo sem a imagem.",
      },
      {
        code: 'background-image: url("https://picsum.photos/seed/viagem/400/250");',
        explanation: "Carrega a fotografia decorativa do fundo.",
      },
      {
        code: "background-size: cover;",
        explanation: "Preenche a área, aceitando recortes da fotografia.",
      },
      {
        code: "background-position: center;",
        explanation: "Mantém o centro da imagem como referência do recorte.",
      },
    ],
    expectedOutput:
      "Uma seção com fotografia de fundo e um painel branco contendo título e descrição; se a foto falhar, aparece um fundo azul-claro.",
    task: "Mude a altura mínima da seção para 400px e alinhe a imagem ao centro horizontal e ao topo vertical.",
    hint: "Use min-height e background-position: center top.",
    answerCss: `.viagem {
  min-height: 400px;
  background-position: center top;
}`,
  }),
  lesson({
    id: "css-b-07",
    level: "basico",
    title: "Bordas",
    objective: "Aplicar espessura, estilo, cor e arredondamento às bordas.",
    explanation: [
      "A borda contorna a caixa de um elemento. A forma abreviada border reúne espessura, estilo e cor, como border: 2px solid blue. Sem um estilo visível, apenas escolher uma cor não costuma produzir o contorno esperado.",
      "solid cria uma linha contínua; dashed cria traços; dotted cria pontos. Também podemos escolher um lado, como border-left, para dar destaque sem desenhar todo o contorno.",
      "border-radius arredonda os cantos, mas não altera a função do elemento. Compare os cartões: a diferença entre eles está no estilo da borda e no raio dos cantos, não na estrutura do conteúdo.",
    ],
    steps: [
      "Crie dois cartões de aviso.",
      "Aplique uma borda contínua ao primeiro.",
      "Use uma borda tracejada no segundo.",
      "Experimente raios diferentes nos cantos.",
    ],
    body: `<main>
  <article class="aviso confirmado">
    <h1>Inscrição confirmada</h1>
    <p>Seu lugar na oficina está reservado.</p>
  </article>
  <article class="aviso rascunho">
    <h2>Ideia em construção</h2>
    <p>Este projeto ainda pode receber ajustes.</p>
  </article>
</main>`,
    css: `.aviso { max-width: 500px; padding: 20px; margin-bottom: 18px; background: white; }
.confirmado { border: 2px solid #15803d; border-radius: 16px; }
.rascunho { border: 2px dashed #946200; border-radius: 4px; }`,
    codeParts: [
      {
        code: "border: 2px solid #15803d;",
        explanation: "Cria um contorno verde contínuo de dois pixels.",
      },
      {
        code: "border: 2px dashed #946200;",
        explanation: "Cria um contorno tracejado no cartão de rascunho.",
      },
      {
        code: "border-radius: 16px;",
        explanation: "Arredonda os quatro cantos do primeiro cartão.",
      },
    ],
    expectedOutput:
      "Dois avisos brancos: um com borda verde contínua e cantos arredondados; outro com borda tracejada amarronzada.",
    task: "Troque a borda do rascunho por uma borda pontilhada roxa de 3px e arredonde seus cantos em 20px.",
    hint: "Use dotted na propriedade border de .rascunho.",
    answerCss: `.rascunho {
  border: 3px dotted #7e22ce;
  border-radius: 20px;
}`,
  }),
  lesson({
    id: "css-b-08",
    level: "basico",
    title: "Margens",
    objective: "Controlar o espaço externo e centralizar blocos com margin.",
    explanation: [
      "margin cria espaço do lado de fora da borda. Ela separa uma caixa das outras sem pintar essa região com o fundo do próprio elemento. Para perceber a diferença, observe o espaço entre os cartões.",
      "Com quatro valores, a ordem é topo, direita, base e esquerda. Com dois, o primeiro vale para cima e para baixo; o segundo, para os lados. margin: 0 auto centraliza horizontalmente um bloco cuja largura deixa espaço disponível.",
      "Margens verticais de blocos no fluxo normal podem colapsar: duas margens positivas vizinhas nem sempre são somadas. Não confunda esse comportamento com o padding, que pertence ao interior da caixa e será estudado na próxima aula.",
    ],
    steps: [
      "Limite a largura da lista de cartões.",
      "Centralize a lista com margens automáticas.",
      "Remova a margem superior dos títulos.",
      "Use margem inferior para afastar os cartões.",
    ],
    body: `<main class="lista">
  <h1>Agenda da semana</h1>
  <article class="evento">
    <h2>Segunda: HTML</h2>
    <p>Organizar o conteúdo da página.</p>
  </article>
  <article class="evento">
    <h2>Quarta: CSS</h2>
    <p>Experimentar cores e espaços.</p>
  </article>
</main>`,
    css: `.lista { max-width: 520px; margin: 0 auto; }
.evento { padding: 20px; margin-bottom: 24px; background: white; }
.evento h2 { margin-top: 0; }
.evento p { margin-bottom: 0; }`,
    codeParts: [
      {
        code: ".lista { max-width: 520px; margin: 0 auto; }",
        explanation: "Limita a largura e distribui o espaço lateral disponível.",
      },
      {
        code: "margin-bottom: 24px;",
        explanation: "Reserva espaço externo abaixo de cada cartão.",
      },
      {
        code: ".evento h2 { margin-top: 0; }",
        explanation: "Remove a margem padrão acima do título do cartão.",
      },
    ],
    expectedOutput:
      "Uma agenda de largura limitada e centralizada quando há espaço, com dois cartões brancos separados verticalmente.",
    task: "Aumente o espaço abaixo de cada evento para 40px e adicione uma margem superior de 32px à lista, mantendo-a centralizada.",
    hint: "Use margin-bottom nos eventos e margin: 32px auto 0 na lista.",
    answerCss: `.evento { margin-bottom: 40px; }
.lista { margin: 32px auto 0; }`,
  }),
  lesson({
    id: "css-b-09",
    level: "basico",
    title: "Espaçamentos (padding)",
    objective: "Criar respiro interno e diferenciar padding de margin.",
    explanation: [
      "padding é o espaço entre o conteúdo e a borda da caixa. Ao contrário da margem, ele recebe o fundo do elemento. Um cartão com padding deixa o texto afastado das suas extremidades.",
      "A propriedade aceita um valor para todos os lados ou dois valores para os eixos vertical e horizontal. Em padding: 12px 24px, ficam 12px acima e abaixo, e 24px à esquerda e à direita.",
      "Também existem padding-top, padding-right, padding-bottom e padding-left. Aqui usamos espaços diferentes no cartão e no botão. O botão continua sendo um botão real: o CSS só muda sua apresentação.",
    ],
    steps: [
      "Crie um cartão com uma ação.",
      "Aplique preenchimento interno ao cartão.",
      "Use dois valores para o preenchimento do botão.",
      "Observe o fundo ocupando também a região do padding.",
    ],
    body: `<article class="convite">
  <h1>Vamos praticar?</h1>
  <p>Reserve dez minutos para criar sua próxima página.</p>
  <button type="button">Começar depois</button>
</article>`,
    css: `.convite {
  max-width: 480px;
  padding: 24px;
  background: white;
  border: 2px solid #b7c9dc;
  border-radius: 14px;
}
.convite h1 { margin-top: 0; }
button {
  padding: 12px 24px;
  border: 0;
  border-radius: 8px;
  background: #2457c5;
  color: white;
}`,
    codeParts: [
      {
        code: "padding: 24px;",
        explanation: "Afasta o conteúdo dos quatro lados do cartão.",
      },
      {
        code: "padding: 12px 24px;",
        explanation: "Dá ao botão mais espaço horizontal do que vertical.",
      },
      {
        code: '<button type="button">Começar depois</button>',
        explanation: "Cria um botão sem envio de formulário; aqui ele é apenas demonstrativo.",
      },
    ],
    expectedOutput:
      "Um convite branco com borda, conteúdo afastado dos cantos e um botão azul com espaço ao redor do texto.",
    task: "Deixe o cartão com padding de 40px e o botão com 16px de padding vertical e 32px horizontal.",
    hint: "Modifique padding em .convite e em button, sem usar margin.",
    answerCss: `.convite { padding: 40px; }
button { padding: 16px 32px; }`,
  }),
  lesson({
    id: "css-b-10",
    level: "basico",
    title: "Largura e altura",
    objective: "Combinar width, max-width, min-height e altura automática.",
    explanation: [
      "width define a largura da caixa, e height define sua altura. Pixels são medidas fixas; porcentagens de largura normalmente usam a largura do bloco que contém o elemento como referência.",
      "max-width coloca um limite superior e ajuda uma caixa a caber em telas menores. min-height garante uma altura mínima, mas permite que o conteúdo faça a caixa crescer. Uma altura fixa em textos pode causar transbordamento.",
      "Nas imagens, width: 100% com height: auto acompanha o espaço disponível e preserva a proporção original. Neste cartão, limitamos o conjunto sem prender a altura do texto.",
    ],
    steps: [
      "Defina uma largura fluida para o cartão.",
      "Limite essa largura com max-width.",
      "Faça a foto acompanhar a largura do cartão.",
      "Use min-height na descrição, sem cortar o conteúdo.",
    ],
    body: `<article class="destino">
  <img src="https://picsum.photos/seed/destino/400/250" alt="Fotografia ilustrativa de um destino">
  <div class="texto">
    <h1>Um lugar para descobrir</h1>
    <p>Planeje uma saída tranquila e leve um caderno para registrar ideias.</p>
  </div>
</article>`,
    css: `.destino { width: 100%; max-width: 400px; background: white; }
.destino img { display: block; width: 100%; height: auto; }
.texto { min-height: 180px; padding: 20px; }
.texto h1 { margin-top: 0; }`,
    codeParts: [
      {
        code: ".destino { width: 100%; max-width: 400px; background: white; }",
        explanation: "Ocupa a largura disponível, sem ultrapassar 400px.",
      },
      {
        code: ".destino img { display: block; width: 100%; height: auto; }",
        explanation: "A imagem se ajusta ao cartão mantendo sua proporção.",
      },
      {
        code: ".texto { min-height: 180px; padding: 20px; }",
        explanation: "Reserva uma altura mínima para a descrição, mas permite crescimento.",
      },
    ],
    expectedOutput:
      "Um cartão de até 400px, com fotografia na largura inteira e uma área branca de descrição abaixo.",
    task: "Aumente o limite de largura do cartão para 560px e a altura mínima da área de texto para 220px.",
    hint: "Altere max-width em .destino e min-height em .texto; mantenha a imagem proporcional.",
    answerCss: `.destino { max-width: 560px; }
.texto { min-height: 220px; }`,
  }),
  lesson({
    id: "css-b-11",
    level: "basico",
    title: "Box Model (box-sizing)",
    objective: "Calcular a caixa e comparar content-box com border-box.",
    explanation: [
      "O modelo de caixa reúne conteúdo, padding, borda e margem. Por padrão, com content-box, width mede somente o conteúdo: padding e bordas aumentam a largura externa da caixa.",
      "Neste exemplo, cada caixa declara width: 240px, padding de 20px por lado e bordas de 4px. A caixa content-box ocupa 288px de largura: 240 + 40 + 8. A caixa border-box ocupa 240px no total, deixando 192px para o conteúdo.",
      "A regra geral do laboratório usa border-box por facilitar o planejamento. Nesta comparação, substituímos essa regra em uma caixa. A margem fica fora do cálculo de width nos dois modelos.",
    ],
    steps: [
      "Crie duas caixas com a mesma largura declarada.",
      "Aplique padding e bordas iguais.",
      "Escolha content-box para a primeira.",
      "Compare a largura externa com a segunda, que usa border-box.",
    ],
    body: `<main>
  <h1>A mesma largura?</h1>
  <article class="caixa conteudo">
    <h2>content-box</h2>
    <p>240px + padding + bordas = 288px.</p>
  </article>
  <article class="caixa total">
    <h2>border-box</h2>
    <p>240px já incluem padding e bordas.</p>
  </article>
</main>`,
    css: `.caixa {
  width: 240px;
  padding: 20px;
  border: 4px solid #2457c5;
  margin-bottom: 20px;
  background: white;
}
.caixa h2 { font-size: 20px; }
.conteudo { box-sizing: content-box; }
.total { box-sizing: border-box; }`,
    codeParts: [
      {
        code: "width: 240px;",
        explanation: "O significado dessa largura depende de box-sizing.",
      },
      {
        code: "padding: 20px;",
        explanation: "Acrescenta espaço interno dos dois lados.",
      },
      {
        code: ".conteudo { box-sizing: content-box; }",
        explanation: "A primeira caixa soma padding e bordas à largura declarada.",
      },
      {
        code: ".total { box-sizing: border-box; }",
        explanation: "A segunda inclui padding e bordas nos 240px.",
      },
    ],
    expectedOutput:
      "Duas caixas brancas com bordas azuis: a primeira mede 288px de largura externa; a segunda, 240px.",
    task: "Faça as duas caixas usarem border-box e terem largura externa de 280px. Não altere os textos explicativos; concentre a mudança no CSS.",
    hint: "Uma regra em .caixa não vence a regra .conteudo se vier antes; acrescente as regras ao final.",
    answerCss: `.caixa { width: 280px; }
.conteudo, .total { box-sizing: border-box; }`,
  }),
  lesson({
    id: "css-b-12",
    level: "basico",
    title: "Classes e IDs",
    objective: "Reutilizar classes e reservar IDs para identificações únicas.",
    explanation: [
      "Classes são rótulos reutilizáveis. Vários elementos podem ter class=\"card\", e um mesmo elemento pode combinar classes, como class=\"card favorito\". No CSS, escrevemos .card e .favorito.",
      "Um ID deve ser único no documento. Ele também pode ser o destino de um link interno: href=\"#ana\" leva ao elemento com id=\"ana\". No CSS, #ana seleciona esse perfil específico.",
      "Prefira classes para os estilos reutilizáveis dos componentes. Seletores de ID têm mais especificidade que seletores de classe, o que pode dificultar substituições. Aqui, o ID dá apenas um contorno especial ao perfil de Ana.",
    ],
    steps: [
      "Crie dois perfis com a classe card.",
      "Adicione favorito somente ao primeiro perfil.",
      "Dê a cada perfil um ID diferente.",
      "Use um link interno para navegar até Ana.",
    ],
    body: `<main>
  <h1>Equipe de estudos</h1>
  <p><a href="#ana">Encontrar Ana</a></p>
  <article id="ana" class="card favorito">
    <h2>Ana</h2>
    <p>Gosta de desenhar interfaces.</p>
  </article>
  <article id="bruno" class="card">
    <h2>Bruno</h2>
    <p>Gosta de organizar conteúdos.</p>
  </article>
</main>`,
    css: `.card { max-width: 460px; padding: 20px; margin-bottom: 18px; background: white; }
.favorito { background: #fff4cf; }
#ana { border-left: 5px solid #a16207; }
a { color: #2457c5; }`,
    codeParts: [
      {
        code: '<article id="ana" class="card favorito">',
        explanation: "Combina duas classes reutilizáveis com um identificador único.",
      },
      {
        code: ".card { max-width: 460px; padding: 20px; margin-bottom: 18px; background: white; }",
        explanation: "Compartilha a estrutura visual entre os dois perfis.",
      },
      {
        code: ".favorito { background: #fff4cf; }",
        explanation: "A classe adicional muda o fundo do perfil favorito.",
      },
      {
        code: '<a href="#ana">Encontrar Ana</a>',
        explanation: "O fragmento aponta para o elemento cujo ID é ana.",
      },
    ],
    expectedOutput:
      "Dois perfis com estilo compartilhado; Ana tem fundo amarelo-claro e faixa lateral, e um link aponta para seu cartão.",
    task: "Acrescente uma borda arredondada de 16px a todos os cartões e deixe apenas o título de Bruno verde usando seu ID.",
    hint: "Use .card para a regra compartilhada e #bruno h2 para o título específico.",
    answerCss: `.card { border-radius: 16px; }
#bruno h2 { color: #15803d; }`,
  }),
];

export const cssIntermediario: Lesson[] = [
  lesson({
    id: "css-i-01",
    level: "intermediario",
    title: "Flexbox",
    objective: "Distribuir e alinhar elementos em uma dimensão.",
    explanation: [
      "Flexbox organiza os filhos diretos de um contêiner ao longo de um eixo principal. display: flex ativa esse modelo; por padrão, os itens ficam em linha. flex-direction: column troca o eixo principal para a vertical.",
      "justify-content distribui espaço no eixo principal, e align-items alinha no eixo transversal. gap cria intervalos entre os itens sem depender de margens individuais.",
      "flex-wrap: wrap permite novas linhas quando falta espaço. Nos cartões, flex: 1 1 160px permite crescer, encolher e partir de uma base de 160px. O resultado se adapta ao espaço disponível sem uma largura fixa para cada cartão.",
    ],
    steps: [
      "Transforme o cabeçalho em um contêiner flexível.",
      "Afaste a marca e o menu com space-between.",
      "Use gap para separar os links.",
      "Ative a quebra de linha na lista de cartões.",
    ],
    body: `<header class="barra">
  <strong>Clube de estudos</strong>
  <nav aria-label="Principal">
    <a href="#trilhas">Trilhas</a>
    <a href="#contato">Contato</a>
  </nav>
</header>
<main id="trilhas" class="trilhas">
  <article><h1>HTML</h1><p>Estruture ideias.</p></article>
  <article><h2>CSS</h2><p>Crie apresentações.</p></article>
  <article><h2>Lógica</h2><p>Organize soluções.</p></article>
</main>
<footer id="contato"><p>Contato: equipe do clube.</p></footer>`,
    css: `.barra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background: white;
}
nav { display: flex; gap: 16px; }
a { color: #2457c5; }
.trilhas { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 24px; }
.trilhas article { flex: 1 1 160px; padding: 20px; background: #dce9ff; }
.trilhas h1, .trilhas h2 { font-size: 24px; }`,
    codeParts: [
      {
        code: "display: flex;",
        explanation: "Ativa o layout flexível para os filhos diretos.",
      },
      {
        code: "justify-content: space-between;",
        explanation: "Distribui o espaço livre entre marca e menu.",
      },
      {
        code: "align-items: center;",
        explanation: "Alinha os itens no centro do eixo transversal.",
      },
      {
        code: ".trilhas { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 24px; }",
        explanation: "Permite que os cartões quebrem linha e mantém intervalos regulares.",
      },
      {
        code: "flex: 1 1 160px;",
        explanation: "Permite crescimento e redução a partir de uma base de 160px.",
      },
    ],
    expectedOutput:
      "Uma barra com marca e links, seguida de três cartões azuis que se distribuem em linhas conforme a largura disponível.",
    task: "Coloque os cartões em uma coluna e aumente o intervalo entre eles para 24px, mantendo o cabeçalho como está.",
    hint: "Altere somente .trilhas com flex-direction e gap.",
    answerCss: `.trilhas { flex-direction: column; gap: 24px; }`,
  }),
  lesson({
    id: "css-i-02",
    level: "intermediario",
    title: "CSS Grid",
    objective: "Organizar cartões em linhas e colunas com Grid.",
    explanation: [
      "CSS Grid organiza os filhos diretos em uma grade bidimensional. display: grid ativa o modelo, e grid-template-columns descreve as colunas. Em repeat(2, minmax(0, 1fr)), criamos duas colunas iguais.",
      "A unidade fr representa uma fração do espaço disponível. minmax(0, 1fr) deixa a coluna encolher sem impor o tamanho mínimo automático do conteúdo. gap separa linhas e colunas sem espaços extras nas bordas externas.",
      "grid-column: 1 / -1 faz um item ir da primeira à última linha da grade. No exemplo, a introdução ocupa toda a largura e os demais cartões entram automaticamente nas próximas células.",
    ],
    steps: [
      "Ative Grid no elemento main.",
      "Crie duas colunas de mesma largura.",
      "Defina um intervalo de 16px.",
      "Faça o cartão de apresentação atravessar todas as colunas.",
    ],
    body: `<main class="painel">
  <article class="resumo"><h1>Meu painel</h1><p>Um lugar para acompanhar a semana.</p></article>
  <article><h2>3</h2><p>Aulas concluídas</p></article>
  <article><h2>2</h2><p>Projetos em andamento</p></article>
  <article><h2>4</h2><p>Ideias anotadas</p></article>
  <article><h2>1</h2><p>Meta para hoje</p></article>
</main>`,
    css: `.painel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  max-width: 760px;
  margin: 0 auto;
}
.painel article { padding: 20px; background: white; border-radius: 12px; }
.painel h2 { color: #2457c5; font-size: 32px; }
.resumo { grid-column: 1 / -1; border-top: 6px solid #2457c5; }`,
    codeParts: [
      {
        code: "display: grid;",
        explanation: "Transforma os artigos em itens de uma grade.",
      },
      {
        code: "grid-template-columns: repeat(2, minmax(0, 1fr));",
        explanation: "Cria duas colunas que dividem igualmente o espaço.",
      },
      {
        code: "gap: 16px;",
        explanation: "Define o intervalo entre as células.",
      },
      {
        code: "grid-column: 1 / -1;",
        explanation: "Faz o resumo ocupar a largura de todas as colunas.",
      },
    ],
    expectedOutput:
      "Um painel com um cartão de apresentação largo e quatro cartões numéricos organizados em duas colunas.",
    task: "Mude a grade para três colunas iguais e aumente o intervalo para 24px. O resumo deve continuar ocupando a largura inteira.",
    hint: "Modifique repeat(2, ...) para repeat(3, ...) e preserve a regra .resumo.",
    answerCss: `.painel {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}`,
  }),
  lesson({
    id: "css-i-03",
    level: "intermediario",
    title: "Posicionamento",
    objective: "Diferenciar relative, absolute, fixed e sticky.",
    explanation: [
      "No fluxo normal, cada bloco ocupa seu lugar na página. position: relative preserva esse lugar e permite deslocamentos; também cria uma referência para descendentes com position: absolute.",
      "Um elemento absolute sai do fluxo normal e usa como referência, neste exemplo, o ancestral posicionado mais próximo. O selo fica no canto do cartão relative. Um elemento fixed também sai do fluxo e, neste caso, fica preso à janela de visualização.",
      "sticky começa no fluxo e fica preso ao atingir o limite indicado por top, dentro das restrições do contêiner. Role a prévia para comparar o menu sticky com o atalho fixed. z-index ajuda a controlar a sobreposição.",
    ],
    steps: [
      "Torne o cartão uma referência com relative.",
      "Posicione o selo com absolute, top e right.",
      "Prenda o menu com sticky e top: 0.",
      "Adicione um atalho fixed e role a prévia.",
    ],
    body: `<nav class="menu" aria-label="Seções">
  <a href="#inicio">Início</a>
  <a href="#fim">Fim da página</a>
</nav>
<main id="inicio">
  <article class="card">
    <span class="selo">Novo</span>
    <h1>Oficina de interfaces</h1>
    <p>Um cartão é a referência do selo no canto.</p>
  </article>
  <section class="percurso">
    <h2>Continue rolando</h2>
    <p>O menu acompanha a rolagem quando alcança o topo.</p>
  </section>
  <p id="fim">Você chegou ao fim da demonstração.</p>
</main>
<a class="atalho" href="#inicio">Voltar ao início</a>`,
    css: `.menu {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 16px;
  background: #18334a;
}
.menu a { color: white; margin-right: 16px; }
.card { position: relative; margin-top: 24px; padding: 48px 24px 24px; background: white; }
.selo {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  background: #fff0ad;
  border-radius: 20px;
}
.percurso { min-height: 110vh; padding-top: 24px; }
#fim { padding-bottom: 80px; }
.atalho {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 3;
  padding: 12px;
  background: #2457c5;
  color: white;
}`,
    codeParts: [
      {
        code: "position: relative;",
        explanation: "Faz o cartão servir de referência ao selo absoluto.",
      },
      {
        code: "position: absolute;",
        explanation: "Retira o selo do fluxo normal para posicioná-lo no cartão.",
      },
      {
        code: "position: sticky;",
        explanation: "Permite que o menu fique preso ao atingir o limite top.",
      },
      {
        code: "position: fixed;",
        explanation: "Prende o atalho à janela da prévia durante a rolagem.",
      },
    ],
    expectedOutput:
      "Um menu escuro, um cartão com selo no canto superior direito e um atalho azul fixo no canto inferior direito. Ao rolar, o menu adere ao topo.",
    task: "Mova o selo para o canto superior esquerdo e o atalho fixo para o canto inferior esquerdo.",
    hint: "Defina left e desative right com auto nas duas classes.",
    answerCss: `.selo { left: 12px; right: auto; }
.atalho { left: 16px; right: auto; }`,
  }),
  lesson({
    id: "css-i-04",
    level: "intermediario",
    title: "Pseudo-classes",
    objective: "Estilizar estados de interação e posições em uma lista.",
    explanation: [
      "Pseudo-classes começam com dois-pontos e selecionam um estado ou uma condição. :hover corresponde ao ponteiro sobre o elemento; :active corresponde ao momento de ativação, como quando mantemos um botão pressionado.",
      ":focus-visible ajuda a destacar o foco quando ele precisa ser mostrado, especialmente na navegação por teclado. Pressione Tab para percorrer o campo e o botão. Não remova o contorno sem oferecer outro indicador visível.",
      ":nth-child(even) seleciona filhos em posições pares. Assim podemos alternar o fundo de uma lista sem criar uma classe para cada item. Essas mudanças são visuais e não exigem JavaScript.",
    ],
    steps: [
      "Crie um campo com label e um botão.",
      "Adicione estilos para hover e active.",
      "Destaque o foco com outline.",
      "Alterne o fundo das linhas pares da lista.",
    ],
    body: `<main class="card">
  <h1>Planeje sua prática</h1>
  <label for="tema">Tema de estudo</label>
  <input id="tema" type="text" placeholder="Ex.: seletores">
  <button type="button">Experimentar estados</button>
  <ul>
    <li>Ler o exemplo</li>
    <li>Editar o CSS</li>
    <li>Comparar o resultado</li>
    <li>Repetir a prática</li>
  </ul>
</main>`,
    css: `.card { max-width: 500px; padding: 24px; background: white; }
label { display: block; margin-bottom: 8px; }
input { width: 100%; padding: 10px; border: 1px solid #64748b; }
button { margin-top: 16px; padding: 12px 20px; border: 0; background: #2457c5; color: white; }
button:hover { background: #163b8c; }
button:active { transform: translateY(2px); }
input:focus-visible, button:focus-visible { outline: 3px solid #7e22ce; outline-offset: 3px; }
li { padding: 10px; }
li:nth-child(even) { background: #e2ecff; }`,
    codeParts: [
      {
        code: "button:hover { background: #163b8c; }",
        explanation: "Escurece o botão quando o ponteiro está sobre ele.",
      },
      {
        code: "button:active { transform: translateY(2px); }",
        explanation: "Desloca o botão durante a ativação.",
      },
      {
        code: "input:focus-visible, button:focus-visible { outline: 3px solid #7e22ce; outline-offset: 3px; }",
        explanation: "Mantém o foco claramente visível.",
      },
      {
        code: "li:nth-child(even) { background: #e2ecff; }",
        explanation: "Dá um fundo azul-claro ao segundo e ao quarto itens.",
      },
    ],
    expectedOutput:
      "Um cartão com campo, botão azul e lista com linhas alternadas. O botão muda com o ponteiro, e o foco pode ser observado com Tab.",
    task: "Deixe o botão verde ao passar o ponteiro e aplique fundo amarelo-claro às linhas ímpares da lista.",
    hint: "Use button:hover e li:nth-child(odd).",
    answerCss: `button:hover { background: #15803d; }
li:nth-child(odd) { background: #fff4cf; }`,
  }),
  lesson({
    id: "css-i-05",
    level: "intermediario",
    title: "Pseudo-elementos",
    objective: "Criar detalhes decorativos sem acrescentar elementos ao HTML.",
    explanation: [
      "Pseudo-elementos usam dois dois-pontos e permitem estilizar uma parte de um elemento. ::before e ::after geram caixas antes e depois do conteúdo. Para que elas apareçam, normalmente precisamos declarar content.",
      "Um content vazio pode criar apenas uma forma decorativa. O título recebe um traço com ::after, e a citação recebe uma aspa grande com ::before. Esses detalhes não substituem conteúdo importante nem rótulos de controles.",
      "::first-letter estiliza a primeira letra de um bloco de texto. Evite colocar informações essenciais apenas em conteúdo gerado, pois sua apresentação e seu anúncio por tecnologias assistivas podem variar.",
    ],
    steps: [
      "Crie um artigo com título, citação e parágrafo.",
      "Desenhe um traço depois do título.",
      "Posicione uma aspa decorativa antes da citação.",
      "Destaque a primeira letra do parágrafo final.",
    ],
    body: `<article class="editorial">
  <h1>Aprender fazendo</h1>
  <blockquote>Uma pequena experiência pode abrir caminho para uma grande descoberta.</blockquote>
  <p class="abertura">Praticar todos os dias ajuda a transformar dúvidas em perguntas cada vez melhores.</p>
</article>`,
    css: `.editorial { max-width: 600px; padding: 28px; background: white; }
h1::after {
  content: "";
  display: block;
  width: 64px;
  height: 5px;
  margin-top: 12px;
  background: #2457c5;
}
blockquote { position: relative; margin: 24px 0; padding-left: 36px; line-height: 1.6; }
blockquote::before {
  content: "“";
  position: absolute;
  left: 0;
  top: -12px;
  font-size: 56px;
  color: #7e22ce;
}
.abertura::first-letter { font-size: 32px; font-weight: bold; color: #2457c5; }`,
    codeParts: [
      {
        code: 'content: "";',
        explanation: "Cria uma caixa gerada sem texto para o traço decorativo.",
      },
      {
        code: "h1::after {",
        explanation: "Seleciona a caixa gerada após o conteúdo do título.",
      },
      {
        code: 'content: "“";',
        explanation: "Gera a aspa decorativa da citação.",
      },
      {
        code: ".abertura::first-letter { font-size: 32px; font-weight: bold; color: #2457c5; }",
        explanation: "Destaca somente a primeira letra do parágrafo.",
      },
    ],
    expectedOutput:
      "Um artigo branco com traço azul abaixo do título, uma aspa roxa grande na citação e a primeira letra do último parágrafo destacada.",
    task: "Deixe o traço abaixo do título roxo e com 120px de largura; pinte a primeira letra do parágrafo de verde.",
    hint: "Selecione h1::after e .abertura::first-letter.",
    answerCss: `h1::after { width: 120px; background: #7e22ce; }
.abertura::first-letter { color: #15803d; }`,
  }),
  lesson({
    id: "css-i-06",
    level: "intermediario",
    title: "Transições",
    objective: "Suavizar mudanças entre estados de um elemento.",
    explanation: [
      "Uma transição anima a passagem de um valor para outro quando uma propriedade muda. Ela não cria a mudança sozinha: neste exemplo, hover e focus-visible acionam o novo estado do link.",
      "A declaração transition informa propriedade, duração e ritmo. Listamos transform e background-color separadamente para evitar animar tudo sem necessidade. A regra fica no estado normal para suavizar tanto a entrada quanto a saída.",
      "transform: translateY move visualmente o elemento sem reorganizar as caixas vizinhas. Pessoas sensíveis a movimento podem preferir animações reduzidas; a consulta prefers-reduced-motion desativa a transição nesses casos.",
    ],
    steps: [
      "Crie um link de ação real para uma seção.",
      "Declare as transições no estado normal.",
      "Mude cor e deslocamento em hover e focus-visible.",
      "Respeite a preferência por movimento reduzido.",
    ],
    body: `<main class="convite">
  <h1>Seu próximo passo</h1>
  <p>Observe a mudança suave ao interagir com o link.</p>
  <a class="acao" href="#roteiro">Ver roteiro</a>
  <section id="roteiro">
    <h2>Roteiro de prática</h2>
    <p>Escolha uma propriedade, altere seu valor e compare.</p>
  </section>
</main>`,
    css: `.convite { max-width: 560px; padding: 28px; background: white; }
.acao {
  display: inline-block;
  padding: 14px 22px;
  border-radius: 10px;
  background-color: #2457c5;
  color: white;
  text-decoration: none;
  transition: transform 250ms ease, background-color 250ms ease;
}
.acao:hover, .acao:focus-visible {
  transform: translateY(-4px);
  background-color: #163b8c;
}
.acao:focus-visible { outline: 3px solid #7e22ce; outline-offset: 4px; }
#roteiro { margin-top: 32px; }
@media (prefers-reduced-motion: reduce) {
  .acao { transition: none; }
}`,
    codeParts: [
      {
        code: "transition: transform 250ms ease, background-color 250ms ease;",
        explanation: "Suaviza duas propriedades ao longo de 250 milissegundos.",
      },
      {
        code: "transform: translateY(-4px);",
        explanation: "Move visualmente a ação quatro pixels para cima.",
      },
      {
        code: ".acao:hover, .acao:focus-visible {",
        explanation: "Oferece o efeito tanto ao ponteiro quanto ao foco visível.",
      },
      {
        code: ".acao { transition: none; }",
        explanation: "Desativa a transição dentro da consulta de movimento reduzido.",
      },
    ],
    expectedOutput:
      "Um cartão com link azul que sobe levemente e escurece ao receber ponteiro ou foco, com transição suave quando permitida.",
    task: "Aumente as duas durações para 500ms e faça o link subir 8px. Preserve a regra de movimento reduzido.",
    hint: "Acrescente a nova transition e repita a consulta prefers-reduced-motion depois dela.",
    answerCss: `.acao { transition: transform 500ms ease, background-color 500ms ease; }
.acao:hover, .acao:focus-visible { transform: translateY(-8px); }
@media (prefers-reduced-motion: reduce) {
  .acao { transition: none; }
}`,
  }),
  lesson({
    id: "css-i-07",
    level: "intermediario",
    title: "Animações básicas (@keyframes)",
    objective: "Definir quadros-chave e executar uma animação CSS curta.",
    explanation: [
      "@keyframes descreve etapas de uma animação. Podemos usar from e to para início e fim, ou porcentagens para etapas intermediárias. O nome escolhido conecta esses quadros à propriedade animation.",
      "Em animation: entrada 900ms ease-out 1 both, informamos nome, duração, ritmo, uma repetição e preenchimento dos estados. both aplica os valores do primeiro e do último quadro nos períodos correspondentes, mantendo o estado final.",
      "A animação começa ao carregar a página, sem depender de hover. Usamos um efeito curto, sem repetição infinita, e o desativamos quando a pessoa solicita movimento reduzido. Nesse caso, o cartão continua totalmente visível.",
    ],
    steps: [
      "Crie um cartão de conquista.",
      "Defina os quadros de entrada com opacidade e deslocamento.",
      "Conecte a animação ao cartão.",
      "Adicione uma alternativa sem animação.",
    ],
    body: `<article class="conquista">
  <p class="etiqueta">Conquista da semana</p>
  <h1>Primeiro projeto concluído!</h1>
  <p>Você já consegue combinar estrutura e apresentação.</p>
</article>`,
    css: `.conquista {
  max-width: 500px;
  padding: 28px;
  background: white;
  border-top: 8px solid #15803d;
  border-radius: 14px;
  animation: entrada 900ms ease-out 1 both;
}
.etiqueta { color: #166534; font-weight: bold; }
@keyframes entrada {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .conquista { animation: none; }
}`,
    codeParts: [
      {
        code: "animation: entrada 900ms ease-out 1 both;",
        explanation: "Executa entrada uma vez e preserva seus estados inicial e final.",
      },
      {
        code: "@keyframes entrada {",
        explanation: "Declara os quadros-chave com o nome entrada.",
      },
      {
        code: "from { opacity: 0; transform: translateY(24px); }",
        explanation: "Começa transparente e um pouco abaixo da posição final.",
      },
      {
        code: "to { opacity: 1; transform: translateY(0); }",
        explanation: "Termina visível e sem deslocamento.",
      },
    ],
    expectedOutput:
      "Um cartão de conquista com faixa verde que aparece subindo suavemente. Com movimento reduzido, ele aparece diretamente no estado normal.",
    task: "Crie uma animação chamada surgir que vá de opacity: 0 a opacity: 1, sem deslocamento. Aplique-a ao cartão por 1.2s, uma vez, mantendo o estado final e respeitando movimento reduzido.",
    hint: "Defina novos @keyframes, substitua animation e repita a alternativa animation: none.",
    answerCss: `@keyframes surgir {
  from { opacity: 0; }
  to { opacity: 1; }
}
.conquista { animation: surgir 1.2s ease-out 1 both; }
@media (prefers-reduced-motion: reduce) {
  .conquista { animation: none; }
}`,
  }),
  lesson({
    id: "css-i-08",
    level: "intermediario",
    title: "Sombras",
    objective: "Criar profundidade com box-shadow e text-shadow.",
    explanation: [
      "box-shadow desenha uma sombra ao redor da caixa sem alterar o espaço que ela ocupa no layout. Os valores mais comuns indicam deslocamento horizontal, deslocamento vertical, desfoque e cor.",
      "Em 0 8px 24px rgba(15, 23, 42, 0.16), a sombra não se desloca para os lados, desce 8px e tem desfoque de 24px. O último número da cor rgba define a transparência, de 0 a 1.",
      "A palavra inset coloca a sombra dentro da caixa. text-shadow afeta as letras, não o cartão. Use sombras discretas para destacar hierarquias sem reduzir a legibilidade.",
    ],
    steps: [
      "Monte um perfil com avatar e nome.",
      "Adicione uma sombra externa ao cartão.",
      "Use inset em uma pequena etiqueta.",
      "Compare box-shadow com a sombra do título.",
    ],
    body: `<article class="perfil">
  <img src="https://picsum.photos/seed/perfil/400/250" alt="Imagem ilustrativa do perfil">
  <h1>Marina Costa</h1>
  <p>Estudante de desenvolvimento web.</p>
  <span class="status">Disponível para aprender</span>
</article>`,
    css: `.perfil {
  max-width: 360px;
  padding: 28px;
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
}
.perfil img { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; }
.perfil h1 { text-shadow: 1px 2px 3px rgba(36, 87, 197, 0.2); }
.status {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 20px;
  background: #e8f7ee;
  box-shadow: inset 0 2px 5px rgba(21, 128, 61, 0.18);
}`,
    codeParts: [
      {
        code: "box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);",
        explanation: "Cria a sombra externa suave do cartão.",
      },
      {
        code: "text-shadow: 1px 2px 3px rgba(36, 87, 197, 0.2);",
        explanation: "Aplica uma sombra às letras do nome.",
      },
      {
        code: "box-shadow: inset 0 2px 5px rgba(21, 128, 61, 0.18);",
        explanation: "Desenha a sombra para dentro da etiqueta.",
      },
    ],
    expectedOutput:
      "Um perfil branco com avatar circular, sombra externa suave, nome levemente sombreado e uma etiqueta verde com sombra interna.",
    task: "Deixe a sombra do cartão com deslocamento vertical de 12px, desfoque de 32px e transparência de 0.22. Remova a sombra do nome.",
    hint: "Use box-shadow em .perfil e text-shadow: none em .perfil h1.",
    answerCss: `.perfil { box-shadow: 0 12px 32px rgba(15, 23, 42, 0.22); }
.perfil h1 { text-shadow: none; }`,
  }),
  lesson({
    id: "css-i-09",
    level: "intermediario",
    title: "Gradientes",
    objective: "Criar fundos com gradientes lineares e radiais.",
    explanation: [
      "Um gradiente é uma imagem gerada pelo CSS que faz a passagem entre cores. linear-gradient segue uma direção: 135deg cria uma passagem diagonal. Não é necessário carregar um arquivo de imagem.",
      "As paradas de cor controlam onde cada tom aparece. Em um gradiente com 0%, 50% e 100%, a primeira cor está no começo, a segunda no meio e a terceira no fim.",
      "radial-gradient se espalha a partir de um ponto, como uma luz circular. Mantenha o contraste do texto em todas as regiões do fundo; se o gradiente for muito irregular, use um painel sólido para o conteúdo.",
    ],
    steps: [
      "Crie dois cartões com classes diferentes.",
      "Aplique um gradiente linear diagonal ao primeiro.",
      "Aplique um gradiente radial ao segundo.",
      "Confira o contraste e identifique as paradas de cor.",
    ],
    body: `<main class="colecao">
  <article class="linear">
    <h1>Ideias em movimento</h1>
    <p>Um fundo diagonal com três cores.</p>
  </article>
  <article class="radial">
    <h2>Um ponto de luz</h2>
    <p>Um fundo que se espalha a partir de um canto.</p>
  </article>
</main>`,
    css: `.colecao { display: flex; flex-wrap: wrap; gap: 20px; }
.colecao article { flex: 1 1 260px; min-height: 220px; padding: 28px; border-radius: 18px; }
.linear {
  color: white;
  background: linear-gradient(135deg, #172554 0%, #4338ca 50%, #701a75 100%);
}
.radial {
  color: #18334a;
  background: radial-gradient(circle at top left, #fff4b8 0%, #c8eddf 55%, #a3d3f5 100%);
}`,
    codeParts: [
      {
        code: "background: linear-gradient(135deg, #172554 0%, #4338ca 50%, #701a75 100%);",
        explanation: "Cria a transição diagonal entre três cores escuras.",
      },
      {
        code: "background: radial-gradient(circle at top left, #fff4b8 0%, #c8eddf 55%, #a3d3f5 100%);",
        explanation: "Cria uma transição circular com origem no canto superior esquerdo.",
      },
      {
        code: "color: white;",
        explanation: "Mantém o texto claro no cartão de fundo escuro.",
      },
    ],
    expectedOutput:
      "Dois cartões arredondados: um com gradiente diagonal escuro e texto branco; outro com gradiente radial claro e texto escuro.",
    task: "Troque o fundo do cartão .linear por um gradiente horizontal, para a direita, do azul #1e3a8a ao verde #166534.",
    hint: "Use linear-gradient(to right, primeira cor, segunda cor).",
    answerCss: `.linear { background: linear-gradient(to right, #1e3a8a, #166534); }`,
  }),
  lesson({
    id: "css-i-10",
    level: "intermediario",
    title: "Responsividade",
    objective: "Combinar %, rem, vw, max-width e imagens fluidas.",
    explanation: [
      "Uma página responsiva se adapta ao espaço disponível. Porcentagens ajudam a criar larguras relativas ao contêiner; max-width impede que o conteúdo fique largo demais em telas grandes.",
      "rem usa o tamanho de fonte do elemento raiz como referência; vw corresponde a 1% da largura da janela. No título, clamp(1.5rem, 4vw, 2.5rem) permite crescimento fluido, mas impõe limites para evitar textos minúsculos ou enormes.",
      "Imagens fluidas usam width: 100% e height: auto para acompanhar o contêiner sem distorção. Teste a prévia em larguras diferentes e mantenha o conteúdo legível sem rolagem horizontal.",
    ],
    steps: [
      "Crie um contêiner com largura percentual.",
      "Limite sua largura usando rem.",
      "Faça o título variar com vw dentro de limites.",
      "Mantenha a imagem fluida e proporcional.",
    ],
    body: `<main class="pagina">
  <h1>Um diário que cabe na sua tela</h1>
  <article class="historia">
    <img src="https://picsum.photos/seed/diario/400/250" alt="Fotografia ilustrativa para o diário">
    <div class="conteudo">
      <h2>Pequenas descobertas</h2>
      <p>Uma página confortável para ler no celular, no tablet ou no computador.</p>
    </div>
  </article>
</main>`,
    css: `body { padding: 0; }
.pagina { width: 92%; max-width: 56rem; margin: 2rem auto; }
.pagina h1 { font-size: clamp(1.5rem, 4vw, 2.5rem); line-height: 1.2; }
.historia { background: white; border-radius: 1rem; overflow: hidden; }
.historia img { display: block; width: 100%; height: auto; }
.conteudo { padding: 1.5rem; font-size: 1rem; line-height: 1.7; }`,
    codeParts: [
      {
        code: ".pagina { width: 92%; max-width: 56rem; margin: 2rem auto; }",
        explanation: "Cria margens laterais flexíveis e limita a largura de leitura.",
      },
      {
        code: "font-size: clamp(1.5rem, 4vw, 2.5rem);",
        explanation: "Combina um tamanho fluido com limites mínimo e máximo.",
      },
      {
        code: ".historia img { display: block; width: 100%; height: auto; }",
        explanation: "Ajusta a imagem sem alterar sua proporção.",
      },
      {
        code: "padding: 1.5rem;",
        explanation: "Usa a fonte raiz como referência para o espaço interno.",
      },
    ],
    expectedOutput:
      "Uma página centralizada com título de tamanho fluido e um cartão com foto proporcional. A largura acompanha a janela até atingir o limite.",
    task: "Limite a página a 44rem, mantenha sua largura de 92% e aumente o padding do conteúdo para 2rem.",
    hint: "Substitua somente max-width em .pagina e padding em .conteudo.",
    answerCss: `.pagina { max-width: 44rem; }
.conteudo { padding: 2rem; }`,
  }),
  lesson({
    id: "css-i-11",
    level: "intermediario",
    title: "Media Queries",
    objective: "Aplicar mudanças de layout conforme a largura disponível.",
    explanation: [
      "Media queries aplicam regras apenas quando uma condição é satisfeita. @media (min-width: 640px) ativa seu bloco quando a largura da área de visualização é de pelo menos 640px.",
      "Na abordagem mobile first, começamos com um layout simples para telas estreitas e acrescentamos colunas quando há espaço. Aqui, a grade tem uma coluna inicialmente, duas a partir de 640px e três a partir de 960px.",
      "As consultas continuam participando da cascata. Em uma tela de 1000px, as duas condições são verdadeiras, mas a regra de três colunas vem depois e prevalece. Escolha pontos de quebra observando o conteúdo, não apenas nomes de aparelhos.",
    ],
    steps: [
      "Monte três cartões em uma coluna.",
      "Crie a primeira consulta com min-width: 640px.",
      "Mude para duas colunas nessa faixa.",
      "Adicione três colunas a partir de 960px e redimensione a prévia.",
    ],
    body: `<main>
  <h1>Oficinas abertas</h1>
  <div class="oficinas">
    <article><h2>Primeira página</h2><p>Uma introdução ao HTML.</p></article>
    <article><h2>Cores e formas</h2><p>Uma oficina de CSS.</p></article>
    <article><h2>Pensar em etapas</h2><p>Uma prática de lógica.</p></article>
  </div>
</main>`,
    css: `main { max-width: 1100px; margin: 0 auto; }
.oficinas { display: grid; grid-template-columns: 1fr; gap: 16px; }
.oficinas article { padding: 24px; background: white; border-top: 5px solid #2457c5; }
@media (min-width: 640px) {
  .oficinas { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 960px) {
  .oficinas { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}`,
    codeParts: [
      {
        code: ".oficinas { display: grid; grid-template-columns: 1fr; gap: 16px; }",
        explanation: "Define uma coluna como ponto de partida para telas estreitas.",
      },
      {
        code: "@media (min-width: 640px) {",
        explanation: "Ativa o próximo conjunto de regras a partir de 640px.",
      },
      {
        code: ".oficinas { grid-template-columns: repeat(2, minmax(0, 1fr)); }",
        explanation: "Cria duas colunas na faixa intermediária.",
      },
      {
        code: "@media (min-width: 960px) {",
        explanation: "Aplica o layout maior a partir de 960px.",
      },
    ],
    expectedOutput:
      "Três cartões em uma coluna abaixo de 640px, em duas colunas de 640px a 959px e em três colunas a partir de 960px.",
    task: "Sem alterar o número de colunas, faça o intervalo entre os cartões aumentar para 32px somente a partir de 960px.",
    hint: "Acrescente uma consulta min-width: 960px com uma regra de gap.",
    answerCss: `@media (min-width: 960px) {
  .oficinas { gap: 32px; }
}`,
  }),
  lesson({
    id: "css-i-12",
    level: "intermediario",
    title: "Construção de layouts modernos",
    objective: "Integrar cabeçalho, grade de cartões e rodapé em uma página responsiva.",
    explanation: [
      "Um layout completo combina estrutura semântica e regras de apresentação. header reúne marca e navegação; main contém o conteúdo principal; footer fecha a página. As classes conectam essas regiões ao CSS sem depender de IDs para todo estilo.",
      "Usamos Flexbox para alinhar marca e menu e Grid para organizar os cartões. repeat(auto-fit, minmax(min(100%, 15rem), 1fr)) cria quantas colunas couberem; o mínimo nunca ultrapassa a largura do contêiner, evitando uma coluna maior que a tela.",
      "A página começa com o cabeçalho em coluna e passa para linha em telas maiores. Imagens fluidas, largura máxima, espaçamento consistente e foco visível completam o conjunto. Teste tanto uma tela estreita quanto uma larga e percorra os links usando Tab.",
    ],
    steps: [
      "Estruture header, main e footer.",
      "Crie um contêiner centralizado de largura limitada.",
      "Distribua os cards com Grid e imagens fluidas.",
      "Alinhe o cabeçalho com Flexbox em telas maiores.",
      "Confira foco, contraste e ausência de rolagem horizontal.",
    ],
    body: `<header class="topo">
  <div class="container barra">
    <a class="marca" href="#inicio">Projeta Ideias</a>
    <nav aria-label="Principal">
      <a href="#projetos">Projetos</a>
      <a href="#sobre">Sobre</a>
    </nav>
  </div>
</header>
<main id="inicio" class="container principal">
  <h1>Projetos para começar</h1>
  <p>Escolha uma ideia e coloque seus conhecimentos em prática.</p>
  <section id="projetos" class="grade" aria-label="Projetos de estudo">
    <article class="card">
      <img src="https://picsum.photos/seed/caderno/400/250" alt="Imagem ilustrativa do projeto de diário">
      <div class="card-texto"><h2>Diário visual</h2><p>Organize histórias com títulos, fotos e descrições.</p></div>
    </article>
    <article class="card">
      <img src="https://picsum.photos/seed/colecao/400/250" alt="Imagem ilustrativa do projeto de galeria">
      <div class="card-texto"><h2>Minha galeria</h2><p>Monte uma coleção de imagens em uma grade flexível.</p></div>
    </article>
    <article class="card">
      <img src="https://picsum.photos/seed/equipe/400/250" alt="Imagem ilustrativa do projeto de equipe">
      <div class="card-texto"><h2>Equipe criativa</h2><p>Apresente pessoas em cartões organizados e legíveis.</p></div>
    </article>
  </section>
</main>
<footer id="sobre" class="rodape">
  <div class="container">
    <p>Projeta Ideias — espaço de prática para quem está começando.</p>
  </div>
</footer>`,
    css: `body { padding: 0; }
.container { width: 92%; max-width: 70rem; margin: 0 auto; }
.topo { background: #18334a; color: white; }
.barra {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 0;
}
.topo a { color: white; text-decoration: none; }
.marca { font-size: 1.4rem; font-weight: bold; }
nav { display: flex; flex-wrap: wrap; gap: 20px; }
a:focus-visible { outline: 3px solid #eab308; outline-offset: 5px; }
.principal { padding: 32px 0 48px; }
.principal h1 { font-size: clamp(1.6rem, 4vw, 2.5rem); }
.grade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 24px;
  margin-top: 28px;
}
.card {
  overflow: hidden;
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.1);
}
.card img { display: block; width: 100%; height: auto; }
.card-texto { padding: 20px; line-height: 1.6; }
.card-texto h2 { margin-top: 0; color: #2457c5; }
.rodape { padding: 24px 0; background: #dce6f0; }
@media (min-width: 640px) {
  .barra { flex-direction: row; justify-content: space-between; align-items: center; }
}`,
    codeParts: [
      {
        code: '<main id="inicio" class="container principal">',
        explanation: "Identifica o conteúdo principal e combina classes de largura e espaçamento.",
      },
      {
        code: ".container { width: 92%; max-width: 70rem; margin: 0 auto; }",
        explanation: "Compartilha alinhamento e largura máxima entre cabeçalho, conteúdo e rodapé.",
      },
      {
        code: "grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));",
        explanation: "Cria colunas automáticas que cabem inclusive em telas mais estreitas que 15rem.",
      },
      {
        code: ".card img { display: block; width: 100%; height: auto; }",
        explanation: "Faz cada fotografia acompanhar a largura do cartão sem distorção.",
      },
      {
        code: ".barra { flex-direction: row; justify-content: space-between; align-items: center; }",
        explanation: "Na consulta de telas maiores, coloca marca e navegação lado a lado.",
      },
    ],
    expectedOutput:
      "Uma página completa com cabeçalho escuro, marca e menu, título introdutório, três cartões com fotos e rodapé claro. Os cartões e o cabeçalho se reorganizam conforme a largura.",
    task: "Personalize o layout: deixe o cabeçalho roxo #4c1d95, aumente o arredondamento dos cartões para 24px e, apenas a partir de 960px, use gap de 32px na grade.",
    hint: "Altere .topo e .card e acrescente uma consulta min-width: 960px para .grade.",
    answerCss: `.topo { background: #4c1d95; }
.card { border-radius: 24px; }
@media (min-width: 960px) {
  .grade { gap: 32px; }
}`,
  }),
];
