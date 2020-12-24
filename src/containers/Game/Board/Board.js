import React from "react";
import { useSelector } from "react-redux";

import classes from "./Board.module.css";
import { cellConnected, getKeyChar } from "../../../shared/utility";
import { VALID_INPUT } from "../../../constants";

function Board(props) {
  const {
    selectedIndex,
    setSelectedIndex,
    selectedNum,
    setSelectedNum,
    onCellValueChanged,
  } = props;
  const board = useSelector((state) => state.game.board);
  const cellFixedValue = useSelector((state) => state.game.cellFixedValue);
  const valid = useSelector((state) => state.game.valid);

  const onKeyPressed = (index, keyStr) => {
    if (VALID_INPUT.indexOf(keyStr) > -1) {
      const keyChar = getKeyChar(keyStr);
      onCellValueChanged(index, keyChar);
      setSelectedNum(keyChar);
    }
  };

  return (
    <ul className={classes.board}>
      {board.map((cell, idx) => {
        const inputClass = [classes.cell];
        // set font weight/color
        if (cellFixedValue[idx]) {
          inputClass.push(classes.cellFixed);
        }
        if (!valid[idx]) {
          inputClass.push(classes.cellError);
        }
        // set background color
        if (selectedNum !== "0" && board[idx] === selectedNum) {
          inputClass.push(classes.cellSameValue);
        } else if (
          selectedIndex !== null &&
          cellConnected(idx, selectedIndex)
        ) {
          inputClass.push(classes.cellConnected);
        }

        return (
          <li
            key={idx}
            className={inputClass.join(" ")}
            onClick={() => {
              if (!cellFixedValue[idx]) {
                setSelectedIndex(idx);
              } else {
                setSelectedIndex(null);
              }
              setSelectedNum(cell);
            }}
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
