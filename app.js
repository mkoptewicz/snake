const gameBoard = document.querySelector(".container");
const cells = document.querySelectorAll('.cell')
const snake = [2,1,0]

function createGrid() {
  for (let i=0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
  }
}
createGrid();
