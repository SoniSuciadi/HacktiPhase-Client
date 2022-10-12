import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { LoginScreen } from "../Screens/LoginScreen";
import DrawerNavigation from "./DrawerNavigation";

export const StackNavigation = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DrawerHome" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};
