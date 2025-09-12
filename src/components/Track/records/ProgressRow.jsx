// src/components/Track/records/ProgressRow.jsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProgressRow({
                                        label,
                                        rightValue,
                                        progress = 0.85,
                                        markerText,
                                        avatar,
                                        avatarSize = 60,
                                    }) {
    const pct = Math.max(0, Math.min(progress, 1));

    return (
        <View style={styles.row}>
            <View style={[styles.leftCol, { width: avatarSize + 16 }]}>
                {avatar ? (
                    <Image
                        source={avatar}
                        style={{
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                        }}
                    />
                ) : (
                    <View
                        style={{
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                            backgroundColor: "rgba(255,255,255,0.12)",
                        }}
                    />
                )}
                <Text style={styles.name} numberOfLines={2}>
                    {label}
                </Text>
            </View>

            <View style={styles.content}>
                <View style={styles.trackWrap}>
                    <View style={styles.trackBase} />
                    <LinearGradient
                        colors={["#9C6BFF", "#6E4FE0"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.fill, { width: `${pct * 100}%` }]}
                    />
                    {!!markerText && (
                        <View
                            style={[
                                styles.marker,
                                { left: `${pct * 100}%`, transform: [{ translateX: -16 }] },
                            ]}
                        >
                            <Text style={styles.markerText}>{markerText}</Text>
                        </View>
                    )}
                    {!!rightValue && <Text style={styles.rightValue}>{rightValue}</Text>}
                </View>
            </View>
        </View>
    );
}

const TRACK_H = 6;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: 16,
        marginVertical: 14,
    },
    leftCol: {
        alignItems: "center",
        marginRight: 12,
    },
    name: {
        marginTop: 8,
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 13,
        textAlign: "center",
    },

    content: { flex: 1 },

    headerRow: { alignItems: "flex-end", marginBottom: 6 },
    headerText: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "800" },

    trackWrap: { height: TRACK_H, justifyContent: "center", marginTop: 55 },
    trackBase: {
        position: "absolute",
        left: 0,
        right: 0,
        height: TRACK_H,
        borderRadius: TRACK_H,
        backgroundColor: "#FFFFFF",
    },
    fill: {
        position: "absolute",
        left: 0,
        height: TRACK_H,
        borderRadius: TRACK_H,
    },
    marker: {
        position: "absolute",
        top: -23,
        backgroundColor: "#8B67F7",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        minWidth: 28,
        alignItems: "center",
    },
    markerText: { color: "#fff", fontSize: 11, fontWeight: "900" },
    rightValue: {
        position: "absolute",
        right: 0,
        top: -43,
        color: "#FFFFFF",
        fontWeight: "900",
    },
});
