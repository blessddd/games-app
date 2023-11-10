"use strict";


let isAndroid = /Android/i.test(navigator.userAgent);
let isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const startButton = document.querySelector(".start-button");
const inactiveGameSection = document.querySelector(".inactive-game");
const gameIntroContainer = document.querySelector(".game-intro-container");
const gameIntro = document.querySelector(".game-intro")
const line = document.querySelector(".line");
const register = document.querySelector(".register");
const registerBtn = document.querySelector(".send-button");
const usernameInput = document.querySelector(".username-input");
const user = document.querySelector(".user");
const snakeGameContainer = document.querySelector(".snake-game__section");
const canvas = document.querySelector(".snake-game");
const ctx = canvas.getContext("2d");
const score = document.querySelector(".score");
const maxScore = document.querySelector(".max-score");
const resetBtn = document.querySelector(".reset-button");
const pauseBtn = document.querySelector(".pause-button");
const gameWidth = canvas.width, gameHeight = canvas.height;
const gameBackground = "#64DF38";
const foodColor = "#f00";
const snakeColor = "#0F3"; // "#0F5" || "#0F4" || "#0F3"
const boxSize = 25;
let username = "";
let running = false, gameEnd = false, gamePause = false, showGamePause = false;
let dx = boxSize, dy = 0;
let foodX, foodY;
let userScore = 0, userMaxScore = 0;
let snake = [
    {x:boxSize * 2, y:gameHeight/2},
    {x:boxSize, y:gameHeight/2},
    {x:0, y:gameHeight/2}
];


startButton.addEventListener("click", () => {
    if(isAndroid || window.innerWidth < 850) {
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
        inactiveGameSection.style.display = "flex";
    } else if(isiOS || window.innerWidth < 850) {
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
        inactiveGameSection.style.display = "flex";
    } else {
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
        register.style.display = "flex";
    }
});

const clearCanvas = () => {
    ctx.fillStyle = gameBackground;
    ctx.fillRect(0,0,gameWidth, gameHeight);
}
const randomCoord = (min, max) => {
    return Math.round((Math.random() * (max - min)) / boxSize) * boxSize;
}

const createFood = () => {
    foodX = randomCoord(0, gameWidth - boxSize);
    foodY = randomCoord(0, gameHeight - boxSize);
    snake.forEach(body => {
        if(body.x == foodX && body.y == foodY){
            foodX = randomCoord(0, gameWidth - boxSize);
            foodY = randomCoord(0, gameHeight - boxSize);
        }
    });
}

const drawFood = () => {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, boxSize, boxSize);
}

const drawSnake = () => {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = "#000";
    snake.forEach(body => {
        ctx.fillRect(body.x, body.y, boxSize, boxSize);
        ctx.strokeRect(body.x, body.y, boxSize, boxSize); 
    });
}

// 87 = UP
// 83 = DOWN
// 65 = LEFT
// 68 = RIGTH

// ARROW DIRECTION
// 38 = UP
// 40 = DOWN
// 37 = LEFT
// 39 = RIGHT

let nextDirection = null;

const changeMove = e => {
    running == true ? e.preventDefault() : "";
    const key = e.keyCode;
    const alternativeDirections = {
        UP : 87,
        DOWN : 83,
        LEFT : 65,
        RIGHT : 68
    };
    const arrowDirections = {
        UP : 38,
        DOWN : 40,
        LEFT : 37,
        RIGHT : 39
    };
    switch(key){
        case alternativeDirections.UP: // UP (W)
            if(dy !== boxSize && !gameEnd)
                nextDirection = { dx: 0, dy: -boxSize };
            break;
        case alternativeDirections.DOWN: // DOWN (S)
            if(dy !== -boxSize && !gameEnd)
                nextDirection = { dx: 0, dy: boxSize };
            break;
        case alternativeDirections.LEFT: // LEFT (A)
            if(dx !== boxSize && !gameEnd)
                nextDirection = { dx: -boxSize, dy: 0 };
            break;
        case alternativeDirections.RIGHT: // RIGHT (D)
            if(dx !== -boxSize && !gameEnd)
                nextDirection = { dx: boxSize, dy: 0 };
            break;
        case arrowDirections.UP: // UP (Arrow)
            if(dy !== boxSize && !gameEnd)
                nextDirection = { dx: 0, dy: -boxSize };
            break;
        case arrowDirections.DOWN: // DOWN (Arrow)
            if(dy !== -boxSize && !gameEnd)
                nextDirection = { dx: 0, dy: boxSize };
            break;
        case arrowDirections.LEFT: // LEFT (Arrow)
            if(dx !== boxSize && !gameEnd)
                nextDirection = { dx: -boxSize, dy: 0 };
            break;
        case arrowDirections.RIGHT: // RIGHT (Arrow)
            if(dx !== -boxSize && !gameEnd)
                nextDirection = { dx: boxSize, dy: 0 };
            break;
    }
}


