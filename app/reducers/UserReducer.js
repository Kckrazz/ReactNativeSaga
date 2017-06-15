import { Map } from "immutable";
import { handleActions } from "redux-actions";

import constants from "../constants";
import { REHYDRATE } from "redux-persist/constants";
const initialState = new Map({
  authError: null,
  authPending: false,
  initialising: false,
  email: null,
  address: null,
  avatar: null,
  dob: null,
  id: null,
  mobile: null,
  name: null,
  token: null
});

const { user } = constants.action;
export default handleActions(
  {
    [REHYDRATE]: (state, action) => {
      var incoming = action.payload.user;
      if (
        incoming &&
        (incoming.get("authError") != null ||
          incoming.get("authPending") === true)
      ) {
        return initialState.merge({ refresh: true });
      }
      return state;
    },
    [user.login.request]: (state, action) => {
      return state.merge({
        initialising: action.payload.initialising || false
      });
    },
    [user.login.pending]: state =>
      state.merge({
        authError: null,
        authPending: true
      }),

    [user.login.failure]: (state, action) =>
      initialState.merge({
        authError: action.error,
        authPending: false,
        initialising: false
      }),

    [user.login.success]: (state, action) => {
      return initialState.merge({
        ...action.payload,
        authPending: false,
        initialising: false
      });
    },

    [user.logout.success]: () => initialState
  },
  initialState
);
