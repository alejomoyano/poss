import { configureStore } from "@reduxjs/toolkit";

import roomReducer from "./slices/room";
import tasksReducer from "./slices/tasks";

const store = configureStore({
  reducer: {
    room: roomReducer,
    task: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
