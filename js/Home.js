import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button,
  Dimensions,
  Modal,
  StatusBar
} from 'react-native';

import Auctions from './Auctions'
import Profile from './Profile'
import Settings from './Settings'
import QR from './QR'

import DrawerLayout from 'react-native-drawer-layout'

import { user, auctions } from './API'

const Screen = Dimensions.get('window')

export default class Home extends Component {

  static navigationOptions = {
    headerVisible: false,
    cardStack: { gesturesEnabled: false }
  }

  constructor(props) {
    super(props)
    this.state = { points: 0, modalVisible: false, loading: true }
    this.updateUser()
    this.updateAuctions()
  }

  updateUser() {
    user((err, user) => {
      this.setState({ points : user.available_points, packs: user.packs, loading: false })
    })
  }



  updateAuctions() {
    auctions((err, res) => {
      this.setState({auctions: res.results})
    })
  }

  render() {
    const { navigate, state } = this.props.navigation
    const { auctions, points, packs, loading } = this.state
    if (loading) {
      return (
        <View>
        </View>
      )
    }
    return (
           
         
      <View style={{flex: 1}}>
          
        <View style={{backgroundColor: '#f0ede6', paddingTop: 20, borderBottomWidth: 1, borderColor: '#CCC', alignItems: 'center'}}>
          <View style={{height: 64, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Image
              style={{ width: 128}}
              source={require('../img/logo-small.png')}
              resizeMode='contain'
            />
          </View>
        </View>

        <Auctions auctions={auctions} points={points} onBid={() => { self.updateAuctions; self.updateUser }} selectAuction={(id) => navigate('Auction', { auction: auctions[id], points: points}) } />

        <TouchableHighlight 
          underlayColor='transparent'
          onPress={() => { 
            this.setState({ modalVisible: !this.state.modalVisible })
          }}>
          <View style={{position: 'absolute', bottom: 16, alignSelf: 'center', backgroundColor: '#FFF', padding:12,  borderRadius: 999, borderWidth: 2, borderColor: '#AAA', alignItems: 'center', justifyContent: 'center', shadowRadius: 16, shadowColor: '#AAA', shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.75}}>
            <Image
              style={{width: 75, height: 75, borderRadius: 0}}
              source={require('../img/qr.png')}
            />
          </View>
        </TouchableHighlight>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onShow={() => { StatusBar.setBarStyle('light-content')}}
          >
           <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <QR
                close= {() => {
                  StatusBar.setBarStyle('dark-content')
                  this.updateUser()
                  this.setState({ modalVisible: !this.state.modalVisible })
                }}
              >

                <TouchableHighlight 
                  style={{zIndex: 999}}
                  onPress={() => {
                    StatusBar.setBarStyle('dark-content')
                    this.updateUser()
                    this.setState({ modalVisible: !this.state.modalVisible })
                  }}>
                  <Text style={{color: '#FFF', fontSize: 36}}>×</Text>
                </TouchableHighlight>
              </QR>

            </View>
           </View>
        </Modal>
        </View>

    );
  }
}