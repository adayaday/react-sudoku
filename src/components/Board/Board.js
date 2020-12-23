import React from "react";
import classes from "./Board.module.css";

function Board(props) {
  const { boardString } = props;
  let board = "";
  if (boardString && boardString.length === 81) {
    board = boardString.split("");
  } else {
    board = "0".repeat(81).split("");
  }

  return (
    <ul className={classes.board}>
      {board.map((cell, idx) => (
        <li key={idx} className={classes.cell}>
          <input
            className={classes.input}
            type="number"
            value={cell !== "0" ? cell : null}
          />
        </li>
      ))}
    </ul>
  );
}

export default Board;
