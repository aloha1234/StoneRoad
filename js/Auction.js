import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Button,
  Modal,
  StatusBar,
  Dimensions,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'


const moment = require('moment');

const screen = Dimensions.get('window')

import QR from './QR'

import { bid } from './API'

export default class Auctions extends Component {

  render() {
    const {onBid} = this.props

    const { navigate, state, goBack } = this.props.navigation
    const { auction, points } = state.params
    const { is_leader, reward_name, title, location, reward_description, image_url, current_bid, minimum_bid, auction_end_date, auction_start_date, id } = auction
    
    const bidRequired = (current_bid || minimum_bid) + 10


    const canBid = points >= bidRequired;

    const buttonColor = is_leader
    ? '#4CD964'
    : canBid
    ? '#4CD964'
    : '#CCC'

    const buttonText = is_leader
    ? 'LEADING'
    : canBid
    ? 'PLACE A BID'
    : `NEED ${Math.max(0, bidRequired-points)} MORE POINTS`

            const endDate = new moment(auction_end_date)


    return (
      <View style={styles.container}>
        
        <View>
          <View style={{height: 44, justifyContent: 'center'}}>
            <TouchableHighlight 
              underlayColor={'transparent'}
              over
              onPress={() => { goBack() }}>
            <Icon size={24} style={{color: '#333', fontWeight: '800'}} name="ios-arrow-back" />
            </TouchableHighlight>
          </View>
          <Image
            style={{ backgroundColor: '#333', width: screen.width-32, height: screen.width-32, borderRadius: 4}}
            source={{uri: image_url}}
          />
        </View>
        
        <View>
        <Text style={{fontFamily: 'American Typewriter', paddingVertical: 4, fontSize: 36, fontWeight: '500', color: '#555'}}>{reward_name}</Text>
        <Text style={{fontFamily: 'American Typewriter', paddingVertical: 4, fontSize: 20, fontWeight: '400', color: '#111'}}>{reward_description}</Text>
        <Text style={{fontFamily: 'American Typewriter', paddingVertical: 4, fontSize: 20, fontWeight: '400', color: buttonColor}}>{current_bid || minimum_bid} points</Text>
        <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 16, fontWeight: '400', color: '#555'}}>{endDate.to().substring(endDate.to().length-4, endDate.to()).toUpperCase() + ' REMAINING'}</Text>
        </View>
        <TouchableHighlight 
          onPress={() => {
            if (canBid) {
              bid(id, bidRequired, (err, res) => {
                this.props.onBid()
               console.log(err, res) 
             })
            }
          }}>
          <View style={{backgroundColor: buttonColor}}>
            <Text style={{padding: 16, textAlign: 'center',  fontFamily: 'American Typewriter', fontSize: 24}}>{buttonText}</Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0ede6',
    justifyContent: 'space-between'
  }
});