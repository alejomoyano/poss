import React from "react";
import Message from "./Mensaje";
import ChatHeader from "./ChatHeader";

function StudyChat() {
  return (
    <div className="chat-container" data-testid="study-chat">
      <ChatHeader />
      <Message />
      <div className="chat-elements-container">
        <form onSubmit>
          <input
            className="input-chat"
            type="text"
            disabled={true}
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
