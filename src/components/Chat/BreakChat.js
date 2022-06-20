import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Message from "./Mensaje";
import { addMessage } from "../../redux/slices/ChatSlice";

import ChatHeader from "./ChatHeader";

function BreakChat() {
  const [inputMensaje, setInputMensaje] = useState(""); //para setear mensajes
  const [MessageList, setMessageList] = useState([]); //array con la collecion de mensajes
  const dispatch = useDispatch();
  
  //maneja el envio de mensajes guardandolos en MessageList
  const {user} = useSelector((state)=>state.chat.value);
  console.log(user)
  function sendMessage(e) {
    e.preventDefault();
    let message = {
      id: new Date().getTime(),
      body: inputMensaje,
      username: user,
    };
    if (message.body.length !==0){ dispatch(addMessage(message))};
    setInputMensaje(" ");
    

    setMessageList([...MessageList, message]);

    console.log(MessageList);
  }

  return (
    <div className="chat-container">
      <ChatHeader />
      <Message />

      <div className="chat-elements-container">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            disabled={false}
            value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            placeholder="Type your message"
            className="input-chat"
          />

          <button
            disabled={false}
            value={inputMensaje}
            className="btn-chat"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default BreakChat;
