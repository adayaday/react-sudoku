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
  solved: false,
  remainingCount: Array(Math.pow(GAME_TYPE.type_x3, 2) + 1).fill(0),
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
  const { gameType, level } = action;
  const updatedGameList = updateGameList(gameType, level);
  const updatedValidInput =
    gameType === GAME_TYPE.type_x3 ? VALID_INPUT_x3 : VALID_INPUT_x2;
  const updatedCfg = {
    board_size: Math.pow(gameType, 4),
    board_length: Math.pow(gameType, 2),
    box_length: gameType,
    n_boxes: gameType,
  };
  const index = Math.floor(Math.random() * updatedGameList.length);
  return updateObject(
    state,
    updateObject(
      {
        level: level,
        gameType: gameType,
        gameList: updatedGameList,
        gameIndex: index,
        validInput: updatedValidInput,
        cfg: updatedCfg,
      },
      reloadGameData(state, updatedGameList, index, updatedCfg)
    )
  );
};

const resetGame = (state, action) => {
  return updateObject(
    state,
    reloadGameData(state, state.gameList, state.gameIndex, state.cfg)
  );
};

const reloadGameData = (state, gameList, index, cfg) => {
  const boardString = gameList[index];
  const newBoard = boardString.split("");
  const newValid = newBoard.map((c) => c !== "0");
  const updatedIsGivenValue = newBoard.map((cell) => cell !== "0");
  return {
    board: newBoard,
    isGivenValue: updatedIsGivenValue,
    valid: newValid,
    solved: newValid.every((v) => v),
    remainingCount: getRemainingCount(newBoard, cfg),
  };
};

const cellValueChanged = (state, action) => {
  if (state.isGivenValue[action.index]) {
    return state;
  }
  const { board, cfg } = state;
  const newBoard = [...board];
  newBoard[action.index] = action.value;
  const newValid = validate(newBoard, cfg);
  return updateObject(state, {
    board: newBoard,
    valid: newValid,
    solved: newValid.every((v) => v),
    remainingCount: getRemainingCount(newBoard, cfg),
  });
};

const playingStarted = (state, action) => {
  return updateObject(state, { isPlaying: true });
};

const playingStopped = (state, action) => {
  return updateObject(state, { isPlaying: false });
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_GAME_LOADING:
      return newGameLoaded(state, action);
    case actionTypes.RESET_GAME:
      return resetGame(state, action);
    case actionTypes.CELL_VALUE_CHANGED:
      return cellValueChanged(state, action);
    case actionTypes.PLAYING_STARTED:
      return playingStarted(state, action);
    case actionTypes.PLAYING_STOPPED:
      return playingStopped(state, action);
    default:
      return state;
  }
};

export default game;
