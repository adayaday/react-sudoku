import React from "react";
import logo from "../../asserts/images/logo.svg";
import classes from "./TopBar.module.css";

function TopBar(props) {
  return (
    <div>
      <header className={classes.header}>
        <img src={logo} className={classes.logo} alt="logo" />
        <p>Sudoku</p>
      </header>
    </div>
  );
}

export default React.memo(TopBar);
