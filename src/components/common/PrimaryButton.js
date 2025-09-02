import { StyleSheet, Text } from "react-native";
import COLORS from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import theme from "../../constants/theme";

export default function PrimaryButton({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && { opacity: 0.5 }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular
  },
});

