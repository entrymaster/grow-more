import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Overlay } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

const SuccessOverlay = (props) => {
    const navigation = useNavigation();
    return (
        <View>
            <Overlay
                    isVisible={props.cropVisible}
                    onBackdropPress={() => props.setCropVisible(!props.cropVisible)}
                    overlayStyle={styles.overlay}
                >
                    <View style={styles.overlayContainer}>
                        <Text style={styles.heading}>Predicted Crop</Text>
                        <Text style={styles.crop}>{props.crop}</Text>
                        <TouchableOpacity onPress={()=>{props.setCropVisible(!props.cropVisible)}} style={styles.button}>
                            
                            <Text style={{ fontSize: 20, color: '#f8f9fc', fontWeight: 'bold',marginLeft:35 }}>OK</Text>


                        </TouchableOpacity>
                    </View>

                    </Overlay> 
        </View>
    )
}

export default SuccessOverlay

const styles = StyleSheet.create({
    overlay: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#dfe1e5'
    },
    heading:{
        fontSize:22,
        color:'#293346',
        fontWeight:'bold',
        textAlign:'center'
    },
    overlayContainer: {
        width: 250,
        height: 170
    },
    crop:{
        fontSize:24,
        color:'#0cac75',
        fontWeight:'bold',
        textAlign:'center',
        marginTop:30

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
        
        borderRadius: 12,
        flexDirection: 'row',
        width: 125,
        // alignItems: 'center',
    }
})
