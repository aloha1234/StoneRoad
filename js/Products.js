import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const fontFamily = Platform.OS === "ios" ? "American Typewriter" : "normal";

export default class Settings extends Component {
  render() {
    const { onClose } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableHighlight underlayColor="transparent" onPress={onClose}>
            <Icon name="ios-arrow-back" style={{ fontSize: 24 }} />
          </TouchableHighlight>
          <Text style={styles.title}>Products</Text>
          <Icon
            name="ios-arrow-back"
            style={{ fontSize: 24, color: "transparent" }}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.intro}>
            Stone Road joints are made with only pure flower in all-natural
            unbleached paper. All flower is grown by farmers dedicated to
            strictly organic practices and diligently lab-tested to ensure only
            the finest cannabis is used in our products.
          </Text>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: "American Typewriter",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 36
  },
  body: {
    paddingHorizontal: 16
  },
  intro: {
    fontFamily,
    fontSize: 16
  }
});