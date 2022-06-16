import React, { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeState } from "../../redux/slices/tasks";

export default function TaskStatesController({ taskId }) {
  const dispatch = useDispatch();
  // let value = 'active';
  const [state, setState] = useState("active");
  // const handleChangeState = (s) => {
  //   setState(s);
  //   console.log(state);
  //   console.log(taskId);
  //   const pack = {
  //     taskId,
  //     state,
  //   };
  //   dispatch(changeState(pack));
  // };

  // const dispatch = useDispatch();

  const stateSuspended = () => {
    setState("suspended");
    dispatch(changeState({ state: "suspended", taskId }));
  };
  const statePending = () => {
    setState("pending");
    dispatch(changeState({ state: "pending", taskId }));
  };
  const stateActive = () => {
    setState("active");
    dispatch(changeState({ state: "active", taskId }));
  };
  const stateTerminated = () => {
    setState("terminated");
    dispatch(changeState({ state: "terminated", taskId }));
  };
  return (
    <ToggleButtonGroup
      exclusive
      value={state}
      variant="outlined"
      color="primary"
      size="small"
    >
      <ToggleButton value="suspended" onClick={stateSuspended}>
        S
      </ToggleButton>
      <ToggleButton value="pending" onClick={statePending}>
        P
      </ToggleButton>
      <ToggleButton value="active" onClick={stateActive}>
        A
      </ToggleButton>
      <ToggleButton value="terminated" onClick={stateTerminated}>
        T
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
