import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../Context";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");
  const [passHidden, setPassHidden] = useState(true);
  const [loading, setLoading] = useState();
  const { login } = React.useContext(AuthContext);
  const { skip } = React.useContext(AuthContext);

  const saveDataToStorage = (loginStatus) => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ Status: loginStatus, userName: loginID })
    );
  };
  const SubmitLogin = () => {
    if (!loginID) {
      showMessage({
        message: "Please fill username !",
        type: "warning",
        icon: "warning",
        duration: 3500,
      });
    } else if (!password) {
      showMessage({
        message: "Please fill password !",
        type: "warning",
        icon: "warning",
        duration: 3500,
      });
    } else {
      saveDataToStorage("success");
      login();
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWNjOGVlMzY3NmI5OGNmYmY2OTcyZjUiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwODEwNTAzLCJpYXQiOjE2NDA3OTYxMDN9.8nhDLrATTnEkNbiL8kGrbUemooeUyjCnzsFKszA1Tew");

      var raw = JSON.stringify({
        "email": "faisal@gmail.com",
        "password": "faisal@21"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch( global.baseURL +"v1/auth/login", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.message === "Login successful") {
            showMessage({
              message: "Login Successful!",
              type: "success",
              icon: "success",
              duration: 3500,
            });
            saveDataToStorage("success");
            login();
            // alert('hi')
            // if (result.status_code === 200 && result.status === "SUCCESS") {
            // }
          }
        })
        .catch(error => console.log('error', error));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient style={{ flex: 1, justifyContent: 'space-around' }} colors={["#91EAE4", "#2b5c4c"]}>
          <KeyboardAvoidingView
            behavior={"position"}


          >
            <View>

              <Image
                style={styles.logoImg}
                source={require("../assets/logo.png")}
              />

              <View style={styles.fieldContainer}>
                <Text style={styles.headingText}>Login</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.inputBoxLabel}>Username</Text>
                <TextInput
                  selectionColor="#FFFFFF"
                  style={styles.inputBox}
                  onChangeText={(text) => setLoginID(text)}
                  value={loginID}
                  autoCapitalize="none"
                />
                <Text style={styles.inputBoxLabel}>Password</Text>
                <View>
                  <View style={{ flexDirection: 'row', marginRight: 25 }}>
                    <TextInput
                      selectionColor="#FFFFFF"
                      secureTextEntry={passHidden}
                      style={styles.inputBox}
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.eyeIcon}
                      onPress={() => setPassHidden(!passHidden)}
                    >
                      <Ionicons
                        name={
                          passHidden ? "ios-eye-off-outline" : "ios-eye-outline"
                        }
                        size={25}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.loginBtn}
                  onPress={() => SubmitLogin()}
                >
                  {loading ? (
                    <ActivityIndicator color={"#F02F39"} />
                  ) : (
                    <Text style={styles.loginBtnText}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAvoidingView>
          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpPage")}
            >
              <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#26272C",
    flex: 1,
  },
  input: {
    // marginTop: 40,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginButton: {
    width: "30%",
    textAlign: "center",
    padding: 10,
    color: "#fff",
    backgroundColor: "#000",
  },
  logoImg: {
    height: 250,
    // flex:1,
    width: 250,
    // marginVertical: 30,
    alignSelf: "center",
    resizeMode: "contain",
  },
  fieldContainer: {
    // marginTop: 20,
    // paddingBottom: 10,
    paddingHorizontal: 30,

  },
  headingText: {
    fontWeight: "600",
    fontSize: 22,
    color: "#FFFFFF",
  },
  horizontalLine: {
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 2,
    marginVertical: 10,
    width: 40,
  },
  inputBox: {
    width: "100%",
    height: 30,
    fontSize: 16,
    color: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    textDecorationLine: "none",
  },
  inputBoxLabel: {
    fontWeight: "600",
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: '10%',
  },
  eyeIcon: {
    borderBottomWidth: 1,
    padding: 1,
    //   marginRight:10,
    borderBottomColor: '#fff'
    // position: "absolute",
    // right: 5,top: 0, left: 0, right: 0, bottom: 0,
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: 20,
  },
  loginBtn: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#F3F3F3",
    padding: 12,
    width: 220,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  loginBtnText: {
    textAlign: "center",
    color: "#2b5c4c",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomTextView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  bottomText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  signupText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
