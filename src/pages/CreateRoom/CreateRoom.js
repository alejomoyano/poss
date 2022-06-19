import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createRoom } from "../../redux/slices/room";

import { TextField, Button } from "../../components";
import { Container, ErrorMessage, Title } from "./styles";

const CreateRoom = () => {
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [maxUsers, setMaxUsers] = useState("");

  const navigate = useNavigate();

  const { error: roomError } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const newRoom = useCallback(async () => {
    const dispatchResult = await dispatch(
      createRoom({ username, roomname, maxUsers })
    );
    if (dispatchResult.type === "createRoom/fulfilled") {
      navigate(`/room/${roomname}`);
    }
  }, [username, roomname, maxUsers, dispatch, navigate]);

  return (
    <Container>
      <Title variant="h3" sx={{color: 'black'}}>Create a Room</Title>
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
      sx={{background: '#800080', fontSize: '20px'}}
        onClick={() => {
          newRoom();
          navigate("/create");
        }}
      >
        Create Room
      </Button>
      {roomError && <ErrorMessage>{roomError}</ErrorMessage>}
    </Container>
  );
};

export default CreateRoom;
