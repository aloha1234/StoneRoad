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
    const { auctions, points, selectAuction, location } = this.props

    if(!auctions)
        return <View style={{flex: 1}}></View>
    const filteredAuctions = auctions.filter((item) => { return location == 'All' || item.location == location })
    return (
      <View style={styles.container}>
        <View style={{marginHorizontal: 16, paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#AAA'}}>
        <Text style={{fontSize: 20, textAlign: 'center', fontFamily: 'American Typewriter'}}>{points >= 0 ? `YOU HAVE ${points} POINTS.` : ''}</Text>
        </View>
        {
          filteredAuctions.length ?
          <FlatList 
            data={filteredAuctions}
            keyExtractor={(item) => String(item.id) }
            ListFooterComponent={() => <View style={{height: 82}} />}
            renderItem={({item, index}) => {
              const { reward_name, title, location, reward_description, image_url, current_bid, minimum_bid, auction_end_date, auction_start_date, id, is_leader } = item

              const bidRequired = current_bid ? current_bid + 5 : minimum_bid
              const canBid = this.props.points >= bidRequired;
              const endDate = new moment(auction_end_date)

              const buttonColor = is_leader
                ? '#4CD964'
                : canBid
                ? '#047cc4'
                : '#ff3b30'            

              const points = current_bid ? current_bid : minimum_bid

              return (
                <TouchableHighlight overlayColor="transparent" underlayColor="transparent" onPress={() => this.props.selectAuction(index)}>
                  <View>
                    <View style={{paddingVertical: 16, flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#AAA'}}>
                      {
                        image_url ?
                        <Image
                          style={{backgroundColor: '#333', width: 96, height: 96, borderRadius: 4}}
                          source={{uri: image_url}}
                        /> 
                        :
                        <View style={{backgroundColor: '#333', width: 96, height: 96, borderRadius: 4}}>
                        </View>
                    }
                      <View style={{flex: 1, marginLeft: 16}}>
                        <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 24, fontWeight: '500', color: '#555'}}>{reward_name}</Text>
                        <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 16, fontWeight: '400', color: '#111'}}>{reward_description}</Text>
                        <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 16, fontWeight: '400', color: buttonColor}}>{is_leader ? 'LEADING' : 'CURRENT BID: ' + points + ' POINTS'}</Text>
                        <Text style={{fontFamily: 'American Typewriter', paddingVertical: 2, fontSize: 16, fontWeight: '400', color: '#555'}}>{endDate.to().substring(endDate.to().length-4, endDate.to()).toUpperCase() + ' REMAINING'}</Text>
                      </View>
                    </View>
                 </View>
               </TouchableHighlight>
              )
            }}
        />
        :
        <Text style={{fontFamily: 'American Typewriter', textAlign: 'center', padding: 32, fontSize: 24}}>No rewards found.</Text>
          }
        
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