// import Immutable from "seamless-immutable";
import { handleActions } from "redux-actions";
import { Map } from "immutable";
import constants from "../constants";

const initialState = new Map({
  latitude: null,
  longitude: null,
  error: null,
  loading: false
});

const handleMerge = (state, action) => {
  return state.merge(action.payload);
};
const { location } = constants.action;
export default handleActions(
  {
    [location.load.pending]: (state, action) => {
      return state.merge({
        loading: true
      });
    },

    [location.load.success]: (state, action) => {
      return initialState.merge({
        ...action.payload,
        loading: false
      });
    }
  },
  initialState
);
