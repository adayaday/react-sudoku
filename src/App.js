import "./App.css";
import React, { useEffect, useCallback } from "react";
import TopBar from "./components/TopBar/TopBar";
import MainControl from "./containers/MainControl/MainControl";
import Game from "./containers/Game/Game";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";

function App() {
  const gameType = useSelector((state) => state.game.gameType);
  const level = useSelector((state) => state.game.level);
  const dispatch = useDispatch();
  const onNewGameStart = useCallback(
    (newGameType, newLevel) =>
      dispatch(actions.initNewGameLoading(newGameType, newLevel)),
    [dispatch]
  );

  useEffect(() => onNewGameStart(gameType, level), []);

  return (
    <div className="App">
      <TopBar />
      <MainControl />
      <Game />
    </div>
  );
}

export default App;
