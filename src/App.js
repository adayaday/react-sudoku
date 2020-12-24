import "./App.css";
import React, { useEffect, useCallback } from "react";
import TopBar from "./components/TopBar/TopBar";
import MainControl from "./containers/MainControl/MainControl";
import Game from "./containers/Game/Game";
import { useDispatch } from "react-redux";
import * as actions from "./store/actions";

function App() {
  const dispatch = useDispatch();
  const onNewGameStart = useCallback(
    () => dispatch(actions.initNewGameLoading()),
    [dispatch]
  );

  useEffect(() => onNewGameStart(), [onNewGameStart]);

  return (
    <div className="App">
      <TopBar />
      <MainControl />
      <Game />
    </div>
  );
}

export default App;
