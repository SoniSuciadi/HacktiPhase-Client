import { View, SafeAreaView, TouchableOpacity, Modal } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { Ionicons } from "@expo/vector-icons";
import { ThreadList } from "../Components/ThreadList";
import { ScrollView } from "react-native-gesture-handler";
import { FormThreadAdd } from "../Components/FormThreadAdd";
import { useEffect, useState } from "react";
import { ForumDetail } from "../Components/ForumDetail";
import { useMutation, useQuery } from "@apollo/client";
import { GET_THREAD, GET_THRED_BY_ID } from "../configs/querys";
import { LoadingComponent } from "../Components/LoadingComponent";
import { ADD_COMMENT, ADD_THREAD } from "../configs/mutation";
export const ForumScreen = ({ route }) => {
  const { access_token } = route.params;
  const { width, height } = useWindowDimensions();
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [thread, setThread] = useState([]);
  const [selectedThred, setSelectedThred] = useState({});
  const [id, setId] = useState(null);
  const { data, loading, refetch } = useQuery(GET_THREAD, {
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });

  const [handleAdd, { error }] = useMutation(ADD_THREAD, {
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });
  const [handleComment, { error: errorr, data: d, loading: l }] = useMutation(
    ADD_COMMENT,
    {
      context: {
        headers: {
          access_token: access_token,
        },
      },
      refetchQueries: [
        {
          query: GET_THRED_BY_ID,
          variables: { threadId: id },
          context: {
            headers: {
              access_token: access_token,
            },
          },
        },
      ],
    }
  );
  const {
    data: dataById,
    loading: loadingById,
    refetch: refetchById,
  } = useQuery(GET_THRED_BY_ID, {
    variables: {
      threadId: id,
    },
    context: {
      headers: {
        access_token: access_token,
      },
    },
  });

  const handleSubmitComment = (inputComment, thredid) => {
    handleComment({
      variables: {
        input: {
          comment: inputComment,
          ThreadId: +thredid, //asdasdasd
        },
      },
    });
    refetchById();
  };
  const handleAddThread = (data) => {
    const { title, content } = data;
    handleAdd({
      variables: {
        input: {
          title,
          content,
        },
      },
    });
    refetch();
  };
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && !loading) {
      setThread(data.fetchThreads);
    }
  }, [data]);

  useEffect(() => {
    if (dataById && !loadingById) {
      setSelectedThred(dataById.fetchThreadById);
    }
  }, [dataById]);

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleShowDetail = (id) => {
    setId(id);
    refetchById();
    setShowDetail(true);
  };
  const handleCloseDetail = () => {
    setShowDetail(false);
  };
  if (loading || loadingById) {
    return <LoadingComponent />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {thread.map((el, i) => (
          <ThreadList onShowDetail={handleShowDetail} thread={el} key={i} />
        ))}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          handleShowForm();
        }}
        style={{
          flex: 1,
          position: "absolute",
          width: 50,
          height: 50,
          left: width - 80,
          top: height - 200,
          justifyContent: "center",
          backgroundColor: "#ff6d00",
          borderRadius: 30,
        }}
      >
        <Ionicons
          name="md-add-sharp"
          size={32}
          color="black"
          style={{
            alignSelf: "center",
            color: "white",
          }}
        />
      </TouchableOpacity>
      <Modal visible={showForm} animationType={"slide"}>
        <View>
          <FormThreadAdd
            onCloseForm={handleCloseForm}
            onSubmitThread={handleAddThread}
          />
        </View>
      </Modal>

      <Modal visible={showDetail} animationType={"slide"}>
        <View>
          <ForumDetail
            onCloseDetail={handleCloseDetail}
            thread={selectedThred}
            onSubmitComment={handleSubmitComment}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
