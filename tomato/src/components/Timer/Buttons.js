import React, {Fragment} from 'react'
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'


function Buttons(props) {

return(
    <div>

        {(props.status === 0) ?
            <Fragment>
                <Button onClick={props.configTimes}><SettingsIcon color="primary" fontSize="large"></SettingsIcon></Button>
            </Fragment> : "" }
            
            {(props.status === 1) ?
            <Fragment>
                <Button variant="contained" onClick={props.studyStart}>Start Study</Button>
            </Fragment> : "" }

        
        {(props.status === 2) ?             
            <Fragment>
                <Button variant="contained" onClick={props.shortBreakStart}>Start Short Break</Button>
            </Fragment> : "" }

        {(props.status === 3) ?
            <Fragment>
                <Button variant="contained" onClick={props.longBreakStart}>Start Long Break</Button>
            </Fragment> : "" }

        {(props.status === 4) ?
            <Fragment>
                <Button variant="contained" onClick={props.backToStart}>Volver al inicio</Button>
                <Button onClick={props.configTimes}><SettingsIcon color="primary" fontSize="large"></SettingsIcon></Button>
            </Fragment> : "" }

        {(props.status === 5) ? 
        <Fragment>
            <Button variant="contained" onClick={props.stopStudy}>Stop Study</Button>
        </Fragment> : "" }

        {(props.status === 6) ? 
        <Fragment>
            <Button variant="contained" onClick={props.resumeStudy}>Resume Study</Button>
        </Fragment> : "" }

        {(props.status === 7) ? 
        <Fragment>
            <Button variant="contained" onClick={props.stopShortBreak}>Stop Short Break</Button>
        </Fragment> : "" }
        
        {(props.status === 8) ? 
        <Fragment>
            <Button variant="contained" onClick={props.resumeShortBreak}>Resume Short Break</Button>
        </Fragment> : "" }

        {(props.status === 9) ? 
        <Fragment>
            <Button variant="contained" onClick={props.stopLongBreak}>Stop Long Break</Button>
        </Fragment> : "" }

        {(props.status === 10) ? 
        <Fragment>
            <Button variant="contained" onClick={props.resumeLongBreak}>Resume Long Break</Button>
        </Fragment> : "" }


    </div>
)
}
export default Buttons


/*
  return (
    <div className='Buttons'> 

      {(props.status === 0 || props.status === 3) ?
          <Button variant="contained" onClick={props.start}>Start</Button> : ""
      }

      {(props.status === 0) ?
      <Fragment>
          <Button onClick={props.configTimer}><SettingsIcon color="primary" fontSize="large" aria-label="add an alarm"></SettingsIcon></Button>
      </Fragment> : "" }

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

      {(props.status === 4) ?
      <Fragment>
          <Button variant="contained" onClick={props.backToStudy}>Back to Study</Button>
      </Fragment> : "" }

      {(props.status === 5) ?
      <Fragment>
          <Button variant="contained" onClick={props.addTimer}>+</Button>
          <Button variant="contained" onClick={props.subTimer}>-</Button>
          <Button variant="contained" onClick={props.goToConfigBreak}>Save</Button>
      </Fragment> : "" }

      {(props.status === 6) ?
      <Fragment>
          <Button variant="contained" onClick={props.breakRun}>Start</Button>
          <Button variant="contained" onClick={props.backToStudy}>Back to Study</Button>
      </Fragment> : "" }

      {(props.status === 7) ?
      <Fragment>
          <Button variant="contained" onClick={props.stopBreak}>Stop</Button>
          <Button variant="contained" onClick={props.backToStudy}>Back to Study</Button>
      </Fragment> : "" }

      {(props.status === 8) ?
      <Fragment>
          <Button variant="contained" onClick={props.resumeBreak}>Resume</Button>
          <Button variant="contained" onClick={props.backToStudy}>Back to Study</Button>
      </Fragment> : "" }

      {(props.status === 9) ?
      <Fragment>
          <Button variant="contained" onClick={props.addBreak}>+</Button>
          <Button variant="contained" onClick={props.subBreak}>-</Button>
          <Button variant="contained" onClick={props.backFromConfig}>Save</Button>
      </Fragment> : "" }

    </div>
  )
*/

