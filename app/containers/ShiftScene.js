import truncate from "lodash/truncate";
import React from "react";
import { autobind } from "core-decorators";
import { Linking } from "react-native";

import constants from "../constants";
import Scene from "../containers/Scene";

export default class ShiftScene extends Scene {
  getId() {
    return 1;
  }

  getShift() {
    return {
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
    };
  }

  getTitle() {
    return truncate(this.getShift().title || super.getTitle(), 30);
  }

  @autobind onSelectDescription() {
    this.navigate(constants.nav.shift.description, {
      id: this.props.id
    });
  }

  @autobind onSelectMap() {
    const url = `http://maps.apple.com/?ll=${this.getShift().coordinates}`;
    console.debug("Linking", url);
    Linking.openURL(url);
  }
}
