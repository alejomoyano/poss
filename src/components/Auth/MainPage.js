import React, { useEffect, useState } from "react";
import  User  from "./User";
import  Room  from "./Room";
import { addRoom, enterRoom } from "../../redux/slices/room";

export default function MainPage() {


  const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
  // debemos crear una room nueva
  const newRoom = (room) => {
      console.log(room)
    addRoom(name, room);
  };

  // accedemos a una room ya creada
  const accessToRoom = (room) => {
    enterRoom(name, room);
  };


  return (
    <>
      <User userCallBack={setName} />
      <Room
        newRoomCallBack={newRoom}
        enterRoomCallBack={accessToRoom}
        // getRoom={setRoom}
      />
    </>
  );
}
