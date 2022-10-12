import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { ActivityIndicator, View } from "react-native";
export const LoadingComponent = () => {
  const { height, width } = useWindowDimensions();

  return (
    <View
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: "white",
        opacity: 0.7,
      }}
    >
      <ActivityIndicator
        size="large"
        color="#ff6d00"
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};
