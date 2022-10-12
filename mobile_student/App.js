import { StatusBar } from "expo-status-bar";
import { Fragment, useEffect, useRef, Button } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./src/configs/apollo";
import * as Notifications from "expo-notifications";
import { StackNavigation } from "./src/Navigations/StackNavigation";

export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <Fragment>
      <StatusBar style="dark" />
      <ApolloProvider client={client}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </ApolloProvider>
    </Fragment>
  );
}
