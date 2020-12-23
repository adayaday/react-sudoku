import React from "react";
import classes from "./Board.module.css";

function Board(props) {
  const board = "040000000002800003001376020007008106409060208506900700060291300200004900000000040".split(
    ""
  );
  return (
    <ul className={classes.board}>
      {board.map((cell, idx) => (
        <li key={idx} className={classes.cell}>
          <span className={classes.cellSpan}>{cell !== "0" ? cell : null}</span>
        </li>
      ))}
    </ul>
  );
}

export default Board;
