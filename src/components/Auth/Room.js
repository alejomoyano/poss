import { useState } from "react";
import { Button, TextField } from "@mui/material";

export default function Room({ newRoomCallBack, enterRoomCallBack, getRoom }) {
  const [room, setRoom] = useState("");

  const handleEnterRoom = () => {
    enterRoomCallBack(room);
  };

  const handleNewRoom = () => {
    const randId = Math.floor(Math.random() * 9999999).toString()
    // console.log(randId)
    newRoomCallBack(randId);
  };
  return (
    <>
      <TextField
        variant="outlined"
        label="Room"
        size="small"
        onChange={(event) => setRoom(event.target.value)}
        required
        noValidate
      />
      <Button type="submit" variant="contained" onClick={handleEnterRoom}>
        Enter Room
      </Button>
      <Button type="submit" variant="contained" onClick={handleNewRoom}>
        Create New Room
      </Button>
    </>
  );
}
