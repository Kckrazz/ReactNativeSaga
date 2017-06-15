import React from "react";
import "react-native";
import { ShiftHomeScene } from "../ShiftHomeScene";
import { Map } from "immutable";

import renderer from "react-test-renderer";
describe("ShiftHomeScene", () => {
  test("Should Render Snapshot Correctly", () => {
    const props = {
      busy: false,
      authenticated: true,
      error: null,
      navigation: {
        state: {
          params: {
            shift: {
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
              area_name: "Demo Area 2",
              clients: [],
              workers: []
            }
          }
        }
      }
      // shifts: new Map({})
    };
    const tree = renderer.create(<ShiftHomeScene {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
