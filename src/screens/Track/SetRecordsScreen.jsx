import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import ProgressRow from "../../components/Track/records/ProgressRow";
import Radar from "../../components/Track/records/Radar";
import TopBar from "../../components/common/TopBar";
import SectionTitle from "../../components/Track/SectionTitle";
import COLORS from "../../constants/Colors";

export default function SetsRecordsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TopBar variant="personal" onMenuPress={() => {}} onSearch={() => {}} onNotificationPress={() => {}} />

            <ScrollView contentContainerStyle={{ paddingBottom: 42 }}>
                <SectionTitle title="Sets Records" style={{ marginTop: 20 }} />
                <View style={styles.pad}>
                    <Radar />
                    <Text style={styles.caption}>
                        The above graph shows the distribution of volume you have done for each muscle group
                    </Text>
                </View>

                <SectionTitle title="Sets Breakdown" style={{ marginTop: 20 }} />

                {/* Legs */}
                <View style={styles.grouprow}>
                    <Text style={styles.groupTitle}>Legs</Text>
                    <Text style={styles.dim}>0 kg</Text>
                    <View style={styles.grouprowDivider} pointerEvents="none" />
                </View>
                <ProgressRow label="Deadlift" progress={0} markerText="0" avatar={require("../../assets/images/home/user1.png")} />
                <ProgressRow label="Deadlift" progress={0} markerText="0" avatar={require("../../assets/images/home/user2.png")} />

                {/* Back */}
                <View style={styles.grouprow}>
                    <Text style={styles.groupTitle}>Back</Text>
                    <Text style={styles.dim}>0 kg</Text>
                    <View style={styles.grouprowDivider} pointerEvents="none" />
                </View>
                <ProgressRow label="Deadlift" progress={0} markerText="0" avatar={require("../../assets/images/home/user1.png")} />
                <ProgressRow label="Deadlift" progress={0} markerText="0" avatar={require("../../assets/images/home/user2.png")} />

                {/* Arms */}
                <View style={styles.grouprow}>
                    <Text style={styles.groupTitle}>Arms</Text>
                    <Text style={styles.dim}>0 kg</Text>
                    <View style={styles.grouprowDivider} pointerEvents="none" />
                </View>
                <ProgressRow label="Deadlift" progress={0} markerText="0" avatar={require("../../assets/images/home/user1.png")} />
                <ProgressRow label="Deadlift" progress={0} markerText="0" avatar={require("../../assets/images/home/user2.png")} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0E0E12" },

    pad: { alignItems: "center", marginTop: 10 },
    caption: { color: "rgba(255,255,255,0.8)", fontSize: 15, paddingHorizontal: 16, marginTop: 10 },

    grouprow: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
        marginTop: 16,
    },

    grouprowDivider: {
        position: "absolute",
        bottom: 0,
        left: 16,
        right: 16,
        height: 2,
        backgroundColor: COLORS.maincolor,
        borderRadius: 2,
    },

    groupTitle: { color: "#fff", fontWeight: "800", fontSize: 15 },
    dim: { color: "rgba(255,255,255,0.7)" },
});

