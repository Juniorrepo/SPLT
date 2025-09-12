// screens/StartedWorkoutPage.js
import React, {useEffect, useRef, useState} from "react";
import {
    View, Text, StyleSheet, SafeAreaView, Pressable, Image,
    TextInput, Alert, ScrollView, Modal, Dimensions
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";

import COLORS from "../../../constants/Colors";
import SectionTitle from "../../Track/SectionTitle";

import RestTimerModal from "./RestTimerModal";
import DurationPickerSheet from "./DurationPickerSheet";

const PLACEHOLDER = require("../../../assets/images/home/workout-placeholder.png");
const {width: SW, height: SH} = Dimensions.get("window");

const INITIAL_WORKOUT = {
    name: "Leg Day",
    stats: {volume: "20kg", sets: 12, pr: 5, duration: "1h : 0s"},
    timerSec: 0,
    timerRunning: false,
    exercises: [
        {
            id: "leg-extension",
            name: "Leg Extension",
            image: PLACEHOLDER,
            notes: "",
            sets: [
                {id: "w", warmup: true, tag: "W", prev: "0 Kg X 100", kg: "0", reps: "100", done: false},
                {id: "1", prev: "0 Kg X 100", kg: "100", reps: "100", done: false},
                {id: "2", prev: "-", kg: "100", reps: "100", done: false},
            ],
        },
        {
            id: "leg-curl",
            name: "Leg Curl",
            image: PLACEHOLDER,
            notes: "",
            sets: [{id: "1", prev: "0 Kg X 100", kg: "100", reps: "100", done: false}]
        },
        {id: "leg-press", name: "Leg Press", image: PLACEHOLDER, notes: "", sets: []},
    ],
};

export default function StartedWorkoutPage({navigation}) {
    const [workout, setWorkout] = useState(INITIAL_WORKOUT);

    // header stopwatch
    const tick = useRef(null);
    useEffect(() => {
        if (!workout.timerRunning) return;
        tick.current = setInterval(() => {
            setWorkout((w) => ({...w, timerSec: w.timerSec + 1}));
        }, 1000);
        return () => clearInterval(tick.current);
    }, [workout.timerRunning]);
    const toggleTopTimer = () => setWorkout((w) => ({...w, timerRunning: !w.timerRunning}));
    const resetTopTimer = () => setWorkout((w) => ({...w, timerSec: 0, timerRunning: false}));

    // rest timer components
    const [restVisible, setRestVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [presetSec, setPresetSec] = useState(120);

    const legCurl = workout.exercises.find((e) => e.id === "leg-curl");
    const legPress = workout.exercises.find((e) => e.id === "leg-press");

    // sets helpers
    const updateSet = (exerciseId, setId, patch) => {
        setWorkout((w) => ({
            ...w,
            exercises: w.exercises.map((ex) =>
                ex.id !== exerciseId
                    ? ex
                    : {...ex, sets: ex.sets.map((s) => (s.id === setId ? {...s, ...patch} : s))}
            ),
        }));
    };
    const addSet = (exerciseId) => {
        setWorkout((w) => ({
            ...w,
            exercises: w.exercises.map((ex) =>
                ex.id !== exerciseId
                    ? ex
                    : {
                        ...ex,
                        sets: [
                            ...ex.sets,
                            {
                                id: String(ex.sets.filter((s) => !s.warmup).length + 1),
                                prev: "-",
                                kg: "",
                                reps: "",
                                done: false
                            },
                        ],
                    }
            ),
        }));
    };
    const deleteSet = (exerciseId, setId) => {
        setWorkout((w) => ({
            ...w,
            exercises: w.exercises.map((ex) =>
                ex.id !== exerciseId ? ex : {...ex, sets: ex.sets.filter((s) => s.id !== setId)}
            ),
        }));
    };
    const onFinish = () => {
        const totalSetsDone = workout.exercises.flatMap((e) => e.sets).filter((s) => s.done).length;
        Alert.alert("Finish workout?", `Completed sets: ${totalSetsDone}`);
    };

    return (
        <SafeAreaView style={styles.safe}>
            {/* HEADER */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
                    <Ionicons name="arrow-back" style={styles.backArrow}/>
                </Pressable>
                <View style={styles.headerStats}>
                    <Metric icon="barbell-outline" label="Volume" value={workout.stats.volume}/>
                    <Metric icon="flame" label="Sets" value={String(workout.stats.sets)}/>
                    <Metric icon="trophy-outline" label="PR" value={String(workout.stats.pr)}/>
                    <Metric icon="time-outline" label="Duration" value={workout.stats.duration}/>
                </View>
                <View style={{width: 18}}/>
            </View>

            <SectionTitle title={workout.name} style={{paddingVertical: 20}}/>

            <ScrollView contentContainerStyle={{paddingBottom: 24}} showsVerticalScrollIndicator={false}>
                {/* Row: preset pill + timer modal + header stopwatch */}
                <View style={styles.topRow}>
                    <View style={{flexDirection: "row", gap: 8, alignItems: "center"}}>
                        <Pressable onPress={() => setPickerVisible(true)} style={styles.presetPill}>
                            <Ionicons name="time-outline" size={14} color="#E9E3FF"/>
                            <Text style={styles.presetPillText}>{formatMMSS(presetSec)}</Text>
                        </Pressable>

                        <Pressable onPress={() => setRestVisible(true)} style={styles.timerBtnSmall}>
                            <Text style={styles.timerBtnSmallText}>Timer</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={toggleTopTimer}
                        onLongPress={resetTopTimer}
                        delayLongPress={350}
                        style={({pressed}) => [styles.timerBtn, pressed && {opacity: 0.9}]}
                    >
                        <Ionicons name="stopwatch-outline" size={17} color="#FFFFFF"/>
                        <Text style={styles.timerText}>{formatMMSS(workout.timerSec)}</Text>
                        <Text style={[styles.timerText, {opacity: 0.7}]}>
                            {workout.timerRunning ? " (pause)" : " (start)"}
                        </Text>
                    </Pressable>

                    <Pressable onPress={onFinish} style={styles.finishWrapper}>
                        <LinearGradient colors={["#6645AB", "#6645AB"]} style={styles.finishBtn}>
                            <Text style={styles.finishText}>Finish</Text>
                        </LinearGradient>
                    </Pressable>
                </View>

                {/* Main card */}
                <ExerciseCard
                    exercise={workout.exercises[0]}
                    onChangeSet={updateSet}
                    onAddSet={addSet}
                    onDeleteSet={deleteSet}
                />

                {/* Superset */}
                <Text style={styles.superTitle}>
                    Super Set <Ionicons name="flame-outline" size={12} color="#fff"/>
                </Text>
                <View style={styles.supersetDashed}>
                    <ExerciseCard
                        exercise={legCurl}
                        onChangeSet={updateSet}
                        onAddSet={addSet}
                        onDeleteSet={deleteSet}
                        nested
                    />
                    <LinearGradient colors={["#2B2235", "#2D233B", "#3B2B56"]} start={{x: 0, y: 0.3}}
                                    end={{x: 1, y: 0.7}} style={styles.previewCard}>
                        <View style={styles.previewRow}>
                            <Image source={legPress.image} style={styles.thumb}/>
                            <Text style={styles.previewTitle}>{legPress.name}</Text>
                            <Text style={styles.kebab}>⋮</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Footer */}
                <Pressable onPress={()=>navigation.navigate('PostWorkoutCongrats')} style={styles.footerBtn}>
                    <LinearGradient colors={["#6645AB", "#6645AB"]} style={styles.footerBtnInner}>
                        <Text style={styles.footerBtnText}>Finish workout</Text>
                    </LinearGradient>
                </Pressable>
                <Pressable onPress={() => Alert.alert("Add Exercise")} style={styles.footerGhost}>
                    <Text style={styles.footerGhostText}>Add Exercise</Text>
                </Pressable>
            </ScrollView>

            {/* Components */}
            <RestTimerModal
                visible={restVisible}
                onClose={() => setRestVisible(false)}
                presetSec={presetSec}
                onOpenPicker={() => setPickerVisible(true)}
            />
            <DurationPickerSheet
                visible={pickerVisible}
                initialSec={presetSec}
                onClose={() => setPickerVisible(false)}
                onSelect={(sec) => {
                    setPresetSec(sec);
                    setPickerVisible(false);
                }}
            />
        </SafeAreaView>
    );
}

/* ---------- Small components used in-page ---------- */

function Metric({icon, label, value}) {
    return (
        <View style={styles.statItem}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
                <Ionicons name={icon} size={16} color="#F2F1F6"/>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );
}

function TinyCheck({value, onToggle}) {
    return (
        <Pressable onPress={onToggle} hitSlop={8} style={[styles.tinyBox, value && styles.tinyBoxOn]}>
            {value ? <View style={styles.tinyDot}/> : null}
        </Pressable>
    );
}

function ExerciseCard({exercise, onChangeSet, onAddSet, onDeleteSet, nested = false}) {
    const [menu, setMenu] = useState({visible: false, x: 0, y: 0, exerciseId: null, setId: null});

    const openMenu = (e, setId) => {
        const {pageX, pageY} = e.nativeEvent;
        setMenu({visible: true, x: pageX, y: pageY, exerciseId: exercise.id, setId});
    };
    const closeMenu = () => setMenu((m) => ({...m, visible: false}));
    const handleSelectType = (key) => {
        onChangeSet(menu.exerciseId, menu.setId, {tag: key, warmup: key === "W"});
        closeMenu();
    };

    return (
        <View style={[styles.exerciseBlock, nested && {marginHorizontal: 0, marginBottom: 14}]}>
            <LinearGradient colors={["#6645AB33", "#FFFFFF00"]} style={styles.exerciseHeader}>
                <View style={styles.exerciseHeaderRow}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 12}}>
                        <Image source={exercise.image} style={styles.thumb}/>
                        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                    </View>
                    <Text style={styles.kebab}>⋮</Text>
                </View>
            </LinearGradient>

            <TextInput placeholder="Add notes here" placeholderTextColor="rgba(255,255,255,0.6)" style={styles.notes}/>
            <View style={styles.hr}/>
            <View style={{flexDirection: "row", marginBottom: 16, alignItems: "center", gap: 6}}>
                <Ionicons name="time-outline" size={16} color="#F2F1F6"/>
                <Text style={styles.statLabel}> Rest Timer : 00 : 00</Text>
            </View>

            {/* header */}
            <View style={styles.setHeader}>
                <View style={styles.headerSets}><Text style={styles.setHeaderLabel}>Sets</Text></View>
                <View style={styles.headerPrevious}><Text style={styles.setHeaderLabel}>Previous</Text></View>
                <View style={styles.headerKg}><Text style={styles.setHeaderLabel}>Kg</Text></View>
                <View style={styles.headerReps}><Text style={styles.setHeaderLabel}>Reps</Text></View>
                <View style={styles.headerTiny}/>
            </View>

            {exercise.sets.map((s) => {
                const label = s.tag ? s.tag : s.warmup ? "W" : s.id;
                const labelColor =
                    s.tag === "W" || s.warmup ? "#F8E36E" : s.tag === "D" ? "#7B61FF" : s.tag === "F" ? "#FF5C99" : "#FFFFFF";

                return (
                    <View key={s.id} style={styles.setRow}>
                        <View style={styles.setBadgeWrap}>
                            <Pressable onPressIn={(e) => openMenu(e, s.id)}
                                       style={[styles.badge, s.warmup && styles.badgeWarmup]}>
                                <Text style={[styles.badgeText, {color: labelColor}]}>{label}</Text>
                            </Pressable>
                        </View>

                        <View style={styles.prevCell}><Text style={styles.prevText}>{s.prev}</Text></View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} keyboardType="numeric" value={s.kg}
                                       onChangeText={(t) => onChangeSet(exercise.id, s.id, {kg: t})}
                                       placeholder="0" placeholderTextColor="rgba(255,255,255,0.5)"/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} keyboardType="numeric" value={s.reps}
                                       onChangeText={(t) => onChangeSet(exercise.id, s.id, {reps: t})}
                                       placeholder="0" placeholderTextColor="rgba(255,255,255,0.5)"/>
                        </View>

                        <View style={styles.tinyWrap}>
                            <TinyCheck value={s.done} onToggle={() => onChangeSet(exercise.id, s.id, {done: !s.done})}/>
                        </View>

                        {!s.warmup && (
                            <View style={styles.deleteContainer}>
                                <Pressable onPress={() => onDeleteSet(exercise.id, s.id)} style={styles.deleteBtn}>
                                    <Text style={styles.deleteText}>Delete</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                );
            })}

            <Pressable onPress={() => onAddSet(exercise.id)} style={styles.addSetBtn}>
                <Text style={styles.addSetText}>Add set</Text>
            </Pressable>

            <SetTypeMenu visible={menu.visible} x={menu.x} y={menu.y} onClose={closeMenu} onSelect={handleSelectType}/>
        </View>
    );
}

