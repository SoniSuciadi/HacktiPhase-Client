import { View, SafeAreaView, Text } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { CommentForum } from "./CommentForum";
import { useState } from "react";
export const ForumDetail = ({ onCloseDetail, thread, onSubmitComment }) => {
  const { width, height } = useWindowDimensions();
  const [comment, setComment] = useState(null);

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
        <TouchableOpacity
          onPress={() => {
            onCloseDetail();
            setComment(null);
          }}
        >
          <AntDesign name="closecircleo" size={24} color="#ff6d00" />
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
          {thread.title}
        </Text>
        <Text style={{ fontSize: 12, textAlign: "center" }}>
          By {thread?.User?.fullName}
        </Text>
      </View>
      <ScrollView style={{ maxHeight: height - height / 2, padding: 10 }}>
        <Text style={{ textAlign: "justify", marginTop: 10 }}>
          {thread.content}
        </Text>
      </ScrollView>
      <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 5 }}>
        Coment
      </Text>
      <ScrollView style={{ height: height - height / 2 - 220 }}>
        {thread?.Comments?.map((el, i) => (
          <CommentForum comment={el} key={i} />
        )) || ""}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="Comment"
          style={{
            borderWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 10,
            width: "80%",
            borderRadius: 10,
            margin: 10,
            borderColor: "#ff6d00",
          }}
          onChangeText={(e) => {
            setComment(e);
          }}
          value={comment}
        />
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            disabled={comment != null && !comment ? true : false}
            onPress={() => {
              onSubmitComment(comment, thread.id);
              setComment(null);
            }}
          >
            <Text style={{ color: "#ff6d00", fontWeight: "800" }}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
