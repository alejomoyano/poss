import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseError, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteField,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Message from "./Mensaje";
import { addMessage } from "../../redux/slices/ChatSlice";

import ChatHeader from "./ChatHeader";

function BreakChat() {
  const [inputMensaje, setInputMensaje] = useState(""); //para setear mensajes
  const [MessageList, setMessageList] = useState([]); //array con la collecion de mensajes
  const dispatch = useDispatch();
  const app = getApp();
  const db = getFirestore(app);
  //maneja el envio de mensajes guardandolos en MessageList
  const { value: chatDoc } = useSelector((state) => state.chat);

  function sendMessage(e) {
    e.preventDefault();
    let message = {
      id: new Date().getTime(),
      body: inputMensaje,
      user: "Ignacio",
    };
    setInputMensaje(" ");
    if (message !== "") dispatch(addMessage(message));

    setMessageList([...MessageList, message]);

    console.log(MessageList);
  }

  return (
    <div className="chat-container">
      <ChatHeader/>
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
