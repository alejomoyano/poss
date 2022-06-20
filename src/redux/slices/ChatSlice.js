import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

const initialState = {
  value: {
    document: {},
    mensajes: [],
    user:null,
  },
  timerState: "break",
  
  error: null,
};

const createChat = createAsyncThunk(
  "createChat", 
  async (arg, thunkAPI) => {
    try {
      const app = getApp();
      const db = getFirestore(app);
      // creamos el documento
      const document = doc(db, "chat", arg.id);
      await setDoc(document, {
        mensajes: [
          {
            content: "Add messages",
            date: Date.now(),
          },
        ],

        });

      // nos suscribimos al documento
      onSnapshot(
        document,
        (snapshot) => {
          const chat = snapshot.data().mensajes;
          
          return thunkAPI.dispatch(
            setMessages({ document: document, mensajes: chat, user:arg.username })
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
  async (arg, thunkAPI) => {
    try {
      const app = getApp();
      const db = getFirestore(app);

      // creamos el documento
      const document = doc(db, "chat", arg.id);
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
              user: arg.username
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
      state.timerState = action.payload;

    },
    
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

const { setMessages, setState } = messagesSlice.actions;

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
    chat: { timerState },
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
  setMessages,
  chatUpdate,
  joinChat
   };



export default messagesSlice.reducer;
