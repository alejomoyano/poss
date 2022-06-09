import React, {forwardRef} from "react";
import { useSelector } from "react-redux";
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
import { getApp } from "firebase/app";
import { useState } from "react";


const  Message = () => {
    
    const [messages, setMessages] = useState([])
    const app = getApp()
    const db = getFirestore(app)

    const Fetchdata = ()=>{
        db.collection("Mensajes").get().then((querySnapshot) => {
             
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setMessages(arr => [...arr , data]);
                  
            });
        })
    }

    return (
        <div>
            
          
        {
            messages.map((data) => (
            <span>{data.mensajes.user}:{data.mensajes.body}</span>
            ))
        }
        </div>
  
    );
}


export default Message;
