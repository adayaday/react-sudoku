import React, { useEffect, useState } from "react";

import classes from "./Game.module.css";
import Board from "./Board/Board";
import InputControl from "../../components/InputControl/InputControl";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { getKeyChar } from "../../shared/utility";
import { Button } from "@material-ui/core";

function Game(props) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedNum, setSelectedNum] = useState("0");

  const remainingCount = useSelector((state) => state.game.remainingCount);
  const gameType = useSelector((state) => state.game.gameType);
  const isPlaying = useSelector((state) => state.game.isPlaying);

  const dispatch = useDispatch();
  const onCellValueChanged = (index, value) =>
    dispatch(actions.cellValueChanged(index, value));
  const onPlayingStarted = () => dispatch(actions.playingStarted());

  const cellClickedHandler = () => {
    onPlayingStarted();
  };

  const inputControlClickedHandler = (keyStr) => {
    onPlayingStarted();
    const keyChar = getKeyChar(keyStr);
    if (selectedIndex !== null) {
      onCellValueChanged(selectedIndex, keyChar);
    }
    setSelectedNum(keyChar);
  };

  useEffect(() => {
    if (!isPlaying) {
      setSelectedNum(null);
      setSelectedIndex(null);
    }
  }, [setSelectedNum, setSelectedIndex, isPlaying]);

  return (
    <div className={classes.Game}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          setSelectedIndex(null);
          setSelectedNum("0");
        }}
      >
        Clear Selection
      </Button>
      <Board
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        selectedNum={selectedNum}
        setSelectedNum={setSelectedNum}
        onCellClicked={cellClickedHandler}
        onCellValueChanged={onCellValueChanged}
      />
      <InputControl
        gameType={gameType}
        selectedNum={selectedNum}
        remainingCount={remainingCount}
        onClick={inputControlClickedHandler}
      />
    </div>
  );
}

export default Game;
