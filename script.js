// Vertical Row Matching Test
// const ticTacToeBoard = ["X", 2, 3, "X", 5, 6, "X", 8, 9];
// Horizontal Column Matching Test
// const ticTacToeBoard = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
// Diagonal top to bottom Matching Test
// const ticTacToeBoard = ["X", 2, 3, 4, "X", 6, 7, 8, "X"];
// Diagonal Bottom to top Matching Test
// const ticTacToeBoard = [1, 2, "X", 4, "X", 6, "X", 8, 9];

const checkWinner = (board, size) => {
  const checkLine = (start, increment, count) => {
    const firstValue = board[start];
    if (!firstValue) return false;

    for (let i = 1; i < count; i++) {
      if (board[start + increment * i] !== firstValue) return false;
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

console.log(checkWinner(ticTacToeBoard, 3));
