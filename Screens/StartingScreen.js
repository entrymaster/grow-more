import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const StartingScreen = ({ navigation }) => {

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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>

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
    width: 350,
    alignSelf: 'center',
    resizeMode: "contain",
  },
  button: {
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#5b8462',
    marginTop:'20%',
    elevation: 10,
    shadowColor: '#000'
  },
  buttonText:{
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  }
})

export default StartingScreen;
