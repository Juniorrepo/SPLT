import React, {useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Switch,
    Pressable,
    Modal,
    FlatList,
    Alert,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/Colors";     // use your palette
import TopBar from "../common/TopBar";           // optional

/* ---- Theme (fallbacks if COLORS misses keys) ---- */
const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#ffffff",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
    purple: COLORS?.primary ?? "#7b61ff",
};

const Label = ({title, desc}) => (
    <View style={{flex: 1, paddingRight: 12}}>
        <Text style={styles.rowTitle}>{title}</Text>
        {desc ? <Text style={styles.rowDesc}>{desc}</Text> : null}
    </View>
);

const GradientButton = ({onPress, children, style}) => (
    <LinearGradient
        colors={THEME.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.gbtn, style]}
    >
        <Pressable onPress={onPress} style={styles.gbtnPress}>
            <Text style={styles.gbtnText}>{children}</Text>
        </Pressable>
    </LinearGradient>
);

/* ---- Language Picker (simple modal list) ---- */
const LanguagePicker = ({open, value, onClose, onSelect}) => {
    const LANGS = ["English", "Arabic", "French", "German", "Spanish", "Turkish", "Hindi", "Italian", "Portuguese"];
    return (
        <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.modalBackdrop} onPress={onClose}/>
            <View style={styles.modalSheet}>
                <Text style={styles.modalTitle}>Preferred Language</Text>
                <FlatList
                    data={LANGS}
                    keyExtractor={(i) => i}
                    ItemSeparatorComponent={() => <View style={{height: 8}}/>}
                    renderItem={({item}) => {
                        const selected = item === value;
                        return (
                            <Pressable
                                onPress={() => {
                                    onSelect(item);
                                    onClose();
                                }}
                                style={[styles.langRow, selected && {borderColor: THEME.purple}]}
                            >
                                <Text style={styles.langText}>{item}</Text>
                                {selected ? <Ionicons name="checkmark" size={18} color="#fff"/> : null}
                            </Pressable>
                        );
                    }}
                />
            </View>
        </Modal>
    );
};

/* ---- Fake server save ---- */
async function saveToServer(payload) {
    // replace with your API call
    await new Promise((r) => setTimeout(r, 500));
    return {ok: true};
}

export default function ContentPreferencesScreen({navigation}) {
    // Defaults match your screenshot: first OFF, rest ON
    const [sensitive, setSensitive] = useState(false);
    const [language, setLanguage] = useState("English");
    const [autoLockDisabled, setAutoLockDisabled] = useState(true);
    const [hideSuggested, setHideSuggested] = useState(true);
    const [hideObjectionable, setHideObjectionable] = useState(true);

    const [pickerOpen, setPickerOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const onSave = async () => {
        setSaving(true);
        const payload = {
            sensitive,
            language,
            autoLockDisabled,
            hideSuggested,
            hideObjectionable,
            savedAt: Date.now(),
        };
        const res = await saveToServer(payload);
        setSaving(false);
        Alert.alert(res.ok ? "Saved" : "Error", res.ok ? "Your content preferences have been updated." : "Please try again.");
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            <View style={styles.container}>
                <Text style={styles.title}>Content Preferences</Text>

                {/* Sensitive Content */}
                <View style={styles.row}>
                    <Label title="Sensitive Content"/>
                    <Switch
                        value={sensitive}
                        onValueChange={setSensitive}
                        thumbColor="#fff"
                        trackColor={{false: "#3a2f75", true: "#a799ff"}}
                    />
                </View>

                {/* Preferred Language */}
                <View style={styles.row}>
                    <Label title="Preferred Language"/>
                    <Pressable style={styles.langButton} onPress={() => setPickerOpen(true)}>
                        <Text style={styles.langValue}>{language}</Text>
                        <Ionicons name="chevron-down" size={16} color="#fff"/>
                    </Pressable>
                </View>

                {/* Disable Auto Lock During Workouts (UI-only without extra module) */}
                <View style={styles.row}>
                    <Label
                        title="Disable Auto Lock During Workouts"
                        desc="Doesn't allow your screen to sleep during workouts"
                    />
                    <Switch
                        value={autoLockDisabled}
                        onValueChange={setAutoLockDisabled}
                        thumbColor="#fff"
                        trackColor={{false: "#3a2f75", true: "#a799ff"}}
                    />
                </View>

                {/* Hide Suggested Users */}
                <View style={styles.row}>
                    <Label
                        title="Hide Suggested Users"
                        desc="Enabling this will remove the suggested user section from your feed."
                    />
                    <Switch
                        value={hideSuggested}
                        onValueChange={setHideSuggested}
                        thumbColor="#fff"
                        trackColor={{false: "#3a2f75", true: "#a799ff"}}
                    />
                </View>

                {/* Hide Objectionable Content */}
                <View style={styles.row}>
                    <Label
                        title="Hide Objectionable Content"
                        desc="Enabling this will remove the suggested user section from your feed."
                    />
                    <Switch
                        value={hideObjectionable}
                        onValueChange={setHideObjectionable}
                        thumbColor="#fff"
                        trackColor={{false: "#3a2f75", true: "#a799ff"}}
                    />
                </View>

                <GradientButton onPress={onSave} style={{marginTop: 24}}>
                    {saving ? "Saving..." : "Save"}
                </GradientButton>
            </View>

            {/* Language modal */}
            <LanguagePicker
                open={pickerOpen}
                value={language}
                onClose={() => setPickerOpen(false)}
                onSelect={setLanguage}
            />
        </SafeAreaView>
    );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16},
    title: {color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 16},

    row: {
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
    },
    rowTitle: {color: "#fff", fontSize: 15, fontWeight: "600"},
    rowDesc: {color: THEME.muted, fontSize: 12, marginTop: 4},
    langButton: {flexDirection: "row", alignItems: "center", gap: 6},
    langValue: {color: "#fff", fontSize: 14},

    gbtn: {borderRadius: 10, padding: 1},
    gbtnPress: {paddingVertical: 12, alignItems: "center", borderRadius: 9},
    gbtnText: {color: "#fff", fontWeight: "700"},

    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalSheet: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 24,
        backgroundColor: THEME.card,
        borderRadius: 12,
        padding: 14,
        maxHeight: "60%",
    },
    modalTitle: {color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 10},
    langRow: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: "#141622",
        borderWidth: 1,
        borderColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    langText: {color: "#fff", fontSize: 14},
});
