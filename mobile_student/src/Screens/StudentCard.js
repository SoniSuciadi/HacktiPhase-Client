import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { ScoreCard } from "../Components/ScoreCard";
import Constants from "expo-constants";

// You can import from local files
import DropDownPicker from "react-native-dropdown-picker";
export const StudentCard = ({
  phaseInformation,
  studentInfromation,
  userScore,
  onCloseStudentCard,
}) => {
  const { height, width } = useWindowDimensions();
  const averageScore = () => {
    let nilai = 0;
    userScore.forEach((element) => {
      nilai += (element?.score * element?.Assignment?.scorePercentage) / 100;
    });
    return nilai / 3;
  };
  const predicate = () => {
    let result = "Participan";
    if (averageScore > 95) {
      result = "Teacher's Award";
    }
    if (averageScore > 90) {
      result = "Honor";
    }
    if (averageScore > 80) {
      result = "Graduate";
    }
    return result;
  };

  return (
    <SafeAreaView>
      <View
        style={{
          position: "absolute",
          top: 65,
          start: width - 30,
          zIndex: 100,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => onCloseStudentCard()}>
          <AntDesign name="closecircleo" size={24} color="#ff6d00" />
        </TouchableOpacity>
      </View>
      <ImageBackground
        style={{
          width: "100%",
          resizeMode: "cover",
        }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/pairproject-e84e8.appspot.com/o/%E2%80%94Pngtree%E2%80%94abstract%20flyer%20border%20header%20orange_8482692.png?alt=media&token=cb21a99d-ffed-40a6-8b11-a42aa4b54851",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 30 }}>
            Student Hacktiv 8
          </Text>
          <View
            style={{
              paddingVertical: 5,
              backgroundColor: "#ff6d00",

              borderRadius: 30,
              width: 80,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Phase {phaseInformation?.Phase?.phase}
            </Text>
          </View>
          <Image
            style={{
              padding: 10,
              height: 120,
              marginTop: 5,
              width: 120,
              resizeMode: "cover",
            }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/pairproject-e84e8.appspot.com/o/avatardefault.png?alt=media&token=844fc57c-a56b-460b-a88a-1ffb103f5104",
            }}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 5 }}>
              {studentInfromation.fullName}
            </Text>
            <Text style={{ fontWeight: "400", marginTop: 5 }}>
              {phaseInformation.Batch.batchName}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#ff6d00",
                marginTop: 5,
              }}
            >
              Predicate
            </Text>
            <View
              style={{
                paddingVertical: 5,
                backgroundColor: "#ff6d00",

                borderRadius: 30,
                width: 180,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 16,
                }}
              >
                {predicate()}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          padding: 10,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18 }}>Total Score</Text>
        <Text style={{ fontSize: 18 }}>{averageScore().toFixed(2)}</Text>
      </View>

      <View
        style={{
          width: "95%",
          alignSelf: "center",
        }}
      >
        <ScrollView style={{ height: 420 }}>
          {userScore.map((el, i) => (
            <ScoreCard key={i} score={el} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
