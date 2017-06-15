import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { DrawerItems } from "react-navigation";

import React, { Component } from "react";
import { Image, Platform, Dimensions } from "react-native";
import LogoutContainer from "./LogoutContainer";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import config from "../constants/ConfigConstants";
import { connect } from "react-redux";

class CustomDrawerContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const props = this.props;
    const drawerCover = require("../assets/image/white.jpg");

    const drawerImage = config.root.url + props.user.get("avatar");
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <Image source={drawerCover} style={styles.drawerCover}>
              <Image
                square
                style={styles.drawerImage}
                source={{ uri: drawerImage }}
              />
              <Text style={styles.drawerName}>{props.user.get("name")}</Text>
              <Text style={styles.drawerInfo}>{props.user.get("email")}</Text>
            </Image>
            <ScrollView>
              <DrawerItems {...props} />
            </ScrollView>
          </View>
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <LogoutContainer />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },
  drawerCover: {
    alignSelf: "stretch",
    // resizeMode: 'cover',
    height: deviceHeight / 2.5,
    width: null,
    position: "relative",
    marginBottom: Platform.OS === "android" ? 0 : -20
  },
  drawerImage: {
    // // left: (Platform.OS === 'android') ? 30 : 40,
    // left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
    // // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    alignSelf: "center",
    height: 120,
    width: 120,
    borderWidth: 1,
    borderRadius: 75,
    resizeMode: "cover"
  },
  drawerName: {
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    alignSelf: "center",
    color: "#47caeb",
    fontWeight: "bold",
    fontSize: 15
  },
  drawerInfo: {
    fontSize: 13,
    fontWeight: "bold",
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    alignSelf: "center"
  }
});

//make this component available to the app
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(CustomDrawerContentComponent);
