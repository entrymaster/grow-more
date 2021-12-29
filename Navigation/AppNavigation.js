import React, { useState, useEffect, useMemo } from "react";
import { SideDrawer, Auth, StackNav } from "./GrowMoreNavigation";
import { NavigationContainer } from "@react-navigation/native";
import StartingScreen from "../Screens/StartingScreen";
import { AuthContext } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppNavigation = () => {
  const [storage, setStorage] = useState();
  const [isLoading, setIsloading] = useState(true);
  console.log(storage)
  useEffect(() => {
 
    AsyncStorage.getItem("userData").then((value) => {
      let parseData = JSON.parse(value);
      setStorage(parseData);

     
    });
  }, []);

  const authContext = useMemo(() => {
    return {
      login: () => {
        setStorage("userLogin");
      },
      signUp: () => {
        setStorage("userSignup");
      },
      skip: () => {
        setStorage("skip");
      },
      logOut: () => {
        setStorage(null);
        console.log('Logout')
      },
    };
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { storage ? <StackNav /> : <Auth />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigation;
