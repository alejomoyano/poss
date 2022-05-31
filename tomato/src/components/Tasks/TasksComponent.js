import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import Tasks from "./Tasks";
import TaskCreator from "./TaskCreator";
// import { useDispatch } from "react-redux";
// import { init } from "../../reducers/taskReducer";

// Funcion del componente de tareas
export default function TasksComponent() {
  // const dispatch = useDispatch();

  // al iniciar la aplicacion se ejecuta
  // o sea inicializa las tareas con lo que hay guardado en la db
  // useEffect(() => {
  //   dispatch(init());
  //   console.log('nose')
  // },[dispatch]);

  return (
    <TableContainer
      sx={{ minWidth: 700, maxHeight: 840, maxWidth: "100%" }}
      component={Paper}
    >
      <Table>
        <TableHead>
          <TaskCreator />
        </TableHead>
        <TableBody>
          <Tasks />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
