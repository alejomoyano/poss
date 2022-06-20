import React from "react";
import Creator from "./Creator";
import { useSelector } from "react-redux";

export default function CreatorSelector() {
  const {
     timerState 
  } = useSelector((state) => state.task);

  return timerState == "break" ? (
    <Creator />
  ) : (
   ""
  )
}
