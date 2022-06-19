import reducer, {
  defaultShortBreak,
  incrementGeneralCycle,
  resetSubCycles,
  setStatus,
  setTimes,
} from "../redux/slices/timer";

describe("Timer tests", () => {
    const initialState  = {
        minutes: 0,
        seconds: 0,
        studyTime: 0,
        shortBreak: 0,
        longBreak: 0,
        subCycle: 0,
        generalCycle: 0,
        status: 0,
        msg: "Configure the timer",
      };

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should set status to 1", () => {
    expect(reducer(initialState, setStatus(1))).toEqual({
      minutes: 0,
      seconds: 0,
      studyTime: 0,
      shortBreak: 0,
      longBreak: 0,
      subCycle: 0,
      generalCycle: 0,
      status: 1,
      msg: "Configure the timer",
    });
  });

  test("should set msg, minutes,status, seconds to short break config", () => {
    initialState.shortBreak = 5;
    expect(reducer(initialState, defaultShortBreak())).toEqual({
      minutes: 5,
      seconds: 0,
      studyTime: 0,
      shortBreak: 5,
      longBreak: 0,
      subCycle: 0,
      generalCycle: 0,
      status: 2,
      msg: "Short Break",
    });
    initialState.shortBreak = 0;
  });

  test("should reset sub cycles", () => {
    initialState.subCycle = 5;
    expect(reducer(initialState, resetSubCycles())).toEqual({
      minutes: 0,
      seconds: 0,
      studyTime: 0,
      shortBreak: 0,
      longBreak: 0,
      subCycle: 0,
      generalCycle: 0,
      status: 0,
      msg: "Configure the timer",
    });
    initialState.subCycle = 0;
  });

  test("should increment general cycle", () => {
    expect(reducer(initialState, incrementGeneralCycle())).toEqual({
        minutes: 0,
        seconds: 0,
        studyTime: 0,
        shortBreak: 0,
        longBreak: 0,
        subCycle: 0,
        generalCycle: 1,
        status: 0,
        msg: "Configure the timer",
      })
  })

  //Da undefined dado que usa prompt para recibir los valores.
  test("should configure times", () => {
    expect(reducer(initialState, setTimes())).toEqual({
        minutes: undefined,
        seconds: 0,
        studyTime: undefined,
        shortBreak: undefined,
        longBreak: undefined,
        subCycle: 0,
        generalCycle: 0,
        status: 0,
        msg: "Configure the timer",
      })
  })


});
