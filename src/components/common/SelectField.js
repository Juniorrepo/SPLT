import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../constants/theme";
import COLORS from "../../constants/Colors";

export default function SelectField({ placeholder, value, onChange }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log("Open picker here")}
    >
      <Text
        style={[
          styles.text,
          { color: value ? COLORS.text : COLORS.placeholdertColor },
        ]}
      >
        {value || placeholder}
      </Text>
      <Ionicons
        name="chevron-down-outline"
        size={18}
        color={COLORS.placeholdertColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBackground,
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
});
