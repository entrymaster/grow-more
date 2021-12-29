import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from '../Screens/LoginPage';
import SignUpPage from '../Screens/SignUpPage';
import StartingScreen from '../Screens/StartingScreen';
import Dashboard from '../Screens/Dashboard';
import CropRecommender from '../Screens/CropRecommender';
import News from '../Screens/News';
import CropList from '../Screens/CropList';
import History from '../Screens/History';
import { Alert } from 'react-native'
import { AuthContext } from "../Context";
import WeatherFetch from '../Screens/WeatherFetch';

const Authnavigator = createStackNavigator();
export const Auth = () => {

    const [oldUser, setOldUser] = useState();
    AsyncStorage.getItem('checkUser').then((value) => {
        let parseData = JSON.parse(value);
        //let checkUserAccess = (!parseData) ? 'false" : "true"
        setOldUser(parseData.olduser)
        //console.log('oldeuser value ', parseData.olduser);
    })


    return (
        <Authnavigator.Navigator>

            <Authnavigator.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false }} />
            <Authnavigator.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
            <Authnavigator.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }} />
        </Authnavigator.Navigator>
    );
}


// const WelcomeNavigator = createStackNavigator();
// const WelcomeNav = () => {
// 	return (
// 		<WelcomeNavigator.Navigator >
// 			{/* <WelcomeNavigator.Screen name="DecideScreen" component={DecideScreen} options={{ headerShown: false}} /> */}
// 			<WelcomeNavigator.Screen name="IntroSlider" component={IntroSlider} options={{ headerShown: false }} />

// 		</WelcomeNavigator.Navigator>
// 	)
// }

const MainStackNavigator = createStackNavigator();
export const StackNav = () => {
    return (
        <MainStackNavigator.Navigator>
            <MainStackNavigator.Screen name="BottomTab" component={TabNavigation} options={{ headerShown: false, title: "Home" }} />
            {/* <MainStackNavigator.Screen name="WeatherFetch" component={WeatherFetch} options={{ headerShown: false, title: "Recommender" }} /> */}

            {/* <MainStackNavigator.Screen name="CropRecommender" component={CropRecommender} options={{
                title: '', headerStyle: { backgroundColor: '#500935', },
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <MainStackNavigator.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, title: "ChatScreen" }}
            /> */}
        </MainStackNavigator.Navigator>
    )
}

const TimesBottomTab = createBottomTabNavigator();
export const TabNavigation = (props) => {

    return (

        <TimesBottomTab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'News') {
                        iconName = focused ? 'newspaper-variant' : 'newspaper-variant-outline';
                    } else if (route.name === 'Recommender') {
                        iconName = focused ? 'thumb-up' : 'thumb-up-outline';

                    } else if (route.name === 'CropList') {
                        iconName = focused ? 'format-list-bulleted-square' : 'format-list-text';
                    } else if (route.name === 'History') {
                        iconName = focused ? 'history' : 'history';
                    } /* else if (route.name === 'HRpro') {
							iconName = focused ? 'account-convert' : 'account-multiple-plus';
						} */
                    else if (route.name === 'Dashboard') {
                        iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
                    }
                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={route.name === 'Recommender'?32:24} color={color} />;
                },
            })}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                style: { backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
                activeTintColor: '#2b5c4c',
                inactiveTintColor: 'grey',
            }}>
            <TimesBottomTab.Screen name="News" component={News} options={{ title: 'Farming News', headerStyle:{backgroundColor:'#2b5c4c' },
            headerTitleStyle:{color:'#fff'} }} />
            <TimesBottomTab.Screen name="CropList" component={CropList} options={{ title: 'Crop List' }} />
            <TimesBottomTab.Screen name="Recommender" component={CropRecommender} options={{ title: 'Recommender',headerStyle:{backgroundColor:'#2b5c4c' },
            headerTitleStyle:{color:'#fff'} }} />
            <TimesBottomTab.Screen name="History" component={History} options={{ title: 'History', }} />
            <TimesBottomTab.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard', }} />
        </TimesBottomTab.Navigator>

    );
}

const Drawer = createDrawerNavigator();

export const SideDrawer = () => {
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
        return true;
    };
    return (

        <Drawer.Navigator drawerStyle={{ backgroundColor: '#f8f8f8' }}
            // drawerContent={(props) => <SideDrawer {...props} />}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
            }}>
            <Drawer.Screen name="News" component={StackNav} />
            {/* <Drawer.Screen name="Interview and GD Prep" component={CropRecommender} />
            <Drawer.Screen name="Resume Writing" component={CropRecommender} />
            <Drawer.Screen name="HR Pro" component={CropRecommender} />
            <Drawer.Screen name="Mentorship" component={CropRecommender} />
            <Drawer.Screen name="Logout" component={LogOutPressed} /> */}

        </Drawer.Navigator>

    );
}
