import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteField,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import TaskBoard from "../../models/TaskBoard";

const initialState = {
  value: {},
  error: null,
};

/**
 * Metodo para crear una taskboard
 */
const createTaskBoard = createAsyncThunk(
  "createTaskBoard",
  async (id, thunkAPI) => {
    try {
      //TODO -> creamos la taskboard con el mismo id que la room
      return thunkAPI.fulfillWithValue({ taskboard: taskboard });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const addTask = createAsyncThunk("addTask", async (content, thunkAPI) => {
  try {
    // TODO -> crear la tarea
  } catch (error) {}
});

const deleteTask = createAsyncThunk("deleteTask", async (content, thunkAPI) => {
  try {
    // TODO -> crear la tarea
  } catch (error) {}
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskBoard: (state, action) => {
      state.tasks = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(createTaskBoard.fulfilled, (state, action) => {
    //   state.value = action.payload.taskboard;
    //   state.error = initialState.error;
    // });
    // builder.addCase(createTaskBoard.rejected, (state, action) => {
    //   state.value = initialState.value;
    //   state.error = action.payload.error.message;
    // });
    // builder.addCase(addTask.fulfilled, (state, action) => {
    // //   state.value = action.payload.taskboard;
    // // });
    // builder.addCase(addTask.rejected, (state, action) => {
    //   state.error = action.payload.error.message;
    // });
  },
});

const { setTasks } = tasksSlice.actions;

// export const deleteTask = async (task) => {
//   try {
//     const app = getApp();
//     const db = getFirestore(app);
//     const tasksboard = doc(db, "tasksboards/1");
//     console.log(task);

//     await updateDoc(tasksboard, {
//       tasks: arrayRemove(task),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// agregamos una task añadiendola directamente de la base de datos
// export const addTask = async (task) => {
//   try {
//     const app = getApp();
//     const db = getFirestore(app);
//     const tasksboard = doc(db, "tasksboards/1");
//     console.log(task);

//     await updateDoc(tasksboard, {
//       tasks: arrayUnion(task),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export {
  // Thunks
  createTaskBoard,
  addTask,
  // Reducers
  // setTasks,
};

export default tasksSlice.reducer;
