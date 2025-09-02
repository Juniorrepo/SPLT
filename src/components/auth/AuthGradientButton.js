import { Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/Colors";

export default function AuthGradientButton({ title, iconName, onPress }) {
  return (
    <LinearGradient
      colors={COLORS.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={COLORS.text}
        style={styles.iconSpacing}
      />
      <Text style={styles.loginText} onPress={onPress}>
        {title}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  iconSpacing: {
    marginRight: 8,
  },
  loginText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
