import { configureStore } from "@reduxjs/toolkit";

import roomReducer from "./slices/room";
import tasksReducer from "./slices/tasks";
import ChatSliceReducer from "./slices/ChatSlice";
import timerReducer from "./slices/timer"

const store = configureStore({
  reducer: {
    room: roomReducer,
    task: tasksReducer,
    chat: ChatSliceReducer,
    timer: timerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
