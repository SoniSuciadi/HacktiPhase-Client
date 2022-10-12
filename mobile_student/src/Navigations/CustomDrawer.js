import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SimpleLineIcons } from "@expo/vector-icons";

const { View, Text, StyleSheet, Image, Alert } = require("react-native");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
const CustomDrawer = (props) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View>
          <Image
            style={{ width: "100%", height: 70, padding: 10 }}
            source={{
              uri: "https://statics.hacktiv8.com/images/logo/hacktiv8-dark.webp",
            }}
          />
        </View>
        <View style={styles.containerDrawerItemList}>
          <DrawerItemList {...props} />
        </View>
        <View style={styles.containerLogout}>
          <TouchableOpacity
            onPress={async () => {
              Alert.alert("Logout", "Sure you want logout?", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: async () => {
                    navigation.dispatch(StackActions.popToTop());
                    await AsyncStorage.clear();
                  },
                },
              ]);
              //
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 16,
              }}
            >
              <SimpleLineIcons name="logout" size={24} color="#ff6d00" />
              <Text
                style={[
                  {
                    marginLeft: 10,
                  },
                  styles.text,
                ]}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerLogout: {
    borderTopWidth: 1,
    borderTopColor: "#ff6d00",
    paddingVertical: 15,
    flex: 1,
  },
  containerDrawerItemList: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingTop: 10,
  },
  text: {
    fontSize: 15,
    color: "#ff6d00",
    fontWeight: "500",
  },
});
export default CustomDrawer;
