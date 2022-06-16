import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginPage from "../Screens/LoginPage";
import SignUpPage from "../Screens/SignUpPage";
import StartingScreen from "../Screens/StartingScreen";
import Dashboard from "../Screens/Dashboard";
import CropRecommender from "../Screens/CropRecommender";
import News from "../Screens/News";
import { LogoutButton } from "../Components/LogoutButton";

const Authnavigator = createStackNavigator();
export const Auth = () => {

  return (
    <Authnavigator.Navigator>
      <Authnavigator.Screen
        name="StartingScreen"
        component={StartingScreen}
        options={{ headerShown: false }}
      />
      <Authnavigator.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Authnavigator.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{ headerShown: false }}
      />
    </Authnavigator.Navigator>
  );
};

const MainStackNavigator = createStackNavigator();
export const StackNav = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name="BottomTab"
        component={TabNavigation}
        options={{ headerShown: false, title: "Home" }}
      />
    </MainStackNavigator.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();
export const TabNavigation = (props) => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "News") {
            iconName = focused ? "newspaper-variant" : "newspaper-variant-outline";
          } else if (route.name === "Recommender") {
            iconName = focused ? "thumb-up" : "thumb-up-outline";
          }  else if (route.name === "Dashboard") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        },
        activeTintColor: "#2b5c4c",
        inactiveTintColor: "grey",
      }}
    >
      <BottomTab.Screen
        name="News"
        component={News}
        options={{
          title: "Farming News",
          headerStyle: { backgroundColor: "#2b5c4c" },
          headerTitleStyle: { color: "#fff" },
        }}
      />
  
      <BottomTab.Screen
        name="Recommender"
        component={CropRecommender}
        options={{
          title: "Recommender",
          headerStyle: { backgroundColor: "#2b5c4c" },
          headerTitleStyle: { color: "#fff" },
        }}
      />

      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          headerStyle: { backgroundColor: "#2b5c4c" },
          headerTitleStyle: { color: "#fff" },
          headerRight: () => (<LogoutButton />)
        }}
      />
    </BottomTab.Navigator>
  );
};
