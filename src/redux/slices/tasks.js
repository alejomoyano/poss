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
const createTaskBoard = createAsyncThunk("fetchTasks", async (id, thunkAPI) => {
  try {
    const taskboard = await TaskBoard.create(id);
    return thunkAPI.fulfillWithValue({ taskboard: taskboard });
  } catch (error) {
    return thunkAPI.fulfillWithValue({ error });
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
  },
});

const { setTasks } = tasksSlice.actions;

// const fetchTasks = createAsyncThunk("fetchTasks", async (_, thunkAPI) => {
//   try {
//     const app = getApp();
//     const db = getFirestore(app);
//     onSnapshot(
//       doc(db, "tasksboards", "1"),
//       (snapshot) => {
//         const tasks = snapshot.data().tasks;
//         return thunkAPI.dispatch(setTasks({ tasks }));
//       },
//       (error) => {
//         console.log(error);
//         return thunkAPI.dispatch(setTasks({ error: error.message, tasks: [] }));
//       }
//     );
//     return thunkAPI.dispatch(setTasks(initialState));
//   } catch (error) {
//     console.log(error);
//     return thunkAPI.dispatch(setTasks({ error: error.message, tasks: [] }));
//   }
// });

// eliminamos una task borrandola directamente de la base de datos
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
export const addTask = async (task) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    const tasksboard = doc(db, "tasksboards/1");
    console.log(task);

    await updateDoc(tasksboard, {
      tasks: arrayUnion(task),
    });
  } catch (error) {
    console.log(error);
  }
};

// // cambiamos el estado de una tearea
// const changeState = createAsyncThunk("changeState", async (newState, id) => {
//   try {
//     console.log(id)
//     const app = getApp();
//     const db = getFirestore(app);
//     const tasksboard = doc(db, "tasksboards", "1");
//     const dataTasks = await (await getDoc(tasksboard)).data().tasks;
//     const newTasksBoard = dataTasks.map((task) => {
//       if (task.id === id)
//         return {
//           ...task,
//           state: newState,
//         };
//       return task;
//     });
//     await updateDoc(tasksboard, {
//       tasks: newTasksBoard,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

export {
  // Thunks
  createTaskBoard,
  // Reducers
  // setTasks,
};

export default tasksSlice.reducer;
