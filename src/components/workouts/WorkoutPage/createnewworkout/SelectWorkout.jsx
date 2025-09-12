import React, {useMemo, useState, useCallback} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

import COLORS from "../../../../constants/Colors";
import TopBar from "../../../common/TopBar";
import SectionTitle from "../../../Track/SectionTitle";
import ActionModal from "../../../common/ActionModal";

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.75)",
    stroke: "rgba(124,91,242,0.30)",
    card: "rgba(255,255,255,0.06)",
};

export default function SelectWorkoutScreen({navigation, route}) {

    const [active, setActive] = useState(false);

    const actions = useMemo(() => ([
        {
            key: "superset",
            label: "Super set",
            icon: "flame",
        },
        {key: "reorder", label: "Reorder", icon: "swap-vertical",},
        {
            key: "view",
            label: "View",
            icon: "eye",
        },
        {
            key: "delete",
            label: "Delete",
            icon: "trash",
            danger: true,
        },
    ]: []), [active, navigation]);

    const workouts = useMemo(
        () => [
            {
                id: "w1",
                title: "Leg Day",
                desc:
                    "squats, hip hinges (deadlifts), lunges, sit ups, Box Jumps...",
                months: 3,
                level: "Intermediate",
                img:
                    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200&auto=format&fit=crop",
            },
            {
                id: "w2",
                title: "Arm Day",
                desc:
                    "squats, hip hinges (deadlifts), lunges, sit ups, Box Jumps...",
                months: 3,
                level: "Intermediate",
                img:
                    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200&auto=format&fit=crop",
            },
            // add more…
        ],
        []
    );

    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(new Set()); // ids

    const toggle = useCallback((id) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const filtered = useMemo(() => {
        if (!query.trim()) return workouts;
        const q = query.toLowerCase();
        return workouts.filter(
            (w) =>
                w.title.toLowerCase().includes(q) ||
                w.desc.toLowerCase().includes(q) ||
                w.level.toLowerCase().includes(q)
        );
    }, [query, workouts]);

    const onDone = () => {
        // return chosen ids or objects
        const picked = workouts.filter((w) => selected.has(w.id));
        console.log("SELECTED WORKOUTS", picked);
        Alert.alert("Done", `Selected ${picked.length} workout(s).`);
        navigation.goBack?.();
    };

    const renderItem = ({item}) => {
        const isAdded = selected.has(item.id);

        return (
            <View style={styles.cardWrap}>
                <View style={styles.card}>
                    {/* left: image */}
                    <Image source={{uri: item.img}} style={styles.thumb}/>

                    {/* middle: content */}
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={styles.cardTitle} numberOfLines={1}>
                                {item.title}
                            </Text>
                        </View>

                        <Text style={styles.cardDesc} numberOfLines={2}>
                            {item.desc}
                        </Text>

                        {/* meta row */}
                        <View style={styles.metaRow}>
                            <View style={styles.metaChip}>
                                <Ionicons name="time-outline" size={14} color={THEME.dim}/>
                                <Text style={styles.metaText}>{item.months} Months</Text>
                            </View>
                            <View style={styles.metaDot}/>
                            <View style={styles.metaChip}>
                                <Ionicons name="bar-chart-outline" size={14} color={THEME.dim}/>
                                <Text style={styles.metaText}>{item.level}</Text>
                            </View>
                        </View>

                        {/* actions */}
                        <View style={styles.actionsRow}>
                            <Pressable
                                onPress={() => navigation.navigate("ProgramDetails")}
                                style={({pressed}) => [
                                    styles.readBtn,
                                    pressed && {opacity: 0.85},
                                ]}
                            >
                                <Text style={styles.readText}>Read more</Text>
                            </Pressable>

                            <TouchableOpacity activeOpacity={0.9} onPress={() => toggle(item.id)}>
                                <LinearGradient
                                    colors={COLORS.gradient}
                                    start={{x: 0, y: 0.5}}
                                    end={{x: 1, y: 0.5}}
                                    style={[
                                        styles.addBtn,
                                        isAdded && {opacity: 0.9},
                                    ]}
                                >
                                    <Text style={styles.addText}>{isAdded ? "Added" : "Add"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* right: more */}
                    <Pressable onPress={() => setActive(true)} hitSlop={12}>
                        <Ionicons name="ellipsis-vertical" size={18} color={THEME.text}/>
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
            <TopBar variant="selectworkout" onBackPress={() => navigation.goBack?.()}/>
            <SectionTitle title={"Select Workout"} style={{paddingVertical: 16}}></SectionTitle>

            <View style={styles.container}>
                <View style={styles.searchWrap}>
                    <Ionicons name="search" size={18} color={THEME.dim}/>
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search"
                        placeholderTextColor={THEME.dim}
                        style={styles.searchInput}
                    />
                </View>

                {/* list header row */}
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderText}>Workouts</Text>
                    <Text style={styles.listHeaderCount}>
                        Selected Workouts ( {selected.size} )
                    </Text>
                </View>

                {/* list */}
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{paddingBottom: 110}}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {/* bottom done */}
            <View style={styles.bottom}>
                <TouchableOpacity activeOpacity={0.9} onPress={onDone}>
                    <LinearGradient
                        colors={COLORS.gradient}
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 0.5}}
                        style={styles.doneBtn}
                    >
                        <Text style={styles.doneText}>Done</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <ActionModal
                visible={active}
                onClose={() => setActive(false)}
                actions={actions}
                gradientColors={COLORS.gradient}
            />
        </SafeAreaView>
    );
}

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
    header: {paddingTop: 8, paddingBottom: 10},
    headerBar: {
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    brand: {color: "#fff", fontWeight: "900", fontSize: 18, letterSpacing: 1},
    discard: {color: "#fff", fontWeight: "700"},

    container: {flex: 1, paddingHorizontal: 14},

    sectionTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },
    sectionTitle: {color: THEME.text, fontWeight: "700"},
    hairline: {flex: 1, height: 2, backgroundColor: THEME.stroke, opacity: 0.6, borderRadius: 2},

    searchWrap: {
        height: 42,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: THEME.stroke,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 14,
    },
    searchInput: {flex: 1, color: THEME.text},

    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        paddingHorizontal: 2,
    },
    listHeaderText: {color: THEME.text, fontWeight: "700"},
    listHeaderCount: {color: THEME.dim},

    cardWrap: {borderRadius: 14, padding: 1.5, marginBottom: 12},
    card: {
        flexDirection: "row",
        gap: 12,
        padding: 10,
        borderRadius: 14,
        backgroundColor: THEME.card,
        borderWidth: 1,
        borderColor: "rgba(124,91,242,0.28)",
        alignItems: "flex-start",
    },
    thumb: {width: 110, height: 82, borderRadius: 10, backgroundColor: "#111"},

    cardTitle: {color: THEME.text, fontWeight: "800", fontSize: 15, flex: 1},
    cardDesc: {color: THEME.dim, fontSize: 12, marginTop: 4},

    metaRow: {flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6},
    metaChip: {flexDirection: "row", alignItems: "center", gap: 6},
    metaText: {color: THEME.dim, fontSize: 12},
    metaDot: {width: 4, height: 4, borderRadius: 2, backgroundColor: THEME.dim, opacity: 0.6},

    actionsRow: {flexDirection: "row", gap: 10, marginTop: 10},
    readBtn: {
        height: 30,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
    },
    readText: {color: THEME.text, fontWeight: "700", fontSize: 12},

    addBtn: {
        height: 30,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },
    addText: {color: "#fff", fontWeight: "800", fontSize: 12, paddingHorizontal: 20},

    bottom: {position: "absolute", left: 14, right: 14, bottom: 14},
    doneBtn: {
        height: 46,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },
    doneText: {color: "#fff", fontWeight: "800"},
});
