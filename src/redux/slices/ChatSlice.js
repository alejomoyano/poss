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

const initialState = {
  value: {
    document: {},
    mensajes: [],
  },
  timerState: "break",
  user:"Ignacio",
  error: null,
};

const createChat = createAsyncThunk(
  "createChat", 
  async (id, thunkAPI) => {
    try {
      const app = getApp();
      const db = getFirestore(app);
      
      // creamos el documento
      const document = doc(db, "chat", id);
      await setDoc(document, {
        mensajes: [
          {
            content: "Add messages",
            date: Date.now(),
          },
        ],
        },{user:null});

      // nos suscribimos al documento
      onSnapshot(
        document,
        (snapshot) => {
          const chat = snapshot.data().mensajes;
          
          return thunkAPI.dispatch(
            setMessages({ document: document, mensajes: chat })
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
});

const joinChat = createAsyncThunk(
  "joinChat",
  async (id, thunkAPI) => {
    try {
      const app = getApp();
      const db = getFirestore(app);

      // creamos el documento
      const document = doc(db, "chat", id);
      //await getDoc(document);

      // nos suscribimos al documento
      onSnapshot(
        document,
        (snapshot) => {
          const chat = snapshot.data().mensajes;

          return thunkAPI.dispatch(
            setMessages({
              document: document,
              mensajes: chat,
              timerState: "break",
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

export const messagesSlice = createSlice({
  name: "mensajes",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload;
    },
    setState: (state,action) => {
      state.value.timerState = action.payload;

    },
    setUsername: (state,action) =>{
      state.value.username = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createChat.fulfilled, (state, action) => {
      console.log(action.payload);
      state.value.document = action.payload.document;
      state.error = initialState.error;
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.error = action.payload.error.message;
    });
  },
});

const { setMessages } = messagesSlice.actions;

const addMessage = createAsyncThunk("addMessage", async (message, thunkAPI) => {
  try {
    const chat = thunkAPI.getState().chat.value.document;
    console.log(chat);

    await updateDoc(chat, {
      mensajes: arrayUnion(message),
    });
  } catch (error) {
    console.log(error);
  }
});

const chatUpdate = createAsyncThunk("taskUpdate", (_, thunkAPI) => {
  console.log("estamos en el update");
  const {
    chat: {
      value: { timerState },
    },
    timer: { status },
  } = thunkAPI.getState()
  // console.log(timerState)
  // console.log(status)

  if (status === 4) {
    // si esta en study
    console.log("cambiando a study");
    thunkAPI.dispatch(setState("study"));
  } else if (timerState === "study") {
    console.log("cambiando a break");

    // para entrar aca debe haber estado antes en study
    // porque puede haber estado en break antes y no es
    // necesario cambiar de estado de nuevo
    thunkAPI.dispatch(setState("break"));
  }
});

const changeTimerState = (state) => {
  const dispatch = useDispatch();
  dispatch(changeTimerState(state));
}

export { addMessage, 
  createChat,
  changeTimerState,
  chatUpdate,
  joinChat
   };

export const {
  setUsername,
} = messagesSlice.actions;

export default messagesSlice.reducer;
