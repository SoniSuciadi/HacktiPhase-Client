import { View, Text, Image } from "react-native";
export const AssignmentReport = ({ score }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 15,
        marginTop: 5,
        marginBottom: 5,
        paddingVertical: 10,
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        backgroundColor: "white",
        borderRadius: 20,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Image
        style={{ width: 80, height: 80 }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/pairproject-e84e8.appspot.com/o/%E2%80%94Pngtree%E2%80%94validation%20check_8508185.png?alt=media&token=62470d43-dcc6-48f5-ac2d-aa884f9fcaef",
        }}
      />
      <View style={{ alignSelf: "center", width: "50%" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",

            alignSelf: "center",
          }}
        >
          {score?.Assignment?.title}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#ff6d00",
            fontWeight: "bold",

            alignSelf: "center",
          }}
        >
          Phase: {score?.Assignment?.PhaseId - 1} Week:{" "}
          {score?.Assignment?.week} Day: {score?.Assignment?.day}
        </Text>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",

            alignSelf: "center",
          }}
        >
          Score
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "#ff6d00",
            fontWeight: "bold",

            alignSelf: "center",
          }}
        >
          {score?.score}
        </Text>
      </View>
    </View>
  );
};
