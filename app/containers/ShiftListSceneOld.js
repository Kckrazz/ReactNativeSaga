import React, { Component } from "react";
import { AppRegistry, View, StyleSheet, FlatList } from "react-native";

import moment from "moment";
import CalendarStrip from "../components/Calendar/CalendarStrip";
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
  Thumbnail
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
import { autobind } from "core-decorators";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ShiftListItem from "../components/ShiftListItem";

const styles = StyleSheet.flatten({});
class ShiftListScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: moment(new Date()),
      data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 }
      ]
    };
  }

  static navigationOptions = {
    drawerLabel: "Shift",
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons
        name="account-circle"
        size={24}
        style={{ color: tintColor }}
      />
    )
  };
  @autobind onDateSelect(moment) {
    this.setState({ label: moment });
    // let randomIndex = Math.floor(
    //   Math.random(Date.now()) * this.state.data.length
    // );
    this.list.scrollToIndex({ animated: true, index: 5 });
  }
  _keyExtractor = (item, index) => item.id;

  getItemLayout = (data, index) => ({
    length: 150,
    offset: 150 * index,
    index
  });

  componentDidMount() {
    this.setState({ label: this.calender.getSelectedDate() });
  }
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#414141" }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.label.format("MMM YYYY ").toUpperCase()}</Title>
          </Body>

        </Header>
        <CalendarStrip
          ref={cal => {
            this.calender = cal;
          }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 2,
            borderHighlightColor: "black"
          }}
          // daySelectionAnimation={{
          //   type: "background",
          //   duration: 200,
          //   width: 150,
          //   highlightColor: "white"
          // }}
          style={{
            height: 60,
            backgroundColor: "#f6f7fb"
            // paddingLeft: 5,
            // paddingRight: 5
          }}
          calendarHeaderStyle={{ color: "white", display: "none" }}
          calendarColor={"#f6f7fb"}
          dateNumberStyle={{ color: "grey" }}
          dateNameStyle={{ color: "grey" }}
          highlightDateNumberStyle={{ color: "black" }}
          highlightDateNameStyle={{ color: "black" }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey" }}
          onDateSelected={this.onDateSelect}
          // iconStyle={{ padding: 10 }}
          // datesBlacklist={datesBlacklist}
          // iconLeft={require("../assets/image/left-arrow.png")}
          // iconRight={require("../assets/image/right-arrow.png")}
          iconContainer={{ flex: 0.1 }}
        />
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={{ backgroundColor: "#ffffff" }}
          initialNumToRender={this.state.data.length}
          keyExtractor={this._keyExtractor}
          getItemLayout={this.getItemLayout}
          data={this.state.data}
          renderItem={({ item }) => <ShiftListItem data={item} />}
        />
      </Container>
    );
  }
}

export default ShiftListScene;
