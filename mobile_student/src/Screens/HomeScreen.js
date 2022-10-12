import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Modal,
} from "react-native";
import React from "react";
import { Fragment, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../configs/querys";
import { LoadingComponent } from "../Components/LoadingComponent";
import { AssignmentReport } from "../Components/AssignmentReport";
import { StudentCard } from "./StudentCard";
import { useFocusEffect } from "@react-navigation/native";

export const HomeScreen = ({ route }) => {
  const { access_token, id } = route.params;

  const [showStudentCard, setSowStudentCard] = useState(false);
  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: { userId: id },
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });
  // useFocusEffect(() => {
  //   refetch();
  // });
  const handleCloseStudentCard = () => {
    setSowStudentCard(false);
  };
  if (loading) {
    return <LoadingComponent />;
  }
  const getScoreThisPhase = () => {
    let assignmentThisPhase = data?.getUserScore?.AssignmentDetails?.filter(
      (el) =>
        el?.Assignment?.PhaseId - 1 == data?.getPhaseBatchByUserId?.Phase?.phase
    );
    let total = 0;
    assignmentThisPhase?.forEach((element) => {
      total += (element.score * element?.Assignment?.scorePercentage) / 100;
    });
    return total;
  };

  const convertDate = (tgl) => {
    var date = new Date(tgl);
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();

    switch (bulan) {
      case 0:
        bulan = "Jan";
        break;
      case 1:
        bulan = "Feb";
        break;
      case 2:
        bulan = "Mar";
        break;
      case 3:
        bulan = "Apr";
        break;
      case 4:
        bulan = "Mei";
        break;
      case 5:
        bulan = "Jun";
        break;
      case 6:
        bulan = "Jul";
        break;
      case 7:
        bulan = "Agt";
        break;
      case 8:
        bulan = "Sep";
        break;
      case 9:
        bulan = "Oct";
        break;
      case 10:
        bulan = "Nov";
        break;
      case 11:
        bulan = "Dec";
        break;
    }
    return `${tanggal}-${bulan}-${tahun}`;
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
                  uri: "https://ik.imagekit.io/nzf8xnvsr/avatar_OLsEcmK6V.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665594971173",
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
                Batch {data?.getPhaseBatchByUserId?.Batch?.batchName}
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
                  {convertDate(data?.getPhaseBatchByUserId?.startedAt)} -{" "}
                  {convertDate(data?.getPhaseBatchByUserId?.endAt)}
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
