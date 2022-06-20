import React from "react";
import { observer } from "mobx-react";

import { Grid, Paper } from "@mui/material";

// import { Container } from "./styles";
import TaskBoard from "../../components/TaskBoard/TaskBoard";
import ChatScreen from "../../components/Chat/Chat";
import { TimerView } from "../../components/Timer/TimerView";
import Chat from "../../components/Chat/Chat";

const RoomView = () => {
  return (
    // <Container>

    <div className="room-container">
      <TimerView />

      <ChatScreen />

      <TaskBoard /> 
    </div>
    // </Container>
  );
};

// Envolver el componente en observer nos permite mostrar cambios en tiempo real
// para los documentos/colecciones instanciados con firestorter
export default observer(RoomView);
