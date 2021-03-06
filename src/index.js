import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { createStore, combineReducers, compose } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import gameReducer from "./store/reducers/game";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FB9039",
    },
    secondary: {
      main: "#a3d2ca",
    },
  },
});

const composeEnhancers =
  (process.env.REACT_APP_NODE_ENVX === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  game: gameReducer,
});

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
