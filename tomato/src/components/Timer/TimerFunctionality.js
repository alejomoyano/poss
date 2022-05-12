import React, {useState} from 'react'
import TimerView from './TimerView'
import Buttons from './Buttons'
import Message from './Message'

function TimerFunctionality() {

    const initialMinutes = 0;
    const initialSeconds = 0;
    const breakMinutes = 0;
    const breakSeconds = 6;
    let breakMsg = 'Break Time';
    let studyMsg = 'Study Time';
    let configMsg = 'Timer Configuration'
  
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [msg, setMsg] = useState(studyMsg);
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
      BREAK = 3
          Si pulsamos Go to Break, pasamos al estado 3 y nos aparece el botón SET BREAK, este
          setea el contador en el tiempo de descanso predeterminado (esto hay que cambiarlo cuando
          el tiempo sea configurable).
      BACK TO STUDY = 6
          Al setear el timer en Break, nos aparece el START y el BACK TO STUDY. Si iniciamos
          arranca el Timer, si clickeamos BACK TO STUDY nos lleva al inicio del Timer.
      STOP y BACK TO STUDY = 7
          Al arrancar el timer, nos aparece los botones para detenerlo (STOP) y para volver
          al inicio (BACK TO STUDY), este último solo se acciona cuando esta en STOP el Timer.
      STOP y BACK TO STUDY = 8
          Al parar el timer (STOP) en el Break Time, podemos seguir con el tiempo (RESUME) o
          podemos volver al inicio con el BACK TO STUDY, que al estar STOP el timer, te lo permite.
      CONFIG = 5
          Si clickeamos el engranaje de configuración, nos aparecen los botones para sumar 5 minutos (+),
          substraer 5 minutos (-) y guardar y volver con ese valor modificado (SAVE).
      BACK TO STUDY FINAL = 4
            Cuando termina el break, aparece el botón BACK TO STUDY para volver al inicio
      */

  
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
    }
  
    const resume = () => start();
  
    //      ----------------------------------------- BREAK FUNCTIONALITY´S -----------------------------------------

    const runBreak = () => {
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
    }
  
    const breakRun = () =>{
      setInterv(setInterval(runBreak, 1000));
      setStatus(7);
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
    }
  
    const breakTime = () =>{
      clearInterval(interv);
      setMinutes(breakMinutes);
      setSeconds(breakSeconds);
      setStatus(6);
    }
  
    const stopBreak = () => {
      clearInterval(interv);
      setStatus(8);
    }

    const resumeBreak = () => {
      run();
      setStatus(7);
      setInterv(setInterval(run, 1000));
    }
  
    const goToBreak = () => {
      if(status !== 2){
        alert('Debe parar el timer');
      }else{
        setMsg(breakMsg);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        setStatus(3);
      }
  
    }

    //      ----------------------------------------- CONFIG FUNCTIONALITY´S -----------------------------------------  
  
    const backToStudy = () => {
      if (status === 7){
        alert('Debe parar el timer');
      }else {
        clearInterval(interv);
        setMsg(studyMsg);
        reset();
      }
  
    }

    const backFromConfig = () => {
      setMsg(studyMsg);
      setStatus(0);
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
        alert('Límite de tiempo de ciclo alcanzado');
      }
  
    }
  
    const subTimer = () => {
      if(minutes > 0){
        setMinutes(minutes - 5);
      } else {
        alert('Mínimo de tiempo alcanzado')
      }
    }
    
  return (
        <div className='TimerFunctionality'>

          <Message msg={msg}/>
          <TimerView minutes={minutes} seconds={seconds} status={status}/>
          <Buttons status={status} stop={stop} reset={reset} resume={resume} start={start} 
                  breakTime={breakTime} breakRun={breakRun} goToBreak={goToBreak} backToStudy={backToStudy} 
                  configTimer={configTimer} addTimer={addTimer} subTimer={subTimer} backFromConfig={backFromConfig}
                  stopBreak={stopBreak} resumeBreak={resumeBreak}/>

        </div>
  )

}

export default TimerFunctionality