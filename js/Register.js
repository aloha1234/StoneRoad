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
  Alert,
  Platform
} from "react-native";

const Screen = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";

import { register } from "./API";

export default class CheckEmail extends Component {
  static navigationOptions = {
    headerVisible: false,
    cardStack: { gesturesEnabled: false }
  };

  constructor(props) {
    super(props);
    this.state = { password1: null, password2: null, sentPressed: false };
  }

  render() {
    const { navigate, state, goBack } = this.props.navigation;
    const { email } = state.params;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f0ede6",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "visible"
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          style={{
            // marginTop: Screen.width,
            marginHorizontal: 16,
            alignSelf: "stretch",
            alignItems: "center"
          }}
        >
          <TouchableHighlight
            style={{
              alignSelf: "flex-start",
              alignItems: "center",
              justifyContent: "center",
              height: 44,
              width: 44,
              marginTop: Platform.OS === "ios" ? 20 : 0
            }}
            underlayColor={"transparent"}
            overlayColor="transparent"
            onPress={() => {
              goBack();
            }}
          >
            <Icon
              size={24}
              style={{ color: "#333", fontWeight: "800" }}
              name="ios-arrow-back"
            />
          </TouchableHighlight>

          <View
            pointerEvents="none"
            style={{ height: Screen.width, marginTop: -44 }}
          >
            <Image
              style={{ height: Screen.width, width: Screen.width }}
              source={require("../img/logo.png")}
              resizeMode="contain"
            />
          </View>
          <View style={{ paddingBottom: 22 }}>
            {
              <View>
                <TextInput
                  style={{
                    fontFamily: "American Typewriter",
                    height: 55,
                    fontSize: 24,
                    fontWeight: "600",
                    textAlign: "center"
                  }}
                  secureTextEntry={true}
                  autoCorrect={false}
                  onChangeText={text => this.setState({ password1: text })}
                  placeholder="Password"
                  placeholderTextColor="#AAA"
                  enablesReturnKeyAutomatically={true}
                  value={this.state.password1}
                  returnKeyType="next"
                  onSubmitEditing={event => {
                    this.refs["2"].focus();
                  }}
                />
                <TextInput
                  style={{
                    fontFamily: "American Typewriter",
                    height: 55,
                    fontSize: 24,
                    fontWeight: "600",
                    textAlign: "center"
                  }}
                  secureTextEntry={true}
                  autoCorrect={false}
                  onChangeText={text => this.setState({ password2: text })}
                  placeholder="Re-type password"
                  placeholderTextColor="#AAA"
                  value={this.state.password2}
                  returnKeyType="done"
                  enablesReturnKeyAutomatically={true}
                  ref="2"
                  onSubmitEditing={event => {
                    const { password1, password2 } = this.state;

                    if (this.state.sentPressed) return;
                    if (password1 == password2) {
                      register(email, password1, password2, (err, res) => {
                        if (err) {
                          Alert.alert("Error", err.toString());
                        } else if (res) {
                          navigate("Disclaimer", {
                            email: email,
                            password: this.state.password1
                          });
                        }
                        this.setState({ sentPressed: false });
                      });
                    } else {
                      Alert.alert("Error", "Passwords do not match.");
                    }
                  }}
                />
              </View>
            }
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            marginBottom: 16,
            alignSelf: "stretch",
            marginHorizontal: 16
          }}
        >

          <TouchableHighlight
            underlayColor="transparent"
            overlayColor="transparent"
            onPress={() => {
              const { password1, password2 } = this.state;

              if (this.state.sentPressed) return;
              if (password1 == password2) {
                this.setState({ sentPressed: true });
                register(email, password1, password2, (err, res) => {
                  if (err) {
                    Alert.alert("Error", err.toString());
                  } else if (res) {
                    navigate("Disclaimer", {
                      email: email,
                      password: this.state.password1
                    });
                  }
                  this.setState({ sentPressed: false });
                });
              } else {
                Alert.alert("Error", "Passwords do not match.");
              }
            }}
          >
            <View
              style={{
                paddingVertical: 24,
                paddingHorizontal: 16,
                // marginTop: StyleSheet.hairlineWidth * -1,
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
                REGISTER  &gt;
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
