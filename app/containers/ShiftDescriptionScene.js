import React, { PureComponent } from "react";
import { StyleSheet, View, WebView, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { autobind } from "core-decorators";
import constants from "../constants";
import selectors from "../selectors";
import { Container, Button, Text } from "native-base";
import constant from "../constants/ConfigConstants";

import MyWebView from "../components/MyWebView";
const mapStateToProps = (state, ownProps) => ({
  token: selectors.user.token(state),
  shift: selectors.shift.getByDateId(
    state,
    ownProps.navigation.state.params.shift.id,
    ownProps.navigation.state.params.date
  )
});

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    height: 500
  }
});

export class ShiftDescriptionScene extends PureComponent {
  constructor(props) {
    super(props);
  }

  @autobind
  loadingWeb() {
    return <ActivityIndicator animating={true} size="small" />;
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
  render() {
    const { state } = this.props.navigation;
    return (
      <Container>
        <MyWebView
          source={{
            uri: constant.root.url + state.params.shift.description_path,
            headers: {
              "X-AUTHENTICATION-TOKEN": this.props.token
            }
          }}
          automaticallyAdjustContentInsets={true}
          scrollEnabled={false}
          renderLoading={this.loadingWeb}
        />
        <View style={{ padding: 20, backgroundColor: "white" }}>
          <Button block success>
            <Text>START</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ShiftDescriptionScene);
