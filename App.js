import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './Navigation/AppNavigation';
import FlashMessage from "react-native-flash-message";

export default function App() {

  
  return (
    <View style={styles.container}>
      <AppNavigation /> 
      <StatusBar style="auto" />
      <FlashMessage position="top" statusBarHeight={35} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
