import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";
import * as games3 from "../../asserts/games/games3";
import * as games2 from "../../asserts/games/games2";
import {
  LEVEL,
  GAME_TYPE,
  VALID_INPUT_x3,
  VALID_INPUT_x2,
} from "../../constants";
import { getRemainingCount, validate } from "../../shared/sudoku";

const initialState = {
  level: LEVEL.Easy,
  gameType: GAME_TYPE.type_x3,
  cfg: {
    board_size: Math.pow(GAME_TYPE.type_x3, 4),
    board_length: Math.pow(GAME_TYPE.type_x3, 2),
    box_length: GAME_TYPE.type_x3,
    n_boxes: GAME_TYPE.type_x3,
  },
  validInput: VALID_INPUT_x3,
  gameList: games3.easy,
  isPlaying: false,
  gameIndex: 0,
  board: "0".repeat(Math.pow(GAME_TYPE.type_x3, 4)).split(""),
  isGivenValue: Array(Math.pow(GAME_TYPE.type_x3, 4)).fill(false),
  valid: Array(Math.pow(GAME_TYPE.type_x3, 4)).fill(true),
  remainingCount: {
    0: Math.pow(GAME_TYPE.type_x3, 2),
    1: Math.pow(GAME_TYPE.type_x3, 2),
    2: Math.pow(GAME_TYPE.type_x3, 2),
    3: Math.pow(GAME_TYPE.type_x3, 2),
    4: Math.pow(GAME_TYPE.type_x3, 2),
    5: Math.pow(GAME_TYPE.type_x3, 2),
    6: Math.pow(GAME_TYPE.type_x3, 2),
    7: Math.pow(GAME_TYPE.type_x3, 2),
    8: Math.pow(GAME_TYPE.type_x3, 2),
    9: Math.pow(GAME_TYPE.type_x3, 2),
  },
};

const gameTypeChanged = (state, action) => {
  const { level } = state;
  const updatedGameList = updateGameList(action.gameType, level);
  const updatedValidInput =
    action.gameType === GAME_TYPE.type_x3 ? VALID_INPUT_x3 : VALID_INPUT_x2;
  const updatedCfg = {
    board_size: Math.pow(action.gameType, 4),
    board_length: Math.pow(action.gameType, 2),
    box_length: action.gameType,
    n_boxes: action.gameType,
  };
  return updateObject(state, {
    gameType: action.gameType,
    gameList: updatedGameList,
    cfg: updatedCfg,
    validInput: updatedValidInput,
  });
};

const levelChanged = (state, action) => {
  const { gameType } = state;
  const updatedGameList = updateGameList(gameType, action.level);
  return updateObject(state, {
    level: action.level,
    gameList: updatedGameList,
  });
};

const updateGameList = (gameType, level) => {
  const gameLists = gameType === GAME_TYPE.type_x3 ? games3 : games2;
  let updatedGameList = null;
  if (level === LEVEL.Easy) {
    updatedGameList = gameLists.easy;
  } else if (level === LEVEL.Medium) {
    updatedGameList = gameLists.medium;
  } else {
    updatedGameList = gameLists.hard;
  }
  return updatedGameList;
};

const newGameLoaded = (state, action) => {
  const { gameList } = state;
  const index = Math.floor(Math.random() * gameList.length);
  return updateObject(
    state,
    updateObject({ gameIndex: index }, reloadGameData(state, gameList, index))
  );
};

const resetGame = (state, action) => {
  return updateObject(
    state,
    reloadGameData(state, state.gameList, state.gameIndex)
  );
};

const reloadGameData = (state, gameList, index) => {
  const { cfg } = state;
  const boardString = gameList[index];
  const newBoard = boardString.split("");
  const newValid = newBoard.map(() => true);
  const updatedIsGivenValue = newBoard.map((cell) => cell !== "0");
  return {
    board: newBoard,
    isGivenValue: updatedIsGivenValue,
    valid: newValid,
    remainingCount: getRemainingCount(
      newBoard,
      { ...state.remainingCount },
      cfg
    ),
  };
};

const cellValueChanged = (state, action) => {
  if (state.isGivenValue[action.index]) {
    return state;
  }
  const { board, cfg, remainingCount } = state;
  const newBoard = [...board];
  newBoard[action.index] = action.value;
  return updateObject(state, {
    board: newBoard,
    valid: validate(newBoard, cfg),
    remainingCount: getRemainingCount(newBoard, { ...remainingCount }, cfg),
  });
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GAME_TYPE_CHANGED:
      return gameTypeChanged(state, action);
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
