const gameBoard = document.querySelector(".container");
const startBtn = document.querySelector(".start");
let cells = [];
let snake = [2, 1, 0];
let direction = 1;
let snakeTail = 0;
const width = 10;


function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
    cells.push(cell);
  }
}
createGrid();
snake.forEach(index => cells[index].classList.add("snake"));
let intervalId= setInterval(moveSnake, 1000);
function moveSnake() {
  // if (direction === 1 && snake[0] % 9 === 0) return;
  snake.unshift(snake[0] + direction);
  cells[snake[0]].classList.add("snake");
  snakeTail = snake.pop();
  cells[snakeTail].classList.remove("snake");
}
function controlSnake(e) {
 if(e.key==="ArrowRight") direction = 1
 else if(e.key==="ArrowDown") direction = width
 else if(e.key==="ArrowLeft") direction = -1
 else if(e.key==="ArrowUp") direction = -width
}
document.addEventListener("keydown", controlSnake)