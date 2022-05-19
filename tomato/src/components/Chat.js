import React, {useState, useEffect, useRef} from "react";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import './Chat.css';
import ChatHeader from "./ChatHeader";



function ChatScreen(){
    
    let messages = []
    const [inputMensaje, setInputMensaje] = useState("");
    const [MessageList, setMessageList] = useState([]);

    function sendMessage(e){
        e.preventDefault();
        let message ={
            id: Date.getTime,
            user: "Ignacio",
            body: inputMensaje
        }
        
        setMessageList([...MessageList,message])
        
        setInputMensaje(" ")
        //console.log(message)
    }

   

    useEffect(()=>{
        localStorage.setItem("localMsg",JSON.stringify(MessageList))
    },[setMessageList])
    
    return( <div className="chat">

        <ChatHeader />
        
        
            
            {MessageList.map((inputMensaje)=>(
                <React.Fragment key={inputMensaje.id}>
                    <div className="chat_messages">
                        <span className="form-control bg-black btn mt-2" 
                        style={{textAlign: "left",fontWeight: "bold"}}>
                            {inputMensaje.user}: {inputMensaje.body}
                        </span>
                    </div>
                </React.Fragment>
            ))}
        
        
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
                <AddReactionIcon fontSize="large"/>
                
            </div>
            <link href="Chat.css"></link>
        </div>
    
    </div>
    )

}

export default ChatScreen;