import * as ShiftSagas from "./ShiftSagas";
import * as UserSagas from "./UserSagas";

import * as LocationSagas from "./LocationSagas";

import { fork, join, takeEvery, takeLatest, all } from "redux-saga/effects";

import constants from "../constants";
import Logger from "../lib/Logger";
import { REHYDRATE } from "redux-persist/constants";
export default function* root() {
  Logger.info("rootSaga");
  // const subtasks = [];

  // // Setup listeners
  // subtasks.push(
  //   yield
  // );

  Logger.info("rootSaga: waiting for forked tasks");

  yield all([
    // // ShiftSagas
    takeEvery(constants.action.shift.clockin.request, ShiftSagas.clockin),
    // takeEvery(constants.action.shift.clockout.request, ShiftSagas.clockout),
    takeEvery(constants.action.shifts.load.request, ShiftSagas.load),

    takeLatest(constants.action.location.load.request, LocationSagas.load),
    // UserSagas
    takeLatest(constants.action.user.login.request, UserSagas.login),
    takeLatest(constants.action.user.login.success, UserSagas.loginSuccess),

    // takeLatest(constants.action.user.login.failure, UserSagas.loginFail),

    takeLatest(constants.action.user.logout.request, UserSagas.logout),

    takeLatest(constants.action.user.logout.failure, UserSagas.logoutFail),

    fork(UserSagas.initialise)
  ]);

  Logger.info("rootSaga: done");
}
