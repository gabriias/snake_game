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
 * a cobrinha basicamente é um array que vai guardar posições 
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

// atributos do canvas
function criarBG() {
    // cor
    context.fillStyle = 'lightgreen';
    // desenho do canvas
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra(){
    for (let posicao = 0; posicao < snake.length; posicao++) {
        context.fillStyle = 'green';
        context.fillRect(snake[posicao].x, snake[posicao].y, box, box);
        
    }
    
}

criarBG();
criarCobra();