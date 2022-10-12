import { View, Text } from "react-native";
export const CommentForum = ({ comment }) => {
  return (
    <View style={{ padding: 5 }}>
      <Text style={{ marginLeft: 10, color: "#ff6d00", fontWeight: "700" }}>
        {comment?.User?.fullName}
      </Text>

      <View
        style={{ backgroundColor: "#ff6d00", padding: 10, borderRadius: 20 }}
      >
        <Text style={{ color: "white" }}>{comment?.comment}</Text>
        <Text
          style={{
            color: "white",
            alignSelf: "flex-end",
          }}
        >
          {new Date(comment?.createdAt).toLocaleDateString("id")}{" "}
          <Text>
            {new Date(comment?.createdAt).toLocaleTimeString("id").slice(0, 5)}
          </Text>
        </Text>
      </View>
    </View>
  );
};
