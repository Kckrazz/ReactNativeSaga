import React from "react";
import "react-native";
import renderer from "react-test-renderer";
import ShiftListItem from "../ShiftListItem";
jest.unmock("../ShiftListItem");

describe("Shift List Item", () => {
  const props = {
    data: {
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
      workers: [
        {
          id: 12,
          avatar: "placehold.it/120x120&text=image1"
        }
      ],
      status: "cancelled"
    }
  };

  test("Should Render Snapshot Correctly", () => {
    const tree = renderer.create(<ShiftListItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
