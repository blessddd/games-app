"use strict";

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const lineColor = document.querySelector(".color");
const width = document.querySelector(".range");
const borrowButton = document.querySelector(".borrow");
const borrowDrawingButton = document.querySelector(".borrow-drawing");
const brushButton = document.querySelector(".brush");
let painting = false, borrow = false, brush = true;
let color;
let lineWidth;
let dx, dy;

const draw = (currentX, currentY) => {
    painting = true;
    ctx.beginPath();
    ctx.moveTo(dx, dy);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    ctx.closePath();

    dx = currentX, dy = currentY;
}

// "mousedown" es un evento que se ejecuta cuando el usuario hace click en el canvas
canvas.addEventListener("mousedown", e => {
    if(borrow && !brush) color = "#fff";
    else color = lineColor.value;
    lineWidth = width.value;
    dx = e.offsetX;
    dy = e.offsetY;
    draw(dx, dy);
});

// "mousemove" es un evento que se ejecuta cuando el usuario mueva el mouse dentro del canvas
canvas.addEventListener("mousemove", e => {
    if(painting) 
        draw(e.offsetX, e.offsetY);
});

// "mouseup" es un evento que se ejecuta cuando el usuario suelta el botón del mouse
canvas.addEventListener("mouseup", () => {
    painting = false;
    ctx.closePath();
});

canvas.addEventListener("mouseenter", (e) => e.target.style.cursor = "pointer");
canvas.addEventListener("mouseleave", (e) => {
    e.target.style.cursor = "default";
    painting = false
});

brushButton.addEventListener("click", () => brush = true);
borrowButton.addEventListener("click", () => {
    borrow == true ? borrow = false: borrow = true;
    brush = false;
});
borrowDrawingButton.addEventListener("click", () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})