import * as actionTypes from "../actions/actionsTypes";
import {
  getRemainingCount,
  updateObject,
  validate,
} from "../../shared/utility";
import * as games from "../../components/games/games";
import { LEVEL, BOARD_SIZE, BOARD_LENGTH } from "../../constants";

const initialState = {
  level: LEVEL.Easy,
  isPlaying: false,
  gameIndex: 0,
  board: "0".repeat(BOARD_SIZE).split(""),
  cellFixedValue: Array(BOARD_SIZE).fill(false),
  valid: Array(BOARD_SIZE).fill(true),
  remainingCount: {
    0: BOARD_LENGTH,
    1: BOARD_LENGTH,
    2: BOARD_LENGTH,
    3: BOARD_LENGTH,
    4: BOARD_LENGTH,
    5: BOARD_LENGTH,
    6: BOARD_LENGTH,
    7: BOARD_LENGTH,
    8: BOARD_LENGTH,
    9: BOARD_LENGTH,
  },
};

const levelChanged = (state, action) => {
  return updateObject(state, { level: action.level });
};

const newGameLoaded = (state, action) => {
  let index = 0;
  if (state.level === LEVEL.Easy) {
    index = Math.floor(Math.random() * games.easy.length);
  } else if (state.level === LEVEL.Medium) {
    index = Math.floor(Math.random() * games.medium.length);
  } else {
    index = Math.floor(Math.random() * games.hard.length);
  }
  return updateObject(
    state,
    updateObject({ gameIndex: index }, reloadGameData(state, index))
  );
};

const resetGame = (state, action) => {
  return updateObject(state, reloadGameData(state, state.gameIndex));
};

const reloadGameData = (state, index) => {
  let boardString = "";
  if (state.level === LEVEL.Easy) {
    boardString = games.easy[index];
  } else if (state.level === LEVEL.Medium) {
    boardString = games.medium[index];
  } else {
    boardString = games.hard[index];
  }
  const newBoard = boardString.split("");
  const newValid = Array(BOARD_SIZE).fill(true);
  const newCellFixedValue = newBoard.map((cell) => cell !== "0");
  return {
    board: newBoard,
    cellFixedValue: newCellFixedValue,
    valid: newValid,
    remainingCount: getRemainingCount(newBoard, { ...state.remainingCount }),
  };
};

const cellValueChanged = (state, action) => {
  if (state.cellFixedValue[action.index]) {
    return state;
  }
  const newBoard = [...state.board];
  newBoard[action.index] = action.value;
  return updateObject(state, {
    board: newBoard,
    valid: validate(newBoard),
    remainingCount: getRemainingCount(newBoard, { ...state.remainingCount }),
  });
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LEVEL_CHANGED:
      return levelChanged(state, action);
    case actionTypes.NEW_GAME_LOADING:
      return newGameLoaded(state, action);
    case actionTypes.RESET_GAME:
      return resetGame(state, action);
    case actionTypes.CELL_VALUE_CHANGED:
      return cellValueChanged(state, action);
    default:
      return state;
  }
};

export default game;
