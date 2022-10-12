import { Fragment, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

export const FormThreadAdd = ({ onCloseForm, onSubmitThread }) => {
  const { width, height } = useWindowDimensions();
  const [thread, setThread] = useState({
    title: null,
    content: null,
  });
  const handleOnchange = (value, name) => {
    setThread({
      ...thread,
      [name]: value,
    });
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
        <TouchableOpacity
          onPress={() => {
            onCloseForm();
            setThread({
              title: null,
              content: null,
            });
          }}
        >
          <AntDesign name="closecircleo" size={24} color="#ff6d00" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
            color: "#ff6d00",
            marginTop: 20,
          }}
        >
          Form Add Thread
        </Text>
        <View
          style={{
            marginTop: 15,
            width: "70%",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#ff6d00" }}>
            Thread Title
          </Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Title"
            onChangeText={(e) => {
              handleOnchange(e, "title");
            }}
            value={thread.title}
            style={{
              borderWidth: 1,
              width: "100%",
              height: 40,
              borderRadius: 10,
              borderColor: "gray",
              paddingHorizontal: 10,
              fontSize: 20,
              alignSelf: "center",
            }}
          />
          {thread.title !== null && !thread.title ? (
            <Text style={{ color: "red" }}>Title must be require</Text>
          ) : (
            ""
          )}
        </View>
        <View
          style={{
            width: "70%",
            alignSelf: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#ff6d00" }}>
            Thread Content
          </Text>
          <TextInput
            value={thread.content}
            autoCapitalize="none"
            onChangeText={(e) => {
              handleOnchange(e, "content");
            }}
            placeholder="Content"
            numberOfLines={10}
            multiline={true}
            style={{
              borderWidth: 1,
              width: "100%",
              paddingVertical: 5,
              borderRadius: 10,
              borderColor: "gray",
              paddingHorizontal: 10,
              fontSize: 20,
              alignSelf: "center",
              maxHeight: height - 300,
            }}
          />
          {thread.content !== null && !thread.content ? (
            <Text style={{ color: "red" }}>Content must be require</Text>
          ) : (
            ""
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            onSubmitThread(thread);
            onCloseForm();
            setThread({
              title: null,
              content: null,
            });
          }}
          style={{
            backgroundColor: "#ff6d00",
            marginTop: 20,
            width: "70%",
            alignSelf: "center",
            borderRadius: 20,
            paddingVertical: 7,
          }}
          disabled={!thread.title || !thread.content ? true : false}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <MaterialIcons name="publish" size={30} color="white" />
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              Publish
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
