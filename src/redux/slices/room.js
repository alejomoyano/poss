import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTaskBoard } from "./tasks";

import Room from "../../models/Room";

const initialState = {
  value: {},
  error: null,
};

// const dispatch = useDispatch();

const createRoom = createAsyncThunk(
  "createRoom",
  async ({ username, roomname, maxUsers }, thunkAPI) => {
    try {
      //TODO agregar creacion de taskbord, chat y timer (los reducers)
      //TODO controlar la sala y el user no existan y q el maxusers sea mayor a 1

      // creamos la room
      const roomDoc = await Room.create({ username, roomname, maxUsers });
      // creamos la taskboard [ funciona ]
      thunkAPI.dispatch(createTaskBoard(roomname));
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
    } catch (error) {}
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
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.value = initialState.value;
      state.error = action.payload.error.message;
    });
  },
});

const { setRoom } = roomSlice.actions;

export {
  // Thunks
  createRoom,
  // Reducers
  setRoom,
};

export default roomSlice.reducer;