const moveSnake = () => {
    if(nextDirection){
        dx = nextDirection.dx;
        dy = nextDirection.dy;
        nextDirection = null;
    }

    const box = {
        newBox: {
            x: snake[0].x + dx,
            y: snake[0].y + dy
        }
    };
    snake.unshift(box.newBox);
    if(snake[0].x  == foodX && snake[0].y == foodY){
        userScore++;
        userMaxScore = Math.max(userScore, userMaxScore);
        score.textContent = `Puntaje: ${userScore}`;
        maxScore.textContent = `Máximo Puntaje: ${userMaxScore}`;
        createFood();
    }
    else snake.pop();
}

const showGameOver = () => {
    ctx.font = 'bold 100px sans-serif';
    ctx.fontWeigth = "700";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.strokeText("¡Game Over!", gameWidth / 2, gameHeight / 2);    
    ctx.fillText("¡Game Over!", gameWidth / 2, gameHeight / 2);
}

const gameOver = () => {
    if(snake[0].x < 0 || snake[0].x >= gameWidth)
        running = false, gameEnd = true;
    else if(snake[0].y < 0 || snake[0].y >= gameHeight)
        running = false, gameEnd = true;

    for(let i = 1; i < snake.length; i++)
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            running = false, gameEnd = true;
}

const update = () => {
    if(running && !gameEnd && !gamePause) {
        setTimeout(() => {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            gameOver();
            update();
            if(showGamePause) {
                gamePause = true;
                ctx.font = 'bold 100px sans-serif';
                ctx.fontWeigth = "700";
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                ctx.strokeText("Pausa", gameWidth / 2, gameHeight / 2);    
                ctx.fillText("Pausa", gameWidth / 2, gameHeight / 2);           
            }
        }, 125);
    } else if(!running && gameEnd && !gamePause)
        showGameOver();
}

const gameStart = () => {
    if(gamePause) {
        gamePause = false, showGamePause = false;
        // Si el juego está en pausa lo reanudo sin crear ninguna manzana
        update();
    } else {
        running = true, gameEnd = false;
        createFood();
        drawFood();
        update();
    }
}

const restartGame = () => {
    score.textContent = `Puntaje: 0`;
    userScore = 0;
    dx = boxSize, dy = 0;
    snake = [
        {x:boxSize * 2, y: gameHeight/2},
        {x:boxSize, y: gameHeight/2},
        {x:0, y: gameHeight/2}
    ];
    setTimeout(gameStart(), 1500);
}

registerBtn.addEventListener("click", () => {
    register.style.display = "none";
    line.style.display = "block";
    snakeGameContainer.style.display = "flex";
    username = usernameInput.value;
    if(username.trim() != "")
        user.textContent = `Jugador: ${username}`;
    else
        user.textContent = `Jugador: Jugador 1`;
    ctx.fillStyle = gameBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    gameStart();
});

addEventListener("keydown", e => changeMove(e));
resetBtn.addEventListener("click", e => {
    e.preventDefault();
    let restart;
    running ? alert(`El juego está ejecutandose todavía, necesitas perder para poder reiniciar el juego`) : restart = confirm("¿Deseas volver a jugar?");
    if(restart) 
        restartGame();
});
pauseBtn.addEventListener("click", () => {
    if(!gameEnd && running && !gamePause)
        gamePause = true, showGamePause = true;
    else if(!gameEnd && running && gamePause)
        gameStart();
});