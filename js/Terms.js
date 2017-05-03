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

export default class CheckEmail extends Component {
  static navigationOptions = {
    headerVisible: false,
    gesturesEnabled: false
  };

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
          <Image
            style={{ alignSelf: "center", width: 128 }}
            source={require("../img/logo-small.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              fontWeight: "700",
              textAlign: "center",
              fontSize: 16,
              marginVertical: 4,
              fontFamily: "American Typewriter"
            }}
          >
            Welcome to the Stone Road family!{" "}
          </Text>
          <Text
            style={{
              textAlign: "justify",
              fontSize: 16,
              marginVertical: 4,
              paddingHorizontal: 8,
              fontFamily: "American Typewriter"
            }}
          >
            We made this app to share unique experiences and adventures with our members.
            We invite you to join our auction page where you can bid on sold-out concerts and one of a kind adventures.
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginVertical: 4,
              marginTop: 32,
              fontFamily: "American Typewriter"
            }}
          >

            Here’s how it works:
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginVertical: 4,
              fontFamily: "American Typewriter"
            }}
          >
            -Scan the unique QR code found on Stone Road products.
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginVertical: 4,
              fontFamily: "American Typewriter"
            }}
          >
            -Check out the current auctions.
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginVertical: 4,
              fontFamily: "American Typewriter"
            }}
          >
            -Bid on your favorites.
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginVertical: 4,
              fontFamily: "American Typewriter"
            }}
          >
            -Keep an eye on your email to see if you won. We’ll send you all the information you need to go on your adventure!
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginVertical: 4,
              fontFamily: "American Typewriter"
            }}
          >

            We can’t wait to see you on the road less traveled!
          </Text>
        </ScrollView>
        <View style={{ alignSelf: "stretch", paddingTop: 16 }}>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0.25)"
            overlayColor="rgba(0,0,0,0.25)"
            onPress={() => {
              navigate("Auctions");
            }}
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
                NEXT  &gt;
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
