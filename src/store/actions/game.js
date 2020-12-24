import * as actionTypes from "./actionsTypes";

export const gameTypeChanged = (gameType) => {
  return {
    type: actionTypes.GAME_TYPE_CHANGED,
    gameType: gameType,
  };
};

export const levelChanged = (level) => {
  return {
    type: actionTypes.LEVEL_CHANGED,
    level: level,
  };
};

export const initNewGameLoading = () => {
  return {
    type: actionTypes.NEW_GAME_LOADING,
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
