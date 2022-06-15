import { configureStore } from '@reduxjs/toolkit'

import roomReducer from './slices/room';
import timerReducer from './slices/timer.js'

const store = configureStore({
  reducer: {
    room: roomReducer,
    timer: timerReducer,
  },
})

export default store;
