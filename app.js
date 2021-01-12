const gameBoard = document.querySelector(".container");
const startBtn = document.querySelector(".start");
let cells = [];
let snake = [2, 1, 0];
let direction = 1;
let snakeTail = 0;
const width = 10;
let speedRatio = 0.9;
let speed = 300;

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
    cells.push(cell);
  }
}

function createApple() {
  const randomNumber = Math.floor(Math.random() * 100);
  do {
    cells[randomNumber].classList.add("apple");
  } while (cells[randomNumber].classList.contains("snake"));
}

let intervalId = setInterval(moveSnake, speed);
function moveSnake() {
  if (
    (direction === 1 && snake[0] % width === 9) ||
    (direction === -1 && snake[0] % width === 0) ||
    (direction === width && snake[0] + width >= 100) ||
    (direction === -width && snake[0] - width < 0) ||
    cells[snake[0] + direction].classList.contains("snake")
  )
    return clearInterval(intervalId);
  else {
    snake.unshift(snake[0] + direction);
    cells[snake[0]].classList.add("snake");
    snakeTail = snake.pop();
    cells[snakeTail].classList.remove("snake");
  }
}
function controlSnake(e) {
  if (e.key === "ArrowRight") direction = 1;
  else if (e.key === "ArrowDown") direction = width;
  else if (e.key === "ArrowLeft") direction = -1;
  else if (e.key === "ArrowUp") direction = -width;
}
document.addEventListener("keydown", controlSnake);
createGrid();
snake.forEach(index => cells[index].classList.add("snake"));
createApple();
