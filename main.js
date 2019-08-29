// pego o canvas disposto no html
let canvas = document.getElementById('snake');
/**
 * um contexto serve para renderizar tudo que será exibido num elemento (no nosso caso, no canvas)
 * para essa aplicação as animações serão em 2d, então esse é o nosso contexto
 **/
let context = canvas.getContext('2d');

/**
 * o "tabuleiro" do jogo é um monte de quadrados
 * definimos um tamanho e no desenho do contexto dizemos quantos quadrados (qual será o tamanho)
 * terá o tabuleiro
 */
let box = 32;

/**
 * a cobrinha basicamente é um array de coordenadas que vai guardar posições 
 * (a gente adiciona um elemento e remove o último)
 * (assim a gente consegue visualizar a posição do elemento)
 */
let snake = [];

/**
 * atribuindo uma posição inicial à cobrinha
 * (aqui está 8 para que ela inicie no centro do canvas)
 */
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
// posição em qua a cobrinha começará a se mover
let direction = 'right'

// atributos do canvas
function criarBG() {
    // cor
    context.fillStyle = 'lightgreen';
    // desenho do canvas
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra() {
    for (let posicao = 0; posicao < snake.length; posicao++) {
        context.fillStyle = 'green';
        context.fillRect(snake[posicao].x, snake[posicao].y, box, box);
        
    }
    
}
/**
 * assim que é iniciado, chama as demais funções
 */
function iniciarJogo() {
    criarBG();
    criarCobra();

    // criamos a posição da cobrinha que irá definir o ponto de partida para os movimentos
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // movimento da cobrinha
    if (direction == 'right') {
        snakeX += box;
    }
    if (direction == 'left') {
        snakeX -= box;
    }
    if (direction == 'up') {
        snakeY -= box;
    }
    if (direction == 'down') {
        snakeY += box;
    }

    // removendo a última posição da cobrinha 
    snake.pop();
    
    // adicionando a nova cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    /**
     * diciono a nova cabeça da cobrinha no início do array
     * (o unshift sempre adiciona no início) 
     **/
    snake.unshift(newHead);
}
// a cada 100ms, o canvas renova
let jogo = setInterval(iniciarJogo, 100);