const renderGameBoard = function (gridSize) {
  // renders both UI and game array | needed to run only once
  const gameBoardElement = document.querySelector("#board");
  gameBoardElement.innerHTML = ""; // Clear board to prevent duplicates

  // render UI game cells
  for (let cellIndex = 0; cellIndex < gridSize * gridSize; cellIndex++) {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.textContent = "";
    cellElement.dataset.index = cellIndex; // Add index as data attribute
    gameBoardElement.appendChild(cellElement);
  }

  // create and return game state array
  return new Array(gridSize * gridSize).fill("");
};

// Track game state
let isGameActive = true;

const setupPlayerInteraction = function (currentPlayerSymbol, gameBoardArray) {
  // Skip if game is over
  if (!isGameActive) return;

  const allCellElements = document.querySelectorAll(".cell");

  // Remove all existing listeners first to prevent duplicates
  allCellElements.forEach((cellElement) => {
    const clonedCellElement = cellElement.cloneNode(true);
    cellElement.parentNode.replaceChild(clonedCellElement, cellElement);
  });

  // Get fresh cells after replacement
  const freshCellElements = document.querySelectorAll(".cell");

  freshCellElements.forEach((cellElement) => {
    // Skip cells that are already marked
    if (cellElement.textContent === "X" || cellElement.textContent === "O")
      return;

    cellElement.addEventListener(
      "click",
      function handleCellClick() {
        // Prevent clicking on already marked cells
        if (cellElement.textContent !== "" || !isGameActive) return;

        // Update UI
        cellElement.textContent = currentPlayerSymbol;

        // Update game array using the cell's data-index
        const cellPositionIndex = parseInt(cellElement.dataset.index); // new section
        gameBoardArray[cellPositionIndex] = currentPlayerSymbol;

        // Check for winner
        if (checkWinner(gameBoardArray, 3)) {
          alert(`Player ${currentPlayerSymbol} wins!`);
          isGameActive = false;
          return;
        }

        // Check for draw
        if (!gameBoardArray.includes("")) {
          alert("Game is a draw!");
          isGameActive = false;
          return;
        }

        // Switch player
        const nextPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
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

  // Check rows
  for (let i = 0; i < size; i++) {
    if (checkLine(i * size, 1, size)) return true;
  }

  // Check columns
  for (let i = 0; i < size; i++) {
    if (checkLine(i, size, size)) return true;
  }

  // Check diagonals
  if (checkLine(0, size + 1, size)) return true;
  if (checkLine(size - 1, size - 1, size)) return true;

  return false;
};

// Reset game function
const resetGame = () => {
  isGameActive = true;
  const newGameBoardArray = renderGameBoard(3);
  setupPlayerInteraction("O", newGameBoardArray);
};

// Start the game
const initialGameBoardArray = renderGameBoard(3);
setupPlayerInteraction("O", initialGameBoardArray);
