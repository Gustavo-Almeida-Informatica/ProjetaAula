import type { Lesson } from "../types";

interface HtmlLessonContent {
  title: string;
  objective: string;
  explanation: [string, string, string];
  instructions: [string, string, string, string];
  body: string;
  css?: string;
  parts: [string, string][];
  preview: string;
  exercise: {
    prompt: string;
    hint: string;
    body: string;
    css?: string;
  };
}

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

function createLesson(
  level: "basico" | "intermediario",
  number: number,
  content: HtmlLessonContent,
): Lesson {
  const prefix = level === "basico" ? "b" : "i";
  return {
    id: "html-" + prefix + "-" + String(number).padStart(2, "0"),
    track: "html",
    level,
    title: content.title,
    objective: content.objective,
    explanation: content.explanation,
    steps: content.instructions,
    code: documentHtml(content.title, content.body),
    css: content.css ?? "",
    codeParts: content.parts.map(([code, explanation]) => ({
      code,
      explanation,
    })),
    expectedOutput: content.preview,
    exercise: {
      prompt: content.exercise.prompt,
      hint: content.exercise.hint,
      starterCode: documentHtml(
        "Prática: " + content.title,
        `  <!-- Escreva aqui o conteúdo pedido no exercício. -->`,
      ),
      starterCss: "",
      solution: documentHtml(
        "Prática: " + content.title,
        content.exercise.body,
      ),
      solutionCss: content.exercise.css ?? "",
    },
  };
}

