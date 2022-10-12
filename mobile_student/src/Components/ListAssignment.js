import { View, Text, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import countdown from "countdown";

export const ListAssignment = ({
  onShowAssignment,
  assignment,
  startBatch,
}) => {
  const getCoundown = () => {
    startBatch = new Date(startBatch).getTime();
    let dHari = Math.floor(assignment.deadline / 1440);
    let dJam = Math.floor((assignment.deadline - dHari * 1440) / 60);
    let dMenit = assignment.deadline - (dHari * 1440 + dJam * 60);
    let start = (assignment.week - 1) * 7 + assignment.day;
    start = start * 24 * 60 * 60 * 1000;
    const dateStart = new Date(startBatch + start).getTime();
    let endDate =
      dateStart +
      (dHari - 1) * 24 * 60 * 60 * 1000 +
      dJam * 60 * 60 * 1000 +
      dMenit * 60 * 1000;
    const deadline = countdown(
      new Date(),
      new Date(endDate),
      countdown.DAYS | countdown.HOURS | countdown.MINUTES
    );
    if (deadline.value < 0) {
      return "Submit Close";
    } else {
      // setEnd(`${days} Hari ${hours} Jam ${minutes} Menit`);
      return `Deadline ${deadline.days} Hari ${deadline.hours} Jam ${deadline.minutes} Menit`;
    }
  };
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
        <Foundation
          name="clipboard-pencil"
          size={24}
          color="#ff6d00"
          style={{
            borderWidth: 1,
            paddingHorizontal: 9,
            paddingVertical: 6,
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
          <Text style={{ fontSize: 17 }}>{assignment.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey", fontSize: 10 }}>
              Day - {assignment.day}
            </Text>
            <Text style={{ color: "grey", fontSize: 10, marginLeft: 10 }}>
              {getCoundown()}
            </Text>
          </View>
        </View>
      </View>
      {assignment.link ? (
        <TouchableOpacity onPress={() => onShowAssignment(assignment)}>
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <MaterialCommunityIcons
              name="format-list-checkbox"
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
