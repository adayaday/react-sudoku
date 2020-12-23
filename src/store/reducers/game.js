import * as actionTypes from "../actions/actionsTypes";
import { updateObject, validate } from "../../shared/utility";
import * as games from "../../components/games/games";
import { LEVEL, BOARD_SIZE, VALID_CLEAR_INPUT } from "../../constants";

const initialState = {
  level: LEVEL.Easy,
  isPlaying: false,
  gameIndex: 0,
  board: "0".repeat(BOARD_SIZE).split(""),
  cellFixedValue: Array(BOARD_SIZE).fill(false),
  valid: Array(BOARD_SIZE).fill(true),
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
  };
};

const cellValueChanged = (state, action) => {
  if (state.cellFixedValue[action.index]) {
    return state;
  }
  let keyStr = action.value;
  if (VALID_CLEAR_INPUT.indexOf(keyStr) > -1) {
    keyStr = "";
  }
  const newBoard = [...state.board];
  newBoard[action.index] = keyStr;
  return updateObject(state, { board: newBoard, valid: validate(newBoard) });
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
