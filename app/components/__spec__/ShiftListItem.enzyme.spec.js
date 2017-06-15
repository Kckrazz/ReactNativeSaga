import React from "react";
import { shallow, mount } from "enzyme";
import ShiftListItem, { getShiftStatus } from "../ShiftListItem";
import { expect } from "chai";
import sinon from "sinon";
import { Thumbnail } from "native-base";
import constant from "../../constants/ConfigConstants";

import Ionicons from "react-native-vector-icons/Ionicons";
describe("Shift List Component", () => {
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
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ShiftListItem {...props} />);

    expect(wrapper).to.have.length(1);
  });

  test("Should Render Workers Thumbnail", () => {
    expect(
      wrapper.contains(
        <Thumbnail
          small
          source={{
            uri: constant.root.url + "placehold.it/120x120&text=image1"
          }}
        />
      )
    ).to.equal(true);
  });

  test("Should Render Status according to the color and capitalized", () => {
    const status = [
      "completed",
      "cancelled",
      "approved",
      "rejected",
      "pending",
      "booked",
      "unverified",
      "asdas"
    ];
    status.map(s => {
      const stat = getShiftStatus(s);
      props.data.status = s;
      const wrapper = shallow(<ShiftListItem {...props} />);
      let title = s.toUpperCase();
      expect(
        wrapper.contains(
          <Ionicons
            name={stat.icon}
            style={{
              fontSize: 17,
              paddingRight: 5,
              color: stat.color
            }}
          />
        )
      ).to.equal(true);
      expect(wrapper.contains(title)).to.equal(true);
    });
  });
});
