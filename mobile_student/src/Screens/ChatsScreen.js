import { useMutation, useQuery } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect, Fragment } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { CameraComponent } from "../Components/CameraComponent";
import { GET_CHATS } from "../configs/querys";
import { LoadingComponent } from "../Components/LoadingComponent";
import { POST_CHAT } from "../configs/mutation";
import { io } from "socket.io-client";
import { useFocusEffect } from "@react-navigation/native";

const socket = io(
  // "https://hacktiphase-chat.herokuapp.com"
  "http://localhost:3003/",
  {
    transports: ["websocket"],
  }
);
export const ChatsScreen = ({ route }) => {
  const { access_token, id, setPhase } = route.params;
  const [startCamera, setStartCamera] = useState(false);
  const [messages, setMessages] = useState([]);
  const { data, loading, refetch } = useQuery(GET_CHATS, {
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });
  const [handleSend, {}] = useMutation(POST_CHAT);
  const handleSendMessage = (chat) => {
    handleSend({
      variables: {
        newChat: {
          imgUrl: chat[0].image,
          message: chat[0].text,
        },
      },
      context: {
        headers: {
          access_token: access_token,
        },
      },
    });
    if (chat[0].image) {
      refetch();
      setStartCamera(false);
      socket.emit("chat message", {});
    }
  };
  useEffect(() => {
    if (data && !loading) {
      setMessages(data.getChats);
    }
  }, [data]);
  useFocusEffect(() => {
    try {
      refetch({});
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("chat message", (obj) => {
      refetch();
    });
  });
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => {
      console.log(messages);
      socket.emit("chat message", { messages });
      handleSendMessage(messages);
      return GiftedChat.append(previousMessages, messages);
    });
  }, []);

  if (loading) {
    return <LoadingComponent marginTop={-100} />;
  }
  setPhase(data?.getPhaseBatchByUserId?.Phase?.phase);

  return (
    <Fragment>
      {loading ? (
        <LoadingComponent />
      ) : (
        <SafeAreaView style={{ backgroundColor: "#c7c7c7", flex: 1 }}>
          {startCamera ? (
            <CameraComponent
              onSend={handleSendMessage}
              startCamera={startCamera}
              setStartCamera={setStartCamera}
            />
          ) : (
            <GiftedChat
              renderSend={(props) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setStartCamera(true);
                    }}
                  >
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 10,
                        borderRadius: 50,
                      }}
                    >
                      <Feather name="camera" size={24} color="#ff6d00" />
                    </View>
                  </TouchableOpacity>
                  <Send {...props}>
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 10,
                        borderRadius: 50,
                      }}
                    >
                      <Feather name="send" size={24} color="#ff6d00" />
                    </View>
                  </Send>
                </View>
              )}
              messagesContainerStyle={{ backgroundColor: "#fafafa" }}
              wrapInSafeArea={false}
              messages={messages}
              renderUsernameOnMessage={true}
              renderAvatar={null}
              onSend={(messages) => onSend(messages)}
              user={{
                _id: id,
              }}
            />
          )}
        </SafeAreaView>
      )}
    </Fragment>
  );
};
