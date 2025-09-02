import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";

export default function PrivacyCheckbox({ isChecked, onToggle }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        {isChecked && <Feather name="check" size={14} color={COLORS.text} />}
      </TouchableOpacity>

      <Text style={[theme.textStyles.small, styles.text]}>
        By continuing you accept our{" "}
       Privacy Policy and{" "}
        Term of Use
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.text,
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: COLORS.text,
  },
});
