import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Message() {
  const { value: chatDoc } = useSelector((state) => state.chat);

  return (
    <>
      {chatDoc.mensajes?.map((mensaje) => (
        <div data-testid="body">
          <span>
            {mensaje.username}:{mensaje.body}
          </span>
        </div>
      ))}
    </>
  );
}
