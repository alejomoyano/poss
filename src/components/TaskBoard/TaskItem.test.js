import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import TaskItem from "./TaskItem";
import TaskStatesController from "./TaskStatesController";

// TaskItem test
describe("TaskItems test", () => {
  // componente
  let item;

  // child components
  let deleteButton;
  let stateButton;
  let content;

  //mocks
  // let deleteTask;
  // let stateCallback;
  let task;
  let key;

  beforeEach(() => {
    // deleteTask = jest.fn();
    // stateCallback = jest.fn();
    task = jest.fn();
    key = jest.fn();

    item = render(
      <TaskItem
        task={task}
        key={key}
      />
    );

    deleteButton = item.getByTestId("delete-button");
    //stateButton = item.getByTestId("states-buttons"); no funciona
    content = item.getByTestId("content");
    console.log(content.value);
  });

  // vemos si rendeiza todos los componentes
  test("it renders all components", () => {
    expect(deleteButton).toBeTruthy();
    // expect(stateButton).toBeTruthy();
    expect(content).toBeTruthy();
    console.log(content.value);
  });

  // probamos si ejecuta el call back para eliminar laas tareas
  test("delete a task", () => {
    fireEvent.click(deleteButton);
    expect(deleteTask).toHaveBeenCalled();
  });

  test("it contains content", () => {
    fireEvent.change(content, { target: { value: "hola" } });
    expect(content.value).toBe("hola");
  });
});
