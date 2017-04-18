import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

export default class Profile extends Component {

  render() {
    const { points, packs } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.pointsLabel}>Points</Text>
        <Text style={styles.points}>{points}</Text>
        <FlatList
          style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, backgroundColor: '#FFF'}}
          data={packs}
          keyExtractor={(item) => item}
          renderItem={({item}) => {
            console.log(item)
            return (
             <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{padding: 16, marginRight: 8, borderRadius: 8, backgroundColor: '#fab431'}} />
                  <Text style={{fontSize: 20, fontWeight: '500'}}>Gold Edition Pack</Text>
                </View>
                <Text style={{fontSize: 20, fontWeight: '500', color: '#999'}}>1200pts</Text>
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
    alignItems: 'center',
    backgroundColor: '#DDD'
  },
  pointsLabel: {
    padding: 32,
    fontSize: 36
  },
  points: {
    padding: 32,
    fontSize: 80,
    fontWeight: '200',
    color: '#AAA',
  }
});