export const htmlBasico: Lesson[] = [
  createLesson("basico", 1, {
    title: "O que é HTML?",
    objective: "Entender como o HTML identifica o conteúdo de uma página.",
    explanation: [
      "HTML é uma linguagem de marcação. Ela identifica partes do conteúdo, como títulos e parágrafos. Não é uma linguagem de programação: uma marcação não faz cálculos nem toma decisões sozinha.",
      "No exemplo, a página apresenta uma biblioteca comunitária. A marcação h1 identifica o título principal. Cada marcação p identifica um parágrafo. As palavras entre a abertura e o fechamento são o conteúdo que o navegador mostra.",
      "Abra a prévia e compare o texto com o código. O navegador não mostra as tags como texto: ele interpreta essas marcações. Ao trocar o nome da biblioteca dentro de h1, você altera o título visível sem mudar a estrutura da página.",
    ],
    instructions: [
      "Observe a estrutura completa do documento, da declaração DOCTYPE ao fechamento de html.",
      "Localize o h1 que apresenta o nome da biblioteca.",
      "Leia os dois parágrafos e compare cada um com a prévia.",
      "Troque o nome da biblioteca e confira a mudança na prévia.",
    ],
    body: `  <h1>Biblioteca do Bairro</h1>
  <p>Livros gratuitos para toda a comunidade.</p>
  <p>Atendimento de segunda a sexta, das 9h às 17h.</p>`,
    parts: [
      ["<!DOCTYPE html>", "Informa ao navegador que o documento usa HTML moderno."],
      ["<h1>Biblioteca do Bairro</h1>", "Identifica o título principal da página."],
      ["<p>Livros gratuitos para toda a comunidade.</p>", "Marca uma informação como parágrafo."],
    ],
    preview: "O título Biblioteca do Bairro aparece em destaque, seguido por dois parágrafos sobre o serviço e o horário.",
    exercise: {
      prompt: "Crie uma página sobre uma horta comunitária. Inclua um h1 com o nome da horta e dois parágrafos: um sobre sua finalidade e outro sobre o horário de visita.",
      hint: "Use um par de tags h1 e dois pares de tags p.",
      body: `  <h1>Horta Comunitária Esperança</h1>
  <p>Cultivamos verduras para compartilhar com as famílias do bairro.</p>
  <p>As visitas acontecem aos sábados, das 8h às 11h.</p>`,
    },
  }),
  createLesson("basico", 2, {
    title: "Como funciona uma página web?",
    objective: "Relacionar endereço, servidor, arquivo HTML e navegador.",
    explanation: [
      "Quando você acessa um endereço na internet, o navegador solicita recursos a um servidor. O servidor é um computador preparado para responder a essas solicitações. Uma das respostas pode ser um arquivo HTML.",
      "O navegador lê o HTML e monta a página na tela. Outros arquivos podem complementar a página: CSS cuida da apresentação visual, e imagens ilustram o conteúdo. Nosso exemplo usa apenas HTML para mostrar que a estrutura já pode ser lida sem esses recursos.",
      "No laboratório, a prévia apresenta o documento sem você precisar publicar um site. Ao abrir um arquivo HTML salvo no computador, também é possível visualizar seu conteúdo localmente. Nesse caso, não é necessário buscar esse arquivo em um servidor na internet.",
    ],
    instructions: [
      "Leia o título Caminho de uma página.",
      "Observe os três passos descritos nos parágrafos.",
      "Compare o título da aba, definido por title, com o título visível, definido por h1.",
      "Altere o último parágrafo e veja o navegador apresentar o novo conteúdo.",
    ],
    body: `  <h1>Caminho de uma página</h1>
  <p>1. Você acessa o endereço do site no navegador.</p>
  <p>2. O servidor responde com o documento HTML.</p>
  <p>3. O navegador interpreta o documento e apresenta a página.</p>`,
    parts: [
      ["<title>Como funciona uma página web?</title>", "Define o nome do documento usado na aba do navegador."],
      ["<h1>Caminho de uma página</h1>", "Apresenta o assunto dentro da página."],
      ["<p>2. O servidor responde com o documento HTML.</p>", "Descreve a resposta do servidor em um parágrafo."],
    ],
    preview: "A prévia mostra Caminho de uma página e três parágrafos numerados sobre o acesso a um site.",
    exercise: {
      prompt: "Crie um guia chamado Abrindo um arquivo local. Use um h1 e três parágrafos explicando como salvar um arquivo como index.html, abri-lo no navegador e conferir o resultado.",
      hint: "Descreva ações feitas no próprio computador, sem afirmar que é necessário publicar o arquivo.",
      body: `  <h1>Abrindo um arquivo local</h1>
  <p>1. Salve o documento com o nome index.html.</p>
  <p>2. Abra o arquivo usando um navegador.</p>
  <p>3. Confira o título e os textos apresentados na página.</p>`,
    },
  }),
  createLesson("basico", 3, {
    title: "Estrutura básica de um documento HTML.",
    objective: "Reconhecer as funções de html, head, title e body.",
    explanation: [
      "Um documento HTML começa com DOCTYPE e tem um elemento html envolvendo o restante da estrutura. O atributo lang=\"pt-BR\" informa que o idioma principal é o português brasileiro. Essa informação ajuda tecnologias assistivas a pronunciar o conteúdo.",
      "Dentro de head ficam informações sobre a página. A declaração meta charset=\"UTF-8\" permite representar caracteres como ç e ã corretamente. O elemento title dá nome à aba. A configuração viewport ajuda o navegador a adaptar a área de visualização em telas pequenas.",
      "O conteúdo visível fica em body. No exemplo, o nome da oficina aparece em h1 e a descrição aparece em p. Evite colocar textos da página diretamente em head: essa área não substitui o corpo do documento.",
    ],
    instructions: [
      "Localize a declaração DOCTYPE no início do documento.",
      "Encontre lang, charset e viewport e leia seus valores.",
      "Compare o texto de title com o texto de h1.",
      "Edite o parágrafo dentro de body sem remover a estrutura externa.",
    ],
    body: `  <h1>Oficina de leitura</h1>
  <p>Encontro gratuito na biblioteca, toda quarta-feira.</p>`,
    parts: [
      ['<html lang="pt-BR">', "Abre o documento e informa o idioma principal."],
      ['<meta charset="UTF-8">', "Declara a codificação que representa os caracteres do texto."],
      ["<title>Estrutura básica de um documento HTML.</title>", "Dá um nome à aba do navegador."],
      ["<p>Encontro gratuito na biblioteca, toda quarta-feira.</p>", "Coloca uma descrição no corpo da página."],
    ],
    preview: "A página mostra Oficina de leitura e uma descrição. Na aba, o navegador usa o título definido em head.",
    exercise: {
      prompt: "Monte um documento completo sobre uma feira de ciências. Mantenha idioma, codificação e viewport. Defina Feira de ciências no title e no h1 e informe a data em um parágrafo.",
      hint: "O title fica em head. O h1 e o parágrafo ficam em body.",
      body: `  <h1>Feira de ciências</h1>
  <p>A feira acontece em 20 de novembro, às 14h.</p>`,
    },
  }),
  createLesson("basico", 4, {
    title: "Tags e elementos.",
    objective: "Distinguir tags, conteúdo e elementos, usando aninhamento correto.",
    explanation: [
      "Uma tag é uma marcação delimitada pelos sinais de menor e maior. Em <p>Bem-vindo</p>, temos uma tag de abertura, um conteúdo e uma tag de fechamento. Esse conjunto forma um elemento.",
      "Um elemento pode conter outro. No exemplo, strong está dentro do parágrafo e indica que o prazo é importante. O elemento em marca uma expressão com ênfase. Esses significados são mais importantes do que apenas deixar letras em negrito ou itálico.",
      "Feche primeiro o elemento que abriu por último. Quando strong começa dentro de p, seu fechamento deve vir antes de </p>. Alguns elementos, como br e img, são vazios e não possuem tag de fechamento no HTML.",
    ],
    instructions: [
      "Localize a abertura e o fechamento do primeiro parágrafo.",
      "Encontre o elemento strong dentro desse parágrafo.",
      "Observe o elemento em no segundo parágrafo.",
      "Mude a expressão destacada sem inverter a ordem dos fechamentos.",
    ],
    body: `  <h1>Mutirão de limpeza</h1>
  <p>Inscrições até <strong>sexta-feira</strong>.</p>
  <p>Traga uma garrafa de água e participe <em>com disposição</em>.</p>`,
    parts: [
      ["<h1>Mutirão de limpeza</h1>", "Um elemento completo: abertura, conteúdo e fechamento."],
      ["<strong>sexta-feira</strong>", "Indica a importância do prazo dentro do parágrafo."],
      ["<em>com disposição</em>", "Marca uma expressão com ênfase."],
    ],
    preview: "Um título apresenta o mutirão. O prazo aparece com destaque forte e a expressão com disposição aparece com ênfase.",
    exercise: {
      prompt: "Crie um aviso de campanha de alimentos com um h1 e dois parágrafos. Use strong para o prazo e em para enfatizar uma orientação.",
      hint: "Coloque strong e em dentro dos parágrafos e feche cada elemento interno antes de fechar p.",
      body: `  <h1>Campanha de alimentos</h1>
  <p>Recebemos doações até <strong>30 de junho</strong>.</p>
  <p>Entregue os alimentos <em>em embalagens fechadas</em>.</p>`,
    },
  }),
  createLesson("basico", 5, {
    title: "Títulos: h1 até h6.",
    objective: "Organizar assuntos e subassuntos com níveis de títulos.",
    explanation: [
      "Os elementos h1 a h6 representam níveis de títulos. Nesta página, h1 apresenta o assunto principal. Um h2 inicia uma parte desse assunto, e um h3 identifica uma subdivisão dessa parte.",
      "O exemplo organiza um guia de estudos. Cada nível depende do anterior: Matemática pertence ao guia, Frações pertence à Matemática e os títulos seguintes detalham o estudo de frações. Os seis níveis estão presentes para você comparar a hierarquia.",
      "Não escolha o nível apenas pelo tamanho da letra. Se precisar alterar a aparência, use CSS em outra etapa. Para começar, adote um h1 principal e avance pelos níveis conforme a organização real do conteúdo, sem saltar de h2 para h5.",
    ],
    instructions: [
      "Identifique o assunto principal no h1.",
      "Leia os títulos h2 e h3 como assunto e subassunto.",
      "Siga os níveis até h6 e observe como cada um detalha o anterior.",
      "Crie outra seção h2 após o conteúdo existente, mantendo a hierarquia.",
    ],
    body: `  <h1>Guia de estudos</h1>
  <h2>Matemática</h2>
  <h3>Frações</h3>
  <h4>Soma de frações</h4>
  <h5>Denominadores iguais</h5>
  <h6>Exemplo resolvido</h6>
  <p>Um quarto mais dois quartos resulta em três quartos.</p>`,
    parts: [
      ["<h1>Guia de estudos</h1>", "Define o assunto principal."],
      ["<h2>Matemática</h2>", "Inicia uma seção do guia."],
      ["<h3>Frações</h3>", "Cria uma subdivisão de Matemática."],
      ["<h6>Exemplo resolvido</h6>", "Representa o nível mais profundo da sequência do exemplo."],
    ],
    preview: "Seis títulos aparecem em níveis visuais diferentes, seguidos por um exemplo de soma de frações.",
    exercise: {
      prompt: "Organize um guia de jardinagem com h1. Crie a seção Plantio com h2, a subseção Vasos com h3 e um parágrafo sobre drenagem. Não é necessário usar os seis níveis.",
      hint: "Use somente os níveis que a organização do conteúdo realmente exige.",
      body: `  <h1>Guia de jardinagem</h1>
  <h2>Plantio</h2>
  <h3>Vasos</h3>
  <p>Escolha vasos com furos para permitir a saída do excesso de água.</p>`,
    },
  }),
  createLesson("basico", 6, {
    title: "Parágrafos.",
    objective: "Separar ideias em parágrafos e entender os espaços no HTML.",
    explanation: [
      "Use p para marcar um parágrafo. Cada parágrafo deve reunir uma ideia ou um pequeno conjunto de informações relacionadas. No exemplo, um apresenta o clube de leitura e outro informa como participar.",
      "Apertar Enter no código não cria necessariamente uma nova linha na página. No fluxo normal do HTML, sequências de espaços e quebras de linha do código são apresentadas como um espaço. Para separar ideias, crie elementos p diferentes.",
      "O navegador costuma deixar um espaço visual entre parágrafos. Esse espaçamento pode ser ajustado com CSS, mas não deve ser simulado com vários parágrafos vazios. Primeiro organize o texto; depois cuide da aparência.",
    ],
    instructions: [
      "Leia a ideia apresentada em cada parágrafo.",
      "Observe que o primeiro parágrafo ocupa duas linhas no código.",
      "Confira que essa quebra do código não obriga uma quebra na prévia.",
      "Adicione um terceiro parágrafo com uma nova informação sobre o encontro.",
    ],
    body: `  <h1>Clube de leitura</h1>
  <p>Nosso clube reúne moradores
  para conversar sobre livros.</p>
  <p>Para participar, procure a biblioteca aos sábados, às 10h.</p>`,
    parts: [
      ["<h1>Clube de leitura</h1>", "Apresenta o tema dos parágrafos."],
      [`<p>Nosso clube reúne moradores
  para conversar sobre livros.</p>`, "A quebra no código é tratada como espaço no fluxo normal do texto."],
      ["<p>Para participar, procure a biblioteca aos sábados, às 10h.</p>", "Separa a orientação de participação em outro parágrafo."],
    ],
    preview: "O título Clube de leitura aparece acima de dois parágrafos separados. O primeiro não tem uma quebra obrigatória depois de moradores.",
    exercise: {
      prompt: "Crie uma apresentação de uma oficina de desenho com h1 e três parágrafos: objetivo, horário e materiais necessários.",
      hint: "Use um elemento p para cada uma das três informações.",
      body: `  <h1>Oficina de desenho</h1>
  <p>Vamos praticar desenho de observação com objetos do cotidiano.</p>
  <p>Os encontros acontecem às terças-feiras, às 15h.</p>
  <p>Traga papel, lápis e borracha.</p>`,
    },
  }),
  createLesson("basico", 7, {
    title: "Quebras de linha e divisórias (br, hr).",
    objective: "Usar br para quebras necessárias e hr para mudanças de tema.",
    explanation: [
      "O elemento br cria uma quebra de linha dentro do mesmo bloco de texto. Ele é útil quando a divisão das linhas faz parte do conteúdo, como em um endereço ou em versos. Não precisa de tag de fechamento.",
      "O elemento hr representa uma mudança de assunto entre blocos. O navegador normalmente o apresenta como uma linha horizontal. No exemplo, ele separa o endereço da biblioteca de um aviso sobre devoluções.",
      "Não use vários br para empurrar conteúdo para baixo. Também não use hr apenas para desenhar bordas decorativas sem relação com o conteúdo. O espaçamento e a decoração são tarefas do CSS.",
    ],
    instructions: [
      "Leia o endereço e localize as duas ocorrências de br.",
      "Compare as linhas do endereço no código e na prévia.",
      "Encontre hr entre o endereço e o aviso.",
      "Altere o endereço mantendo as quebras que fazem parte dele.",
    ],
    body: `  <h1>Visite a biblioteca</h1>
  <p>Biblioteca do Bairro<br>
  Rua das Flores, 120<br>
  Salvador, Bahia</p>
  <hr>
  <h2>Aviso sobre devoluções</h2>
  <p>Devolva os livros no balcão de atendimento.</p>`,
    parts: [
      [`Biblioteca do Bairro<br>
  Rua das Flores, 120<br>
  Salvador, Bahia`, "Divide o endereço em três linhas dentro de um único parágrafo."],
      ["<hr>", "Marca a mudança do endereço para o aviso."],
      ["<h2>Aviso sobre devoluções</h2>", "Nomeia o novo assunto após a separação."],
    ],
    preview: "O endereço ocupa três linhas. Uma divisória horizontal separa o endereço do aviso sobre devoluções.",
    exercise: {
      prompt: "Crie uma página de uma feira. Mostre o nome em h1, um endereço em três linhas usando br e, após hr, um h2 e um parágrafo sobre o horário.",
      hint: "Use br dentro do parágrafo do endereço e hr entre os dois assuntos.",
      body: `  <h1>Feira da Praça</h1>
  <p>Praça da Amizade<br>
  Avenida Central, 50<br>
  Recife, Pernambuco</p>
  <hr>
  <h2>Horário</h2>
  <p>A feira funciona aos domingos, das 7h às 12h.</p>`,
    },
  }),
  createLesson("basico", 8, {
    title: "Links.",
    objective: "Criar links externos e links para partes da própria página.",
    explanation: [
      "O elemento a cria um link quando recebe o atributo href. Entre as tags, escreva um texto que explique o destino. Uma pessoa deve entender o propósito do link sem depender de uma expressão vaga como clique aqui.",
      "Um endereço que começa com https:// pode levar a outro site. Já href=\"#horarios\" aponta para o elemento desta página que tem id=\"horarios\". O identificador deve ser único no documento e corresponder ao texto depois de #.",
      "Links podem ser percorridos com a tecla Tab e ativados com Enter. No exemplo, ambos abrem no mesmo contexto de navegação. O link externo precisa de acesso à internet; o link interno usa apenas o próprio documento.",
    ],
    instructions: [
      "Localize o link externo e leia o endereço em href.",
      "Localize o link que começa com #.",
      "Confira que o h2 de destino tem o id correspondente.",
      "Use Tab para focar um link e Enter para ativá-lo.",
    ],
    body: `  <h1>Guia da biblioteca</h1>
  <p><a href="#horarios">Consultar horários da biblioteca</a></p>
  <p><a href="https://www.gov.br/mec/pt-br">Visitar o portal do Ministério da Educação</a></p>
  <h2 id="horarios">Horários</h2>
  <p>Atendimento de segunda a sexta, das 9h às 17h.</p>`,
    parts: [
      ['<a href="#horarios">Consultar horários da biblioteca</a>', "Aponta para um identificador da própria página."],
      ['<h2 id="horarios">Horários</h2>', "Define o destino do link interno."],
      ['<a href="https://www.gov.br/mec/pt-br">Visitar o portal do Ministério da Educação</a>', "Usa um endereço completo para acessar outro site."],
    ],
    preview: "Dois links aparecem antes da seção Horários: um leva à própria seção e outro ao portal do Ministério da Educação.",
    exercise: {
      prompt: "Crie uma página de estudos com um link interno para uma seção de id materiais e um link externo para https://developer.mozilla.org/pt-BR/. Use textos de link descritivos.",
      hint: "No link interno, escreva #materiais em href e materiais no id da seção de destino.",
      body: `  <h1>Estudos de HTML</h1>
  <p><a href="#materiais">Ver materiais de estudo</a></p>
  <p><a href="https://developer.mozilla.org/pt-BR/">Consultar a documentação da MDN</a></p>
  <h2 id="materiais">Materiais</h2>
  <p>Use um editor de texto e um navegador para praticar.</p>`,
    },
  }),
  createLesson("basico", 9, {
    title: "Imagens.",
    objective: "Inserir uma imagem com src, alt e dimensões.",
    explanation: [
      "O elemento img incorpora uma imagem ao documento. O atributo src informa o endereço do arquivo. Como img é um elemento vazio, não escrevemos uma tag de fechamento para ele.",
      "O atributo alt oferece uma alternativa textual. Quando a imagem transmite informação, descreva o que importa naquele contexto. Quando for somente decorativa e não acrescentar informação, use alt=\"\" para evitar uma descrição desnecessária.",
      "Neste exemplo, a fotografia é ilustrativa e não contém informação necessária para entender o convite. Por isso, seu alt está vazio. Os atributos width e height informam as dimensões da imagem e ajudam o navegador a reservar espaço durante o carregamento.",
    ],
    instructions: [
      "Encontre o endereço da fotografia no atributo src.",
      "Observe o alt vazio e leia o texto que já explica o convite.",
      "Confira as dimensões de 400 por 250.",
      "Troque a palavra da semente na URL e observe a nova imagem ilustrativa.",
    ],
    body: `  <h1>Passeio fotográfico</h1>
  <p>Vamos explorar o bairro com um olhar atento para cores e formas.</p>
  <img src="https://picsum.photos/seed/passeio/400/250" alt="" width="400" height="250">
  <p>A fotografia acima é apenas uma ilustração do convite.</p>`,
    parts: [
      ['src="https://picsum.photos/seed/passeio/400/250"', "Indica a origem da imagem ilustrativa."],
      ['alt=""', "Informa que essa imagem é decorativa e não exige descrição."],
      ['width="400" height="250"', "Declara as dimensões usadas para a imagem."],
    ],
    preview: "A página mostra um convite para passeio fotográfico, uma imagem ilustrativa de 400 por 250 e um parágrafo explicando sua função.",
    exercise: {
      prompt: "Crie um convite para uma oficina de fotografia com h1, um parágrafo e uma imagem meramente decorativa. Use https://picsum.photos/seed/oficina/400/250, alt vazio e dimensões 400 por 250.",
      hint: "O texto deve trazer todas as informações necessárias, pois a imagem não transmite informações essenciais.",
      body: `  <h1>Oficina de fotografia</h1>
  <p>Encontro gratuito no sábado, às 9h, na biblioteca. Traga uma câmera ou um celular.</p>
  <img src="https://picsum.photos/seed/oficina/400/250" alt="" width="400" height="250">`,
    },
  }),
  createLesson("basico", 10, {
    title: "Listas ordenadas e não ordenadas.",
    objective: "Escolher ul ou ol conforme a importância da ordem dos itens.",
    explanation: [
      "Uma lista reúne itens relacionados. Use ul quando a sequência não define o significado, como em uma relação de ingredientes. Cada item fica dentro de um elemento li.",
      "Use ol quando a ordem importa. Os passos de uma receita precisam acontecer em uma sequência, por isso o modo de preparo do exemplo usa uma lista ordenada. O navegador acrescenta a numeração automaticamente.",
      "Não digite marcadores ou números dentro dos itens para simular uma lista. A marcação correta comunica a estrutura também para tecnologias assistivas. Dentro de ul e ol, coloque os itens em elementos li.",
    ],
    instructions: [
      "Leia os ingredientes dentro de ul.",
      "Observe que cada ingrediente está em seu próprio li.",
      "Compare a lista de ingredientes com os passos dentro de ol.",
      "Acrescente um passo ao preparo e confira a numeração automática.",
    ],
    body: `  <h1>Salada de frutas</h1>
  <h2>Ingredientes</h2>
  <ul>
    <li>Uma banana</li>
    <li>Uma maçã</li>
    <li>Uma laranja</li>
  </ul>
  <h2>Preparo</h2>
  <ol>
    <li>Lave as frutas.</li>
    <li>Descasque a banana e a laranja.</li>
    <li>Corte as frutas e misture em uma tigela.</li>
  </ol>`,
    parts: [
      [`<ul>
    <li>Uma banana</li>
    <li>Uma maçã</li>
    <li>Uma laranja</li>
  </ul>`, "Agrupa ingredientes sem exigir uma ordem."],
      ["<li>Lave as frutas.</li>", "Representa um item do modo de preparo."],
      [`<ol>
    <li>Lave as frutas.</li>
    <li>Descasque a banana e a laranja.</li>
    <li>Corte as frutas e misture em uma tigela.</li>
  </ol>`, "Organiza ações em sequência numerada."],
    ],
    preview: "A receita apresenta ingredientes com marcadores e três passos de preparo numerados.",
    exercise: {
      prompt: "Crie um guia para plantar feijão. Inclua uma lista não ordenada com três materiais e uma lista ordenada com três passos.",
      hint: "Use ul para materiais, ol para o procedimento e li para cada item.",
      body: `  <h1>Plantando feijão</h1>
  <h2>Materiais</h2>
  <ul>
    <li>Um vaso com furos</li>
    <li>Terra</li>
    <li>Sementes de feijão</li>
  </ul>
  <h2>Passos</h2>
  <ol>
    <li>Coloque a terra no vaso.</li>
    <li>Plante as sementes em pequenos buracos.</li>
    <li>Regue sem encharcar a terra.</li>
  </ol>`,
    },
  }),
  createLesson("basico", 11, {
    title: "Tabelas.",
    objective: "Representar dados relacionados em linhas e colunas.",
    explanation: [
      "Uma tabela é adequada quando os dados têm relações entre linhas e colunas, como em um horário escolar. Use table para a tabela e caption para uma descrição curta do conjunto de dados.",
      "Cada tr representa uma linha. As células de cabeçalho usam th, enquanto as células de dados usam td. O atributo scope=\"col\" informa que o cabeçalho se refere à coluna; scope=\"row\" identifica um cabeçalho de linha.",
      "O exemplo usa thead para o cabeçalho e tbody para os dados. O CSS adiciona bordas apenas para facilitar a leitura. Não use tabelas para posicionar menus ou organizar o desenho geral de uma página.",
    ],
    instructions: [
      "Leia a descrição da tabela em caption.",
      "Identifique os três cabeçalhos de coluna dentro de thead.",
      "Acompanhe cada linha de dados dentro de tbody.",
      "Adicione uma nova linha com horário e duas disciplinas.",
    ],
    body: `  <h1>Agenda da turma</h1>
  <table>
    <caption>Aulas da manhã</caption>
    <thead>
      <tr>
        <th scope="col">Horário</th>
        <th scope="col">Segunda-feira</th>
        <th scope="col">Terça-feira</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">8h</th>
        <td>Português</td>
        <td>Matemática</td>
      </tr>
      <tr>
        <th scope="row">9h</th>
        <td>Ciências</td>
        <td>História</td>
      </tr>
    </tbody>
  </table>`,
    css: `table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #555;
  padding: 8px;
  text-align: left;
}`,
    parts: [
      ["<caption>Aulas da manhã</caption>", "Descreve o conteúdo da tabela."],
      ['<th scope="col">Segunda-feira</th>', "Identifica o cabeçalho da coluna de segunda-feira."],
      [`<tr>
        <th scope="row">8h</th>
        <td>Português</td>
        <td>Matemática</td>
      </tr>`, "Relaciona um horário às disciplinas dos dois dias."],
    ],
    preview: "Uma tabela com bordas mostra horários de 8h e 9h e as disciplinas de segunda e terça-feira.",
    exercise: {
      prompt: "Crie uma tabela de empréstimos com caption, cabeçalhos Livro e Prazo e duas linhas de dados. Use thead, tbody e scope nos cabeçalhos.",
      hint: "Cada linha deve ter duas células. A aparência pode ficar sem bordas nesta prática.",
      body: `  <h1>Empréstimos da biblioteca</h1>
  <table>
    <caption>Prazos por tipo de livro</caption>
    <thead>
      <tr>
        <th scope="col">Livro</th>
        <th scope="col">Prazo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Romance</td>
        <td>14 dias</td>
      </tr>
      <tr>
        <td>Livro de consulta</td>
        <td>7 dias</td>
      </tr>
    </tbody>
  </table>`,
    },
  }),
  createLesson("basico", 12, {
    title: "Formulários.",
    objective: "Construir um formulário simples e entender o envio de dados.",
    explanation: [
      "O elemento form reúne campos para receber informações de quem usa a página. No exemplo, um formulário de demonstração recebe o nome e a oficina desejada. Um botão de envio inicia o comportamento nativo do formulário.",
      "O atributo action indica o destino do envio. O método get coloca os dados na URL, usando os atributos name dos campos como chaves. Já id identifica um elemento na página e permite associá-lo a um label.",
      "Aqui action=\"#\" é apenas um destino de demonstração na própria página. O laboratório não possui um serviço para registrar inscrições. Ao enviar, pode haver navegação ou recarregamento, mas nenhum cadastro é salvo por este HTML. Nunca use GET para enviar senhas.",
    ],
    instructions: [
      "Localize form e observe os atributos action e method.",
      "Compare cada for do label com o id do campo correspondente.",
      "Preencha os campos e observe os nomes definidos em name.",
      "Teste o envio sabendo que o exemplo não registra os dados.",
    ],
    body: `  <h1>Interesse em oficinas</h1>
  <p>Demonstração: este formulário não registra inscrições.</p>
  <form action="#" method="get">
    <p>
      <label for="nome">Nome</label>
      <input type="text" id="nome" name="nome">
    </p>
    <p>
      <label for="oficina">Oficina desejada</label>
      <input type="text" id="oficina" name="oficina">
    </p>
    <button type="submit">Enviar interesse</button>
  </form>`,
    parts: [
      ['<form action="#" method="get">', "Define um formulário demonstrativo com envio por GET."],
      ['<label for="nome">Nome</label>', "Associa uma identificação visível ao campo de id nome."],
      ['<input type="text" id="nome" name="nome">', "Recebe texto e define a chave nome para o envio."],
      ['<button type="submit">Enviar interesse</button>', "Aciona o envio do formulário."],
    ],
    preview: "Um aviso informa que não há cadastro real. Abaixo aparecem os campos Nome e Oficina desejada e um botão de envio.",
    exercise: {
      prompt: "Crie um formulário demonstrativo de sugestão de livro com campos Título e Autor, labels associados e um botão de envio. Informe que os dados não serão salvos.",
      hint: "Use form com action=\"#\" e method=\"get\". Cada campo precisa de id e name.",
      body: `  <h1>Sugestão de livro</h1>
  <p>Demonstração: os dados não serão salvos.</p>
  <form action="#" method="get">
    <p>
      <label for="titulo">Título</label>
      <input type="text" id="titulo" name="titulo">
    </p>
    <p>
      <label for="autor">Autor</label>
      <input type="text" id="autor" name="autor">
    </p>
    <button type="submit">Enviar sugestão</button>
  </form>`,
    },
  }),
  createLesson("basico", 13, {
    title: "Campos de entrada.",
    objective: "Escolher tipos de input adequados às informações solicitadas.",
    explanation: [
      "O atributo type muda o tipo de campo de input. Um campo text recebe texto livre. Um campo email permite ao navegador verificar o formato básico de um endereço de e-mail quando o formulário é enviado.",
      "Os tipos number e date representam números e datas. A aparência varia entre navegadores e sistemas. No celular, alguns tipos também ajudam a oferecer um teclado mais adequado à informação solicitada.",
      "Um label continua necessário em qualquer tipo de campo. Um exemplo no placeholder não substitui a identificação visível, pois desaparece durante a digitação. Os campos deste exemplo não são obrigatórios, e nenhuma reserva será registrada.",
    ],
    instructions: [
      "Compare os valores de type nos quatro campos.",
      "Clique nos labels e observe o foco nos campos associados.",
      "Teste a seleção de data disponível no seu navegador.",
      "Digite um e-mail inválido e tente enviar para observar a verificação nativa.",
    ],
    body: `  <h1>Planejar visita</h1>
  <p>Formulário demonstrativo, sem registro de reserva.</p>
  <form action="#" method="get">
    <p>
      <label for="visitante">Nome</label>
      <input type="text" id="visitante" name="visitante">
    </p>
    <p>
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email">
    </p>
    <p>
      <label for="pessoas">Quantidade de pessoas</label>
      <input type="number" id="pessoas" name="pessoas">
    </p>
    <p>
      <label for="data">Data da visita</label>
      <input type="date" id="data" name="data">
    </p>
    <button type="submit">Enviar planejamento</button>
  </form>`,
    parts: [
      ['<input type="text" id="visitante" name="visitante">', "Recebe o nome como texto."],
      ['<input type="email" id="email" name="email">', "Permite a verificação nativa do formato de e-mail."],
      ['<input type="number" id="pessoas" name="pessoas">', "Recebe uma quantidade numérica."],
      ['<input type="date" id="data" name="data">', "Oferece um campo específico para data."],
    ],
    preview: "A página apresenta quatro campos identificados: nome, e-mail, quantidade de pessoas e data da visita.",
    exercise: {
      prompt: "Crie um formulário demonstrativo para uma oficina com campos de nome, e-mail e data preferida. Escolha os tipos adequados, associe labels e inclua um botão de envio.",
      hint: "Use text para nome, email para e-mail e date para data.",
      body: `  <h1>Preferência de oficina</h1>
  <p>Demonstração: nenhuma inscrição será registrada.</p>
  <form action="#" method="get">
    <p>
      <label for="nome">Nome</label>
      <input type="text" id="nome" name="nome">
    </p>
    <p>
      <label for="contato">E-mail</label>
      <input type="email" id="contato" name="contato">
    </p>
    <p>
      <label for="dia">Data preferida</label>
      <input type="date" id="dia" name="dia">
    </p>
    <button type="submit">Enviar preferência</button>
  </form>`,
    },
  }),
  createLesson("basico", 14, {
    title: "Botões.",
    objective: "Diferenciar botões submit, reset e button.",
    explanation: [
      "O elemento button cria um controle que pode ser acionado por mouse, toque ou teclado. Seu texto deve explicar a ação, como Enviar sugestão. Um botão com type=\"submit\" envia o formulário ao qual pertence.",
      "O tipo reset restaura os valores iniciais dos campos. Ele não significa necessariamente deixar tudo vazio. No exemplo, o campo começa com Leitura; depois de editar, o botão Restaurar sugestão inicial recupera esse valor.",
      "O tipo button não executa uma ação própria sem programação adicional. O exemplo mostra esse tipo desabilitado para não sugerir uma função inexistente. Dentro de formulários, declare o tipo explicitamente, pois um button sem tipo costuma atuar como submit.",
    ],
    instructions: [
      "Observe o valor inicial do campo de sugestão.",
      "Substitua Leitura por outro texto.",
      "Acione Restaurar sugestão inicial e confira a recuperação do valor.",
      "Compare os três tipos de botão e observe o controle desabilitado.",
    ],
    body: `  <h1>Sugestão de atividade</h1>
  <p>Este formulário é apenas uma demonstração.</p>
  <form action="#" method="get">
    <p>
      <label for="atividade">Atividade</label>
      <input type="text" id="atividade" name="atividade" value="Leitura">
    </p>
    <button type="submit">Enviar sugestão</button>
    <button type="reset">Restaurar sugestão inicial</button>
    <button type="button" disabled>Prévia indisponível</button>
  </form>`,
    parts: [
      ['value="Leitura"', "Define o valor inicial restaurado pelo botão reset."],
      ['<button type="submit">Enviar sugestão</button>', "Envia os dados do formulário."],
      ['<button type="reset">Restaurar sugestão inicial</button>', "Restaura os valores iniciais dos campos."],
      ['<button type="button" disabled>Prévia indisponível</button>', "Mostra um botão sem ação nativa e indisponível para interação."],
    ],
    preview: "Um campo começa com Leitura. Há botões para enviar, restaurar o valor inicial e uma prévia desabilitada.",
    exercise: {
      prompt: "Crie um formulário demonstrativo com um campo Tema iniciado como Jardinagem, um botão submit e um botão reset. Use textos que expliquem suas ações.",
      hint: "Defina value no campo para testar o retorno ao valor inicial.",
      body: `  <h1>Escolha de tema</h1>
  <p>Demonstração sem envio para um serviço de cadastro.</p>
  <form action="#" method="get">
    <p>
      <label for="tema">Tema</label>
      <input type="text" id="tema" name="tema" value="Jardinagem">
    </p>
    <button type="submit">Enviar tema</button>
    <button type="reset">Restaurar tema inicial</button>
  </form>`,
    },
  }),
  createLesson("basico", 15, {
    title: "Atributos HTML.",
    objective: "Reconhecer atributos globais, específicos e booleanos.",
    explanation: [
      "Atributos acrescentam informações aos elementos e são escritos na tag de abertura. Em id=\"aviso\", id é o nome do atributo e aviso é seu valor. Use aspas para deixar os valores claros e consistentes.",
      "Alguns atributos são globais, como id e class. Um id identifica um único elemento no documento. Uma class pode ser compartilhada por vários elementos para agrupá-los, por exemplo, na aplicação de CSS. No exemplo, class não muda a aparência sozinha.",
      "Outros atributos dependem do elemento, como href em links e type em campos. Atributos booleanos, como disabled, são ativados pela presença. Escrever disabled=\"false\" não habilita um botão; para habilitá-lo, remova disabled.",
    ],
    instructions: [
      "Localize o id do título e a class do parágrafo.",
      "Confira que href aponta para o id existente.",
      "Observe disabled no botão de inscrições.",
      "Remova disabled e veja que o botão fica disponível, mas não ganha uma função automática.",
    ],
    body: `  <h1 id="inicio">Oficinas do bairro</h1>
  <p class="aviso">As inscrições abrem na próxima semana.</p>
  <p><a href="#inicio">Voltar ao início</a></p>
  <button type="button" disabled>Inscrições ainda fechadas</button>`,
    parts: [
      ['id="inicio"', "Define um identificador único usado pelo link interno."],
      ['class="aviso"', "Associa o parágrafo a uma classe, sem aplicar estilo por conta própria."],
      ['href="#inicio"', "Indica o destino do link dentro da página."],
      ['<button type="button" disabled>Inscrições ainda fechadas</button>', "A presença de disabled torna o botão indisponível."],
    ],
    preview: "Um título, um aviso e um link interno aparecem acima de um botão desabilitado.",
    exercise: {
      prompt: "Crie uma página de cursos com um h1 de id cursos, dois parágrafos com class informacao, um link para #cursos e um botão desabilitado.",
      hint: "O id deve aparecer uma única vez. A mesma class pode ser usada em ambos os parágrafos.",
      body: `  <h1 id="cursos">Cursos gratuitos</h1>
  <p class="informacao">As aulas acontecem na biblioteca.</p>
  <p class="informacao">Novas turmas serão anunciadas neste espaço.</p>
  <p><a href="#cursos">Voltar à apresentação dos cursos</a></p>
  <button type="button" disabled>Matrículas indisponíveis</button>`,
    },
  }),
  createLesson("basico", 16, {
    title: "Organização do código (indentação, comentários <!-- -->).",
    objective: "Organizar o código com recuos consistentes e comentários úteis.",
    explanation: [
      "Indentação é o recuo usado para mostrar quais elementos estão dentro de outros. Neste material, usamos dois espaços por nível. O navegador não exige esse padrão, mas ele facilita a leitura e ajuda a encontrar fechamentos fora do lugar.",
      "Um comentário HTML começa com <!-- e termina com -->. Seu conteúdo não é mostrado como texto na página. Use comentários para explicar decisões ou separar blocos que merecem identificação, sem repetir o que já está evidente.",
      "Comentários continuam presentes no código enviado ao navegador. Não coloque senhas nem dados pessoais neles. Ao revisar uma página, confira também se cada fechamento combina com a abertura e se o recuo representa a estrutura real.",
    ],
    instructions: [
      "Observe o recuo dos elementos dentro de body.",
      "Localize o comentário que identifica o conteúdo da receita.",
      "Compare o recuo de ul com o recuo de seus itens li.",
      "Acrescente um ingrediente mantendo o padrão de dois espaços por nível.",
    ],
    body: `  <!-- Receita curta para uma atividade de leitura. -->
  <h1>Água aromatizada</h1>
  <p>Uma bebida simples para acompanhar o lanche.</p>
  <ul>
    <li>Um litro de água</li>
    <li>Rodelas de limão</li>
    <li>Folhas de hortelã</li>
  </ul>`,
    parts: [
      ["<!-- Receita curta para uma atividade de leitura. -->", "Explica o contexto do exemplo sem aparecer na prévia."],
      [`<ul>
    <li>Um litro de água</li>
    <li>Rodelas de limão</li>
    <li>Folhas de hortelã</li>
  </ul>`, "O recuo ajuda a visualizar que os três itens pertencem à lista."],
      ["<p>Uma bebida simples para acompanhar o lanche.</p>", "Um elemento no mesmo nível do título e da lista."],
    ],
    preview: "A página mostra uma receita com título, descrição e lista de ingredientes. O comentário não aparece como texto na prévia.",
    exercise: {
      prompt: "Crie uma lista de materiais para desenho com h1, um parágrafo e uma lista com três itens. Use indentação consistente e um comentário explicando a finalidade da lista, sem dados pessoais.",
      hint: "Recue os itens li um nível a mais que ul. Feche o comentário com -->.",
      body: `  <!-- Materiais individuais para a primeira aula de desenho. -->
  <h1>Materiais para desenho</h1>
  <p>Separe os materiais antes do encontro.</p>
  <ul>
    <li>Papel</li>
    <li>Lápis</li>
    <li>Borracha</li>
  </ul>`,
    },
  }),
];

