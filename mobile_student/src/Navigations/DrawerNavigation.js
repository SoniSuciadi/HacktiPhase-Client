import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "../Screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import { ChatsScreen } from "../Screens/ChatsScreen";
import { MaterialNavigation } from "./MaterialNavigation";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ForumScreen } from "../Screens/ForumScreen";
import { useState } from "react";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation({ navigation, route }) {
  const { access_token, id } = route.params;
  const [phase, setPhase] = useState("");
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: "#fafafa",
        },
        drawerActiveBackgroundColor: "#ff6d00",

        drawerType: "back",

        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
          color: (config) => {
            config.focused ? "#ffff" : "#ff6d00";
          },
        },
        headerTintColor: "#ff6d00",
        headerLeft: () => (
          <TouchableOpacity onPress={navigation.toggleDrawer}>
            <Entypo
              name="menu"
              size={24}
              color="#ff6d00"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ access_token, id }}
        options={{
          gestureEnabled: false,
          drawerLabel: "Home",
          headerShown: false,
          drawerIcon: (config) => {
            return (
              <Ionicons
                name="ios-home-outline"
                size={24}
                color={config.focused ? "#ffff" : "#ff6d00"}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Material"
        component={MaterialNavigation}
        initialParams={{ access_token, id }}
        options={{
          drawerLabel: "Material",
          drawerIcon: (config) => {
            return (
              <Entypo
                name="open-book"
                size={24}
                color={config.focused ? "#ffff" : "#ff6d00"}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatsScreen}
        initialParams={{ access_token, id, setPhase }}
        options={{
          drawerLabel: "Group Class",
          headerTitle: `Group Phase ${phase}`,
          drawerIcon: (config) => {
            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={config.focused ? "#ffff" : "#ff6d00"}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Forum"
        component={ForumScreen}
        initialParams={{ access_token, id }}
        options={{
          drawerLabel: "Forum",
          drawerIcon: (config) => {
            return (
              <MaterialCommunityIcons
                name="forum-outline"
                size={24}
                color={config.focused ? "#ffff" : "#ff6d00"}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
