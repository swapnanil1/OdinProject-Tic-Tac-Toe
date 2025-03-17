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
  // Game runner, apply user choice on the ui and on the internal array , tries to find winner on every run , switches user at end , if array full then draw
  if (!isGameActive) return;

  const allCellElements = document.querySelectorAll(".cell");

  allCellElements.forEach((cellElement) => {
    // remove all eventlisteners if exists
    const clonedCellElement = cellElement.cloneNode(true); // CloneNode Does not clone event listeners
    cellElement.parentNode.replaceChild(clonedCellElement, cellElement); // cellElement is replaced by clonedCellEle
  });

  const freshCellElements = document.querySelectorAll(".cell");

  freshCellElements.forEach((cellElement) => {
    if (cellElement.textContent === "X" || cellElement.textContent === "O")
      return;

    cellElement.addEventListener("click", function handleCellClick() {
      if (cellElement.textContent !== "" || !isGameActive) return;

      cellElement.textContent = currentPlayerSymbol;

      const cellPositionIndex = parseInt(cellElement.dataset.index); // Setting the BoardArray(tictactoeboard) fill the spot with X | O
      gameBoardArray[cellPositionIndex] = currentPlayerSymbol;

      if (checkWinner(gameBoardArray, 3)) {
        document.getElementById("winner").textContent = currentPlayerSymbol;
        isGameActive = false;
        return;
      }

      if (!gameBoardArray.includes("")) {
        // ALL cells are filled and nobody wins
        document.getElementById("winner").textContent = "Nobody";
        isGameActive = false;
        return;
      }

      const nextPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
      // Switch Player
      document.querySelector(
        "#current-player"
      ).textContent = `${nextPlayerSymbol}`;
      setupPlayerInteraction(nextPlayerSymbol, gameBoardArray); // Call this function again with nextPlayer Choice
    });
  });
};

const checkWinner = (ticTacToeBoard, size) => {
  // returns true if matching pattern found (Diag,Verti,Horiz).
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

const newGame = document.getElementById("reset-button");
newGame.addEventListener("click", () => {
  location.reload();
});

const initialGameBoardArray = renderGameBoard(3);
setupPlayerInteraction("X", initialGameBoardArray);
