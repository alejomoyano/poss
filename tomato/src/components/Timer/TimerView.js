import React from 'react'
import '../../App.css'

function TimerView(props) {

return(
  <div>

    {(props.status !== 0) ?
    <div className='general-cycle'>
      <span>{'General Cycles: ' + props.cycleCount}</span>&nbsp;&nbsp;
    </div> : "" }

    {!(props.status === 0 || props.status === 9 || props.status === 10 || props.status === 4) ?
    <div className='sub-cycle'>
      <span>{'Sub Cycles: ' + props.subCycleCount}</span>&nbsp;&nbsp;
    </div> : "" }


    {(props.status === 1 || props.status === 5 || props.status === 6) ?
    <div className='timer'>
      <span>{(props.studyMinutes) >= 10 ? props.studyMinutes : '0' + props.studyMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.studySeconds) >= 10 ? props.studySeconds : '0' + props.studySeconds}</span>&nbsp;
    </div> : ""}

    {(props.status === 2 || props.status === 7 || props.status === 8) ?
    <div className='timer'>
      <span>{(props.shortBreakMinutes) >= 10 ? props.shortBreakMinutes : '0' + props.shortBreakMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.shortBreakSeconds) >= 10 ? props.shortBreakSeconds : '0' + props.shortBreakSeconds}</span>&nbsp;
    </div> : ""}

    {(props.status === 3 || props.status === 9 || props.status === 10) ?
    <div className='timer'>
      <span>{(props.longBreakMinutes) >= 10 ? props.longBreakMinutes : '0' + props.longBreakMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.longBreakSeconds) >= 10 ? props.longBreakSeconds : '0' + props.longBreakSeconds}</span>&nbsp;
    </div> : ""}

    {(props.status === 4) ?
    <div className='timer'>
      <span>{(props.studyMinutes) >= 10 ? props.studyMinutes : '0' + props.studyMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.studySeconds) >= 10 ? props.studySeconds : '0' + props.studySeconds}</span>&nbsp;
    </div> : ""}

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

