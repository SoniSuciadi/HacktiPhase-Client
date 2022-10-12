import {
  Text,
  View,
} from "react-native";
export const ScoreCard = ({ score }) => {
  return (
    <View
      style={{
        marginTop: 10,
        padding: 10,
        shadowOffset: { width: -2, height: 4 },
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#ff6d00",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ fontSize: 18, color: "#ff6d00", fontWeight: "700" }}>
            {score?.Assignment?.title}
          </Text>
          <Text style={{}}>
            Phase: {score?.Assignment?.PhaseId - 1} week:{" "}
            {score?.Assignment?.week} day: {score?.Assignment?.day}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>Score</Text>
          <Text>{score?.score}</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Persentase :{score?.Assignment?.scorePercentage}%</Text>
        <View style={{ borderTopWidth: 1 }}>
          <Text
            style={{
              width: 45,
              textAlign: "center",
              color: "#ff6d00",
              fontWeight: "700",
            }}
          >
            {(score?.score * score?.Assignment?.scorePercentage) / 100}
          </Text>
        </View>
      </View>
    </View>
  );
};
