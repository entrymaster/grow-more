import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from '@expo/vector-icons';
import { Overlay } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import * as Location from 'expo-location';
import SuccessOverlay from '../Components/SuccessOverlay';


const CropRecommender = ({ navigation }) => {

    const WEATHER_API_KEY = "e42534a7855aa5e8decbe255df993856";
    const BASE_WEATHER_URL = "https://history.openweathermap.org/data/2.5/aggregated/month?";

    const [userLocation, setUserLocation] = useState();
    const [autoWeatherFetch, setAutoWeatherFetch] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [formProgress, setFormProgress] = useState('soil');
    const [cropVisible, setCropVisible] = useState(false)
    const [accessToken, setAccessToken] = useState('')

    //data states
    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');
    const [pH, setpH] = useState('');
    const [temperature, setTemperature] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [humidity, setHumidity] = useState('');
    const [predictedCrop, setPredictedCrop] = useState(null);


    // useEffect(() => {
    //    if(cropVisible !== null)
    //    {

    //    }
    // }, [predictedCrop])

    // useEffect(() => {

    //     AsyncStorage.getItem("userData").then((value) => {
    //         let parseData = JSON.parse(value);
    //         setAccessToken(parseData.accessToken);


    //     });
    // }, []);

    useEffect(() => {
        fetchLocation()
    }, [])
    

    useEffect(() => {
        if (weatherData !== null) {
            setHumidity(Math.round(weatherData.humidity.mean))
            setTemperature(Math.round(weatherData.temp.mean - 273.15))
            setRainfall(Math.round(weatherData.precipitation.mean * 8640))
        }

    }, [weatherData])

    const getWeatherData = async () => {
        setLoading('weatherFetching');
        const requestURL = BASE_WEATHER_URL + "month=12&lat=" + userLocation.latitude + "&lon=" + userLocation.longitude + "&appid=" + WEATHER_API_KEY;

        await fetch(requestURL)
            .then(res => res.json())
            .then(result => {
                if (result.cod === 200) {
                    setWeatherData(result.result);
                    setVisible(false);
                    setLoading(false);
                    setFormProgress('weather');
                }
            });
    }

    const submit = () => {
        if (!nitrogen) {
            showMessage({
                message: "Please enter nitrogen value !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else if (!phosphorus) {
            showMessage({
                message: "Please enter phosphorus value !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else if (!potassium) {
            showMessage({
                message: "Please enter potassium value !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else if (!pH) {
            showMessage({
                message: "Please enter pH value !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else {
            setLoading('toWeather');
            setTimeout(() => {
                setLoading(false);
                // setFormProgress('weather')
                setVisible(true);
                // navigation.navigate('WeatherFetch')
            }, 200);
        }

    }

    // const AutoWeatherFetch = () =>{
    //     setLoading('weatherFetching');
    //     setAutoWeatherFetch(true);
    // }

    const fetchLocation = async () => {
        
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // setLocation(location);
        setUserLocation(location.coords);
        // setTimeout(() => {
        //     if (userLocation) {
                
        //     }

        // }, 200);
    }

    const goBack = () => {
        setFormProgress('soil')
    }

    const callMlModel = () => {
        if (!nitrogen) {
            showMessage({
                message: "Nitrogen Value missing !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        }
        else if (!phosphorus) {
            showMessage({
                message: "Phosphorus Value missing !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else if (!potassium) {
            showMessage({
                message: "Potassium Value missing !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else if (!pH) {
            showMessage({
                message: "pH Value missing !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else if (!temperature) {
            showMessage({
                message: "Temperature Value missing !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else if (!humidity) {
            showMessage({
                message: "Humidity Value missing !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else if (!rainfall) {
            showMessage({
                message: "Rainfall Value missing !",
                type: "warning",
                icon: "warning",
                duration: 3500,
            });
        } else {
           
           setLoading('predict')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "values": `${nitrogen}`+" "+`${phosphorus}`+" "+`${potassium}`+" "+`${temperature.toString()}`+" "+`${humidity.toString()}`+" "+`${pH}`+" "+`${rainfall.toString()}`
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://crop-predictor-model.herokuapp.com/predict", requestOptions)
                .then(response => response.json())
                .then(result => {
                    // alert()
                    setPredictedCrop(result.prediction);
                    setCropVisible(true);
                    setLoading(false)
                })
                .catch(error => console.log('error', error));

        }

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
                return <ScrollView>
                    <Text style={{
                        color: '#36454f',
                        fontSize: 28,
                        paddingTop: 20,
                        paddingLeft: 15
                    }}>Enter Weather Parameters</Text>
                    <Text style={styles.headingDesc}>मौसम के मापदंड दर्ज करें ...</Text>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Average Rainfall (cm) (औसत वर्षा):</Text>
                        <TextInput
                            style={styles.input}
                            editable={!(loading === 'toWeather')}
                            onChangeText={(text) => setRainfall(text)}
                            value={rainfall}
                            defaultValue={`${rainfall}`}
                            placeholder="Enter average Rainfall"
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Average Temperature °C (औसत तापमान):</Text>
                        <TextInput
                            style={styles.input}
                            editable={!(loading === 'toWeather')}
                            defaultValue={`${temperature}`}
                            onChangeText={(text) => setTemperature(text)}
                            value={temperature}
                            placeholder="Enter average Temperature"
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Average Humidity (%) (औसत आर्द्रता):</Text>
                        <TextInput
                            style={styles.input}
                            editable={!(loading === 'toWeather')}
                            onChangeText={(text) => setHumidity(text)}
                            defaultValue={`${humidity}`}
                            value={humidity}
                            placeholder="Enter average Humidity"
                            autoCapitalize="none"
                            keyboardType="numeric"
                        />


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity onPress={goBack} style={styles.button}>
                            <FontAwesome5 name="chevron-circle-left" size={24} color="#f8f9fc" />
                            <Text style={{ fontSize: 23, color: '#f8f9fc', fontWeight: 'bold' }}>Back</Text>


                        </TouchableOpacity>

                        <TouchableOpacity disabled={(loading === 'toWeather')} onPress={callMlModel} style={styles.button}>
                            {
                                loading === 'predict' ?
                                    <ActivityIndicator size="large" color="#f8f9fc" />
                                    :
                                    <><Text style={{ fontSize: 23, color: '#f8f9fc', fontWeight: 'bold' }}>Next</Text>
                                        <FontAwesome5 name="chevron-circle-right" size={24} color="#f8f9fc" /></>
                            }
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            default:
                break;
        }
    }

    return (
        // <View>
        //     {autoWeatherFetch && <FetchLocation setUserLocation={setUserLocation} />}

        // </View>
        <View style={styles.container}>
            {/* {autoWeatherFetch && <FetchLocation setUserLocation={setUserLocation} />} */}
            <LinearGradient style={{ flex: 1, justifyContent: 'space-around' }} colors={["#f5f7fa", "#c3cfe2"]}>


                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {
                        loading === 'finalSubmit' ?
                            <ActivityIndicator style={{ flex: 1 }} size="large" color="#2b5c4c" />
                            : DisplaySwitch()
                    }
                </TouchableWithoutFeedback>


                <Overlay
                    isVisible={visible}
                    onBackdropPress={() => setVisible(!visible)}
                    overlayStyle={styles.overlay}
                >
                    <View style={styles.overlayContainer}>
                        {
                            loading === 'weatherFetching' ?
                                <ActivityIndicator style={{ flex: 1 }} size="large" color="#2b5c4c" />
                                :
                                <View
                                    style={{
                                        borderTopWidth: 1,
                                        borderBottomWidth: 1,
                                        borderColor: '#6c7075',
                                    }}
                                >
                                    <Text style={styles.overlayText}>Fetch Weather Data by Location ?</Text>

                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity onPress={getWeatherData} style={[styles.overlayBtn, { backgroundColor: '#2b5c4c', borderColor: '#023020' }]}>
                                            <Text style={[styles.overlayBtnText, { color: '#fff' }]}>Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setFormProgress('weather'); setVisible(false) }} style={[styles.overlayBtn, { borderColor: '#2b5c4c' }]}>
                                            <Text style={[styles.overlayBtnText, { color: '#2b5c4c' }]}>No</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                        }

                    </View>
                </Overlay>
            </LinearGradient>
            <SuccessOverlay cropVisible={cropVisible} setCropVisible={setCropVisible} crop={predictedCrop} />
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
        height: 170

    },
    overlayText: {
        paddingVertical: 10,
        fontSize: 20,
        color: "#2b5c4c",
        fontWeight: 'bold'
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
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    overlayBtn: {
        alignSelf: 'center',
        padding: 10,
        marginVertical: 20,
        borderRadius: 12,
        // flexDirection: 'row',
        width: 100,
        borderWidth: 2,
        alignItems: 'center',
    },
    overlayBtnText: {
        fontSize: 18,

    }
})
