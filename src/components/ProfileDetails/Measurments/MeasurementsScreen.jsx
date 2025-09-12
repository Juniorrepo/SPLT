import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    TextInput,
    Platform,
    Alert,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../../../constants/Colors";
import TopBar from "../../common/TopBar";

// If you have a COLORS file, replace these with yours:
const COLORS = {
    background: "#0E0E12",
    card: "#101119",
    text: "#FFFFFF",
    muted: "#B4B8C2",
    primary: "#7b61ff",
    borderGrid: "rgba(110,86,205,0.35)",
};

// --- Fake API ---
const wait = (ms = 650) => new Promise((r) => setTimeout(r, ms));

async function apiSave(payload) {
    await wait();
    return {ok: true};
}

// --- Gradient 1px border wrapper ---
const BORDER_WIDTH = 2;
const GradientBorder = ({radius = 10, style, children}) => (
    <LinearGradient
        colors={Colors.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[{borderRadius: radius, padding: BORDER_WIDTH}, style]}
    >
        <View
            style={{
                borderRadius: radius - BORDER_WIDTH,
                overflow: "hidden",
                backgroundColor: Colors.background,
            }}
        >
            {children}
        </View>
    </LinearGradient>
);

// --- Section schema (keys map to state) ---
const BASIC_FIELDS = [
    {key: "bodyWeight", label: "Body Weight", unit: "kg"},
    {key: "bodyFat", label: "Body Fat", unit: "%"},
    {key: "bodyHeight", label: "Body Height", unit: "cm"},
];

const UPPER_FIELDS = [
    {key: "neck", label: "Neck", unit: "cm"},
    {key: "shoulder", label: "Shoulder", unit: "cm"},
    {key: "chest", label: "Chest", unit: "cm"},
    {key: "leftBicep", label: "Left Bicep", unit: "cm"},
    {key: "rightBicep", label: "Right Bicep", unit: "cm"},
    {key: "leftForearm", label: "Left Forearm", unit: "cm"},
    {key: "rightForearm", label: "Right Forearm", unit: "cm"},
];

const LOWER_FIELDS = [
    {key: "waist", label: "Waist", unit: "cm"},
    {key: "abdomen", label: "Abdomen", unit: "cm"},
    {key: "hips", label: "Hips", unit: "cm"},
    {key: "leftThigh", label: "Left Thigh", unit: "cm"},
    {key: "rightThigh", label: "Right Thigh", unit: "cm"},
    {key: "leftCalf", label: "Left Calf", unit: "cm"},
    {key: "rightCalf", label: "Right Calf", unit: "cm"},
];

const SectionHeader = ({label, open, onToggle, rightChevron = true}) => (
    <Pressable onPress={onToggle} style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{label}</Text>
        <Ionicons
            name={open ? "chevron-down" : rightChevron ? "chevron-forward" : "chevron-down"}
            size={18}
            color="#c8c6ff"
        />
    </Pressable>
);

const RowInput = ({label, unit, value, onChange}) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <View style={styles.rowRight}>
            <TextInput
                value={value ?? ""}
                onChangeText={onChange}
                placeholder="-"
                placeholderTextColor="#9aa0ad"
                style={styles.rowInput}
                keyboardType="decimal-pad"
                returnKeyType="done"
            />
            <Text style={styles.rowUnit}>{unit}</Text>
        </View>
    </View>
);

const formatDate = (d) =>
    d.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

