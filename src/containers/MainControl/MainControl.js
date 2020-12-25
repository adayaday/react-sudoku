import React, { useState } from "react";
import classes from "./MainControl.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Button } from "@material-ui/core";
import NewGame from "../../components/NewGame/NewGame";
import { Add, RotateLeft } from "@material-ui/icons";

function MainControl(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const gameType = useSelector((state) => state.game.gameType);
  const level = useSelector((state) => state.game.level);
  const dispatch = useDispatch();
  const onNewGameStart = (newGameType, newGameLevel) =>
    dispatch(actions.initNewGameLoading(newGameType, newGameLevel));
  const onGameReset = () => dispatch(actions.resetGame());
  const onPlayingStopped = () => dispatch(actions.playingStopped());

  const startHandler = (newGameType, newGameLevel) => {
    onPlayingStopped();
    onNewGameStart(newGameType, newGameLevel);
    setDialogOpen(false);
  };

  const resetHandler = () => {
    onPlayingStopped();
    onGameReset();
  };

  return (
    <div className={classes.main}>
      {dialogOpen ? (
        <NewGame
          gameType={gameType}
          level={level}
          onStart={startHandler}
          onClose={() => setDialogOpen(false)}
        />
      ) : null}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setDialogOpen(true)}
      >
        New Game
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<RotateLeft />}
        onClick={resetHandler}
      >
        Reset Game
      </Button>
    </div>
  );
}

export default MainControl;
