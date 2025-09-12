import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../../constants/Colors";
import TopBar from "../../common/TopBar";

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.75)",
    stroke: "rgba(124,91,242,0.30)",
    card: "rgba(255,255,255,0.06)",
};

export default function WorkoutsStartScreen({ navigation }) {

    const workouts = useMemo(
        () => [
            {
                id: "w1",
                title: "Leg Day",
                desc:
                    "squats, hip hinges (deadlifts), lunges, sit ups, Box Jumps...",
                img:
                    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200&auto=format&fit=crop",
            },
            {
                id: "w2",
                title: "Arm Day",
                desc:
                    "squats, hip hinges (deadlifts), lunges, sit ups, Box Jumps...",
                img:
                    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200&auto=format&fit=crop",
            },
        ],
        []
    );

    const [query, setQuery] = useState("");
    const filtered = useMemo(() => {
        if (!query.trim()) return workouts;
        const q = query.toLowerCase();
        return workouts.filter(
            (w) =>
                w.title.toLowerCase().includes(q) ||
                w.desc.toLowerCase().includes(q)
        );
    }, [query, workouts]);

    const onStart = (item) => {
        // navigate to your workout runner / details
        Alert.alert("Start Workout", `Starting: ${item.title}`);
        // navigation.navigate("WorkoutRunner", { id: item.id });
    };

    const renderItem = ({ item }) => (
        <View style={styles.cardWrap}>
            <View style={styles.card}>
                <Image source={{ uri: item.img }} style={styles.thumb} />

                {/* text block */}
                <View style={{ flex: 1 }}>
                    <View style={styles.titleRow}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                            {item.title}
                        </Text>

                        <Pressable
                            onPress={() => Alert.alert("More", "Context menu")}
                            hitSlop={12}
                            style={styles.moreBtn}
                        >
                            <Ionicons name="ellipsis-vertical" size={18} color={THEME.text} />
                        </Pressable>
                    </View>

                    <Text style={styles.cardDesc} numberOfLines={2}>
                        {item.desc}
                    </Text>

                    <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => onStart(item)}>
                            <LinearGradient
                                colors={COLORS.gradient}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={styles.startBtn}
                            >
                                <Text style={styles.startText}>Start Workout</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <TopBar variant="workoutstart" onBackPress={() => navigation.goBack?.()}/>
            <View style={styles.container}>
                {/* search */}
                <View style={styles.searchWrap}>
                    <Ionicons name="search" size={18} color={THEME.dim} />
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search"
                        placeholderTextColor={THEME.dim}
                        style={styles.searchInput}
                    />
                </View>

                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 14, paddingTop: 10 },

    searchWrap: {
        height: 42,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: THEME.stroke,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    searchInput: { flex: 1, color: THEME.text },

    cardWrap: { marginBottom: 14 },
    card: {
        flexDirection: "row",
        gap: 12,
        padding: 10,
        borderRadius: 14,
        backgroundColor: THEME.card,
        borderWidth: 1,
        borderColor: "rgba(124,91,242,0.28)",
    },
    thumb: { width: 105, height: 78, borderRadius: 10, backgroundColor: "#111" },

    titleRow: { flexDirection: "row", alignItems: "center" },
    cardTitle: {
        color: THEME.text,
        fontWeight: "800",
        fontSize: 15,
        flex: 1,
        paddingRight: 8,
    },
    moreBtn: { paddingHorizontal: 4, paddingVertical: 4 },

    cardDesc: { color: THEME.dim, fontSize: 12, marginTop: 4 },

    startBtn: {
        height: 30,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },
    startText: { color: "#fff", fontWeight: "800", fontSize: 12 },
});
