import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "pj-vg-01",
    module: "visualg",
    title: "Calculadora simples",
    description:
      "Monte uma calculadora de terminal que recebe dois números e uma opção de operação. Ela deve informar o resultado ou explicar por que a operação não pode ser realizada.",
    objective:
      "Praticar entrada de dados, variáveis reais, operações aritméticas e decisões com escolha.",
    requirements: [
      "Ler dois números reais e uma opção inteira de operação.",
      "Mostrar um menu com 1 para soma, 2 para subtração, 3 para multiplicação e 4 para divisão.",
      "Usar escolha para executar somente a operação selecionada.",
      "Exibir o resultado com um rótulo que identifique a operação.",
      "Impedir a divisão quando o segundo número for zero e mostrar uma mensagem explicativa.",
      "Tratar opções fora de 1 a 4 com outrocaso.",
    ],
    challenge:
      "Coloque a calculadora em um repita com opção 0 para sair. Conte quantas operações válidas foram realizadas e mostre esse total ao encerrar.",
    starterCode: `algoritmo "Calculadora simples"
var
  a, b, resultado: real
  opcao: inteiro
inicio
  escreval("CALCULADORA")
  escreval("1 - Somar")
  escreval("2 - Subtrair")
  escreval("3 - Multiplicar")
  escreval("4 - Dividir")
  // Leia os dois numeros e a opcao.
  // Use escolha para calcular o resultado.
  // Antes de dividir, verifique se b e diferente de zero.
  // Use outrocaso para avisar sobre uma opcao invalida.
fimalgoritmo`,
  },
  {
    id: "pj-vg-02",
    module: "visualg",
    title: "Verificador de idade",
    description:
      "Crie uma consulta que recebe nome e idade e informa a faixa etária da pessoa. O programa também deve identificar idades negativas como inválidas.",
    objective:
      "Organizar condições sem sobreposição e trabalhar com texto, inteiros e se/senao.",
    requirements: [
      "Ler o nome como caractere e a idade como inteiro.",
      "Rejeitar idade negativa com uma mensagem e não classificar essa entrada.",
      "Classificar de 0 a 11 como CRIANCA e de 12 a 17 como ADOLESCENTE.",
      "Classificar de 18 a 59 como ADULTO e a partir de 60 como IDOSO.",
      "Mostrar o nome e a classificação para entradas válidas.",
      "Testar os limites 11, 12, 17, 18, 59 e 60 para conferir as condições.",
    ],
    challenge:
      "Repita a consulta para cinco pessoas e mostre quantas entradas válidas ficaram em cada faixa etária.",
    starterCode: `algoritmo "Verificador de idade"
var
  nome: caractere
  idade: inteiro
inicio
  escreval("VERIFICADOR DE IDADE")
  // Leia o nome e a idade.
  // Primeiro verifique se a idade e negativa.
  // Caso seja valida, classifique usando se e senao.
  // Confira os limites para nao deixar faixas sem resposta.
fimalgoritmo`,
  },
  {
    id: "pj-vg-03",
    module: "visualg",
    title: "Sistema de média escolar",
    description:
      "Ajude uma pessoa estudante a consultar sua situação a partir de três notas. As notas devem ser validadas antes do cálculo.",
    objective:
      "Calcular uma média aritmética e usar condições compostas para validar dados e classificar resultados.",
    requirements: [
      "Ler o nome da pessoa estudante e três notas reais.",
      "Verificar se todas as notas estão entre 0 e 10, incluindo os limites.",
      "Se alguma nota for inválida, mostrar NOTA INVALIDA sem calcular a média.",
      "Calcular a média como a soma das três notas dividida por três.",
      "Classificar média a partir de 7 como APROVADO; de 5 até menos de 7 como RECUPERACAO; abaixo de 5 como REPROVADO.",
      "Mostrar o nome, a média com duas casas decimais e a situação.",
    ],
    challenge:
      "Para quem ficar em recuperação, leia uma nota de prova final e calcule a média entre ela e a média original. Considere aprovação final a partir de 6 e valide a nova nota.",
    starterCode: `algoritmo "Media escolar"
var
  nome: caractere
  nota1, nota2, nota3, media: real
inicio
  escreval("CONSULTA DE MEDIA")
  // Leia o nome e as tres notas.
  // Valide cada nota usando comparacoes e operadores logicos.
  // Calcule a media somente quando todas forem validas.
  // Classifique a media e use media:6:2 para duas casas.
fimalgoritmo`,
  },
  {
    id: "pj-vg-04",
    module: "visualg",
    title: "Tabuada",
    description:
      "Construa uma ferramenta que mostra a tabuada de um número e permite conferir cada multiplicação em uma linha.",
    objective:
      "Usar para com um contador e montar saídas que combinam texto e resultados numéricos.",
    requirements: [
      "Ler um número inteiro, permitindo também zero e valores negativos.",
      "Usar para para percorrer os multiplicadores de 1 até 10.",
      "Mostrar exatamente dez multiplicações, uma por linha.",
      "Identificar em cada linha o número, o multiplicador e o produto, como 4 x 3 = 12.",
      "Mostrar um título antes da tabuada e uma mensagem de encerramento depois dela.",
    ],
    challenge:
      "Leia também o multiplicador inicial e o final. Valide se o início não é maior que o fim e gere a tabuada apenas no intervalo escolhido.",
    starterCode: `algoritmo "Tabuada"
var
  numero, i: inteiro
inicio
  escreval("GERADOR DE TABUADA")
  // Leia o numero escolhido.
  // Use para com i de 1 ate 10.
  // Dentro do laco, escreva numero, i e numero * i.
  // Mostre uma mensagem depois do fimpara.
fimalgoritmo`,
  },
  {
    id: "pj-vg-05",
    module: "visualg",
    title: "Sistema de aprovação de alunos",
    description:
      "Processe uma pequena turma e produza um resumo de aprovação. Além da média, considere a frequência de cada aluno.",
    objective:
      "Combinar repetição, decisões, contadores e uma função que devolve a média de duas notas.",
    requirements: [
      "Processar cinco alunos com um para, lendo nome, duas notas e frequência percentual.",
      "Repetir a leitura de cada nota até ela estar entre 0 e 10 e da frequência até estar entre 0 e 100.",
      "Criar uma função que receba duas notas reais e retorne a média aritmética.",
      "Considerar APROVADO somente quem tiver média maior ou igual a 7 e frequência maior ou igual a 75.",
      "Mostrar nome, média e situação de cada aluno.",
      "Contar aprovados e reprovados e mostrar os dois totais ao final.",
      "Acumular as médias individuais e mostrar a média geral da turma.",
    ],
    challenge:
      "Separe as reprovações em dois grupos: por frequência e, somente entre quem atingiu frequência suficiente, por nota. Mostre os totais sem contar a mesma pessoa duas vezes.",
    starterCode: `algoritmo "Aprovacao da turma"
var
  nome: caractere
  nota1, nota2, frequencia, media, somaMedias: real
  i, aprovados, reprovados: inteiro

// Antes de inicio, declare uma funcao para calcular a media.
// Ela deve receber dois reais e retornar um real.

inicio
  aprovados <- 0
  reprovados <- 0
  somaMedias <- 0
  escreval("RESULTADOS DA TURMA")
  // Use para para processar cinco alunos.
  // Valide as entradas com repita e ate.
  // Chame sua funcao e verifique media e frequencia.
  // Atualize os contadores e a soma das medias.
  // Depois do laco, mostre os totais e a media geral.
fimalgoritmo`,
  },
  {
    id: "pj-vg-06",
    module: "visualg",
    title: "Cadastro simples de informações",
    description:
      "Cadastre cinco pessoas usando vetores paralelos para nomes e idades. Depois, apresente os registros e permita consultar uma posição.",
    objective:
      "Entender índices de vetores, percorrer dados armazenados e validar uma posição antes de acessá-la.",
    requirements: [
      "Usar um vetor de cinco nomes e outro de cinco idades, ambos com índices de 1 a 5.",
      "Preencher os dois vetores com para, mantendo nome e idade da mesma pessoa no mesmo índice.",
      "Não aceitar idades negativas: repetir a leitura até receber um valor válido.",
      "Listar as cinco pessoas mostrando posição, nome e idade.",
      "Calcular e mostrar a média das idades cadastradas.",
      "Ler uma posição para consulta e mostrar o registro correspondente apenas se ela estiver entre 1 e 5.",
    ],
    challenge:
      "Permita buscar um nome completo e liste todas as correspondências, sem diferenciar letras maiúsculas de minúsculas. Se nenhuma for encontrada, mostre NAO ENCONTRADO.",
    starterCode: `algoritmo "Cadastro com vetores"
var
  nomes: vetor[1..5] de caractere
  idades: vetor[1..5] de inteiro
  i, posicao, somaIdades: inteiro
inicio
  somaIdades <- 0
  escreval("CADASTRO DE PESSOAS")
  // Preencha nomes[i] e idades[i] para i de 1 ate 5.
  // Valide a idade antes de acumula-la.
  // Use outro para para listar os registros.
  // Mostre a media das idades.
  // Leia posicao e valide os limites antes da consulta.
fimalgoritmo`,
  },
  {
    id: "pj-vg-07",
    module: "visualg",
    title: "Controle de estoque básico",
    description:
      "Organize três produtos em vetores e mantenha um menu para listar o estoque, registrar entradas e registrar saídas sem permitir quantidades negativas.",
    objective:
      "Integrar vetores, repita, escolha e validação de dados em um programa com várias operações.",
    requirements: [
      "Cadastrar três nomes de produtos e suas quantidades iniciais em vetores de índices 1 a 3.",
      "Validar as quantidades iniciais para que sejam inteiros não negativos.",
      "Usar repita para mostrar um menu até a opção 0 ser escolhida.",
      "Usar escolha com 1 para listar, 2 para entrada, 3 para saída e 0 para encerrar; tratar opções inválidas.",
      "Validar o índice do produto antes de acessar os vetores em entradas e saídas.",
      "Aceitar movimentações apenas com quantidade positiva e impedir saídas maiores que o saldo disponível.",
      "Atualizar o vetor e mostrar o novo saldo após cada movimentação válida.",
    ],
    challenge:
      "Acrescente um vetor de estoque mínimo para cada produto e uma opção que liste os produtos cujo saldo está abaixo do mínimo cadastrado.",
    starterCode: `algoritmo "Controle de estoque"
var
  produtos: vetor[1..3] de caractere
  quantidades: vetor[1..3] de inteiro
  i, opcao, posicao, quantidade: inteiro
inicio
  escreval("CONTROLE DE ESTOQUE")
  // Cadastre os tres produtos e valide seus saldos iniciais.
  repita
    escreval("1 - Listar")
    escreval("2 - Registrar entrada")
    escreval("3 - Registrar saida")
    escreval("0 - Sair")
    leia(opcao)
    // Use escolha para tratar cada opcao.
    // Valide posicao antes de acessar um vetor.
    // Confira quantidade e saldo antes de atualizar.
  ate opcao = 0
  escreval("Programa encerrado.")
fimalgoritmo`,
  },
  {
    id: "pj-web-01",
    module: "web",
    title: "Página pessoal",
    description:
      "Apresente uma pessoa fictícia ou informações que você queira tornar públicas. A página deve reunir uma breve apresentação, interesses e um link útil.",
    objective:
      "Criar um documento HTML semântico e aplicar estilos básicos com boa legibilidade.",
    requirements: [
      "Manter lang pt-BR, charset UTF-8, viewport e um title descritivo no documento.",
      "Criar header, main e footer, com um único h1 para o nome escolhido.",
      "Adicionar uma seção de apresentação com h2 e pelo menos dois parágrafos.",
      "Criar uma lista não ordenada com pelo menos três interesses.",
      "Adicionar um link externo com texto que explique seu destino.",
      "Aplicar fonte legível, espaçamento interno e largura máxima de leitura sem causar rolagem horizontal em telas pequenas.",
    ],
    challenge:
      "Crie uma navegação com links para as seções da própria página e destaque visualmente o foco dos links para quem usa teclado.",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Minha página pessoal</title>
</head>
<body>
  <header>
    <!-- Acrescente o nome em um h1. -->
  </header>
  <main>
    <!-- Crie a apresentacao e a lista de interesses. -->
    <!-- Inclua um link com texto descritivo. -->
  </main>
  <footer>
    <!-- Escreva uma breve mensagem de autoria. -->
  </footer>
</body>
</html>`,
    starterCss: `* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #182536;
  background-color: #f4f7fb;
}
header,
main,
footer {
  max-width: 760px;
  margin: 0 auto;
  padding: 20px;
}
a {
  color: #174ea6;
}`,
  },
  {
    id: "pj-web-02",
    module: "web",
    title: "Cartão de perfil",
    description:
      "Monte um cartão compacto para apresentar uma pessoa fictícia, sua área de estudo e uma pequena biografia. O cartão deve funcionar em telas estreitas.",
    objective:
      "Praticar classes, box model, imagens acessíveis e organização de conteúdo com flexbox.",
    requirements: [
      "Criar um main com um h1 que identifique a página.",
      "Criar um article com classe perfil contendo o nome em h2, área de estudo e uma biografia.",
      "Adicionar uma imagem com src válido e alt apropriado ao conteúdo; usar alt vazio somente se ela for decorativa.",
      "Adicionar um link de contato com destino e texto descritivo, usando dados fictícios.",
      "Aplicar ao cartão padding, borda, border-radius e largura que respeite o espaço da tela.",
      "Usar display flex e gap para organizar os elementos sem depender de espaços inseridos no HTML.",
    ],
    challenge:
      "Com uma media query, mostre imagem e apresentação lado a lado em telas amplas e em coluna nas telas estreitas.",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cartão de perfil</title>
</head>
<body>
  <main>
    <h1>Conheça nosso grupo</h1>
    <!-- Crie um article com classe perfil. -->
    <!-- Inclua imagem, nome, area, biografia e contato. -->
  </main>
</body>
</html>`,
    starterCss: `* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
  color: #172b4d;
  background-color: #edf3fa;
}
main {
  max-width: 720px;
  margin: 0 auto;
}
img {
  max-width: 100%;
  height: auto;
}
.perfil {
  background-color: #ffffff;
}`,
  },
  {
    id: "pj-web-03",
    module: "web",
    title: "Página de apresentação",
    description:
      "Apresente uma iniciativa fictícia, como uma horta comunitária ou um grupo de leitura. Explique a proposta, as atividades e como participar.",
    objective:
      "Organizar uma página em seções semânticas e criar uma navegação interna funcional.",
    requirements: [
      "Criar header com o nome da iniciativa em h1 e uma breve chamada de apresentação.",
      "Adicionar nav com links internos para as seções Sobre, Atividades e Participar.",
      "Criar as três seções dentro de main, cada uma com id correspondente e h2.",
      "Descrever pelo menos três atividades em uma lista.",
      "Na seção Participar, incluir um link de contato descritivo com dados fictícios.",
      "Usar classes para diferenciar seções e garantir espaçamento consistente entre título e conteúdo.",
      "Adaptar a navegação com flex-wrap ou media query para evitar transbordamento em telas pequenas.",
    ],
    challenge:
      "Crie uma grade de cartões de atividades que tenha uma coluna em telas estreitas e três colunas em telas amplas.",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Apresentação da iniciativa</title>
</head>
<body>
  <header>
    <!-- Acrescente o nome e a chamada. -->
    <nav aria-label="Navegação principal">
      <!-- Crie os links internos. -->
    </nav>
  </header>
  <main>
    <!-- Crie as secoes sobre, atividades e participar. -->
  </main>
  <footer>
    <p>Projeto fictício para praticar HTML e CSS.</p>
  </footer>
</body>
</html>`,
    starterCss: `* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #18372c;
}
header,
main,
footer {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
a {
  color: #176141;
}`,
  },
  {
    id: "pj-web-04",
    module: "web",
    title: "Página de login",
    description:
      "Desenhe uma tela demonstrativa de acesso com campos de e-mail e senha. O projeto é apenas visual: não autentica pessoas nem deve solicitar senhas reais.",
    objective:
      "Construir um formulário acessível e estilizar campos, botões e estados de foco.",
    requirements: [
      "Criar main com um h1 que identifique a tela como uma demonstração de login.",
      "Adicionar form com campo de e-mail de type email e campo de senha de type password.",
      "Associar um label visível a cada campo usando for e id correspondentes.",
      "Definir name e required nos dois campos e minlength de 8 na senha.",
      "Adicionar um button de type submit com texto Entrar.",
      "Informar visivelmente que não há autenticação real e que devem ser usados somente dados fictícios.",
      "Estilizar os campos com largura adaptável e manter um indicador de foco visível para navegação por teclado.",
    ],
    challenge:
      "Adicione uma opção Lembrar meu acesso com checkbox e label, além de um texto de ajuda associado à senha por aria-describedby. A opção é apenas demonstrativa e não precisa armazenar nada.",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login demonstrativo</title>
</head>
<body>
  <main class="painel">
    <h1>Login demonstrativo</h1>
    <p>Use apenas dados fictícios. Esta página não autentica usuários.</p>
    <!-- Crie o formulario com rotulos, campos e botao. -->
    <!-- Nao configure um servidor de envio neste exercicio. -->
  </main>
</body>
</html>`,
    starterCss: `* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 24px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
  color: #1c2840;
  background-color: #eef2f8;
}
.painel {
  max-width: 420px;
  margin: 32px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
}
input,
button {
  font: inherit;
}
:focus-visible {
  outline: 3px solid #2255bb;
  outline-offset: 3px;
}`,
  },
  {
    id: "pj-web-05",
    module: "web",
    title: "Página de contato",
    description:
      "Crie uma interface de contato para um projeto fictício. Organize os campos de forma clara e use a validação básica do navegador, sem enviar mensagens reais.",
    objective:
      "Trabalhar com diferentes controles de formulário, rótulos acessíveis e organização visual.",
    requirements: [
      "Criar um h1 e um parágrafo explicando que o formulário é demonstrativo e não envia mensagens.",
      "Adicionar form com campos de nome, e-mail e mensagem, usando textarea para a mensagem.",
      "Associar cada campo a um label por for e id e definir um name em cada controle.",
      "Marcar nome, e-mail e mensagem como obrigatórios e usar type email no campo adequado.",
      "Adicionar select de assunto com opções Dúvida, Sugestão e Outro, também com label associado.",
      "Adicionar button de type submit com texto Enviar mensagem.",
      "Organizar o formulário com espaçamento consistente, campos adaptáveis à largura disponível e foco visível.",
    ],
    challenge:
      "Adicione um fieldset com legend Forma de retorno e dois botões de rádio, E-mail e Telefone. Use o mesmo name nos rádios e labels individuais, sem implementar envio real.",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contato demonstrativo</title>
</head>
<body>
  <main>
    <h1>Entre em contato</h1>
    <p>Formulário demonstrativo: nenhuma mensagem será enviada.</p>
    <!-- Crie o formulario com nome, email, assunto e mensagem. -->
    <!-- Inclua um rotulo visivel para cada controle. -->
  </main>
</body>
</html>`,
    starterCss: `* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 24px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #243247;
}
main {
  max-width: 680px;
  margin: 0 auto;
}
input,
select,
textarea,
button {
  font: inherit;
}
textarea {
  min-height: 140px;
}
:focus-visible {
  outline: 3px solid #2255bb;
  outline-offset: 3px;
}`,
  },
  {
    id: "pj-web-06",
    module: "web",
    title: "Portfólio simples",
    description:
      "Organize três trabalhos de estudo em um portfólio de uma página. Os projetos podem ser fictícios, desde que suas descrições deixem isso claro.",
    objective:
      "Combinar HTML semântico, navegação interna, cartões e CSS Grid responsivo.",
    requirements: [
      "Criar header com nome em h1 e nav com links para Sobre, Projetos e Contato.",
      "Criar main com as três seções identificadas por ids e títulos h2.",
      "Escrever uma apresentação e uma lista com pelo menos três habilidades em desenvolvimento.",
      "Representar pelo menos três projetos com article, título h3 e descrição do que foi praticado.",
      "Adicionar a cada projeto um link funcional para uma demonstração existente ou para uma seção própria com mais detalhes; não usar href vazio nem apenas #.",
      "Usar display grid e gap na lista de projetos, passando de uma para duas ou mais colunas conforme a largura disponível.",
      "Adicionar contato com dados fictícios ou públicos, rodapé e estilos de foco visíveis nos links.",
    ],
    challenge:
      "Crie uma seção de detalhes para cada projeto e um link Voltar aos projetos. Acrescente um link inicial Pular para o conteúdo, visível ao receber foco.",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Meu portfólio de estudos</title>
</head>
<body>
  <header>
    <!-- Adicione o nome e a navegacao interna. -->
  </header>
  <main id="conteudo">
    <!-- Crie as secoes sobre, projetos e contato. -->
    <!-- Dentro de projetos, use um conteiner com classe projetos. -->
    <!-- Cada trabalho deve ser um article com titulo e descricao. -->
  </main>
  <footer>
    <p>Portfólio de estudos — projetos em desenvolvimento.</p>
  </footer>
</body>
</html>`,
    starterCss: `* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #203047;
  background-color: #f7f9fc;
}
header,
main,
footer {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}
.projetos {
  display: grid;
  gap: 20px;
}
a {
  color: #164fa3;
}
:focus-visible {
  outline: 3px solid #164fa3;
  outline-offset: 3px;
}`,
  },
  {
    id: "pj-web-07",
    module: "web",
    title: "Página inicial de um site",
    description:
      "Planeje a página inicial de um site fictício de aulas abertas. Apresente a proposta, três benefícios e uma chamada para conhecer as atividades.",
    objective:
      "Integrar semântica, flexbox, grid, media queries e acessibilidade em uma página responsiva.",
    requirements: [
      "Criar header com nome do site e nav com links funcionais para seções da página.",
      "Criar em main uma apresentação com h1, descrição da proposta e link Conhecer atividades apontando para uma seção real.",
      "Adicionar uma seção de benefícios com h2 e pelo menos três cartões com título e descrição.",
      "Adicionar uma seção de atividades com informações concretas sobre pelo menos duas aulas fictícias, incluindo tema e público indicado.",
      "Usar flexbox no cabeçalho ou na navegação e grid para organizar os cartões.",
      "Criar uma media query que adapte a grade para uma coluna em telas pequenas, sem rolagem horizontal.",
      "Incluir footer, foco visível nos links e contraste legível; se houver imagens, fornecer alt adequado à função de cada uma.",
    ],
    challenge:
      "Adicione um link Pular para o conteúdo e um bloco de perguntas frequentes usando details e summary, verificando se toda a página continua utilizável apenas pelo teclado.",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Aulas abertas — início</title>
</head>
<body>
  <header class="cabecalho">
    <!-- Acrescente o nome do site e uma navegacao. -->
  </header>
  <main id="conteudo">
    <!-- Crie a apresentacao com h1 e chamada para atividades. -->
    <!-- Crie uma secao de beneficios com classe grade nos cartoes. -->
    <!-- Crie a secao atividades com id para receber o link. -->
  </main>
  <footer>
    <p>Site fictício criado para estudar HTML e CSS.</p>
  </footer>
</body>
</html>`,
    starterCss: `* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #172c42;
  background-color: #ffffff;
}
header,
main,
footer {
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px;
}
.cabecalho {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.grade {
  display: grid;
  gap: 20px;
}
a {
  color: #154e9c;
}
:focus-visible {
  outline: 3px solid #154e9c;
  outline-offset: 3px;
}`,
  },
];
