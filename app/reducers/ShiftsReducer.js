// import Immutable from "seamless-immutable";
import { handleActions } from "redux-actions";
import { Map } from "immutable";
import constants from "../constants";

const initialState = new Map();

const handleMerge = (state, action) => state.merge(action.payload);
const handleData = (state, action) => {
  return state.merge(action.payload);
};
const { shift, shifts, user } = constants.action;
export default handleActions(
  {
    [shift.clockin.pending]: (state, action) =>
      state.setIn([action.payload.id, "clockinBusy"], true),
    [shift.clockin.failure]: (state, action) =>
      state.setIn([action.payload.id, "clockinBusy"], false),
    [shift.clockin.success]: handleMerge,

    [shift.clockout.pending]: (state, action) =>
      state.setIn([action.payload.id, "clockoutBusy"], true),
    [shift.clockout.failure]: (state, action) =>
      state.setIn([action.payload.id, "clockoutBusy"], false),
    [shift.clockout.success]: handleMerge,

    [shifts.load.success]: handleData,

    [user.login.success]: () => initialState,
    [user.logout.success]: () => initialState
  },
  initialState
);
