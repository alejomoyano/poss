import { configureStore } from "@reduxjs/toolkit";

import roomReducer from "./slices/room";
import tasksReducer from "./slices/tasks";
import ChatSliceReducer from "./slices/ChatSlice";

const store = configureStore({
  reducer: {
    room: roomReducer,
    task: tasksReducer,
    chat: ChatSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
