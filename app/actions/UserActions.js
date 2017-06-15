import isEmpty from "lodash/isEmpty";

import constants from "../constants";
import Logger from "../lib/Logger";
import {
  actionRequest,
  actionPending,
  actionFailure,
  actionSuccess
} from "./lib";

//
// logout
//
const typeLogin = constants.action.user.login;

export const loginRequestFromSaved = (email, password) =>
  actionRequest(typeLogin, {
    initialising: true,
    user: {
      email,
      password
    }
  });
export const loginRequest = (email, password) =>
  actionRequest(typeLogin, {
    user: {
      email,
      password
    }
  });

export const loginPending = () => actionPending(typeLogin);
export const loginFailure = error => actionFailure(typeLogin, null, error);

export const loginSuccess = payload => {
  Logger.debug("loginSuccess:payload", payload);
  if (isEmpty(payload)) {
    return loginFailure("empty payload");
  }

  return actionSuccess(typeLogin, {
    address: payload.address,
    avatar: payload.avatar ? payload.avatar : constants.config.default.avatar,
    dob: payload.dob,
    email: payload.email,
    id: payload.id,
    mobile: payload.mobile,
    name: payload.name,
    token: payload.authentication_token
  });
};

//
// logout
//
const typeLogout = constants.action.user.logout;

export const logoutRequest = () => actionRequest(typeLogout);
export const logoutPending = () => actionPending(typeLogout);
export const logoutFailure = error => actionFailure(typeLogout, null, error);
export const logoutSuccess = () => actionSuccess(typeLogout);
