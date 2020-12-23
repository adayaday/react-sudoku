import React from "react";

import classes from "./Game.module.css";
import Board from "./Board/Board";
import InputControl from "./InputControl/InputControl";

function Game(props) {
  return (
    <div className={classes.Game}>
      <Board />
      <InputControl />
    </div>
  );
}

export default Game;
