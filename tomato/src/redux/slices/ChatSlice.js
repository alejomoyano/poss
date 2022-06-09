import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApp } from "firebase/app";
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
import { useState } from "react";
import ChatScreen from "../../components/Chat";

  const initialState = {
    value: {},
    error: null,
  };

  
  

  const createChat = createAsyncThunk(
    "createChat",
    async (id, thunkAPI) => {
      try {
        const date = new Date(); 
        const app = getApp();
        const db = getFirestore(app);

  
        // creamos el documento
        const document = doc(db, "chat", id);
        await setDoc(document, {
          mensajes: [
            {
              content: "Add messages",
              date: date.getDate(),
            },
          ],
        });
  
        // nos suscribimos al documento
        onSnapshot(
          document,
          (snapshot) => {
            const chat = snapshot.data().mensajes;
            console.log(chat);
            return thunkAPI.dispatch(
              setMensajes({ document: document, mensajes: chat })
            );
          },
          (error) => {
            return thunkAPI.rejectWithValue({ error });
          }
        );
        return thunkAPI.fulfillWithValue({ document });
      } catch (error) {
        return thunkAPI.rejectWithValue({ error });
      }
    }
  );

  export const messagesSlice = createSlice({
    name: 'mensajes',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.mensajes = action.payload.mensajes
        } 
    }


  })

  const { setMensajes } = messagesSlice.actions

  const addMessage = async (message) => {
       try {
        const date = new Date(); 
        const app = getApp();
        const db = getFirestore(app);
        const chat = doc(db, "chat/H2iPRKX2JORZMOWO99Kj");
        console.log(chat);

         await updateDoc(chat, {
           mensajes: arrayUnion(message),
         });
       } catch (error) {
         console.log(error);
       }
     };

  


  export const {setMenssages} = messagesSlice.actions

  export{
    addMessage
  } 
  

  export default messagesSlice.reducer