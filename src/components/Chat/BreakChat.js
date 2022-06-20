import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Mensaje";
import { addMessage } from "../../redux/slices/ChatSlice";

import ChatHeader from "./ChatHeader";

function BreakChat() {
  const [inputMensaje, setInputMensaje] = useState(""); //para setear mensajes
  const [MessageList, setMessageList] = useState([]); //array con la collecion de mensajes
  const dispatch = useDispatch();

  //maneja el envio de mensajes guardandolos en MessageList
  const { user } = useSelector((state) => state.chat.value);
  console.log(user);
  function sendMessage(e) {
    e.preventDefault();
    let message = {
      id: new Date().getTime(),
      body: inputMensaje,
      username: user,
    };
    if (message !== "") dispatch(addMessage(message));
    setInputMensaje(" ");

    setMessageList([...MessageList, message]);

    console.log(MessageList);
  }

  return (
    <div className="chat-container" data-testid="break-chat">
      <ChatHeader />
      <Message />
      <div className="chat-elements-container">
        <form onSubmit={sendMessage}>
          <input
            className="input-chat"
            type="text"
            data-testid="send-message-button"
            disabled={false}
            value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            placeholder="Type your message"
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
