import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import CatchPromise from "redux-catch-promise";
import { compose, createStore, applyMiddleware } from "redux";
import Immutable from "immutable";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import { AsyncStorage } from "react-native";
import {
  createTransform,
  persistStore,
  autoRehydrate,
  purgeStoredState
} from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";

export default function configureStore(navReducer) {
  const sagaMiddleware = createSagaMiddleware();

  const args = GLOBAL.__DEV__
    ? [
        new CatchPromise(),
        sagaMiddleware,
        createLogger({
          stateTransformer: state => {
            let newState = {};

            for (var i of Object.keys(state)) {
              if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
              } else {
                newState[i] = state[i];
              }
            }

            return newState;
          }
        })
      ]
    : [new CatchPromise(), sagaMiddleware];
  const createStoreWithMiddleware = compose(
    // Enables your middleware:

    applyMiddleware(...args),
    autoRehydrate()
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer(navReducer));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  persistStore(
    store,
    {
      storage: AsyncStorage,
      transforms: [immutableTransform()],
      whitelist: ["user"]
    },
    () => {
      sagaMiddleware.run(rootSaga);
    }
  );

  return store;
}

export async function purgeStore(...user) {
  await purgeStoredState({ storage: AsyncStorage }, user);
}
