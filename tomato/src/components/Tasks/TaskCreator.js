import React, { useState } from "react";
import { Grid, TableCell, TableRow, Button, TextField } from "@mui/material";
import {useDispatch} from 'react-redux';
import {newTask} from '../../reducers/taskReducer';

export default function TaskCreator(props) {
  const dispatch = useDispatch();

  // hook para obtener el contenido
  const [content, setContent] = useState("");

  // creamos la tarea usando un dispatcher
  const handleSubmitTask = () => {
    if (content !== "") dispatch(newTask(content));
    // solo se puede crear una tarea si se ingreso un text
  };

  return (
    <TableRow>
      <TableCell align="left" colSpan={5}>
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <TextField
              name="task-field-creator"
              variant="outlined"
              size="small"
              placeholder="Ingrese el contenido de la tarea"
              onChange={(event) => {
                setContent(event.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button
            data-testId="submit-button"
              type="submit"
              variant="text"
              onClick={handleSubmitTask}
            >
              <link
                rel="stylesheet"
                href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,-25"
              />
              <span class="material-symbols-outlined">add</span>
            </Button>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
