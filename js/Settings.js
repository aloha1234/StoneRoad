import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Linking
} from 'react-native';


export default class Settings extends Component {
  render() {
    const { current, locations, location, select, onSelect } = this.props;
    let allLocations = [{name: 'All'}];
    allLocations = allLocations.concat(locations)
    return (
      <View style={styles.container}>
        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.location}>Showing rewards from:</Text>
        <FlatList
          style={{flex: 1}}
          data={allLocations}
          keyExtractor={(item) => String(item.name)}
          ListHeaderComponent={() => <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#AAA'}}></View>}
          renderItem={({item}) => {
            const { name } = item
            const selected = (location == name)
            const bgColor = selected ? '#CCC' : '#f0ede6'

            return (
              <TouchableHighlight
                underlayColor="transparent"
                overlayColor="transparent"
                onPress={() => onSelect(name)}
                >
             <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: bgColor, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#AAA'}}>
               <Text style={{fontSize: 20, fontWeight: '500'}}>{name}</Text>
             </View>
             </TouchableHighlight>
            )
          }}
        />
        <TouchableHighlight underlayColor='transparent' onPress={() => Linking.openURL('mailto:somethingemail@gmail.com?subject=abcdefg&body=body')}>
        <Text style={{fontFamily: 'American Typewriter', fontSize: 14, color: '#555', textAlign: 'center', padding: 16}}>support@stoneroad.org</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // alignItems: 'center',
    backgroundColor: '#f0ede6'
  },
  locationLabel: {
    fontFamily: 'American Typewriter',
    textAlign: 'center',
    paddingTop: 32,
    fontSize: 36
  },
  location: {
    fontFamily: 'American Typewriter',
    textAlign: 'center',
    padding: 32,
    fontSize: 20,
    fontWeight: '500',
    color: '#555',
  }
});