import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';


export default class Birthday extends Component {

  render() {
    const { navigate, state } = this.props.navigation
    const { email } = state.params
    return (
      <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 36, marginTop: 128, paddingHorizontal: 32}}>Enter your password</Text>
        </View>
         
        <TouchableHighlight>
        <View style={{paddingVertical: 10, paddingHorizontal: 45, marginBottom: 64, backgroundColor: '#111', borderRadius: 2}}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#fff'}}>Next</Text>
        </View>
        </TouchableHighlight>
      </View>
    )
  }
}