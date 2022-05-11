import React, {Fragment} from 'react'

function Message(props) {

  return (

    <Fragment>
        <span>{props.msg}</span>
    </Fragment> 

  )

}


export default Message

//<span>{(props.time.m === 0 && props.time.s === 0) ? 'Break Time' : 'Study Time'}</span>
