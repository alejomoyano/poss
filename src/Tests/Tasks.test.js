import React from "react";
// import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "./test-utils";
import Tasks from "../components/TaskBoard/Tasks";
import { TaskBoard } from "../components";
import ItemStudy from "../components/TaskBoard/ItemStudy"

// TaskItems test
describe("Task Items test", () => {
  // componente
  let item;

  beforeEach(() => {
    //renderizamos taskitem
    item = render(<Tasks />);
  });

  // estando en break debe reenderizar el brek item
  test("it renders Task Item Break in Break State", () => {
    const itemBreak = item.getByTestId("task-item-break");
    expect(itemBreak).toBeInTheDocument();
  });

  test("it renders the task content", () => {
    const content = item.getByText("testing");
    expect(content).toBeInTheDocument();
  });

  test("it renders the delete task button", () => {
    const button = item.getByTestId("delete-button");
    expect(button).toBeInTheDocument();
  });

  test("click the delete button", () => {
    const content = item.getByText("testing");
    const button = item.getByTestId("delete-button");
    fireEvent.click(button);

    setTimeout(() => {
      //checkeamos que no este mas la tarea renderizada
      expect(content).not.toBeInTheDocument();
    }, 5000);
  });
});

// TaskItems test
describe("Task Creator test", () => {
  // componente
  let item;

  beforeEach(() => {
    //renderizamos taskitem
    item = render(<TaskBoard />);
  });

  // deberia renderizar el textfield, el boton y el seleccionador de sort
  test("it renders all creator component", () => {
    // vemos si esta el textfield
    const textField = item.queryByPlaceholderText("Tasks");
    expect(textField).toBeInTheDocument();

    // vemos si esta el boton
    const button = item.getByTestId("submit-button");
    expect(button).toBeInTheDocument();

    // vemos si esta el sort selector
    const selector = item.getByTestId("sort-selector");
    expect(selector).toBeInTheDocument();
  });

  test("it creates a task", () => {
    // ingresamos un valor en el text field
    const textField = item.queryByPlaceholderText("Tasks");
    fireEvent.change(textField, { target: { value: "test task" } });

    const button = item.getByTestId("submit-button");

    fireEvent.click(button);

    // debemos esperar unos segundos
    setTimeout(() => {
      expect(screen.getByText("test task")).toBeInTheDocument();
    }, 5000);
  });
});


// // item study test
// describe("Study task item ",() => {
//   let item;

//   beforeEach(() => {
//     //renderizamos taskitem
//     item = render(<ItemStudy />);
//   });

//   test("it renders the task content", () => {
//     const content = item.getByText("testing");
//     expect(content).toBeInTheDocument();
//   });
// })