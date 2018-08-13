import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

import registerServiceWorker from "./registerServiceWorker";
import { App } from "./App";
import { store } from "./reducers/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
