import keyMirrorNested from "keymirror-nested";

const glue = ":";
const prefix = "";

const ASYNC = {
  request: null,
  pending: null,
  success: null,
  failure: null
};

const ACTIONS = keyMirrorNested(
  {
    shift: {
      clockin: ASYNC,
      clockout: ASYNC
    },
    shifts: {
      load: ASYNC
    },
    location: {
      load: ASYNC
    },
    user: {
      login: ASYNC,
      logout: ASYNC
    }
  },
  glue,
  prefix
);

export default ACTIONS;
