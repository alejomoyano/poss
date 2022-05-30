import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { fetchAllRooms } from './redux/slices/room';

function App() {
  const rooms = useSelector((state) => state.room.rooms)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [
    dispatch,
  ]);

  return (
    <div>
      {rooms.map((room) => <div key={room.name}>{room.name}</div>)}
    </div>
  );
}
