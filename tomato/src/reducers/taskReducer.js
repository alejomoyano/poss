import React from "react";
import { getAll, addNew, deleteOne, updateState } from "../data/tasksService";

// reducer que controla las acciones de las tareas
export const taskReducer = (tasks = [], action) => {
  if (action.type === "@tasks/init") {
    return action.payload;
  }
  if (action.type === "@tasks/new") {
    return [...tasks, action.payload];
  }
  if (action.type === "@tasks/delete") {
    const id = action.payload.id;
    let filteredTasks = tasks.filter((task) => task.id !== id);
    return filteredTasks;
  }
  if (action.type === "@tasks/change-state") {
    const id = action.payload.id;
    return tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          state: action.payload.state,
        };
      }
      return task;
    });
  }

  return tasks;
};

// eliminamos una tarea
export const deleteTask = (id) => {
  return async (dispatch) => {
    const task = await deleteOne(id);
    dispatch({
      type: "@tasks/delete",
      payload: {
        id,
      },
    });
  };
};

// creamos una nueva tarea
export const newTask = (content) => {
  return async (dispatch) => {
    const task = await addNew(content);
    dispatch({
      type: "@tasks/new",
      payload: task,
    });
  };
};

// cambiamos el estado de una tarea
export const changeState = (state, id) => {
  console.log(state);
  console.log(id);

  return async (dispatch) => {
    const task = await updateState(id, state);
    dispatch({
      type: "@tasks/change-state",
      payload: {
        id,
        state,
      },
    });
  };
};

// estado inicial al crear la sala
export const init = () => {
  return async (dispatch) => {
    const tasks = await getAll();
    dispatch({
      type: "@tasks/init",
      payload: tasks,
    });
  };
};
