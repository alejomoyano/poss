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

function ChatCreator(){
    const app = getApp()
    const db = getFirestore(app) 
    const [chats, SetChats] = useState([])
    
    useEffect(()=>{
        db.collection('chat').onSnapshot((snapshot)=> SetChats(
            snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),
            }))
        ))
    })
    
    const addChat =  () =>{
        const chatName = prompt('PLease enter chat name')

        if(chatName){
            db.collection('chat').add({
                chatName: chatName
            })
        }
    }

    return(
        <div>
            <button onClick={addChat}>Crear Chat</button>
        </div>
    )

    
}

export default ChatCreator


    