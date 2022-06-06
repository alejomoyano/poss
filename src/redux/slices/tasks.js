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
const createTaskBoard = createAsyncThunk("createTaskBoard", async (id, thunkAPI) => {
  try {
    // guaramos a la taskboard con el mismo id que la room
    const taskboard = await TaskBoard.create(id);
    return thunkAPI.fulfillWithValue({ taskboard: taskboard });
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

// eliminamos una task borrandola directamente de la base de datos
const addTask = createAsyncThunk("addTask", async (content, thunkAPI) => {
  try{
    const state = thunkAPI.getState();
    console.log(state)
    const taskboard = state.task.value;
    console.log(taskboard)
  } catch (error){
    return thunkAPI.rejectWithValue({ error });
  }
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
    builder.addCase(createTaskBoard.fulfilled, (state, { payload }) => {
      state.value = payload.taskboard;
    });
    builder.addCase(createTaskBoard.rejected, () => {
      state.error = payload.error.message;
    });
    // builder.addCase(addTask.fulfilled, (state, { payload }) => {
    //   state.value = payload.taskboard;
    // });
    builder.addCase(addTask.rejected, () => {
      state.error = payload.error.message;
    });
  },
});

const { setTasks } = tasksSlice.actions;


export const deleteTask = async (task) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    const tasksboard = doc(db, "tasksboards/1");
    console.log(task);

    await updateDoc(tasksboard, {
      tasks: arrayRemove(task),
    });
  } catch (error) {
    console.log(error);
  }
};

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
