import React from "react";
import classes from "./Game.module.css";
import Board from "../../components/Board/Board";
import { useSelector } from "react-redux";

function Game(props) {
  const board = useSelector((state) => state.game.board);

  return (
    <div className={classes.Game}>
      <Board boardString={board} />
    </div>
  );
}

export default Game;
