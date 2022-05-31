import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllRooms } from "./redux/slices/room";

import  TasksComponent  from "./components/Tasks/TasksComponent";

function App() {
  const rooms = useSelector((state) => state.room.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  return (
    <TasksComponent/>
  );
}

export default App;
