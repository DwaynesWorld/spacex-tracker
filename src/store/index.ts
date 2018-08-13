declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware
} from "redux";
import thunk from "redux-thunk";
import { ILaunchesState, reducer as LauncherReducer } from "./launches_store";

export type AppThunkAction<TAction> = (
  dispatch: (action: TAction) => void
) => any;

export interface IApplicationState {
  launches: ILaunchesState;
}

const rootReducer = combineReducers({
  launches: LauncherReducer
});

const middlewares: Middleware[] = [];
middlewares.push(thunk);

export let store: any;
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
