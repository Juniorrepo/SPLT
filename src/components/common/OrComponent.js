import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";

export default function OrComponent() {
  return (
    <View style={styles.orContainer}>
      <LinearGradient
        colors={COLORS.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.line}
      />
      <Text style={[theme.textStyles.small, styles.or]}>Or</Text>
      <LinearGradient
        colors={COLORS.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.line}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderColor,
  },
  or: {
    marginHorizontal: 10,
    color: theme.colors.text,
  },
});
