const gameBoard = document.querySelector(".container");
const startBtn = document.querySelector(".start");
const scoreElement = document.querySelector(".score");
let cells = [];
let snake = [2, 1, 0];
let direction = 1;
const width = 15;
let appleIndex = 0;
let speedRatio = 0.95;
let time;
let intervalId = 0;
let score = 0;
createGrid();
function init() {
  snake.forEach(index => cells[index].classList.remove("snake"));
  clearInterval(intervalId);
  snake = [2, 1, 0];
  direction = 1;
  time = 100;
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
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
  scoreElement.textContent = `Score: ${score}`;
  scoreElement.classList.add("fade");
}
function createGrid() {
  document.documentElement.style.setProperty("--size", width * 30 + "px");
  for (let i = 0; i < width * width; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
    cells.push(cell);
  }
}

function createApple() {
  do {
    appleIndex = Math.floor(Math.random() * (width * width));
  } while (cells[appleIndex].classList.contains("snake"));
  cells[appleIndex].classList.add("apple");
}

function moveSnake() {
  if (
    (direction === 1 && snake[0] % width === width - 1) ||
    (direction === -1 && snake[0] % width === 0) ||
    (direction === width && snake[0] + width >= width * width) ||
    (direction === -width && snake[0] - width < 0) ||
    cells[snake[0] + direction].classList.contains("snake")
  )
    return clearInterval(intervalId);

  const snakeTail = snake.pop();
  snake.unshift(snake[0] + direction);
  cells[snakeTail].classList.remove("snake");

  if (cells[snake[0]].classList.contains("apple")) {
    score++;
    cells[snake[0]].classList.remove("apple");
    cells[snakeTail].classList.add("snake");
    createApple();
    snake.push(snakeTail);
    clearInterval(intervalId);
    // time < 100 ? time : (time *= speedRatio);
    time *= speedRatio;
    intervalId = setInterval(moveSnake, time);
    triggerScoreAnimation();
    console.log(time);
  }
  cells[snake[0]].classList.add("snake");
}

function controlSnake(e) {
  if (e.key === "ArrowRight") direction = 1;
  else if (e.key === "ArrowDown") direction = width;
  else if (e.key === "ArrowLeft") direction = -1;
  else if (e.key === "ArrowUp") direction = -width;
}
function enterHandler(e) {
  if (e.key === "Enter") init();
}

document.addEventListener("keydown", controlSnake);
startBtn.addEventListener("click", init);
document.addEventListener("keydown", enterHandler);
