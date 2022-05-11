import React, {useState, Fragment} from 'react'
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

function StartButton(props) {


  return (
    <Fragment>      
      {(props.status === 0) ?
      <Button variant="contained" onClick={props.start}>Start</Button> : ""
      }

      {(props.status === 1) ?
      <Fragment>
        <Button variant="contained" onClick={props.stop}>Stop</Button>
        <Button variant="contained" onClick={props.reset}>Reset</Button> 
        <Button variant="contained" onClick={props.goToBreak}>Go to Break</Button> 
      </Fragment> : "" }

      {(props.status === 2) ?
      <Fragment>
        <Button variant="contained" onClick={props.resume}>Resume</Button>
        <Button variant="contained" onClick={props.reset}>Reset</Button> 
        <Button variant="contained" onClick={props.goToBreak}>Go to Break</Button> 
      </Fragment> : "" }

      {(props.status === 3) ?
      <Fragment>
        <Button variant="contained" onClick={props.breakTime}>Set Break</Button>
      </Fragment> : "" }

      {(props.status === 6) ?
      <Fragment>
        <Button variant="contained" onClick={props.breakRun}>Start</Button>
        <Button variant="contained" onClick={props.backToStudy}>Back to Study</Button>
      </Fragment> : "" }

      {(props.status === 7) ?
      <Fragment>
      <Button variant="contained" onClick={props.stop}>Stop</Button>
      <Button variant="contained" onClick={props.backToStudy}>Back to Study</Button>
      </Fragment> : "" }

      {(props.status === 4) ?
      <Fragment>
        {<Button variant="contained" onClick={props.backToStudy}>Back to Study</Button>}
      </Fragment> : "" }

      {(props.status === 0) ?
      <Fragment>
      <Button onClick={props.configTimer}><SettingsIcon color="primary" fontSize="large" aria-label="add an alarm"></SettingsIcon></Button>
      </Fragment> : "" }

      {(props.status === 5) ?
      <Fragment>
        {<Button variant="contained" onClick={props.addTimer}>+</Button>}
        {<Button variant="contained" onClick={props.subTimer}>-</Button>}
        {<Button variant="contained" onClick={props.backFromConfig}>Back</Button>}
      </Fragment> : "" }


    </Fragment>
  )
}


export default StartButton

/*
    const [startPause, setStartPause] = useState('Start');
    const handleClick = () => {
        if(startPause === 'Start'){
            setStartPause('Pause');
        }else{
            setStartPause('Start');
        }
    };
*/
/*
{(props.status === 3) ?
  <Fragment>
    <Button variant="contained" onClick={props.breakTime}>BREAK</Button>
  </Fragment> : "" }*/