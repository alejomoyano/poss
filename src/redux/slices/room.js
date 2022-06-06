import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  setDoc,
  doc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";

const initialState = {
  rooms: [],
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload.rooms;
    },
  },
});

const { setRooms } = roomSlice.actions;

const fetchAllRooms = createAsyncThunk("fetchAllRooms", async (_, thunkAPI) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    onSnapshot(
      collection(db, "room"),
      (snapshot) => {
        const rooms = snapshot.docs.map((doc) => doc.data());
        return thunkAPI.dispatch(setRooms({ rooms }));
      },
      (error) => {
        console.log(error);
        return thunkAPI.dispatch(setRooms({ error: error.message, rooms: [] }));
      }
    );
    return thunkAPI.dispatch(setRooms(initialState));
  } catch (error) {
    console.log(error);
    return thunkAPI.dispatch(setRooms({ error: error.message, rooms: [] }));
  }
});

// debemos crear la room, un taskboard, un chat y un timer
// supongo que debemos llamar a los 'reducers' de cada uno
export const addRoom = async (admin,id) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    console.log(admin);
    console.log(id);
    const newDoc = doc(db, "room", id);
    console.log(admin);
    await setDoc(newDoc, {
      admin,
      users: [],
    },{ merge: true });
  } catch (error) {
    console.log(error);
  }
};

export const enterRoom = async (name, room) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    console.log(name);
    console.log(room);

    const document = doc(db, "room", room.toString());
    await updateDoc(document, {
      users: arrayUnion(name),
    });

  } catch (error) {
    console.log(error);
  }
};

export {
  // Thunks
  fetchAllRooms,
  // Reducers
  setRooms,
};

export default roomSlice.reducer;
