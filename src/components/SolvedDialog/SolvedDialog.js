import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";

import butterfly from "../../asserts/images/butterfly.jpg";
import classes from "./SolvedDialog.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function SolvedDialog(props) {
  const { onClose, timeStr } = props;
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"Congratulations!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          You solved the sudoku in <b>{timeStr}</b>.
        </DialogContentText>
        <img src={butterfly} className={classes.img} alt="butterfly" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SolvedDialog;
