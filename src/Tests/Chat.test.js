import React from "react";
// import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "./test-utils";
import Message from "../components/Chat/Mensaje";
import ChatSlice from "../redux/slices/ChatSlice";
import Chat from "../components/Chat/Chat";
import StudyChat from "../components/Chat/StudyChat";
import BreakChat from "../components/Chat/BreakChat";
import {addMessage, 
    createChat,
    changeTimerState,
    setMessages,
    chatUpdate,
    joinChat} from "../redux/slices/ChatSlice";
import { setState } from "../redux/slices/tasks";



describe("Chat test", () => {
    // componente
    let item;
  
    beforeEach(() => {
      //renderizamos taskitem
      item = render(<Chat />);
    });

    test("Chat renders break chat in Break State", () => {
        const breakChat = item.getByTestId("break-chat");
        expect(breakChat).toBeInTheDocument();
      });

     test("Chat does not render study chat in Break State", () => {
         const studyChat = item.queryByTestId("study-chat");
         expect(studyChat).not.toBeInTheDocument();
     });

    // test("it renders the message content", () => {
    //     const body = item.getByText("testmsg");
    //     expect(body).toBeInTheDocument();
    //   });

      test("it renders the send message button", () => {
        const sendMsg = item.getByTestId("send-message-button");
        expect(sendMsg).toBeInTheDocument();
      });

      // test("click the send message button", () => {
      //   const content = item.getByText("testmsg");
      //   const input = {
      //       content:'testmsg2',
      //       state:'active',
      //       date:123
      //   }
      //   const button = item.getByTestId("send-message-button");
      //   fireEvent.change(input);
    
      //   setTimeout(() => {
          
      //     expect(input.content).toBeInTheDocument();
      //   }, 5000);
      // });

});


const defaultState = { value: {
    document: {},
    mensajes: [],
    user:null,
  },
  timerState: "break",
  
  error: null, }


describe("Reducer",()=>{
   test("should return default state when state is not undefined",()=>{
      expect(ChatSlice(undefined, {})).toEqual(defaultState);
    });

})

describe("Reducer",()=>{
    test("should return new username when username is modified",()=>{
        
        const username ="User3"
       expect(ChatSlice(defaultState,setMessages({ document:{}, mensajes:[], user:username }))).toEqual({ value: {
        document: {},
        mensajes: [],
        user:username,
        },
        timerState: "break",
        error: null, });
     });
 
 })

 describe("Reducer",()=>{
    test("should return new state when state is modified",()=>{
        

       expect(ChatSlice(defaultState,setState("study"))).toEqual({ value: {
        document: {},
        mensajes: [],
        user:null,
        },
        timerState: "break",
        error: null, });
     });
 
 })