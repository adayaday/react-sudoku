import React from "react";
import classes from "./MainControl.module.css";
import { Button, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { GAME_TYPE, LEVEL } from "../../constants";

function MainControl(props) {
  const gameType = useSelector((state) => state.game.gameType);
  const level = useSelector((state) => state.game.level);
  const dispatch = useDispatch();
  const onGameTypeChange = (gameType) =>
    dispatch(actions.gameTypeChanged(gameType));
  const onLevelChange = (level) => dispatch(actions.levelChanged(level));
  const onNewGameStart = () => dispatch(actions.initNewGameLoading());
  const onGameReset = () => dispatch(actions.resetGame());

  let gameTypeRadioButtons = [];
  for (let key in GAME_TYPE) {
    const radioButton = (
      <Radio value={GAME_TYPE[key]} key={key}>
        {`x${GAME_TYPE[key]}`}
      </Radio>
    );
    gameTypeRadioButtons.push(radioButton);
  }

  let levelRadioButtons = [];
  for (let key in LEVEL) {
    const radioButton = (
      <Radio value={LEVEL[key]} key={key}>
        {key}
      </Radio>
    );
    levelRadioButtons.push(radioButton);
  }

  return (
    <div className={classes.main}>
      <Radio.Group
        onChange={(e) => onGameTypeChange(e.target.value)}
        value={gameType}
        className={classes.radioGroup}
      >
        {gameTypeRadioButtons}
      </Radio.Group>
      <Radio.Group
        onChange={(e) => onLevelChange(e.target.value)}
        value={level}
        className={classes.radioGroup}
      >
        {levelRadioButtons}
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
