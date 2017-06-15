import constants from "../constants";
import Logger from "../lib/Logger";
import {
  actionRequest,
  actionPending,
  actionFailure,
  actionSuccess
} from "./lib";

const typeLoad = constants.action.location.load;

export const locationRequest = () => actionRequest(typeLoad);
export const locationSuccess = data => actionSuccess(typeLoad, data);
export const locationPending = () => actionPending(typeLoad);
export const locationFailure = error => actionFailure(typeLoad, null, error);
