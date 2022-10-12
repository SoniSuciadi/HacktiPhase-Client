import { View, Text, Modal, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ListMaterial = ({ onShowMateri, materi, startBatch }) => {
  const checkLecture = () => {
    let currentDate = new Date();
    let timeStartBatch = new Date(startBatch).getTime();
    let start = (materi.week - 1) * 7 + materi.day;
    let startLecture = timeStartBatch + (start - 1) * 24 * 60 * 60 * 1000;
    if (
      new Date(startLecture).getDate() == currentDate.getDate() &&
      new Date(startLecture).getMonth() == currentDate.getMonth()
    ) {
      return { color: "Red" };
    }
    return { color: "black" };
  };
  checkLecture();
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: "1",
        borderColor: "gray",
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 5,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Feather
          name="book-open"
          size={24}
          color="#ff6d00"
          style={{
            borderWidth: 1,
            padding: 6,
            borderColor: "#ff6d00",
            borderRadius: 20,
            marginHorizontal: 10,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 17, color: checkLecture() }}>
            {materi.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey", fontSize: 10 }}>
              Day - {materi.day}
            </Text>
            <Text style={{ color: "grey", fontSize: 10, marginLeft: 10 }}>
              Seesion - {materi.session}
            </Text>
          </View>
        </View>
      </View>
      {materi.references ? (
        <TouchableOpacity onPress={() => onShowMateri(materi.references)}>
          <View>
            <FontAwesome5
              style={{
                alignSelf: "center",
              }}
              name="folder-open"
              size={24}
              color="#ff6d00"
            />
          </View>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};
