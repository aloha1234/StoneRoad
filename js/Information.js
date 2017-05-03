import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  Dimensions,
  ScrollView
} from "react-native";

const Screen = Dimensions.get("window");

import { userExists } from "./API";

export default class TOS extends Component {
  static navigationOptions = {
    headerVisible: false,
    cardStack: { gesturesEnabled: false }
  };

  constructor(props) {
    super(props);
    this.state = { text: null };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 36,
          padding: 16,
          backgroundColor: "#f0ede6",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "visible"
        }}
      >
        <ScrollView>
          <Text style={{ fontSize: 24, fontFamily: "American Typewriter" }}>
            Terms of Service
          </Text>
          <Text
            style={{ marginVertical: 4, fontFamily: "American Typewriter" }}
          >
            By using this app you are agreeing to participate in the trial version of our Stone Road Customer Rewards App (the "App"). You will need to download the app and register as a new user to begin this trial. Use of the App is available only to U.S. residents, 21 years old or older. As a condition of participating, you agree to the following terms and conditions set forth here (the “Agreement”):
            {" "}
          </Text>
          <Text
            style={{ marginVertical: 4, fontFamily: "American Typewriter" }}
          >
            You agree that the rewards system and the auction for redeeming rewards points are both in beta and may malfunction, lose or misplace points, fail to initiate or close a transaction, or duplicate or enter multiple transactions. Stone Road is not responsible for any such malfunction and does not provide any warranty or guarantee about the App or the function of the App. The exclusive remedy for any malfunction that results in a loss of points shall be a grant of points equal to the amount lost or destroyed. If points in excess of that which you are entitled to are awarded in error or as a result of malfunction or misuse of the app, Stone Road reserves the right to remove any such point from your account.
            {" "}
          </Text>
          <Text
            style={{ marginVertical: 4, fontFamily: "American Typewriter" }}
          >
            Any attempt to game, trick, or deceive the App, or to intentionally or through the use of a technical device, code, or bot to undermine the function of the App or to award yourself or any other user points, rewards, items, or prizes, shall result in deletion of your account and removal of any and all points accrued.
            {" "}
          </Text>
          <Text
            style={{ marginVertical: 4, fontFamily: "American Typewriter" }}
          >
            You agree that your participation in this use of the App and the rewards program is 100% voluntary. You further acknowledge and agree that you will raise any issue, question, or dispute with Stone Road by contacting Stone Road at info@stoneroad.org.
          </Text>
          <Text
            style={{ marginVertical: 4, fontFamily: "American Typewriter" }}
          >
            THIS APP IS PROVIDED “AS IS” AND, TO THE MAXIMUM EXTENT PROVIDED UNDER LAW, STONE ROAD DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. WITHOUT LIMITING THE FOREGOING, STONE ROAD DOES NOT GUARANTEE THAT YOU WILL BE ABLE TO USE THE APP OR ACCRUE POINTS ON THE APP UNDER THIS INITIAL EXPERIENCE. FROM TIME TO TIME, THERE MAY BE PROBLEMS RELATED TO ACCESS, DELAY, OR FAILURE TO PERFORM THAT ARE BEYOND THE REASONABLE CONTROL OF STONE ROAD. YOU AGREE THAT STONE ROAD HAS NO LIABILITY FOR SUCH DISCONTINUANCE.
          </Text>
          <Text
            style={{ marginVertical: 4, fontFamily: "American Typewriter" }}
          >
            This Agreement will be effective from the time you click the “I accept” button until terminated. You may terminate this Agreement at any time by deleting your account. If you do so, your account and participation privileges may be terminated immediately or if you fail to comply with any of the terms and conditions of this agreement. Stone Road also reserves the right to terminate your account at any time with or without cause. As this is a trial, Stone Road reserves the right to terminate the App at any time without notice.
          </Text>
        </ScrollView>
        <View style={{ alignSelf: "stretch", paddingTop: 16 }}>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.25)"
            overlayColor="rgba(0,0,0,0.25)"
            onPress={() => navigate("Welcome")}
          >
            <View
              style={{
                paddingVertical: 24,
                paddingHorizontal: 16,
                marginTop: StyleSheet.hairlineWidth,
                borderColor: "#111",
                borderWidth: StyleSheet.hairlineWidth
              }}
            >
              <Text
                style={{
                  fontFamily: "American Typewriter",
                  letterSpacing: 4,
                  fontSize: 20,
                  fontWeight: "400",
                  color: "#ff890d"
                }}
              >
                I ACCEPT  &gt;
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
