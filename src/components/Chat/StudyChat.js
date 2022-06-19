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


import "./Chat.css";

import { Grid } from "@mui/material";

function StudyChat() {
  
  return (
    <div className="chat">
      <Grid item sm={12} direction="column">
        
         <Message /> 

        

        <div className="chat__input">
          <form onSubmit>
            <input
              type="text"
              disabled={true}
              
              
              placeholder="No messages during study time"
            />

            <button
              disabled={true}
              
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

export default StudyChat;
