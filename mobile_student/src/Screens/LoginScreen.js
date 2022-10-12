import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../Components/LoadingComponent";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, UPDATE_EXPO_TOKEN } from "../configs/mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

export const LoginScreen = ({ navigation }) => {
  const { height, width } = useWindowDimensions();

  const [handleLogin, { data, loading, error }] = useMutation(LOGIN_USER);
  const [sendExpoToken, { data: result, loading: loadingg, error: errorr }] =
    useMutation(UPDATE_EXPO_TOKEN);
  useEffect(() => {
    async function checkLogin() {
      try {
        const access_token = await AsyncStorage.getItem("access_token");
        const id = await AsyncStorage.getItem("id");
        const expo_token = await AsyncStorage.getItem("expo_token");
        if (access_token && id) {
          navigation.navigate("DrawerHome", { access_token, id, expo_token });
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkLogin();
  }, []);
  const [disabelButton, setDisableButton] = useState(false);
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  useEffect(() => {
    saveToken();
  }, [data]);
  const handleSubmitLogin = async () => {
    try {
      handleLogin({
        variables: {
          content: {
            email: user.email,
            password: user.password,
          },
        },
      });
    } catch (error) {
      showInvalidLogin();
    }
  };
  const saveToken = async () => {
    if (data && !loading) {
      let access_token = data.login.access_token;
      let id = data.login.id;
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("id", id);
      registerForPushNotificationsAsync()
        .then(async (expo_token) => {
          sendExpoToken({
            variables: { expoToken: expo_token },
            context: {
              headers: {
                access_token: access_token,
              },
            },
          });
          await AsyncStorage.setItem("expo_token", expo_token);
          navigation.navigate("DrawerHome", { access_token, id, expo_token });
        })
        .catch((err) =>
          navigation.navigate("DrawerHome", {
            access_token,
            id,
            expo_token: "ExponentPushToken[odPTyFHomJ3G18iy-Bhhpw]",
          })
        );
    }
  };

  const showInvalidLogin = () => {
    Alert.alert("Login Fail", "Username or Password Invalid");
  };

  useEffect(() => {
    if (user.email && user.password) {
      setDisableButton(true);
    } else setDisableButton(false);
  }, [user]);
  const handleChangeForm = (e, name) => {
    setUser({
      ...user,
      [name]: e,
    });
  };
  async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ImageBackground
          style={{ width: width, height: 200 }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/hacktivphase.appspot.com/o/tumlogin.jpg?alt=media&token=e970d31b-94bf-4341-945f-31f638de732a",
          }}
        >
          <View style={{ paddingHorizontal: 10, marginTop: 100 }}>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "800",
                letterSpacing: 3,
              }}
            >
              Wellcome
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "800",
                letterSpacing: 2,
              }}
            >
              Student Hacktiv
            </Text>
          </View>
        </ImageBackground>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: "#ff6d00",
              fontWeight: "600",
            }}
          >
            Hey guys
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              color: "#ff6d00",
              fontWeight: "400",
            }}
          >
            Please Login Here
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            value={user.email || ""}
            onChangeText={(e) => {
              handleChangeForm(e, "email");
            }}
            style={{
              borderWidth: 1,
              width: "70%",
              height: 40,
              borderRadius: 10,
              borderColor: "gray",
              paddingHorizontal: 10,
              fontSize: 20,
              alignSelf: "center",
            }}
          />
          {!user.email && user.email !== null ? (
            <Text
              style={{
                height: 20,
                width: "70%",
                alignSelf: "center",
                color: "red",
              }}
            >
              Email must be require
            </Text>
          ) : (
            <Text
              style={{
                height: 20,
                width: "70%",
                alignSelf: "center",
                color: "red",
              }}
            ></Text>
          )}
          <TextInput
            placeholder="Password"
            value={user.password || ""}
            onChangeText={(e) => {
              handleChangeForm(e, "password");
            }}
            style={{
              borderWidth: 1,
              width: "70%",
              height: 40,
              borderRadius: 10,
              borderColor: "gray",
              paddingHorizontal: 10,
              marginTop: 10,
              fontSize: 20,
              alignSelf: "center",
            }}
            secureTextEntry
          />
          {!user.password && user.password !== null ? (
            <Text
              style={{
                height: 20,
                width: "70%",
                alignSelf: "center",
                color: "red",
              }}
            >
              Password must be require
            </Text>
          ) : (
            <Text
              style={{
                height: 20,
                width: "70%",
                alignSelf: "center",
                color: "red",
              }}
            ></Text>
          )}
          <Text
            style={{
              height: 20,
              width: "70%",
              alignSelf: "center",
              color: "#ff6d00",
              marginTop: 5,
              textAlign: "right",
            }}
          >
            Lupa Password
          </Text>
          <View
            style={{
              width: "70%",
              height: 40,
              marginTop: 5,
              backgroundColor: "#ff6d00",
              alignSelf: "center",
              borderRadius: 30,
            }}
          >
            <Button
              onPress={async () => {
                handleSubmitLogin();
              }}
              title="Login"
              color="white"
              disabled={!disabelButton}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Hay Guys", "Ditunggu OAuth nya ya kalo sempet :)");
            }}
            style={{
              width: "70%",
              height: 40,
              marginTop: 15,
              backgroundColor: "#ff6d00",
              alignSelf: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ alignSelf: "center" }}>
                <FontAwesome5 name="google" size={24} color="white" />
              </View>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  marginHorizontal: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Signin With Google
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, color: "#ff6d00" }}
            >
              ---- Contact Us ----
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#ff6d00",
                  padding: 10,
                  borderRadius: 30,
                  marginHorizontal: 2,
                }}
              >
                <MaterialIcons name="email" size={30} color="white" />
              </View>
              <View
                style={{
                  backgroundColor: "#ff6d00",
                  padding: 10,
                  borderRadius: 30,
                  paddingHorizontal: 13,
                  marginHorizontal: 2,
                }}
              >
                <FontAwesome name="whatsapp" size={30} color="white" />
              </View>
              <View
                style={{
                  backgroundColor: "#ff6d00",
                  padding: 10,
                  borderRadius: 30,
                  marginHorizontal: 2,
                }}
              >
                <Feather name="headphones" size={30} color="white" />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
