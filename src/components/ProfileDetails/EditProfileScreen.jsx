import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
    TextInput,
    Modal,
    Alert,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";
import * as ImagePicker from "expo-image-picker";
// --- Theme ---
const FALLBACK = {
    background: "#0E0E12",
    text: "#FFFFFF",
    muted: "#B4B8C2",
    border: "rgba(255,255,255,0.08)",
    primary: "#7b61ff",
};
const THEME = {
    background: COLORS?.background ?? FALLBACK.background,
    text: COLORS?.text ?? FALLBACK.text,
    muted: COLORS?.muted ?? FALLBACK.muted,
    border: COLORS?.border ?? FALLBACK.border,
    primary: COLORS?.primary ?? FALLBACK.primary,
};
const SHEET_RADIUS = 34;

export default function EditProfileScreen({navigation, onSave}) {
    const [profile, setProfile] = useState({
        name: "Honen",
        username: "Username",
        bio: "Bio goes here",
        gender: "Male",
        photoUri: require("../../assets/images/home/user1.png"),
        avatarName: null,
        useAvatar: false,
        social: {
            instagram: "Instagram.com/Honen7",
            youtube: "Youtube.com/Honen7",
            facebook: "Facebook.com/Honen7",
            tiktok: "Tiktok.com/Honen7",
            x: "x.com/Honen7",
            email: "Honen07@gmail.com",
        },
    });

    // Only this modal is used (for social links)
    const [socialOpen, setSocialOpen] = useState(false);

    const updateField = (key, val) => setProfile((p) => ({...p, [key]: val}));

    const handleSave = () => {
        // TODO: persist to backend here
        onSave?.(profile);
        Alert.alert("Saved", "Your profile has been updated.");
        navigation?.goBack?.();
    };

    const [avatarOpen, setAvatarOpen] = useState(false);

    const openImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "We need access to your photos to update your picture.");
            return;
        }
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.9,
        });
        if (!res.canceled) {
            setProfile((p) => ({ ...p, photoUri: { uri: res.assets[0].uri }, useAvatar: false }));
        }
    };

    const saveAvatar = (iconName) => {
        setProfile((p) => ({ ...p, avatarName: iconName, useAvatar: true }));
        setAvatarOpen(false);
    };

    return (
        <>
            <TopBar variant="editprofile" onBackPress={() => navigation.goBack()}/>

            <ScrollView style={[styles.container, {backgroundColor: THEME.background}]}>
                <View style={styles.headerWrap}>
                    <Pressable style={styles.photoWrap} onPress={openImagePicker}>
                        {profile.useAvatar && profile.avatarName ? (
                            <View style={[styles.avatarCircle, {backgroundColor: "rgba(123,97,255,0.1)"}]}>
                                <Ionicons name={profile.avatarName} size={32} color={THEME.primary}/>
                            </View>
                        ) : (
                            <Image source={profile.photoUri} style={styles.photo}/>
                        )}
                        <View style={[styles.photoRing, {borderColor: THEME.primary}]}/>
                    </Pressable>

                    <Pressable
                        style={[styles.avatarWrap, {borderColor: THEME.primary}]}
                        onPress={() => setAvatarOpen(true)}
                    >
                        <Ionicons name="paw-outline" size={26} color={THEME.primary}/>
                    </Pressable>
                </View>
                <Text style={[styles.editHint, {color: THEME.text}]}>Edit Picture or avatar</Text>

                <View style={[styles.sectionDivider, {borderBottomColor: THEME.border}]}/>

                {/* Inline inputs (no modals) */}
                <InlineRow label="Name">
                    <TextInput
                        value={profile.name}
                        onChangeText={(t) => updateField("name", t)}
                        placeholder="Your name"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        style={styles.inputBare}
                    />
                </InlineRow>

                <InlineRow label="Username">
                    <TextInput
                        value={profile.username}
                        onChangeText={(t) => updateField("username", t)}
                        placeholder="Username"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        autoCapitalize="none"
                        style={styles.inputBare}
                    />
                </InlineRow>

                <InlineRow label="Bio">
                    <TextInput
                        value={profile.bio}
                        onChangeText={(t) => updateField("bio", t)}
                        placeholder="Tell people about you"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        style={[styles.inputBare, {height: 80, textAlignVertical: "top"}]}
                        multiline
                        maxLength={160}
                    />
                </InlineRow>

                {/* Links row -> opens Social Links modal */}
                <Pressable onPress={() => setSocialOpen(true)} style={styles.row}>
                    <Text style={styles.rowLabel}>Links</Text>
                    <View style={styles.rowRight}>
                        <Text
                            style={[styles.rowValue, {color: THEME.muted}]}>{Object.values(profile.social).filter(Boolean).length}</Text>
                        <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)"/>
                    </View>
                </Pressable>

                {/* The rest keep as static (or wire up later) */}
                <Pressable onPress={() => Alert.alert("Coming soon")} style={styles.row}>
                    <Text style={styles.rowLabel}>Banners</Text>
                    <View style={styles.rowRight}>
                        <Text style={[styles.rowValue, {color: THEME.muted}]}>Add banners</Text>
                        <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)"/>
                    </View>
                </Pressable>

                <Pressable onPress={() => Alert.alert("Coming soon")} style={styles.row}>
                    <Text style={styles.rowLabel}>Music</Text>
                    <View style={styles.rowRight}>
                        <Text style={[styles.rowValue, {color: THEME.muted}]}>Add music to your profile</Text>
                        <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)"/>
                    </View>
                </Pressable>

                <Pressable onPress={() => Alert.alert("Coming soon")} style={styles.row}>
                    <Text style={styles.rowLabel}>Gender</Text>
                    <View style={styles.rowRight}>
                        <Text style={[styles.rowValue, {color: THEME.muted}]}>{profile.gender}</Text>
                        <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)"/>
                    </View>
                </Pressable>

                {/* Save button */}
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[THEME.primary, "#9d8cff"]}
                    style={styles.saveBtn}
                >
                    <Pressable style={{paddingVertical: 12}} onPress={handleSave}>
                        <Text style={styles.saveText}>Save Changes</Text>
                    </Pressable>
                </LinearGradient>
            </ScrollView>

            {/* Social links editor (only modal we keep) */}
            <SocialLinksSheet
                visible={socialOpen}
                initialValues={profile.social}
                onClose={() => setSocialOpen(false)}
                onSave={(values) => {
                    setProfile((p) => ({...p, social: values}));
                    setSocialOpen(false);
                }}
            />
            <AvatarSheet visible={avatarOpen} onSelect={saveAvatar} onClose={() => setAvatarOpen(false)} />

        </>
    );
}

