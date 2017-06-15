import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import selectors from "../selectors";
import {
  Container,
  Content,
  ListItem,
  Text,
  CheckBox,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Title
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

// import DateBar from '../components/DateBar'
// import moment from 'moment'

class ProfileScene extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerLabel: "PROFILE",
    drawerIcon: ({ tintColor }) => (
      <Ionicons name="ios-contact" style={{ fontSize: 30, color: tintColor }} />
    )
  };

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
            <Title>Profile</Title>
          </Body>

        </Header>
        <View />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  avatar: selectors.user.avatar(state),
  email: selectors.user.email(state),
  name: selectors.user.name(state)
});

export default connect(mapStateToProps)(ProfileScene);
