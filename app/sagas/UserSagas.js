import isNil from "lodash/isNil";
// import CookieManager from 'react-native-cookies'
import { call, put, select } from "redux-saga/effects";
import { NavigationActions } from "react-navigation";
import actions from "../actions";
import constants from "../constants";
import fetchJSON from "../lib/fetchJSON";
import KeyValueStore from "../lib/KeyValueStore";
import Logger from "../lib/Logger.js";
import { purgeStore } from "../store/configureStore";
import { authenticated } from "../selectors/UserSelectors";
import { Alert } from "react-native";

const kvs = constants.config.keyValueStore;

export function* initialise() {
  // yield put(NavigationActions.navigate({ routeName: "Drawer" }));
  Logger.info("UserSagas:initialise");

  // const payload = yield call(KeyValueStore.multiGet, [kvs.user.token]);
  const payload = yield select(authenticated);
  if (payload) {
    Logger.log("UserSagas.initialise(): triggering login");
    yield put(NavigationActions.navigate({ routeName: "Drawer" }));
    // yield put(actions.user.loginRequestFromSaved(
    //   payload[kvs.user.email],
    //   payload[kvs.user.password]
    // ))
  }
}

export function* login(action) {
  Logger.info("UserSagas:login");
  let actionResult;

  yield put(actions.user.loginPending());

  try {
    const payload = action.payload;
    const json = yield call(
      fetchJSON.post,
      `${constants.config.api.url}/users/sign_in`,
      {
        payload
      }
    );
    yield call(KeyValueStore.multiSet, {
      [kvs.user.token]: json.data.authentication_token
    });
    actionResult = actions.user.loginSuccess(json.data);
  } catch (err) {
    // capture SagaCancellationException, but throw any js errors
    if (err.name === "SagaCancellationException") {
      Logger.log("UserSagas:load(): cancelled");
    } else if (err.response && err.response.status === 401) {
      actionResult = actions.user.loginFailure("Incorrect username / password");
      // Wipe stored username/password.
      yield call(KeyValueStore.multiRemove, [kvs.user.token]);
    } else if (err.response && err.response.status === 500) {
      actionResult = actions.user.loginFailure(
        "Server error, please try again later"
      );
    } else {
      Logger.warn("UserSagas:load(): failed", err, err.stack);
      actionResult = actions.user.loginFailure(err.message);
    }
  }

  // Putting yield outside the try/catch stops it capturing render errors.
  yield put(actionResult);
}

export function* loginSuccess() {
  Logger.info("UserSagas:loginSuccess");
  // Trigger loading of shifts.

  yield put(NavigationActions.navigate({ routeName: "Drawer" }));
  yield put(actions.shift.loadShiftsRequest());
}

export function* loginFail() {
  yield call(purgeStore, "user");
  // debugger;
}

export function* logout() {
  yield put(actions.user.logoutPending());
  try {
    yield call(KeyValueStore.multiRemove, [kvs.user.token]);
    yield call(purgeStore, "user");
    yield put(actions.user.logoutSuccess());
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      })
    );
  } catch (err) {
    yield put(actions.user.logoutFailure());
    Logger.warn("UserSagas:load(): failed", err, err.stack);
  }
}

export function* logoutFail() {
  NavigationActions.back();
  Alert.alert("Logout Error", `Try Again!!`, [{ text: "OK" }]);
}
