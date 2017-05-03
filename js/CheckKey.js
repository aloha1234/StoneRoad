import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, StatusBar } from "react-native";

import Home from "./Home";
import CheckEmail from "./CheckEmail";

const Screen = Dimensions.get("window");

import { loggedIn } from "./API";

export default class CheckKey extends Component {
  static navigationOptions = {
    headerVisible: false,
    cardStack: {
      gesturesEnabled: false,
      transitions: [
        {
          to: "Auctions",
          // transition: sequence(sharedImages(0.8), crossFadeScenes(0.2)), // ==> 3
          config: { duration: 0 }
        }
      ]
    }
  };

  constructor(props) {
    super(props);
    this.state = { checkingKey: true, loggedIn: null };
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#f0ede6");
  }

  componentWillMount() {
    const { navigate } = this.props.navigation;
    loggedIn(isLoggedIn => {
      this.setState({ checkingKey: false, loggedIn: isLoggedIn });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.checkingKey) return <View style={styles.container} />;

    return this.state.loggedIn === true
      ? <Home navigation={this.props.navigation} />
      : <CheckEmail navigation={this.props.navigation} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0ede6",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "visible"
  },
  image: {
    height: Screen.width,
    width: Screen.width
  }
});
