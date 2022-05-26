import React from 'react'

function Message(props) {

return (
  <div>
    <span className='msg-text'>{props.msg}</span>
  </div>
  )
}

export default Message