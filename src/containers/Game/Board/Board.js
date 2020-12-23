import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Board.module.css";
import * as actions from "../../../store/actions";
import { cellConnected } from "../../../shared/utility";
import { VALID_INPUT } from "../../../constants";

function Board(props) {
  const board = useSelector((state) => state.game.board);
  const cellFixedValue = useSelector((state) => state.game.cellFixedValue);
  const valid = useSelector((state) => state.game.valid);
  const dispatch = useDispatch();
  const onCellValueChanged = (index, value) =>
    dispatch(actions.cellValueChanged(index, value));

  const [selected, setSelected] = useState(null);

  const onKeyPressed = (index, keyStr) => {
    if (VALID_INPUT.indexOf(keyStr) > -1) {
      onCellValueChanged(index, keyStr);
    }
  };

  return (
    <ul className={classes.board}>
      {board.map((cell, idx) => {
        const inputClass = [classes.cell];
        if (cellFixedValue[idx]) {
          inputClass.push(classes.cellFixed);
        }
        if (!valid[idx]) {
          inputClass.push(classes.cellError);
        }
        if (!selected || idx === selected) {
        } else if (board[idx] !== "0" && board[idx] === board[selected]) {
          inputClass.push(classes.cellSameValue);
        } else if (cellConnected(idx, selected)) {
          inputClass.push(classes.cellConnected);
        }

        return (
          <li
            key={idx}
            className={inputClass.join(" ")}
            onClick={() => setSelected(idx)}
            onKeyDownCapture={(e) => onKeyPressed(idx, e.key)}
            tabIndex="-1"
          >
            {cell !== "0" ? cell : ""}
          </li>
        );
      })}
    </ul>
  );
}

export default Board;
