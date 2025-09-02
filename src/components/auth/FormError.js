import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";

export default function FormError({ message }) {
  if (!message) return null;
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={16} color={COLORS.error} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 5,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: COLORS.error,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    flex: 1,
  },
});
