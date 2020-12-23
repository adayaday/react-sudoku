import React from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Board.module.css";
import * as actions from "../../../store/actions";

function Board(props) {
  const board = useSelector((state) => state.game.board);
  const cellFixedValue = useSelector((state) => state.game.cellFixedValue);
  const valid = useSelector((state) => state.game.valid);
  const dispatch = useDispatch();
  const onCellValueChanged = (index, value) =>
    dispatch(actions.cellValueChanged(index, value));

  return (
    <ul className={classes.board}>
      {board.map((cell, idx) => {
        const inputClass = [classes.input];
        if (cellFixedValue[idx]) {
          inputClass.push(classes.inputFixed);
        }
        if (!valid[idx]) {
          inputClass.push(classes.inputError);
        }
        return (
          <li key={idx} className={classes.cell}>
            <input
              type="number"
              className={inputClass.join(" ")}
              value={cell !== "0" ? cell : ""}
              onChange={(e) => onCellValueChanged(idx, e.target.value)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default Board;
