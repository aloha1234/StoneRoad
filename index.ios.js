import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Home from './js/Home'
import CheckEmail from './js/CheckEmail'
import Login from './js/Login'
import Register from './js/Register'
import Birthday from './js/Birthday'
import { loggedIn } from './js/API'

import { StackNavigator } from 'react-navigation';

const LoginFlow = StackNavigator({
  Home: { screen: CheckEmail },
  Login: { screen: Login },
  Register: { screen: Register },
  Auctions: { screen: Home }
}, {
  headerMode: 'none',
  cardStack: { gesturesEnabled: false }
});

if (loggedIn()) {
  AppRegistry.registerComponent('StoneRoad', () => Home);
} else {
  AppRegistry.registerComponent('StoneRoad', () => LoginFlow);
}

