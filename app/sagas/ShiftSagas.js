import moment from "moment";
import { call, put, select } from "redux-saga/effects";

import actions from "../actions";
import constants from "../constants";
import fetchJSON from "../lib/fetchJSON";
import selectors from "../selectors";
import Logger from "../lib/Logger";
import { Alert } from "react-native";
import KeyValueStore from "../lib/KeyValueStore";

const kvs = constants.config.keyValueStore;
export function* clockin(action) {
  const id = action.payload.id;
  Logger.info(`ShiftSagas:clockin(#${id})`);
  yield put(actions.shift.clockinShiftPending(id));

  try {
    const token = yield select(selectors.user.token);
    const json = yield call(
      fetchJSON.put,
      constants.config.api.url + "/shifts/" + action.payload.id + "/clockin",
      {
        tokenBasic: token,
        payload: {
          latitude: action.payload.lat,
          longitide: action.payload.lng
        }
      }
    );

    yield put(actions.shift.clockinShiftSuccess(id, json));
  } catch (err) {
    // capture SagaCancellationException, but throw any js errors
    if (err.name === "SagaCancellationException") {
      Logger.log(`ShiftSagas:clockin(#${id}): cancelled`);
    } else {
      console.log(JSON.stringify(err));
      Logger.warn(`ShiftSagas:clockin(#${id}): failed`, err, err.stack);
      yield put(actions.shift.clockinShiftFailure(id, err.body.error));
    }
  }
}

export function* clockout(action) {
  const id = action.payload.id;
  Logger.info(`ShiftSagas:clockout(#${id})`);
  yield put(actions.shift.clockoutShiftPending(id));
  try {
    const token = yield select(selectors.user.token);
    const shifts = yield select(selectors.shift.groupedById);
    const urlAuthTokens = yield select(selectors.user.urlAuthTokens);

    const json = yield call(
      fetchJSON.put,
      constants.config.api.url +
        shifts[id].url +
        "/clockout" +
        `?${urlAuthTokens}`
    );
    yield put(actions.shift.clockoutShiftSuccess(id, json));
  } catch (err) {
    // capture SagaCancellationException, but throw any js errors
    if (err.name === "SagaCancellationException") {
      Logger.log(`ShiftSagas:clockout(#${id}): cancelled`);
    } else {
      Logger.warn(`ShiftSagas:clockout(#${id}): failed`, err, err.stack);
      yield put(actions.shift.clockoutShiftFailed(id, err.message));
    }
  }
}

export function* load(action) {
  Logger.info("ShiftSagas:load");

  yield put(actions.shift.loadShiftsPending());
  const selected_date = action.payload.date ? action.payload.date : moment();
  try {
    // const id = yield select(selectors.user.id);
    const token = yield select(selectors.user.token);

    // Download shifts for current month
    var startDate = moment(
      new Date(
        selected_date.format("YYYY") +
          "-" +
          selected_date.format("MM") +
          "-" +
          "01"
      )
    );
    var endDate = startDate.clone().endOf("month");
    const dateFormat = "DD/MM/YYYY";

    //for testing
    const json = yield call(
      fetchJSON.get,
      constants.config.api.url +
        `/shifts` +
        `?start_at=${startDate.format(dateFormat)}&end_at=${endDate.format(
          dateFormat
        )}`,
      {
        tokenBasic: token
      }
    );
    yield put(
      actions.shift.loadShiftsSuccess({
        data: json.data,
        date: selected_date
      })
    );
  } catch (err) {
    // capture SagaCancellationException, but throw any js errors
    if (err.name === "SagaCancellationException") {
      Logger.log("ShiftSagas:load(): cancelled");
    } else {
      Logger.warn("ShiftSagas:load(): failed", err, err.stack);
      yield put(actions.shift.loadShiftsFailure(err.message));
    }
  }
}
