import React, {useMemo, useRef, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
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

/* ---------- 1px Gradient Border ---------- */
const GradientFrame = ({children, radius = 12, pad = 10, style}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={[{borderRadius: radius, padding: 1}, style]}>
        <View style={{borderRadius: radius - 1, backgroundColor: THEME.card, overflow: "hidden", padding: pad}}>
            {children}
        </View>
    </LinearGradient>
);

/* ---------- Mock data ---------- */
const REVIEWS = [
    {
        id: "1",
        kind: "Shop",
        title: "Protein Powder 500g",
        author: "Alex",
        date: "30 Aug 2025",
        rating: 5,
        text: "Motivating and clear instructions.",
        avatar: {uri: "https://i.pravatar.cc/100?img=12"},
    },
    {
        id: "2",
        kind: "Workout",
        title: "Yoga Flow",
        author: "Sofia",
        date: "25 Aug 2025",
        rating: 4,
        text: "Relaxing session, loved the pacing.",
        avatar: {uri: "https://i.pravatar.cc/100?img=32"},
    },
    {
        id: "3",
        kind: "Trainer",
        title: "John Doe",
        author: "Chris",
        date: "2 Aug 2025",
        rating: 5,
        text: "Motivating and clear instructions.",
        avatar: {uri: "https://i.pravatar.cc/100?img=8"},
    },
];

/* ---------- Small UI bits ---------- */
const StarRow = ({value = 0}) => (
    <View style={{flexDirection: "row", gap: 2}}>
        {[1, 2, 3, 4, 5].map((i) => (
            <Ionicons
                key={i}
                name={i <= value ? "star" : "star-outline"}
                size={13}
                color="#f7d154"
            />
        ))}
    </View>
);

const FilterPill = ({onPress}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={{borderRadius: 20, padding: 1}}>
        <Pressable onPress={onPress}
                   style={{paddingHorizontal: 10, paddingVertical: 6, borderRadius: 19, backgroundColor: THEME.card}}>
            <Ionicons name="funnel-outline" size={16} color="#c8c6ff"/>
        </Pressable>
    </LinearGradient>
);

/* ---------- Bottom Sheet (Modal + Animated) ---------- */
const FilterSheet = ({visible, value, onClose, onSelect}) => {
    const translateY = useRef(new Animated.Value(300)).current;
    const fade = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
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

    const options = ["All", "Trainer", "Shop", "Workout"];

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: "rgba(0,0,0,0.45)", opacity: fade}]}>
                <Pressable style={{flex: 1}} onPress={onClose}/>
            </Animated.View>

            <Animated.View style={[styles.sheet, {transform: [{translateY}]}]}>
                <Text style={styles.sheetTitle}>Filter Review activity</Text>

                {options.map((opt) => {
                    const selected = value === opt || (opt === "All" && value === "All");
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

/* ---------- One review card ---------- */
const ReviewCard = ({item}) => (
    <GradientFrame radius={12} pad={10} style={{marginBottom: 12}}>
        <View style={{flexDirection: "row"}}>
            <Image source={item.avatar} style={styles.avatar}/>
            <View style={{flex: 1, marginLeft: 10}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Ionicons name="ellipsis-vertical" size={16} color="#c8c6ff"/>
                </View>

                <View style={{flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4}}>
                    <StarRow value={item.rating}/>
                    <Text style={styles.date}>{item.date}</Text>
                </View>

                <Text style={styles.text} numberOfLines={2}>{item.text}</Text>

                <View style={{marginTop: 6, flexDirection: "row", alignItems: "center", gap: 6}}>
                    <Ionicons name="pricetag-outline" size={14} color="#c8c6ff"/>
                    <Text style={styles.kind}>{item.kind}</Text>
                </View>
            </View>
        </View>
    </GradientFrame>
);

/* ---------- Screen ---------- */
export default function ReviewsScreen({navigation}) {
    const [filter, setFilter] = useState("All");
    const [open, setOpen] = useState(false);

    const data = useMemo(() => {
        if (filter === "All") return REVIEWS;
        return REVIEWS.filter((r) => r.kind === filter);
    }, [filter]);

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            {/* Header row with title + filter pill */}
            <View style={styles.header}>
                <Text style={styles.h1}>Reviews</Text>
                <FilterPill onPress={() => setOpen(true)}/>
            </View>

            <FlatList
                data={data}
                keyExtractor={(i) => i.id}
                renderItem={({item}) => <ReviewCard item={item}/>}
                contentContainerStyle={{paddingHorizontal: 12, paddingBottom: 24}}
                ListEmptyComponent={<Text style={{color: THEME.muted, alignSelf: "center", marginTop: 24}}>No
                    reviews.</Text>}
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
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    h1: {color: "#fff", fontSize: 18, fontWeight: "800"},

    avatar: {width: 42, height: 42, borderRadius: 21, backgroundColor: "#0f1120"},
    title: {color: "#fff", fontSize: 14, fontWeight: "700"},
    date: {color: "#c8c6ff", fontSize: 12},
    text: {color: THEME.muted, fontSize: 13, marginTop: 6},
    kind: {color: "#c8c6ff", fontSize: 12},

    /* Bottom sheet */
    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: THEME.card,
        paddingTop: 14,
        paddingBottom: 24,
        paddingHorizontal: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    sheetTitle: {color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 12},
    sheetRow: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "rgba(110,86,205,0.35)",
    },
    sheetRowText: {color: "#fff", fontSize: 15},
});
