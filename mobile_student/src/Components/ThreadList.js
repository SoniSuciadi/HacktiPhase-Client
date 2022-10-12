import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export const ThreadList = ({ onShowDetail, thread }) => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 15,
        borderRadius: 10,
        backgroundColor: "white",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#ff6d00",
            width: "60%",
          }}
        >
          {thread.title}
        </Text>
        <Text>({new Date(thread.createdAt).toLocaleDateString()})</Text>
      </View>
      <Text style={{ marginTop: 10, textAlign: "justify" }}>
        {thread.content.slice(0, 200)}
      </Text>
      <TouchableOpacity
        onPress={() => {
          onShowDetail(thread.id);
        }}
        style={{
          flexDirection: "row",
          marginTop: 5,
          justifyContent: "flex-end",
        }}
      >
        <FontAwesome
          name="comments"
          size={30}
          color="#ff6d00"
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: "#ff6d00",
            alignSelf: "center",
            fontSize: 18,
          }}
        >
          {thread.Comments.length}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
