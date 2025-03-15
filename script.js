// Horizantal Row Matching Test
// const ticTacToeBoard = ["X", 2, 3, "X", 5, 6, "X", 8, 9];
// Vertical Column Matching Test
// const ticTacToeBoard = ["X", "X", "X", 4, 5, 6, 7, 8, 9];
// Diagonal top to bottom Matching Test
const ticTacToeBoard = ["X", 2, 3, 4, "X", 6, 7, 8, "X"];
// Diagonal Bottom to top Matching Test
// const ticTacToeBoard = [1, 2, "X", 4, "X", 6, "X", 8, 9];

const checkDiagonalwin = function (gridSize) {
  const topDiagonal_index = 0;
  const bottomDiagonal_index = gridSize * (gridSize - 1);
  const topToBottom_increment = gridSize + 1;
  const bottomToTop_decrement = gridSize - 1;
  let isDiagWin = false;
  for (
    let currentTopToBottomCell_index = 0;
    currentTopToBottomCell_index < gridSize * gridSize;
    currentTopToBottomCell_index += topToBottom_increment
  ) {
    const topDiagonal_value = ticTacToeBoard[topDiagonal_index];
    const currentDiagonal_value = ticTacToeBoard[currentTopToBottomCell_index];

    isDiagWin = topDiagonal_value === currentDiagonal_value;
    if (!isDiagWin) break;
  }
  if (!isDiagWin) {
    for (
      let currentBottomToTopCell_index = bottomDiagonal_index;
      currentBottomToTopCell_index > gridSize - 1;
      currentBottomToTopCell_index -= bottomToTop_decrement
    ) {
      const bottomDiagonal_value = ticTacToeBoard[bottomDiagonal_index];
      const currentDiagonal_value =
        ticTacToeBoard[currentBottomToTopCell_index];

      isDiagWin = bottomDiagonal_value === currentDiagonal_value;
      if (!isDiagWin) break;
    }
  }
  isDiagWin
    ? console.log(
        `The match is won diagonally by player using ${ticTacToeBoard[topDiagonal_index]}`
      )
    : console.log(`No diagonal match found`);
};
const checkVerticalWin = function (gridSize) {
  for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
    // column switching
    let isColumnWin = false;
    const firstColumnCell_index = columnIndex;
    for (
      let currentColumnCell_index = columnIndex;
      currentColumnCell_index < gridSize * gridSize - 1 + columnIndex;
      currentColumnCell_index += gridSize // parsing through each cell in that column
    ) {
      const firstColumnCell_value = ticTacToeBoard[firstColumnCell_index];
      const currentColumnCell_value = ticTacToeBoard[currentColumnCell_index];

      isColumnWin = firstColumnCell_value === currentColumnCell_value;
      if (!isColumnWin) break;
    }
    if (isColumnWin) {
      console.log(
        `The match is won vertically by player using ${ticTacToeBoard[columnIndex]}`
      );
      break;
    } else {
      console.log(`No vertical match in column number:${columnIndex + 1}`);
    }
  }
};
const checkHorizontalWin = function (gridSize) {
  for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
    //row switching
    let isRowWin = false;
    const firstRowCell_index = rowIndex * gridSize;
    for (
      let currentRowCell_index = rowIndex * gridSize;
      currentRowCell_index < rowIndex * gridSize + gridSize;
      currentRowCell_index++ // parsing through each cell in that row
    ) {
      const firstRowCellValue = ticTacToeBoard[firstRowCell_index];
      const currentRowCell_value = ticTacToeBoard[currentRowCell_index];

      isRowWin = firstRowCellValue === currentRowCell_value; // for the first check is always true
      if (!isRowWin) break; // when reached the end of current rowIndex and all Cell values are same as the first one, RowWin Stays true
    }
    if (isRowWin) {
      console.log(
        `the match is won horizontally by player using ${ticTacToeBoard[rowIndex]}`
      );
      break;
    } else {
      console.log(`No Horizontal Match in row number:${rowIndex + 1}`);
    }
  }
};

checkHorizontalWin(3);
checkVerticalWin(3);
checkDiagonalwin(3);
