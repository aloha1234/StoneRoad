import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';


export default class Settings extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.location}>Current City: San Fransisco</Text>
        <FlatList
          style={{flex: 1}}
          data={[{key: 'San Fransisco'}, {key: 'Oakland'}, {key: 'Los Angeles'}, {key: 'Newport Beach'}]}
          renderItem={({item}) => {
            const { key } = item
            return (
             <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF'}}>
               <Text style={{fontSize: 20, fontWeight: '500'}}>{key}</Text>
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
    paddingTop: 20,
    // alignItems: 'center',
    backgroundColor: '#DDD'
  },
  locationLabel: {
    textAlign: 'center',
    paddingTop: 32,
    fontSize: 36
  },
  location: {
    textAlign: 'center',
    padding: 32,
    fontSize: 20,
    fontWeight: '500',
    color: '#555',
  }
});