import React, { useState } from "react";

import classes from "./Game.module.css";
import Board from "./Board/Board";
import InputControl from "../../components/InputControl/InputControl";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Button } from "antd";
import { getKeyChar } from "../../shared/utility";

function Game(props) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedNum, setSelectedNum] = useState("0");

  const remainingCount = useSelector((state) => state.game.remainingCount);
  const gameType = useSelector((state) => state.game.gameType);

  const dispatch = useDispatch();
  const onCellValueChanged = (index, value) =>
    dispatch(actions.cellValueChanged(index, value));

  const inputControlClickedHandler = (keyStr) => {
    const keyChar = getKeyChar(keyStr);
    if (selectedIndex !== null) {
      onCellValueChanged(selectedIndex, keyChar);
    }
    setSelectedNum(keyChar);
  };

  return (
    <div className={classes.Game}>
      <Button
        type="primary"
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
