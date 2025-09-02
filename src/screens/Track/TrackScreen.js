
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";

export default function TrackScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Track Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "bold",
  },
});
