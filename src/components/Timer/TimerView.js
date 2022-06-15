import React from "react";
import { TimerController } from "./TimerController";
//redux
import { useSelector } from "react-redux";

export const TimerView = () => {
  const { msg, minutes, seconds, status, subCycle, generalCycle } = useSelector(
    (state) => state.timer
  );

  return (
    <div className="box-container">
      <div>
        <span className="msg-text">{msg}</span>
      </div>
      <div>
        <span className="general-cycle">General cycles: {generalCycle}</span>
        &nbsp;&nbsp;
      </div>
      <div>
        <span className="sub-cycle">Sub cycles: {subCycle}</span>&nbsp;&nbsp;
      </div>
      <div className="timer">
        <span>{minutes < 10 ? "0" + minutes : minutes}:</span>
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <TimerController />
    </div>
  );
};
