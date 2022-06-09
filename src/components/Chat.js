import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux'
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
import Message  from './Mensaje';
import { addMessage } from "../redux/slices/ChatSlice";




import './Chat.css';
import ChatHeader from "./ChatHeader";



function ChatScreen(){
    
    
    const [inputMensaje, setInputMensaje] = useState(""); //para setear mensajes
    const [MessageList, setMessageList] = useState([]); //array con la collecion de mensajes
    const dispatch = useDispatch();
    const app = getApp()
    const db = getFirestore(app)
    //maneja el envio de mensajes guardandolos en MessageList

  

    function sendMessage(e){
        e.preventDefault();
        let message = {
            body: inputMensaje,
            user: "Ignacio"
        }
        addMessage(message)
        
        
        
        
        setInputMensaje(" ")
        //console.log(message)
    }


   
    
    
    return( <div className="chat">

        <ChatHeader />
        <Message />
        
            
           
        
        
        <div className="chat__input">
           
           
                <form onSubmit={sendMessage}>
                    <input type="text" 
                    disabled={false} 
                    value={inputMensaje} 
                    onChange={(e)=>setInputMensaje(e.target.value)} 
                    placeholder="Type your message"
                    />

                    <button disabled={false} value={inputMensaje} className="chat__inputButton" type="submit">
                        Send Message
                    </button>

                </form>
            

            <div className="chat__inputIcons">
               
                
            </div>
            <link href="Chat.css"></link>
        </div>
    
    </div>
    )

}

export default ChatScreen;