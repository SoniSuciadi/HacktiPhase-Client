import { View, Text, Modal } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { ListMaterial } from "../Components/ListMaterial";
import { ListAssignment } from "../Components/ListAssignment";
import { DetailMateri } from "./DetailMateri";
import { useEffect, useState } from "react";
import { AssignmentScreen } from "./AssignmentScreen";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MATERIAL_BY_WEEK, GET_STUDENT_JOURNEY } from "../configs/querys";
import { LoadingComponent } from "../Components/LoadingComponent";

export const MaterialScreen = ({ route }) => {
  const { access_token, id } = route.params;

  const [showMateri, setShowMateri] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [materi, setMateri] = useState("");
  const [assignment, setAssignment] = useState({});

  const { data, loading } = useQuery(GET_MATERIAL_BY_WEEK, {
    variables: { week: route.params.week },
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });

  if (loading) {
    return <LoadingComponent />;
  }
  console.log(data);

  const handlerCloseMateri = () => {
    setShowMateri(false);
  };

  const handlerCloseAssignment = () => {
    setShowAssignment(false);
  };
  const handlerShowMateri = (url) => {
    setShowMateri(true);
    setMateri(url);
  };

  const handlerShowAssignmentDoc = (assignmentt) => {
    setShowMateri(true);
    setMateri(assignmentt);
  };
  const handlerShowAssignment = (assignment) => {
    setShowAssignment(true);
    setAssignment(assignment);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <ScrollView>
        <View
          style={{ borderWidth: 0, backgroundColor: "#eeeeee", padding: 10 }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700" }}>Lecture</Text>
        </View>
        {data?.getMaterial?.map((el, i) => (
          <ListMaterial
            onShowMateri={handlerShowMateri}
            materi={el}
            key={i}
            startBatch={data.getPhaseBatchByUserId.startedAt}
          />
        ))}

        <View
          style={{ borderWidth: 0, backgroundColor: "#eeeeee", padding: 10 }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700" }}>Assignment</Text>
        </View>
        {data?.getSchedule?.Assignments?.map((el, i) => (
          <ListAssignment
            onShowAssignment={handlerShowAssignment}
            assignment={el}
            startBatch={data.getPhaseBatchByUserId.startedAt}
            key={i}
          />
        ))}
      </ScrollView>
      <Modal visible={showAssignment} animationType={"slide"}>
        <AssignmentScreen
          onCloseAssignment={handlerCloseAssignment}
          onShowMateri={handlerShowAssignmentDoc}
          assignment={assignment}
          route={route}
        />
        <Modal visible={showMateri} animationType={"slide"}>
          <DetailMateri onCloseMateri={handlerCloseMateri} materiUrl={materi} />
        </Modal>
      </Modal>
      <Modal visible={showMateri} animationType={"slide"}>
        <DetailMateri onCloseMateri={handlerCloseMateri} materiUrl={materi} />
      </Modal>
    </View>
  );
};
