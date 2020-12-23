import React from "react";
import classes from "./Game.module.css";
import Board from "../../components/Board/Board";

function Game(props) {
  return (
    <div className={classes.Game}>
      <Board />
    </div>
  );
}

export default Game;
