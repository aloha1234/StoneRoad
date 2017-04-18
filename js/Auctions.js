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

import QR from './QR'

export default class Auctions extends Component {

  constructor(props) {
    super(props)
    this.state = { modalVisible: false }
  }

  render() {
    const { points } = this.props
    return (
      <View style={styles.container}>
        <View style={{marginLeft: 16, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#CCC'}}>
        <Text style={{fontSize: 24}}>{`Your points: ${points >= 0 ? points : ''}`}</Text>
        </View>
        <FlatList 
          data={[{
            key: 'a',
            name: 'Ziggy Marley',
            title: 'Ziggy Marley @ The Greek',
            subtitle: '2 Backstage Passes',
            description: 'Grab a friend and head backstage with Ziggy Marley at the Greek!',
            image: 'https://s3.amazonaws.com/creativeallies/snapshots/000/131/506/original/open-uri20150516-3388-172n2lb.jpg?1431776097',
            bid: 1200
          }, {
            key: 'b',
            name: 'Surf School',
            title: '370 pts: Surf Lessons',
            subtitle: 'Pack of 3 - 1 hour surfing lessons',
            description: 'Learn to surf in Marina Del Rey from former Navy Seals',
            image: 'https://i.imgur.com/gV0pLH8.jpg',
            bid: 2900
          }, {
            key: 'c',
            name: 'Golden Gate Racetrack',
            title: '430 Racetrack Owners Booth',
            subtitle: 'Pack of 3 - 1 hour surfing lessons',
            description: 'Learn to surf in Marina Del Rey from former Navy Seals',
            image: 'https://i.imgur.com/2NgAw65.jpg',
            bid: 5300
          }]}

          renderItem={({item}) => {
            const { name, title, subtitle, description, image, bid } = item
            const buttonColor = points >= bid ? '#4a90e2' : '#CCC'
            const buttonFunction = points >= bid ? () => {} : () => {}

            return (
             <View style={{backgroundColor: '#FFF'}}>
              <View style={{padding: 16}}>
                <Text style={{fontSize: 24, fontWeight: '500', color: '#555'}}>{name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 8}}>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: '500', color: '#111'}}>{title}</Text>
                    <Text style={{fontSize: 16, fontWeight: '500', color: '#111'}}>{subtitle}</Text>
                    <Text style={{fontSize: 16, fontWeight: '500', color: '#999'}}>{description}</Text>
                  </View>
                  <Image
                    style={{width: 80, height: 80, borderRadius: 4}}
                    source={{uri: image}}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingVertical: 4, backgroundColor: buttonColor, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#AAA'}}>
                <Text style={{color: '#FFF', fontSize: 20, fontWeight: '500'}}>{`Bid at: ${bid}`}pts</Text>
                <Text style={{color: '#FFF', fontSize: 20, fontWeight: '500'}}>4d15hr left</Text>
              </View>
             </View>
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
    backgroundColor: '#FFF'
  }
});