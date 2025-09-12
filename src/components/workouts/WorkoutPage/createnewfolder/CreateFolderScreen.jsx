import React, {useCallback, useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Pressable,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import TopBar from "../../../common/TopBar";
import COLORS from "../../../../constants/Colors";

import BeginnerSvg from "../../../../assets/images/icons/beginner.svg";
import IntermediateSvg from "../../../../assets/images/icons/intermediate.svg";
import AdvancedSvg from "../../../../assets/images/icons/advanced.svg";
import KillerSvg from "../../../../assets/images/icons/dumbbell-ray.svg";

import Build from "../../../../assets/images/icons/build.svg";
import Gain from "../../../../assets/images/icons/gain.svg";
import Cutting from "../../../../assets/images/icons/cutting.svg";
import Fundamentals from "../../../../assets/images/icons/fundamentals.svg";
import Sport from "../../../../assets/images/icons/sport.svg";
import Conditioning from "../../../../assets/images/icons/conditioning.svg";

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.7)",
    stroke: "rgba(124,91,242,0.35)",
    card: "rgba(255,255,255,0.06)",
};

export default function CreateFolderScreen({navigation}) {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const levels = useMemo(
        () => ([
            {key: "beginner", label: "Beginner", Icon: BeginnerSvg},
            {key: "intermediate", label: "Intermediate", Icon: IntermediateSvg},
            {key: "advanced", label: "Advanced", Icon: AdvancedSvg},
            {key: "killer", label: "killer", Icon: KillerSvg},
        ]),
        []
    );

    const [level, setLevel] = useState("beginner");

    const [days, setDays] = useState(3);
    const [duration, setDuration] = useState(1);

    // NEW: Goal options (icons chosen from Ionicons set)
    const goals = useMemo(
        () => [
            {key: "build_muscle", label: "Build Muscle", Icon: Build},
            {key: "gain_strength", label: "Gain Strength", Icon: Gain},
            {key: "cutting", label: "Cutting", Icon: Cutting},
            {key: "fundamentals", label: "Fundamentals", Icon: Fundamentals},
            {key: "sport", label: "Sport", Icon: Sport},
            {key: "conditioning", label: "Conditioning", Icon: Conditioning},
        ],
        []
    );
    const [goal, setGoal] = useState("cutting"); // default selected as in screenshot

    const pickImage = useCallback(async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "We need access to your photos to upload a picture.");
            return;
        }
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.9,
        });
        if (!res.canceled) setImage(res.assets[0].uri);
    }, []);

    const onSave = () => {
        const payload = {
            image,
            name: name.trim(),
            description: desc.trim(),
            level,
            daysPerWeek: days,
            durationMonths: duration,
            goal,
        };
        console.log("CREATE FOLDER", payload);
        navigation.navigate("SelectWorkout");
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
            <TopBar variant="createfolder" onBackPress={() => navigation.goBack?.()}/>

            <ScrollView contentContainerStyle={{paddingBottom: 28}}>
                {/* Picture */}
                <View style={styles.pictureWrap}>
                    <Pressable onPress={pickImage} style={styles.picPress}>
                        {image ? (
                            <Image source={{uri: image}} style={styles.preview}/>
                        ) : (
                            <View style={styles.picBorder}>
                                <View style={styles.picInner}>
                                    <Ionicons name="image" size={42} color={COLORS.primary}/>
                                </View>
                            </View>
                        )}
                    </Pressable>
                    <Text style={styles.addPictureText}>Add Picture</Text>
                </View>

                {/* Form */}
                <View style={{paddingHorizontal: 16}}>
                    {/* Folder Name */}
                    <Text style={styles.labelStrong}>Folder Name :</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Name"
                            placeholderTextColor={THEME.dim}
                            style={styles.input}
                        />
                    </View>

                    {/* Description */}
                    <Text style={styles.labelMuted}>
                        Description <Text style={{opacity: 0.7}}>(optional)</Text>
                    </Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            value={desc}
                            onChangeText={setDesc}
                            placeholder="Name"
                            placeholderTextColor={THEME.dim}
                            style={styles.input}
                        />
                    </View>

                    {/* Level */}
                    <Text style={[styles.labelStrong, {marginTop: 12}]}>Level</Text>
                    <View style={styles.levelRow}>
                        {levels.map(l => (
                            <LevelTile
                                key={l.key}
                                label={l.label}
                                Icon={l.Icon}
                                selected={level === l.key}
                                onPress={() => setLevel(l.key)}
                            />
                        ))}
                    </View>

                    {/* Days Per Week */}
                    <Text style={[styles.labelStrong, {marginTop: 12}]}>Days Per Week</Text>
                    <PillRow values={[1, 2, 3, 4, 5, 6, 7]} value={days} onChange={setDays}/>

                    {/* Duration */}
                    <Text style={[styles.labelStrong, {marginTop: 12}]}>
                        Duration <Text style={styles.smallMuted}>(months)</Text>
                    </Text>
                    <PillRow values={[1, 2, 3, 4, 5, 6, 7]} value={duration} onChange={setDuration}/>

                    {/* NEW: Goal Grid */}
                    <Text style={[styles.labelStrong, {marginTop: 12}]}>Goal</Text>
                    <GoalGrid
                        items={goals}
                        value={goal}
                        onChange={setGoal}
                        gradient={COLORS.gradient}
                    />

                    {/* Save button */}
                    <View style={{paddingVertical: 22}}>
                        <TouchableOpacity activeOpacity={0.9} onPress={onSave}>
                            <LinearGradient colors={COLORS.gradient} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                                            style={styles.primaryBtn}>
                                <Text style={styles.primaryText}>Save</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------------- components ---------------- */

function LevelTile({ label, Icon, selected, onPress }) {
    return (
        <Pressable onPress={onPress} style={{ alignItems: "center" }}>
            <LinearGradient
                colors={selected ? ["#B57FE6", "#6645AB"] : ["transparent", "transparent"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.tileBorder, selected && { shadowColor: "#7C5BF2", shadowOpacity: 0.45, shadowRadius: 12, shadowOffset: { width:0, height:6 }, elevation: 8 }]}
            >
                <View style={[styles.tile, selected ? styles.tileSelected : styles.tileDefault]}>
                    <Icon width={28} height={28} />
                </View>
            </LinearGradient>
            <Text style={[styles.tileLabel, selected && { opacity: 1 }]} numberOfLines={1}>
                {label}
            </Text>
        </Pressable>
    );
}

function PillRow({values, value, onChange}) {
    return (
        <View style={styles.pillRow}>
            {values.map(v => {
                const sel = value === v;
                return (
                    <Pressable key={v} onPress={() => onChange(v)} style={{borderRadius: 999}}>
                        <LinearGradient
                            colors={sel ? ["#B57FE6", "#6645AB"] : ["transparent", "transparent"]}
                            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                            style={styles.pillOuter}
                        >
                            <View style={[styles.pill, sel ? styles.pillSel : styles.pillDef]}>
                                <Text style={[styles.pillText, sel && {color: "#fff"}]}>{v}</Text>
                            </View>
                        </LinearGradient>
                    </Pressable>
                );
            })}
        </View>
    );
}

function GoalGrid({ items, value, onChange, gradient }) {
    return (
        <View style={styles.goalGrid}>
            {items.map(({ key, label, Icon }) => {
                const selected = value === key;
                const tint = selected ? "#FFFFFF" : "#B57FE6";
                return (
                    <Pressable key={key} onPress={() => onChange(key)} style={{ width: "48%" }}>
                        <LinearGradient
                            colors={selected ? gradient : ["transparent", "transparent"]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.goalCardOuter}
                        >
                            <View style={[styles.goalCard, selected ? styles.goalCardSel : styles.goalCardDef]}>
                                <Icon width={50} height={50} color={tint} />
                                <Text style={[styles.goalText, selected && { color: "#fff" }]} numberOfLines={1}>
                                    {label}
                                </Text>
                            </View>
                        </LinearGradient>
                    </Pressable>
                );
            })}
        </View>
    );
}
/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
    pictureWrap: {alignItems: "center", paddingTop: 18, paddingBottom: 12},
    picPress: {width: 180, height: 180},
    picBorder: {flex: 1, borderRadius: 8, padding: 1.5},
    picInner: {
        flex: 1, borderRadius: 8, borderWidth: 1, borderColor: "rgba(124,91,242,0.35)",
        backgroundColor: "transparent", alignItems: "center", justifyContent: "center",
    },
    preview: {width: 180, height: 180, borderRadius: 8},
    addPictureText: {marginTop: 8, color: THEME.dim, fontWeight: "600"},

    labelStrong: {color: THEME.text, fontWeight: "400", marginTop: 6, marginBottom: 6},
    labelMuted: {color: THEME.text, fontWeight: "400", marginTop: 6, marginBottom: 6, opacity: 0.95},
    smallMuted: {fontSize: 12, color: THEME.dim},

    inputWrap: {
        height: 46,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: THEME.stroke,
        backgroundColor: "transparent",
        marginBottom: 10,
        justifyContent: "center",
        paddingHorizontal: 12,
    },
    input: {color: THEME.text, fontSize: 14},

    levelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
        marginBottom: 8,
    },
    tileBorder: {borderRadius: 12, padding: 1.5, marginBottom: 6},
    tile: {
        width: 72, height: 72, borderRadius: 12,
        borderWidth: 1,
        alignItems: "center", justifyContent: "center",
    },
    tileDefault: {backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.16)"},
    tileSelected: {backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.22)"},
    tileLabel: {color: THEME.text, opacity: 0.9, textAlign: "center", width: 80},

    pillRow: {flexDirection: "row", justifyContent: "space-between", gap: 10, marginBottom: 8},
    pillOuter: {padding: 1.2, borderRadius: 999},
    pill: {
        width: 42, height: 30, borderRadius: 16,
        alignItems: "center", justifyContent: "center",
        borderWidth: 1,
    },
    pillDef: {backgroundColor: "transparent", borderColor: "rgba(124,91,242,0.35)"},
    pillSel: {backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.18)"},
    pillText: {color: THEME.text, fontWeight: "700"},

    /* Goal grid styles */
    goalGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 12,
        marginTop: 6,
    },
    goalCardOuter: {borderRadius: 14, padding: 1.5},
    goalCard: {
        height: 130,
        borderRadius: 14,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        borderWidth: 1,
    },
    goalCardDef: {backgroundColor: "transparent", borderColor: "rgba(124,91,242,0.35)", borderWidth: 2},
    goalCardSel: {backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.22)"},
    goalText: {color: THEME.text, fontWeight: "700"},

    primaryBtn: {
        height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "rgba(255,255,255,0.18)",
    },
    primaryText: {color: THEME.text, fontWeight: "700"},
});
