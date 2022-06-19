import React, { Fragment } from "react";
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
      <div className="text-area-chat">
      {chatDoc.mensajes?.map((mensaje) => (
        <Fragment key={mensaje.id}>
          <div className="msg-container">
            <span>
              {mensaje.user}:{mensaje.body}
            </span>
          </div>
        </Fragment>
      ))}
      </div>
  );
}
