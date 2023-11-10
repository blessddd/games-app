"use strict";

let isAndroid = /Android/i.test(navigator.userAgent);
let isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const inactiveGameSection = document.querySelector(".inactive-game");
const startButton = document.querySelector(".start-button");
const gameIntroContainer = document.querySelector(".game-intro-container");
const gameIntro = document.querySelector(".game-intro");
const register = document.querySelector(".register");
const registerTitle = document.querySelector(".title");
const registerBtn = document.querySelector(".send-button");
const usernameInput = document.querySelector(".username-input");
const line = document.querySelector(".line");
const scoreLeadeboard = document.querySelector(".score-leadeboard");
const gameSection = document.querySelector(".tic-tac-toe-section");
const gameContainer = document.querySelector(".tic-tac-toe-container");
const gameStatus = document.querySelector(".game-status");
const resetButton = document.querySelector(".reset-button");
const player1 = document.querySelector(".username-1");
const player1Score = document.querySelector(".username1-score");
const player2 = document.querySelector(".username-2")
const player2Score = document.querySelector(".username2-score");
const cells = document.querySelectorAll(".cell");
let username1, username2;
let roundCounter1 = 0, roundCounter2 = 0;
let gameEnd = false;
let currentPlayer = 'X';
let win = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let game = ["", "", "", "","", "", "", "", ""];

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
        registerTitle.textContent = "Ingresa tu nombre Jugador 1";
    }
});

registerBtn.addEventListener("click", () => {
    if(registerTitle.textContent == "Ingresa tu nombre Jugador 1") {
        username1 = usernameInput.value;
        if(username1.trim() == "") username1 = "Jugador 1";
        if(username1.length > 10) username1 = username1.substring(0, 9) + "...";
        registerTitle.textContent = "Ingresa tu nombre Jugador 2";
        usernameInput.value = "";
    } else {
        username2 = usernameInput.value;
        if(username2.trim() == "") username2 = "Jugador 2";
        if(username2.length > 10) username2 = username2.substring(0, 9) + "...";
        register.style.display = "none";
        line.style.display = "block";
        gameSection.style.display = "flex";
        scoreLeadeboard.style.display = "flex";
        gameContainer.style.display = "grid";
        player1.textContent = username1;
        player2.textContent = username2;
        player1Score.textContent = roundCounter1;
        player2Score.textContent = roundCounter2;
    }
});

const startGame = () => {
    cells.forEach(cell => cell.textContent = "");
    cells.forEach(cell => cell.addEventListener("click", () => handleClick(cell)));
}

const handleClick = cell => {
    const index = cell.getAttribute("index");
    if(!gameEnd && game[index] == "") {
        drawPiece(cell, index);
        checkResult();
        currentPlayer = currentPlayer == 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
    }
}

const drawPiece = (cell, index) => {
    game[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

const checkResult = () => {
    let won = false;
    for(let i = 0; i < parseInt(win.length); i++) {
        let combination = win[i];
        const cell1 = game[combination[0]], 
            cell2 = game[combination[1]],
            cell3 = game[combination[2]];
        if(cell1 == "" || cell2 == "" || cell3 == "") continue;
        else if(cell1 === cell2 && cell2 === cell3) {
            won = true;
            break;
        } 
    }
    if(won) {
        if(currentPlayer == 'X') { 
            roundCounter1++;
            player1Score.textContent = roundCounter1;
            gameStatus.textContent = `${username1} ganó`;
        } else {
            roundCounter2++;
            player2Score.textContent = roundCounter2;
            gameStatus.textContent = `${username2} ganó`;
        }
        gameStatus.textContent = "Juego Terminado";
        gameEnd = true;
    } else if(!game.includes("")) {
        gameStatus.textContent = "Empate";
    } else
        currentPlayer == 'X' ? gameStatus.textContent = `Turno de ${username1}` : gameStatus.textContent = `Turno de ${username2}`;

    setTimeout(() => {
        if(gameEnd) 
            alert(`${currentPlayer == 'X' ? username2 : username1} ganó`);
        else if(!gameEnd && !game.includes(""))
            alert("Empate");
    }, 100);
}

const restartGame = () => {
    currentPlayer = 'X';
    gameStatus.textContent = "Haz clic para iniciar el juego";
    gameEnd = false;
    game = ["", "", "", "","", "", "", "", ""];
    startGame();
}

startGame();
resetButton.addEventListener("click", () => restartGame());