import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

            {/* <MainStackNavigator.Screen name="Events" component={Events} options={{
    title: '', headerStyle: { backgroundColor: '#500935', },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}} /> */}
            <MainStackNavigator.Screen name="AddEvent" component={AddEvent} options={{
                title: '', headerStyle: { backgroundColor: '#500935', },
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <MainStackNavigator.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false, title: "ChatScreen" }}
            />
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
                    if (route.name === 'HomePage') {
                        iconName = focused ? 'briefcase-search' : 'briefcase-clock';
                    } else if (route.name === 'Jobs') {
                        iconName = focused ? 'book-open-variant' : 'book-open-page-variant';

                    } else if (route.name === 'Courses') {
                        iconName = focused ? 'format-list-bulleted-square' : 'format-list-text';
                    } else if (route.name === 'Events') {
                        iconName = focused ? 'calendar' : 'calendar-account';
                    } /* else if (route.name === 'HRpro') {
							iconName = focused ? 'account-convert' : 'account-multiple-plus';
						} */
                    else if (route.name === 'RemoteWork') {
                        iconName = focused ? 'account-convert' : 'account-multiple-plus';
                    }
                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
                },
            })}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                style: { backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingBttom: 10, },
                activeTintColor: '#F02F39',
                inactiveTintColor: 'grey',
            }}>
            <TimesBottomTab.Screen name="HomePage" component={HomePage} options={{ title: 'Careers' }} />
            <TimesBottomTab.Screen name="Jobs" component={Jobs} options={{ title: 'Jobs' }} />
            <TimesBottomTab.Screen name="Courses" component={Courses} options={{ title: 'Courses', }} />
            <TimesBottomTab.Screen name="Events" component={Events} options={{ title: 'Events', }} />
            {/* <TimesBottomTab.Screen name="HRpro" component={HRpro} options={{ title: 'HR Pro', }} /> */}
            <TimesBottomTab.Screen name="RemoteWork" component={RemoteWork} options={{ title: 'Remote Work', }} />
        </TimesBottomTab.Navigator>

    );
}

const Drawer = createDrawerNavigator();

export const TimesDrawer = () => {
    return (

        <Drawer.Navigator drawerStyle={{ backgroundColor: '#f8f8f8' }}
            drawerContent={(props) => <SideDrawer {...props} />}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
            }}>
            <Drawer.Screen name="Career" component={StackNav} />
            <Drawer.Screen name="Interview and GD Prep" component={InterViewAndGD} />
            <Drawer.Screen name="Resume Writing" component={InterViewAndGD} />
            <Drawer.Screen name="HR Pro" component={HRpro} />
            <Drawer.Screen name="Mentorship" component={InterViewAndGD} />
            <Drawer.Screen name="News And Info" component={NewsAndInfo} />

        </Drawer.Navigator>

    );
}
