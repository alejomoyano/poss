import React, {Fragment} from 'react'

function TimerView(props) {
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

  )
}

export default TimerView
