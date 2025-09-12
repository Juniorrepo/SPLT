import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../../constants/Colors";

export default function RecordBreakdownItem({
                                                title,
                                                thumb,
                                                prevMax,
                                                newMax,
                                                liked = false,
                                                onToggleLike,
                                            }) {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.header}
                activeOpacity={0.85}
                onPress={() => setOpen(o => !o)}
            >
                {thumb ? (
                    <Image source={thumb} style={styles.thumb} />
                ) : (
                    <View style={[styles.thumb, styles.thumbPlaceholder]} />
                )}
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={onToggleLike} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Ionicons
                            name={liked ? "heart" : "heart-outline"}
                            size={22}
                            color={liked ? COLORS.maincolor : COLORS.maincolor}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            {/* COLLAPSED CONTENT */}
            {open && (
                <View style={styles.pillsRow}>
                    <Text style={styles.pill}>Previous Max : {prevMax} KG</Text>

                    <LinearGradient
                        colors={["#9C6BFF", "#6E4FE0"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.pillStrong}
                    >
                        <Text style={styles.pillStrongText}>New Max : {newMax} KG</Text>
                    </LinearGradient>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginHorizontal: 16,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 12,
        paddingVertical: 10,
        borderColor: COLORS.maincolor,
        borderStyle: "solid",
        paddingHorizontal: 10,
    },
    header: { flexDirection: "row", alignItems: "center" },
    thumb: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
    thumbPlaceholder: { backgroundColor: "rgba(255,255,255,0.2)" },
    title: { color: "#fff", fontWeight: "800", flex: 1 , fontSize : 18, marginLeft : 10,},
    headerRight: { flexDirection: "row", alignItems: "center", marginLeft: 8 },

    pillsRow: {
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
        marginTop: 12,
    },
    pill: {
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.12)",
        overflow: "hidden",
    },
    pillStrong: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        overflow: "hidden",
    },
    pillStrongText: { color: "#fff", fontWeight: "800" },
});
