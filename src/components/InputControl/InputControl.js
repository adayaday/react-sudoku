import React from "react";
import classes from "./InputControl.module.css";
import eraser from "../../asserts/images/eraser.svg";
import { GAME_TYPE } from "../../constants";

const inputCells_x3 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const inputCells_x2 = ["1", "2", "3", "4", "0"];

function InputControl(props) {
  const { gameType, selectedNum, onClick, remainingCount } = props;

  const inputCells =
    gameType === GAME_TYPE.type_x3 ? inputCells_x3 : inputCells_x2;
  const inputCellClass = [
    classes.cell,
    gameType === GAME_TYPE.type_x3 ? classes.cellX3 : classes.cellX2,
  ];

  return (
    <ul className={classes.inputControl}>
      {inputCells.map((c, idx) => {
        const currentInputCellClass = [...inputCellClass];
        if (selectedNum !== "0" && c === selectedNum) {
          currentInputCellClass.push(classes.cellSameValue);
        }

        const countClass = [classes.count];
        if (remainingCount[c] === 0) {
          countClass.push(classes.countZero);
        }
        return (
          <li
            className={currentInputCellClass.join(" ")}
            key={idx}
            onClick={() => onClick(c)}
          >
            {c !== "0" ? (
              c
            ) : (
              <img src={eraser} className={classes.eraser} alt="eraser" />
            )}
            <div className={countClass.join(" ")}>{remainingCount[c]}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default InputControl;
