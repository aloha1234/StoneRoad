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

import { user } from './API'

const Screen = Dimensions.get('window')

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { points: 0, modalVisible: false, loading: true }
    this.updateUser()
  }

  updateUser() {
    user((err, user) => {
      this.setState({ points : user.points, packs: user.packs, loading: false })
    })
  }

  render() {
    const { points, packs, loading } = this.state
    if (loading) {
      return (
        <View>
        </View>
      )
    }
    return (
       <DrawerLayout
        ref={(rightDrawer) => { return this.rightDrawer = rightDrawer  }}
        drawerWidth={Screen.width-48}
        drawerPosition={DrawerLayout.positions.Right}
        renderNavigationView={() => <Settings />}>
      <DrawerLayout
        ref={(leftDrawer) => { return this.leftDrawer = leftDrawer  }}
        drawerWidth={Screen.width-48}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={() => <Profile points={points} packs={packs} />}>
          
        <View style={{backgroundColor: '#EEE', paddingTop: 20, borderBottomWidth: 1, borderColor: '#CCC'}}>
          <View style={{height: 44, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Button color='#333' title="Profile" onPress={() => this.leftDrawer.openDrawer()} />
            <Text pointerEvents='none' style={{fontSize: 17, backgroundColor: 'transparent', fontWeight: '600', textAlign: 'center', position: 'absolute', left: 0, right: 0}}>Stone Road</Text>
            <Button color='#333' title="Settings" onPress={() => this.rightDrawer.openDrawer()} />
          </View>
        </View>
        <Auctions points={points} />

        <TouchableHighlight 
          underlayColor='transparent'
          onPress={() => { 
            this.setState({ modalVisible: !this.state.modalVisible })
          }}>
          <View style={{position: 'absolute', bottom: 16, alignSelf: 'center', backgroundColor: '#FFF', padding:12,  borderRadius: 999, borderWidth: 2, borderColor: '#555', alignItems: 'center', justifyContent: 'center', shadowRadius: 16, shadowColor: '#555', shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.75}}>
            <Image
              style={{width: 75, height: 75, borderRadius: 0}}
              source={{uri: 'https://i.imgur.com/gqIaxrd.png'}}
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
        
      </DrawerLayout>
      </DrawerLayout>

    );
  }
}