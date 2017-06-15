//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import moment from "moment";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  CheckBox,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Title,
  Separator,
  Thumbnail,
  Badge
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

// create a component
class ShiftListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ borderBottomWidth: 0 }}>
        <ListItem style={{ borderBottomWidth: 1, height: 150, width: width }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row"
              }}
            >
              <Ionicons
                name="ios-time-outline"
                style={{ fontSize: 20, paddingRight: 5 }}
              />
              <Text note>3:43PM - 9:00 AM</Text>
            </View>
            <Body
              style={{
                borderColor: "white",
                paddingLeft: 10,
                paddingTop: 10
              }}
            >
              <View>
                <Text>
                  Sint consectetur commodi moles {this.props.data.id}
                </Text>
                <Text note>
                  Kumar Pratik Cout Visa , UA
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  flex: 1,
                  paddingTop: 5
                }}
              >
                <View style={{ paddingLeft: 10 }}>
                  <Thumbnail
                    small
                    source={require("../assets/image/account.jpg")}
                  />
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <Thumbnail
                    small
                    source={require("../assets/image/account.jpg")}
                  />
                </View>
                <Right>

                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1
                    }}
                  >
                    <Text
                      style={{
                        color: "#00a65a",
                        fontSize: 15
                      }}
                    >
                      ACCEPTED{" "}
                    </Text>
                    <Ionicons
                      name="md-checkmark-circle"
                      style={{
                        fontSize: 20,
                        paddingRight: 5,
                        color: "#00a65a"
                      }}
                    />
                  </View>

                </Right>

              </View>

            </Body>

          </View>

        </ListItem>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default ShiftListItem;
