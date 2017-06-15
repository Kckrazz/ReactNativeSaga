import split from "lodash/split";
import toNumber from "lodash/toNumber";
import MapView from "react-native-maps";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  map: {
    // ...StyleSheet.absoluteFillObject
  }
});

function getRegion(props) {
  const [latitude, longitude] = split(props, ",");
  const res = {
    latitude: toNumber(latitude),
    longitude: toNumber(longitude),
    // I stopped using props.coordinatesDelta as API was returning large values
    // (200) and I wasted 2 days trying to work out what was wrong as nothing
    // was rendering. Leaving this note in case anyone runs into the same issue
    // in the future.
    latitudeDelta: 0.01, // props.coordinatesDelta
    longitudeDelta: 0.01 // props.coordinatesDelta
  };
  return res;
}

const marker = require("../assets/image/marker.png");

const current = require("../assets/image/current.png");

const ShiftMap = props => (
  <MapView
    onPress={props.onSelectMap}
    region={getRegion(props.coordinates)}
    style={props.style}
    showsUserLocation={true}
    showsMyLocationButton={true}
    toolbarEnabled={true}
  >
    <MapView.Marker coordinate={getRegion(props.coordinates)} image={marker} />
  </MapView>
);

ShiftMap.propTypes = {
  coordinates: React.PropTypes.string.isRequired,
  onSelectMap: React.PropTypes.func.isRequired,
  style: React.PropTypes.array.isRequired
};

export default ShiftMap;
