const gameBoard = document.querySelector(".container");
const startBtn = document.querySelector(".start");
const scoreElement = document.querySelector(".score");
let cells = [];
let snake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let speedRatio = 0.95;
let time = 500;
let intervalId = 0;
let score = 0;
createGrid();
function init() {
  snake.forEach(index => cells[index].classList.remove("snake"));
  clearInterval(intervalId);
  snake = [2, 1, 0];
  direction = 1;
  time = 300;
  score = 0;
  scoreElement.textContent = score;
  cells[appleIndex].classList.remove("apple");
  snake.forEach(index => cells[index].classList.add("snake"));
  createApple();
  intervalId = setInterval(moveSnake, time);
}
function triggerScoreAnimation() {
  scoreElement.removeEventListener("transitionend", onTransitionEnd);
  scoreElement.addEventListener("transitionend", onTransitionEnd);
  scoreElement.classList.remove("fade");
}
function onTransitionEnd() {
  scoreElement.textContent = score;
  scoreElement.classList.add("fade");
}
function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
    cells.push(cell);
  }
}

function createApple() {
  do {
    appleIndex = Math.floor(Math.random() * 100);
  } while (cells[appleIndex].classList.contains("snake"));
  cells[appleIndex].classList.add("apple");
}

function moveSnake() {
  if (
    (direction === 1 && snake[0] % width === 9) ||
    (direction === -1 && snake[0] % width === 0) ||
    (direction === width && snake[0] + width >= 100) ||
    (direction === -width && snake[0] - width < 0) ||
    cells[snake[0] + direction].classList.contains("snake")
  )
    return clearInterval(intervalId);

  const snakeTail = snake.pop();
  snake.unshift(snake[0] + direction);
  cells[snakeTail].classList.remove("snake");

  if (cells[snake[0]].classList.contains("apple")) {
    score++;
    triggerScoreAnimation();
    cells[snake[0]].classList.remove("apple");
    cells[snakeTail].classList.add("snake");
    snake.push(snakeTail);
    createApple();
    clearInterval(intervalId);
    time *= speedRatio;
    intervalId = setInterval(moveSnake, time);
  }
  cells[snake[0]].classList.add("snake");
}

function controlSnake(e) {
  if (e.key === "ArrowRight") direction = 1;
  else if (e.key === "ArrowDown") direction = width;
  else if (e.key === "ArrowLeft") direction = -1;
  else if (e.key === "ArrowUp") direction = -width;
}

document.addEventListener("keydown", controlSnake);
startBtn.addEventListener("click", init);
