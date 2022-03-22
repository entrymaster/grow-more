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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../Context";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpPage = ({ navigation }) => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [passHidden, setPassHidden] = useState(true);
  const [loading, setLoading] = useState();
  const { login } = React.useContext(AuthContext);
  const { skip } = React.useContext(AuthContext);

  const saveDataToStorage = (loginStatus, accessToken) => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ Status: loginStatus, name: accessToken })
    );
  };
  const SubmitSignUp = () => {
    if (!name) {
      showMessage({
        message: "Please fill name !",
        type: "warning",
        icon: "warning",
        duration: 3500,
      });
    } else if (!email) {
      showMessage({
        message: "Please fill email !",
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
      setLoading(true)
      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");

      // var raw = JSON.stringify({
      //   name: (name),
      //   email: (email),
      //   password: (password)
      // });

      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   // redirect: 'follow'
      // };

      // fetch(global.baseURL+"v1/auth/register", requestOptions)
      //   .then(response => response.json())
      //   .then(result => {
      //     console.log(result);
      //     showMessage({
      //       message: "Signed Up Successfully !",
      //       type: "success",
      //       icon: "success",
      //       duration: 3500,
      //   });
      //     saveDataToStorage("success", result.tokens.access.token)
      //     login()
      //   })
      //   .finally(() => setLoading(false))
      //   .catch(error => console.log('error', error));
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "name": (name),
        "email": (email),
        "password": (password)
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://grow-more-backend.herokuapp.com/v1/auth/register", requestOptions)
        .then(response => {
          if (!response.ok) {
            alert("Something went wrong");
          }
          return response.json()
        })
        .then(result => {
          console.log(result);
          if (result.user !== undefined) {
            showMessage({
              message: "Signed Up Successfully !",
              type: "success",
              icon: "success",
              duration: 3500,
            });
            saveDataToStorage("success", result.user.name)
            login()
          }
        })
        .catch(error => console.log('error', error));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient style={{ flex: 1 }} colors={["#91EAE4", "#2b5c4c"]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior={"position"}>
              <View>

                <Image
                  style={styles.logoImg}
                  source={require("../assets/logo.png")}
                />

                <View style={styles.fieldContainer}>
                  <Text style={styles.headingText}>Sign Up</Text>
                  <View style={styles.horizontalLine} />
                  <Text style={styles.inputBoxLabel}>your name</Text>
                  <TextInput
                    selectionColor="#FFFFFF"
                    style={styles.inputBox}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    autoCapitalize="none"
                  />
                  {/* <Text style={styles.inputBoxLabel}>create username</Text>
                <TextInput
                  selectionColor="#FFFFFF"
                  style={styles.inputBox}
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  autoCapitalize="none"
                /> */}
                  <Text style={styles.inputBoxLabel}>your email</Text>
                  <TextInput
                    selectionColor="#FFFFFF"
                    style={styles.inputBox}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
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
                    {/* <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity> */}
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.signupBtn}
                    onPress={() => SubmitSignUp()}
                  >
                    {loading ? (
                      <ActivityIndicator color={"#F02F39"} />
                    ) : (
                      <Text style={styles.loginBtnText}>Sign Up</Text>
                    )}
                  </TouchableOpacity>
                </View>

              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginPage")}
            >
              <Text style={styles.signupText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignUpPage;

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

  logoImg: {
    height: 200,
    // flex:1,
    width: 200,
    marginVertical: 30,
    alignSelf: "center",
    resizeMode: "contain",
  },
  fieldContainer: {
    // marginTop: 20,
    marginBottom: 20,
    height: '65%',
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
    width: 60,
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
    // height:'8%'
    marginTop: 25,
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
  signupBtn: {
    marginTop: 40,
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
    marginBottom: 20,
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
