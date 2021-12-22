import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet,View,Text,Image , ActivityIndicator, ImageBackground, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const StartingScreen = ({navigation}) => {
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
            <Text style={styles.headingText}>Hello</Text>
            <Text style={styles.headingDesc}>Welcome to Supariders</Text>
            <Text style={styles.goldText}>Learn more about Supariders</Text>
        </View>
        <Image
                style={styles.logoImg}
                source={require("../assets/logo.png")}
              />
              {
                  isLoading ? <ActivityIndicator size="large" color="white"
                    style={{flex:1, bottom:50, position:'absolute', alignSelf:'center'}}
                />
                :
                <TouchableOpacity onPress={()=>navigation.navigate('LoginPage')}><Text style={styles.button}>Let's Get Started</Text></TouchableOpacity>
              }
              
      
            {/* <ImageBackground
                style={{ resizeMode: 'contain', height: '100%', width: "100%" }}
                source={require('../assets/splash.png')}>
                  <ActivityIndicator size="large" color="white"
                    style={{flex:1, bottom:150, position:'absolute', alignSelf:'center'}}
                />
                
            </ImageBackground> */}
        </View>
    );

};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#26272C',
        flex:1,
        justifyContent:'space-around'
    },
    headingContainer:{
      // marginTop: '20%',
    },
    headingText:{
        fontSize:70,
        color:'#fff',
        fontWeight:"bold",
        textAlign:'center',
    },
    headingDesc:{
        fontSize:16,
        color:'#fff',
        fontWeight:"bold",
        textAlign:'center',
    },
    goldText:{
      fontSize:13,
        color:'#E3A840',
        textAlign:'center',
    },
    logoImg: {
        height: 350,
        // flex:1,
        width: 350,
        // marginVertical:'10%',
        alignSelf:'center',
        resizeMode: "contain",
      },
      button:{
          padding:12,
          borderRadius:10,
          marginHorizontal:10,
          color:'#fff',
          fontSize:20,
          textAlign:'center',
          backgroundColor:'#000',
            // marginTop:'20%'
        //   position:'absolute',
        //   bottom: 100
        //   marginTop:140
        //   shadowColor:'#fff',
        //   elevation:2
      }
})

export default StartingScreen;
