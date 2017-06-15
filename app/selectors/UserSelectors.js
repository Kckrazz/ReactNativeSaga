import isEmpty from "lodash/isEmpty";
import { createSelector } from "reselect";

// properties
export const avatar = s => s.user.get("avatar");
export const email = s => s.user.get("email");
export const id = s => s.user.get("id");
export const token = s => s.user.get("token");
export const name = s => s.user.get("name");
export const mobile = s => s.user.get("mobile");

// state
export const authenticated = createSelector(token, _token => !isEmpty(_token));
export const authError = s => s.user.get("authError");
export const authPending = s => s.user.get("authPending");
export const initialised = s => !s.user.get("initialising");
export const urlAuthTokens = createSelector(
  email,
  token,
  (_email, _token) =>
    `user_email=${encodeURIComponent(_email)}` +
    `&user_token=${encodeURIComponent(_token)}`
);
