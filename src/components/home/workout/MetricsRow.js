import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DurationPicker from "./DurationPicker";
import theme from "../../../constants/theme";

export default function MetricsRow({ duration, volume, sets, pr }) {
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={[theme.colors.primaryDark, '#5b4171ff', theme.colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >


        <View style={styles.row}>
          {/* Duration */}
          <View style={[styles.item, { minWidth: 60 }]}>
            <View style={styles.labelRow}>
              <MaterialCommunityIcons name="timer-outline" size={14} color={theme.colors.text} style={{ marginRight: 4 }} />
              <Text style={styles.label}>Duration</Text>
            </View>
            <DurationPicker {...duration} />
          </View>

          <Metric icon="barbell-outline" label="Volume" value={volume} />
          <Metric icon="flame-outline" label="Sets" value={sets} />
          <Metric icon="trophy-outline" label="PR" value={pr} />
        </View>
      </LinearGradient>
    </View>
  );
}

function Metric({ icon, label, value }) {
  return (
    <View style={styles.item}>
      <View style={styles.labelRow}>
        <Ionicons name={icon} size={13} color={theme.colors.text} style={{ marginRight: 6 }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,

  },
  container: {
    width: 356,
    height: 76,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primaryDark,
    overflow: "hidden",
    justifyContent: "center",
    position: "relative",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    zIndex: 1,
  },
  item: {
    flex: 1,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    ...theme.textStyles.title,
    marginBottom: 0,
    fontSize: 14,
  },
  value: {
    color: theme.colors.text,
    textAlign:"center",
    fontSize: 14,
    fontWeight: "800",
  },
});
