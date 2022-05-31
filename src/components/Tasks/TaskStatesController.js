import React from "react";
import { ButtonGroup, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeState } from "../../reducers/taskReducer";

export default function TaskStatesController({ taskId }) {
  const dispatch = useDispatch();


  const stateSuspended = () => {
    dispatch(changeState("suspended", taskId));
  };
  const statePending = () => {
    dispatch(changeState("pending", taskId));
  };
  const stateActive = () => {
    dispatch(changeState("active", taskId));
  };
  const stateTerminated = () => {
    dispatch(changeState("terminated", taskId));
  };
  return (
    <ButtonGroup exclusive variant="outlined" color="primary" size="small">
      <Button variant="text" onClick={stateSuspended}>
        S
      </Button>
      <Button variant="text" onClick={statePending}>
        P
      </Button>
      <Button variant="text" onClick={stateActive}>
        A
      </Button>
      <Button variant="text" onClick={stateTerminated}>
        T
      </Button>
    </ButtonGroup>
  );
}
