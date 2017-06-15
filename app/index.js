import _ from "lodash";
import React from "react";
import { BackHandler } from "react-native";
import { Provider, connect } from "react-redux";
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from "react-navigation";
import configureStore from "./store/configureStore";
// import Logger from './lib/Logger'
import Routes from "./config/routes";
import { bindActionCreators } from "redux";
import selectors from "./selectors";

// Handle lack of Logger.debug when not debugging in chrome.
// if (!_.isFunction(Logger.debug)) {
//   Logger.debug = () => {
//     // NOOP.
//   }
// }

const AppNavigator = StackNavigator(Routes, {
  navigationOptions: ({ navigation }) => ({
    title: navigation.state.params ? `${navigation.state.params.title}` : null
  })
});
const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

let store = configureStore(navReducer);
function getActions(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

@connect(state => ({
  nav: state.nav,
  authenticated: selectors.user.authenticated(state)
}))
class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    // if (this.props.authenticated && nav.index === 1) {
    if (nav.index === 1) {
      return false;
    }
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const Root = () =>
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>;

Root.displayName = "Root";

export default Root;
