import React from "react";
import Message from "./Mensaje";
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
