import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import TaskStatesController from "./TaskStatesController";

describe("TaskStatesController tests", () => {
  //componente
  let component;

  // componentes hijos
  let buttonS;
  let buttonP;
  let buttonA;
  let buttonT;

  // mocks
  const stateSuspended = jest.fn();
  const statePending = jest.fn();
  const stateActive = jest.fn();
  const stateTerminated = jest.fn();

  // esto se ejecuta una vez antes de cada test y nos queda guardado todo en la var componente
  beforeEach(() => {
    component = render(
      <TaskStatesController
        stateSuspended={stateSuspended}
        statePending={statePending}
        stateActive={stateActive}
        stateTerminated={stateTerminated}
      />
    );
    // obtenemos todos los botones
    buttonS = component.getByText("S");
    buttonP = component.getByText("P");
    buttonA = component.getByText("A");
    buttonT = component.getByText("T");
  });

  // vemos si rendeiza todos los componentes
  test("it renders all buttons", () => {
    //verificamos que sean renderizados
    expect(buttonS).toBeTruthy();
    expect(buttonP).toBeTruthy();
    expect(buttonA).toBeTruthy();
    expect(buttonT).toBeTruthy();
  });

  //tests donde verificamos si al presionar el boton se ejecuta la funcion adecuada
  test("executes change of state to Suspended", () => {
    fireEvent.click(buttonS);
    expect(stateSuspended).toHaveBeenCalled();
  });

  test("executes change of state to Pending", () => {
    fireEvent.click(buttonP);
    expect(stateSuspended).toHaveBeenCalled();
  });

  test("executes change of state to Active", () => {
    fireEvent.click(buttonA);
    expect(stateSuspended).toHaveBeenCalled();
  });

  test("executes change of state to Terminated", () => {
    fireEvent.click(buttonT);
    expect(stateSuspended).toHaveBeenCalled();
  });
});
