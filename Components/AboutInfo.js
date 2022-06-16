import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Divider } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

const AboutInfo = ({userData}) => {

  const username = (name) => {
    var str = name;
    if (str) {
      var res = str.slice(0, 1);
      var res = res.toUpperCase();
    } else {
      var res = "-";
    }
    return res;
  };



  return (
    <View style={styles.cardView}>
        <View style={styles.headingIcon}>
          <FontAwesome name="user-o" size={24} color="#707070" />
          <Text style={styles.cvHeading}>About You</Text>
        </View>

      <Divider />
      <View style={{ flexDirection: "row" }}>
        <View style={styles.imageView}>
          
            <View style={styles.ProfilePicBorder}>
              <Text style={styles.ProfilePicText}>{username(userData.name)}</Text>
            </View>
          
        </View>

        <View style={styles.nameAndCat}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.category}>{userData.email}</Text>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    width: "95%",
    backgroundColor: "white",
    alignSelf: "center",

    padding: 1,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 5,
  },
  headingIcon: {
    flexDirection: "row",
    alignContent: "center",
    padding: 10,
  },
  cvHeading: {
    color: "#707070",
    marginLeft: 5,
    fontSize: 18,
  },

  nameAndCat: {
    alignSelf: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#707070",
  },
  category: {
    fontSize: 19,

    fontWeight: "bold",
    color: "#F02F39",
    // paddingVertical: 10,
  },
  content: {
    padding: 10,
  },
 
  ProfilePicText: {
    fontSize: 40,
    color: "#DA9917",
    textAlign: "center",
    fontWeight: "600",
  },
  imageView: {
    height: 100,
    width: 100,
    borderRadius: 80,
    backgroundColor: "#daeff1",
    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
});
export default AboutInfo;
