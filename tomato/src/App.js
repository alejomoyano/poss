import React from "react";
import "./App.css";
import TasksComponent from "./components/Tasks/TasksComponent";
import { taskReducer } from "./reducers/taskReducer";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = configureStore(
  {
    reducer: { taskReducer },
  },
  applyMiddleware(thunk),
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// console.log(store.getState().taskReducer)
export default function App() {
  return (
    <Provider store={store}>
      <TasksComponent />
    </Provider>
  );
}
