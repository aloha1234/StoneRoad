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


import { userExists } from './API'

export default class CheckEmail extends Component {

  static navigationOptions = {
    headerVisible: false,
    cardStack: { gesturesEnabled: false }
  }

  constructor(props) {
    super(props)
    this.state = { text: null, requestPending: false }
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{flex: 1, backgroundColor: '#f0ede6', alignItems: 'center', justifyContent: 'space-between', overflow: 'visible'}}>
        <View style={{height: 0, marginTop: 20}}>
          <Image
            style={{ height: Screen.width, width: Screen.width}}
            source={require('../img/logo.png')}
            resizeMode='contain'
          />
        </View>
      
        <KeyboardAvoidingView
              behavior='position'
              style={{marginTop: Screen.width, marginHorizontal: 16, borderBottomColor: '#111', borderBottomWidth: StyleSheet.hairlineWidth, alignSelf: 'stretch' }}>
              <TextInput
                style={{fontFamily: 'American Typewriter', height: 55, fontSize: 24, fontWeight: '600', textAlign: 'center'}}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => this.setState({text})}
                placeholder='Enter your email address'
                placeholderTextColor='#AAA'
                value={this.state.text}
                returnKeyType='done'
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={(event) => {
                  this.setState({requestPending: true})
                  const email = event.nativeEvent.text
                  if (!email || email.length < 1)
                    return

                  userExists(email, (err, res) => {
                    //exists
                    if (!!res) {
                      navigate('Login', { email: email })
                    } else {
                      navigate('Register', { email: email })
                    }
                    this.setState({requestPending: false})
                  })
                }}
              />
            </KeyboardAvoidingView>
          
        <View style={{marginBottom: 16, marginTop: 16, alignSelf: 'stretch', marginHorizontal: 16}}>
          <TouchableHighlight
            overlayColor='transparent'
            underlayColor='transparent'
            onPress={() => {
              
              if (this.state.requestPending)
                return

              const email = this.state.text
              if (!email || email.length < 1)
                return

              this.setState({requestPending: true})
              
              userExists(email, (err, res) => {
                //exists
                if (!!res) {
                  navigate('Login', { email: email })
                } else {
                  navigate('Register', { email: email })
                }
                this.setState({requestPending: false})
              })
            }}>
            <View style={{paddingVertical: 24, paddingHorizontal: 16, borderColor: '#111', borderWidth: StyleSheet.hairlineWidth}}>
              <Text style={{fontFamily: 'American Typewriter', letterSpacing: 4, fontSize: 20, fontWeight: '400', color: '#ff890d'}}>NEXT  ></Text>
            </View>
          </TouchableHighlight>
          </View>
         {//<TouchableHighlight
                //   overlayColor='transparent'
                //   underlayColor='transparent'
                //   onPress={() => { if (this.state.text) navigate('Login', { email: this.state.text }) }}>
                //   <View style={{paddingVertical: 24, paddingHorizontal: 16, borderColor: '#111', borderWidth: StyleSheet.hairlineWidth}}>
                //     <Text style={{fontFamily: 'American Typewriter', letterSpacing: 4, fontSize: 20, fontWeight: '400', color: '#111'}}>LOG  IN  ></Text>
                //   </View>
                // </TouchableHighlight>
                // <TouchableHighlight
                //   overlayColor='transparent'
                //   underlayColor='transparent'
                //   onPress={() => { if (this.state.text) navigate('Register', { email: this.state.text }) }}>
                //   <View style={{paddingVertical: 24, paddingHorizontal: 16, marginTop: StyleSheet.hairlineWidth*-1, borderColor: '#111', borderWidth: StyleSheet.hairlineWidth}}>
                //     <Text style={{fontFamily: 'American Typewriter', letterSpacing: 4, fontSize: 20, fontWeight: '400', color: '#111'}}>NEW  ACCOUNT  ></Text>
                //   </View>
                // </TouchableHighlight>
              }
      </View>
    )
  }
}