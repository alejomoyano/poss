import React from "react";
import { Button, Grid, Typography, TableCell, TableRow } from "@mui/material";
import TaskStatesController from "./TaskStatesController";
import { deleteTask } from "../../redux/slices/tasks";
import { useDispatch } from "react-redux";
export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  // callback para eliminar tareas
  const handleDeleteTask = () => {
    dispatch(deleteTask(task));
  };

  return (
    <TableRow key={task.content}>
      <TableCell>
        <Grid container direction="row" justifyContent="space-around">
          <Grid item sm={8}>
            <Typography data-testid="content" variant="body2">
              {task.content}
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <TaskStatesController
              data-testid="states-buttons"
              taskId={task.date}
            />
          </Grid>
          {/* POR AHORA NO SE PUED EDITAR LA TAREA */}
          {/* <Grid item sm={1}>
            <Button variant="text" onClick={() => console.log("editar")}>
              <link
                rel="stylesheet"
                href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,-25"
              />
              <span class="material-symbols-outlined">edit</span> */}

          {/* a este boton se cambia despues de darle a editar para guardar los cambios */}
          {/* <link
                  rel="stylesheet"
                  href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,200"
                />
                <span class="material-symbols-outlined">check</span> */}
          {/* </Button> */}
          {/* </Grid> */}
          <Grid item sm={1}>
            <Button
              data-testid="delete-button"
              variant="text"
              onClick={handleDeleteTask}
            >
              <link
                rel="stylesheet"
                href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,200"
              />
              <span class="material-symbols-outlined">delete</span>
            </Button>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
