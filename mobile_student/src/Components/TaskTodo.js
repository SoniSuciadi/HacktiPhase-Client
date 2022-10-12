import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CHANGE_STATUS_JOURNEY } from "../configs/mutation";

export const TaksTodo = ({ journey, route, refetch }) => {
  const { access_token, id } = route.params;
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    if (journey.StudentJourneys.length) {
      if (journey.StudentJourneys[0].status == "complete") {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  }, [data]);
  const [changeStatus, { data }] = useMutation(CHANGE_STATUS_JOURNEY, {
    variables: { journeyId: journey.id },
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });
  const { height, width } = useWindowDimensions();

  return (
    <View style={{ borderTopWidth: 1, paddingTop: 5, marginBottom: 5 }}>
      <Text style={{ marginVertical: 5, fontWeight: "800" }}>
        {journey.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <Checkbox
          value={isChecked}
          onValueChange={() => {
            changeStatus();
            refetch();
            setChecked(!isChecked);
          }}
        />
        <Text
          style={{
            marginLeft: 5,
            width: width - 50,
          }}
        >
          {journey.description}
        </Text>
      </View>
    </View>
  );
};
