import React from "react";
import butterfly from "../../asserts/images/butterfly.png";
import classes from "./TopBar.module.css";

function TopBar(props) {
  return (
    <div>
      <header className={classes.header}>
        <img src={butterfly} className={classes.logo} alt="logo" />
        <p>Sudoku</p>
      </header>
    </div>
  );
}

export default React.memo(TopBar);
