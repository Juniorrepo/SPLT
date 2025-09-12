import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/Colors";

const ActivityLevelsHeader = ({ streakDays = 0, activityPercent = 0 }) => {
    const SUB = COLORS.subText || "rgba(255,255,255,0.62)";

    return (
        <View style={[styles.card]}>
            <View style={styles.col}>
                <View style={styles.row}>
                    <Text style={styles.big}>{streakDays}</Text>
                    <Ionicons style={{ marginLeft: 6 }} name="flame" size={40} color={COLORS.text} />
                </View>
                <Text style={[styles.sub, { color: SUB }]}>DAY STREAK</Text>
            </View>


            <View style={styles.col}>
                <Text style={styles.big}>{activityPercent}%</Text>
                <Text style={[styles.sub, { marginTop: 6, color: SUB }]}>More active</Text>
            </View>
        </View>
    );
};

export default ActivityLevelsHeader;

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        paddingVertical: 18,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    col: { alignItems: "center", flex: 1 },
    big: { color: COLORS.maincolor, fontWeight: "900", fontSize: 38 },
    sub: { fontSize:20, fontWeight: "700", marginTop: 2 },
    divider: {
        width: 1,
        height: 46,
        backgroundColor: "rgba(255,255,255,0.09)",
        marginHorizontal: 16,
    },
    row: { flexDirection: "row", alignItems: "center" },
});
