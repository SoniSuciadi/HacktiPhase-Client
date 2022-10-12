import { View, SafeAreaView } from "react-native";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import PDFReader from "rn-pdf-reader-js";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
export const DetailMateri = ({ onCloseMateri, materiUrl }) => {
  const { height, width } = useWindowDimensions();
  return (
    <SafeAreaView style={{ height: height, width: width }}>
      <View
        style={{
          position: "absolute",
          top: 65,
          start: width - 30,
          zIndex: 100,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => onCloseMateri()}>
          <AntDesign name="closecircleo" size={24} color="#ff6d00" />
        </TouchableOpacity>
      </View>
      <PDFReader
        style={{ height: height, width: width, padding: 10 }}
        source={{
          uri: materiUrl,
        }}
      />
    </SafeAreaView>
  );
};
