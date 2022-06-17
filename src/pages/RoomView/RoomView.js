import React from "react";
import { observer } from "mobx-react";

import { Grid,Paper} from "@mui/material";

// import { Container } from "./styles";
import TaskBoard from "../../components/TaskBoard/TaskBoard";
import ChatScreen from "../../components/Chat/Chat";
import { TimerView } from "../../components/Timer/TimerView";
import Chat from "../../components/Chat/Chat";

const RoomView = () => {
  return (
    // <Container>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={2}
        lg={10}
        sx={{ width: 100 }}
      >
        <Grid item lg={4} direction="column" container  >
          <Grid item lg={8}>
            <TimerView />
          </Grid>
          <Grid item lg={4}>
            <Chat />
          </Grid>
        </Grid>
        <Grid item lg={6}>
          <TaskBoard />
        </Grid>
      </Grid>
    // </Container>
  );
};

// Envolver el componente en observer nos permite mostrar cambios en tiempo real
// para los documentos/colecciones instanciados con firestorter
export default observer(RoomView);
