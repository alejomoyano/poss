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
    <>
      {chatDoc.mensajes?.map((mensaje) => (
        
          <div data-testid="">
            <span>
              {mensaje.username}:{mensaje.body}
            </span>
          </div>
        
      ))}
    </>
  );
}
