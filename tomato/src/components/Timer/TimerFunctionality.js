import React, {startTransition, useState} from 'react'
import TimerView from './TimerView';
//import TimerView from './TimerView'
import Buttons from './Buttons'
//import Message from './Message'

function TimerFunctionality() {

const initialMinutes = 0;
const initialSeconds = 0;
const [subCycleCount, setSubCycleCount] = useState(0);
const [cycleCount, setCycleCount] = useState(0);
const [studyMinutes, setStudyMinutes] = useState(initialMinutes);
const [studySeconds, setStudySeconds] = useState(initialSeconds);
const [shortBreakMinutes, setShortBreakMinutes] = useState(initialMinutes);
const [shortBreakSeconds, setShortBreakSeconds] = useState(initialSeconds);
const [longBreakMinutes, setLongBreakMinutes] = useState(initialMinutes);
const [longBreakSeconds, setLongBreakSeconds] = useState(initialSeconds);
const [interv, setInterv] = useState();
const [status, setStatus] = useState(0);

const [userStudyTime, setUserStudyTime] = useState();
const [userShortBreak, setUserShortBreak] = useState();
const [userLongBreak, setUserLongBreak] = useState();

let updateSubCycleCount = subCycleCount;
let updateCycleCount = cycleCount;

const studyStart = () => {
clearInterval(interv);
if(studyMinutes === 0 && studySeconds === 0){
  alert("Setear tiempo de estudio");
} else{
  studyRun();
  setStatus(5);
  setInterv(setInterval(studyRun, 1000));
}
}

let updateStudyMin = studyMinutes;
let updateStudySecs = studySeconds;

const studyRun = () => {
if(updateStudySecs === 0){
  if(updateStudyMin !== 0){
    updateStudyMin--;
    updateStudySecs = 59;
  } else{
    if(updateStudySecs === 0){
      setShortBreakMinutes(userShortBreak);
      setStatus(2);
    }
  }
} else {
  updateStudySecs--;
}
setStudyMinutes(updateStudyMin);
setStudySeconds(updateStudySecs);
}

const stopStudy = () => {
  clearInterval(interv);
  setStatus(6);
}

const resumeStudy = () => {
    studyStart();
    setStatus(5);
}

const shortBreakStart = () =>{
  if(status === 2){
    updateSubCycleCount += 1;
    setSubCycleCount(updateSubCycleCount);
    if(updateSubCycleCount === 4){
      updateCycleCount += 1;
      setCycleCount(updateCycleCount);
    }
  }
  clearInterval(interv);
  setStatus(7);
  shortBreakRun();
  setInterv(setInterval(shortBreakRun, 1000));
}

let updateShortBreakMin = shortBreakMinutes;
let updateShortBreakSecs = shortBreakSeconds;

const shortBreakRun = () => {
  if(updateShortBreakSecs === 0){
    if(updateShortBreakMin !== 0){
      updateShortBreakMin--;
      updateShortBreakSecs = 59;
    } else{
      if(subCycleCount === 3){
        setStatus(3);
        clearInterval(interv);
      } else{
        setStudyMinutes(userStudyTime);
        setStatus(1);
      }
    }
  } else {
    updateShortBreakSecs--;
  }
  setShortBreakMinutes(updateShortBreakMin);
  setShortBreakSeconds(updateShortBreakSecs);
}

const stopShortBreak = () => {
  clearInterval(interv);
  setStatus(8);
}

const resumeShortBreak = () => {
  shortBreakStart();
  setStatus(7);
}

const longBreakStart = () =>{
  clearInterval(interv);
  setStatus(9);
  longBreakRun();
  setInterv(setInterval(longBreakRun, 1000));
}

let updateLongBreakSecs = longBreakSeconds;
let updateLongBreakMin = longBreakMinutes;


const longBreakRun = () => {
  if(updateLongBreakSecs === 0){
    if(updateLongBreakMin !== 0){
      updateLongBreakMin--;
      updateLongBreakSecs = 59;
    } else {
      setStatus(4);
    }
  } else {
    updateLongBreakSecs--;
  }
  setLongBreakMinutes(updateLongBreakMin);
  setLongBreakSeconds(updateLongBreakSecs);
}

const stopLongBreak = () => {
  clearInterval(interv);
  setStatus(10);
}

const resumeLongBreak = () => {
  longBreakStart();
  setStatus(9);
}

const backToStart = () => {
  setSubCycleCount(0);
  setStudyMinutes(userStudyTime);
  setShortBreakMinutes(userShortBreak);
  setLongBreakMinutes(userLongBreak);
  clearInterval(interv);
  if(status === 4){
    setStatus(1);
  }
}

const configTimes = () => {
  let number = prompt('Ingrese minutos de estudio');
  if(Number(number) && Number(number) <=60 && Number(number) > 0){
    setStudyMinutes(number);
    setUserStudyTime(number);
  } else {
    alert('Numero inválido, asignado predeterminado 5 minutos');
    setStudyMinutes(5);
    setUserStudyTime(5);
  }

  let number1 = prompt('Ingrese minutos de short break');
  if(Number(number1) && Number(number1) <=60 && Number(number1) > 0){
    setShortBreakMinutes(number1);
    setUserShortBreak(number1);
  } else{
    alert('Numero inválido, asignado predeterminado 5 minutos');
    setShortBreakMinutes(5);
    setUserShortBreak(5);
  }

  let number3 = prompt('Ingrese minutos de long break');
  if(Number(number3) && Number(number3) <=60 && Number(number3) > 0){
    setLongBreakMinutes(number3);
    setUserLongBreak(number3);
  } else{
    alert('Numero inválido, asignado predeterminado 5 minutos');
    setLongBreakMinutes(5);
    setUserLongBreak(5);
  }
  setSubCycleCount(0);
  setStatus(1);
}

return (
  <div>

      <TimerView studyMinutes={studyMinutes} studySeconds={studySeconds} status={status} 
      shortBreakMinutes={shortBreakMinutes} shortBreakSeconds={shortBreakSeconds} longBreakMinutes={longBreakMinutes} 
      longBreakSeconds={longBreakSeconds} subCycleCount={subCycleCount} cycleCount={cycleCount}/>

      <Buttons status={status} studyStart={studyStart} configTimes={configTimes} studyMinutes={studyMinutes} 
      shortBreakStart={shortBreakStart} longBreakStart={longBreakStart} backToStart={backToStart} stopStudy={stopStudy} 
      resumeStudy={resumeStudy} stopShortBreak={stopShortBreak} resumeShortBreak={resumeShortBreak} stopLongBreak={stopLongBreak}
      resumeLongBreak={resumeLongBreak}/>

  </div>
)
}

