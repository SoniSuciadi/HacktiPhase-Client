import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
export const CameraPreview = ({ photo, onRetake, onUpload }) => {

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground source={{ uri: photo }} style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onRetake();
            }}
          >
            <Text style={styles.text}>Re Take</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onUpload();
            }}
          >
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 30,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    borderWidth: 3,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    borderColor: "white",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: "20",
  },
});
