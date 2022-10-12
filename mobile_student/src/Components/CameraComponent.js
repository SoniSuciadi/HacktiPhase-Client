import { Fragment } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { CameraPreview } from "./CameraPreview";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { LoadingComponent } from "./LoadingComponent";

export const CameraComponent = ({ startCamera, setStartCamera, onSend }) => {
  const [type, setType] = useState(CameraType.back);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  let camera;
  const upload = async () => {
    if (!capturedImage) return;
    const fileName = new Date().getTime();
    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");
    headers.append(
      "Authorization",
      "Basic cHJpdmF0ZV8rbU9tejA5eHg0c0FyWXJudjExK0c0V0pZYTg9Og=="
    );
    const formData = new FormData();
    formData.append("file", capturedImage);
    formData.append("fileName", fileName);
    console.log(headers);
    try {
      setLoading(true);
      let { data } = await axios({
        method: "POST",
        url: "https://upload.imagekit.io/api/v1/files/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Basic cHJpdmF0ZV8rbU9tejA5eHg0c0FyWXJudjExK0c0V0pZYTg9Og==",
        },
      });
      onSend([{ image: data.url }]);
      setLoading(false);
    } catch (error) {
      console.log(error, "---------");
    }
  };
  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status == "granted") {
      setStartCamera(true);
    } else {
      requestPermission;
    }
  };
  const takePicture = async () => {
    if (!camera) return;
    try {
      const photo = await camera.takePictureAsync({ base64: true });
      const source = photo.base64;
      let base64Img = `data:image/jpg;base64,${source}`;
      console.log(base64Img);
      setPreviewVisible(true);
      setCapturedImage(base64Img);
    } catch (error) {
      console.log(error);
    }
  };
  const retakePhoto = () => {
    setStartCamera(true);
    setPreviewVisible(false);
    setCapturedImage(null);
  };
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  if (loading) {
    return <LoadingComponent marginTop={-100} />;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <Fragment>
      {previewVisible ? (
        <CameraPreview
          onUpload={upload}
          photo={capturedImage}
          onRetake={retakePhoto}
        />
      ) : startCamera ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={(r) => {
            camera = r;
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setStartCamera(false);
              }}
            >
              <AntDesign name="closecircleo" size={45} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Entypo name="circle" size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <MaterialCommunityIcons
                name="camera-flip-outline"
                size={55}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        ""
      )}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
