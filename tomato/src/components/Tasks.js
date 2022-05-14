import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Checkbox,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Paper,
  Grid,
  Typography,
} from "@mui/material";

// Funcion que sirve para generar los valores que van dentro de las notas
function createData(name) {
  return { name };
}

const rows = [createData("TE AMO MESSI"), createData("Nose")];

// array donde tenemos los componentes de la fila principal. En realidad esto no se usa
const headCels = [
  {
    field: "Done",
    padding: "checkbox",
    numeric: false,
  },
  {
    field: "Descripcion",
    numeric: false,
  },
  {
    field: "Estado",
    numeric: false,
  },
  {
    field: "Delete",
    numeric: false,
  },
  {
    field: "Edit",
    numeric: false,
  },
];

// Funcion del componente de tareas
// voy a usar un tipo de componente que ofrece material-ui para hacerlo mas facil y son las tablas
export default function Tasks() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={5}>
              <Grid container spacing={1}>
                <Grid item xs={11}>
                  <TextField variant="outlined" size="small" fullWidth />
                </Grid>
                <Grid item xs={1}>
                  <Button variant="text">
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

          {/* <TableRow>
            {headCels.map((cell) => (
              <TableCell>{cell.field}</TableCell>
            ))}
          </TableRow> */}
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                <Grid container direction="row" justifyContent="space-around">
                  <Grid item sm={8}>
                    <Typography variant="body2" >
                    {row.name}
                    </Typography>
                  </Grid>
                  <Grid item sm={2}>
                    <ToggleButtonGroup exclusive color="primary" size="small">
                      <ToggleButton>P</ToggleButton>
                      <ToggleButton>S</ToggleButton>
                      <ToggleButton>C</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item sm={1}>
                    <Button variant="text">
                      <link
                        rel="stylesheet"
                        href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,-25"
                      />
                      <span class="material-symbols-outlined">edit</span>

                      {/* a este boton se cambia despues de darle a editar para guardar los cambios */}
                      {/* <link
                      rel="stylesheet"
                      href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,200"
                    />
                    <span class="material-symbols-outlined">check</span> */}
                    </Button>
                  </Grid>
                  <Grid item sm={1}>
                    <Button variant="text">
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

