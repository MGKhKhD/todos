import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import $ from "jquery";
import Popper from "popper.js";
window.jQuery = $;
window.Popper = Popper;
require("bootstrap");

const store = createStore(rootReducer, devToolsEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
