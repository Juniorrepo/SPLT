import React, {useMemo, useState, useRef} from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Pressable,
    SafeAreaView,
    StatusBar, Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {LinearGradient} from "expo-linear-gradient";
import {Video} from "expo-av";
import COLORS from "../../../constants/Colors";

const {width} = Dimensions.get("window");

const THEME = {
    bg: "#0E0A14",
    card: "#171222",
    text: "#F2F1F6",
    textDim: "#CFCBDA",
    stroke: "#2B2340",
    accent1: "#B57FE6",
    accent2: "#6645AB",
};

const DEFAULT_VIDEO = {
    uri: "https://www.w3schools.com/html/mov_bbb.mp4",
};

export default function WorkoutDetailScreen({
                                                navigation,
                                                title = "Cross Body Shoulder Stretch",
                                                videoSource = DEFAULT_VIDEO,
                                                posterUri = "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200",
                                                openDrawer,
                                            }) {
    const [tab, setTab] = useState("Details");
    const tabs = useMemo(() => ["Details", "How To", "History"], []);

    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    const onPlayPress = async () => {
        try {
            setPlaying(true);
            await videoRef.current?.playAsync();
        } catch (e) {
            console.warn("Play error", e);
        }
    };

    const onPausePress = async () => {
        try {
            setPlaying(false);
            await videoRef.current?.pauseAsync();
        } catch (e) {
            console.warn("Pause error", e);
        }
    };

    const toggleMute = async () => {
        try {
            setMuted(!muted);
            await videoRef.current?.setIsMutedAsync(!muted);
        } catch (e) {
            console.warn("Mute error", e);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <LinearGradient
                colors={[THEME.accent1, THEME.accent2]}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.statusBar}
            >
            </LinearGradient>

            <SafeAreaView style={styles.safe}>
                <View style={styles.topbar}>
                    <Pressable
                        onPress={() => (navigation ? navigation.goBack() : null)}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        style={styles.navBtn}
                    >
                        <Ionicons name="chevron-back" size={22} color={THEME.text}/>
                    </Pressable>

                    <Text numberOfLines={1} style={styles.title}>
                        {title}
                    </Text>

                    <View style={{width: 34}}/>
                </View>
            </SafeAreaView>

            <View style={styles.heroWrap}>
                <Video
                    ref={videoRef}
                    source={videoSource}
                    style={styles.hero}
                    resizeMode="cover"
                    isLooping
                    isMuted={muted}
                    shouldPlay={playing}
                    usePoster
                />

                {!playing && (
                    <View style={styles.playOverlay}>
                        <Pressable onPress={onPlayPress} style={styles.playBtn}>
                            <Ionicons name="play" size={24} color={THEME.text}/>
                        </Pressable>
                    </View>
                )}

                {playing && (
                    <View style={styles.videoControls}>
                        <Pressable onPress={toggleMute} style={styles.smallBtn}>
                            <Ionicons
                                name={muted ? "volume-mute" : "volume-high"}
                                size={16}
                                color={THEME.text}
                            />
                        </Pressable>
                        <Pressable onPress={onPausePress} style={styles.smallBtn}>
                            <Ionicons name="pause" size={16} color={THEME.text}/>
                        </Pressable>
                    </View>
                )}
            </View>

            <View style={styles.tabBarWrap}>
                <SegmentedTabs tabs={tabs} value={tab} onChange={setTab}/>
            </View>

            <ScrollView
                contentContainerStyle={{paddingBottom: 28}}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {tab === "Details" && <DetailsSection/>}
                {tab === "How To" && <HowToSection/>}
                {tab === "History" && <HistorySection/>}
            </ScrollView>
        </View>
    );
}

/* ---------------- Sections ---------------- */

