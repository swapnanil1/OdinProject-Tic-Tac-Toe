const renderGameBoard = (function () {
  // Module for rendering the game board UI
  const boardUI = document.querySelector("#board");
  boardUI.innerHTML = "";
  const drawBoard = function () {
    // Draws the board in the DOM
    if (boardUI.innerHTML === "") {
      for (let index = 0; index < 3 * 3; index++) {
        // Creates 9 cells
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = index;
        boardUI.appendChild(cell);
      }
    }
  };
  const createBoardArray = function () {
    // Creates the array representing the board state
    return Array(3 * 3).fill("");
  };
  return { drawBoard, createBoardArray };
})();

const runGame = function () {
  // Main function to run the game
  let gameRunning = true;
  let mark = "X";
  let boardData = renderGameBoard.createBoardArray();

  document.getElementById("board").innerHTML = "";
  renderGameBoard.drawBoard();

  document.querySelector("#current-player").textContent = mark;

  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick); // Add click handler to each cell
  });

  function handleCellClick(event) {
    // Handles a cell click event
    if (!gameRunning) return;
    const clickedCell = event.target;
    if (clickedCell.textContent !== "") return; // Prevent overwriting filled cell

    clickedCell.textContent = mark;
    const cellIndex = parseInt(clickedCell.dataset.index);
    boardData[cellIndex] = mark; // Update game board data

    if (checkWinner(boardData)) {
      // Check for winner
      document.getElementById("winner").textContent = mark;
      gameRunning = false;
      return;
    }

    if (!boardData.includes("")) {
      // Check for draw
      document.getElementById("winner").textContent = "Nobody";
      gameRunning = false;
      return;
    }

    mark = mark === "X" ? "O" : "X"; // Switch player turn
    document.querySelector("#current-player").textContent = mark;
  }
};

const checkWinner = (board) => {
  // Checks if there is a winner on the board
  const size = 3;
  const checkLine = (start, increment, count) => {
    // Helper function to check a line (row, col, diag)
    const first = board[start];
    if (!first) return false;
    for (let i = 1; i < count; i++) {
      if (board[start + increment * i] !== first) return false;
    }
    return true;
  };

  for (let i = 0; i < size; i++) {
    // Check rows and columns
    if (checkLine(i * size, 1, size)) return true; // Check row
    if (checkLine(i, size, size)) return true; // Check column
  }

  if (checkLine(0, size + 1, size)) return true; // Check diagonal top-left to bottom-right
  if (checkLine(size - 1, size - 1, size)) return true; // Check diagonal top-right to bottom-left

  return false; // No winner found
};

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  // Reset button handler
  document.getElementById("winner").textContent = "";
  runGame(); // Start a new game
});
runGame(); // Start the game on page load
