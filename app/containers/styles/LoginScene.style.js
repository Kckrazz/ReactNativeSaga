import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
export const styles = StyleSheet.flatten({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FBFAFA"
  },
  shadow: {
    flex: 1,
    width: null,
    height: null
  },
  bg: {
    flex: 1,
    marginTop: 40,
    paddingTop: 50,
    paddingLeft: 40,
    paddingRight: 40,
    bottom: 0
  },
  input: {
    marginBottom: 20
  },
  btn: {
    marginTop: 30,
    height: 50
    // backgroundColor:'#00a65a'
  },
  logoSection: {
    marginTop: deviceHeight / 5.95,
    alignSelf: "center",
    flex: 1,
    flexDirection: "row"
  },
  logo: {
    resizeMode: "contain",
    width: 80,
    height: 80
  },
  logoName: {
    paddingLeft: 10,
    alignSelf: "center",
    fontSize: 30,
    color: "#464646",
    fontFamily: "HelveticaNeue"
  },
  error: {
    alignSelf: "center",
    color: "#d24a4a"
  },
  load: {
    alignSelf: "center"
  }
});
