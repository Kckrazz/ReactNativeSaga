import LoginScene from "../containers/LoginScene";
import DrawerScreen from "../containers/DrawerScreen";

import NotificationScene from "../containers/NotificationScene";
import ShiftHomeScene from "../containers/ShiftHomeScene";
import ShiftDescriptionScene from "../containers/ShiftDescriptionScene";

export default (Routes = {
  Login: {
    screen: LoginScene,
    navigationOptions: {
      title: "Login",
      header: null
    }
  },
  Drawer: {
    screen: DrawerScreen,
    navigationOptions: {
      header: null
    }
  },
  Notification: { screen: NotificationScene },
  Shift: { screen: ShiftHomeScene },
  ShiftDesc: { screen: ShiftDescriptionScene }
});
