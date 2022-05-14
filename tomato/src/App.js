import React from "react";
import "./App.css";
import Auth from "../src/components/Auth";
import Tasks from "../src/components/Tasks";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item lg={3}></Grid>
      <Grid item lg={7}>
        <Tasks />
      </Grid>
    </Grid>
  );
}

export default App;
