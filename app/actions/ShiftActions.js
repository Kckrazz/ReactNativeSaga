import _fp from "lodash/fp";
import _ from "lodash";
import isUndefined from "lodash/isUndefined";
import { Alert } from "react-native";
import moment from "moment";
import constants from "../constants";
import {
  actionRequest,
  actionPending,
  actionFailure,
  actionSuccess
} from "./lib";

const ATTRIBUTES = [
  // 'account_id',
  // 'activity_cost',
  "accepted_at",
  "address",
  "area",
  // 'area_id',
  "area_name",
  "cancelled_at",
  "cancelled_reason",
  "clockin",
  "clockinMax",
  "clockinMin",
  "clockout",
  "clockoutMax",
  "clockoutMin",
  "coordinates",
  "coordinatesDelta",
  // 'confirmation',
  // 'created_at',
  "description",
  "description_path",
  "end",
  // 'end_at',
  "id",
  // 'invoice_id',
  // 'km',
  // 'pending',
  "program",
  // 'program_id',
  // 'rate_id',
  "start",
  // 'start_at',
  "status",
  // 'updated_at',
  "title",
  "url"
];

const transformShift = _fp.pick(ATTRIBUTES);

const transformShifts = _fp.reduce((map, v) => {
  const newMap = map;
  newMap[v.id] = transformShift(v);
  return newMap;
}, {});

const getDaysInMonth = (month, year) => {
  var date = new Date(year, month, 1);
  var days = {};
  while (date.getMonth() === month) {
    let d = moment(date).format("YYYY-MM-DD");
    days[d] = [];
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getRelatedShifts = (shifts, date) => {
  return shifts.filter(s => {
    return moment(s.start).local().format("YYYY-MM-DD") == date;
  });
};
const transformShiftList = payload => {
  const current_month = payload.date.month();
  const days = getDaysInMonth(current_month, payload.date.year());
  Object.entries(days).forEach(([key, value]) => {
    const relatedShifts = getRelatedShifts(payload.data, key);
    if (relatedShifts.length > 0) {
      days[key] = [...days[key], ...relatedShifts];
    }
  });
  return days;
};

//
// clockinShift
//
const typeClockin = constants.action.shift.clockin;

export const clockinShiftRequest = (id, lat, lng) =>
  actionRequest(typeClockin, { id, lat, lng });
export const clockinShiftPending = id => actionPending(typeClockin, { id });
export const clockinShiftFailure = (id, error) => {
  Alert.alert("Clockin Failed", `Error: ${error}`, [{ text: "OK" }]);
  return actionFailure(typeClockin, { id }, error);
};
export const clockinShiftSuccess = (id, payload) =>
  isUndefined(payload)
    ? clockinShiftFailure("server returned an empty response")
    : actionSuccess(typeClockin, { [id]: transformShift(payload.shift) });

//
// clockoutShift
//
const typeClockout = constants.action.shift.clockout;

export const clockoutShiftRequest = id => actionRequest(typeClockout, { id });
export const clockoutShiftPending = id => actionPending(typeClockout, { id });
export const clockoutShiftFailure = (id, error) => {
  Alert.alert("Clockout Failed", `Error: ${error}`, [{ text: "OK" }]);
  return actionFailure(typeClockout, { id }, error);
};
export const clockoutShiftSuccess = (id, payload) => {
  isUndefined(payload)
    ? clockinShiftFailure("server returned an empty response")
    : actionSuccess(typeClockout, { [id]: transformShift(payload.shift) });
};

//
// loadShifts
//
const typeLoad = constants.action.shifts.load;

export const loadShiftsRequest = date => actionRequest(typeLoad, date);
export const loadShiftsPending = () => actionPending(typeLoad);
export const loadShiftsFailure = error => actionFailure(typeLoad, null, error);
export const loadShiftsSuccess = payload =>
  isUndefined(payload)
    ? loadShiftsFailure("empty payload")
    : // : actionSuccess(typeLoad, payload));
      actionSuccess(typeLoad, transformShiftList(payload));
