import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import Tasks from "./Tasks";
import CreatorSelector from "./CreatorSelector";


// Funcion del componente de tareas
function TaskBoard() {

  return (
    <div className="task-container">
    <TableContainer
      sx={{height: '100%', borderRadius: '10px', background: '#fff', border: 'none'}}
    >
      <Table>
        <TableHead>
          <CreatorSelector/>
        </TableHead>
        <TableBody >
          <Tasks/>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default TaskBoard;