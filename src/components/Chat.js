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
import { Grid } from "@mui/material";



function ChatScreen(){
    
    
    const [inputMensaje, setInputMensaje] = useState(""); //para setear mensajes
    const [MessageList, setMessageList] = useState([]); //array con la collecion de mensajes
    const dispatch = useDispatch();
    const app = getApp()
    const db = getFirestore(app)
    //maneja el envio de mensajes guardandolos en MessageList
    const { value: chatDoc } = useSelector((state) => state.chat);
  

    function sendMessage(e){
        e.preventDefault();
        let message = {
            id: new Date().getTime(),
            body: inputMensaje,
            user: "Ignacio"
        }
        setInputMensaje(" ")
        if (message !== "")
            dispatch(addMessage(message ));
        
            
                
        setMessageList([...MessageList,message])
                         
                   
              
        
        
        
        
        
        console.log(MessageList)
    }


   
    
    
    return( <div className="chat">
        <Grid item sm={12} direction="column">
        <ChatHeader />
        <Message />
        
        {/* {MessageList.map((mensaje) => (
            <React.Fragment key={mensaje.id}>
                <div>
                    <span>{mensaje.user}:{mensaje.body}</span>

                </div>
            </React.Fragment>
          ))}
         */}
       
           
        
        
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
        </Grid>
    </div>
    )

}

export default ChatScreen;