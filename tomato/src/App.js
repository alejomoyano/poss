import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Chat from './components/Chat'
import { fetchAllRooms } from './redux/slices/room';
import ChatCreator from './components/ChatCreator'
import ChatScreen from './components/Chat';

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
      {ChatCreator}
      {ChatScreen()}

    </div>
  );
}

export default App;
