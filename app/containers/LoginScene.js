import React from "react";
import { autobind } from "core-decorators";
import { KeyboardAvoidingView, Image, Animated, Easing } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  Text,
  View,
  Spinner
} from "native-base";
import actions from "../actions";
import constants from "../constants";
import selectors from "../selectors";
import { styles } from "./styles/LoginScene.style";

import { purgeStore } from "../store/configureStore";

const logo = require("../assets/image/logo.png");

export class LoginScene extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: ""
  };

  componentWillMount() {
    if (this.props.authenticated) {
      // this.props.navigation.navigate("Drawer");
    }
    this.animation = new Animated.Value(0);
  }
  componentWillReceiveProps(props) {
    if (props.error) {
      this.triggerAnimation();
    }
  }

  @autobind onLogin() {
    const { email, password } = this.state;
    if (!this.canBeSubmitted()) {
      return;
    }
    const action = actions.user.loginRequest(email, password);
    this.props.dispatch(action);
  }

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  hideErrors() {
    return true;
  }

  @autobind onChangeEmail(v) {
    this.setState({ email: v });
  }

  @autobind onChangePassword(v) {
    this.setState({ password: v });
  }
  renderLoad() {
    if (!this.props.busy) {
      return null;
    }
    return <Spinner color="black" style={{ marginTop: -40 }} />;
  }

  renderError() {
    if (!this.props.error) {
      return this.renderLoad();
    }

    return (
      <Text style={styles.error}>
        <Icon name="ios-alert" style={{ fontSize: 20, color: "red" }} />
        {"  "}
        {this.props.error}
      </Text>
    );
  }
  @autobind triggerAnimation() {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      duration: 400,
      toValue: 3,
      ease: Easing.bounce
    }).start();
  }
  render() {
    const interpolated = this.animation.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -10, 0, 10, 0, -10, 0]
    });
    const animeStyle = {
      transform: [
        {
          translateX: interpolated
        }
      ]
    };
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <Container>
        <View style={styles.container}>
          <Content style={styles.shadow}>
            <KeyboardAvoidingView behavior="position">
              <View style={styles.logoSection}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.logoName}>
                  {"ShiftCare"}
                </Text>
              </View>
              <View style={styles.bg}>
                <View style={{ paddingBottom: 10, height: 50 }}>
                  {this.renderError()}
                </View>

                <Item style={styles.input}>
                  <Input
                    placeholder="EMAIL"
                    onChangeText={this.onChangeEmail}
                    value={this.state.email}
                    returnKeyType="next"
                  />
                </Item>
                <Item style={styles.input}>

                  <Input
                    placeholder="PASSWORD"
                    onChangeText={this.onChangePassword}
                    value={this.state.password}
                    returnKeyType="go"
                    secureTextEntry
                  />
                  <Icon name="ios-help-circle-outline" />
                </Item>
                <Animated.View style={animeStyle}>
                  <Button
                    block
                    large
                    success
                    style={styles.btn}
                    disabled={this.props.busy || isDisabled}
                    onPress={this.onLogin}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      LOG IN
                    </Text>
                  </Button>
                </Animated.View>
              </View>
            </KeyboardAvoidingView>
          </Content>
        </View>
      </Container>
    );
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0 || !validateEmail(email),
    password: password.length === 0
  };
}

const mapStateToProps = state => ({
  busy: selectors.user.authPending(state),
  error: selectors.user.authError(state),
  authenticated: selectors.user.authenticated(state)
});

export default connect(mapStateToProps)(LoginScene);
