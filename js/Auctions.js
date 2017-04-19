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
  StatusBar
} from 'react-native';

const moment = require('moment');

import QR from './QR'

import { auctions } from './API'

export default class Auctions extends Component {

  constructor(props) {
    super(props)
    this.state = { modalVisible: false }
  }

  render() {
    const { auctions, points, selectAuction } = this.props
    return (
      <View style={styles.container}>
        <View style={{marginHorizontal: 16, paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#AAA'}}>
        <Text style={{fontSize: 20, textAlign: 'center', fontFamily: 'American Typewriter'}}>{points >= 0 ? `YOU HAVE ${points} POINTS.` : 'LOADING'}</Text>
        </View>
        <FlatList 
          data={auctions}
          keyExtractor={(item) => String(item.id) }
          renderItem={({item, index}) => {
            const { reward_name, title, location, reward_description, image_url, current_bid, minimum_bid, auction_end_date, auction_start_date, id, is_leader } = item
            
            const bid = (current_bid || minimum_bid) + 10;
            const buttonColor = is_leader ? '#4CD964' : points >= bid ? '#4CD964' : '#CCC'
            
            const endDate = new moment(auction_end_date)

            return (
              <TouchableHighlight overlayColor="transparent" underlayColor="transparent" onPress={() => this.props.selectAuction(index)}>
                <View>
                  <View style={{paddingVertical: 16, flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#AAA'}}>
                    <Image
                      style={{backgroundColor: '#333', width: 96, height: 96, borderRadius: 4}}
                      source={{uri: image_url}}
                    />
                    <View style={{flex: 1, marginLeft: 16}}>
                      <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 24, fontWeight: '500', color: '#555'}}>{reward_name}</Text>
                      <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 16, fontWeight: '400', color: '#111'}}>{reward_description}</Text>
                      <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 16, fontWeight: '400', color: buttonColor}}>{is_leader ? 'LEADING' : (current_bid || minimum_bid)+ ' points'}</Text>
                      <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 16, fontWeight: '400', color: '#555'}}>{endDate.to().substring(endDate.to().length-4, endDate.to()).toUpperCase() + ' REMAINING'}</Text>
                    </View>
                  </View>
               </View>
             </TouchableHighlight>
            )
          }}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ede6'
  }
});