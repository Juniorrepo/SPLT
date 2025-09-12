
import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {LinearGradient} from "expo-linear-gradient";
import TopBar from "../../../common/TopBar";
import COLORS from "../../../../constants/Colors";
import SectionTitle from "../../../Track/SectionTitle";
import AllGroupsModal from "./AllGroupsModal";
import SortByModal from "../../../common/SortByModal";
import AddSelectedBar from "../../../common/AddSelectBar";

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.7)",
    stroke: "#2B2340",
    card: "rgba(255,255,255,0.06)",
};
const THUMB =
    "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=640";

/* -------------------------------- Screen -------------------------------- */

export default function SelectExerciseScreen({navigation, route}) {
    const all = useMemo(
        () =>
            Array.from({length: 6}).map((_, i) => ({
                id: `ex-${i + 1}`, // ✅ fix
                name: "Ab Scissors",
                muscle: i % 2 ? "Quadriceps" : "Abs", // give some variety
                img: THUMB,
                isCustom: i < 3,
                group: i % 2 === 0 ? "A" : "B",
            })),
        []
    );

    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(new Set());

    // NEW: multi-select muscles via modal
    const [muscleModal, setMuscleModal] = useState(false);
    const [muscles, setMuscles] = useState([]); // e.g. ["Abs","Quadriceps"]
    const muscleLabel = muscles.length === 0 ? "All Muscles" : muscles.length === 1 ? muscles[0] : `${muscles.length} selected`;

    const [equip, setEquip] = useState("All Equipment");
    const [sort, setSort] = useState("Default");
    const [sortSheet, setSortSheet] = useState(false);
    const [sortValue, setSortValue] = useState("popularity");

    const filtered = useMemo(() => {
        let list = [...all];

        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(
                (e) => e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q)
            );
        }

        if (muscles.length > 0) {
            const set = new Set(muscles);
            list = list.filter((e) => set.has(e.muscle));
        }

        if (equip !== "All Equipment") {
        }

        if (sortValue === "alpha") list.sort((a, b) => a.name.localeCompare(b.name));

        return list;
    }, [all, query, muscles, equip, sort]);

    const customs = filtered.filter((e) => e.isCustom);
    const splits = filtered.filter((e) => !e.isCustom);

    const toggle = (id) => {
        const n = new Set(selected);
        n.has(id) ? n.delete(id) : n.add(id);
        setSelected(n);
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
            <TopBar variant="selectworkout" onBackPress={() => navigation.goBack()}/>
            <SectionTitle title={"Select Exercise"} style={{paddingVertical: 16}}/>

            {/* Search */}
            <View style={styles.searchWrap}>
                <Ionicons name="search" size={18} color={THEME.dim} style={{marginRight: 8}}/>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={THEME.dim}
                    value={query}
                    onChangeText={setQuery}
                    style={styles.searchInput}
                    returnKeyType="search"
                />
            </View>

            {/* Filter pills */}
            <View style={styles.pillsRow}>
                <FilterPill label={muscleLabel} onPress={() => setMuscleModal(true)}/>
                <FilterPill
                    label={equip}
                    onPress={() => setEquip((e) => (e === "All Equipment" ? "Bodyweight" : "All Equipment"))}
                />
                <FilterPill
                    label={"Sort By"}
                    onPress={() => setSortSheet(true)}
                />
            </View>

            <ScrollView contentContainerStyle={{paddingBottom: 28}}>
                {/* Custom section */}
                <SectionHeader
                    title="Your custom exercises"
                    right={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation?.navigate?.("CreateExercise")}
                        >
                            <LinearGradient
                                colors={COLORS.gradient}
                                start={{x: 0, y: 0.5}}
                                end={{x: 1, y: 0.5}}
                                style={styles.createBtn}
                            >
                                <Text style={styles.createText}>Create exercise</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }
                />
                <View style={{paddingHorizontal: 16, gap: 12}}>
                    {customs.map((e) => (
                        <ExerciseRow
                            key={e.id}
                            title={e.name}
                            subtitle={e.muscle}
                            img={e.img}
                            selected={selected.has(e.id)}
                            onToggle={() => toggle(e.id)}
                        />
                    ))}
                    {customs.length === 0 && <EmptyRow/>}
                </View>

                {/* Split section */}
                <SectionHeader title="Split Exercises"/>
                <View style={{paddingHorizontal: 16, gap: 12}}>
                    {splits.map((e) => (
                        <ExerciseRow
                            key={e.id}
                            title={e.name}
                            subtitle={e.muscle}
                            img={e.img}
                            selected={selected.has(e.id)}
                            onToggle={() => toggle(e.id)}
                        />
                    ))}
                    {splits.length === 0 && <EmptyRow/>}
                </View>
            </ScrollView>

            <AllGroupsModal
                visible={muscleModal}
                title="Muscle Group"
                groups={[
                    {id: "Abs", label: "Abs", subtitle: "Core", thumb: THUMB},
                    {id: "Quadriceps", label: "Quadriceps", subtitle: "Legs", thumb: THUMB},
                    {id: "Hamstrings", label: "Hamstrings", subtitle: "Legs", thumb: THUMB},
                    {id: "Glutes", label: "Glutes", subtitle: "Legs", thumb: THUMB},
                    {id: "Back", label: "Back", subtitle: "Upper", thumb: THUMB},
                    {id: "Biceps", label: "Biceps", subtitle: "Upper", thumb: THUMB},
                    {id: "Triceps", label: "Triceps", subtitle: "Upper", thumb: THUMB},
                    {id: "Shoulders", label: "Shoulders", subtitle: "Upper", thumb: THUMB},
                    {id: "Calves", label: "Calves", subtitle: "Upper", thumb: THUMB},
                    {id: "Chest", label: "Chest", subtitle: "Upper", thumb: THUMB},
                ]}
                selected={muscles}
                onClose={() => setMuscleModal(false)}
                onApply={(picked) => {
                    setMuscles(picked);
                    setMuscleModal(false);
                }}
                gradient={COLORS.gradient}
            />

            <SortByModal
                visible={sortSheet}
                value={sortValue}
                onChange={(val) => {
                    setSortValue(val);
                    setSort(val === "alpha" ? "A → Z" : "Popularity");
                    setSortSheet(false);
                }}
                onClose={() => setSortSheet(false)}
            />

            <AddSelectedBar
                count={selected.size}
                onPress={() => {
                    const chosen = all.filter((e) => selected.has(e.id));
                    navigation.navigate("CreateWorkout", {
                        initialExercises: chosen,
                        workoutName: "",
                    });
                }}
                gradient={COLORS.gradient}
            />
        </SafeAreaView>
    );
}

