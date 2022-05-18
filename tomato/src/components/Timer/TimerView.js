import React, {Fragment} from 'react'

function TimerView(props) {

return(
  <div>

    <Fragment>
      <span>{'General Cycles: ' + props.cycleCount}</span>&nbsp;&nbsp;
    </Fragment>

    {!(props.status === 0 || props.status === 9 || props.status === 10 || props.status === 4) ?
    <Fragment>
      <span>{'Sub Cycles: ' + props.subCycleCount}</span>&nbsp;&nbsp;
    </Fragment> : "" }

    {(props.status === 0) ?
    <Fragment>
      <span>{'Configure los timers para comenzar'}</span>
    </Fragment> : ""}

    {(props.status === 1 || props.status === 5 || props.status === 6) ?
    <Fragment>
      <span>{(props.studyMinutes) >= 10 ? props.studyMinutes : '0' + props.studyMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.studySeconds) >= 10 ? props.studySeconds : '0' + props.studySeconds}</span>&nbsp;
    </Fragment> : ""}

    {(props.status === 2 || props.status === 7 || props.status === 8) ?
    <Fragment>
      <span>{(props.shortBreakMinutes) >= 10 ? props.shortBreakMinutes : '0' + props.shortBreakMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.shortBreakSeconds) >= 10 ? props.shortBreakSeconds : '0' + props.shortBreakSeconds}</span>&nbsp;
    </Fragment> : ""}

    {(props.status === 3 || props.status === 9 || props.status === 10) ?
    <Fragment>
      <span>{(props.longBreakMinutes) >= 10 ? props.longBreakMinutes : '0' + props.longBreakMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.longBreakSeconds) >= 10 ? props.longBreakSeconds : '0' + props.longBreakSeconds}</span>&nbsp;
    </Fragment> : ""}

    {(props.status === 4) ?
    <Fragment>
      <span>{(props.studyMinutes) >= 10 ? props.studyMinutes : '0' + props.studyMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.studySeconds) >= 10 ? props.studySeconds : '0' + props.studySeconds}</span>&nbsp;
    </Fragment> : ""}


    

  </div>
)

}

export default TimerView
  /*
  return (

    <div className='TimerView'>
      {(props.status === 6 || props.status === 7 || props.status === 8 ||props.status === 9) ?
        <Fragment>
          <span>{(props.breakMin) >= 10 ? props.breakMin : '0' + props.breakMin}</span>&nbsp;:&nbsp;
          <span>{(props.breakSec) >= 10 ? props.breakSec : '0' + props.breakSec}</span>
        </Fragment> :
        <Fragment>
          <span>{(props.minutes) >= 10 ? props.minutes : '0' + props.minutes}</span>&nbsp;:&nbsp;
          <span>{(props.seconds) >= 10 ? props.seconds : '0' + props.seconds}</span>
        </Fragment> 
        }
    </div>

  )*/

