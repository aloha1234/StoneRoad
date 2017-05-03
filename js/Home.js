import React, { Component } from "react";
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
  Alert,
  Platform
} from "react-native";

import Auctions from "./Auctions";
import Profile from "./Profile";
import Settings from "./Settings";
import QR from "./QR";

import Icon from "react-native-vector-icons/Ionicons";

import DrawerLayout from "react-native-drawer-layout";

import { user, auctions, locations } from "./API";

const Screen = Dimensions.get("window");

export default class Home extends Component {
  static navigationOptions = {
    headerVisible: false,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      modalVisible: false,
      loading: true,
      location: "All",
      navigating: false
    };
    this.updateUser();
    this.updateAuctions();
    this.updateLocations();

    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#f0ede6");

    this.refresh = setInterval(() => {
      this.updateUser();
      this.updateAuctions();
    }, 15 * 1000);
  }

  lockNavigation() {
    this.setState({ navigating: true });
    setTimeout(() => {
      this.setState({ navigating: false });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.refresh);
  }

  updateUser() {
    user((err, user) => {
      if (err) {
        // Alert.alert('Error', err)
      } else {
        this.setState({
          points: user.available_points,
          packs: user.packs,
          loading: false
        });
      }
    });
  }

  updateLocations() {
    locations((err, locations) => {
      if (!err && locations.results) {
        // alert(JSON.stringify(locations.results))
        this.setState({ locations: locations.results });
      }
    });
  }

  updateAuctions() {
    console.log("??", this.state.auctions);

    auctions((err, auctions) => {
      console.log("??", auctions);
      if (!err) {
        this.setState({ auctions: auctions });
      }
    });
  }

  render() {
    const { navigate, state } = this.props.navigation;
    const {
      auctions,
      points,
      packs,
      loading,
      locations,
      location
    } = this.state;
    if (loading) {
      return (
        <View
          style={{
            backgroundColor: "#f0ede6",
            flex: 1,
            height: 500,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontFamily: "American Typewriter",
              fontSize: 24,
              color: "#555",
              textAlign: "center"
            }}
          >
            LOADING...
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f0ede6",
          justifyContent: "center"
        }}
      >
        <DrawerLayout
          ref={rightDrawer => {
            return (this.rightDrawer = rightDrawer);
          }}
          drawerWidth={Screen.width - 48}
          drawerPosition={DrawerLayout.positions.Right}
          renderNavigationView={() => (
            <Settings
              onSelect={location => {
                this.setState({ location: location });
              }}
              locations={locations}
              location={location}
            />
          )}
        >

          <View
            style={{
              backgroundColor: "#f0ede6",
              paddingTop: Platform.OS === "ios" ? 20 : 0,
              borderBottomWidth: 1,
              borderColor: "#CCC",
              alignItems: "stretch"
            }}
          >
            <View
              style={{
                height: 64,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <TouchableHighlight>
                <Icon
                  style={{
                    height: 32,
                    width: 32,
                    fontSize: 32,
                    marginLeft: 12,
                    color: "transparent"
                  }}
                  name="ios-settings"
                />
              </TouchableHighlight>
              <Image
                style={{ width: 128 }}
                source={require("../img/logo-small.png")}
                resizeMode="contain"
              />
              <TouchableHighlight
                overlayColor="transparent"
                underlayColor="transparent"
                onPress={() => this.rightDrawer.openDrawer()}
              >
                <Icon
                  style={{
                    height: 32,
                    width: 32,
                    fontSize: 32,
                    textAlign: "right",
                    marginRight: 12,
                    color: "#333"
                  }}
                  name="ios-settings"
                />
              </TouchableHighlight>
            </View>
          </View>

          <Auctions
            auctions={auctions}
            points={points}
            location={location}
            selectAuction={id => {
              const filteredAuctions = auctions.filter(item => {
                return location == "All" || item.location == location;
              });
              if (this.state.navigating) return;
              this.lockNavigation();
              navigate("Auction", {
                auction: filteredAuctions[id],
                points: points,
                onBid: () => {
                  this.updateAuctions();
                  this.updateUser();
                }
              });
            }}
          />

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.setState({ modalVisible: !this.state.modalVisible });
            }}
            style={{
              position: "absolute",
              bottom: 8,
              alignSelf: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "#FFF",
                padding: 12,
                borderRadius: 999,
                borderWidth: 2,
                borderColor: "#AAA",
                alignItems: "center",
                justifyContent: "center",
                shadowRadius: 16,
                shadowColor: "#AAA",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.75
              }}
            >
              <Image
                style={{ width: 44, height: 44, borderRadius: 0 }}
                source={require("../img/qr.png")}
              />
            </View>
          </TouchableHighlight>

          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onShow={() => {
              StatusBar.setBarStyle("light-content");
            }}
            onRequestClose={() => console.log("Request close")}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <QR
                  close={() => {
                    StatusBar.setBarStyle("dark-content");
                    this.updateUser();
                    this.updateAuctions();
                    this.setState({ modalVisible: !this.state.modalVisible });
                  }}
                >

                  <TouchableHighlight
                    style={{
                      zIndex: 999,
                      width: 22,
                      // height: 10,
                      top: 8
                      // backgroundColor: "red"
                    }}
                    underlayColor="transparent"
                    overlayColor="transparent"
                    onPress={() => {
                      StatusBar.setBarStyle("dark-content");
                      this.updateUser();
                      this.updateAuctions();
                      this.setState({ modalVisible: !this.state.modalVisible });
                    }}
                  >
                    <Text
                      style={{ color: "#FFF", fontSize: 36, lineHeight: 36 }}
                    >
                      ×
                    </Text>
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
