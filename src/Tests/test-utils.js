import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// importamos los slices
import task from "../redux/slices/tasks";
import room from "../redux/slices/room";
import timer from "../redux/slices/timer";
import chat from "../redux/slices/ChatSlice";

/**
 * Metodo custom de render para poder testear redux toolkit
 */
function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { task, room, timer, chat },
      preloadedState: {
        task: {
          value: {
            document: {},
            tasks: [
              {
                content: "testing",
                state: "active",
                date: 123,
              },
            ],
          },
          timerState: "break",
          error: "",
        },
        ChatSlice: {
          value: {
            document: {},
            mensajes: [
              {
                body: "testmsg",
                date: Date.now(),
              },
            ],
            user: "Ignacio",
          },
          timerState: "break",
          error: "",
        },
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
