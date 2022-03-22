import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { AuthContext } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import AboutInfo from '../Components/AboutInfo';

const Dashboard = () => {
    const { logOut } = React.useContext(AuthContext);

    const handleLogout = async () => {

        //console.log('hh')
        const clearData = await AsyncStorage.clear();
        AsyncStorage.getItem("userData").then((value) => {
            let parseData = JSON.parse(value);
            //console.log(parseData);
        })
        //console.log(clearData)
        logOut();

    };
    const LogOutPressed = () => {
        Alert.alert(
            'Logout Suparider',
            'Are you sure you want to logout ? ',
            [
                { text: 'OK', onPress: () => { handleLogout() } },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        );
    };
    return (
        <View>
        <ScrollView>
            <TouchableOpacity style={{ padding: 8, backgroundColor: 'red', borderRadius: 10,alignSelf:'center' }} onPress={() => LogOutPressed()}><Text style={{ fontSize: 16, color: '#fff', alignSelf:'center' }}>Logout</Text></TouchableOpacity>
            <AboutInfo />
            </ScrollView>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})
