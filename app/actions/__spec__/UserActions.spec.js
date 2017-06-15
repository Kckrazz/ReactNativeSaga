import * as UserActions from "../UserActions";

import { expect } from "chai";
import "mocha";

describe("UserActions", function() {
  describe("loginSuccess", function() {
    it("no payload", function() {
      const action = {
        error: "empty payload",
        type: "user:login:failure"
      };
      const result = UserActions.loginSuccess();
      expect(result.type).to.equal(action.type);
      expect(result.error).to.equal(action.error);
    });
    it("empty payload", function() {
      const payload = {};
      const action = {
        error: "empty payload",
        type: "user:login:failure"
      };
      const result = UserActions.loginSuccess(payload);
      expect(result.type).to.equal(action.type);
      expect(result.error).to.equal(action.error);
    });
    it("valid payload", function() {
      const payload = {
        id: 13,
        email: "user@example.com",
        created_at: "2016-08-18T11:56:30.796+10:00",
        updated_at: "2016-09-04T19:56:13.505+10:00",
        account_id: 1,
        phone: "0412345678",
        name: "John Smith",
        role: "staff",
        authentication_token: "ASDF-QwErTyUiOplKjHg",
        mobile: "0400000000",
        dob: "13/01/1987",
        address: "13 Ten St, The Rock",
        avatar: "jasnd.asdasd/ajsnj",
        level: "sw",
        invitation_token: null,
        invitation_created_at: "2016-08-18T11:56:30.791+10:00",
        invitation_sent_at: "2016-08-18T11:56:30.791+10:00",
        invitation_accepted_at: "2016-08-20T11:40:11.436+10:00",
        invitation_limit: null,
        invited_by_id: 1,
        invited_by_type: "User",
        archived_at: null,
        area_id: 7,
        dummy: false,
        external_id: "1234590"
      };
      const action = {
        payload: {
          address: "13 Ten St, The Rock",
          avatar: "jasnd.asdasd/ajsnj",
          dob: "13/01/1987",
          email: "user@example.com",
          id: 13,
          mobile: "0400000000",
          name: "John Smith",
          token: "ASDF-QwErTyUiOplKjHg"
        },
        type: "user:login:success"
      };
      const result = UserActions.loginSuccess(payload);
      expect(result.type).to.equal(action.type);
      expect(result.payload).to.deep.equal(action.payload);
    });
  });
});
