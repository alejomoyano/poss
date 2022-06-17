import React, { useState } from "react";
import SortSelector from "./SortSelector";
import { Grid, TableCell, TableRow, IconButton, TextField } from "@mui/material";
import { addTask } from "../../redux/slices/tasks";
import { useDispatch } from "react-redux";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';


export default function Creator() {
    const dispatch = useDispatch();
    
    // hook para obtener el contenido
    const [content, setContent] = useState("");
    
    // creamos la tarea usando un dispatcher
    const handleSubmitTask = () => {
      // solo se puede crear una tarea si content no es null
      if (content !== "")
        dispatch(addTask({ content, date: Date.now(), state: "active" }));
      console.log("add task");
    };
  return (
    <TableRow>
      <TableCell align="left" colSpan={5}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
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
          <Grid item xs={2}>
            <IconButton
              data-testId="submit-button"
              type="submit"
              variant="text"
              onClick={handleSubmitTask}
            >
              <AddBoxRoundedIcon/>
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <SortSelector />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
