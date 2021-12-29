// import React,{useState, useEffect} from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import FetchLocation from '../Components/FetchLocation'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from '@expo/vector-icons';
import { Overlay } from "react-native-elements";
import { showMessage } from "react-native-flash-message";

const CropRecommender = ({ navigation }) => {

    const WEATHER_API_KEY = "e42534a7855aa5e8decbe255df993856";
    const BASE_WEATHER_URL = "https://history.openweathermap.org/data/2.5/aggregated/month?";

    const [userLocation, setUserLocation] = useState();
    const [autoWeatherFetch, setAutoWeatherFetch] = useState(false);
    const [weatherData, setWeatherData] = useState();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');
    const [pH, setpH] = useState('');
    const [formProgress, setFormProgress] = useState('soil');



    useEffect(() => {
        // console.log(userLocation.latitude);
        getWeatherData()
    }, [userLocation]);

    const getWeatherData = async () => {
        const requestURL = BASE_WEATHER_URL + "month=12&lat=" + userLocation.latitude + "&lon=" + userLocation.longitude + "&appid=" + WEATHER_API_KEY;
        await fetch(requestURL)
            .then(res => res.json())
            .then(result => {
                if (result.cod === "200") {
                    setWeatherData(result.result);
                }
            });
    }

    const submit = () => {
        setLoading('toWeather');
        setTimeout(() => {
            setLoading(false);
            // setFormProgress('weather')
              setVisible(true);
            // navigation.navigate('WeatherFetch')
        }, 1000);

    }

    const DisplaySwitch = () => {
        switch (formProgress) {
            case 'soil':

                return <ScrollView>
                    <Text style={styles.heading}>Enter Soil Parameters</Text>
                    <Text style={styles.headingDesc}>मिट्टी के मापदंड दर्ज करें ...</Text>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Nitrogen Value (नाइट्रोजन):</Text>
                        <TextInput
                            style={styles.input}
                            editable={!(loading === 'toWeather')}
                            onChangeText={(text) => setNitrogen(text)}
                            value={nitrogen}
                            placeholder="Enter value of Nitrogen"
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Phosphorus Value (फास्फोरस):</Text>
                        <TextInput
                            style={styles.input}
                            editable={!(loading === 'toWeather')}
                            onChangeText={(text) => setPhosphorus(text)}
                            value={phosphorus}
                            placeholder="Enter value of Nitrogen"
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Potassium Value (पोटैशियम):</Text>
                        <TextInput
                            style={styles.input}
                            editable={!(loading === 'toWeather')}
                            onChangeText={(text) => setPotassium(text)}
                            value={potassium}
                            placeholder="Enter value of Nitrogen"
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />
                        <Text style={styles.label}>pH Value (पी-एच):</Text>
                        <TextInput
                            style={styles.input}
                            editable={!(loading === 'toWeather')}
                            onChangeText={(text) => setpH(text)}
                            value={pH}
                            placeholder="Enter value of Nitrogen"
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />

                    </View>

                    <TouchableOpacity disabled={(loading === 'toWeather')} onPress={submit} style={styles.button}>
                        {
                            loading === 'toWeather' ?
                                <ActivityIndicator size="large" color="#f8f9fc" />
                                :
                                <><Text style={{ fontSize: 23, color: '#f8f9fc', fontWeight: 'bold' }}>Next</Text>
                                    <FontAwesome5 name="chevron-circle-right" size={24} color="#f8f9fc" /></>
                        }
                    </TouchableOpacity>

                </ScrollView>
            case 'weather':
                return <Text>Hello</Text>
            default:
                break;
        }
    }

    return (
        // <View>
        //     {autoWeatherFetch && <FetchLocation setUserLocation={setUserLocation} />}

        // </View>
        <View style={styles.container}>
            <LinearGradient style={{ flex: 1, justifyContent: 'space-around' }} colors={["#f5f7fa", "#c3cfe2"]}>


                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {
                        DisplaySwitch()
                    }
                </TouchableWithoutFeedback>


                <Overlay
                    isVisible={visible}
                    onBackdropPress={() => setVisible(!visible)}
                    overlayStyle={styles.overlay}
                >
                    <View style={styles.overlayContainer}>
                        <View
                            style={{
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: '#6c7075',
                            }}
                        >
                        <Text style={styles.overlayText}>Fetch Weather Data by Location ?</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity>
                                <Text>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>No</Text>
                            </TouchableOpacity>
                        </View>

                        </View>
                    </View>
                </Overlay>
            </LinearGradient>
        </View>
    )
}

export default CropRecommender

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // marginTop: Constants.statusBarHeight
    },
    heading: {
        color: '#36454f',
        fontSize: 30,
        paddingTop: 20,
        paddingLeft: 15
    },
    headingDesc: {
        color: '#6c7075',
        fontSize: 22,
        paddingLeft: 15
    },
    fieldContainer: {
        // alignItems: 'center'
        marginVertical: 30
    },
    label: {
        paddingVertical: 15,
        paddingLeft: 20,
        color: '#36454f',
        fontWeight: 'bold',
        fontSize: 18
    },
    input: {
        backgroundColor: 'rgb(192,192,192)',
        width: '92%',
        // marginVertical: 10,
        height: 55,
        borderRadius: 10,
        fontSize: 18,
        alignSelf: 'center',
        color: '#202329',
        padding: 10
    },
    category: {
        // flexDirection: 'row',
        // marginVertical: 20
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //  marginVertical: 3,
        padding: 8,
        width: '92%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#dfe1e5',
        alignItems: 'center'
    },
    overlay: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#dfe1e5'
    },
    overlayContainer: {
        width: 250,

    },
    overlayText: {
        paddingVertical: 10,
        fontSize: 20,
        color: "#2b5c4c",
        fontWeight:'bold'
    },
    button: {
        backgroundColor: '#2b5c4c',
        alignSelf: 'center',
        padding: 10,
        marginVertical: 20,
        borderRadius: 12,
        flexDirection: 'row',
        width: 125,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonContainer:{
        
    }
})
