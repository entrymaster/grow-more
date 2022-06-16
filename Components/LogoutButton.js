import { Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { AuthContext } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LogoutButton = () => {
    const { logOut } = React.useContext(AuthContext);

    const handleLogout = async () => {
        const clearData = await AsyncStorage.clear();

        AsyncStorage.getItem("userData").then((value) => {
            let parseData = JSON.parse(value);
            console.log(parseData);
        })

        console.log(clearData);

        logOut();

    };
    const LogOutPressed = () => {
        Alert.alert(
            'Logout Grow More',
            'Are you sure you want to logout ? ',
            [
                { text: 'OK', onPress: () => { handleLogout() } },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        );
    };
    return (
        <TouchableOpacity style={{ padding: 6, backgroundColor: 'red', borderRadius: 5, marginRight:10 }} onPress={() => LogOutPressed()}>
            <Text style={{ fontSize: 15, color: '#fff' }}>Logout</Text>
        </TouchableOpacity>
    )
}