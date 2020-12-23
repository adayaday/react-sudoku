import { BOARD_LENGTH, BOARD_N } from "../constants";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const validate = (board) => {
  const valid = Array(BOARD_LENGTH).fill(true);
  let currentValid = true;
  for (let x = 0; x < BOARD_N; x++) {
    for (let y = 0; y < BOARD_N; y++) {
      if (board[x + BOARD_N * y] === "0") {
        continue;
      }
      currentValid = true;
      // check x direction
      for (let xx = 0; xx < BOARD_N; xx++) {
        if (xx !== x && board[xx + BOARD_N * y] === board[x + BOARD_N * y]) {
          currentValid = false;
          break;
        }
      }
      if (!currentValid) {
        valid[x + BOARD_N * y] = currentValid;
        continue;
      }
      // check y direction
      for (let yy = 0; yy < BOARD_N; yy++) {
        if (yy !== y && board[x + BOARD_N * yy] === board[x + BOARD_N * y]) {
          currentValid = false;
          break;
        }
      }
      if (!currentValid) {
        valid[x + BOARD_N * y] = currentValid;
        continue;
      }
      // check block
      const startX = Math.floor(x / 3) * 3;
      const startY = Math.floor(y / 3) * 3;
      for (let xx = startX; xx < startX + 3; xx++) {
        for (let yy = startY; yy < startY + 3; yy++) {
          if (
            (xx !== x || yy !== y) &&
            board[x + BOARD_N * y] === board[xx + BOARD_N * yy]
          ) {
            currentValid = false;
            break;
          }
          if (!currentValid) {
            break;
          }
        }
      }
      valid[x + BOARD_N * y] = currentValid;
    }
  }
  return valid;
};
