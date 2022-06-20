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
      let valor;
      valor = parseInt(prompt("Study Time"));
      if(isNaN(valor) || valor > 60 || valor < 0){
        state.studyTime = 5;
        alert('Only times between 0 and 60, default: 5 minutes');
      }else {
        state.studyTime = valor;
      }
      state.minutes = state.studyTime;
      valor = parseInt(prompt("Short Break"));
      if(isNaN(valor) || valor > 60 || valor < 0){
        state.shortBreak = 5;
        alert('Only times between 0 and 60, default: 5 minutes');
      }else {
        state.shortBreak = valor;
      }
      valor = parseInt(prompt("Long Break"));
      if(isNaN(valor) || valor > 60 || valor < 0){
        state.longBreak = 5;
        alert('Only times between 0 and 60, default: 5 minutes');
      }else {
        state.longBreak = valor;
      }
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
