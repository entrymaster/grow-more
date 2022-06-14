import React from 'react'
import { StyleSheet, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import AboutInfo from '../Components/AboutInfo';

const Dashboard = () => {
    return (
        <View>
        <ScrollView>
        
            <AboutInfo />
            </ScrollView>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({})
