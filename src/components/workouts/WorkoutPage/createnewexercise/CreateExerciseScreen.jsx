import React, {useMemo, useState, useCallback} from "react";
import {
    SafeAreaView, View, Text, StyleSheet, Image, TextInput,
    Pressable, TouchableOpacity, ScrollView, Alert
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import TopBar from "../../../common/TopBar";
import COLORS from "../../../../constants/Colors";
import AllGroupsModal from "../createnewworkout/AllGroupsModal";

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.7)",
    stroke: "rgba(124,91,242,0.35)",
    card: "rgba(255,255,255,0.06)",
};

// generic placeholders — replace with your own images or `require(...)`
const THUMBS = {
    dumbbell: "https://images.pexels.com/photos/949129/pexels-photo-949129.jpeg?auto=compress&w=256",
    barbell:  "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=256",
    kb:       "https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg?auto=compress&w=256",
    cable:    "https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&w=256",
    machine:  "https://images.pexels.com/photos/3838389/pexels-photo-3838389.jpeg?auto=compress&w=256",
    body:     "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&w=256",
    muscle:   "https://images.pexels.com/photos/4498601/pexels-photo-4498601.jpeg?auto=compress&w=256",
    type:     "https://images.pexels.com/photos/6550851/pexels-photo-6550851.jpeg?auto=compress&w=256",
};

export default function CreateExerciseScreen({navigation}) {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");

    const [equipment, setEquipment] = useState(null);
    const [primary, setPrimary] = useState(null);
    const [others, setOthers] = useState([]); // multi-select
    const [type, setType] = useState(null);

    // base option labels
    const EQUIPMENT = useMemo(() => ["Bodyweight", "Dumbbell", "Barbell", "Machine", "Kettlebell", "Cable"], []);
    const MUSCLES = useMemo(
        () => ["Abs", "Quadriceps", "Hamstrings", "Glutes", "Back", "Chest", "Shoulders", "Biceps", "Triceps", "Calves"],
        []
    );
    const TYPES = useMemo(() => ["Strength", "Hypertrophy", "Endurance", "Mobility"], []);

    // groups WITH thumbs (what the modal needs)
    const EQUIPMENT_GROUPS = useMemo(() => [
        {id:"Bodyweight", label:"Bodyweight", thumb: THUMBS.body},
        {id:"Dumbbell",   label:"Dumbbell",   thumb: THUMBS.dumbbell},
        {id:"Barbell",    label:"Barbell",    thumb: THUMBS.barbell},
        {id:"Machine",    label:"Machine",    thumb: THUMBS.machine},
        {id:"Kettlebell", label:"Kettlebell", thumb: THUMBS.kb},
        {id:"Cable",      label:"Cable",      thumb: THUMBS.cable},
    ], []);

    const MUSCLE_GROUPS = useMemo(
        () => MUSCLES.map(m => ({id: m, label: m, thumb: THUMBS.muscle})),
        [MUSCLES]
    );

    const TYPE_GROUPS = useMemo(
        () => TYPES.map(t => ({id: t, label: t, thumb: THUMBS.type})),
        [TYPES]
    );

    // modal toggles
    const [equipOpen, setEquipOpen] = useState(false);
    const [primaryOpen, setPrimaryOpen] = useState(false);
    const [othersOpen, setOthersOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);

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
            name: name.trim(),
            image,
            equipment,
            primaryMuscle: primary,
            otherMuscles: others,
            exerciseType: type,
        };
        console.log("CREATE EXERCISE", payload);
        Alert.alert("Saved", "Exercise saved (payload in console).");
        navigation.goBack?.();
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
            <TopBar variant="selectworkout" onBackPress={() => navigation.goBack?.()} />

            <ScrollView contentContainerStyle={{paddingBottom: 28}}>
                {/* Picture */}
                <View style={styles.pictureWrap}>
                    <Pressable onPress={pickImage} style={styles.picPress}>
                        {image ? (
                            <Image source={{uri: image}} style={styles.preview} />
                        ) : (
                            <LinearGradient colors={COLORS.gradient} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.picBorder}>
                                <View style={styles.picInner}>
                                    <Ionicons name="image" size={50} color={COLORS.primary} />
                                </View>
                            </LinearGradient>
                        )}
                    </Pressable>
                    <Text style={styles.addPictureText}>Add Picture</Text>
                </View>

                {/* Form */}
                <View style={{paddingHorizontal: 16}}>
                    {/* Name */}
                    <Text style={styles.sectionLabel}>Exercise Name :</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter exercise name"
                        placeholderTextColor={THEME.dim}
                        style={styles.nameInput}
                    />

                    {/* Select rows */}
                    <SelectRow label="Equipment" value={equipment || "Select"} onPress={() => setEquipOpen(true)} />
                    <SelectRow label="Primary Muscle Group" value={primary || "Select"} onPress={() => setPrimaryOpen(true)} />
                    <SelectRow
                        label="Other Muscles"
                        value={others.length ? `${others.length} selected` : "Select  ( optional )"}
                        onPress={() => setOthersOpen(true)}
                    />
                    <SelectRow label="Exercise Type" value={type || "Select"} onPress={() => setTypeOpen(true)} />

                    {/* Save button */}
                    <View style={{paddingVertical: 18}}>
                        <TouchableOpacity activeOpacity={0.9} onPress={onSave}>
                            <LinearGradient colors={COLORS.gradient} start={{x:0,y:0.5}} end={{x:1,y:0.5}} style={styles.primaryBtn}>
                                <Text style={styles.primaryText}>Save</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* ---- Modals with images (thumb) ---- */}

            <AllGroupsModal
                visible={equipOpen}
                title="Equipment"
                groups={EQUIPMENT_GROUPS}
                selected={equipment ? [equipment] : []}
                multi={false}
                onApply={(vals) => { setEquipment(vals[0] ?? null); setEquipOpen(false); }}
                onClose={() => setEquipOpen(false)}
                gradient={COLORS.gradient}
            />

            <AllGroupsModal
                visible={primaryOpen}
                title="Primary Muscle Group"
                groups={MUSCLE_GROUPS}
                selected={primary ? [primary] : []}
                multi={false}
                onApply={(vals) => { setPrimary(vals[0] ?? null); setPrimaryOpen(false); }}
                onClose={() => setPrimaryOpen(false)}
                gradient={COLORS.gradient}
            />

            <AllGroupsModal
                visible={othersOpen}
                title="Other Muscles"
                groups={MUSCLE_GROUPS}
                selected={others}
                multi
                onApply={(vals) => { setOthers(vals); setOthersOpen(false); }}
                onClose={() => setOthersOpen(false)}
                gradient={COLORS.gradient}
            />

            <AllGroupsModal
                visible={typeOpen}
                title="Exercise Type"
                groups={TYPE_GROUPS}
                selected={type ? [type] : []}
                multi={false}
                onApply={(vals) => { setType(vals[0] ?? null); setTypeOpen(false); }}
                onClose={() => setTypeOpen(false)}
                gradient={COLORS.gradient}
            />
        </SafeAreaView>
    );
}

