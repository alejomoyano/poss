import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTaskBoard, joinTaskBoard } from "./tasks";

import Room from "../../models/Room";
import { createChat } from "./ChatSlice";

const initialState = {
  value: {},
  error: null,
  isLoaded: false,
};

const createRoom = createAsyncThunk(
  "createRoom",
  async ({ username, roomname, maxUsers }, thunkAPI) => {
    try {
      const roomDoc = await Room.create({ username, roomname, maxUsers });

      // creamos un taskboard
      await thunkAPI.dispatch(createTaskBoard(roomname));

      // creamos un chat
      await thunkAPI.dispatch(createChat(roomname));
      return thunkAPI.fulfillWithValue({ room: roomDoc });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const joinRoom = createAsyncThunk(
  "joinRoom",
  async ({ username, roomname }, thunkAPI) => {
    try {
      const roomDoc = new Room(`room/${roomname}`);
      await roomDoc.init();
      if (!roomDoc.hasData) {
        throw new Error(`There is no room with the name ${roomname}`);
      }
      await roomDoc.join(username);
      // si existe la room entoncs debe suscribirse a la taaskboard de la room
      await thunkAPI.dispatch(joinTaskBoard(roomname));
      // TODO -> suscribirse a el chat
      return thunkAPI.fulfillWithValue({ room: roomDoc });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.value = action.payload.room;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.value = action.payload.room;
      state.error = initialState.error;
      state.isLoaded = true;
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.value = initialState.value;
      state.error = action.payload.error.message;
      state.isLoaded = false;
    });
    builder.addCase(joinRoom.fulfilled, (state, action) => {
      state.value = action.payload.room;
      state.error = initialState.error;
      state.isLoaded = true;
    });
    builder.addCase(joinRoom.rejected, (state, action) => {
      state.value = initialState.value;
      state.error = action.payload.error.message;
      state.isLoaded = false;
    });
  },
});

const { setRoom } = roomSlice.actions;

export {
  // Thunks
  createRoom,
  joinRoom,
  // Reducers
  setRoom,
};

export default roomSlice.reducer;
