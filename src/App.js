import "./App.css";
import React, { useEffect } from "react";
import TopBar from "./components/TopBar/TopBar";
import MainControl from "./containers/MainControl/MainControl";
import Game from "./containers/Game/Game";
import { useDispatch } from "react-redux";
import * as actions from "./store/actions";

function App() {
  const dispatch = useDispatch();
  const onNewGameStart = () => dispatch(actions.initNewGameLoading());

  useEffect(() => onNewGameStart(), []);

  return (
    <div className="App">
      <TopBar />
      <MainControl />
      <Game />
    </div>
  );
}

export default App;
