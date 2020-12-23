import React from "react";
import { Button, Radio } from "antd";
import { LEVEL } from "../../constants";
import classes from "./NewGame.module.css";

function NewGame(props) {
  const levelSelectedHandler = (e) => {};

  return (
    <div className={classes.NewGame}>
      <Radio.Group
        onChange={levelSelectedHandler}
        value={LEVEL.Easy}
        className={classes.radioGroup}
      >
        <Radio value={LEVEL.Easy}>easy</Radio>
        <Radio value={LEVEL.Medium}>medium</Radio>
        <Radio value={LEVEL.Hard}>hard</Radio>
      </Radio.Group>
      <Button type="primary">Start New Game</Button>
    </div>
  );
}

export default NewGame;
