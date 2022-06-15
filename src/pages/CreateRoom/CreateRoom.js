import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { observer } from "mobx-react";

import { createRoom } from "../../redux/slices/room";

import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [maxUsers, setMaxUsers] = useState("");

  const navigate = useNavigate();

  const { value: roomDoc, error: roomError } = useSelector(
    (state) => state.room
  );
  const dispatch = useDispatch();
  // debemos crear una room nueva
  const newRoom = useCallback(() => {
    dispatch(createRoom({ username, roomname, maxUsers }));
  }, [username, roomname, maxUsers, dispatch]);

  return (
    <Container>
      <TextField
        label="username"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
      />
      <TextField
        label="room name"
        onChange={(event) => setRoomname(event.target.value)}
        value={roomname}
      />
      <TextField
        label="max users"
        onChange={(event) => setMaxUsers(event.target.value)}
        value={maxUsers}
        type="number"
      />
      <Button
        onClick={() => {
          newRoom();
          navigate("/room");
        }}
      >
        Create Room
      </Button>
      {roomError && <div>{roomError}</div>}
      {roomDoc.admin && <div>{roomDoc.admin}</div>}
    </Container>
  );
};

// Envolver el componente en observer nos permite mostrar cambios en tiempo real
// para los documentos/colecciones instanciados con firestorter
export default observer(CreateRoom);