export default function UpdateMeasurementsScreen({navigation}) {
    const [date, setDate] = useState(new Date());
    const [showDP, setShowDP] = useState(false);

    const [photoUri, setPhotoUri] = useState(null);

    const [vals, setVals] = useState({
        // BASIC
        bodyWeight: "",
        bodyFat: "",
        bodyHeight: "",
        // UPPER
        neck: "",
        shoulder: "",
        chest: "",
        leftBicep: "",
        rightBicep: "",
        leftForearm: "",
        rightForearm: "",
        // LOWER
        waist: "",
        abdomen: "",
        hips: "",
        leftThigh: "",
        rightThigh: "",
        leftCalf: "",
        rightCalf: "",
    });

    // accordions
    const [openBasic, setOpenBasic] = useState(false);
    const [openUpper, setOpenUpper] = useState(false);
    const [openLower, setOpenLower] = useState(false);

    const setField = (k, v) =>
        setVals((s) => ({
            ...s,
            [k]: v.replace(/[^0-9.,]/g, ""), // keep numbers and decimal separators
        }));

    const onPickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "Please allow photo library access.");
            return;
        }
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.9,
        });
        if (!res.canceled && res.assets?.length) {
            setPhotoUri(res.assets[0].uri);
        }
    };

    const payload = useMemo(
        () => ({
            date: date.toISOString(),
            photoUri,
            basic: Object.fromEntries(BASIC_FIELDS.map((f) => [f.key, vals[f.key]])),
            upper: Object.fromEntries(UPPER_FIELDS.map((f) => [f.key, vals[f.key]])),
            lower: Object.fromEntries(LOWER_FIELDS.map((f) => [f.key, vals[f.key]])),
        }),
        [date, photoUri, vals]
    );

    const onSubmit = async () => {
        const w = vals.bodyWeight?.replace(",", ".");
        if (w && isNaN(parseFloat(w))) {
            Alert.alert("Invalid value", "Body Weight must be a number.");
            return;
        }
        const res = await apiSave(payload);
        if (res?.ok) Alert.alert("Saved", "Measurements updated.");
        else Alert.alert("Error", "Could not save your measurements.");
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: Colors.background}]}>
            <TopBar variant={"updatemeasurements"} onBackPress={() => navigation.goBack()}></TopBar>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Date row */}
                <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>Date</Text>
                    <Pressable onPress={() => setShowDP(true)} hitSlop={8} style={styles.dateValueWrap}>
                        <Text style={styles.dateValue}>{formatDate(date)}</Text>
                        <Ionicons name="calendar-outline" size={18} color="#c8c6ff" style={{marginLeft: 8}}/>
                    </Pressable>
                </View>
                <View style={styles.divider}/>
                {showDP && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(e) => {
                            setShowDP(false);
                            if (e.type === "set" && e?.nativeEvent?.timestamp) {
                                setDate(new Date(e.nativeEvent.timestamp));
                            }
                        }}
                    />
                )}

                {/* Add Picture card */}
                <GradientBorder radius={12} style={{marginTop: 14}}>
                    <Pressable onPress={onPickImage} style={styles.addPicCard}>
                        {photoUri ? (
                            <Image source={{uri: photoUri}} style={styles.addPicImage}/>
                        ) : (
                            <View style={styles.addPicEmpty}>
                                <Ionicons name="image-outline" size={28} color="#bfb8ff"/>
                                <Text style={styles.addPicText}>+ Add Picture</Text>
                            </View>
                        )}
                    </Pressable>
                </GradientBorder>

                {/* Basic Measurements */}
                <GradientBorder radius={10} style={{marginTop: 14}}>
                    <SectionHeader
                        label="Basic Measurements"
                        open={openBasic}
                        onToggle={() => setOpenBasic((v) => !v)}
                        rightChevron={!openBasic}
                    />
                    {openBasic && (
                        <View style={styles.sectionBody}>
                            {BASIC_FIELDS.map((f, i) => (
                                <View key={f.key}>
                                    <RowInput
                                        label={f.label}
                                        unit={f.unit}
                                        value={vals[f.key]}
                                        onChange={(t) => setField(f.key, t)}
                                    />
                                    {i < BASIC_FIELDS.length - 1 && <View style={styles.rowDivider}/>}
                                </View>
                            ))}
                        </View>
                    )}
                </GradientBorder>

                {/* Upper Body */}
                <GradientBorder radius={10} style={{marginTop: 12}}>
                    <SectionHeader
                        label="Upper Body"
                        open={openUpper}
                        onToggle={() => setOpenUpper((v) => !v)}
                        rightChevron={!openUpper}
                    />
                    {openUpper && (
                        <View style={styles.sectionBody}>
                            {UPPER_FIELDS.map((f, i) => (
                                <View key={f.key}>
                                    <RowInput
                                        label={f.label}
                                        unit={f.unit}
                                        value={vals[f.key]}
                                        onChange={(t) => setField(f.key, t)}
                                    />
                                    {i < UPPER_FIELDS.length - 1 && <View style={styles.rowDivider}/>}
                                </View>
                            ))}
                        </View>
                    )}
                </GradientBorder>

                {/* Lower Body */}
                <GradientBorder radius={10} style={{marginTop: 12}}>
                    <SectionHeader
                        label="Lower Body"
                        open={openLower}
                        onToggle={() => setOpenLower((v) => !v)}
                        rightChevron={!openLower}
                    />
                    {openLower && (
                        <View style={styles.sectionBody}>
                            {LOWER_FIELDS.map((f, i) => (
                                <View key={f.key}>
                                    <RowInput
                                        label={f.label}
                                        unit={f.unit}
                                        value={vals[f.key]}
                                        onChange={(t) => setField(f.key, t)}
                                    />
                                    {i < LOWER_FIELDS.length - 1 && <View style={styles.rowDivider}/>}
                                </View>
                            ))}
                        </View>
                    )}
                </GradientBorder>

                <LinearGradient
                    colors={["#B57FE6", "#6645AB"]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.updateBtn}
                >
                    <Pressable onPress={onSubmit} style={styles.updatePress}>
                        <Text style={styles.updateText}>Update</Text>
                    </Pressable>
                </LinearGradient>

                <View style={{height: 24}}/>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16},

    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 16,
    },
    dateLabel: {color: COLORS.text, fontSize: 14, fontWeight: "600"},
    dateValueWrap: {flexDirection: "row", alignItems: "center"},
    dateValue: {color: COLORS.text, fontSize: 14},
    divider: {
        height: 1,
        backgroundColor: Colors.primary,
    },

    addPicCard: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background,
    },
    addPicEmpty: {alignItems: "center", gap: 8},
    addPicText: {color: "#c8c6ff", fontWeight: "600"},
    addPicImage: {width: "100%", height: "100%"},

    sectionHeader: {
        minHeight: 50,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionHeaderText: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "600",
    },
    sectionBody: {
        paddingHorizontal: 12,
        paddingBottom: 10,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        justifyContent: "space-between",
    },
    rowLabel: {color: COLORS.text, fontSize: 14},
    rowRight: {flexDirection: "row", alignItems: "center", minWidth: 110, justifyContent: "flex-end"},
    rowInput: {
        color: COLORS.text,
        fontSize: 14,
        textAlign: "right",
        paddingVertical: 4,
        minWidth: 50,
    },
    rowUnit: {color: COLORS.muted, marginLeft: 6, width: 26, textAlign: "right"},
    rowDivider: {height: 1, backgroundColor: COLORS.borderGrid},

    updateBtn: {
        marginTop: 16,
        borderRadius: 10,
        padding: 1,
    },
    updatePress: {
        paddingVertical: 14,
        alignItems: "center",
        borderRadius: 9,
    },
    updateText: {color: "#fff", fontWeight: "700"},
});
