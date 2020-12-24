import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { GAME_TYPE, LEVEL } from "../../constants";
import classes from "./NewGame.module.css";

function NewGame(props) {
  const { gameType, level, onStart, onClose } = props;
  const [newGameType, setNewGameType] = useState(gameType);
  const [newLevel, setNewLevel] = useState(level);

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
    <Dialog onClose={onClose} aria-labelledby="form-dialog-title" open={true}>
      <DialogTitle id="form-dialog-title">Start New Game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select Game Type And Game Level To Start
        </DialogContentText>
        <div className={classes.radioDiv}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Game Type</FormLabel>
            <RadioGroup
              row
              aria-label="gameType"
              name="gameType"
              value={newGameType}
              onChange={(e) => setNewGameType(parseInt(e.target.value))}
            >
              {gameTypeRadioButtons}
            </RadioGroup>
          </FormControl>
        </div>
        <div className={classes.radioDiv}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Difficulty Level</FormLabel>
            <RadioGroup
              row
              aria-label="level"
              name="level"
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
            >
              {levelRadioButtons}
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onStart(newGameType, newLevel)} color="primary">
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewGame;
