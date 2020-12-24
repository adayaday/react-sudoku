export const validate = (board, cfg) => {
  const { board_size, board_length, box_length } = cfg;
  const valid = Array(board_size).fill(true);
  let currentValid = true;
  let currentIndex = 0;
  for (let x = 0; x < board_length; x++) {
    for (let y = 0; y < board_length; y++) {
      currentIndex = getIndex(x, y, board_length);
      if (board[currentIndex] === "0") {
        continue;
      }
      currentValid = true;
      // check x direction
      for (let xx = 0; xx < board_length; xx++) {
        if (
          xx !== x &&
          board[getIndex(xx, y, board_length)] === board[currentIndex]
        ) {
          currentValid = false;
          break;
        }
      }
      if (!currentValid) {
        valid[currentIndex] = currentValid;
        continue;
      }
      // check y direction
      for (let yy = 0; yy < board_length; yy++) {
        if (
          yy !== y &&
          board[getIndex(x, yy, board_length)] === board[currentIndex]
        ) {
          currentValid = false;
          break;
        }
      }
      if (!currentValid) {
        valid[currentIndex] = currentValid;
        continue;
      }
      // check box
      const startX = Math.floor(x / box_length) * box_length;
      const startY = Math.floor(y / box_length) * box_length;
      for (let xx = startX; xx < startX + box_length; xx++) {
        for (let yy = startY; yy < startY + box_length; yy++) {
          if (
            (xx !== x || yy !== y) &&
            board[currentIndex] === board[getIndex(xx, yy, board_length)]
          ) {
            currentValid = false;
            break;
          }
          if (!currentValid) {
            break;
          }
        }
      }
      valid[currentIndex] = currentValid;
    }
  }
  return valid;
};

export const cellConnected = (i, j, cfg) => {
  const { board_length, n_boxes } = cfg;
  return (
    i % board_length === j % board_length ||
    Math.floor(i / board_length) === Math.floor(j / board_length) ||
    getBox(i, board_length, n_boxes) === getBox(j, board_length, n_boxes)
  );
};

export const getIndex = (x, y, board_length) => x + board_length * y;

export const getXY = (index, board_length) => [
  index % board_length,
  Math.floor(index / board_length),
];

export const getBox = (index, box_length, n_boxes) => {
  const [x, y] = getXY(index);
  return Math.floor(y / box_length) * n_boxes + Math.floor(x / box_length);
};

export const getRemainingCount = (board, count, cfg) => {
  const { board_size, board_length } = cfg;
  for (let key in count) {
    count[key] = board_length;
  }
  count[0] = 0;
  board.forEach((c) => count[c]--);
  count[0] = -count[0];
  return count;
};
