import { Text, View, SafeAreaView } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import PDFReader from "rn-pdf-reader-js";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TaksTodo } from "../Components/TaskTodo";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_STUDENT_JOURNEY } from "../configs/querys";
export const AssignmentScreen = ({
  onCloseAssignment,
  onShowMateri,
  assignment,
  route,
}) => {
  const { access_token, id } = route.params;
  const [journey, setJourney] = useState([]);

  const {
    data: dataJourney,
    loading: loadingJourney,
    refetch,
  } = useQuery(GET_STUDENT_JOURNEY, {
    variables: { userId: id, assignmentId: assignment.id },
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });
  useEffect(() => {
    if (!loadingJourney && dataJourney) {
      setJourney(dataJourney.getSingleJourney);
    }
  }, [dataJourney]);

  const { height, width } = useWindowDimensions();
  return (
    <SafeAreaView style={{}}>
      <View
        style={{
          position: "absolute",
          top: 65,
          start: "92%",
          zIndex: 100,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => onCloseAssignment()}>
          <AntDesign name="closecircleo" size={24} color="#ff6d00" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          top: "38%",
          start: "40%",
          zIndex: 100,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => onShowMateri(assignment.link)}>
          <MaterialCommunityIcons
            name="fullscreen"
            size={24}
            color="#ff6d00"
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: width, flexDirection: "row" }}>
        <View
          style={{
            height: 270,
            borderWidth: 1,
            width: "46%",
            margin: 10,
          }}
        >
          <PDFReader
            source={{
              uri: assignment.link,
            }}
          />
        </View>
        <View style={{ flexDirection: "column", width: "42%" }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {assignment.title}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 10,
              fontWeight: "200",
            }}
          >
            {assignment.description}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 18, padding: 10, fontWeight: "bold" }}>
        Todo
      </Text>
      <ScrollView style={{ padding: 10 }}>
        {journey.map((el, i) => (
          <TaksTodo journey={el} route={route} refetch={refetch} key={i} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