function SetTypeMenu({visible, x, y, onClose, onSelect}) {
    const MENU_W = 220;
    const MENU_H = 150;
    const left = Math.min(Math.max(x - (MENU_W + 14), 8), SW - MENU_W - 8);
    const top = Math.min(Math.max(y - MENU_H / 2, 8), SH - MENU_H - 8);

    const options = [
        {key: "W", label: "Warm up", color: "#F8E36E"},
        {key: "D", label: "Drop set", color: "#7B61FF"},
        {key: "F", label: "Failure", color: "#FF5C99"},
    ];

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.menuBackdrop} onPress={onClose}>
                <View style={[styles.menuWrap, {top, left, width: MENU_W}]}>
                    <LinearGradient colors={["#3B2B56", "#1A152A"]} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                    style={styles.menuCard}>
                        {options.map((opt, idx) => (
                            <Pressable key={opt.key} onPress={() => onSelect(opt.key)}
                                       style={[styles.menuItem, idx !== options.length - 1 && styles.menuItemDivider]}>
                                <Text style={[styles.menuKey, {color: opt.color}]}>{opt.key}</Text>
                                <Text style={styles.menuLabel}>{opt.label}</Text>
                            </Pressable>
                        ))}
                    </LinearGradient>
                </View>
            </Pressable>
        </Modal>
    );
}

