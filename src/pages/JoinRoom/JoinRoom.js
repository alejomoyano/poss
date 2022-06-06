import React, { useState } from "react";

import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { Container } from "./styles";

const JoinRoom = () => {
    const [username, setUsername] = useState("");
    const [roomname, setRoomname] = useState("");

    return (
        <Container>
            <TextField 
                label= 'username'
                onChange={(event) => setUsername(event.target.value)}
                value= {username}
            />
            <TextField 
                label= 'room name'
                onChange={(event) => setRoomname(event.target.value)}
                value= {roomname}
            />
            <Button
                onClick={()=>{}}
            >
                Join Room
            </Button>
        </Container>
    )
}

export default JoinRoom;