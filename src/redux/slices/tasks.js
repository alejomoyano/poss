import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Sorting from "../../Strategy/Sorting";
// objeto que nos permite ejecutar el tipo de sorting que necesitamos
const sortSelector = new Sorting();

const initialState = {
  value: {
    document: {},
    tasks: [],
  },
  timerState: "break",
  error: null,
};

/**
 * Metodo para crear una taskboard
 */
const createTaskBoard = createAsyncThunk(
  "createTaskBoard",
  async (id, thunkAPI) => {
    try {
      // const date = new Date(); // para obtener cuando fue creada
      const app = getApp();
      const db = getFirestore(app);

      // creamos el documento
      const document = doc(db, "tasksboards", id);
      await setDoc(document, {
        tasks: [
          {
            content: "Add tasks as you want and give them a state",
            date: Date.now(),
            state: "active",
          },
        ],
      });

      thunkAPI.dispatch(setState("break"));

      // nos suscribimos al documento
      onSnapshot(
        document,
        (snapshot) => {
          const taskboard = snapshot.data().tasks;

          return thunkAPI.dispatch(
            setTasks({ document: document, tasks: taskboard })
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

const joinTaskBoard = createAsyncThunk(
  "joinTaskBoard",
  async (id, thunkAPI) => {
    try {
      const app = getApp();
      const db = getFirestore(app);

      // creamos el documento
      const document = doc(db, "tasksboards", id);
      //await getDoc(document);
      thunkAPI.dispatch(setState("break"));
      // nos suscribimos al documento
      onSnapshot(
        document,
        (snapshot) => {
          const taskboard = snapshot.data().tasks;

          return thunkAPI.dispatch(
            setTasks({
              document: document,
              tasks: taskboard,
            })
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
    const tasksboard = thunkAPI.getState().task.value.document; // obtenemos el documento

    await updateDoc(tasksboard, {
      tasks: arrayUnion(task),
    });
  } catch (error) {
    console.log(error);
  }
});

const deleteTask = createAsyncThunk("deleteTask", async (task, thunkAPI) => {
  try {
    const tasksboard = thunkAPI.getState().task.value.document; // obtenemos el documento

    // eliminamos la tarea en concreto
    await updateDoc(tasksboard, {
      tasks: arrayRemove(task),
    });
  } catch (error) {
    console.log(error);
  }
});

const changeState = createAsyncThunk(
  "changeState",
  async ({ state, taskId }, thunkAPI) => {
    try {
      const tasksboard = thunkAPI.getState().task.value.document; // obtenemos el documento
      //obtenemos un snapshot del contenido del documento
      const snap = await getDoc(tasksboard);
      const tasks = snap.data().tasks;

      const temp = tasks.concat();
      temp.forEach((task) => {
        if (task.date == taskId) {
          task.state = state;
        }
      });
      console.log(temp);

      await updateDoc(tasksboard, {
        tasks: temp,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

const sortTasks = createAsyncThunk("sort", async (type, thunkAPI) => {
  try {
    const tasksboard = thunkAPI.getState().task.value.document; // obtenemos el documento
    //obtenemos un snapshot del contenido del documento
    const snap = await getDoc(tasksboard);
    const tasks = snap.data().tasks;

    const sortedTasks = sortSelector.sortS(tasks, type); // las ordenamos

    // actualizamos la base de datos con las tareas ordenadas
    await updateDoc(tasksboard, {
      tasks: sortedTasks,
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
    setState: (state, action) => {
      console.log(action.payload);
      state.timerState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTaskBoard.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value.document = action.payload.document;
      state.error = initialState.error;
    });

    builder.addCase(createTaskBoard.rejected, (state, action) => {
      state.error = action.payload.error.message;
    });
  },
});

// funcion que recibe la notificacion del subject y reacciona cambiando
// el estado del taskboard
const taskUpdate = createAsyncThunk("taskUpdate", (_, thunkAPI) => {
  const {
    task: { timerState },
    timer: { status },
  } = thunkAPI.getState();
  // console.log(timerState)
  // console.log(status)

  if (status === 4) {
    // si esta en study
    thunkAPI.dispatch(setState("study"));
  } else if (timerState === "study") {

    // para entrar aca debe haber estado antes en study
    // porque puede haber estado en break antes y no es
    // necesario cambiar de estado de nuevo
    thunkAPI.dispatch(setState("break"));
  }
});

const { setTasks, setState } = tasksSlice.actions;

export {
  createTaskBoard,
  joinTaskBoard,
  addTask,
  deleteTask,
  changeState,
  sortTasks,
  setState,
  taskUpdate,
};

export default tasksSlice.reducer;