export default TimerFunctionality













/*
    const initialMinutes = 0;
    const initialSeconds = 0;
    const breakMinutes = 0;
    const breakSeconds = 0;
    let breakMsg = 'Break Time';
    let studyMsg = 'Study Time';
    let configMsg = 'Study Timer Configuration'
    let configBreakMsg = 'Break Timer Configuration'
    let welcomeMsg = 'Pomodoro Study Sesion'
  
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [breakMin, setBreakMinutes] = useState(breakMinutes);
    const [breakSec, setBreakSeconds] = useState(breakSeconds);
    const [msg, setMsg] = useState(welcomeMsg);
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);

    
    --------------------- EXPLICACIÓN DE ESTADOS (STATUS), LO QUE SE MUESTRA Y FUNCIONALIDADES --------------------- 
    Están de forma desordenada dado que a medida que avanzaba en el programa tuve que ir agregando
    funcionalidades dependiendo las vistas y las acciones que se tomen.

      NOT STARTED = 0
          Muestra solo el botón de Configuraciónes y el Start.
      STARTED = 1
          Muestra el STOP, RESET y Go to Break, acá para ir al Break es necesario
          pausar el timer (STOP) para que no se corrompa el Timer. Esto lanza una alerta
          si se intenta ir al Break sin haberlo pausado.
      STOPPED = 2
          Cuando se pulsa STOP y se pausa el Timer, se pasa a este estado 2 donde se muestran
          los botones de RESUME, RESET y Go to Break como el anterior, pero ahora si permite
          cambiar a Break Time.

      BREAK = 3 (ELIMINADO)
          Si pulsamos Go to Break, pasamos al estado 3 y nos aparece el botón SET BREAK, este
          setea el contador en el tiempo de descanso predeterminado (esto hay que cambiarlo cuando
          el tiempo sea configurable). (ELIMINADO)

      BACK TO STUDY = 6
          Al setear el timer en Break, nos aparece el START y el BACK TO STUDY. Si iniciamos
          arranca el Timer, si clickeamos BACK TO STUDY nos lleva al inicio del Timer.
      STOP y BACK TO STUDY = 7
          Al arrancar el timer, nos aparece los botones para detenerlo (STOP) y para volver
          al inicio (BACK TO STUDY), este último solo se acciona cuando esta en STOP el Timer.
      STOP y BACK TO STUDY = 8
          Al parar el timer (STOP) en el Break Time, podemos seguir con el tiempo (RESUME) o
          podemos volver al inicio con el BACK TO STUDY, que al estar STOP el timer, te lo permite.
      CONFIG STUDY = 5
          Si clickeamos el engranaje de configuración, nos aparecen los botones para sumar 5 minutos (+),
          substraer 5 minutos (-) y guardar y volver con ese valor modificado (SAVE).
      BACK TO STUDY FINAL = 4
            Cuando termina el break, aparece el botón BACK TO STUDY para volver al inicio
      CONFIG BREAK = 9
            Cuando clickeamos el engranaje para configurar el Study Time y guardamos (SAVE), nos lleva a la
            pantalla de configuración del Break Time con los mismos botones pero referenciado a las variables
            correspondientes a Break.
      

  
    var updateStudyMin = minutes,
        updateStudySecs = seconds;
  
    const start = () => {
      if(minutes === 0 && seconds === 0){
        alert("setear timer")
       Swal.fire({
          title: 'You must set the Timer before you start.',
          icon: 'info',
          button: 'OK',
          customClass: 'background-swal',
          iconColor: '#07C2DF',
          confirmButtonColor: '#07C2DF',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      } else {
        run();
        setStatus(1);
        setInterv(setInterval(run, 1000));
      }
    }
        
    const run = () => {
      if(updateStudySecs === 0){
        if(updateStudyMin !== 0){
          updateStudySecs = 59;
          updateStudyMin--;
        } else{
          setStatus(3);
        }
        
      } else {
        updateStudySecs--;
      }
      setMinutes(updateStudyMin);
      setSeconds(updateStudySecs);
    }
  
    const stop = () => {
      clearInterval(interv);
      setStatus(2);
    }
  
    const reset = () => {
      if(status === 2 || status === 1){
        stop();
        Swal.fire({
          title: 'Are you sure?',
          text: 'This action will reset the values and return to the start.',
          icon: 'warning',
          customClass: 'background-swal',
          confirmButtonText: 'Continue',
          confirmButtonColor: 'red',
          cancelButtonColor: 'green',
          showCancelButton: true,
          focusCancel: true,
          reverseButtons: true,
          allowEscapeKey: false,
          cancelButtonText: 'Stay here',
          closeOnClickOutside: false
        }).then((resultado) => {
          if (resultado.isConfirmed){
            clearInterval(interv);
            setStatus(0);
            setMinutes(initialMinutes);
            setSeconds(initialSeconds);
            setBreakMinutes(breakMinutes);
            setBreakSeconds(breakSeconds);
            setMsg(welcomeMsg);
            Swal.fire({
              icon: 'success',
              closeOnClickOutside: false,
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            })
          }
        })
      }
    }
  
    const resume = () => start();
  
    //      ----------------------------------------- BREAK FUNCTIONALITY´S -----------------------------------------

    var updateBreakMin = breakMin,
        updateBreakSecs = breakSec;

    const runBreak = () => {
      if(updateBreakSecs === 0){
        if(updateBreakMin !== 0){
          updateBreakSecs = 59;
          updateBreakMin--;
        } else{
          setStatus(4);
        }
        
      } else {
        updateBreakSecs--;
      }
      setBreakMinutes(updateBreakMin);
      setBreakSeconds(updateBreakSecs);
    }
  
    const breakRun = () =>{
      setInterv(setInterval(runBreak, 1000));
      setStatus(7);
      if(updateBreakSecs === 0){
        if(updateBreakMin !== 0){
          updateBreakSecs = 59;
          updateBreakMin--;
        }
      } else {
        updateBreakSecs--;
      }
      setBreakMinutes(updateBreakMin);
      setBreakSeconds(updateBreakSecs);
    }

    const stopBreak = () => {
      clearInterval(interv);
      setStatus(8);
    }

    const resumeBreak = () => {
      run();
      setStatus(7);
      setInterv(setInterval(runBreak, 1000));
    }
  
    const goToBreak = () => {
      if(status !== 2){
        alert("parar reloj")
        Swal.fire({
          text: 'You must stop the timer to perform this action.',
          icon: 'info',
          button: 'OK',
          customClass: 'background-swal',
          iconColor: '#07C2DF',
          confirmButtonColor: '#07C2DF',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      }else{
        setMsg(breakMsg);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        setStatus(6);
      }
  
    }
    //      ----------------------------------------- CONFIG BREAK TIMER -----------------------------------------  

    const configBreakTimer = () => {
      if(status === 9){
        setStatus(0);
      }
    }
  
    const addBreak = () => {
      if(breakMin >= 0 && breakMin < 60){
        setBreakMinutes(breakMin + 5);
      } else {
        alert("maximo alcanzado")
        
        Swal.fire({
          title: 'Cycle time limit reached!',
          text: 'The maximum time for a break cycle is 60 minutes.',
          icon: 'error',
          customClass: 'background-swal',
          iconColor: '#E34343',
          confirmButtonColor: '#07C2DF',
          button: 'Ok',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      }
  
    }
  
    const subBreak = () => {
      if(breakMin > 0){
        setBreakMinutes(breakMin - 5);
      } else {
        alert("tiempos negativos")
        
        Swal.fire({
          title: 'Be careful!',
          text: 'You cannot set negative times for the break cycle.',
          icon: 'error',
          customClass: 'background-swal',
          iconColor: '#E34343',
          confirmButtonColor: '#07C2DF',
          button: 'Ok',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      }
    }

    const backFromConfig = () => {
      if(breakMin === 0){
        alert("setear tiempo de descanso")
        
        Swal.fire({
          text: 'You must set the time for the break cycle.',
          icon: 'error',
          customClass: 'background-swal',
          iconColor: '#E34343',
          confirmButtonColor: '#07C2DF',
          button: 'Ok',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      } else {
        setMsg(studyMsg);
        setStatus(3);
        Swal.fire({
          text: 'Break cycle set to ' + breakMin + ' minutes.',
          icon: 'success',
          timer: 2500,
          customClass: 'success-swal',
          showConfirmButton: false,
          timerProgressBar: true,
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      }

    }


    //      ----------------------------------------- CONFIG STUDY TIMER -----------------------------------------  
  
    const backToStudy = () => {
      if (status === 7){
        
        Swal.fire({
          text: 'You must stop the timer to perform this action.',
          icon: 'info',
          button: 'OK',
          customClass: 'background-swal',
          iconColor: '#07C2DF',
          confirmButtonColor: '#07C2DF',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      }else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'This action will reset the values and return to the start.',
          confirmButtonText: 'Continue',
          confirmButtonColor: 'red',
          customClass: 'background-swal',
          showCancelButton: true,
          allowEscapeKey: false,
          cancelButtonColor: 'green',
          cancelButtonText: 'Stay here',
          focusCancel: true,
          reverseButtons: true,
          icon: 'warning',
          closeOnClickOutside: false
        }).then((respuesta) =>{
          if(respuesta.isConfirmed){
            clearInterval(interv);
            setStatus(0);
            setMinutes(initialMinutes);
            setSeconds(initialSeconds);
            setBreakMinutes(breakMinutes);
            setBreakSeconds(breakSeconds);
            setMsg(welcomeMsg);
            Swal.fire({
              icon: 'success',
              closeOnClickOutside: false,
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            })
          }
        })
      }
  
    }

    const goToConfigBreak = () => {
      if(minutes === 0){
        alert("setee tiempo de estudio")
        
        Swal.fire({
          text: 'You must set the time for the study cycle.',
          icon: 'error',
          customClass: 'background-swal',
          iconColor: '#E34343',
          confirmButtonColor: '#07C2DF',
          button: 'Ok',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      } else {
        setMsg(configBreakMsg);
        setStatus(9);
        
        Swal.fire({
          text: 'Study cycle was set to ' + minutes + ' minutes.',
          icon: 'success',
          timer: 2500,
          customClass: 'success-swal',
          showConfirmButton: false,
          timerProgressBar: true,
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      }
    }
  
    const configTimer = () => {
      alert("timer")
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
        alert("maximo alcanzado")
        
        Swal.fire({
          title: 'Cycle time limit reached!',
          text: 'The maximum time for a study cycle is 60 minutes.',
          icon: 'error',
          customClass: 'background-swal',
          iconColor: '#E34343',
          confirmButtonColor: '#07C2DF',
          button: 'Ok',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      }
  
    }
  
    const subTimer = () => {
      if(minutes > 0){
        setMinutes(minutes - 5);
      } else {
        alert("tiempos negativos")
        
        Swal.fire({
          title: 'Be careful!',
          text: 'You cannot set negative times for the study cycle.',
          icon: 'error',
          customClass: 'background-swal',
          iconColor: '#E34343',
          confirmButtonColor: '#07C2DF',
          button: 'Ok',
          allowEscapeKey: true,
          allowOutsideClick: false
        })
      }
    }
    
  return (
        <div className='TimerFunctionality'>
          <Message msg={msg}/>
          <TimerView minutes={minutes} seconds={seconds} breakMin={breakMin} breakSec={breakSec} status={status}/>
          <Buttons status={status} stop={stop} reset={reset} resume={resume} start={start} 
                  breakRun={breakRun} goToBreak={goToBreak} backToStudy={backToStudy} 
                  configTimer={configTimer} addTimer={addTimer} subTimer={subTimer} goToConfigBreak={goToConfigBreak}
                  stopBreak={stopBreak} resumeBreak={resumeBreak} configBreakTimer={configBreakTimer}
                  addBreak= {addBreak} subBreak={subBreak} backFromConfig={backFromConfig}/>
        </div>
  )*/
