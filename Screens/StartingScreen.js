import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ImageBackground, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const StartingScreen = ({ navigation }) => {
  const [isLoading, setIsloading] = useState(true);
  setTimeout(() => {
    setIsloading(false);
  }, 1000);
  useEffect(() => {
    setIsloading(true)
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>namaste</Text>
        <Text style={styles.headingDesc}>We are here to grow</Text>
      </View>
      <Image
        style={styles.logoImg}
        source={require("../assets/starting-banner.png")}
      />
      {
        isLoading ? <ActivityIndicator size="large" color="white"
          style={{ flex: 1, bottom: 50, position: 'absolute', alignSelf: 'center' }}
        />
          :
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}><Text style={styles.button}>Let's Get Started</Text></TouchableOpacity>
      }
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-around'
  },
  headingContainer: {
    // marginTop: '20%',
  },
  headingText: {
    fontSize: 70,
    color: '#d7be69',
    fontWeight: "bold",
    textAlign: 'center',
  },
  headingDesc: {
    fontSize: 20,
    color: '#2b5c4c',
    fontWeight: "bold",
    textAlign: 'center',
  },
  goldText: {
    fontSize: 13,
    color: '#E3A840',
    textAlign: 'center',
  },
  logoImg: {
    height: 350,
    // flex:1,
    width: 350,
    // marginVertical:'10%',
    alignSelf: 'center',
    resizeMode: "contain",
  },
  button: {
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#5b8462',
    // marginTop:'20%'
    //   position:'absolute',
    //   bottom: 100
    //   marginTop:140
    //   shadowColor:'#fff',
    //   elevation:2
  }
})

export default StartingScreen;
