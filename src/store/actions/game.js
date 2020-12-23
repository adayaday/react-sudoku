import * as actionTypes from "./actionsTypes";

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
