import React from "react";
import Creator from "./Creator";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

export default function CreatorSelector() {
  const {
    value: { timerState },
  } = useSelector((state) => state.task);

  return timerState == "break" ? (
    <Creator />
  ) : (
   ""
  )
}
