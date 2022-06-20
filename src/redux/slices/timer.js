import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskUpdate } from "./tasks";
import { chatUpdate } from "./ChatSlice";
import Swal from "sweetalert2";
// import TaskBoardObserver from "../../Observer/TaskBoardObserver";
// import TimerSubject from "../../Observer/TimerSubject";

var subsList = [];

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    minutes: 0,
    seconds: 0,
    studyTime: 0,
    shortBreak: 0,
    longBreak: 0,
    subCycle: 0,
    generalCycle: 0,
    status: 0,
    msg: "Configure the timer",
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setMinutes: (state, action) => {
      state.minutes = action.payload;
    },
    setSeconds: (state, action) => {
      state.seconds = action.payload;
    },
    setStudyTime: (state, action) => {
      state.minutes = action.payload;
      state.studyTime = action.payload;
    },
    setShortBreak: (state, action) => {
      state.shortBreak = action.payload;
    },
    setLongBreak: (state, action) => {
      state.longBreak = action.payload;
    },
    setMsg: (state, action) => {
      state.msg = action.payload;
    },
    incrementSubCycle: (state) => {
      state.subCycle++;
    },
    incrementGeneralCycle: (state) => {
      state.generalCycle++;
    },
    resetSubCycles: (state) => {
      state.subCycle = 0;
    },
    defaultShortBreak: (state) => {
      state.minutes = state.shortBreak;
      state.msg = "Short Break";
      state.status = 2;
      state.seconds = 0;
    },
    defaultLongBreak: (state) => {
      state.minutes = state.longBreak;
      state.msg = "Long Break";
      state.subCycle = 0;
      state.status = 3;
      state.seconds = 0;
    },
    defaultStudyTime: (state) => {
      state.minutes = state.studyTime;
      state.msg = "Study Time";
      state.status = 1;
      state.seconds = 0;
    },
    setTimes: (state) => {
      let input;
      
      //Inputs validate
      input = parseInt(prompt("Study Time"));
      while(isNaN(input) || input > 60 || input < 1){
        alert('Only times between 1 and 60');
        input = parseInt(prompt("Study Time"));
      }
      state.studyTime = input;
      state.minutes = state.studyTime;

      input = parseInt(prompt("Short Break"));
      while(isNaN(input) || input > 60 || input < 1){
        alert('Only times between 1 and 60');
        input = parseInt(prompt("Short Break"));
      }
      state.shortBreak = input;

      input = parseInt(prompt("Long Break"));
      while(isNaN(input) || input > 60 || input < 1){
        alert('Only times between 1 and 60');
        input = parseInt(prompt("Long Break"));
      }
      state.longBreak = input;

    },
  },
});

const subscribe = (sub) => {
  subsList.push(sub);
};

export const notify = createAsyncThunk("notify", (_, thunkAPI) => {
  subsList.forEach((sub) => {
    thunkAPI.dispatch(sub());
  });
});

export const setObservers = () => {
  console.log("suscribiendo al taskboard");
  subscribe(taskUpdate);
  subscribe(chatUpdate);
  //instanciar chat
  //subscribe del chat
};

export const {
  setStatus,
  setMinutes,
  setSeconds,
  setStudyTime,
  setShortBreak,
  setLongBreak,
  setMsg,
  incrementSubCycle,
  incrementGeneralCycle,
  resetSubCycles,
  defaultShortBreak,
  defaultLongBreak,
  defaultStudyTime,
  setTimes,
} = timerSlice.actions;

export default timerSlice.reducer;
