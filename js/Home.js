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
  StatusBar,
  Alert
} from 'react-native';

import Auctions from './Auctions'
import Profile from './Profile'
import Settings from './Settings'
import QR from './QR'

import Icon from 'react-native-vector-icons/Ionicons'


import DrawerLayout from 'react-native-drawer-layout'

import { user, auctions, locations } from './API'

const Screen = Dimensions.get('window')

export default class Home extends Component {

  static navigationOptions = {
    headerVisible: false,
    cardStack: {
      gesturesEnabled: false
    }
  }

  constructor(props) {
    super(props)
    this.state = { points: 0, modalVisible: false, loading: true, location: 'All' }
    this.updateUser()
    this.updateAuctions()
    this.updateLocations()

    setInterval(() => {
      this.updateUser()
      this.updateAuctions()
      this.updateLocations()
    }, 30*1000)
  }

  updateUser() {
    user((err, user) => {
      if (err) {
        // Alert.alert('Error', err)
      } else {
        this.setState({ points : user.available_points, packs: user.packs, loading: false, location: 'All'})
      }
    })
  }

  updateLocations() {
    locations((err, locations) => {
      if (!err && locations.results) {
        // alert(JSON.stringify(locations.results))
        this.setState({ locations: locations.results })
      }
    })
  }

  updateAuctions() {
    auctions((err, res) => {
      if (!err) {
        this.setState({auctions: res.results})
      }
    })
  }

  render() {
    const { navigate, state } = this.props.navigation
    const { auctions, points, packs, loading, locations, location } = this.state
    if (loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontFamily: "American Typewriter", fontSize: 24, color: '#555', textAlign: 'center'}}>Loading</Text>
        </View>
      )
    }

    return (
           
         
      <View style={{flex: 1}}>
       <DrawerLayout
        ref={(rightDrawer) => { return this.rightDrawer = rightDrawer  }}
        drawerWidth={Screen.width-48}
        drawerPosition={DrawerLayout.positions.Right}
        renderNavigationView={() => <Settings
          onSelect={(location) => {
            this.setState({location: location})
          }}
          locations={locations}
          location={location} />}>
          
        <View style={{backgroundColor: '#f0ede6', paddingTop: 20, borderBottomWidth: 1, borderColor: '#CCC', alignItems: 'stretch'}}>
          <View style={{height: 64, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableHighlight>
              <Icon style={{height: 32, width: 32, fontSize: 32, marginLeft: 12, color: 'transparent'}} name="ios-settings"></Icon>
            </TouchableHighlight>
            <Image
              style={{ width: 128}}
              source={require('../img/logo-small.png')}
              resizeMode='contain'
            />
            <TouchableHighlight overlayColor="transparent" underlayColor="transparent" onPress={() => this.rightDrawer.openDrawer()}>
              <Icon style={{height: 32, width: 32, fontSize: 32, textAlign: 'right', marginRight: 12, color: '#333'}} name="ios-settings"></Icon>
            </TouchableHighlight>
          </View>
        </View>

        <Auctions
          auctions={auctions}
          points={points}
          location={location}
          selectAuction={(id) => navigate('Auction', { auction: auctions[id], points: points, onBid: () => { 
            this.updateAuctions(); this.updateUser(); 
          }}) } />

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
                  this.updateAuctions()
                  this.setState({ modalVisible: !this.state.modalVisible })
                }}
              >

                <TouchableHighlight 
                  style={{zIndex: 999}}
                  onPress={() => {
                    StatusBar.setBarStyle('dark-content')
                  this.updateUser()
                  this.updateAuctions()
                    this.setState({ modalVisible: !this.state.modalVisible })
                  }}>
                  <Text style={{color: '#FFF', fontSize: 36}}>×</Text>
                </TouchableHighlight>
              </QR>

            </View>
           </View>
        </Modal>
        </DrawerLayout>
        </View>
    );
  }
}