/* ---------------- components ---------------- */

function FilterPill({label, onPress}) {
    return (
        <LinearGradient
            colors={["#B57FE6", "#6645AB"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.pill}
        >
            <Pressable onPress={onPress}>
                <Text style={styles.pillText}>{label}</Text>
            </Pressable>
        </LinearGradient>
    );
}

function SectionHeader({title, right}) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {right}
        </View>
    );
}

function EmptyRow() {
    return (
        <View style={{padding: 16, alignItems: "center", opacity: 0.6}}>
            <Text style={{color: THEME.dim}}>No items</Text>
        </View>
    );
}

function ExerciseRow({img, title, subtitle, selected, onToggle}) {
    return (
        <LinearGradient
            colors={COLORS.gradient}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.borderWrap}
        >
            <View style={styles.card}>
                <View style={{flexDirection: "row", alignItems: "center", flex: 1}}>
                    <Image source={{uri: img}} style={styles.thumb}/>
                    <View style={{flex: 1}}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                            {title}
                        </Text>
                        <Text style={styles.cardSub}>{subtitle}</Text>
                    </View>
                </View>

                <Pressable onPress={onToggle} hitSlop={10} style={{marginLeft: 10}}>
                    <View style={[styles.checkbox, selected && styles.checkboxChecked]}>
                        {selected && <Ionicons name="checkmark" size={16} color="#fff"/>}
                    </View>
                </Pressable>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerWrap: {
        paddingTop: 8,
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    header: {color: THEME.text, fontSize: 18, fontWeight: "700", marginVertical: 6},
    rule: {height: 2, width: "100%", opacity: 0.25, borderRadius: 2},

    searchWrap: {
        marginHorizontal: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
        backgroundColor: THEME.card,
    },
    searchInput: {flex: 1, color: THEME.text, fontSize: 14},

    pillsRow: {flexDirection: "row", gap: 12, paddingHorizontal: 20, marginBottom: 14},
    pill: {
        paddingHorizontal: 14,
        height: 32,
        width: 114,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: THEME.stroke,
        backgroundColor: "rgba(255,255,255,0.05)",
    },
    pillText: {color: THEME.text, fontWeight: "600", fontSize: 12.5},

    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingTop: 20,
        paddingBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sectionTitle: {color: THEME.text, opacity: 0.9, fontWeight: "600"},

    createBtn: {
        height: 35,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    createText: {color: THEME.text, fontSize: 12, fontWeight: "700"},

    borderWrap: {
        borderRadius: 8,
        padding: 1.5,
        shadowColor: COLORS.secondary,
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        elevation: 8,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        padding: 8,
        backgroundColor: COLORS.background,
        borderColor: "rgba(124,91,242,0.28)",
    },
    thumb: {width: 52, height: 52, borderRadius: 8, marginRight: 12, backgroundColor: "#1b1623"},
    cardTitle: {color: THEME.text, fontSize: 15, fontWeight: "700"},
    cardSub: {color: THEME.dim, marginTop: 2, fontSize: 12},

    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#6C4AB0",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    checkboxChecked: {borderColor: "transparent", backgroundColor: "#6C4AB0"},

    bottomBar: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
        backgroundColor: THEME.bg,
    },
    primaryBtn: {
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },
    primaryText: {color: THEME.text, fontWeight: "700"},
});
