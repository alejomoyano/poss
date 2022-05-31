import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const initialState = {
  tasks: [],
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
  },
});

const { setTasks } = tasksSlice.actions;

const fetchTasks = createAsyncThunk("fetchTasks", async (_, thunkAPI) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => doc.data());
        return thunkAPI.dispatch(setTasks({ tasks }));
      },
      (error) => {
        console.log(error);
        return thunkAPI.dispatch(setTasks({ error: error.message, tasks: [] }));
      }
    );
    return thunkAPI.dispatch(setTasks(initialState));
  } catch (error) {
    console.log(error);
    return thunkAPI.dispatch(setTasks({ error: error.message, tasks: [] }));
  }
});

export {
  // Thunks
  fetchTasks,
  // Reducers
  setTasks,
};

export default tasksSlice.reducer;