function DetailsSection() {
    return (
        <View style={{paddingHorizontal: 16, paddingTop: 8}}>
            <SectionTitle text="Muscles Targeted"/>
            <Text style={styles.microLabel}>Primary Muscle</Text>
            <View style={styles.rowWrap}>
                <MuscleBadge label="Stretch"/>
            </View>

            <Text style={[styles.microLabel, {marginTop: 12}]}>
                Secondary Muscle(s)
            </Text>
            <View style={styles.rowWrap}>
                <MuscleBadge label="Rear Deltoid"/>
                <MuscleBadge label="Side Deltoid"/>
            </View>

            <SectionTitle text="Equipment Needed" style={{marginTop: 20}}/>
            <View style={styles.rowWrap}>
                <EquipmentBadge label="Body Only"/>
            </View>
        </View>
    );
}

function HowToSection() {
    return (
        <View style={{paddingHorizontal: 16, paddingTop: 8}}>
            <SectionTitle text="How To"/>
            <InfoRow
                icon="list-circle-outline"
                title="Setup"
                text="Stand tall, feet hip-width apart. Bring right arm across your chest and support with left arm at the elbow."
            />
            <InfoRow
                icon="repeat-outline"
                title="Movement"
                text="Gently pull the right arm toward your chest until a stretch is felt in the rear/side deltoid. Hold 20–30s; switch arms."
            />
            <InfoRow
                icon="warning-outline"
                title="Form cues"
                text="Keep shoulders down, neck long, and avoid twisting the torso. Maintain slow breathing."
            />
        </View>
    );
}

function HistorySection() {
    return (
        <View style={{paddingHorizontal: 16, paddingTop: 8}}>
            <SectionTitle text="History"/>
            <HistoryCard date="Jul 10, 2025" subtitle="2 sets • 30s hold"/>
            <HistoryCard date="Jul 6, 2025" subtitle="3 sets • 20s hold"/>
        </View>
    );
}

/* ---------------- Small Components ---------------- */

