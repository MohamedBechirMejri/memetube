import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import App from "./App";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyC6IsqH5XyN0qK-vjv5JHkduEjwQkLSoLo",
  authDomain: "beautube-fc973.firebaseapp.com",
  projectId: "beautube-fc973",
  storageBucket: "beautube-fc973.appspot.com",
  messagingSenderId: "716036336224",
  appId: "1:716036336224:web:4d4cca77dd6f9adb003105",
};
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
