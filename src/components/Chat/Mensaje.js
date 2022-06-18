import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
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
import { getApp } from "firebase/app";
import { useState } from "react";

export default function Message() {
  const { value: chatDoc } = useSelector((state) => state.chat);

  return (
      <div className="text-area-chat">Ejemplo del campo del chat (Solo un div es)
      {chatDoc.mensajes?.map((mensaje) => (
        <Fragment key={mensaje.id}>
          <div>
            <span>
              {mensaje.user}:{mensaje.body}
            </span>
          </div>
        </Fragment>
      ))}
      </div>
  );
}
