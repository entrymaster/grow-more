import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Auth, StackNav } from "./GrowMoreNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppNavigation = () => {
  const [storage, setStorage] = useState();

  useEffect(() => {
    getUserData();
  }, [])


  const getUserData = useCallback(() => {

    AsyncStorage.getItem("userData").then((value) => {
      let parseData = JSON.parse(value);
      setStorage(parseData);


    });

  }, [])

  const authContext = useMemo(() => {
    return {
      login: () => {
        setStorage("userLogin");
      },
      signUp: () => {
        setStorage("userSignup");
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
        {storage ? <StackNav /> : <Auth />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigation;
