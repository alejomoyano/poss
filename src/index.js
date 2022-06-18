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


import { BrowserRouter as Router } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.getApp();
const fireStore = getFirestore(firebaseApp)
initFirestorter(makeWebContext({ firebase: firebaseApp, firestore: fireStore }));


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
