const renderGameBoard = (function () {
  const boardElement = document.querySelector("#board");
  boardElement.innerHTML = "";
  const drawBoardUI = function () {
    for (let cellIndex = 0; cellIndex < 3 * 3; cellIndex++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.index = cellIndex;
      boardElement.appendChild(cellElement);
    }
  };
  const createBoardArr = function () {
    return Array(3 * 3).fill("");
  };
  return { drawBoardUI, createBoardArr };
})();

let isGameActive = true;
let currentPlayerMark = "X";
const gameBoardArray = renderGameBoard.createBoardArr();

const setupPlayerInteraction = function () {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  function handleCellClick(event) {
    if (!isGameActive) return;
    const cellElement = event.target;
    if (cellElement.textContent !== "") return;

    cellElement.textContent = currentPlayerMark;
    const cellIndexOnBoard = parseInt(cellElement.dataset.index);
    gameBoardArray[cellIndexOnBoard] = currentPlayerMark;

    if (checkWinner(gameBoardArray)) {
      // Removed size argument
      document.getElementById("winner").textContent = currentPlayerMark;
      isGameActive = false;
      return;
    }

    if (!gameBoardArray.includes("")) {
      document.getElementById("winner").textContent = "Nobody";
      isGameActive = false;
      return;
    }

    currentPlayerMark = currentPlayerMark === "X" ? "O" : "X";
    document.querySelector("#current-player").textContent = currentPlayerMark;
  }
};

const checkWinner = (board) => {
  const size = 3;
  const checkLine = (start, increment, count) => {
    const firstValue = board[start];
    if (!firstValue) return false;
    for (let i = 1; i < count; i++) {
      if (board[start + increment * i] !== firstValue) return false;
    }
    return true;
  };

  for (let i = 0; i < size; i++) {
    if (checkLine(i * size, 1, size)) return true;
    if (checkLine(i, size, size)) return true;
  }

  if (checkLine(0, size + 1, size)) return true;
  if (checkLine(size - 1, size - 1, size)) return true;

  return false;
};

const newGameButton = document.getElementById("reset-button");
newGameButton.addEventListener("click", () => {
  location.reload();
});

renderGameBoard.drawBoardUI();
setupPlayerInteraction();
document.querySelector("#current-player").textContent = currentPlayerMark;
