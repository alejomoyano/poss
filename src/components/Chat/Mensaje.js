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
  const { value: mensajes } = useSelector((state) => state.chat);

  return (
    <>
      {mensajes?.map((mensaje) => (
        
          <div>
            <span>
              {mensaje.user}:{mensaje.body}
            </span>
          </div>
        
      ))}
    </>
  );
}
