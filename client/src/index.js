import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store/index";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// MATERIAL UI
import {
  blueGrey,
  brown,
  amber,
  lime,
  deepOrange,
  green,
} from "@mui/material/colors";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
      contrastText: brown[300],
    },
    secondary: {
      main: lime[500],
      contrastText: brown[500],
    },
    error: deepOrange,
    warning: amber,
    succcess: green,
  },
});
//

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";
axios.defaults.withCredentials = true;
//axios("/services")

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
