import React from "react";
import Message from "./Mensaje";
import ChatHeader from "./ChatHeader";
import { Grid } from "@mui/material";

function StudyChat() {
  return (
    <div className="chat" data-testid="study-chat">
      <Grid item sm={12} direction="column">
        <Message />
        <div className="chat__input">
          <form onSubmit>
            <input
              type="text"
              disabled={true}
              placeholder="No messages during study time"
            />
            <button disabled={true} className="chat__inputButton" type="submit">
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
