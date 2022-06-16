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
import { useDispatch } from "react-redux";


// Funcion del componente de tareas
function TaskBoard() {

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

export default TaskBoard;