import { AppRegistry } from "react-native";

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
import Root from "./app/";

AppRegistry.registerComponent("shiftcare", () => Root);
