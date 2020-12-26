import React, { useEffect, useRef, useState } from "react";

import classes from "./Game.module.css";
import { Timer, LayersClear } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { getKeyChar } from "../../shared/utility";
import { Button } from "@material-ui/core";
import Board from "./Board/Board";
import InputControl from "../../components/InputControl/InputControl";
import SolvedDialog from "../../components/SolvedDialog/SolvedDialog";

function Game(props) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedNum, setSelectedNum] = useState("0");
  const [solvedModalOpen, setSolvedModalOpen] = useState(false);
  const [time, setTime] = useState(0);
  const initialTime = useRef(new Date().getTime());
  const setTimeCallback = useRef((t) => setTime(t));

  const remainingCount = useSelector((state) => state.game.remainingCount);
  const gameType = useSelector((state) => state.game.gameType);
  const isPlaying = useSelector((state) => state.game.isPlaying);
  const solved = useSelector((state) => state.game.solved);

  const dispatch = useDispatch();
  const onCellValueChanged = (index, value) =>
    dispatch(actions.cellValueChanged(index, value));
  const onPlayingStarted = () => dispatch(actions.playingStarted());

  const cellValueChangedHandler = (index, value) => {
    onCellValueChanged(index, value);
    setSelectedIndex(null);
  };

  const cellClickedHandler = () => {
    onPlayingStarted();
  };

  const inputControlClickedHandler = (keyStr) => {
    onPlayingStarted();
    const keyChar = getKeyChar(keyStr);
    if (selectedIndex !== null) {
      cellValueChangedHandler(selectedIndex, keyChar);
    }
    setSelectedNum(keyChar);
  };

  const timerClickedHandler = () => {
    setTime(0);
    initialTime.current = new Date().getTime();
  };

  useEffect(() => {
    if (solved) {
      setSolvedModalOpen(true);
      return;
    }
    if (!isPlaying) {
      setSelectedNum(null);
      setSelectedIndex(null);
      setTime(0);
    } else {
      initialTime.current = new Date().getTime();
      const timer = setInterval(() => {
        const delay = new Date().getTime() - initialTime.current;
        setTimeCallback.current(delay / 1000);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [setSelectedNum, setSelectedIndex, isPlaying, solved]);

  return (
    <div className={classes.Game}>
      <div className={classes.topControl}>
        {solvedModalOpen ? (
          <SolvedDialog
            onClose={() => setSolvedModalOpen(false)}
            timeStr={new Date(time * 1000).toISOString().substr(11, 8)}
          />
        ) : null}
        <Button
          color="secondary"
          onClick={timerClickedHandler}
          startIcon={<Timer />}
        >
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LayersClear />}
          onClick={() => {
            setSelectedIndex(null);
            setSelectedNum("0");
          }}
        >
          Clear Selection
        </Button>
      </div>
      <Board
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        selectedNum={selectedNum}
        setSelectedNum={setSelectedNum}
        onCellClicked={cellClickedHandler}
        onCellValueChanged={cellValueChangedHandler}
      />
      <InputControl
        gameType={gameType}
        selectedNum={selectedNum}
        remainingCount={remainingCount}
        onClick={inputControlClickedHandler}
      />
    </div>
  );
}

export default Game;
