import React, { useState, useEffect} from "react";
import { getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function ChatCreator() {
  const app = getApp();
  const db = getFirestore(app);
  const [chats, SetChats] = useState([]);

  useEffect(() => {
    db.collection("chat").onSnapshot((snapshot) =>
      SetChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  });

  const addChat = () => {
    const chatName = prompt("Please enter chat name");

    if (chatName) {
      db.collection("chat").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div>
      <button onClick={addChat}>Crear Chat</button>
    </div>
  );
}

export default ChatCreator;
