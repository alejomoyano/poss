import React, { useState } from "react";
import TimerView from "./TimerView";
import Buttons from "./Buttons";
import Swal from "sweetalert2";
import "../../App.css";

function TimerFunctionality() {
  const [subCycleCount, setSubCycleCount] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const [actualMinutes, setActualMinutes] = useState(0);
  const [actualSeconds, setActualSeconds] = useState(0);

  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const [msg, setMsg] = useState("Configure los timers para comenzar");

  //En estas variables guardamos los valores que ingresa el usuario y no son modificadas durante la ejecucion.

  const [userStudyTime, setUserStudyTime] = useState();
  const [userShortBreak, setUserShortBreak] = useState();
  const [userLongBreak, setUserLongBreak] = useState();

  //Variables para incrementar los ciclos y luego guardarlas en el estado generales.

  let updateSubCycleCount = subCycleCount;
  let updateCycleCount = cycleCount;

  //Variables que se decrementan como temporizadores, sirven para no modificar las introducidas por el usuario.

  let updateMinutes = actualMinutes;
  let updateSeconds = actualSeconds;

  // Inicio configurando el Timer y guardando los valores iniciales que ingresa el usuario.

  const configTimes = () => {
    Swal.fire({
      title: "Timer Configuration",
      html: `<input type="number" id="study-time" class="study-time" min="0" max="60" placeholder="Study Time"><br>
     <input type="number" id="short-break" class="short-break" min="0" max="60" placeholder="Short Break Time"><br>
     <input type="number" id="long-break" class="long-break" min="0" max="60" placeholder="Long Break Time">`,
      confirmButtonText: "Confirm",
      allowOutsideClick: false,
      allowEscapeKey: false,
      focusConfirm: false,
      preConfirm: () => {
        const configStudyTime =
          Swal.getPopup().querySelector("#study-time").value;
        const configShortBreak =
          Swal.getPopup().querySelector("#short-break").value;
        const configLongBreak =
          Swal.getPopup().querySelector("#long-break").value;
        if (!configStudyTime || !configShortBreak || !configLongBreak) {
          Swal.showValidationMessage(`Please configure the timer`);
        }
        return {
          configStudyTime: configStudyTime,
          configShortBreak: configShortBreak,
          configLongBreak: configLongBreak,
        };
      },
    }).then((result) => {
      Swal.fire({
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        allowEscapeKey: false,
        focusConfirm: false,
        title: `Study Time: ${result.value.configStudyTime} minutes
          Short Break Time: ${result.value.configShortBreak} minutes
          Long Break Time: ${result.value.configLongBreak} minutes`.trim(),
      });
      setSubCycleCount(0);
      setMsg("Study Time");
      setStatus(1);
      if (status === 4) {
        backToStart();
      }
      setUserStudyTime(result.value.configStudyTime);
      setActualMinutes(result.value.configStudyTime);
      setUserShortBreak(result.value.configShortBreak);
      setUserLongBreak(result.value.configLongBreak);
    });
  };

  //  Study Time functions

  const studyStart = () => {
    if (status === 1) {
      updateSubCycleCount += 1;
      setSubCycleCount(updateSubCycleCount);
      if (updateSubCycleCount === 4) {
        updateCycleCount += 1;
        setCycleCount(updateCycleCount);
      }
    }
    clearInterval(interv);
    if (actualMinutes === 0 && actualSeconds === 0) {
      alert("Setear tiempo de estudio");
    } else {
      studyRun();
      setStatus(5);
      setInterv(setInterval(studyRun, 5));
    }
  };

  const studyRun = () => {
    if (updateSeconds === 0) {
      if (updateMinutes !== 0) {
        updateMinutes--;
        updateSeconds = 59;
        setActualMinutes(updateMinutes);
        setActualSeconds(updateSeconds);
      } else {
        setActualMinutes(userShortBreak);
        setMsg("Short Break Time");
        setStatus(2);
      }
      if (subCycleCount >= 3 && updateSeconds === 0 && updateMinutes === 0) {
        setMsg("Long Break Time");
        setStatus(3);
        clearInterval(interv);
        setActualMinutes(userLongBreak);
      }
    } else {
      updateSeconds--;
      setActualMinutes(updateMinutes);
      setActualSeconds(updateSeconds);
    }
  };

  //  Short Break functions

  const shortBreakStart = () => {
    clearInterval(interv);
    setStatus(7);
    shortBreakRun();
    setInterv(setInterval(shortBreakRun, 5));
  };

  const shortBreakRun = () => {
    if (updateSeconds === 0) {
      if (updateMinutes !== 0) {
        updateMinutes--;
        updateSeconds = 59;
        setActualMinutes(updateMinutes);
        setActualSeconds(updateSeconds);
      } else {
        setActualMinutes(userStudyTime);
        setMsg("Study Time");
        setStatus(1);
      }
    } else {
      updateSeconds--;
      setActualMinutes(updateMinutes);
      setActualSeconds(updateSeconds);
    }
  };

  // Long Break functions

  const longBreakStart = () => {
    clearInterval(interv);
    setStatus(9);
    longBreakRun();
    setInterv(setInterval(longBreakRun, 5));
  };

  const longBreakRun = () => {
    if (updateSeconds === 0) {
      if (updateMinutes !== 0) {
        updateMinutes--;
        updateSeconds = 59;
      } else {
        setStatus(4);
      }
    } else {
      updateSeconds--;
    }
    setActualMinutes(updateMinutes);
    setActualSeconds(updateSeconds);
  };

  // General functions

  const stop = () => {
    if (status === 5) {
      clearInterval(interv);
      setStatus(6);
    } else if (status === 7) {
      clearInterval(interv);
      setStatus(8);
    } else if (status === 9) {
      clearInterval(interv);
      setStatus(10);
    }
  };

  const resume = () => {
    if (status === 6) {
      studyStart();
      setStatus(5);
    } else if (status === 8) {
      shortBreakStart();
      setStatus(7);
    } else if (status === 10) {
      longBreakStart();
      setStatus(9);
    }
  };

  const backToStart = () => {
    setSubCycleCount(0);
    setMsg("Study Time");
    setActualMinutes(userStudyTime);
    clearInterval(interv);
    if (status === 4) {
      setStatus(1);
    }
  };

  const skip = () => {
    clearInterval(interv);
    if (status === 5 || (status === 6 && subCycleCount <= 3)) {
      setStatus(2);
      setMsg("Short Break Time");
      setActualMinutes(userShortBreak);
      setActualSeconds(0);
    } else if (status === 7 || status === 8 || (status === 6 && subCycleCount > 3)) {
      setStatus(3);
      setMsg("Long Break Time");
      setActualMinutes(userLongBreak);
      setActualSeconds(0);
    }
  };

  return (
    <div className="timerFunctionality">
      <span className="msg-text">{msg}</span>

      <TimerView
        status={status}
        subCycleCount={subCycleCount}
        cycleCount={cycleCount}
        actualMinutes={actualMinutes}
        actualSeconds={actualSeconds}
      />

      <Buttons
        status={status}
        subCycleCount={subCycleCount}
        studyStart={studyStart}
        configTimes={configTimes}
        shortBreakStart={shortBreakStart}
        longBreakStart={longBreakStart}
        backToStart={backToStart}
        stop={stop}
        resume={resume}
        skip={skip}
      />
    </div>
  );
}

export default TimerFunctionality;
