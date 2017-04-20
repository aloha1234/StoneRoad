import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  Dimensions,
  Alert
} from 'react-native';

const Screen = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons'

import { register } from './API'

export default class CheckEmail extends Component {

  static navigationOptions = {
    headerVisible: false,
    cardStack: { gesturesEnabled: false }
  }

  constructor(props) {
    super(props)
    this.state = { password1: null, password2: null, sentPressed: false }
  }

  render() {
    const { navigate, state, goBack } = this.props.navigation
    const { email } = state.params
    return (

      <View style={{flex: 1, backgroundColor: '#f0ede6', alignItems: 'center', justifyContent: 'space-between', overflow: 'visible'}}>
        
        <TouchableHighlight
          style={{alignSelf: 'flex-start', height: 44, width: 44, margin: 12, marginTop: 32}}
          underlayColor={'transparent'}
          overlayColor='transparent'
          onPress={() => { goBack() }}>
            <Icon size={24} style={{color: '#333', fontWeight: '800'}} name="ios-arrow-back" />
        </TouchableHighlight>

        <View pointerEvents='none' style={{height: Screen.width,}}>
          <Image
            style={{marginTop: -76, height: Screen.width, width: Screen.width}}
            source={require('../img/logo.png')}
            resizeMode='contain'
          />
        </View>
      {
        <View style={{alignSelf: 'stretch', marginBottom: 64}}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Screen.width+64+55+32}
          behavior='position'
          style={{marginTop: -64, marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: 1, alignSelf: 'stretch' }}>
          <TextInput
            style={{height: 55, fontSize: 24, fontWeight: '600', textAlign: 'center'}}
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text) => this.setState({password1: text})}
            placeholder='Password'
            placeholderTextColor='#AAA'
            enablesReturnKeyAutomatically={true}
            value={this.state.password1}
            returnKeyType='next'
            onSubmitEditing={(event) => {
              this.refs['2'].focus()
            }}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Screen.width+64+32}
          behavior='position'
          style={{marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: 1, alignSelf: 'stretch' }}>
          <TextInput
            style={{height: 55, fontSize: 24, fontWeight: '600', textAlign: 'center'}}
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text) => this.setState({password2: text})}
            placeholder='Re-type password'
            placeholderTextColor='#AAA'
            value={this.state.password2}
            returnKeyType='done'
            enablesReturnKeyAutomatically={true}
            ref='2'
            onSubmitEditing={(event) => {
              const { password1, password2 } = this.state
              
                if (this.state.sentPressed)
                  return
              if (password1 == password2) {

                register(email, password1, password2, (err, res) => {
             
                  if (err) {
                    Alert.alert("Error", err.toString())
                  }

                  else if (res) {
                    navigate('Disclaimer', { 
                      email: email,
                      password: this.state.password1 
                    })
                  }
                this.setState({sentPressed: false})
                }) 
              } else {
                Alert.alert("Error", "Passwords do not match.")
              }
            }}
          />
        </KeyboardAvoidingView>
        </View>
          }
        <View style={{marginBottom: 16, alignSelf: 'stretch', marginHorizontal: 16}}>
        
          <TouchableHighlight underlayColor='transparent' overlayColor='transparent' onPress={() => { 
              const { password1, password2 } = this.state

                if (this.state.sentPressed)
                  return
              if ( password1 == password2) {
                this.setState({sentPressed: true})
                register(email, password1, password2, (err, res) => {
             
                  if (err) {
                    Alert.alert("Error", err.toString())
                  }

                  else if (res) {
                    navigate('Disclaimer', { 
                      email: email,
                      password: this.state.password1 
                    })
                  }
                this.setState({sentPressed: false})
                }) 
              } else {
                Alert.alert("Error", "Passwords do not match.")
              }
            }}>
            <View style={{paddingVertical: 24, paddingHorizontal: 16, marginTop: StyleSheet.hairlineWidth*-1, borderColor: '#111', borderWidth: StyleSheet.hairlineWidth}}>
              <Text style={{fontFamily: 'American Typewriter', letterSpacing: 4, fontSize: 20, fontWeight: '400', color: '#ff890d'}}>REGISTER  ></Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
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

