import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import AboutInfo from '../Components/AboutInfo';
import History from '../Components/History';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserData();
    }, [])


    const getUserData = useCallback(() => {

        AsyncStorage.getItem("userData").then((value) => {
            let parseData = JSON.parse(value);
            setUserData(parseData);
        });

    }, [])
    return (
        <View style={styles.container}>
            {/* <ScrollView> */}

                <AboutInfo userData={userData} />
                <History token={userData.token} />
            {/* </ScrollView> */}
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})
