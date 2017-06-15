//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import moment from "moment";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  Thumbnail
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

import constant from "../constants/ConfigConstants";

const { width } = Dimensions.get("window");

// create a component
class ShiftListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderAvatar(workers) {
    var size = 3;
    return workers.slice(0, size).map(i => {
      return (
        <View style={{ paddingLeft: 10 }} key={i.id}>
          <Thumbnail small source={{ uri: constant.root.url + i.avatar }} />
        </View>
      );
    });
  }
  render() {
    const data = this.props.data;
    const start_time = moment(data.start).local().format("LT");
    const status = getShiftStatus(data.status);
    status.title = data.status ? data.status.toUpperCase() : "";
    const workers = data.workers.length > 0 ? data.workers[0] : [];
    return (
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text note>{start_time} </Text>
              <Text>{data.title}</Text>
              <Text note> {data.address}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Left>
            {this.renderAvatar(data.workers)}

          </Left>
          <Right>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                paddingTop: 10
              }}
            >
              <Text
                style={{
                  color: status.color,
                  fontSize: 12
                }}
              >
                {status.title}{" "}
              </Text>
              <Ionicons
                name={status.icon}
                style={{
                  fontSize: 17,
                  paddingRight: 5,
                  color: status.color
                }}
              />
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export function getShiftStatus(params) {
  switch (params) {
    case "cancelled":
      return {
        icon: "md-remove-circle",
        color: "#FF5722"
      };

    case "completed":
      return {
        icon: "md-checkmark-circle",
        color: "#2196F3"
      };

    case "approved":
      return {
        icon: "md-checkmark-circle",
        color: "#3F51B5"
      };

    case "rejected":
      return {
        icon: "md-thumbs-down",
        color: "#FF5722"
      };

    case "pending":
      return {
        icon: "md-time",
        color: "#f44336"
      };

    case "booked":
      return {
        icon: "md-calendar",
        color: "#00a65a"
      };

    case "unverified":
      return {
        icon: "md-warning",
        color: "#FF5722"
      };

    default:
      return {
        icon: "md-warning",
        color: "#FF5722"
      };
  }
}

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default ShiftListItem;
