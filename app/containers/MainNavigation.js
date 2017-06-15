import _ from "lodash";
import React from "react";
import { Navigator } from "react-native";

import constants from "../constants";
import BasicScene from "../containers/BasicScene";
import MyText from "../components/MyText";
import ProfileScene from "../containers/ProfileScene";
import Scene from "../containers/Scene";
import ScheduleScene from "../containers/ScheduleScene";
import ShiftDescriptionScene from "../containers/ShiftDescriptionScene";
import ShiftHomeScene from "../containers/ShiftHomeScene";

function renderScene(route, navigator) {
  const props = _.assign(
    {
      navigator,
      route: _.omit(route, "payload")
    },
    route.payload
  );

  switch (route.id) {
    case constants.nav.profile:
      return <ProfileScene {...props} />;

    case constants.nav.schedule:
      return <ScheduleScene {...props} />;

    case constants.nav.shift.home:
      return <ShiftHomeScene {...props} />;

    case constants.nav.shift.description:
      return <ShiftDescriptionScene {...props} />;

    case constants.nav.scene:
      return <Scene {...props} />;

    default:
      return (
        <BasicScene title="Routing Error">
          <MyText.Paragraph>
            Error Code: NAV:{route.id}
          </MyText.Paragraph>
        </BasicScene>
      );
  }
}

const MainNavigation = () => (
  <Navigator
    initialRoute={{ id: constants.nav.schedule, index: 0 }}
    renderScene={renderScene}
  />
);

MainNavigation.displayName = "MainNavigation";

export default MainNavigation;
