import { BOARD_SIZE, BOARD_LENGTH, BLOCK_LENGTH, N_BLOCKS } from "../constants";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const validate = (board) => {
  const valid = Array(BOARD_SIZE).fill(true);
  let currentValid = true;
  let currentIndex = 0;
  for (let x = 0; x < BOARD_LENGTH; x++) {
    for (let y = 0; y < BOARD_LENGTH; y++) {
      currentIndex = getIndex(x, y);
      if (board[currentIndex] === "0") {
        continue;
      }
      currentValid = true;
      // check x direction
      for (let xx = 0; xx < BOARD_LENGTH; xx++) {
        if (xx !== x && board[getIndex(xx, y)] === board[currentIndex]) {
          currentValid = false;
          break;
        }
      }
      if (!currentValid) {
        valid[currentIndex] = currentValid;
        continue;
      }
      // check y direction
      for (let yy = 0; yy < BOARD_LENGTH; yy++) {
        if (yy !== y && board[getIndex(x, yy)] === board[currentIndex]) {
          currentValid = false;
          break;
        }
      }
      if (!currentValid) {
        valid[currentIndex] = currentValid;
        continue;
      }
      // check block
      const startX = Math.floor(x / BLOCK_LENGTH) * BLOCK_LENGTH;
      const startY = Math.floor(y / BLOCK_LENGTH) * BLOCK_LENGTH;
      for (let xx = startX; xx < startX + BLOCK_LENGTH; xx++) {
        for (let yy = startY; yy < startY + BLOCK_LENGTH; yy++) {
          if (
            (xx !== x || yy !== y) &&
            board[currentIndex] === board[getIndex(xx, yy)]
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

export const cellConnected = (i, j) => {
  return (
    i % BOARD_LENGTH === j % BOARD_LENGTH ||
    Math.floor(i / BOARD_LENGTH) === Math.floor(j / BOARD_LENGTH) ||
    getBlock(i) === getBlock(j)
  );
};

export const getIndex = (x, y) => x + BOARD_LENGTH + y;

export const getXY = (index) => [
  index % BOARD_LENGTH,
  Math.floor(index / BOARD_LENGTH),
];

export const getBlock = (index) => {
  const [x, y] = getXY(index);
  return Math.floor(y / BLOCK_LENGTH) * N_BLOCKS + Math.floor(x / BLOCK_LENGTH);
};
