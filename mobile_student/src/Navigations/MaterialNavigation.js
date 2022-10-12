import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialScreen } from "../Screens/MaterialScreen";

export const MaterialNavigation = ({ route }) => {
  const { access_token, id } = route.params;

  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          color: "#ff6d00",
          paddingHorizontal: 7,
          paddingVertical: 5,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Week 1"
        initialParams={{ week: 1, access_token, id }}
        component={MaterialScreen}
      />
      <Tab.Screen
        name="Week 2"
        initialParams={{ week: 2, access_token, id }}
        component={MaterialScreen}
      />
      <Tab.Screen
        name="Week 3"
        initialParams={{ week: 3, access_token, id }}
        component={MaterialScreen}
      />
      <Tab.Screen
        name="Week 4"
        initialParams={{ week: 4, access_token, id }}
        component={MaterialScreen}
      />
    </Tab.Navigator>
  );
};
