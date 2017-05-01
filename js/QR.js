import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Alert } from "react-native";

import Camera from "react-native-camera";

import { redeem } from "./API";

export default class QR extends Component {
  constructor(props) {
    super(props);
    this.state = { seen: {} };
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          aspect={Camera.constants.Aspect.fill}
        >
          {this.props.children}
        </Camera>
      </View>
    );
  }

  onBarCodeRead(event) {
    const { close } = this.props;
    const { data } = event;
    let { seen } = this.state;
    if (!seen[data]) {
      seen[data] = true;
      this.setState({ seen });
      if (data.length == 36) {
        redeem(data, err => {
          if (!err) {
            Alert.alert("Success", "Redeemed points!", [
              { text: "OK", onPress: () => close }
            ]);
          } else {
            Alert.alert("Error", err, [{ text: "OK", onPress: () => close }]);
          }
        });
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16
  }
});
