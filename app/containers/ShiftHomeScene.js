import React from "react";
import { autobind } from "core-decorators";
import {
  Alert,
  View,
  StyleSheet,
  Text as Txt,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  CheckBox,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Title,
  Footer,
  FooterTab,
  Thumbnail,
  Spinner
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import actions from "../actions";
import selectors from "../selectors";
import ShiftDetailInfo, { ShiftDescription } from "../components/ShiftDetailInfo";
import ShiftMap from "../components/ShiftMap";
import Collapsible from "react-native-collapsible";
import constant from "../constants/ConfigConstants";
import moment from "moment";
import geolib from "geolib";
import split from "lodash/split";

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return {
    location: state.location,
    shift: selectors.shift.getByDateId(
      state,
      ownProps.navigation.state.params.shift.id,
      ownProps.navigation.state.params.date
    )
  };
};
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height / 2.4
  },
  chamber: {
    flex: 0.5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#d4d4d0",
    alignItems: "center",
    height: 70
  },
  chamberText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12
  },
  clientName: {
    color: "#00c0ef",
    fontSize: 15
  },
  empty: {
    color: "#e17777",
    fontSize: 15
  },
  clientInfo: {
    color: "#8eb2d5",
    fontSize: 10
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500"
  }
});

export class ShiftHomeScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: "unknown",
      lastPosition: "unknown",
      isCollapsed: true,
      mapheight: 0
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.shift.title || "Shift",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#414141"
      }
    };
  };

  @autobind
  _toggleExpanded() {
    this.setState({ isCollapsed: !this.state.isCollapsed });
    // setTimeout(() => {
    if (!this.state.isCollapsed) {
      this._scrollView.scrollTo({ y: 470, animated: true });
    }
    // }, 1000);
  }
  @autobind
  scrollToStart() {
    // this._scrollView.scrollTo({ y: 500, animated: true });
  }

  watchID = null;
  @autobind
  _navigateToDescription() {
    this.props.navigation.navigate("ShiftDesc", {
      shift: this.props.navigation.state.params.shift,
      date: this.props.navigation.state.params.date
    });
  }
  @autobind
  onSelectMap() {
    // console.log("selected");
  }

  @autobind
  onShiftButtonClick() {
    // let staff_coord = this.props.navigation.state.params.shift.coordinates;
    // if (
    //   staff_coord &&
    //   this.props.location.get("latitude") &&
    //   this.props.location.get("longitude")
    // ) {
    //   const [latitude, longitude] = split(staff_coord, ",");
    //   const distance = geolib.getDistance(
    //     { latitude: latitude, longitude: longitude },
    //     {
    //       latitude: this.props.location.get("latitude"),
    //       longitude: this.props.location.get("longitude")
    //     }
    //   );
    //   console.log(distance);
    const action = actions.shift.clockinShiftRequest(
      this.props.navigation.state.params.shift.id,
      this.props.location.get("latitude"),
      this.props.location.get("longitude")
    );
    this.props.dispatch(action);
  }
  emptyView(object, style = {}) {
    const emptyStyle = StyleSheet.flatten([styles.empty, style]);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10
        }}
      >
        <Txt style={emptyStyle}>
          No {object}
        </Txt>
      </View>
    );
  }
  componentDidMount() {
    // console.log(this.props.shift.toJS());
    setTimeout(() => {
      var heightDiff = 0.5; // we don't want to change the height too much so keep it small. I've noticed 0.5 works best, as opposed to 0.1 doesn't work at all, and 0.5 is barely noticeable to the user.
      // switch the height between 0 and 0.5 and back.
      this.setState({
        mapheight: this.state.mapheight == heightDiff
          ? this.state.mapheight - heightDiff
          : this.state.mapheight + heightDiff
      });
    }, 100);
  }

  render() {
    const { state } = this.props.navigation;
    const start_time = moment(state.params.shift.start).local();
    const staff = state.params.shift.workers.length > 0
      ? state.params.shift.workers[0]
      : null;
    const client = state.params.shift.clients.length > 0
      ? state.params.shift.clients[0]
      : null;
    return (
      <Container>
        <View style={{ flex: 1, backgroundColor: "white" }}>

          <ScrollView
            ref={scrollView => {
              this._scrollView = scrollView;
            }}
          >
            <View style={styles.container}>
              {state.params.shift.coordinates
                ? <ShiftMap
                    style={[
                      ...StyleSheet.absoluteFillObject,
                      {
                        height: height / 2.4 + this.state.mapheight
                      }
                    ]}
                    onSelectMap={this.onSelectMap}
                    coordinates={state.params.shift.coordinates}
                  />
                : this.emptyView("Map Available!", {
                    color: "#e17777",
                    fontSize: 30
                  })}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#fafafa",
                paddingTop: 5,
                paddingBottom: 5
              }}
            >
              <View style={styles.chamber}>
                <View>
                  <Txt style={styles.chamberText}>STAFF</Txt>
                </View>
                {staff
                  ? <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                      <View style={{ padding: 5 }}>
                        <Thumbnail
                          small
                          source={{ uri: constant.root.url + staff.avatar }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 5 }}>
                        <View>
                          <Txt style={styles.clientName}>{staff.name}</Txt>
                        </View>
                        <View>
                          <Txt style={styles.clientInfo}>{staff.email}</Txt>
                        </View>
                      </View>
                    </View>
                  : this.emptyView("Staff")}
              </View>
              <View style={styles.chamber}>
                <View>
                  <Txt style={styles.chamberText}>CLIENT</Txt>
                </View>
                {client
                  ? <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                      <View style={{ padding: 5 }}>
                        <Thumbnail
                          small
                          source={{ uri: constant.root.url + client.avatar }}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 5 }}>
                        <View>
                          <Txt style={styles.clientName}>{client.name}</Txt>
                        </View>
                        <View>
                          <Txt style={styles.clientInfo}>{client.email}</Txt>
                        </View>
                      </View>
                    </View>
                  : this.emptyView("Client")}
              </View>

            </View>

            <ShiftDetailInfo
              icon="ios-calendar-outline"
              title="DATE"
              desc={start_time.format("dddd")}
              info={start_time.format("MMM Do YYYY")}
            />

            <ShiftDetailInfo
              icon="ios-time-outline"
              title="TIME"
              desc={start_time.format("h:mm A")}
            />

            <ShiftDetailInfo
              icon="ios-compass-outline"
              title="LOCATION"
              desc={state.params.shift.address}
              // info="View is Map"
            />
            <TouchableOpacity onPress={this._navigateToDescription}>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "row", flex: 0.4 }}>
                  <View>
                    <Ionicons
                      name="ios-list-outline"
                      style={{ fontSize: 20 }}
                    />
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Txt>DESCRIPTION</Txt>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.6,
                    justifyContent: "flex-end",
                    flexDirection: "row"
                  }}
                >
                  <View>
                    <Ionicons
                      name={
                        this.state.isCollapsed
                          ? "ios-arrow-dropright-circle-outline"
                          : "ios-arrow-dropright-circle-outline"
                      }
                      style={{ fontSize: 25 }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ padding: 20 }}>
              <Button block success onPress={this.onShiftButtonClick}>
                <Text>START</Text>
              </Button>

            </View>

          </ScrollView>

        </View>

      </Container>
    );
  }
}

export default connect(mapStateToProps)(ShiftHomeScene);
