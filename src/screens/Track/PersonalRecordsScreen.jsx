// src/screens/Track/records/PersonalRecordsScreen.jsx
import React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import ProgressRow from "../../components/Track/records/ProgressRow";
import { Ionicons } from "@expo/vector-icons";
import TopBar from "../../components/common/TopBar";
import SectionTitle from "../../components/Track/SectionTitle";
import COLORS from "../../constants/Colors";
import RecordBreakdownItem from "../../components/Track/records/RecordItems";

export default function PersonalRecordsScreen({ navigation }) {

    const breakdown = [
        { title: "Leg Curl", prevMax: 20, newMax: 40, thumb: require("../../assets/images/home/user1.png") },
        { title: "Leg Curl", prevMax: 30, newMax: 42, thumb: require("../../assets/images/home/user2.png") },
        { title: "Leg Curl", prevMax: 25, newMax: 38, thumb: require("../../assets/images/home/user3.png") },
    ];

    return (
        <View style={styles.container}>
            <TopBar variant="personalrecord" onMenuPress={() => {}} onSearch={() => {}} onNotificationPress={() => {}} />

            <ScrollView contentContainerStyle={{ paddingBottom: 42 }}>

                <SectionTitle title="Personal Records" style={{ marginTop: 20, marginBottom: -40 }} />

                {/* Center orb logo */}
                <View style={styles.centerOrb}>
                    <Image
                        style={styles.centerOrbImg}
                        source={require("../../assets/images/Star.png")}
                    />
                </View>

                {/* Total exercises */}
                <View style={styles.rowCenter}>
                    <Ionicons name="flame-outline" size={16} color="#fff" />
                    <Text style={styles.inlineText}> Total exercises done </Text>
                    <Text style={styles.inlineBold}>25 exercises</Text>
                </View>

                {/* Section header with right column label like the mock */}
                <View style={{ marginTop: 16 , marginBottom : 16,}}>
                    <View style={styles.sectionHeaderRow}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="trophy-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.sectionHeaderText}>Your best Exercises record</Text>
                        </View>
                        <Text style={styles.colHeaderText}>Potential 1RM</Text>
                    </View>
                </View>

                {/* Three rows */}
                <ProgressRow
                    label="Deadlift"
                    leftBadge="1RM"
                    rightValue="100 Kg"
                    progress={0.85}
                    markerText="85"
                    avatar={require("../../assets/images/home/user1.png")}
                />
                <ProgressRow
                    label="Bench press"
                    leftBadge="1RM"
                    rightValue="100 Kg"
                    progress={0.82}
                    markerText="82"
                    avatar={require("../../assets/images/home/user1.png")}
                />
                <ProgressRow
                    label="Bent Over Row"
                    leftBadge="1RM"
                    rightValue="100 Kg"
                    progress={0.65}
                    markerText="65"
                    avatar={require("../../assets/images/home/user1.png")}
                />

                <SectionTitle title="Records Breakdown" style={{ marginTop: 20 }} />

                {/* Breakdown section */}
                <View style={{ marginTop: 14 }}>
                    <View style={styles.breakHeaderRow}>
                        <Text style={styles.breakHeader}>Records Breakdown</Text>
                    </View>

                    {breakdown.map((it, i) => (
                        <RecordBreakdownItem
                            key={`${it.title}-${i}`}
                            title={it.title}
                            prevMax={it.prevMax}
                            newMax={it.newMax}
                            thumb={it.thumb}
                            liked={false}
                            onToggleLike={() => {}}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0E0E12" },

    rule: { height: 3, backgroundColor: "rgba(255,255,255,0.12)", marginHorizontal: 16, borderRadius: 3 },
    title: { color: "#fff", fontWeight: "800", textAlign: "center", marginVertical: 10, fontSize: 15 },

    centerOrb: { alignItems: "center", height: 270},
    centerOrbImg: {position: "absolute", top: 0, bottom: 0 },
    orbShadow: {
        width: 190, height: 190, borderRadius: 95,
        backgroundColor: "rgba(255,255,255,0.05)",
        alignItems: "center", justifyContent: "center",
    },

    rowCenter: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 50 },
    inlineText: { color: "#fff", opacity: 0.85 },
    inlineBold: { color: "#fff", fontWeight: "800" },

    sectionHeaderRow: { paddingHorizontal: 16, marginTop: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    sectionHeaderText: { color: "#fff", fontWeight: "800" },
    colHeaderText: { color: "rgba(255,255,255,0.75)", fontWeight: "800" },

    smallInfo: { color: "rgba(255,255,255,0.8)", paddingHorizontal: 16, marginTop: 12, fontSize: 15 },

    breakHeaderRow: { marginTop: 14, paddingHorizontal: 16 },
    breakHeader: { color: "#fff", fontWeight: "800" },

    breakCard: {
        marginTop: 10,
        marginHorizontal: 16,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    breakLeft: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    thumb: { width: 36, height: 36, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.2)", marginRight: 10 },
    breakTitle: { color: "#fff", fontWeight: "800" },
    pillsRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
    pill: { color: "#fff", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.12)" },
    pillStrong: { color: "#fff", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: "#704FE2" },
});
