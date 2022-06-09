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
  value: {
    document: {},
    tasks: [],
  },
  error: null,
};

/**
 * Metodo para crear una taskboard
 */
const createTaskBoard = createAsyncThunk(
  "createTaskBoard",
  async (id, thunkAPI) => {
    try {
      const date = new Date(); // para obtener cuando fue creada
      const app = getApp();
      const db = getFirestore(app);

      // creamos el documento
      const document = doc(db, "tasksboards", id);
      await setDoc(document, {
        tasks: [
          {
            content: "Add tasks as you want and give them a state",
            date: date.getDate(),
          },
        ],
      });

      // nos suscribimos al documento
      onSnapshot(
        document,
        (snapshot) => {
          const taskboard = snapshot.data().tasks;
          console.log(taskboard);
          return thunkAPI.dispatch(
            setTasks({ document:document,tasks:taskboard })
          );
        },
        (error) => {
          return thunkAPI.rejectWithValue({ error });
        }
      );
      return thunkAPI.fulfillWithValue({ document });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const addTask = createAsyncThunk("addTask", async (task, thunkAPI) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    // TODO -> crear la tarea
    const tasksboard = thunkAPI.getState().task.value.document; // obtenemos el documento
    console.log(tasksboard);

    await updateDoc(tasksboard, {
      tasks: arrayUnion(task),
    });
  } catch (error) {
    console.log(error);
  }
});

const deleteTask = createAsyncThunk("deleteTask", async (task, thunkAPI) => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    // TODO -> crear la tarea
    const tasksboard = thunkAPI.getState().task.value.document; // obtenemos el documento
    console.log(tasksboard);

    await updateDoc(tasksboard, {
      tasks: arrayRemove(task),
    });
  } catch (error) {
    console.log(error);
  }
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTaskBoard.fulfilled, (state, action) => {
      console.log(action.payload)
      state.value.document = action.payload.document;
      state.error = initialState.error;
    });
    // builder.addCase(fetchTaskBoard.fulfilled, (state, action) => {
    //   state.value.document = action.payload.document;
    //   state.error = initialState.error;
    // });
    // builder.addCase(fetchTasks.rejected, (state, action) => {
    //   state.error = action.payload.error.message;
    // });
    // builder.addCase(addTask.fulfilled, (state, action) => {
    // //   state.value = action.payload.taskboard;
    // // });
    builder.addCase(createTaskBoard.rejected, (state, action) => {
      state.error = action.payload.error.message;
    });
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
  deleteTask,
  // fetchTasks,
  // Reducers
  // setTasks,
};

export default tasksSlice.reducer;
