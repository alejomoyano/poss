import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import TaskCreator from "./TaskCreator";

// conjunto de test del TaskCreator
describe("TaskCreator tests", () => {
  // componente
  let creator;
 
  // componentes hijos
  let textField;
  let button;

  // mocks
  let handleSubmit;

  beforeEach(() => {
    handleSubmit = jest.fn(); // mockeamos una funcion

    creator = render(<TaskCreator handleSubmit={handleSubmit} />);
    textField = creator.queryByPlaceholderText(
      "Ingrese el contenido de la tarea"
    );
    button = creator.getByTestId("submit-button");
  });

  // vemos si renderiza el taskcreator
  test("it renders both elements", () => {
    expect(textField).toBeTruthy();
    expect(button).toBeTruthy();
    //   debug(); //  muestra lo que renderiza
    //   creator.getByText("add");
  });

  //lo que vamos ingresando en el text field se guarda
  test("update on change the textfield content", () => {

    // le ponemos un valor al textfield
    fireEvent.change(textField, { target: { value: "hola" } });
    // verificamos que se haya ingresador el valor
    expect(textField.value).toBe("hola");
  });

  // no tenemos nada ingresado en el textfield
  test("clicking add task with no content", () => {
    fireEvent.click(button); // simulamos que clickeamos el boton
    // verifica que la funcion se llamo una vez
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  // ingresamos contenido en el textfield y damos click
  test("clicking add task with content", () => {
   
    fireEvent.change(textField, { target: { value: "hola" } });
    fireEvent.click(button);
    // verifica que la funcion se llamo una vez
    expect(handleSubmit).toHaveBeenCalled();
  });
});
