// src/components/Track/records/SectionLabel.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SectionLabel({ children }) {
    return (
        <View style={styles.wrap}>
            <View style={styles.rule} />
            <Text style={styles.text}>{children}</Text>
            <View style={styles.rule} />
        </View>
    );
}
const styles = StyleSheet.create({
    wrap: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginTop: 18, marginBottom: 8 },
    rule: { flex: 1, height: 2, backgroundColor: "rgba(255,255,255,0.12)" },
    text: { marginHorizontal: 10, color: "#fff", fontWeight: "800", fontSize: 13 }
});
