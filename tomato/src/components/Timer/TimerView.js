import React from 'react'

function TimerView(props) {
  return (

    <div className='TimerView'> 
        <span>{(props.minutes) >= 10 ? props.minutes : '0' + props.minutes}</span>&nbsp;:&nbsp;
        <span>{(props.seconds) >= 10 ? props.seconds : '0' + props.seconds}</span>
    </div>
  )
}

export default TimerView