function AvatarSheet({ visible, onSelect, onClose }) {
    const icons = [
        "paw-outline",
        "planet-outline",
        "sparkles-outline",
        "game-controller-outline",
        "star-outline",
        "skull-outline",
        "leaf-outline",
        "flame-outline",
    ];
    return (
        <Sheet visible={visible} onClose={onClose}>
            <View style={styles.grabber} />
            <Text style={styles.modalTitle}>Choose an Avatar</Text>
            <View style={styles.avatarGrid}>
                {icons.map((name) => (
                    <Pressable key={name} style={styles.avatarPick} onPress={() => onSelect(name)}>
                        <Ionicons name={name} size={26} color={THEME.primary} />
                    </Pressable>
                ))}
            </View>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={onClose}>
                <Text style={styles.btnGhostText}>Cancel</Text>
            </Pressable>
        </Sheet>
    );
}

function Sheet({ visible, onClose, children }) {
    if (!visible) return null;
    return (
        <Modal visible animationType="slide" transparent onRequestClose={onClose}>
            <Pressable style={styles.modalOverlay} onPress={onClose} />
            <LinearGradient
                colors={["rgba(102,69,171,0.20)", "rgba(102,69,171,0.08)", "rgba(255,255,255,0)"]}
                locations={[0, 0.55, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sheet}
            >
                <View pointerEvents="none" style={styles.sheetStroke} />
                <View style={styles.content}>{children}</View>
            </LinearGradient>
        </Modal>
    );
}

function InlineRow({label, children}) {
    return (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <View style={styles.rowRight}>{children}</View>
        </View>
    );
}

/* ---------- Social Links Sheet (modal) ---------- */
function SocialLinksSheet({visible, initialValues, onSave, onClose}) {
    const [state, setState] = useState(initialValues);

    React.useEffect(() => setState(initialValues), [initialValues, visible]);

    const setVal = (k, v) => setState((s) => ({...s, [k]: v}));

    const rows = [
        {key: "instagram", label: "Instagram.com/Honen7", icon: "logo-instagram", color: "#E1306C"},
        {key: "youtube", label: "Youtube.com/Honen7", icon: "logo-youtube", color: "#FF0000"},
        {key: "facebook", label: "Facebook.com/Honen7", icon: "logo-facebook", color: "#1877F2"},
        {key: "tiktok", label: "Tiktok.com/Honen7", icon: "logo-tiktok", color: "#111"},
        {key: "x", label: "x.com/Honen7", icon: "logo-twitter", color: "#111"}, // X fallback
        {key: "email", label: "Honen07@gmail.com", icon: "mail-outline", color: "#3B82F6"},
    ];

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <Pressable style={styles.modalOverlay} onPress={onClose}/>
            <LinearGradient
                colors={["rgba(102,69,171,0.20)", "rgba(102,69,171,0.08)", "rgba(255,255,255,0)"]}
                locations={[0, 0.55, 1]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.sheet}
            >
                <View pointerEvents="none" style={styles.sheetStroke}/>
                <View style={styles.content}>
                    <View style={styles.grabber}/>
                    <Text style={styles.modalTitle}>Social Media Links</Text>

                    {rows.map((r, idx) => (
                        <View key={r.key}>
                            <View style={styles.socialRow}>
                                <View style={[styles.socialIconWrap, {backgroundColor: r.color}]}>
                                    <Ionicons name={r.icon} size={18} color="#fff"/>
                                </View>
                                <TextInput
                                    value={state[r.key]}
                                    onChangeText={(t) => setVal(r.key, t)}
                                    placeholder={r.label}
                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                    style={styles.linkInput}
                                    autoCapitalize="none"
                                />
                            </View>
                            {idx < rows.length - 1 && <View style={styles.divider}/>}
                        </View>
                    ))}

                    <View style={styles.modalButtons}>
                        <Pressable style={[styles.btn, styles.btnGhost]} onPress={onClose}>
                            <Text style={styles.btnGhostText}>Close</Text>
                        </Pressable>
                        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => onSave(state)}>
                            <Text style={styles.btnPrimaryText}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: {flex: 1, paddingHorizontal: 16, paddingTop: 16},

    headerWrap: {
        flexDirection: "row",
        alignSelf: "center",
        gap: 28,
        marginTop: 8,
        marginBottom: 10,
    },
    photoWrap: {
        width: 82,
        height: 82,
        borderRadius: 41,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#1b1b1f",
        alignItems: "center",
        justifyContent: "center",
    },
    photo: {width: "100%", height: "100%"},
    avatarCircle: {width: 82, height: 82, alignItems: "center", justifyContent: "center"},
    photoRing: {position: "absolute", inset: 0, borderRadius: 41, borderWidth: 2},
    avatarWrap: {
        width: 82, height: 82, borderRadius: 41,
        alignItems: "center", justifyContent: "center", borderWidth: 2,
    },
    editHint: {alignSelf: "center", fontWeight: "700", fontSize: 14, marginTop: 8, marginBottom: 16},

    sectionDivider: {borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 8, marginBottom: 8},

    row: {
        minHeight: 52,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: THEME.border,
    },
    rowLabel: {width: 88, color: "rgba(255,255,255,0.9)", fontSize: 14},
    rowRight: {flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8},

    // inline input style
    inputBare: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 0,
    },

    // Save button
    saveBtn: {
        marginTop: 20,
        marginBottom: 32,
        alignSelf: "center",
        borderRadius: 12,
        paddingHorizontal: 22,
    },
    saveText: {color: "#fff", fontWeight: "700", textAlign: "center", fontSize: 16},

    /* Sheet base */
    modalOverlay: {flex: 1, backgroundColor: "rgba(0,0,0,0.35)"},
    sheet: {
        position: "absolute", left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(14,14,18,0.9)",
        borderTopLeftRadius: SHEET_RADIUS, borderTopRightRadius: SHEET_RADIUS, overflow: "hidden",
    },
    sheetStroke: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: SHEET_RADIUS, borderTopRightRadius: SHEET_RADIUS,
        borderWidth: StyleSheet.hairlineWidth, borderColor: "rgba(255,255,255,0.06)",
    },
    content: {padding: 16, paddingBottom: 24},
    grabber: {
        alignSelf: "center", width: 44, height: 4, borderRadius: 2,
        backgroundColor: "rgba(255,255,255,0.35)", marginVertical: 10,
    },
    modalTitle: {color: "#FFFFFF", fontWeight: "700", fontSize: 16, marginBottom: 10},
    modalButtons: {flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 12},
    btn: {paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, alignItems: "center", justifyContent: "center"},
    btnGhost: {borderWidth: 1, borderColor: "rgba(255,255,255,0.25)"},
    btnGhostText: {color: "#fff", fontWeight: "600"},
    btnPrimary: {backgroundColor: THEME.primary},
    btnPrimaryText: {color: "#fff", fontWeight: "700"},

    // social rows in the sheet
    socialRow: {flexDirection: "row", alignItems: "center", paddingVertical: 10},
    socialIconWrap: {
        width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", marginRight: 10,
    },
    linkInput: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
        paddingVertical: 8,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "rgba(255,255,255,0.18)",
    },
    avatarPick: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: THEME.primary,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(123,97,255,0.08)",
    },
    avatarGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 4,
        marginBottom: 10,
    },
});
