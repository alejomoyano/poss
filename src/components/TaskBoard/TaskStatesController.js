import React, { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export default function TaskStatesController({ taskId }) {
  const [state, setState] = useState("active");
  // const dispatch = useDispatch();

  // const stateSuspended = () => {
  //   dispatch(changeState("suspended", taskId));
  // };
  // const statePending = () => {
  //   dispatch(changeState("pending", taskId));
  // };
  // const stateActive = () => {
  //   dispatch(changeState("active", taskId));
  // };
  // const stateTerminated = () => {
  //   dispatch(dispatch("terminated", taskId));
  // };
  return (
    <ToggleButtonGroup exclusive value={state} variant="outlined" color="primary" size="small">
      <ToggleButton
        value="suspended"
        onClick={() => {
          setState("suspended");
          console.log(state);
        }}
      >
        S
      </ToggleButton>
      <ToggleButton
        value="pending"
        onClick={() => {
          setState("pending");
          console.log(state);
        }}
      >
        P
      </ToggleButton>
      <ToggleButton
        value="active"
        onClick={() => {
          setState("active");
          console.log(state);
        }}
      >
        A
      </ToggleButton>
      <ToggleButton
        value="terminated"
        onClick={() => {
          setState("terminated");
          console.log(state);
        }}
      >
        T
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
