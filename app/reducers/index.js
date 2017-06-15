import { combineReducers } from "redux";

import ShiftsReducer from "./ShiftsReducer";
import UserReducer from "./UserReducer";
import LocationReducer from "./LocationReducer";
// import { reducer as form } from 'redux-form';

export default function rootReducer(NavReducer) {
  return combineReducers({
    shifts: ShiftsReducer,
    user: UserReducer,
    nav: NavReducer,
    location: LocationReducer
    // form:form
  });
}
