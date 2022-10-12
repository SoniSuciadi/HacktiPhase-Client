import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export const ThreadList = ({ onShowDetail, thread }) => {
  const convertDate = (tgl) => {
    var date = new Date(tgl);
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();

    switch (bulan) {
      case 0:
        bulan = "Jan";
        break;
      case 1:
        bulan = "Feb";
        break;
      case 2:
        bulan = "Mar";
        break;
      case 3:
        bulan = "Apr";
        break;
      case 4:
        bulan = "Mei";
        break;
      case 5:
        bulan = "Jun";
        break;
      case 6:
        bulan = "Jul";
        break;
      case 7:
        bulan = "Agt";
        break;
      case 8:
        bulan = "Sep";
        break;
      case 9:
        bulan = "Oct";
        break;
      case 10:
        bulan = "Nov";
        break;
      case 11:
        bulan = "Dec";
        break;
    }
    return `${tanggal}-${bulan}-${tahun}`;
  };
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 10,
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
          {thread?.title}
        </Text>
        <Text>{convertDate(thread?.createdAt)}</Text>
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
