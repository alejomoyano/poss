import React, {useState} from 'react'
import TimerView from './TimerView'
import Buttons from './Buttons'
import Message from './Message'
import Swal from 'sweetalert2'

function TimerFunctionality() {

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

    /*
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
      */

  
    var updateStudyMin = minutes,
        updateStudySecs = seconds;
  
    const start = () => {
      if(minutes === 0 && seconds === 0){
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
  )

}

export default TimerFunctionality