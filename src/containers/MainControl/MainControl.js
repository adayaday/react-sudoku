import React, { useState } from "react";
import classes from "./MainControl.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Button } from "@material-ui/core";
import NewGame from "../../components/NewGame/NewGame";
import { Add, RotateLeft } from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

function MainControl(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const gameType = useSelector((state) => state.game.gameType);
  const level = useSelector((state) => state.game.level);
  const gameIndex = useSelector((state) => state.game.gameIndex);
  const dispatch = useDispatch();
  const onNewGameStart = (newGameType, newGameLevel, newGameIndex) =>
    dispatch(
      actions.initNewGameLoading(newGameType, newGameLevel, newGameIndex)
    );
  const onGameReset = () => dispatch(actions.resetGame());
  const onPlayingStopped = () => dispatch(actions.playingStopped());

  const startHandler = (newGameType, newGameLevel, newGameIndex) => {
    onPlayingStopped();
    onNewGameStart(newGameType, newGameLevel, newGameIndex);
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
        New
      </Button>
      <Chip
        avatar={<Avatar>{gameType}</Avatar>}
        label={`${level} - ${gameIndex}`}
        color="primary"
        variant="outlined"
        className={classes.game}
      />
      <Button
        variant="outlined"
        color="primary"
        startIcon={<RotateLeft />}
        onClick={resetHandler}
      >
        Reset
      </Button>
    </div>
  );
}

export default MainControl;
