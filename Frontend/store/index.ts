/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware, Store, compose } from "redux";
import { MakeStore, createWrapper } from "next-redux-wrapper";
import createSagaMiddleware, { Task } from "redux-saga";
import reducer, { AppState } from "./reducers";
import rootSaga from "./sagas";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

// create a makeStore function
export const makeStore: MakeStore<AppState> = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    process.env.NODE_ENV === "development"
      ? (typeof window !== "undefined" &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose
      : compose;

  // 2: Add an extra parameter for applying middleware:
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  // 3: Run your sagas on server
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<AppState>(makeStore, { debug: true });
