import actions from "../../actions";
import { assert } from "chai";
import { call, put, select } from "redux-saga/effects";
import constants from "../../constants";
import { load } from "../ShiftSagas";
import fetchJSON from "../../lib/fetchJSON";
import KeyValueStore from "../../lib/KeyValueStore";
import { purgeStore } from "../../store/configureStore";
import moment from "moment";
import selectors from "../../selectors";

const kvs = constants.config.keyValueStore;
describe("Shift Saga", () => {
  const action = {
    error: {},
    payload: {
      date: moment(new Date("2017-12-12"))
    },
    type: constants.action.shifts.load.request
  };
  it("should load shift list from api to store", () => {
    const generator = load(action);
    assert.deepEqual(
      generator.next().value,
      put(actions.shift.loadShiftsPending()),
      "it should dispatch an action to start showing loading "
    );

    assert.deepEqual(
      generator.next().value,
      select(selectors.user.token),
      "it should get user token from store"
    );

    let payload = action.payload;
    assert.deepEqual(
      generator.next("token").value,
      call(
        fetchJSON.get,
        constants.config.api.url +
          `/shifts` +
          `?start_at=01/12/2017&end_at=31/12/2017`,
        {
          tokenBasic: "token"
        }
      ),
      "start load shift request"
    );
    const res = {
      data: [
        {
          id: 1,
          title: "test",
          start: "2017-05-26T13:45:00+10:00",
          end: "2017-05-26T13:45:00+10:00",
          url: "/users/areas/1/programs/1/shifts/1",
          address: "Karnataka, India",
          area: 1,
          program: 1,
          backgroundColor: "#f56954",
          borderColor: "#f56954",
          description: "asdasdasd",
          area_name: "Demo Area 2"
        }
      ],
      date: action.payload.date
    };
    assert.deepEqual(
      generator.next(res).value,
      put(actions.shift.loadShiftsSuccess(res)),
      "send shift load success action"
    );
  });

  it("should send error during load shift if no network ", () => {
    const generator = load(action);
    assert.deepEqual(
      generator.next().value,
      put(actions.shift.loadShiftsPending()),
      "it should dispatch an action to start showing loading "
    );

    assert.deepEqual(
      generator.next().value,
      select(selectors.user.token),
      "it should get user token from store"
    );

    let payload = action.payload;
    assert.deepEqual(
      generator.next("token").value,
      call(
        fetchJSON.get,
        constants.config.api.url +
          `/shifts` +
          `?start_at=01/12/2017&end_at=31/12/2017`,
        {
          tokenBasic: "token"
        }
      ),
      "start load shift request"
    );

    const error = new Error("unexpected network error");
    assert.deepEqual(
      generator.throw(error).value,
      put(actions.shift.loadShiftsFailure("unexpected network error")),
      "putting failure action"
    );
  });
});
