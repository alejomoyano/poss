import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const initialState = {
    rooms: [],
    error: null,
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload.rooms;
        },
    },
})

const { 
    setRooms,
} = roomSlice.actions

const fetchAllRooms = createAsyncThunk(
    'fetchAllRooms',
    async (_, thunkAPI) => {
        try {
            const app = getApp();
            const db = getFirestore(app);
            onSnapshot(collection(db, "room"),
            (snapshot) => {
                const rooms = snapshot.docs.map((doc) => doc.data());
                return thunkAPI.dispatch(setRooms({ rooms }));
            },
            (error) => {
                console.log(error);
                return thunkAPI.dispatch(setRooms({ error: error.message, rooms: [] }));
            });
            return thunkAPI.dispatch(setRooms(initialState));
        } catch (error) {
            console.log(error);
            return thunkAPI.dispatch(setRooms({ error: error.message, rooms: [] }));
        }
    }
)

export {
    // Thunks
    fetchAllRooms,
    // Reducers
    setRooms,
};

export default roomSlice.reducer