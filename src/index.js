import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux";

import * as firebase from "firebase/app";
import { initFirestorter } from "firestorter";
import {getFirestore} from 'firebase/firestore'
import firebaseConfig from "./firebase";
import makeWebContext from 'firestorter/web';

firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.getApp();
const fireStore = getFirestore(firebaseApp)
initFirestorter(makeWebContext({ firebase: firebaseApp, firestore: fireStore }));

import TasksList from "./documents/TasksList";

const tasks = new TasksList("1");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