/* ---------- local UI parts ---------- */

function SelectRow({label, value, onPress}) {
    return (
        <Pressable onPress={onPress} style={styles.row}>
            <View style={{flex: 1}}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={[styles.rowValue, value.startsWith("Select") && {opacity: 0.7}]} numberOfLines={1}>
                    {value}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={THEME.dim} />
        </Pressable>
    );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
    pictureWrap: {alignItems: "center", paddingTop: 18, paddingBottom: 8},
    picPress: {width: 180, height: 180},
    picBorder: {flex: 1, borderRadius: 8, padding: 1.5},
    picInner: {
        flex: 1, borderRadius: 8, borderWidth: 1, borderColor: "rgba(124,91,242,0.35)",
        backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center",
    },
    preview: {width: 180, height: 180, borderRadius: 8},
    addPictureText: {marginTop: 8, color: THEME.dim, fontWeight: "500"},

    sectionLabel: {color: THEME.text, fontWeight: "700", marginTop: 18, marginBottom: 6},
    nameInput: {
        height: 40,
        color: THEME.text,
        borderBottomWidth: 1,
        borderBottomColor: THEME.stroke,
        marginBottom: 8,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: THEME.stroke,
    },
    rowLabel: {color: THEME.text, fontWeight: "700", marginBottom: 2},
    rowValue: {color: THEME.text, fontWeight: "500"},

    primaryBtn: {
        height: 48, borderRadius: 10, alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "rgba(255,255,255,0.15)",
    },
    primaryText: {color: THEME.text, fontWeight: "700"},
});
