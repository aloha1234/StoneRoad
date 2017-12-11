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
  Platform,
  Picker
} from "react-native";

import Auctions from "./Auctions";
import Profile from "./Profile";
import Settings from "./Settings";
import Stores from "./Stores";
import QR from "./QR";

import Icon from "react-native-vector-icons/Ionicons";

import DrawerLayout from "react-native-drawer-layout";

import { user, auctions, locations, stores } from "./API";

const Screen = Dimensions.get("window");

const fontFamily = Platform.OS === "ios" ? "American Typewriter" : "normal";

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
      navigating: false,
      stores: [],
      locations: []
    };
    this.updateUser();
    this.updateAuctions();
    this.updateLocations();
    this.updateStores();

    StatusBar.setBarStyle("dark-content");

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

  updateStores() {
    stores((err, stores) => {
      if (!err && stores.results) {
        this.setState({ stores: stores.results });
      } else {
        console.error(err);
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
      location,
      stores
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
          <DrawerLayout
            ref={leftDrawer => {
              return (this.leftDrawer = leftDrawer);
            }}
            drawerWidth={Screen.width}
            drawerPosition={DrawerLayout.positions.Left}
            renderNavigationView={() => (
              <Stores
                location={location}
                stores={stores}
                onClose={() => this.leftDrawer.closeDrawer()}
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
                <TouchableHighlight
                  onPress={() => this.rightDrawer.openDrawer()}
                >
                  <Icon
                    style={{
                      height: 32,
                      width: 32,
                      fontSize: 32,
                      marginLeft: 12,
                      color: "#333"
                    }}
                    name="ios-map"
                    onPress={() => this.leftDrawer.openDrawer()}
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
                    name="ios-leaf"
                  />
                </TouchableHighlight>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 16,
                paddingVertical: 16,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: "#AAA"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: fontFamily
                }}
              >
                {points >= 0 ? `YOU HAVE ${points} POINTS.` : ""}
              </Text>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() =>
                  this.setState({ showPicker: !this.state.showPicker })}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: fontFamily
                    }}
                  >
                    {location === "All" ? "All CA" : location}
                  </Text>
                  <Icon
                    style={{ fontSize: 16, marginLeft: 4 }}
                    name={this.state.showPicker ? "ios-arrow-up" : "ios-arrow-down"}
                  />
                </View>
              </TouchableHighlight>
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
            {this.state.showPicker ? (
              <Picker
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  left: 0,
                  zIndex: 999,
                  backgroundColor: "#f9f7f5",
                  borderTopWidth: 1,
                  borderColor: "#ccc"
                }}
                selectedValue={this.state.location}
                onValueChange={location =>
                  this.setState({ location: location })}
              >
                <Picker.Item label="All" value="All" />
                {locations.map(location => (
                  <Picker.Item
                    key={location.name}
                    label={location.name}
                    value={location.name}
                  />
                ))}
              </Picker>
            ) : null}

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
                        this.setState({
                          modalVisible: !this.state.modalVisible
                        });
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
        </DrawerLayout>
      </View>
    );
  }
}