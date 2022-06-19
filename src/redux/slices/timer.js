import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskUpdate } from "./tasks";
import {chatUpdate} from "./ChatSlice";
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
      timerSubject.notify();
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
      state.msg = 'Short Break';
      setStatus(2);
      //state.status = 2;
      state.seconds = 0;
    },
    defaultLongBreak: (state) => {
      state.minutes = state.longBreak;
      state.msg = "Long Break";
      state.subCycle = 0;
      setStatus(3);
      //state.status = 3;
      state.seconds = 0;
    },
    defaultStudyTime: (state) => {
      state.minutes = state.studyTime;
      state.msg = 'Study Time';
      setStatus(1);
      //state.status = 1;
      state.seconds = 0;
    },
    setTimes: (state) => {
      state.studyTime = prompt("Study Time");
      state.minutes = state.studyTime;
      state.shortBreak = prompt("Short Break");
      state.longBreak = prompt("Long Break");
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