export const htmlIntermediario: Lesson[] = [
  createLesson("intermediario", 1, {
    title: "HTML semântico.",
    objective: "Escolher elementos pelo significado e não apenas pela aparência.",
    explanation: [
      "HTML semântico usa elementos que comunicam o papel do conteúdo. Um main identifica o conteúdo principal, enquanto um article pode representar um texto que faz sentido de forma independente. Isso ajuda pessoas, navegadores e tecnologias assistivas a reconhecer a organização.",
      "No exemplo, o conteúdo principal contém uma notícia sobre a biblioteca. O article reúne título, data e texto. O elemento time usa datetime para registrar a data em formato legível por máquinas, mesmo que a apresentação para a pessoa seja diferente.",
      "Semântica não substitui uma boa escrita nem garante acessibilidade sozinha. Escolha o elemento pelo propósito do conteúdo. Quando nenhum elemento específico for adequado, um agrupador genérico pode ser usado, mas não precisa substituir títulos, parágrafos e regiões que já possuem significado.",
    ],
    instructions: [
      "Encontre o main que envolve o conteúdo principal.",
      "Leia a notícia dentro de article e imagine sua publicação isolada.",
      "Compare a data visível com o valor de datetime.",
      "Altere a notícia preservando a função de cada elemento.",
    ],
    body: `  <main>
    <article>
      <h1>Biblioteca recebe novos livros</h1>
      <p>Publicado em <time datetime="2025-03-12">12 de março de 2025</time>.</p>
      <p>A coleção recebeu obras de literatura brasileira para empréstimo gratuito.</p>
    </article>
  </main>`,
    parts: [
      ["<main>", "Identifica a região principal deste documento."],
      ["<article>", "Agrupa uma notícia que pode ser compreendida independentemente."],
      ['<time datetime="2025-03-12">12 de março de 2025</time>', "Apresenta uma data e informa seu valor padronizado."],
    ],
    preview: "Uma notícia apresenta título, data de publicação e um parágrafo sobre os novos livros.",
    exercise: {
      prompt: "Crie uma notícia independente sobre uma feira de trocas. Use main, article, h1, um time com datetime e um parágrafo explicativo.",
      hint: "Escreva datetime no formato ano-mês-dia e uma data compreensível no conteúdo de time.",
      body: `  <main>
    <article>
      <h1>Feira de trocas acontece no sábado</h1>
      <p>Publicado em <time datetime="2025-04-08">8 de abril de 2025</time>.</p>
      <p>Moradores poderão trocar livros e brinquedos em bom estado na praça.</p>
    </article>
  </main>`,
    },
  }),
  createLesson("intermediario", 2, {
    title: "header, main, section e footer.",
    objective: "Dividir uma página em regiões com funções claras.",
    explanation: [
      "O header reúne conteúdo de apresentação, como o nome de um projeto e uma frase de boas-vindas. O footer reúne informações de encerramento, como contato e créditos. Esses elementos também podem existir dentro de conteúdos específicos, mas aqui representam o topo e o rodapé da página.",
      "O main contém o assunto principal. Neste exemplo há apenas um main visível, com duas seções: programação e participação. O elemento section agrupa um assunto e normalmente precisa de um título que explique esse agrupamento.",
      "Não crie uma section para cada frase apenas para obter um bloco visual. Use seções quando existir uma divisão temática real. A aparência pode continuar simples: a estrutura semântica existe mesmo sem cores ou bordas.",
    ],
    instructions: [
      "Leia a apresentação dentro de header.",
      "Identifique main e suas duas seções.",
      "Confira o h2 que nomeia cada section.",
      "Encontre o contato no footer, fora do conteúdo principal.",
    ],
    body: `  <header>
    <h1>Semana da leitura</h1>
    <p>Encontros gratuitos para todas as idades.</p>
  </header>
  <main>
    <section>
      <h2>Programação</h2>
      <p>Leitura compartilhada às 10h e oficina de escrita às 14h.</p>
    </section>
    <section>
      <h2>Como participar</h2>
      <p>Procure o balcão da biblioteca antes do início da atividade.</p>
    </section>
  </main>
  <footer>
    <p>Informações na recepção da biblioteca.</p>
  </footer>`,
    parts: [
      [`<header>
    <h1>Semana da leitura</h1>
    <p>Encontros gratuitos para todas as idades.</p>
  </header>`, "Apresenta o evento."],
      [`<section>
      <h2>Programação</h2>
      <p>Leitura compartilhada às 10h e oficina de escrita às 14h.</p>
    </section>`, "Agrupa o assunto programação com um título próprio."],
      [`<footer>
    <p>Informações na recepção da biblioteca.</p>
  </footer>`, "Reúne uma informação de encerramento."],
    ],
    preview: "A apresentação da Semana da leitura é seguida pelas seções Programação e Como participar e por um rodapé informativo.",
    exercise: {
      prompt: "Organize uma página de mutirão com header, um main contendo duas sections com h2 e um footer. As seções devem explicar as tarefas e os materiais necessários.",
      hint: "Mantenha um h1 na apresentação e um h2 para cada assunto principal dentro de main.",
      body: `  <header>
    <h1>Mutirão da praça</h1>
    <p>Vamos cuidar juntos do espaço do bairro.</p>
  </header>
  <main>
    <section>
      <h2>Tarefas</h2>
      <p>Vamos recolher resíduos e organizar os canteiros.</p>
    </section>
    <section>
      <h2>Materiais necessários</h2>
      <p>Traga luvas e uma garrafa de água.</p>
    </section>
  </main>
  <footer>
    <p>Encontro no sábado, às 8h, na entrada da praça.</p>
  </footer>`,
    },
  }),
  createLesson("intermediario", 3, {
    title: "nav e article.",
    objective: "Identificar a navegação principal e conteúdos independentes.",
    explanation: [
      "O elemento nav identifica um conjunto importante de links de navegação. No exemplo, os links ajudam a encontrar dois avisos da mesma página. Uma lista dentro de nav deixa clara a relação entre as opções.",
      "O elemento article reúne um conteúdo independente, como uma notícia, uma publicação ou um aviso completo. Os dois artigos têm títulos próprios e identificadores usados pelos links da navegação.",
      "Nem todo grupo de links precisa de nav e nem todo bloco de texto precisa de article. Reserve nav para conjuntos relevantes de navegação. Use article quando o conteúdo ainda fizer sentido se for compartilhado separadamente.",
    ],
    instructions: [
      "Leia o nome acessível da navegação em aria-label.",
      "Confira os links internos dentro da lista.",
      "Relacione cada href ao id do article correspondente.",
      "Use Tab e Enter para navegar até um dos avisos.",
    ],
    body: `  <header>
    <h1>Mural da comunidade</h1>
    <nav aria-label="Avisos do mural">
      <ul>
        <li><a href="#leitura">Encontro de leitura</a></li>
        <li><a href="#trocas">Feira de trocas</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article id="leitura">
      <h2>Encontro de leitura</h2>
      <p>O encontro acontece na biblioteca, sábado, às 10h.</p>
    </article>
    <article id="trocas">
      <h2>Feira de trocas</h2>
      <p>Leve livros em bom estado para trocar na praça, domingo, às 9h.</p>
    </article>
  </main>`,
    parts: [
      ['<nav aria-label="Avisos do mural">', "Identifica e nomeia uma região importante de navegação."],
      ['<a href="#trocas">Feira de trocas</a>', "Aponta para o artigo de id trocas."],
      [`<article id="leitura">
      <h2>Encontro de leitura</h2>
      <p>O encontro acontece na biblioteca, sábado, às 10h.</p>
    </article>`, "Reúne um aviso completo com título e informação."],
    ],
    preview: "O mural apresenta dois links de navegação e dois avisos completos: Encontro de leitura e Feira de trocas.",
    exercise: {
      prompt: "Crie um mural com nav e dois articles, um sobre uma oficina de pintura e outro sobre uma caminhada. Faça os links apontarem para os ids dos artigos.",
      hint: "Use ids diferentes e mantenha o mesmo texto depois de # no href correspondente.",
      body: `  <header>
    <h1>Agenda do bairro</h1>
    <nav aria-label="Atividades">
      <ul>
        <li><a href="#pintura">Oficina de pintura</a></li>
        <li><a href="#caminhada">Caminhada coletiva</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article id="pintura">
      <h2>Oficina de pintura</h2>
      <p>Encontro na biblioteca, terça-feira, às 14h.</p>
    </article>
    <article id="caminhada">
      <h2>Caminhada coletiva</h2>
      <p>Saída da praça, domingo, às 7h.</p>
    </article>
  </main>`,
    },
  }),
  createLesson("intermediario", 4, {
    title: "Formulários mais completos (select, textarea, radio, checkbox, fieldset, label).",
    objective: "Combinar seleções, grupos de opções e texto longo em um formulário.",
    explanation: [
      "O select oferece uma lista de opções, definidas por option. O textarea recebe texto com várias linhas. Ambos precisam de identificação visível por label, além de name para que seu valor participe do envio.",
      "Campos radio com o mesmo name formam um grupo de escolha única. Cada opção deve ter id próprio, label e value. Os checkbox permitem escolhas independentes e, quando marcados, enviam seus valores.",
      "O fieldset agrupa campos relacionados, e legend dá um nome ao grupo. No exemplo, esses elementos tornam clara a escolha de turno. O formulário é demonstrativo: preencher e enviar não cria uma inscrição real.",
    ],
    instructions: [
      "Escolha uma oficina no select.",
      "Marque um turno e observe a escolha única entre os radios.",
      "Marque ou desmarque o checkbox de avisos.",
      "Digite uma observação em várias linhas no textarea.",
    ],
    body: `  <main>
    <h1>Preferências de oficina</h1>
    <p>Demonstração: nenhuma inscrição será registrada.</p>
    <form action="#" method="get">
      <p>
        <label for="oficina">Oficina</label>
        <select id="oficina" name="oficina">
          <option value="leitura">Leitura</option>
          <option value="desenho">Desenho</option>
        </select>
      </p>
      <fieldset>
        <legend>Turno preferido</legend>
        <p>
          <input type="radio" id="manha" name="turno" value="manha">
          <label for="manha">Manhã</label>
        </p>
        <p>
          <input type="radio" id="tarde" name="turno" value="tarde">
          <label for="tarde">Tarde</label>
        </p>
      </fieldset>
      <p>
        <input type="checkbox" id="avisos" name="avisos" value="sim">
        <label for="avisos">Quero receber avisos sobre novas turmas</label>
      </p>
      <p>
        <label for="observacoes">Observações</label>
        <textarea id="observacoes" name="observacoes" rows="4" cols="30"></textarea>
      </p>
      <button type="submit">Enviar preferências</button>
    </form>
  </main>`,
    parts: [
      [`<select id="oficina" name="oficina">
          <option value="leitura">Leitura</option>
          <option value="desenho">Desenho</option>
        </select>`, "Oferece uma escolha entre opções predefinidas."],
      ['<input type="radio" id="manha" name="turno" value="manha">', "Integra um grupo de escolha única chamado turno."],
      ['<input type="checkbox" id="avisos" name="avisos" value="sim">', "Representa uma preferência independente."],
      ["<legend>Turno preferido</legend>", "Nomeia o grupo de campos dentro de fieldset."],
      ['<textarea id="observacoes" name="observacoes" rows="4" cols="30"></textarea>', "Recebe uma observação em várias linhas."],
    ],
    preview: "Um formulário apresenta seleção de oficina, grupo de turno, opção de receber avisos e área de observações.",
    exercise: {
      prompt: "Crie um formulário demonstrativo de passeio com select de destino, fieldset de transporte com dois radios, checkbox de interesse em novos passeios, textarea de observações e botão de envio. Associe labels a todos os controles.",
      hint: "Os radios compartilham name, mas cada um deve ter id e value próprios.",
      body: `  <h1>Preferências de passeio</h1>
  <p>Demonstração sem registro de participação.</p>
  <form action="#" method="get">
    <p>
      <label for="destino">Destino</label>
      <select id="destino" name="destino">
        <option value="parque">Parque</option>
        <option value="museu">Museu</option>
      </select>
    </p>
    <fieldset>
      <legend>Transporte</legend>
      <p>
        <input type="radio" id="onibus" name="transporte" value="onibus">
        <label for="onibus">Ônibus</label>
      </p>
      <p>
        <input type="radio" id="bicicleta" name="transporte" value="bicicleta">
        <label for="bicicleta">Bicicleta</label>
      </p>
    </fieldset>
    <p>
      <input type="checkbox" id="novidades" name="novidades" value="sim">
      <label for="novidades">Tenho interesse em novos passeios</label>
    </p>
    <p>
      <label for="observacoes">Observações</label>
      <textarea id="observacoes" name="observacoes" rows="4" cols="30"></textarea>
    </p>
    <button type="submit">Enviar preferências</button>
  </form>`,
    },
  }),
  createLesson("intermediario", 5, {
    title: "Validação de campos (required, minlength, pattern, type=email, min/max).",
    objective: "Aplicar restrições nativas e comunicar as regras antes do envio.",
    explanation: [
      "O navegador pode verificar algumas regras antes de enviar um formulário. required exige preenchimento. minlength estabelece o tamanho mínimo de um texto, e type=\"email\" verifica um formato básico de e-mail, sem confirmar se o endereço realmente existe.",
      "O atributo pattern define um padrão para o valor completo do campo. Neste exemplo, [0-9]{5} exige exatamente cinco algarismos. O texto de ajuda explica essa regra antes de ocorrer um erro. O campo numérico usa min e max para aceitar de uma a quatro vagas.",
      "As verificações acontecem no navegador e podem variar na apresentação. Elas ajudam quem preenche, mas não substituem a validação de um servidor em um sistema real. No laboratório, teste os erros sem usar dados pessoais: nenhum pedido de vaga será salvo.",
    ],
    instructions: [
      "Tente enviar todos os campos vazios e observe required.",
      "Digite apenas duas letras no nome para testar minlength.",
      "Teste um código com letras e depois cinco algarismos.",
      "Teste uma quantidade fora do intervalo e depois preencha todos os campos corretamente.",
    ],
    body: `  <h1>Pedido de vagas</h1>
  <p>Demonstração: nenhum pedido será registrado. Use dados fictícios.</p>
  <form action="#" method="get">
    <p>
      <label for="nome">Nome com pelo menos 3 caracteres</label>
      <input type="text" id="nome" name="nome" required minlength="3">
    </p>
    <p>
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email" required>
    </p>
    <p id="ajuda-codigo">O código deve conter exatamente cinco algarismos, como 12345.</p>
    <p>
      <label for="codigo">Código do convite</label>
      <input type="text" id="codigo" name="codigo" pattern="[0-9]{5}" inputmode="numeric" aria-describedby="ajuda-codigo" required>
    </p>
    <p>
      <label for="vagas">Quantidade de vagas, de 1 a 4</label>
      <input type="number" id="vagas" name="vagas" min="1" max="4" required>
    </p>
    <button type="submit">Verificar e enviar</button>
  </form>`,
    parts: [
      ['<input type="text" id="nome" name="nome" required minlength="3">', "Exige o preenchimento de um nome com pelo menos três caracteres."],
      ['<input type="email" id="email" name="email" required>', "Exige um valor com formato básico de e-mail."],
      ['pattern="[0-9]{5}"', "Exige exatamente cinco algarismos no valor completo."],
      ['aria-describedby="ajuda-codigo"', "Relaciona o campo ao texto que explica a regra."],
      ['min="1" max="4" required', "Limita a quantidade e torna o campo obrigatório."],
    ],
    preview: "Quatro campos mostram suas regras. Ao tentar enviar valores inválidos, o navegador impede o envio e indica um campo que precisa de correção.",
    exercise: {
      prompt: "Crie um formulário demonstrativo com nome obrigatório de pelo menos 4 caracteres, e-mail obrigatório, código de exatamente 3 algarismos e quantidade obrigatória de 1 a 5. Explique as regras em texto visível.",
      hint: "Use pattern=\"[0-9]{3}\" para o código e min=\"1\" max=\"5\" para a quantidade.",
      body: `  <h1>Solicitação de materiais</h1>
  <p>Demonstração sem registro. Use dados fictícios.</p>
  <form action="#" method="get">
    <p>
      <label for="nome">Nome com pelo menos 4 caracteres</label>
      <input type="text" id="nome" name="nome" required minlength="4">
    </p>
    <p>
      <label for="email">E-mail obrigatório</label>
      <input type="email" id="email" name="email" required>
    </p>
    <p>
      <label for="codigo">Código com exatamente 3 algarismos</label>
      <input type="text" id="codigo" name="codigo" pattern="[0-9]{3}" inputmode="numeric" required>
    </p>
    <p>
      <label for="quantidade">Quantidade de 1 a 5</label>
      <input type="number" id="quantidade" name="quantidade" min="1" max="5" required>
    </p>
    <button type="submit">Verificar solicitação</button>
  </form>`,
    },
  }),
  createLesson("intermediario", 6, {
    title: "Áudio e vídeo.",
    objective: "Incorporar mídia com controles e oferecer alternativas textuais.",
    explanation: [
      "Os elementos audio e video permitem reproduzir mídia no navegador. O atributo controls oferece controles nativos, como iniciar, pausar e ajustar o volume. O elemento source informa a origem do arquivo e seu tipo.",
      "O exemplo usa um efeito sonoro sem fala e um vídeo sem fala. O texto da página identifica o som e descreve o vídeo para que a atividade não dependa apenas de ouvir ou enxergar a mídia. Em conteúdos com fala, planeje transcrição e legendas revisadas; quando necessário, ofereça também audiodescrição.",
      "Evite iniciar áudio ou vídeo automaticamente. Isso pode incomodar e consumir dados sem escolha da pessoa. Aqui preload=\"none\" orienta o navegador a não carregar a mídia antecipadamente, embora o comportamento final dependa do navegador. A reprodução dos arquivos remotos exige internet.",
    ],
    instructions: [
      "Leia as descrições antes de reproduzir a mídia.",
      "Acione os controles do áudio para ouvir o efeito sonoro.",
      "Reproduza e pause o vídeo usando os controles nativos.",
      "Observe source e compare os tipos audio/mpeg e video/mp4.",
    ],
    body: `  <main>
    <h1>Explorando áudio e vídeo</h1>
    <section>
      <h2>Efeito sonoro</h2>
      <p>Descrição: um rugido de dinossauro, sem fala.</p>
      <audio controls preload="none">
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg">
        Seu navegador não oferece suporte a este áudio.
      </audio>
    </section>
    <section>
      <h2>Vídeo de uma flor</h2>
      <p>Descrição: uma flor em close, com movimento suave. O vídeo não contém fala.</p>
      <video controls preload="none" width="400">
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
        Seu navegador não oferece suporte a este vídeo.
      </video>
    </section>
  </main>`,
    parts: [
      ['<audio controls preload="none">', "Oferece controles e solicita que o áudio não seja carregado antecipadamente."],
      ['<source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg">', "Indica o arquivo de áudio e seu formato."],
      ['<video controls preload="none" width="400">', "Define um vídeo com controles e largura de 400 pixels."],
      ["<p>Descrição: uma flor em close, com movimento suave. O vídeo não contém fala.</p>", "Oferece uma descrição textual do conteúdo visual."],
    ],
    preview: "Duas seções apresentam descrições e controles de reprodução: uma para o rugido e outra para o vídeo da flor. A mídia só começa quando a pessoa aciona os controles.",
    exercise: {
      prompt: "Crie uma página com h1, um áudio de rugido e um vídeo da flor. Use os mesmos arquivos do exemplo, controls, preload=\"none\" e descrições textuais. Não use reprodução automática.",
      hint: "Coloque um source dentro de cada elemento e mantenha os controles disponíveis.",
      body: `  <main>
    <h1>Mostra de mídia</h1>
    <h2>Rugido</h2>
    <p>Descrição do áudio: efeito sonoro de rugido de dinossauro, sem fala.</p>
    <audio controls preload="none">
      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg">
      Seu navegador não oferece suporte a este áudio.
    </audio>
    <h2>Flor em movimento</h2>
    <p>Descrição do vídeo: uma flor vista de perto, com movimento suave e sem fala.</p>
    <video controls preload="none" width="400">
      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
      Seu navegador não oferece suporte a este vídeo.
    </video>
  </main>`,
    },
  }),
  createLesson("intermediario", 7, {
    title: "Incorporação de conteúdo com iframe.",
    objective: "Incorporar um mapa com identificação e alternativa de acesso.",
    explanation: [
      "O elemento iframe apresenta outro documento dentro da página. Ele pode ser útil para incorporar um mapa. Diferentemente de uma imagem, o conteúdo incorporado pode ter controles, links e sua própria navegação.",
      "O atributo src indica o documento incorporado. No exemplo, ele aponta para um mapa de Salvador no OpenStreetMap. Dentro de atributos HTML, escrevemos &amp; para representar o caractere & que separa parâmetros de uma URL.",
      "Dê um title descritivo ao iframe para identificar sua finalidade. Inclua também contexto e um link fora dele, pois o serviço pode não carregar. Alguns sites bloqueiam incorporação, e conteúdo externo pode envolver privacidade e consumo de dados. loading=\"lazy\" solicita carregamento adiado quando adequado.",
    ],
    instructions: [
      "Leia a explicação da região mostrada no mapa.",
      "Localize o title que identifica o iframe.",
      "Observe os parâmetros da URL e o uso de &amp;.",
      "Teste o link externo como alternativa ao mapa incorporado.",
    ],
    body: `  <main>
    <h1>Conhecendo Salvador</h1>
    <p>O mapa abaixo mostra uma região de Salvador, na Bahia.</p>
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=-38.55,-12.99,-38.45,-12.93&amp;layer=mapnik"
      title="Mapa de uma região de Salvador, Bahia"
      width="400"
      height="300"
      loading="lazy">
    </iframe>
    <p><a href="https://www.openstreetmap.org/#map=13/-12.96/-38.50">Abrir o mapa de Salvador no OpenStreetMap</a></p>
  </main>`,
    parts: [
      ['src="https://www.openstreetmap.org/export/embed.html?bbox=-38.55,-12.99,-38.45,-12.93&amp;layer=mapnik"', "Carrega o mapa; &amp; representa o separador & na URL."],
      ['title="Mapa de uma região de Salvador, Bahia"', "Dá um nome descritivo ao conteúdo incorporado."],
      ['loading="lazy"', "Solicita ao navegador que adie o carregamento quando for apropriado."],
      ['<a href="https://www.openstreetmap.org/#map=13/-12.96/-38.50">Abrir o mapa de Salvador no OpenStreetMap</a>', "Oferece uma alternativa fora do iframe."],
    ],
    preview: "A página mostra uma introdução, um mapa interativo de Salvador com 400 por 300 pixels e um link alternativo. O mapa depende do serviço externo e da conexão.",
    exercise: {
      prompt: "Crie uma página chamada Explorando Salvador com um parágrafo de contexto, o mesmo mapa incorporado, title descritivo, loading=\"lazy\" e um link alternativo para o OpenStreetMap.",
      hint: "Use a URL de incorporação do exemplo e mantenha &amp; no atributo HTML.",
      body: `  <main>
    <h1>Explorando Salvador</h1>
    <p>Use o mapa para observar uma região da cidade de Salvador.</p>
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=-38.55,-12.99,-38.45,-12.93&amp;layer=mapnik"
      title="Mapa para explorar Salvador, na Bahia"
      width="400"
      height="300"
      loading="lazy">
    </iframe>
    <p><a href="https://www.openstreetmap.org/#map=13/-12.96/-38.50">Explorar Salvador no OpenStreetMap</a></p>
  </main>`,
    },
  }),
  createLesson("intermediario", 8, {
    title: "Acessibilidade básica (alt, label, contraste, ordem de títulos, lang).",
    objective: "Aplicar cuidados básicos para tornar uma página mais acessível.",
    explanation: [
      "Acessibilidade permite que mais pessoas usem o conteúdo, incluindo quem utiliza leitor de tela ou apenas teclado. O idioma lang=\"pt-BR\" ajuda na pronúncia, e a sequência h1 seguida de h2 facilita entender a organização. Esses cuidados devem existir desde o começo do projeto.",
      "O alt depende da função da imagem. A fotografia deste convite é decorativa, então usa alt vazio. Se uma imagem apresentar informação necessária, como um gráfico de resultados, sua alternativa deve comunicar essa informação. O campo de e-mail tem label associado, e não depende de placeholder para ser identificado.",
      "O CSS mantém texto escuro sobre fundo branco e links sublinhados. Para texto comum, busque contraste de pelo menos 4,5:1; para texto grande, pelo menos 3:1. Teste também Tab e Shift+Tab. O exemplo preserva um foco visível, mas esses cuidados são um começo, não uma auditoria completa.",
    ],
    instructions: [
      "Confira o idioma em html e a sequência dos títulos.",
      "Observe que a imagem é decorativa e usa alt vazio.",
      "Clique no label E-mail para focar o campo.",
      "Percorra link, campo e botão com Tab e confira o destaque do foco.",
    ],
    body: `  <main>
    <h1>Oficina aberta à comunidade</h1>
    <p>A oficina de leitura acontece na biblioteca aos sábados, às 10h.</p>
    <img src="https://picsum.photos/seed/comunidade/400/250" alt="" width="400" height="250">
    <section>
      <h2>Informações sobre participação</h2>
      <p><a href="#contato">Ir ao formulário demonstrativo de contato</a></p>
    </section>
    <section id="contato">
      <h2>Contato</h2>
      <p>Demonstração: o e-mail não será cadastrado.</p>
      <form action="#" method="get">
        <p>
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email">
        </p>
        <button type="submit">Enviar contato</button>
      </form>
    </section>
  </main>`,
    css: `body {
  background: #ffffff;
  color: #222222;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 16px;
}
a {
  color: #003d80;
  text-decoration: underline;
}
input, button {
  font: inherit;
}
a:focus-visible, input:focus-visible, button:focus-visible {
  outline: 3px solid #222222;
  outline-offset: 3px;
}
img {
  max-width: 100%;
  height: auto;
}`,
    parts: [
      ['<html lang="pt-BR">', "Informa o idioma principal para o navegador e tecnologias assistivas."],
      ['<img src="https://picsum.photos/seed/comunidade/400/250" alt="" width="400" height="250">', "Uma imagem decorativa não acrescenta uma descrição ao leitor de tela."],
      ['<label for="email">E-mail</label>', "Oferece uma identificação visível e associada ao campo."],
      [`a:focus-visible, input:focus-visible, button:focus-visible {
  outline: 3px solid #222222;
  outline-offset: 3px;
}`, "Destaca o elemento focado durante a navegação por teclado."],
    ],
    preview: "Um convite com texto escuro em fundo branco apresenta uma imagem decorativa e um formulário identificado. Links ficam sublinhados e controles focados pelo teclado recebem contorno.",
    exercise: {
      prompt: "Crie uma página acessível de uma oficina com h1, seção com h2 e formulário demonstrativo de nome com label. Mantenha lang=\"pt-BR\". No CSS, use texto #222222 em fundo branco e foco visível no campo e no botão.",
      hint: "Associe for ao id do campo. Não remova o contorno do foco sem oferecer outro destaque.",
      body: `  <main>
    <h1>Oficina de escrita</h1>
    <section>
      <h2>Interesse em participar</h2>
      <p>Encontro na biblioteca aos sábados. Este formulário não registra inscrições.</p>
      <form action="#" method="get">
        <p>
          <label for="nome">Nome</label>
          <input type="text" id="nome" name="nome">
        </p>
        <button type="submit">Enviar interesse</button>
      </form>
    </section>
  </main>`,
      css: `body {
  color: #222222;
  background: #ffffff;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
input, button {
  font: inherit;
}
input:focus-visible, button:focus-visible {
  outline: 3px solid #222222;
  outline-offset: 3px;
}`,
    },
  }),
  createLesson("intermediario", 9, {
    title: "Organização de projetos (pastas, nomes de arquivos, caminhos relativos).",
    objective: "Planejar pastas e resolver caminhos a partir do arquivo atual.",
    explanation: [
      "Um projeto pode separar páginas, imagens e folhas de estilo em pastas. Para começar, escolha nomes curtos e consistentes, sem espaços, como index.html e contato.html. Evitar acentos nos nomes dos arquivos pode reduzir dificuldades ao publicar em diferentes servidores.",
      "Um caminho relativo parte da localização do arquivo que faz a referência. Em index.html na raiz, paginas/contato.html aponta para a página de contato. Em paginas/contato.html, ../index.html sobe uma pasta e encontra a página inicial. O trecho ../ significa subir um nível.",
      "A lista do exemplo é uma documentação da estrutura, não a criação de arquivos reais. O laboratório contém apenas a página atual; por isso, os caminhos são mostrados como texto e não como links que poderiam falhar. Em muitos servidores, maiúsculas e minúsculas fazem diferença: contato.html e Contato.html podem ser arquivos distintos.",
    ],
    instructions: [
      "Leia a lista e identifique os arquivos da raiz.",
      "Encontre a página de contato dentro da pasta paginas.",
      "Compare o caminho de ida com o caminho de retorno.",
      "Planeje uma nova página em paginas mantendo nomes consistentes.",
    ],
    body: `  <main>
    <h1>Projeto da biblioteca</h1>
    <h2>Estrutura planejada</h2>
    <ul>
      <li>index.html — página inicial na raiz</li>
      <li>paginas/
        <ul>
          <li>contato.html — página de contato</li>
        </ul>
      </li>
      <li>imagens/
        <ul>
          <li>fachada.jpg — fotografia da biblioteca</li>
        </ul>
      </li>
      <li>css/
        <ul>
          <li>estilos.css — regras visuais do projeto</li>
        </ul>
      </li>
    </ul>
    <h2>Exemplos de caminhos</h2>
    <p>Da página inicial para contato: <code>paginas/contato.html</code>.</p>
    <p>Da página de contato para a inicial: <code>../index.html</code>.</p>
    <p>Da página de contato para a fotografia: <code>../imagens/fachada.jpg</code>.</p>
  </main>`,
    parts: [
      ["<li>index.html — página inicial na raiz</li>", "Documenta o arquivo principal do projeto."],
      ["<code>paginas/contato.html</code>", "Mostra um caminho relativo que entra em uma pasta."],
      ["<code>../index.html</code>", "Mostra um caminho que sobe uma pasta."],
      ["<code>../imagens/fachada.jpg</code>", "Sobe uma pasta e entra em imagens para encontrar o arquivo."],
    ],
    preview: "Uma lista com níveis apresenta a organização planejada de arquivos e pastas. Três parágrafos mostram caminhos relativos em fonte de código, sem criar arquivos nem carregar imagens.",
    exercise: {
      prompt: "Documente um projeto de receitas com index.html na raiz, paginas/bolo.html e imagens/bolo.jpg. Use uma lista aninhada e mostre os caminhos da inicial para a receita e da receita para a imagem. Não crie links para arquivos inexistentes.",
      hint: "Partindo de paginas/bolo.html, use ../ para sair de paginas antes de entrar em imagens.",
      body: `  <main>
    <h1>Projeto de receitas</h1>
    <h2>Arquivos planejados</h2>
    <ul>
      <li>index.html — página inicial</li>
      <li>paginas/
        <ul>
          <li>bolo.html — receita de bolo</li>
        </ul>
      </li>
      <li>imagens/
        <ul>
          <li>bolo.jpg — fotografia do bolo</li>
        </ul>
      </li>
    </ul>
    <h2>Caminhos relativos</h2>
    <p>Da inicial para a receita: <code>paginas/bolo.html</code>.</p>
    <p>Da receita para a imagem: <code>../imagens/bolo.jpg</code>.</p>
  </main>`,
    },
  }),
  createLesson("intermediario", 10, {
    title: "Boas práticas de desenvolvimento.",
    objective: "Revisar estrutura, conteúdo, acessibilidade e funcionamento de uma página.",
    explanation: [
      "Uma página bem construída começa com conteúdo claro e uma estrutura coerente. Defina um title descritivo, informe o idioma e use títulos em ordem. Prefira elementos com significado e mantenha a indentação consistente para facilitar futuras alterações.",
      "Revise o que a pessoa pode fazer. Links precisam apontar para destinos corretos e ter textos compreensíveis. Campos precisam de labels, e botões precisam anunciar ações reais. Não peça dados desnecessários nem coloque informações sensíveis no HTML ou em comentários.",
      "Teste a página em tela pequena e com teclado, além de conferir imagens, mídia e textos. Um validador de HTML pode encontrar problemas de marcação, mas não garante clareza nem acessibilidade completa. Faça pequenas alterações, verifique o resultado e mantenha cópias versionadas do projeto.",
    ],
    instructions: [
      "Revise o idioma, a codificação e o título do documento.",
      "Confira a hierarquia entre h1 e os títulos h2.",
      "Teste os links de navegação com Tab e Enter.",
      "Use a lista de revisão para verificar a página antes de publicá-la.",
    ],
    body: `  <header>
    <h1>Guia da horta comunitária</h1>
    <nav aria-label="Seções do guia">
      <ul>
        <li><a href="#participacao">Como participar</a></li>
        <li><a href="#revisao">Lista de revisão</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section id="participacao">
      <h2>Como participar</h2>
      <p>Visite a horta aos sábados, das 8h às 11h. Leve água e use calçados fechados.</p>
    </section>
    <section id="revisao">
      <h2>Lista de revisão</h2>
      <ul>
        <li>Conferir se os títulos explicam os assuntos.</li>
        <li>Testar todos os links com mouse e teclado.</li>
        <li>Verificar a leitura em uma tela pequena.</li>
        <li>Revisar a escrita e a estrutura do HTML.</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>Projeto comunitário sem coleta de dados nesta página.</p>
  </footer>`,
    parts: [
      ['<nav aria-label="Seções do guia">', "Nomeia uma região de navegação com links úteis."],
      ['<a href="#participacao">Como participar</a>', "Anuncia claramente o destino do link."],
      [`<section id="participacao">
      <h2>Como participar</h2>
      <p>Visite a horta aos sábados, das 8h às 11h. Leve água e use calçados fechados.</p>
    </section>`, "Reúne orientações concretas em uma seção com título."],
      ["<li>Testar todos os links com mouse e teclado.</li>", "Transforma uma boa prática em uma verificação que pode ser executada."],
    ],
    preview: "O guia apresenta navegação interna, orientações para participar da horta, uma lista de revisão e um rodapé. Os dois links levam às seções correspondentes.",
    exercise: {
      prompt: "Crie uma página de uma campanha de livros com header, nav, main e footer. Inclua duas sections com h2: Como doar e Revisão da página. Faça links internos válidos e liste três verificações de qualidade na segunda seção.",
      hint: "Use ids únicos para as seções e confira cada href. Escreva orientações de doação concretas e não solicite dados pessoais.",
      body: `  <header>
    <h1>Campanha de livros</h1>
    <nav aria-label="Seções da campanha">
      <ul>
        <li><a href="#doacao">Como doar</a></li>
        <li><a href="#revisao">Revisão da página</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section id="doacao">
      <h2>Como doar</h2>
      <p>Entregue livros em bom estado na biblioteca, de segunda a sexta, das 9h às 17h.</p>
    </section>
    <section id="revisao">
      <h2>Revisão da página</h2>
      <ul>
        <li>Conferir a ordem dos títulos.</li>
        <li>Testar os links internos usando o teclado.</li>
        <li>Verificar se o texto pode ser lido em tela pequena.</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>Esta página não coleta dados pessoais.</p>
  </footer>`,
    },
  }),
];
