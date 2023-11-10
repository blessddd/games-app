"use strict";

let isAndroid = /Android/i.test(navigator.userAgent);
let isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const inactiveGameSection = document.querySelector(".inactive-game");
const startButton = document.querySelector(".start-button");
const gameIntroContainer = document.querySelector(".game-intro-container");
const gameIntro = document.querySelector(".game-intro")
const line = document.querySelector(".line");
startButton.addEventListener("click", () => {
    if(isAndroid || window.innerWidth < 850) {
        startButton.removeAttribute("href");
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
        inactiveGameSection.style.display = "flex";
    } else if(isiOS || window.innerWidth < 850) {
        startButton.removeAttribute("href");
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
        inactiveGameSection.style.display = "flex";
    } else {
        gameIntroContainer.style.display = "none";
        gameIntro.style.display = "none";
    }
});