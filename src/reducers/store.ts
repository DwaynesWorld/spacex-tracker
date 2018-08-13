declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

import { compose, createStore, applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./";

export let store: any;
const middlewares: Middleware[] = [];
middlewares.push(thunk);

if (process.env.NODE_ENV === `development`) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const { logger } = require(`redux-logger`);
  middlewares.push(logger);

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  store = createStore(rootReducer, enhancer);
} else {
  store = createStore(rootReducer, applyMiddleware(...middlewares));
}
