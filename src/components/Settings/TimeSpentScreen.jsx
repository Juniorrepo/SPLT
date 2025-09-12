import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

/* ---------- theme ---------- */
const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
    line: "rgba(110,86,205,0.35)",
    bar: "#9b6eff",
};

/* ---------- helpers ---------- */
const GradientFrame = ({children, radius = 10, pad = 10, style}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={[{borderRadius: radius, padding: 1}, style]}>
        <View style={{borderRadius: radius - 1, overflow: "hidden", backgroundColor: THEME.card, padding: pad}}>
            {children}
        </View>
    </LinearGradient>
);

const fmtAvg = (mins) => {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    if (!h) return `${m}M`;
    if (!m) return `${h}h`;
    return `${h}h ${m}M`;
};

/* ---------- demo data (minutes) ---------- */
const DATA = {
    week: {
        labels: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Today"],
        values: [68, 15, 34, 92, 8, 70, 55],
    },
    month: {
        labels: ["W1", "W2", "W3", "W4", "W5"],
        values: [210, 340, 265, 300, 280], // total minutes per week
    },
    year: {
        labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        values: [980, 1220, 1030, 890, 1140, 1010, 1200, 1110, 990, 1070, 1050, 1150], // total minutes per month
    },
};

/* ---------- tiny bar chart (pure RN) ---------- */
const Bars = ({labels, values, height = 180, showGrid = true}) => {
    const max = Math.max(1, ...values);
    return (
        <View style={{height, marginTop: 8}}>
            {/* grid */}
            {showGrid && [0.25, 0.5, 0.75, 1].map((p) => (
                <View
                    key={p}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: Math.round((1 - p) * height),
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderTopColor: THEME.line,
                    }}
                />
            ))}

            {/* bars + labels */}
            <View style={{flex: 1, flexDirection: "row"}}>
                {values.map((v, i) => {
                    const h = Math.round((v / max) * (height - 24)); // leave space for labels
                    return (
                        <View key={`${labels[i]}-${i}`}
                              style={{flex: 1, alignItems: "center", justifyContent: "flex-end"}}>
                            <View
                                style={{
                                    width: 22,
                                    height: h,
                                    borderRadius: 6,
                                    backgroundColor: THEME.bar,
                                }}
                            />
                            <Text style={styles.tick}>{labels[i]}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

/* ---------- inline dropdown ---------- */
const RangeSelect = ({value, onChange}) => {
    const [open, setOpen] = useState(false);
    const opts = ["week", "month", "year"];
    return (
        <View style={{position: "relative"}}>
            <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                            style={{borderRadius: 16, padding: 1}}>
                <Pressable
                    onPress={() => setOpen((o) => !o)}
                    style={styles.pillBtn}
                    android_ripple={{color: "rgba(255,255,255,0.08)", borderless: true}}
                >
                    <Text style={styles.pillText}>{value}</Text>
                    <Ionicons name={open ? "chevron-up" : "chevron-down"} size={14} color="#fff"/>
                </Pressable>
            </LinearGradient>

            {open && (
                <View style={styles.dropdown}>
                    {opts.map((o) => (
                        <Pressable
                            key={o}
                            onPress={() => {
                                onChange(o);
                                setOpen(false);
                            }}
                            style={styles.dropRow}
                        >
                            <Text
                                style={[styles.dropText, value === o && {color: "#fff", fontWeight: "700"}]}>{o}</Text>
                            {value === o ? <Ionicons name="checkmark" size={16} color="#c8c6ff"/> : null}
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
};

/* ---------- screen ---------- */
export default function TimeSpentScreen({navigation}) {
    const [range, setRange] = useState("week");
    const [dailyLimitOn, setDailyLimitOn] = useState(false);
    const [sleepModeOn, setSleepModeOn] = useState(false);

    const {labels, values} = DATA[range];
    const avgMins = useMemo(() => {
        // For month/year we show *daily* average too: divide totals by estimated days.
        if (range === "week") return values.reduce((a, b) => a + b, 0) / values.length;
        if (range === "month") return values.reduce((a, b) => a + b, 0) / (7 * values.length); // approx daily
        // year: 12 totals → divide by 365
        return values.reduce((a, b) => a + b, 0) / 365;
    }, [range, values]);

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            <ScrollView contentContainerStyle={styles.container}>

                {/* Title row */}
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Time Spent</Text>
                    <RangeSelect value={range} onChange={setRange}/>
                </View>

                {/* Average */}
                <Text style={styles.avgValue}>{fmtAvg(avgMins)}</Text>
                <Text style={styles.avgLabel}>Daily Average</Text>
                <Text style={styles.blurb}>
                    Stay consistent, stay accountable. This chart shows your weekly activity and daily
                    average time spent training.
                </Text>

                {/* Chart */}
                <Bars labels={labels} values={values}/>

                {/* Manage Your Time */}
                <Text style={[styles.title, {marginTop: 22, marginBottom: 8}]}>Manage Your Time</Text>

                <GradientFrame pad={0} style={{marginBottom: 10}}>
                    <Pressable
                        onPress={() => setDailyLimitOn((v) => !v)}
                        style={styles.row}
                        android_ripple={{color: "rgba(255,255,255,0.06)"}}
                    >
                        <Text style={styles.rowText}>Daily limit</Text>
                        <View style={styles.rowRight}>
                            <Text
                                style={[styles.status, dailyLimitOn && styles.statusOn]}>{dailyLimitOn ? "on" : "off"}</Text>
                            <Ionicons name="chevron-forward" size={18} color="#c8c6ff"/>
                        </View>
                    </Pressable>
                </GradientFrame>

                <GradientFrame pad={0}>
                    <Pressable
                        onPress={() => setSleepModeOn((v) => !v)}
                        style={styles.row}
                        android_ripple={{color: "rgba(255,255,255,0.06)"}}
                    >
                        <Text style={styles.rowText}>Sleep mode</Text>
                        <View style={styles.rowRight}>
                            <Text
                                style={[styles.status, sleepModeOn && styles.statusOn]}>{sleepModeOn ? "on" : "off"}</Text>
                            <Ionicons name="chevron-forward" size={18} color="#c8c6ff"/>
                        </View>
                    </Pressable>
                </GradientFrame>

                <View style={{height: 20}}/>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16, paddingBottom: 24},

    titleRow: {flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
    title: {color: "#fff", fontSize: 18, fontWeight: "800"},

    avgValue: {color: "#fff", fontSize: 32, fontWeight: "900", marginTop: 10},
    avgLabel: {color: "#bfbff6", marginTop: 2, fontSize: 12, fontWeight: "700"},
    blurb: {color: THEME.muted, marginTop: 6, fontSize: 12, lineHeight: 18},

    tick: {color: "#c8c6ff", fontSize: 11, marginTop: 6},

    // inline pill
    pillBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
        backgroundColor: THEME.card,
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    pillText: {color: "#fff", fontSize: 12, fontWeight: "700", textTransform: "lowercase"},

    dropdown: {
        position: "absolute",
        right: 0,
        top: 36,
        backgroundColor: THEME.card,
        borderRadius: 10,
        paddingVertical: 6,
        width: 120,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 14,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: THEME.line,
    },
    dropRow: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dropText: {color: "#c8c6ff", fontSize: 13, textTransform: "lowercase"},

    // rows
    row: {
        minHeight: 52,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    rowText: {color: "#fff", fontSize: 15, fontWeight: "600"},
    rowRight: {flexDirection: "row", alignItems: "center", gap: 8},
    status: {color: "#b8b9c5", fontSize: 13},
    statusOn: {color: "#8de38d"},
});
