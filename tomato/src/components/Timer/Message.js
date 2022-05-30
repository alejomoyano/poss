import React from 'react'
import '../../App.css'

function Message(props) {

return (
  <div>
    <span className='msg-text'>{props.msg}</span>
  </div>
  )
}

export default Message