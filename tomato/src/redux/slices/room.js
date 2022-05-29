import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const fetchAllRooms = createAsyncThunk(
    'fetchAllRooms',
    async (_, thunkAPI) => {
        try {
            const app = getApp();
            const db = getFirestore(app);
            const roomSnapshot = await getDocs(collection(db, "room"));
            const rooms = roomSnapshot.docs.map((doc) => doc.data());
            return { rooms };
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)

const initialState = {
    rooms: [],
    error: null,
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
            state.rooms = action.payload.rooms;
            state.error = initialState.error;
        });
        builder.addCase(fetchAllRooms.rejected, (state, action) => {
            state.rooms = initialState.rooms;
            state.error = action.error;
        })
    },
})

// const { 
//     // Add reducers here and export them
// } = roomSlice.actions

export {
    // Thunks
    fetchAllRooms
    // Reducers
};

export default roomSlice.reducer