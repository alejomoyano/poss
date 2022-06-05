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

    <div className='timer'>
      <span>{(props.actualMinutes) >= 10 ? props.actualMinutes : '0' + props.actualMinutes}</span>&nbsp;:&nbsp;
      <span>{(props.actualSeconds) >= 10 ? props.actualSeconds : '0' + props.actualSeconds}</span>&nbsp;
    </div>

  </div>
)

}

export default TimerView

