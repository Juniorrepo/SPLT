// components/Track/Achievements/AchievementsGrid.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import AchievementCard from "./AchievementCard";

type Item = {
    id: string;
    variant: "gradient" | "outline" | "gradientWide";
    title: string;
    value?: string;
    icon: any;
    onPress?: () => void;
};

const AchievementsGrid: React.FC<{ items?: Item[] }> = ({ items = [] }) => {
    return (
        <View style={styles.wrapper}>
            {items.map((it) => {
                const isHalf = it.variant === "gradient";
                return (
                    <View
                        key={it.id}
                        style={[styles.cell, isHalf ? styles.half : styles.full]}
                    >
                        <AchievementCard {...it} />
                    </View>
                );
            })}
        </View>
    );
};

export default AchievementsGrid;

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        marginTop: 12,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cell: {
        marginBottom: 12,
    },
    half: { width: "48%" }, // matches the mock’s two-up grid
    full: { width: "100%" },
});