function SegmentedTabs({tabs, value, onChange}) {
    return (
        <View style={styles.tabs}>
            {tabs.map((t) => {
                const active = t === value;
                return (
                    <TouchableOpacity
                        key={t}
                        activeOpacity={0.9}
                        onPress={() => onChange(t)}
                        style={[styles.tabBtn, active && styles.tabBtnActive]}
                    >
                        {active ? (
                            <LinearGradient
                                colors={["#B57FE6", "#6645AB"]}
                                start={{x: 0, y: 0.5}}
                                end={{x: 1, y: 0.5}}
                                style={StyleSheet.absoluteFill}
                            />
                        ) : null}
                        <Text style={[styles.tabTxt, active && styles.tabTxtActive]}>
                            {t}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

function SectionTitle({text, style}) {
    return <Text style={[styles.sectionTitle, style]}>{text}</Text>;
}

function MuscleBadge({label}) {
    return (
        <View style={styles.badge}>
            <Image
                source={require('../../../assets/images/Apple.png')}
            />
            <Text style={styles.badgeTxt}>{label}</Text>
        </View>
    );
}

function EquipmentBadge({label}) {
    return (
        <View style={styles.badge}>
            <Image
                source={require('../../../assets/images/Apple.png')}
            />
            <Text style={styles.badgeTxt}>{label}</Text>
        </View>
    );
}

function InfoRow({icon, title, text}) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
                <Ionicons name={icon} size={16} color={THEME.text}/>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.infoTitle}>{title}</Text>
                <Text style={styles.infoText}>{text}</Text>
            </View>
        </View>
    );
}

function HistoryCard({date, subtitle}) {
    return (
        <View style={styles.historyCard}>
            <View>
                <Text style={styles.historyDate}>{date}</Text>
                <Text style={styles.historySub}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={THEME.textDim}/>
        </View>
    );
}

function BottomNav({active = "Home"}) {
    const items = [
        {key: "Home", icon: "home-outline"},
        {key: "Workouts", icon: "barbell-outline"},
        {key: "Track", icon: "timer-outline"},
        {key: "Shop", icon: "bag-handle-outline"},
        {key: "Profile", icon: "person-outline"},
    ];

    return (
        <View style={styles.bottomNavWrap}>
            {items.map((it) => {
                const isActive = it.key === active;
                return (
                    <TouchableOpacity key={it.key} style={styles.bottomNavItem}>
                        <Ionicons
                            name={it.icon}
                            size={22}
                            color={isActive ? THEME.text : THEME.textDim}
                        />
                        <Text style={[styles.bottomNavLabel, isActive && {color: THEME.text}]}>
                            {it.key}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    // Custom Status Bar
    statusBar: {
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    statusTime: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    statusRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    signalBars: {
        flexDirection: "row",
        gap: 2,
        alignItems: "flex-end",
    },
    bar: {
        width: 3,
        backgroundColor: "white",
        borderRadius: 1,
    },
    batteryIndicator: {
        backgroundColor: "#10B981",
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 3,
    },
    batteryText: {
        color: "white",
        fontSize: 10,
        fontWeight: "600",
    },

    // Video Section
    heroWrap: {
        height: width * 0.55,
        maxHeight: 400,
    },
    hero: {
        width: "100%",
        height: "100%",
    },
    playOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    playBtn: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.45)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    videoControls: {
        position: "absolute",
        top: 16,
        right: 16,
        flexDirection: "row",
        gap: 8,
    },

    // Navigation
    safe: {paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10},
    topbar: {
        marginTop: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    navBtn: {
        width: 34,
        height: 34,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    smallBtn: {
        width: 34,
        height: 34,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    title: {
        flex: 1,
        textAlign: "center",
        color: THEME.text,
        fontSize: 20,
        fontWeight: "400",
        marginHorizontal: 6,
    },

    // Tabs
    tabBarWrap: {
        paddingHorizontal: 12,
        paddingTop: 12,
    },
    tabs: {
        flexDirection: "row",
        padding: 4,
        gap: 6,
    },
    tabBtn: {
        flex: 1,
        height: 36,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: COLORS.primary,
        borderWidth: 1,
        overflow: "hidden",
    },
    tabBtnActive: {
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    tabTxt: {color: THEME.textDim, fontSize: 13, fontWeight: "600"},
    tabTxtActive: {color: THEME.text},

    // Content
    scrollView: {
        flex: 1,
    },
    sectionTitle: {
        color: THEME.text,
        fontSize: 25,
        fontWeight: "350",
        marginTop: 16,
        marginBottom: 8,
    },
    microLabel: {color: THEME.textDim, fontSize: 16, marginBottom: 8},

    // Badges
    rowWrap: {flexDirection: "row", gap: 10, flexWrap: "wrap"},
    badge: {
        alignItems: "center",
        gap: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    badgeIconCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.08)",
    },
    badgeTxt: {color: THEME.text, fontSize: 13, fontWeight: "600"},

    // Info Rows
    infoRow: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: THEME.stroke,
    },
    infoIconWrap: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        marginTop: 2,
    },
    infoTitle: {color: THEME.text, fontSize: 14, fontWeight: "700"},
    infoText: {color: THEME.textDim, fontSize: 13, marginTop: 2, lineHeight: 18},

    // History
    historyCard: {
        marginTop: 8,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: THEME.stroke,
        backgroundColor: "rgba(255,255,255,0.03)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    historyDate: {color: THEME.text, fontSize: 14, fontWeight: "700"},
    historySub: {color: THEME.textDim, fontSize: 12, marginTop: 2},

    // Bottom Navigation
    bottomNavWrap: {
        borderTopWidth: 1,
        borderTopColor: THEME.stroke,
        backgroundColor: "#110B1C",
        paddingTop: 8,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    bottomNavItem: {alignItems: "center", gap: 2},
    bottomNavLabel: {fontSize: 11, color: THEME.textDim, fontWeight: "600"},
});