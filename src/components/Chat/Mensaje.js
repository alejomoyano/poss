import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Message() {
  const { value: chatDoc } = useSelector((state) => state.chat);

  return (
    <div className="text-area-chat">
      {chatDoc.mensajes?.map((mensaje) => (
        <div className="msg-container" data-testid="body">
          <span>
            {mensaje.username}: {mensaje.body}
          </span>
        </div>
      ))}
    </div>
  );
}
