import * as actionTypes from "./actionsTypes";

export const initNewGameLoading = (gameType, level) => {
  return {
    type: actionTypes.NEW_GAME_LOADING,
    gameType: gameType,
    level: level,
  };
};

export const resetGame = () => {
  return {
    type: actionTypes.RESET_GAME,
  };
};

export const cellValueChanged = (index, value) => {
  return {
    type: actionTypes.CELL_VALUE_CHANGED,
    index: index,
    value: value,
  };
};

export const playingStarted = () => {
  return {
    type: actionTypes.PLAYING_STARTED,
  };
};

export const playingStopped = () => {
  return {
    type: actionTypes.PLAYING_STOPPED,
  };
};
