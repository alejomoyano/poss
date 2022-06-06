import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllRooms } from "./redux/slices/room";

import TaskBoard from "./components/Tasks/TaskBoardIndex";
import MainPage from "./components/Auth/MainPage";

function App() {
  const rooms = useSelector((state) => state.room.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  return (
    <>
      <TaskBoard />
    </>
  );
}

export default App;
