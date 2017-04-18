import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableHighlight
} from 'react-native';

import { userExists } from './API'

export default class CheckEmail extends Component {

  static navigationOptions = {
    header: {
      visible: false
    },
    cardStack: { gesturesEnabled: false }
  }

  constructor(props) {
    super(props)
    this.state = { text: null }
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 36, marginTop: 128}}>Stone Road</Text>
          <Text style={{fontSize: 16}}>Organic Pre Rolls</Text>
        </View>
        <KeyboardAvoidingView
          behavior='position'
          style={{marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: 1, alignSelf: 'stretch' }}>
          <TextInput
            style={{height: 55, fontSize: 24, fontWeight: '600', textAlign: 'center'}}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => this.setState({text})}
            placeholder='Enter your email address'
            placeholderTextColor='#AAA'
            value={this.state.text}
            returnKeyType='next'
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={(event) => {
              const email = event.nativeEvent.text
              userExists(email, (err, res) => {
                //exists
                if (!!res) {
                  navigate('Login', { email: email })
                } else {
                  navigate('Register', { email: email })
                }
              })
            }}
          />
        </KeyboardAvoidingView>
        <TouchableHighlight>
        <View style={{paddingVertical: 10, paddingHorizontal: 45, marginBottom: 64, backgroundColor: '#111', borderRadius: 2}}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#fff'}}>Next</Text>
        </View>
        </TouchableHighlight>
      </View>
    )
  }
}