import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const History = () => {

    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
 
        AsyncStorage.getItem("userData").then((value) => {
          let parseData = JSON.parse(value);
          setAccessToken(parseData.accessToken);
    
         
        });
      }, []);

    useEffect(() => {
        if(accessToken !== ''){
            getHistoryAPI()
        }
    }, [accessToken])

    const getHistoryAPI = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWNjZjQ2Njk0YWM2MWU3N2ZjZWE4NmIiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwODUxMTYyLCJpYXQiOjE2NDA4MzY3NjJ9.Xufa6ZqHtRl819d6tkxB0LHKZOJVe7fF2TA2oiDrqeM");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("localhost:8081/v1/model/history/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default History

const styles = StyleSheet.create({})
