import React from "react";
import classes from "./InputControl.module.css";
import eraser from "../../asserts/images/eraser.svg";

const inputCells = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

function InputControl(props) {
  const { selectedNum, onClick } = props;
  return (
    <ul className={classes.inputControl}>
      {inputCells.map((c, idx) => {
        const inputCellClass = [classes.cell];
        if (selectedNum !== "0" && c === selectedNum) {
          inputCellClass.push(classes.cellSameValue);
        }
        return (
          <li
            className={inputCellClass.join(" ")}
            key={idx}
            onClick={() => onClick(c)}
          >
            {c !== "0" ? (
              c
            ) : (
              <img src={eraser} className={classes.eraser} alt="eraser" />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default InputControl;
