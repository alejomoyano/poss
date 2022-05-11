import React, {useState, useEffect, Fragment} from 'react'
import { Button } from '@mui/material';
//import { ResetButton } from './ResetButton'

function Pomodoro(props) {

  return (
    <Fragment>

        <Fragment> 
        <span>{(props.minutes) >= 10 ? props.minutes : '0' + props.minutes}</span>&nbsp;:&nbsp;
        <span>{(props.seconds) >= 10 ? props.seconds : '0' + props.seconds}</span>
        </Fragment>

    </Fragment>
  )

}

export default Pomodoro

// PRIMERA OPCION QUE HICE

    /*
    let initialMinutes = 25;
    let initialSeconds = 0;
    let flag = false;

    const[minutes, setMinutes] = useState(initialMinutes);
    const[seconds, setSeconds] = useState(initialSeconds);
    const[displayMessage, setDisplayMessage] = useState(false);

    useEffect(() =>{
        let interval = setInterval(() => {
            clearInterval(interval);

            if(seconds === 0){
                if(minutes !== 0){
                    setSeconds(59);
                    setMinutes(minutes-1);
                } else {
                    let minutes = displayMessage ? 24 : 4;
                    let seconds = 59;

                    setSeconds(seconds);
                    setMinutes(minutes);
                    setDisplayMessage(!displayMessage);
                }
            } else {
                setSeconds(seconds - 1);
            }
            
        }, 1000)
    }, [seconds]);

    const timerMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const timerSeconds = (seconds < 10) ? `0${seconds}` : seconds;

    function onToggleReset (){
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        flag = !flag;
    }

      return (
    <Fragment>
        <div className='message'>
            {displayMessage && <div>Break time! New session starts in:</div>}
        </div>
        <div className='timer'>
            {timerMinutes}:{timerSeconds}
        </div>
        <Button variant="contained" onClick={onToggleReset}>Reset</Button>
    </Fragment>
  )
*/


