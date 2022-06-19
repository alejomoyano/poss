import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//redux
import {
  setMinutes,
  setSeconds,
  setStatus,
  incrementSubCycle,
  incrementGeneralCycle,
  resetSubCycles,
  defaultShortBreak,
  defaultLongBreak,
  defaultStudyTime,
  setTimes
} from "../../redux/slices/timer";

export const TimerController = () => {
  const dispatch = useDispatch();
  const {
    minutes,
    seconds,
    status,
    subCycle
  } = useSelector((state) => state.timer);

  //Variables necesarias para actualizar el timer en tiempo real

  const [interv, setInterv] = useState();
  let secTemp = seconds;
  let minTemp = minutes;
  //Study functions

  const startStudy = () => {
    if (status === 1) {
      dispatch(incrementSubCycle());
    }
    if (subCycle === 4) {
      dispatch(incrementGeneralCycle());
    }
    clearInterval(interv);
    if (seconds === 0 && minutes === 0) {
      alert("Configure the timer");
    }
    dispatch(setStatus(4));
    runStudy();
    setInterv(setInterval(runStudy, 5));
  };

  const runStudy = () => {
    if (subCycle === 4 && minTemp === 0 && secTemp === 0) {
      clearInterval(interv);
      dispatch(defaultLongBreak());
    } else if (minTemp === 0 && secTemp === 0) {
      clearInterval(interv);
      dispatch(defaultShortBreak());
    }
    run();
  };

  //Short break functions

  const startShortBreak = () => {
    clearInterval(interv);
    dispatch(setStatus(6));
    runShortBreak();
    setInterv(setInterval(runShortBreak, 5));
  };

  const runShortBreak = () => {
    if (minTemp === 0 && secTemp === 0) {
      clearInterval(interv);
      dispatch(defaultStudyTime());
    }
    run();
  };

  //Long break functions

  const startLongBreak = () => {
    clearInterval(interv);
    dispatch(setStatus(7));
    runLongBreak();
    setInterv(setInterval(runLongBreak, 5));
  };

  const runLongBreak = () => {
    if (minTemp === 0 && secTemp === 0) {
      clearInterval(interv);
      dispatch(setStatus(5));
    }
    run();
  };

  const run = () => {
    if (secTemp === 0) {
      if (minTemp !== 0) {
        minTemp--;
        secTemp = 59;
        dispatch(setMinutes(minTemp));
        dispatch(setSeconds(secTemp));
      }
    } else {
      secTemp--;
      dispatch(setMinutes(minTemp));
      dispatch(setSeconds(secTemp));
    }
  };

  // General functions

  const backToBeginning = () => {
    clearInterval(interv);
    dispatch(resetSubCycles());
    dispatch(defaultStudyTime());
  };

  const resume = () => {
    if(status === 4){
      clearInterval(interv);
      dispatch(setStatus(1));
      startStudy();
    } else if (status === 6){
      clearInterval(interv);
      dispatch(setStatus(2));
      startShortBreak();
    } else if (status === 7){
      clearInterval(interv);
      dispatch(setStatus(3));
      startLongBreak();
    }
  };

  const stop = () => {
    clearInterval(interv);
  };

  const configTimes = () => {
    dispatch(defaultStudyTime());
    dispatch(resetSubCycles());
    clearInterval(interv);
    dispatch(setTimes());
  };

  const goToShortBreak = () => {
    clearInterval(interv);
    if(subCycle === 4){
      dispatch(resetSubCycles());
    }
    dispatch(defaultShortBreak());
  }

  const goToLongBreak = () => {
    clearInterval(interv);
    dispatch(defaultLongBreak());
  }
  const goToStudyTime = () => {
    clearInterval(interv);
    dispatch(defaultStudyTime());
  }

  return (
    <Fragment>
      {status !== 0 ? <div className="btn-container">
        <button className="defaults-btn" onClick={goToStudyTime}>Study Time</button>
        <button className="defaults-btn" onClick={goToShortBreak}>Short Break</button>
        <button className="defaults-btn" onClick={goToLongBreak}>Long Break</button>
      </div> : ""}
      {status === 0 ? <button onClick={configTimes}>Config</button> : ""}
      <Fragment>
        {status === 1 ? (
          <button onClick={startStudy}>Start study</button>
        ) : status === 2 ? (
          <button onClick={startShortBreak}>Start short break</button>
        ) : status === 3 ? (
          <button onClick={startLongBreak}>Start long break</button>
        ) : (
          ""
        )}
      </Fragment>
      {(status === 4 || status === 6 || status === 7) ? (
        <Fragment>
          <button onClick={stop}>Stop</button>
          <button onClick={resume}>Resume</button>
        </Fragment>
      ) : (
        ""
      )}
      {status === 5 ? (
        <Fragment>
          <button onClick={backToBeginning}>Back to beginning</button>
          <button onClick={configTimes}>Config</button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

/*
Estados: 
0- Configurar el timer
1- Start study time
2- Start short break
3- Start long break
4, 6, 7 - Stop, Resume
5- Volver, Config
*/
