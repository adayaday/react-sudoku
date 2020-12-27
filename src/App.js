import "./App.css";
import React, { useEffect, useCallback, useRef } from "react";
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
      dispatch(actions.initNewGameLoading(newGameType, newLevel, -1)),
    [dispatch]
  );

  const initAppRef = useRef(() => onNewGameStart(gameType, level));

  useEffect(() => initAppRef.current(), [initAppRef]);

  return (
    <div className="App">
      <TopBar />
      <MainControl />
      <Game />
    </div>
  );
}

export default App;
