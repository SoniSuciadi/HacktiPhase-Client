import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Modal,
} from "react-native";
import { Fragment, useEffect, useState } from "react";
import { DetailMateri } from "./DetailMateri";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_BATCH_PHASE, GET_USER } from "../configs/querys";
import { LoadingComponent } from "../Components/LoadingComponent";
import { AssignmentReport } from "../Components/AssignmentReport";
import { StudentCard } from "./StudentCard";

export const HomeScreen = ({ route }) => {
  const { access_token, id } = route.params;
  const [showStudentCard, setSowStudentCard] = useState(false);
  const { data, loading } = useQuery(GET_USER, {
    variables: { userId: id },
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });
  const handleCloseStudentCard = () => {
    setSowStudentCard(false);
  };
  if (loading) {
    return <LoadingComponent />;
  }
  const getScoreThisPhase = () => {
    let assignmentThisPhase = data?.getUserScore?.AssignmentDetails.filter(
      (el) =>
        el?.Assignment?.PhaseId - 1 == data?.getPhaseBatchByUserId?.Phase?.phase
    );
    let total = 0;
    assignmentThisPhase.forEach((element) => {
      total += (element.score * element?.Assignment?.scorePercentage) / 100;
    });
    return total;
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingComponent />
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
          <ImageBackground
            style={{ width: "100%", height: 320 }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/pairproject-e84e8.appspot.com/o/%E2%80%94Pngtree%E2%80%94orange%20blue%20geometric%20wallpaper%20background_1326595.png?alt=media&token=603519f8-1a8d-48b5-8058-4e3d2fed5ab6",
            }}
          >
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: "white",
                margin: 10,
                borderRadius: 30,
                width: 80,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#ff6d00",
                }}
              >
                Phase {data?.getPhaseBatchByUserId?.Phase?.phase}
              </Text>
            </View>
            <View
              style={{
                marginTop: -70,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 120,
                  height: 120,
                  marginTop: -50,
                }}
                resizeMode="contain"
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/pairproject-e84e8.appspot.com/o/avatardefault.png?alt=media&token=844fc57c-a56b-460b-a88a-1ffb103f5104",
                }}
              />
              <Text
                style={{
                  color: "#ff6d00",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                Hy, {data?.getUser?.fullName}
              </Text>
            </View>
          </ImageBackground>
          <View
            style={{
              alignItems: "center",
              marginTop: -100,
              shadowOffset: { width: -2, height: 4 },
              shadowColor: "#171717",
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                alignItems: "center",
                padding: 10,
                width: "90%",
                height: 150,
                backgroundColor: "white",
                borderRadius: 30,
                shadowColor: "black",
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                Batch {data.getPhaseBatchByUserId.Batch.batchName}
              </Text>

              <View
                style={{
                  paddingHorizontal: 7,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: "orange",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  {new Date(
                    data.getPhaseBatchByUserId.startedAt
                  ).toLocaleDateString("id")}{" "}
                  -{" "}
                  {new Date(
                    data.getPhaseBatchByUserId.endAt
                  ).toLocaleDateString("id")}
                </Text>
              </View>
              <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 15 }}>
                Score Phase Ini
              </Text>
              <View
                style={{
                  alignSelf: "center",
                  backgroundColor: "gold",
                  padding: 10,
                  width: "60%",
                  borderRadius: 20,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                  }}
                >
                  {getScoreThisPhase()} / 100
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              margin: 20,
              height: 430,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSowStudentCard(true);
              }}
              style={{
                width: "100%",

                padding: 5,
                shadowOffset: { width: -2, height: 4 },
                shadowColor: "#171717",
                backgroundColor: "white",
                borderRadius: 20,
                shadowOpacity: 0.2,
                shadowRadius: 3,
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: "center",
                }}
                resizeMode="contain"
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/pairproject-e84e8.appspot.com/o/%E2%80%94Pngtree%E2%80%94report%20vector_8368027.png?alt=media&token=56e0d481-203b-4b56-befa-9ab51d1354b8",
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  width: "65%",
                  fontWeight: "bold",

                  alignSelf: "center",
                }}
              >
                Student Card
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "800" }}>
              Report Assignment
            </Text>
            <ScrollView style={{ paddingHorizontal: 10 }}>
              {data?.getUserScore?.AssignmentDetails?.map((el, i) => (
                <AssignmentReport key={i} score={el} />
              ))}
            </ScrollView>
          </View>
          <Modal visible={showStudentCard} animationType={"slide"}>
            <StudentCard
              phaseInformation={data.getPhaseBatchByUserId}
              studentInfromation={data.getUser}
              userScore={data?.getUserScore?.AssignmentDetails}
              onCloseStudentCard={handleCloseStudentCard}
            />
          </Modal>
        </SafeAreaView>
      )}
    </Fragment>
  );
};