// import { register } from './API'

// export default class Login extends Component {

//   static navigationOptions = {
//     header: {
//       visible: false
//     },
//     cardStack: { gesturesEnabled: false }
//   }

//   constructor(props) {
//     super(props)
//     this.state = { password1: null, password2: null }
//   }

//   render() {
//     const { navigate, state } = this.props.navigation
//     const { email } = state.params    
//     return (
//       <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
//         <View style={{alignItems: 'center'}}>
//           <Text style={{textAlign: 'center', fontSize: 36, marginTop: 128, marginHorizontal: 64}}>Create a password</Text>
//         </View>
//         <View style={{alignSelf: 'stretch'}}>
//         <KeyboardAvoidingView
//           behavior='position'
//           style={{marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: 1, marginBottom: 16 }}>
//           <TextInput
//             style={{height: 55, fontSize: 24, fontWeight: '600', paddingLeft: 32}}
//             secureTextEntry={true}
//             autoCorrect={false}
//             onChangeText={(text) => this.setState({password1: text})}
//             placeholder='Password'
//             placeholderTextColor='#AAA'
//             enablesReturnKeyAutomatically={true}
//             value={this.state.password1}
//             returnKeyType='done'
//             onSubmitEditing={(event) => {
//               const { password1, password2 } = this.state
//               if (password1 == password2) {
//                 register(email, password1, password2, (err, res) => {
             
//                   if (err) {
//                     Alert.alert("Error", err.toString())
//                   }

//                   else if (res) {
//                     navigate('Auctions')
//                   }
//                 }) 
//               } else if (!password2) {
//                 Alert.alert("Error", "Please re-type password.")
//               }
//               else {
//                 Alert.alert("Error", "Passwords do not match.")
//               }
//             }}
//           />
//           </KeyboardAvoidingView>
//            <KeyboardAvoidingView
//           behavior='position'
//           style={{marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: 1 }}>
          
//           <TextInput
//             style={{height: 55, fontSize: 24, fontWeight: '600', paddingLeft: 32}}
//             secureTextEntry={true}
//             autoCorrect={false}
//             onChangeText={(text) => this.setState({password2: text})}
//             placeholder='Re-type password'
//             placeholderTextColor='#AAA'
//             value={this.state.password2}
//             returnKeyType='next'
//             enablesReturnKeyAutomatically={true}
//             onSubmitEditing={(event) => {
//               const { password1, password2 } = this.state
//               if (password1 == password2) {
//                 register(email, password1, password2, (err, res) => {
             
//                   if (err) {
//                     Alert.alert("Error", err.toString())
//                   }

//                   else if (res) {
//                     navigate('Auctions')
//                   }
//                 }) 
//               } else {
//                 Alert.alert("Error", "Passwords do not match.")
//               }
//             }}
//           />
//         </KeyboardAvoidingView>
//         </View>
//         <TouchableHighlight 
//           overlayColor='transparent'
//           underlayColor='transparent'
//           onPress={() => {
//               const { password1, password2 } = this.state
//               if (password1 == password2) {
//                 register(email, password1, password2, (err, res) => {
             
//                   if (err) {
//                     Alert.alert("Error", err.toString())
//                   }

//                   else if (res) {
//                     navigate('Auctions')
//                   }
//                 }) 
//               }  else if (!password2) {
//                 Alert.alert("Error", "Please re-type password.")
//               }
//               else {
//                 Alert.alert("Error", "Passwords do not match.")
//               }
//             }}>
//         <View style={{paddingVertical: 10, paddingHorizontal: 45, marginBottom: 64, backgroundColor: '#111', borderRadius: 2}}>
//           <Text style={{fontSize: 24, fontWeight: '600', color: '#fff'}}>Next</Text>
//         </View>
//         </TouchableHighlight>
//       </View>
//     )
//   }
// }