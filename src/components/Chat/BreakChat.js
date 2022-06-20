import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Message from "./Mensaje";
import { addMessage } from "../../redux/slices/ChatSlice";

import ChatHeader from "./ChatHeader";
import { Grid } from "@mui/material";

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
    <div className="chat" data-testid="break-chat">
      <Grid item sm={12} direction="column">
        <Message />
        <div className="chat__input">
          <form onSubmit={sendMessage}>
            <input
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
              className="chat__inputButton"
              type="submit"
            >
              Send Message
            </button>
          </form>
          <div className="chat__inputIcons"></div>
          <link href="Chat.css"></link>
        </div>
      </Grid>
    </div>
  );
}

export default BreakChat;
