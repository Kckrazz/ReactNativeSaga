//import liraries
import React, { Component } from "react";
import { View, Text as Txt } from "react-native";
import { Text } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

// create a component
const ShiftDetailInfo = props => {
  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "flex-start"
      }}
    >
      <View style={{ flexDirection: "row", flex: 0.4 }}>
        <View>
          <Ionicons name={props.icon} style={{ fontSize: 20 }} />
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Txt>{props.title}</Txt>
        </View>
      </View>
      <View style={{ flex: 0.6 }}>
        <Txt
          style={{
            color: "black",
            fontSize: 13
          }}
        >
          {props.desc}
        </Txt>
        <Txt
          style={{
            color: "#8eb2d5",
            fontSize: 10
          }}
        >
          {props.info}
        </Txt>
      </View>
    </View>
  );
};

//make this component available to the app
export default ShiftDetailInfo;
