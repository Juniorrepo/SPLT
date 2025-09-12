import React, {useMemo, useState, useRef, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    SectionList,
    Pressable,
    Modal,
    Animated,
    Easing,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

/* ---------- Theme ---------- */
const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
    line: "rgba(110,86,205,0.35)",
};

/* ---------- Tiny helpers ---------- */
const now = new Date();
const minsAgo = (m) => new Date(now.getTime() - m * 60000);
const hoursAgo = (h) => minsAgo(h * 60);
const daysAgo = (d) => hoursAgo(d * 24);

const formatWhen = (d) => {
    const diffMs = now - d;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return d.toLocaleDateString(undefined, {day: "numeric", month: "short"});
};

const inLastDay = (d) => now - d < 24 * 3600 * 1000;
const inLastWeek = (d) => now - d < 7 * 24 * 3600 * 1000 && !inLastDay(d);

/* ---------- Mock history data ---------- */
const RAW = [
    {
        id: "u1",
        type: "Profile Updates",
        icon: "id-card-outline",
        text: "Username updated from Honen to ‘Honen_fit’",
        at: minsAgo(20)
    },
    {id: "p1", type: "Profile Updates", icon: "logo-spotify", text: "Spotify link removed", at: hoursAgo(20)},
    {id: "s1", type: "Subscriptions", icon: "card-outline", text: "Cancelled subscription", at: hoursAgo(20)},
    {id: "w1", type: "Workouts", icon: "time-outline", text: "Workout: Full Body HIIT – Completed", at: daysAgo(2)},
    {id: "p2", type: "Profile Updates", icon: "logo-instagram", text: "Instagram link added", at: daysAgo(6)},
];

/* ---------- Filter options ---------- */
const FILTERS = ["All", "Workouts", "Subscriptions", "Profile Updates"];

/* ---------- Gradient icon circle ---------- */
const IconBubble = ({name}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.bubble}>
        <Ionicons name={name} size={16} color="#fff"/>
    </LinearGradient>
);

/* ---------- Header filter pill ---------- */
const FilterPill = ({onPress}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={{borderRadius: 20, padding: 1}}>
        <Pressable onPress={onPress}
                   style={{paddingHorizontal: 10, paddingVertical: 6, borderRadius: 19, backgroundColor: THEME.card}}>
            <Ionicons name="funnel-outline" size={16} color="#c8c6ff"/>
        </Pressable>
    </LinearGradient>
);

/* ---------- Bottom Sheet ---------- */
const FilterSheet = ({visible, value, onClose, onSelect}) => {
    const translateY = useRef(new Animated.Value(300)).current;
    const fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 220,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true
                }),
                Animated.timing(fade, {toValue: 1, duration: 200, useNativeDriver: true}),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 300,
                    duration: 220,
                    easing: Easing.in(Easing.quad),
                    useNativeDriver: true
                }),
                Animated.timing(fade, {toValue: 0, duration: 180, useNativeDriver: true}),
            ]).start();
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: "rgba(0,0,0,0.45)", opacity: fade}]}>
                <Pressable style={{flex: 1}} onPress={onClose}/>
            </Animated.View>

            <Animated.View style={[styles.sheet, {transform: [{translateY}]}]}>
                <Text style={styles.sheetTitle}>Filter History activity</Text>
                {FILTERS.map((opt) => {
                    const selected = value === opt;
                    return (
                        <Pressable key={opt} onPress={() => onSelect(opt)} style={styles.sheetRow}>
                            <Text style={styles.sheetRowText}>{opt}</Text>
                            {selected ? <Ionicons name="checkmark" size={18} color="#c8c6ff"/> : null}
                        </Pressable>
                    );
                })}
            </Animated.View>
        </Modal>
    );
};

/* ---------- Screen ---------- */
export default function AccountHistoryScreen({navigation}) {
    const [filter, setFilter] = useState("All");
    const [open, setOpen] = useState(false);

    const filtered = useMemo(
        () => (filter === "All" ? RAW : RAW.filter((r) => r.type === filter)),
        [filter]
    );

    const sections = useMemo(() => {
        const today = filtered.filter((x) => inLastDay(x.at));
        const lastWeek = filtered.filter((x) => inLastWeek(x.at));
        return [
            {title: "Today", data: today},
            {title: "Last Week", data: lastWeek},
        ].filter((s) => s.data.length);
    }, [filtered]);

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.h1}>Account History</Text>
                <FilterPill onPress={() => setOpen(true)}/>
            </View>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({section}) => <Text style={styles.sectionTitle}>{section.title}</Text>}
                renderItem={({item}) => (
                    <View style={styles.row}>
                        <IconBubble name={item.icon}/>
                        <View style={{flex: 1, marginLeft: 12}}>
                            <Text style={styles.rowText} numberOfLines={2}>{item.text}</Text>
                        </View>
                        <Text style={styles.when}>{formatWhen(item.at)}</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.sep}/>}
                contentContainerStyle={{paddingHorizontal: 14, paddingBottom: 24}}
            />

            <FilterSheet
                visible={open}
                value={filter}
                onClose={() => setOpen(false)}
                onSelect={(opt) => {
                    setFilter(opt);
                    setOpen(false);
                }}
            />
        </SafeAreaView>
    );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
    safe: {flex: 1},

    header: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    h1: {color: "#fff", fontSize: 18, fontWeight: "800"},

    sectionTitle: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "800",
        paddingTop: 8,
        paddingBottom: 8,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    rowText: {color: "#e7e7ff", fontSize: 14},
    when: {color: "#c8c6ff", fontSize: 12, marginLeft: 8},

    bubble: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    sep: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: THEME.line,
    },

    /* bottom sheet */
    sheet: {
        position: "absolute",
        left: 0, right: 0, bottom: 0,
        backgroundColor: THEME.card,
        paddingTop: 14, paddingBottom: 24, paddingHorizontal: 16,
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
    },
    sheetTitle: {color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 12},
    sheetRow: {
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: THEME.line,
    },
    sheetRowText: {color: "#fff", fontSize: 15},
});
