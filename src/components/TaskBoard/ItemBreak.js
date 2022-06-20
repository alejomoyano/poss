import React from "react";
import { IconButton, Grid, Typography, TableCell, TableRow } from "@mui/material";
// import TaskStatesController from "./TaskStatesController";
import { deleteTask } from "../../redux/slices/tasks";
import { useDispatch } from "react-redux";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';



export default function ItemBreak({ task }) {
  const dispatch = useDispatch();
  // callback para eliminar tareas
  const handleDeleteTask = () => {
    dispatch(deleteTask(task));
  };

  return (
    <TableRow key={task.content} data-testid='task-item-break'>
      <TableCell>
        <Grid container direction="row" justifyContent="space-around">
          <Grid item sm={8}>
            <Typography data-testid="content" variant="body2">
              {task.content}
            </Typography>
          </Grid>
          <Grid item sm={1}>
            <IconButton
              data-testid="delete-button"
              sx={{color: 'black', background: 'transparent', border: 'none', boxShadow: 'none'}}
              variant="text"
              onClick={handleDeleteTask}
            >
              <DeleteRoundedIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
