import React from "react";
import ReactDOM from "react-dom";
import "./common/styles/main.scss";
import {App} from "./routes/App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
