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


import { Grid } from "@mui/material";
import ChatHeader from "./ChatHeader";

function StudyChat() {
  return (
    <div className="chat-container">
      <ChatHeader/>
      <Message />

      <div className="chat-elements-container">
        <form onSubmit>
          <input
            type="text"
            disabled={true}
            className="input-chat"
            placeholder="No messages during study time"
          />

          <button disabled={true} className="btn-chat" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudyChat;
