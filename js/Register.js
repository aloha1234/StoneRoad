import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert
} from 'react-native';

import { register } from './API'

export default class Login extends Component {

  static navigationOptions = {
    header: {
      visible: false
    },
    cardStack: { gesturesEnabled: false }
  }

  constructor(props) {
    super(props)
    this.state = { password1: null, password2: null }
  }

  render() {
    const { navigate, state } = this.props.navigation
    const { email } = state.params    
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 36, marginTop: 128, marginHorizontal: 64}}>Create a password</Text>
        </View>
        <View style={{alignSelf: 'stretch'}}>
        <KeyboardAvoidingView
          behavior='position'
          style={{marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: 1, marginBottom: 16 }}>
          <TextInput
            style={{height: 55, fontSize: 24, fontWeight: '600', paddingLeft: 32}}
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text) => this.setState({password1: text})}
            placeholder='Password'
            placeholderTextColor='#AAA'
            enablesReturnKeyAutomatically={true}
            value={this.state.password1}
            returnKeyType='done'
            onSubmitEditing={(event) => {
              const { password1, password2 } = this.state
              if (password1 == password2) {
                register(email, password1, password2, (err, res) => {
             
                  if (err) {
                    Alert.alert("Error", err.toString())
                  }

                  else if (res) {
                    navigate('Auctions')
                  }
                }) 
              } else if (!password2) {
                Alert.alert("Error", "Please re-type password.")
              }
              else {
                Alert.alert("Error", "Passwords do not match.")
              }
            }}
          />
          </KeyboardAvoidingView>
           <KeyboardAvoidingView
          behavior='position'
          style={{marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: 1 }}>
          
          <TextInput
            style={{height: 55, fontSize: 24, fontWeight: '600', paddingLeft: 32}}
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text) => this.setState({password2: text})}
            placeholder='Re-type password'
            placeholderTextColor='#AAA'
            value={this.state.password2}
            returnKeyType='next'
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={(event) => {
              const { password1, password2 } = this.state
              if (password1 == password2) {
                register(email, password1, password2, (err, res) => {
             
                  if (err) {
                    Alert.alert("Error", err.toString())
                  }

                  else if (res) {
                    navigate('Auctions')
                  }
                }) 
              } else {
                Alert.alert("Error", "Passwords do not match.")
              }
            }}
          />
        </KeyboardAvoidingView>
        </View>
        <TouchableHighlight 
          overlayColor='transparent'
          underlayColor='transparent'
          onPress={() => {
              const { password1, password2 } = this.state
              if (password1 == password2) {
                register(email, password1, password2, (err, res) => {
             
                  if (err) {
                    Alert.alert("Error", err.toString())
                  }

                  else if (res) {
                    navigate('Auctions')
                  }
                }) 
              }  else if (!password2) {
                Alert.alert("Error", "Please re-type password.")
              }
              else {
                Alert.alert("Error", "Passwords do not match.")
              }
            }}>
        <View style={{paddingVertical: 10, paddingHorizontal: 45, marginBottom: 64, backgroundColor: '#111', borderRadius: 2}}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#fff'}}>Next</Text>
        </View>
        </TouchableHighlight>
      </View>
    )
  }
}