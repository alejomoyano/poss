import React, {
    useState,
    useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { joinRoom } from "../../redux/slices/room";

import {
    TextField,
    Button,
} from "../../components";
import {
    Container,
    ErrorMessage,
    Title,
} from "./styles";

const JoinRoom = () => {
    const [searchParams] = useSearchParams();

    const [username, setUsername] = useState("");
    const [roomname, setRoomname] = useState(searchParams.get("roomId") || "");

    const {
        error: roomError,
    } = useSelector((state) => state.room);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const join = useCallback(async () => {
        const dispatchResult = await dispatch(joinRoom({ username, roomname }));
        if (dispatchResult.type === 'joinRoom/fulfilled') {
            navigate(`/room/${roomname}`);
        }
    }, [
        dispatch,
        navigate,
        username,
        roomname,
    ]);

    return (
        <Container>
            <Title variant="h3" sx={{color: 'black'}}>Join a Room</Title>
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
                onClick={()=>{navigate('/room')}}
                onClick={join}
                sx={{fontSize: '20px'}}
            >
                Join Room
            </Button>
            {roomError && (<ErrorMessage>{roomError}</ErrorMessage>)}
        </Container>
    )
}

export default JoinRoom;