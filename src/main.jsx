import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store/store";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import {ThemeProvider} from "./context/ThemeContext";
import {GridProvider} from "./context/gridContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <GridProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GridProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
