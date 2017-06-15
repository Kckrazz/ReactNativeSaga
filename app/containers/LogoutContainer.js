//import liraries
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { autobind } from "core-decorators";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import actions from "../actions";
// create a component
class LogoutContainer extends Component {
  constructor(props) {
    super(props);
  }
  @autobind _onLogOut() {
    const action = actions.user.logoutRequest();
    this.props.dispatch(action);
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this._onLogOut}
        style={{ flexDirection: "row", paddingBottom: 15, paddingRight: 10 }}
      >
        <Text style={{ paddingRight: 5 }}>LOG OUT</Text>
        <Ionicons name="md-power" style={{ fontSize: 20, paddingRight: 5 }} />
      </TouchableOpacity>
    );
  }
}

//make this component available to the app
const mapStateToProps = state => ({
  // authenticated: selectors.user.authenticated(state)
});

export default connect(mapStateToProps)(LogoutContainer);