/* ---------- Utils & Styles ---------- */

const formatMMSS = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m} : ${s}`;
};

const RADIUS = 14;
const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: COLORS.background},
    header: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#363636"
    },
    backArrow: {color: "white", fontSize: 25, paddingHorizontal: 2},
    headerStats: {flexDirection: "row", alignItems: "center"},
    statItem: {alignItems: "center", paddingHorizontal: 14},
    statLabel: {color: "#FFFFFF", fontSize: 13, fontWeight: "500"},
    statValue: {color: "#FFFFFF", fontWeight: "300", marginTop: 2},

    topRow: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14
    },
    presetPill: {
        borderWidth: 1,
        borderColor: "#6B5AAE",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    presetPillText: {color: "#E9E3FF", fontWeight: "700", fontSize: 12},
    timerBtnSmall: {
        backgroundColor: "#2A2140",
        borderWidth: 1,
        borderColor: "#3A2E62",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8
    },
    timerBtnSmallText: {color: "#E9E3FF", fontWeight: "700", fontSize: 12},

    timerBtn: {
        borderWidth: 1,
        borderColor: "#6B5AAE",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    timerText: {color: "white", fontWeight: "700"},

    finishWrapper: {borderRadius: 6, overflow: "hidden"},
    finishBtn: {paddingHorizontal: 18, paddingVertical: 10, borderRadius: 6},
    finishText: {color: "white", fontWeight: "700"},

    exerciseBlock: {marginHorizontal: 16, marginBottom: 22},
    exerciseHeader: {borderRadius: RADIUS, overflow: "hidden"},
    exerciseHeaderRow: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    exerciseTitle: {color: "white", fontWeight: "700", fontSize: 16},
    thumb: {width: 50, height: 50, borderRadius: 5},
    kebab: {color: "rgba(255,255,255,0.8)", fontSize: 24},

    notes: {marginTop: 8, color: "white", paddingHorizontal: 12, paddingVertical: 8},
    hr: {height: 1, backgroundColor: "rgba(255,255,255,0.18)", marginVertical: 8},

    setHeader: {flexDirection: "row", alignItems: "center", marginBottom: 12},
    headerSets: {width: 46, alignItems: "center"},
    headerPrevious: {width: 120, alignItems: "center"},
    headerKg: {width: 78, alignItems: "center"},
    headerReps: {width: 78, alignItems: "center"},
    headerTiny: {width: 28, alignItems: "center"},
    setHeaderLabel: {color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: "600"},

    setRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: "#17161C",
        marginBottom: 8
    },
    setBadgeWrap: {width: 46, alignItems: "center"},
    badge: {
        minWidth: 28,
        height: 28,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: "#3C2F53",
        alignItems: "center",
        justifyContent: "center"
    },
    badgeWarmup: {backgroundColor: "#5A3E8F"},
    badgeText: {color: "white", fontWeight: "700", fontSize: 12},

    prevCell: {
        width: 120,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#4D3F73",
        backgroundColor: "#1A1A1A",
        alignItems: "center"
    },
    prevText: {color: "rgba(255,255,255,0.9)", fontSize: 13},

    inputContainer: {width: 78, alignItems: "center"},
    input: {
        width: 56,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#4D3F73",
        backgroundColor: "#1A1A1A",
        color: "white",
        textAlign: "center",
        fontSize: 14
    },

    tinyWrap: {width: 28, alignItems: "center"},
    tinyBox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#6B5AAE",
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center"
    },
    tinyBoxOn: {backgroundColor: "#6B5AAE"},
    tinyDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: "#1B1431"},

    deleteContainer: {marginLeft: 8},
    deleteBtn: {backgroundColor: "#DD2B2B", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6},
    deleteText: {color: "white", fontWeight: "700", fontSize: 12},

    addSetBtn: {
        alignSelf: "flex-start",
        marginTop: 12,
        backgroundColor: "#5F49C6",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8
    },
    addSetText: {color: "white", fontWeight: "700", fontSize: 14},

    superTitle: {color: "#FFFFFF", opacity: 0.9, fontSize: 12, paddingHorizontal: 16, marginBottom: 6},
    supersetDashed: {
        marginHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "rgba(123,87,242,0.4)",
        padding: 10
    },

    previewCard: {borderRadius: 14, overflow: "hidden", marginTop: 12},
    previewRow: {paddingHorizontal: 14, paddingVertical: 12, flexDirection: "row", alignItems: "center", gap: 12},
    previewTitle: {color: "white", fontWeight: "700", fontSize: 16, flex: 1},

    footerBtn: {marginTop: 18, marginHorizontal: 16, borderRadius: 12, overflow: "hidden"},
    footerBtnInner: {paddingVertical: 14, alignItems: "center", justifyContent: "center"},
    footerBtnText: {color: "#fff", fontWeight: "700", fontSize: 15},
    footerGhost: {
        marginTop: 10,
        marginHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2B2340",
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center"
    },
    footerGhostText: {color: "#fff", fontWeight: "700", fontSize: 15},

    // set-type popover
    menuBackdrop: {flex: 1, backgroundColor: "transparent"},
    menuWrap: {position: "absolute"},
    menuCard: {
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)"
    },
    menuItem: {flexDirection: "row", alignItems: "center", paddingVertical: 10, gap: 14},
    menuItemDivider: {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "rgba(255,255,255,0.15)"},
    menuKey: {width: 18, fontWeight: "700"},
    menuLabel: {color: "#FFFFFF", fontSize: 16},
});