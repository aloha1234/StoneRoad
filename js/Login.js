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

import { authenticate } from "./API";

export default class CheckEmail extends Component {
  static navigationOptions = {
    headerVisible: false,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = { text: null, requestPending: false };
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
              <TextInput
                style={{
                  height: 55,
                  fontSize: 24,
                  fontWeight: "600",
                  textAlign: "center",
                  fontFamily: "American Typewriter"
                }}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={text => this.setState({ password: text })}
                placeholder="Password"
                placeholderTextColor="#AAA"
                returnKeyType="next"
                onSubmitEditing={event => {
                  const password = event.nativeEvent.text;
                  if (
                    !password ||
                    password.length == 0 ||
                    this.state.requestPending
                  )
                    return;
                  else {
                    this.setState({ requestPending: true });
                    authenticate(email, password, (errs, res) => {
                      if (errs && errs.length > 0) {
                        for (const e in errs) {
                          Alert.alert("Error", errs[e]);
                        }
                      } else if (errs) {
                        Alert.alert("Login Failed", "Could not connect");
                      } else {
                        navigate("Auctions");
                      }
                      this.setState({ requestPending: false });
                    });
                  }
                }}
              />
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
            overlayColor="transparent"
            underlayColor="transparent"
            onPress={() => {
              const { password } = this.state;
              if (
                !password ||
                password.length == 0 ||
                this.state.requestPending
              )
                return;
              else {
                this.setState({ requestPending: true });

                authenticate(email, password, (errs, res) => {
                  if (errs && typeof errs != "string" && errs.length > 0) {
                    Alert.alert("Error", errs[0]);
                  } else if (errs) {
                    Alert.alert("Login Failed", "Could not connect");
                  } else {
                    navigate("Auctions");
                  }
                  this.setState({ requestPending: false });
                });
              }
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
                LOG IN  &gt;
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   KeyboardAvoidingView,
//   TouchableHighlight,
//   Alert
// } from 'react-native';

// import { authenticate } from './API'

// export default class Login extends Component {

//   static navigationOptions = {
//     header: {
//       visible: false
//     },
//     cardStack: { gesturesEnabled: false }
//   }

//   render() {
//     const { navigate, state } = this.props.navigation
//     const { email } = state.params
//     return (
//       <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
//         <View style={{alignItems: 'center'}}>
//           <Text style={{textAlign: 'center', fontSize: 36, marginTop: 128, paddingHorizontal: 32}}>Enter your password</Text>
//         </View>
//         <View style={{alignSelf: 'stretch'}}>
//         <KeyboardAvoidingView
//           behavior='position'
//           style={{marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: 1 }}>
//           <TextInput
//             style={{height: 55, fontSize: 24, fontWeight: '600', textAlign: 'center'}}
//             secureTextEntry={true}
//             autoCorrect={false}
//             onChangeText={(text) => this.setState({password: text})}
//             placeholder='Password'
//             placeholderTextColor='#AAA'
//             returnKeyType='next'
//             onSubmitEditing={(event) => {
//               const password = event.nativeEvent.text
//               authenticate(email, password, (errs, res) => {
//                 if (errs && errs.length > 0) {
//                   for (const e in errs) {
//                     Alert.alert('Error', errs[e], )
//                   }
//                 } else {
//                   navigate('Auctions')
//                 }
//               })
//             }}
//           />
//           </KeyboardAvoidingView>
//           <Text style={{textAlign: 'right', padding: 16, color: '#007AFF'}}>Forgot Password?</Text>
//           </View>

//         <TouchableHighlight>
//         <View style={{paddingVertical: 10, paddingHorizontal: 45, marginBottom: 64, backgroundColor: '#111', borderRadius: 2}}>
//           <Text style={{fontSize: 24, fontWeight: '600', color: '#fff'}}>Next</Text>
//         </View>
//         </TouchableHighlight>
//       </View>
//     )
//   }
// }
