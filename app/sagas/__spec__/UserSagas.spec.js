import actions from "../../actions";
import { assert } from "chai";
import { call, put } from "redux-saga/effects";
import constants from "../../constants";
import { login, logout } from "../UserSagas";
import fetchJSON from "../../lib/fetchJSON";
import KeyValueStore from "../../lib/KeyValueStore";
import { purgeStore } from "../../store/configureStore";

const kvs = constants.config.keyValueStore;
describe("User Login Saga", () => {
  const action = {
    error: {},
    payload: {
      user: {
        email: "suyog@vayu.com.au",
        password: "admin@123"
      }
    },
    type: constants.action.user.login.request
  };

  it("should return a login success action on successful login", () => {
    const generator = login(action);
    assert.deepEqual(
      generator.next().value,
      put(actions.user.loginPending()),
      "it should dispatch an action to start showing loading "
    );

    const json = generator.next().value;
    const payload = action.payload;
    assert.deepEqual(
      json,
      call(fetchJSON.post, `${constants.config.api.url}/users/sign_in`, {
        payload
      }),
      "waiting for login request"
    );

    const user = {
      data: {
        address: "Nepal",
        avatar: "www.asdjasnj.sadasd/asdsa",
        dob: "26/05/2017",
        email: "suyog@vayu.com.au",
        id: 91,
        mobile: "999999999",
        name: "Suyog",
        authentication_token: "4bNV_o_zVtoC_ReR7fXG"
      }
    };
    assert.deepEqual(
      generator.next(user).value,
      call(KeyValueStore.multiSet, {
        [kvs.user.token]: "4bNV_o_zVtoC_ReR7fXG"
      }),
      "it should save user token"
    );
    const gen = generator.next(user.data).value;
    assert.deepEqual(
      gen,
      put({
        error: {},
        payload: {
          address: "Nepal",
          avatar: "www.asdjasnj.sadasd/asdsa",
          dob: "26/05/2017",
          email: "suyog@vayu.com.au",
          id: 91,
          mobile: "999999999",
          name: "Suyog",
          token: "4bNV_o_zVtoC_ReR7fXG"
        },
        type: constants.action.user.login.success
      }),
      "putting success action"
    );
  });

  it("should return a login failed action on failed login", () => {
    const action = {
      error: {},
      payload: {
        user: {
          email: "gaurav@shiftcare.com",
          password: "admin@123asas"
        }
      },
      type: constants.action.user.login.request
    };

    const generator = login(action);
    assert.deepEqual(
      generator.next().value,
      put(actions.user.loginPending()),
      "it should dispatch an action to start showing loading "
    );

    let payload = action.payload;
    assert.deepEqual(
      generator.next().value,
      call(fetchJSON.post, `${constants.config.api.url}/users/sign_in`, {
        payload
      }),
      "waiting for login request"
    );

    const error = new Error("unexpected network error");
    assert.deepEqual(
      generator.throw(error).value,
      put(actions.user.loginFailure("unexpected network error")),
      "putting failure action"
    );
  });
});

describe("User Logout Saga", () => {
  it("should logout successfully", () => {
    const generator = logout();
    assert.deepEqual(
      generator.next().value,
      put(actions.user.logoutPending()),
      "it should dispatch an action to start logout pending "
    );
    assert.deepEqual(
      generator.next().value,
      call(KeyValueStore.multiRemove, [kvs.user.token]),
      "it should remove user token"
    );
    assert.deepEqual(
      generator.next().value,
      call(purgeStore, "user"),
      "it should remove user token"
    );

    assert.deepEqual(
      generator.next().value,
      put({
        error: {},
        payload: {},
        type: constants.action.user.logout.success
      }),
      "putting success logout action"
    );
  });
});
