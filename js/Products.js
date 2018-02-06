import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Platform,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get('window')

const fontFamily = Platform.OS === "ios" ? "American Typewriter" : "normal";

export default class Settings extends Component {
  render() {
    const { onClose } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableHighlight underlayColor="transparent" onPress={onClose}>
            <Icon name="ios-arrow-back" style={{ fontSize: 24 }} />
          </TouchableHighlight>
          <Text style={styles.title}>Products</Text>
          <Icon
            name="ios-arrow-back"
            style={{ fontSize: 24, color: "transparent" }}
          />
        </View>
        <ScrollView style={styles.body}>
          <Text style={styles.intro}>
            Stone Road joints are made with only pure flower in all-natural
            unbleached paper. All flower is grown by farmers dedicated to
            strictly organic practices and diligently lab-tested to ensure only
            the finest cannabis is used in our products.
          </Text>
          <View style={styles.flavors}>
            <Text style={styles.subtitle}>Pre-Roll Flavors</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.flavor}>Sativas</Text>
                <Text style={[styles.flavor, { color: "#cc0066" }]}>
                  Sour Raspberry
                </Text>
                <Text style={[styles.flavor, { color: "#23b1eb" }]}>
                  Candy Jack
                </Text>
                <Text style={[styles.flavor, { color: "#e30b27" }]}>
                  Fruit Punch
                </Text>
              </View>
              <View>
                <Text style={styles.flavor}>Indicas</Text>
                <Text style={[styles.flavor, { color: "#FFA500" }]}>
                  Birthday Cake
                </Text>
                <Text style={[styles.flavor, { color: "#ff9b9b" }]}>
                  Bubble Gum
                </Text>
              </View>
              <View>
                <Text style={styles.flavor}>Hybrids</Text>
                <Text style={[styles.flavor, { color: "#cc3366" }]}>
                  Cherry Pie
                </Text>
              </View>
            </View>
          </View>
          <Image style={{marginVertical: 8, width: width - 32, height: (width-32)*0.7625}} resizeMode="contain" source={require("../img/products/image1.png")} />
          <Image style={{marginVertical: 8, width: width - 32, height: (width-32)*0.5170898438}} resizeMode="contain" source={require("../img/products/image2.png")} />
          <Image style={{marginVertical: 8, width: width - 32, height: (width-32)*0.5170898438}} resizeMode="contain" source={require("../img/products/image3.png")} />
          <Image style={{marginVertical: 8, width: width - 32, height: (width-32)*0.5170898438}} resizeMode="contain" source={require("../img/products/image4.png")} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    // alignItems: 'center',
    backgroundColor: "#f0ede6"
  },
  navBar: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: "American Typewriter",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 36
  },
  subtitle: {
    fontFamily: "American Typewriter",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 24
  },
  body: {
    paddingHorizontal: 16
  },
  intro: {
    fontFamily,
    fontSize: 16
  },
  flavors: {
    alignItems: "center",
    paddingVertical: 16
  },
  flavor: {
    fontFamily
  }
});