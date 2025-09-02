import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../constants/theme";

const SwitchButton = ({ label, active, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.switchItem}>
    <Text style={[styles.switchText, active && styles.activeText]}>
      {label}
    </Text>
    {active && <View style={styles.underline} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  switchItem: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  switchText: {
    color: "#888",
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  activeText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  underline: {
    height: 2,
    backgroundColor: theme.colors.text,
    width: "180%",
    marginTop: 4,
  },
});
export default SwitchButton;
