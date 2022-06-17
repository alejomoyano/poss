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
    timerState: "break"
  },
  error: null,
};

const createChat = createAsyncThunk("createChat", async (id, thunkAPI) => {
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
    });

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

export const messagesSlice = createSlice({
  name: "mensajes",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload;
    },
    setState: (state,action) => {
      state.value.timerState = action.payload;

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

const changeTimerState = (state) => {
  const dispatch = useDispatch();
  dispatch(setState(state));
}

export { addMessage, 
  createChat,
  changeTimerState };

export default messagesSlice.reducer;
