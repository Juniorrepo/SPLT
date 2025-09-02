import { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import COLORS from "../../../constants/Colors";

export default function DurationPicker({ h = 1, m = 0, s = 0, onChange = () => { } }) {
  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);
  const [seconds, setSeconds] = useState(s);

  const display = useMemo(() => {
    const hh = `${hours}h`;
    const mm = `${minutes}m`;
    const ss = `${seconds}s`;
    return `${hh}:${ss}`;
  }, [hours, minutes, seconds]);

  const inc = () => {
    const newHours = hours + 1;
    setHours(newHours);
    onChange({ h: newHours, m: minutes, s: seconds });
  };

  const dec = () => {
    const newHours = Math.max(0, hours - 1);
    setHours(newHours);
    onChange({ h: newHours, m: minutes, s: seconds });
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{display}</Text>
      </View>
      <View style={styles.arrows}>
        <TouchableOpacity onPress={inc} style={styles.arrowBtn}>
          <Entypo name="triangle-up" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={dec} style={styles.arrowBtn}>
          <Entypo name="triangle-down" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueBox: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.text,
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  arrows: {
    marginLeft: 6,
  },
  arrowBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
