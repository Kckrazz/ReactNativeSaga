import { call, put, select } from "redux-saga/effects";

import actions from "../actions";
import constants from "../constants";
import fetchJSON from "../lib/fetchJSON";
import selectors from "../selectors";
import Logger from "../lib/Logger";

import KeyValueStore from "../lib/KeyValueStore";

const kvs = constants.config.keyValueStore;
function userPositionPromised(accuracy) {
  const position = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      location => position.on({ location }),
      error => position.on({ error }),
      {
        enableHighAccuracy: accuracy,
        timeout: 10000,
        maximumAge: 3000
      }
    );
  }
  return {
    getLocation: () => new Promise(location => (position.on = location))
  };
}
export function* load(action) {
  Logger.info("LocationSagas:load");
  try {
    const { getLocation } = yield call(userPositionPromised, true);
    const { error, location } = yield call(getLocation);
    if (error) {
      const { getLocation } = yield call(userPositionPromised, false);
      const { error, location } = yield call(getLocation);
      if (!error) {
        yield put(
          actions.location.locationSuccess({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            error: null
          })
        );
      } else {
      }
    } else {
      yield put(
        actions.location.locationSuccess({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          error: null
        })
      );
    }
  } catch (err) {
    if (err.name === "SagaCancellationException") {
      Logger.log("LocationSagas:load(): cancelled");
    } else {
      Logger.warn("LocationSagas:load(): failed", err, err.stack);
    }
  }
}
