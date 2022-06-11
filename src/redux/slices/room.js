import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Room from '../../models/Room';

const initialState = {
  value: {},
  error: null,
};

const createRoom = createAsyncThunk("createRoom", async ({ username, roomname, maxUsers }, thunkAPI) => {
  try {
    //TODO agregar creacion de taskbord, chat y timer (los reducers)
    const roomDoc = await Room.create({ username, roomname, maxUsers });
    return thunkAPI.fulfillWithValue({ room: roomDoc });
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const joinRoom = createAsyncThunk("joinRoom" , async({username, roomname}, thunkAPI) =>{
  try {
    const roomDoc = new Room(`room/${roomname}`);
    await roomDoc.init();
    if (!roomDoc.hasData) {
      throw new Error(`There is no room with the name ${roomname}`);
    }
    await roomDoc.join(username);
    return thunkAPI.fulfillWithValue({ room: roomDoc });
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
})

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
      builder.addCase(joinRoom.fulfilled, (state, action) => {
        state.value = action.payload.room;
        state.error = initialState.error;
      });
      builder.addCase(joinRoom.rejected, (state, action) => {
        state.value = initialState.value;
        state.error = action.payload.error.message;
      });
  }
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