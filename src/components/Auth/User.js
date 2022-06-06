import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

export default function User({userCallBack}){
  const [name, setName] = useState(""); //Hook para guardar el name

  const handleSubmit = () => {userCallBack(name)};

  return (
    <>
      <TextField
        variant="outlined"
        label="Nombre"
        size="small"
        onChange={(event) => setName(event.target.value)}
        required
        noValidate
      />
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};
