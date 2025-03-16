const renderGameBoard = function (gridSize) {
  const gameBoardElement = document.querySelector("#board");
  gameBoardElement.innerHTML = "";

  for (let cellIndex = 0; cellIndex < gridSize * gridSize; cellIndex++) {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.textContent = "";
    cellElement.dataset.index = cellIndex;
    gameBoardElement.appendChild(cellElement);
  }

  return new Array(gridSize * gridSize).fill("");
};

let isGameActive = true;

const setupPlayerInteraction = function (currentPlayerSymbol, gameBoardArray) {
  if (!isGameActive) return;

  const allCellElements = document.querySelectorAll(".cell");

  allCellElements.forEach((cellElement) => {
    const clonedCellElement = cellElement.cloneNode(true);
    cellElement.parentNode.replaceChild(clonedCellElement, cellElement);
  });

  const freshCellElements = document.querySelectorAll(".cell");

  freshCellElements.forEach((cellElement) => {
    if (cellElement.textContent === "X" || cellElement.textContent === "O")
      return;

    cellElement.addEventListener(
      "click",
      function handleCellClick() {
        if (cellElement.textContent !== "" || !isGameActive) return;

        cellElement.textContent = currentPlayerSymbol;

        const cellPositionIndex = parseInt(cellElement.dataset.index);
        gameBoardArray[cellPositionIndex] = currentPlayerSymbol;

        if (checkWinner(gameBoardArray, 3)) {
          document.getElementById("winner").textContent = currentPlayerSymbol;
          isGameActive = false;
          return;
        }

        if (!gameBoardArray.includes("")) {
          document.getElementById("winner").textContent = "None";
          isGameActive = false;
          return;
        }

        const nextPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
        document.querySelector(
          "#current-player"
        ).textContent = `${nextPlayerSymbol}`;
        setupPlayerInteraction(nextPlayerSymbol, gameBoardArray);
      },
      { once: true }
    );
  });
};

const checkWinner = (ticTacToeBoard, size) => {
  const checkLine = (start, increment, count) => {
    const firstValue = ticTacToeBoard[start];
    if (!firstValue) return false;

    for (let i = 1; i < count; i++) {
      if (ticTacToeBoard[start + increment * i] !== firstValue) return false;
    }
    return true;
  };

  for (let i = 0; i < size; i++) {
    if (checkLine(i * size, 1, size)) return true;
  }

  for (let i = 0; i < size; i++) {
    if (checkLine(i, size, size)) return true;
  }

  if (checkLine(0, size + 1, size)) return true;
  if (checkLine(size - 1, size - 1, size)) return true;

  return false;
};

const resetGame = () => {
  isGameActive = true;
  const newGameBoardArray = renderGameBoard(3);
  setupPlayerInteraction("X", newGameBoardArray);
};

const initialGameBoardArray = renderGameBoard(3);
setupPlayerInteraction("X", initialGameBoardArray);

const newGame = document.getElementById("reset-button");
newGame.addEventListener("click", () => {
  location.reload();
});
