import React from "react";
import classes from "./MainControl.module.css";
import { Button, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { LEVEL } from "../../constants";

function MainControl(props) {
  const level = useSelector((state) => state.game.level);
  const dispatch = useDispatch();
  const onLevelChange = (level) => dispatch(actions.levelChanged(level));
  const onNewGameStart = () => dispatch(actions.initNewGameLoading());
  const onGameReset = () => dispatch(actions.resetGame());

  let radioButtons = [];
  for (let key in LEVEL) {
    const radioButton = (
      <Radio value={LEVEL[key]} key={key}>
        {key}
      </Radio>
    );
    radioButtons.push(radioButton);
  }

  return (
    <div className={classes.main}>
      <Radio.Group
        onChange={(e) => onLevelChange(e.target.value)}
        value={level}
        className={classes.radioGroup}
      >
        {radioButtons}
      </Radio.Group>
      <Button type="primary" onClick={onNewGameStart}>
        New Game
      </Button>
      <Button type="primary" onClick={onGameReset}>
        Reset
      </Button>
    </div>
  );
}

export default MainControl;
