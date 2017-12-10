import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Linking
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


import MapView from 'react-native-maps'

export default class Settings extends Component {
  render() {
    const { stores, location, onClose } = this.props;
    // onClose()
    var initialRegion;
    if (location === "Los Angeles") {
      initialRegion = {
        latitude: 34.0522,
        longitude: -118.2437,
        latitudeDelta: 4,
        longitudeDelta: 4
      }
    } else if (location === "Sacramento") {
      initialRegion = {
        latitude: 38.575764,
        longitude: -121.478851,
        latitudeDelta: 4,
        longitudeDelta: 4
      }
    } else {
      initialRegion = {
        latitude: 36.575764,
        longitude: -119.478851,
        latitudeDelta: 12,
        longitudeDelta: 12
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
            <Icon name="ios-arrow-forward" style={{fontSize: 24, color: 'transparent'}} />
          <Text style={styles.locationLabel}>Stores</Text>
          <TouchableHighlight underlayColor='transparent' onPress={onClose}>
            <Icon name="ios-arrow-forward" style={{fontSize: 24}} />
          </TouchableHighlight>
        </View>
        <MapView
          style={{flex: 1, width: "100%"}}
          initialRegion={initialRegion}
        >
          {stores.map(marker => {
            const { streetAddress, city, state, zipCode, latitude, longitude } = marker

            return (
            <MapView.Marker
              key={marker.name+marker.latitude}
              coordinate={{ latitude: Number(latitude), longitude: Number(longitude)}}
              title={marker.name}
            >
              <MapView.Callout>
                <View>
                  <Text>
                    {streetAddress}
                  </Text>
                  <Text>
                    {`${city}, ${state} ${zipCode}`}
                  </Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          )
        })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // alignItems: 'center',
    backgroundColor: "#f0ede6"
  },
  navBar: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  locationLabel: {
    fontFamily: "American Typewriter",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 36
  },
  location: {
    fontFamily: "American Typewriter",
    textAlign: "center",
    padding: 32,
    fontSize: 20,
    fontWeight: "500",
    color: "#555"
  }
});
