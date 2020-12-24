import React from "react";
import { useSelector } from "react-redux";

import classes from "./Board.module.css";
import { getKeyChar } from "../../../shared/utility";
import { cellConnected } from "../../../shared/sudoku";
import { GAME_TYPE } from "../../../constants";

function Board(props) {
  const {
    selectedIndex,
    setSelectedIndex,
    selectedNum,
    setSelectedNum,
    onCellValueChanged,
  } = props;
  const gameType = useSelector((state) => state.game.gameType);
  const board = useSelector((state) => state.game.board);
  const cfg = useSelector((state) => state.game.cfg);
  const validInput = useSelector((state) => state.game.validInput);
  const isGivenValue = useSelector((state) => state.game.isGivenValue);
  const valid = useSelector((state) => state.game.valid);

  const boardClass = [
    classes.board,
    gameType === GAME_TYPE.type_x3 ? classes.boardX3 : classes.boardX2,
  ];
  const inputClass = [
    classes.cell,
    gameType === GAME_TYPE.type_x3 ? classes.cellX3 : classes.cellX2,
  ];

  const onKeyPressed = (index, keyStr) => {
    if (validInput.indexOf(keyStr) > -1) {
      const keyChar = getKeyChar(keyStr);
      onCellValueChanged(index, keyChar);
      setSelectedNum(keyChar);
    }
  };

  return (
    <ul className={boardClass.join(" ")}>
      {board.map((cell, idx) => {
        const currentInputClass = [...inputClass];
        // set font weight/color
        if (isGivenValue[idx]) {
          currentInputClass.push(classes.cellFixed);
        }
        if (!valid[idx]) {
          currentInputClass.push(classes.cellError);
        }
        // set background color
        if (selectedNum !== "0" && board[idx] === selectedNum) {
          currentInputClass.push(classes.cellSameValue);
        } else if (
          selectedIndex !== null &&
          cellConnected(idx, selectedIndex, cfg)
        ) {
          currentInputClass.push(classes.cellConnected);
        }

        return (
          <li
            key={idx}
            className={currentInputClass.join(" ")}
            onClick={() => {
              if (!isGivenValue[idx]) {
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
