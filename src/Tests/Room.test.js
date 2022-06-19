import React from "react";
// import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, getByTestId, getAllByTestId, screen } from "./test-utils";
import Home from "../pages/Home/Home";
import { Router, Route, Navigate, BrowserRouter } from "react-router-dom";
import {createMemoryHistory} from 'history'
import CreateRoom from "../pages/CreateRoom/CreateRoom";
import JoinRoom from "../pages/JoinRoom/JoinRoom";


// Home test
describe("Home test", () => {

//   let history;
//   // componente
//   let item;

//   let button = jest.fn()

//   beforeEach(() => {
   

//   });

  // estando en break debe reenderizar el brek item
  test("it renders the create room button", () => {

    const history = createMemoryHistory({initialEntries:['/']});
    //renderizamos home
    const item = render(
      <Router  location={history.location} navigator={history}>
        <Home />
      </Router>
    );

    const createButton = item.getByTestId("create-button");
    expect(createButton).toBeInTheDocument();
    // expect(history.location.pathname).toBe()
  });

  test("it renders the join button", () => {

    const history = createMemoryHistory({initialEntries:['/']});
    //renderizamos home
    const item = render(
      <Router  location={history.location} navigator={history}>
        <Home />
      </Router>
    );

    const joinButton = item.getByTestId("join-button");
    expect(joinButton).toBeInTheDocument();
  });
  
    test("navigate to /create after clicking create button", () => {

        const history = createMemoryHistory({initialEntries:['/']});
        //renderizamos home
        const item = render(
          <Router  location={history.location} navigator={history}>
            <Home />
          </Router>
        );

      const createButton = item.getByTestId("create-button");
      fireEvent.click(createButton);
      expect(history.location.pathname).toBe('/create')
    });

    test("navigate to a room after clicking create room button", () => {

        const history = createMemoryHistory({initialEntries:['/create']});
        //renderizamos home
        const item = render(
          <Router location={history.location} navigator={history}>
            <CreateRoom />
          </Router>
        );

        // obtenemos el boton
        const createButton = item.getByTestId("create-room-button");
        // obtenemos los textfields e ingresamos valores
        const username =  item.getByTestId("username").querySelector('input');
        const roomname =  screen.getByTestId("roomname").querySelector('input');
        const maxusers =  item.getByTestId("maxusers").querySelector('input');
        fireEvent.change(username, { target: { value: "user" } });
        fireEvent.change(roomname, { target: { value: "room" } });
        fireEvent.change(maxusers, { target: { value: "max" } });
        //creamos la sala
        fireEvent.click(createButton);
        // debemos esperar unos segundos antes de testear si pasamos a la room
        setTimeout(() => {
            expect(history.location.pathname).toBe('/room/room')
        
          }, 5000)

      });

  test("navigate to /join after clicking join button", async () => {

    const history = createMemoryHistory({initialEntries:['/']});
    //renderizamos home
    const item = render(
      <Router  location={history.location} navigator={history}>
        <Home />
      </Router>
    );

    const joinButton = item.getByTestId("join-button");
    fireEvent.click(joinButton);
    expect(history.location.pathname).toBe('/join')
  });

  test("navigate to a room after clicking join room button", () => {

    const history = createMemoryHistory({initialEntries:['/join']});
    //renderizamos home
    const item = render(
      <Router location={history.location} navigator={history}>
        <JoinRoom />
      </Router>
    );

    // obtenemos el boton
    const createButton = item.getByTestId("join-room-button");
    // obtenemos los textfields e ingresamos valores
    const username =  item.getByTestId("username").querySelector('input');
    const roomname =  screen.getByTestId("roomname").querySelector('input');
    fireEvent.change(username, { target: { value: "user" } });
    fireEvent.change(roomname, { target: { value: "room" } });
    //creamos la sala
    fireEvent.click(createButton);
    // debemos esperar unos segundos antes de testear si pasamos a la room
    setTimeout(() => {
        expect(history.location.pathname).toBe('/room/room')
    
      }, 5000)

  });

});
