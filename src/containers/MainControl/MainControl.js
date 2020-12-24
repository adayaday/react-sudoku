import React from "react";
import classes from "./MainControl.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { GAME_TYPE, LEVEL } from "../../constants";
import {
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";

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
      <FormControlLabel
        key={key}
        value={GAME_TYPE[key]}
        control={<Radio color="primary" />}
        label={`x${GAME_TYPE[key]}`}
      />
    );
    gameTypeRadioButtons.push(radioButton);
  }

  let levelRadioButtons = [];
  for (let key in LEVEL) {
    const radioButton = (
      <FormControlLabel
        key={key}
        value={LEVEL[key]}
        control={<Radio color="primary" />}
        label={key}
      />
    );
    levelRadioButtons.push(radioButton);
  }

  return (
    <div className={classes.main}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Game Type</FormLabel>
        <RadioGroup
          row
          aria-label="gameType"
          name="gameType"
          value={gameType}
          onChange={(e) => onGameTypeChange(parseInt(e.target.value))}
        >
          {gameTypeRadioButtons}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Difficulty Level</FormLabel>
        <RadioGroup
          row
          aria-label="level"
          name="level"
          value={level}
          onChange={(e) => onLevelChange(e.target.value)}
        >
          {levelRadioButtons}
        </RadioGroup>
      </FormControl>
      <Button variant="outlined" color="primary" onClick={onNewGameStart}>
        New Game
      </Button>
      <Button variant="outlined" color="primary" onClick={onGameReset}>
        Reset
      </Button>
    </div>
  );
}

export default MainControl;
