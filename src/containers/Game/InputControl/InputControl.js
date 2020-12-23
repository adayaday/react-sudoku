import React from "react";
import classes from "./InputControl.module.css";
import eraser from "../../../asserts/images/eraser.svg";

const inputCells = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ""];

function InputControl(props) {
  return (
    <ul className={classes.inputControl}>
      {inputCells.map((c, idx) => (
        <li className={classes.cell} key={idx}>
          {c !== "" ? (
            c
          ) : (
            <img src={eraser} className={classes.eraser} alt="eraser" />
          )}
        </li>
      ))}
    </ul>
  );
}

export default InputControl;
