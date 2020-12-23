import React from "react";
import classes from "./MainControl.module.css";
import NewGame from "../../components/NewGame/NewGame";

function MainControl(props) {
  return (
    <div className={classes.main}>
      <NewGame />
      Main Control
    </div>
  );
}

export default MainControl;
