import React from "react";
import "react-native";
import { ShiftListScene } from "../ShiftListScene";
import { Map } from "immutable";
import sinon from "sinon";
import renderer from "react-test-renderer";
describe("ShiftListScene", () => {
  test("Should Render Snapshot Correctly", () => {
    const props = {
      busy: false,
      authenticated: true,
      error: null,
      shifts: new Map({}),
      dispatch: sinon.spy()
    };
    const tree = renderer.create(<ShiftListScene {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
