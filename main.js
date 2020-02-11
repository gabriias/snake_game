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
};

// posição em qua a cobrinha começará a se mover
let direction = 'right';

/**
 * posição da comida da cobrinha
 * essa posição é gerada aleatoriamente porém, respeitando os limites do canvas
 * (por isso *box no fim)
 */
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

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
 * função que gera as comidas
 */
function criarComida() {
    context.fillStyle = 'red';
    context.fillRect(comida.x, comida.y, box, box);
}

/**
 * evento para movimentar a cobrinha
 * quando a gente aperta uma tecla, o 'addEventListener' chama o 'update' e passa 
 * como evento a tecla pressionada
 * */
document.addEventListener('keydown', update);

/**
 * quando chega aqui a gente já tem a tecla pressionada (graças ao 'addEventListener') 
 * comparamos o código da tecla para definir em qual lado a cobrinha vai
 * (link com a lista dos keyCodes: https://odesenvolvedor.com.br/tabela-de-key-codes-para-javascript_1464.html) 
 */
function update (event) {
    /**
     * tem essa validação da direção atual da cobrinha para que ela não possa ir na direção contrária da posição 
     */
    if (event.keyCode == 37 && direction != 'right'){
        direction = 'left';
    }
    if (event.keyCode == 38 && direction != 'down') {
        direction = 'up'
    }
    if (event.keyCode == 39 && direction != 'left') {
        direction = 'right'
    }
    if (event.keyCode == 40 && direction != 'up') {
        direction = 'down'
    }

}

/**
 * assim que é iniciado, chama as demais funções
 */
function iniciarJogo() {

    /**
     * para que a cobrinha se mantenha somente dentro do canvas, ao chegar no fim do plano cartesiano do canvas,
     * redirecionamos para o início (em todas as direções)
     */
    if (snake[0].x > 15 * box && direction == 'right') {
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == 'left') {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15 * box && direction == 'down') {
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == 'up') {
        snake[0].y = 16 * box;
    } 

    criarBG();
    criarCobra();
    criarComida();

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
     * adiciono a nova cabeça da cobrinha no início do array
     * (o unshift sempre adiciona no início) 
     **/
    snake.unshift(newHead);
}
// a cada 100ms, o canvas renova
let jogo = setInterval(iniciarJogo, 100);