"use strict";

let isAndroid = /Android/i.test(navigator.userAgent);
let isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const inactiveGameSection = document.querySelector(".inactive-game");
const startButton = document.querySelector(".start-button");
const sendButton = document.querySelector(".send-button");
const keepPlayingButton = document.querySelector(".keep-playing");
const nameInput = document.querySelector(".username-input");
const subtitleMessage = document.querySelector(".game__message");
const rockImg = document.querySelector(".piedraImg");
const paperImg = document.querySelector(".papelImg");
const scissorsImg = document.querySelector(".tijeraImg");
const rockButton = document.querySelector(".rock-button");
const paperButton = document.querySelector(".paper-button");
const scissorsButton = document.querySelector(".scissors-button");
const registerSection = document.querySelector(".register");
const gameIntroContainer = document.querySelector(".game-intro-container");
const gameIntro = document.querySelector(".game-intro");
const gameSelection = document.querySelector(".game-selection-container");
const gameSection = document.querySelector(".result-section");
const line = document.querySelector(".line");
const imgUserSelection = document.querySelector(".user-selection");
const imgCpuSelection = document.querySelector(".cpu-selection");
const usernameTitle = document.querySelector(".username");
const resultMessage = document.querySelector(".result");
let userSelection;
let cpuSelection;

const elementsImg = [
    "../img/piedra-papel-tijera/piedra.jpg",
    "../img/piedra-papel-tijera/papel.jpg",
    "../img/piedra-papel-tijera/tijera.png"
];

startButton.addEventListener("click", () => {
    if(isAndroid || window.innerWidth < 920) {
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
        inactiveGameSection.style.display = "flex";
    } else if(isiOS || window.innerWidth < 920) {
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
        inactiveGameSection.style.display = "flex";
    } else {
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
        registerSection.style.display = "flex";
    }
});

const getNumberRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
}

let username = "";
sendButton.addEventListener("click", (e) => {
    username = nameInput.value;
    username.trim();
    if(username == "")
        username = "Jugador 1";
    else
        username = nameInput.value;
    subtitleMessage.textContent = `Elige una opción ${username}`;

    e.preventDefault();
    registerSection.style.display = "none";
    gameSelection.style.display = "flex";
    gameSelection.style.justifyContent = "center";
    line.style.display = "block";
});

const checkResult = (userSelection, cpuSelection) => {
    if(userSelection == cpuSelection){
        alert(`Empate, nadie gana`);
        resultMessage.textContent = `Empate, nadie gana`;
    } else if(userSelection == 0 && cpuSelection == 1){
        alert(`Perdiste ${username}`);
        resultMessage.textContent = `Perdiste ${username}`;
        resultMessage.classList.add("lose");
    } else if(userSelection == 1 && cpuSelection == 0){
        alert(`¡¡Ganaste ${username}!!`);
        resultMessage.textContent = `¡¡Ganaste ${username}!!`;
        resultMessage.classList.add("win");
    } else if(userSelection == 2 && cpuSelection == 1){
        alert(`¡¡Ganaste ${username}!!`);
        resultMessage.textContent = `¡¡Ganaste ${username}!!`;
        resultMessage.classList.add("win");
    } else if(userSelection == 1 && cpuSelection == 2){
        alert(`Perdiste ${username}`);
        resultMessage.textContent = `Perdiste ${username}`;
        resultMessage.classList.add("lose");
    } else if(userSelection == 0 && cpuSelection == 2){
        alert(`¡¡Ganaste ${username}!!`);
        resultMessage.textContent = `¡¡Ganaste ${username}!!`;
        resultMessage.classList.add("win");
    } else if(userSelection == 2 && cpuSelection == 0){
        alert(`Perdiste ${username}`);
        resultMessage.textContent = `Perdiste ${username}`;
        resultMessage.classList.add("lose");
    }
}

const handleSelection = num =>{
    userSelection = num;
    cpuSelection = getNumberRandom(0, 3);
    imgUserSelection.src = elementsImg[userSelection];
    imgCpuSelection.src = elementsImg[cpuSelection];
    usernameTitle.textContent = username;
    gameSelection.style.display = "none";
    gameSection.style.animation = "aparecer 0.4s forwards";
    gameSection.style.display = "flex";
    checkResult(userSelection, cpuSelection);
}

rockImg.addEventListener("click", () => handleSelection(0));
paperImg.addEventListener("click", () => handleSelection(1));
scissorsImg.addEventListener("click", () =>handleSelection(2));
rockButton.addEventListener("click", () => handleSelection(0));
paperButton.addEventListener("click", () => handleSelection(1));
scissorsButton.addEventListener("click", () => handleSelection(2));

keepPlayingButton.addEventListener("click", (e) => {
    e.preventDefault();
    gameSection.style.display = "none";
    gameSelection.style.animation = "aparecer 0.8s forwards";
    gameSelection.style.display = "flex";
    gameSelection.style.justifyContent = "center";
    resultMessage.classList.contains("lose") ? resultMessage.classList.remove("lose") : resultMessage.classList.remove("win");
});