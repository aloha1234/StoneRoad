import React, { Component } from "react";
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
  Platform
} from "react-native";

const moment = require("moment");

const fontFamily = Platform.OS === "ios" ? "American Typewriter" : "normal";

import QR from "./QR";

import { auctions } from "./API";

export default class Auctions extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  render() {
    const { auctions, points, selectAuction, location } = this.props;

    if (!auctions) return <View style={{ flex: 1 }} />;
    const filteredAuctions = auctions.filter(item => {
      return location == "All" || item.location == location;
    });
    return (
      <View style={styles.container}>
        {filteredAuctions.length
          ? <FlatList
              data={filteredAuctions}
              keyExtractor={item => String(item.id)}
              ListFooterComponent={() => <View style={{ height: 88 }} />}
              renderItem={({ item, index }) => {
                const {
                  reward_name,
                  title,
                  location,
                  reward_description,
                  image_url,
                  current_bid,
                  minimum_bid,
                  auction_end_date,
                  auction_start_date,
                  id,
                  is_leader
                } = item;

                const bidRequired = current_bid ? current_bid + 5 : minimum_bid;
                const canBid = this.props.points >= bidRequired;
                const endDate = new moment(auction_end_date);

                const buttonColor = is_leader
                  ? "#4CD964"
                  : canBid ? "#047cc4" : "#ff3b30";

                const points = current_bid ? current_bid : minimum_bid;

                return (
                  <TouchableHighlight
                    overlayColor="transparent"
                    underlayColor="transparent"
                    onPress={() => this.props.selectAuction(index)}
                  >
                    <View
                      style={{
                        padding: 16,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor: "#AAA"
                      }}
                    >
                      <View
                        style={{
                          // paddingVertical: 16,
                          flexDirection: "row",
                          alignItems: "center"
                          // marginHorizontal: 16
                          // borderBottomWidth: StyleSheet.hairlineWidth,
                          // borderColor: "#AAA"
                        }}
                      >
                        {image_url
                          ? <View
                              style={{
                                backgroundColor: "#333",
                                width: 96,
                                height: 96,
                                borderRadius: 4,
                                overflow: "hidden"
                              }}
                            >
                              <Image
                                style={{
                                  borderRadius: 4,
                                  width: 96,
                                  height: 96
                                }}
                                source={{ uri: image_url }}
                              />
                            </View>
                          : <View
                              style={{
                                backgroundColor: "#333",
                                width: 96,
                                height: 96,
                                borderRadius: 4
                              }}
                            />}
                        <View style={{ flex: 1, marginLeft: 16 }}>
                          <Text
                            style={{
                              fontFamily: fontFamily,
                              paddingVertical: 2,
                              fontSize: 24,
                              fontWeight: "500",
                              color: "#555"
                            }}
                          >
                            {reward_name}
                          </Text>

                        </View>
                      </View>
                      <View style={{ paddingTop: 8 }}>
                        <Text
                          style={{
                            fontFamily: fontFamily,
                            paddingVertical: 2,
                            fontSize: 16,
                            fontWeight: "400",
                            color: "#111"
                          }}
                        >
                          {reward_description}
                        </Text>
                        <Text
                          style={{
                            fontFamily: fontFamily,
                            paddingVertical: 2,
                            fontSize: 16,
                            fontWeight: "400",
                            color: buttonColor
                          }}
                        >
                          {is_leader
                            ? "LEADING"
                            : "CURRENT BID: " + points + " POINTS"}
                        </Text>
                        <Text
                          style={{
                            fontFamily: fontFamily,
                            paddingTop: 2,
                            fontSize: 16,
                            fontWeight: "400",
                            color: "#555"
                          }}
                        >
                          {endDate
                            .to()
                            .substring(endDate.to().length - 4, endDate.to())
                            .toUpperCase() + " REMAINING"}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              }}
            />
          : <Text
              style={{
                fontFamily: fontFamily,
                textAlign: "center",
                padding: 32,
                fontSize: 24
              }}
            >
              No rewards found.
            </Text>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0ede6"
  }
});
