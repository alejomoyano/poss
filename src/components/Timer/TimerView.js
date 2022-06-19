import React, { useEffect } from "react";
import { TimerController } from "./TimerController";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setObservers, notify } from "../../redux/slices/timer";

export const TimerView = () => {
  const dispatch = useDispatch();
  const { msg, minutes, seconds, status, subCycle, generalCycle } = useSelector(
    (state) => state.timer
  );


  useEffect ( ()=>{
    setObservers();
  }, [])

  useEffect(() => {
    dispatch(notify());
  }, [status]);


  return (
    <div className="box-container">
      <div>
        <span className="msg-text">{msg}</span>
      <div>
        <span className="general-cycle">General cycles: {generalCycle}</span>
        &nbsp;&nbsp;
      </div>
      <div>
      </div>
      <div className="timer">
        <span>{minutes < 10 ? "0" + minutes : minutes}:</span>
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <TimerController />
    </div>
    </div>
  );
};
