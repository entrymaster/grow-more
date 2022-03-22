import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { Entypo, FontAwesome } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
const AboutInfo = (props) => {
  const navigation = useNavigation();
  const [status, setStatus] = useState(true);
  const [displayItems, setDisplayItems] = useState([]);
  // console.log(displayItems);

  const randomData = [
    {
      id: "1",
      employer: "Crop: Maize",
      position: "Farm 1",
      from: "08/14/2020",
      to: "09/14/2021",
    },
    {
      id: "2",
      employer: "Crop: Wheat",
      position: "Farm 2",
      from: "08/14/2020",
      to: "09/14/2021",
    },
    {
      id: "3",
      employer: "Crop: Paddy",
      position: "Farm 3",
      from: "08/14/2020",
      to: "09/14/2021",
    },
    {
      id: "4",
      employer: "Crop: Banana",
      position: "Farm 4",
      from: "08/14/2020",
      to: "09/14/2021",
    },
  ];
  const DropDownOptions = [
    {
      keyIndex: "1",
      option: "Farm 1",
    },
    {
      keyIndex: "2",
      option: "Farm 2",
    },
    {
      keyIndex: "3",
      option: "Farm 3",
    },
    {
      keyIndex: "4",
      option: "Farm 4",
    },
  ];
  let name = "Deepak Singh";
  let category = "Lucknow, U.P ";

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

  const handleDisplayList = (index, operation) => {
    // console.log(index);
    let temp = [...displayItems];
    switch (operation) {
      case "add":
        temp.push(index);
        setDisplayItems(temp);
        break;
      case "delete":
        const removeIndex = displayItems.findIndex(
          (item) => item.keyIndex == index
        );
        temp.splice(removeIndex, 1);
        setDisplayItems([...temp]);
        break;
      default:
        break;
    }
  };

  const DifferenceBetweenDates = (from, to) => {
    let date1 = new Date(from);
    let date2 = new Date(to);
    let numberOfMonths = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()) + 1;
    let numberOfYears = (numberOfMonths/12).toFixed(0);
    let display = numberOfYears + (numberOfYears == '1'? ' year ':' years ') + numberOfMonths + (numberOfMonths == '1'? ' month':' months')
    return(display);
  }

  return (
    <View style={styles.cardView}>
      <View style={styles.mainContainer}>
        <View style={styles.headingIcon}>
          <FontAwesome name="user-o" size={24} color="#707070" />
          <Text style={styles.cvHeading}>About You</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("DashboardEditProfile")}
        >
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Divider />
      <View style={{ flexDirection: "row" }}>
        <View style={styles.imageView}>
          {status ? (
            <View style={styles.ProfilePicBorder}>
              <Text style={styles.ProfilePicText}>{username(name)}</Text>
            </View>
          ) : (
            <View>
              <Image source={{ uri: image }} style={styles.ImageStyle} />
            </View>
          )}
        </View>

        <View style={styles.nameAndCat}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.category}>{category.toUpperCase()}</Text>
        </View>
      </View>
      <Divider style={{ padding: 10, margin: 10 }} />
      <View style={{ padding: 10 }}>
        <Text style={styles.cvHeading}>About</Text>
        <Text style={styles.content}>
        Repaired and maintained fences, farm machineries, and farm buildings.
Executed and performed feeding and caring for farm animals like horses and cattle.
Drove and operated farm tractors to bush hog and make hay.
Harvested and reaped vegetables, fruits and crops using farm equipment or hand.
Repaired and replaced defective farm equipment.
        </Text>
        <Divider />
        <FlatList
          data={DropDownOptions}
          keyExtractor={(item) => item.keyIndex}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.cvHeading}>{item.option}</Text>
                {displayItems.indexOf(item.keyIndex) == -1 ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handleDisplayList(item.keyIndex, "add")}
                  >
                    <Entypo name="chevron-down" size={24} color="#777777" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handleDisplayList(item.keyIndex, "delete")}
                  >
                    <Entypo name="chevron-up" size={24} color="#777777" />
                  </TouchableOpacity>
                )}
              </View>
              {displayItems.indexOf(item.keyIndex) != -1 ? (
                <FlatList
                  data={randomData}
                  style={{
                    // flexDirection: "row",
                    // flexWrap: "wrap",
                    paddingHorizontal: 10,
                  }}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        width: '100%',
                        alignSelf: "center",
                        padding: 8,
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        marginHorizontal: 4,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 10,
                        margin: 14,
                        elevation: 5,
                      }}
                    >

                      <View>
                        <Text style={{ color: "#F02F39", fontWeight: 'bold' }}>{item.position}</Text>
                        <Text style={{ color: "#707070", fontWeight: 'bold' }}>{item.employer}</Text>
                        {/* <View style={{flexDirection:'row'}}> */}
                          <Text style={{color: "#707070"}}>{DifferenceBetweenDates(item.from, item.to)}</Text>
                          {/* <Text style={{ color: "#707070" }}>
                            {" ( "+item.from + " - " + item.to+" )"}
                          </Text> */}
                        {/* </View> */}
                      </View>
                      <TouchableOpacity
                        style={{ paddingLeft: 5 }}
                      >
                        <Entypo name="cross" size={20} color="#F02F39" />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : null}
            </View>
          )}
        />

        <Divider />
        <Text style={styles.showMore}>Show More </Text>
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

  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subHeading: {
    padding: 10,
    color: "grey",
  },
  buttonCV: {
    width: "50%",
    alignSelf: "center",
  },
  editButton: {
    padding: 10,
    color: "#FF0000",
  },

  nameAndCat: {
    alignSelf: "center",
    justifyContent: "center",
    // alignItems: 'center'
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
  showMore: {
    alignSelf: "center",
    color: "#F02F39",
    paddingVertical: 10,
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
