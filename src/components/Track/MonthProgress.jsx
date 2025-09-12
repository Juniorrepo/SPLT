import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/Colors";
import MonthDropdown from "./MonthDropdown";

const MonthProgress = ({ title, date, onChangeMonth, activeDays = [] }) => {
    const BORDER = COLORS.border || "rgba(255,255,255,0.08)";
    const MUTED = COLORS.subText || "rgba(255,255,255,0.72)";

    const [open, setOpen] = useState(false);

    const year = date.getFullYear();
    const month = date.getMonth();

    const monthName = useMemo(
        () => new Date(year, month, 1).toLocaleString("en", { month: "long" }),
        [year, month]
    );

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 Sun..6 Sat
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const cells = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        cells.push({ day: daysInPrev - i, inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, inMonth: true });
    }
    while (cells.length < 42) {
        cells.push({ day: cells.length - (firstDayIndex + daysInMonth) + 1, inMonth: false });
    }

    const goPrev = () => onChangeMonth?.(new Date(year, month - 1, 1));
    const goNext = () => onChangeMonth?.(new Date(year, month + 1, 1));

    return (
        <View style={[styles.card]}>
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>

                {/* Month controls */}
                <View style={styles.monthControls}>
                    <TouchableOpacity onPress={goPrev} style={styles.navBtn}>
                        <Ionicons name="chevron-back" size={18} color={COLORS.text} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        activeOpacity={0.8}
                        style={[styles.monthTag, { borderColor: BORDER }]}
                    >
                        <Text style={styles.monthText}>{monthName}</Text>
                        <Ionicons name="chevron-down" size={16} color={COLORS.text} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goNext} style={styles.navBtn}>
                        <Ionicons name="chevron-forward" size={18} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.weekRow}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <Text key={d} style={[styles.weekday, { color: MUTED }]}>
                        {d}
                    </Text>
                ))}
            </View>

            <View style={styles.grid}>
                {cells.map((c, idx) => {
                    const active = c.inMonth && activeDays.includes(c.day);
                    return (
                        <View key={idx} style={styles.cell}>
                            <View
                                style={[
                                    styles.circle,
                                    active && {
                                        backgroundColor: "rgba(255,255,255,0.12)",
                                        borderColor: "rgba(255,255,255,0.18)",
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        { color: c.inMonth ? COLORS.text : "rgba(255,255,255,0.45)" },
                                    ]}
                                >
                                    {c.day}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Dropdown popover */}
            <MonthDropdown
                visible={open}
                selectedMonth={month}
                onSelect={(mIndex) => onChangeMonth?.(new Date(year, mIndex, 1))}
                onClose={() => setOpen(false)}
                anchorStyle={{ top: 210, right: 24 }}
            />
        </View>
    );
};

export default MonthProgress;

const CELL = 38;

const styles = StyleSheet.create({
    card: {
        borderTopColor: COLORS.maincolor,
        borderTopWidth: 1,
        marginHorizontal: 16,
        marginTop: 14,
        padding: 16,
    },
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    title: { color: COLORS.text, fontSize: 14, fontWeight: "800" },
    monthControls: { flexDirection: "row", alignItems: "center" },
    navBtn: { padding: 4, marginHorizontal: 2 },
    monthTag: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        marginHorizontal: 6,
        gap: 6,
    },
    monthText: { color: COLORS.text, fontWeight: "800", fontSize: 12 },
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 14,
        marginBottom: 10,
    },
    weekday: { width: CELL, textAlign: "center", fontWeight: "700", fontSize: 11 },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    cell: {
        width: CELL,
        height: CELL,
        marginBottom: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "transparent",
    },
    dayText: { fontSize: 12, fontWeight: "700" },
});
