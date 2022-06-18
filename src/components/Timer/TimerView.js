import React from "react";
import { TimerController } from "./TimerController";
//redux
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setObservers } from "../../redux/slices/timer";

export const TimerView = () => {
  // const dispatch = useDispatch();
  const { msg, minutes, seconds, status, subCycle, generalCycle } = useSelector(
    (state) => state.timer
  );

  // useEffect ( ()=>{
  //   setObservers();
  // }, [])

  return (
    <div className="timer-container">
      <div className="msg-text">
        <span>{msg}</span>
      </div>
      <div className="general-cycle">
        <span>General cycles: {generalCycle}</span>
        &nbsp;&nbsp;
      </div>
      <div className="sub-cycle">
        <span >Sub cycles: {subCycle}</span>&nbsp;&nbsp;
      </div>
      <div className="timer">
        <span>{minutes < 10 ? "0" + minutes : minutes}:</span>
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <TimerController />
    </div>
  );
};
