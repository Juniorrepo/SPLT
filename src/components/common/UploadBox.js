import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/Colors";

export default function UploadBox({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.box}>
        <Ionicons name="image-outline" size={50} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 150,
    width: "50%",
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.primary,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "center",

  }
});
