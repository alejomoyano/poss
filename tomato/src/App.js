import React, { useState } from 'react'
import Pomodoro from './components/Pomodoro'
import Buttons from './components/Buttons'
import Message from './components/Message'
//import ResetButton from './components/ResetButton'
import './App.css'

function App() {

  const initialMinutes = 0;
  const initialSeconds = 0;
  let breakMsg = 'Break Time';
  let studyMsg = 'Study Time';
  let configMsg = 'Timer Configuration'

  //const [time, setTime] = useState({m:initialMinutes, s:initialSeconds})
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [msg, setMsg] = useState(studyMsg);
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  //Not started = 0
  //started = 1
  //stopped = 2
  //break = 3
  //back to study = 4
  //config = 5
  //breakTime solo muestra Start = 6


  var updateM = minutes,
      updateS = seconds;

  const start = () => {
    if(minutes === 0 && seconds === 0){
      alert('Debe configurar el Timer antes de comenzar');
    } else {
      run();
      setStatus(1);
      setInterv(setInterval(run, 1000));
    }
  }
      
  const run = () => {
    if(updateS === 0){
      if(updateM !== 0){
        updateS = 59;
        updateM--;
      } else{
        setStatus(3);
      }
      
    } else {
      updateS--;
    }
    setMinutes(updateM);
    setSeconds(updateS);
    //return setTime({m:updateM, s:updateS});
  }

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  }

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    //return setTime({m:initialMinutes, s:initialSeconds});
  }

  const resume = () => start();

  const run2 = () => {
    if(updateS === 0){
      if(updateM !== 0){
        updateS = 59;
        updateM--;
      } else{
        setStatus(4);
      }
      
    } else {
      updateS--;
    }
    setMinutes(updateM);
    setSeconds(updateS);
    //return setTime({m:updateM, s:updateS});
  }

  const breakRun = () =>{
    setInterv(setInterval(run2, 1000));
    if(updateS === 0){
      if(updateM !== 0){
        updateS = 59;
        updateM--;
      }
    } else {
      updateS--;
    }
    setMinutes(updateM);
    setSeconds(updateS);
    //setTime({m:updateM, s:updateS});
  }

  const breakTime = () =>{
    clearInterval(interv);
    setMinutes(0);
    setSeconds(8);
    //setTime({m:0 ,s:8});
    setMsg(breakMsg);
    setStatus(6);
  }

  const backToStudy = () => {
    clearInterval(interv);
    setMsg(studyMsg);
    reset();
  }

  const configTimer = () => {
    setStatus(5);
    setMsg(configMsg);
    if(status === 5){
      setStatus(0);
    }
  }

  const addTimer = () => {
    if(minutes >= 0 && minutes < 60){
      setMinutes(minutes + 5);
    } else {
      alert('Limite de tiempo de ciclo alcanzado');
    }

  }

  const subTimer = () => {
    if(minutes > 0){
      setMinutes(minutes - 5);
    } else {
      alert('No se puede restar')
    }

  }
  
  const backFromConfig = () => {
    setMsg(studyMsg);
    setStatus(0);
  }

  const goToBreak = () => {
    if(status !== 2){
      alert('Debe parar el timer');
    }else{
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
      setStatus(3);
    }

  }

  return (
    <div className='App'>
      <Message msg={msg}/>
      <Pomodoro minutes={minutes} seconds={seconds} status={status}/>
      <Buttons status={status} stop={stop} reset={reset} resume={resume} start={start} 
      breakTime={breakTime} breakRun={breakRun} goToBreak={goToBreak} backToStudy={backToStudy} 
      configTimer={configTimer} addTimer={addTimer} subTimer={subTimer} backFromConfig={backFromConfig}/>
    </div>
  )
}

export default App

/*
if(status === 3){
  setStatus(0);
}*/