import React, { useEffect, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../../redux/slices/tasks";

export default function StateSelector({ taskId }) {
  const dispatch = useDispatch();
  const [state, setState] = useState("active");

  const {
    value:{tasks}, timerState 
 } = useSelector((state) => state.task);

 useEffect(() => {
  tasks.forEach((task) => {
    if(task.date === taskId){
      setState(task.state)
    }
  })
},[timerState])


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
