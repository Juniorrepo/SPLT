import React, { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Polyline, Circle, Line } from "react-native-svg";
import COLORS from "../../../constants/Colors";

const { width } = Dimensions.get("window");
const H = 160;
const PAD = 10;
const LABEL_W = 44;

const StepsCard = ({
                       title,
                       stats,
                       weeklySteps = [],
                       legendLeft = { dotColor: "#9B6CFF", label: "This Week" },
                       legendRight = "",
                       bubbleColor = "#7B57F2",
                       lineColor = "#9B6CFF",
                       tickValues = [4000, 3000, 2000, 1000, 500],
                   }) => {
    const BORDER = COLORS.border || "rgba(255,255,255,0.08)";
    const MUTED = COLORS.subText || "rgba(255,255,255,0.72)";

    const chartW = width - 32 - 32 - LABEL_W;
    const max = Math.max(...tickValues, ...weeklySteps, 1);

    const points = useMemo(() => {
        if (!weeklySteps.length) return "";
        return weeklySteps
            .map((v, i) => {
                const x = PAD + (i * (chartW - PAD * 2)) / (weeklySteps.length - 1);
                const y = H - PAD - (v / max) * (H - PAD * 2);
                return `${x},${y}`;
            })
            .join(" ");
    }, [weeklySteps, chartW, max]);

    const last = useMemo(() => {
        if (!weeklySteps.length) return { x: 0, y: 0, v: 0 };
        const i = weeklySteps.length - 1;
        const x = PAD + (i * (chartW - PAD * 2)) / (weeklySteps.length - 1);
        const y = H - PAD - (weeklySteps[i] / max) * (H - PAD * 2);
        return { x, y, v: weeklySteps[i] };
    }, [weeklySteps, chartW, max]);

    return (
        <View style={[styles.card]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.meta, { color: MUTED }]}>
                {stats.minutes} min   •   {stats.distanceKm.toFixed(2)} km   •   {stats.kcal} kcal
            </Text>

            <View style={styles.chartRow}>
                <View style={styles.yAxis}>
                    {tickValues.map((t, idx) => (
                        <Text key={idx} style={[styles.tickLabel, { color: MUTED }]}>
                            {t}
                        </Text>
                    ))}
                </View>

                <View style={{ width: chartW, height: H }}>
                    <Svg width={chartW} height={H}>
                        <Polyline points={points} fill="none" stroke={lineColor} strokeWidth="3" />
                        {weeklySteps.map((v, i) => {
                            const x = PAD + (i * (chartW - PAD * 2)) / (weeklySteps.length - 1);
                            const y = H - PAD - (v / max) * (H - PAD * 2);
                            return <Circle key={i} cx={x} cy={y} r="3.2" fill={lineColor} />;
                        })}
                    </Svg>

                    {/* Bubble tag on last point */}
                    {weeklySteps.length > 0 && (
                        <View
                            style={[
                                styles.bubble,
                                {
                                    left: Math.min(Math.max(last.x - 34, 0), chartW - 68),
                                    top: Math.max(last.y - 26, 0),
                                    borderColor: BORDER,
                                    backgroundColor: bubbleColor,
                                },
                            ]}
                        >
                            <Text style={styles.bubbleText}>{last.v} Steps</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* X axis labels */}
            <View style={styles.axis}>
                {["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"].map((d) => (
                    <Text key={d} style={[styles.axisLabel, { color: MUTED }]}>
                        {d}
                    </Text>
                ))}
            </View>

            {/* Legend row with top divider (as in your design) */}
            <View style={[styles.legendRow, { borderTopColor: BORDER }]}>
                <View style={styles.legendLeft}>
                    <View style={[styles.dot, { backgroundColor: legendLeft.dotColor }]} />
                    <Text style={[styles.legendText, { color: MUTED }]}>{legendLeft.label}</Text>
                </View>
                <Text style={[styles.legendText, { color: MUTED }]}>{legendRight}</Text>
            </View>
        </View>
    );
};

export default StepsCard;

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginTop: 12,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 10,
    },
    title: { color: COLORS.text, fontSize: 28, fontWeight: "800" },
    meta: { marginTop: 6, fontSize: 20, fontWeight: "600" },
    chartRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 8 },
    yAxis: {
        width: LABEL_W,
        height: H,
        justifyContent: "space-between",
        paddingTop: 2,
        paddingBottom: 2,
    },
    tickLabel: { fontSize: 15, fontWeight: "700" },
    axis: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    axisLabel: { fontSize: 15, fontWeight: "700" },
    legendRow: {
        marginTop: 12,
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    legendLeft: { flexDirection: "row", alignItems: "center" },
    dot: { width: 10, height: 10, borderRadius: 5, fontSize: 15, marginRight: 8 },
    legendText: { fontSize: 15, fontWeight: "700" },
    bubble: {
        position: "absolute",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: 1,
        borderRadius: 12,
    },
    bubbleText: { color: "#FFF", fontSize: 11, fontWeight: "800" },
});
