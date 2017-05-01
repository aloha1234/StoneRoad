import React, { Component } from "react";
import { AppRegistry, Animated } from "react-native";

import CheckKey from "./js/CheckKey";
import Home from "./js/Home";
import Auction from "./js/Auction";
import CheckEmail from "./js/CheckEmail";
import Login from "./js/Login";
import Register from "./js/Register";
import Birthday from "./js/Birthday";
import Disclaimer from "./js/Disclaimer";
import TOS from "./js/TOS";
import Information from "./js/Information";

import { StackNavigator } from "react-navigation";

AppRegistry.registerComponent("StoneRoad", () =>
  StackNavigator(
    {
      Home: { screen: CheckKey },
      CheckEmail: { screen: CheckEmail },
      Login: { screen: Login },
      Register: { screen: Register },
      Auctions: { screen: Home },
      Auction: { screen: Auction },
      Disclaimer: { screen: Disclaimer },
      TOS: { screen: TOS },
      Information: { screen: Information }
    },
    {
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0
        }
        // screenInterpolator: MyScreenInterpolator
      }),
      headerMode: "none"

      // gesturesEnabled: false
    }
  )
);
