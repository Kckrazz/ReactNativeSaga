import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Platform
} from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import actions from "../actions";
import constants from "../constants";
import selectors from "../selectors";
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Icon,
  Title
} from "native-base";
import ShiftListItem from "../components/ShiftListItem";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
export class ShiftListScene extends Component {
  static navigationOptions = {
    drawerLabel: "SCHEDULE",
    drawerIcon: ({ tintColor }) =>
      <Ionicons name="md-calendar" style={{ fontSize: 30, color: tintColor }} />
  };
  constructor(props) {
    super(props);
    this.state = {
      current: moment()
    };
  }
  @autobind
  changeDay(day) {
    let d = new Date(day.dateString);
    let date = moment(d);
    this.setState({
      current: date
    });
  }

  componentDidUpdate() {
    // var items = this.props.shifts.toJS();
    // console.log(this.props.shifts.toJS());
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  async checkIsLocation(): Boolean {
    let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2>Use Location?</h2> \
                            This app wants to change your device settings:<br/><br/>\
                            Use GPS for location<br/><br/>",
      ok: "YES",
      cancel: "NO"
    })
      .then(success => {
        const action = actions.location.locationRequest();
        this.props.dispatch(action);
      })
      .catch(error => {
        console.log(error.message);
      });

    return Object.is(check, "enabled");
  }
  componentDidMount() {
    if (Platform.OS === "android") {
      this.checkIsLocation();
    }
    const action = actions.location.locationRequest();
    this.props.dispatch(action);
  }

  render() {
    let title = this.state.current.format("YYYY-MM-DD");
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
            <Title>
              {this.state.current.format("MMM YYYY").toUpperCase()}
            </Title>
          </Body>
        </Header>
        <Agenda
          ref={ref => {
            this.agenda = ref;
          }}
          items={this.props.shifts.toJS()}
          loadItemsForMonth={this.loadItems}
          selected={title}
          onDayPress={this.changeDay}
          onDayChange={this.changeDay}
          theme={{}}
          // agenda container style
          style={{}}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
      </Container>
    );
  }

  @autobind
  loadItems(day) {
    const selected_date = moment(new Date(day.dateString));
    const action = actions.shift.loadShiftsRequest({ date: selected_date });
    this.props.dispatch(action);
  }

  @autobind
  _navigate(item) {
    const shift = this.props.shifts;
    const obj = shift.filter(s => {
      if (!s.isEmpty()) {
        let sh = s.toJS();
        let song = _.some(sh, { id: item.id });
        return song ? true : false;
      } else {
        return false;
      }
    });
    this.props.navigation.navigate("Shift", {
      shift: item,
      date: obj.keySeq().first()
    });
  }

  @autobind
  renderItem(item) {
    const _onClick = () => {
      this._navigate(item);
    };
    return (
      <TouchableOpacity onPress={_onClick}>
        <ShiftListItem data={item} />
      </TouchableOpacity>
    );
  }

  @autobind
  renderEmptyDate() {
    return <View style={styles.emptyDate}><Text>No Shifts!</Text></View>;
  }

  @autobind
  rowHasChanged(r1, r2) {
    return r1.title !== r2.title;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 5
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const mapStateToProps = state => ({
  busy: selectors.user.authPending(state),
  error: selectors.user.authError(state),
  authenticated: selectors.user.authenticated(state),
  shifts: state.shifts
});

export default connect(mapStateToProps)(ShiftListScene);
