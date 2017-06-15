import React from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  View
} from "react-native";
import { DrawerNavigator } from "react-navigation";
import ProfileScene from "./ProfileScene";
import CustomDrawerContentComponent from "./CustomDrawerContentComponent";
import ShiftListScene from "./ShiftListScene";

const deviceWidth = Dimensions.get("window").width;
const DrawerScreen = DrawerNavigator(
  {
    Profile: {
      path: "/profile",
      screen: ProfileScene
    },
    ShiftList: {
      path: "/schedule",
      screen: ShiftListScene
    }
    // Client: {
    //   path: "/",
    //   screen: <View />
    // }
  },
  {
    contentComponent: props => <CustomDrawerContentComponent {...props} />,
    drawerWidth: deviceWidth / 1.2,
    initialRouteName: "ShiftList",
    contentOptions: {
      activeTintColor: "#ffffff",
      activeBackgroundColor: "#00c0ef",
      style: {
        // marginVertical: 0,
        backgroundColor: "#f7f7f7"
      }
    }
  }
);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 20 : 0
  }
});

export default DrawerScreen;
