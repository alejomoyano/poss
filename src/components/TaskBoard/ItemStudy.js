import React from "react";
import { Grid, Typography, TableCell, TableRow } from "@mui/material";
import StateSelector from "./StateSelector";

export default function ItemStudy({ task }) {

  return (
    <TableRow data-testid="task-item-study">
      <TableCell>
        <Grid container direction="row" justifyContent="space-around">
          <Grid item sm={9}>
            <Typography data-testid="content" variant="body2">
              {task.content}
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <StateSelector
              data-testid="states-buttons"
              taskId={task.date}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}

<Typography></Typography>