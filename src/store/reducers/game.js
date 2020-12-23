import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../shared/utility";
import * as games from "../../components/games/games";

const { LEVEL } = require("../../constants");

const initialState = {
  level: LEVEL.Easy,
  isPlaying: false,
  gameIndex: 0,
  board: null,
};

const levelChanged = (state, action) => {
  return updateObject(state, { level: action.level });
};

const newGameLoaded = (state, action) => {
  let board = "";
  let index = 0;
  if (state.level === LEVEL.Easy) {
    index = Math.floor(Math.random() * games.easy.length);
    board = games.easy[index];
  } else if (state.level === LEVEL.Medium) {
    index = Math.floor(Math.random() * games.medium.length);
    board = games.medium[index];
  } else {
    index = Math.floor(Math.random() * games.hard.length);
    board = games.hard[index];
  }
  return updateObject(state, { board: board, gameIndex: index });
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LEVEL_CHANGED:
      return levelChanged(state, action);
    case actionTypes.NEW_GAME_LOADING:
      return newGameLoaded(state, action);
    default:
      return state;
  }
};

export default game;
