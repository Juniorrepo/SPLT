import React, {useEffect, useMemo, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
    Modal,
    TouchableOpacity,
    Linking,
} from "react-native";
import TopBar from "../../components/common/TopBar";
import COLORS from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import WorkoutChartExactDesign from "../../components/common/Chart";
import {LinearGradient} from "expo-linear-gradient";
import RecentWorkoutsScreen from "../../components/ProfileDetails/RecentWorkoutsScreen";
import ShareModal from "../../components/home/WorkoutPostCard/ShareModal";

const PURPLE = "#7b61ff";
const CARD_BG = "#16161d";
const TEXT = "#e7e7ee";
const MUTED = "#9ea0a8";
const SHEET_RADIUS = 34;

const RAW_BARS = [
    {
        label: "Week 1", segments: [
            {key: "maxRep", value: 1.5},
            {key: "minutes", value: 1.4},
            {key: "volume", value: 3.5},
            {key: "sets", value: 1.2},
        ]
    },
    {
        label: "Week 2", segments: [
            {key: "maxRep", value: 3.0},
            {key: "minutes", value: 3.0},
            {key: "volume", value: 6.0},
            {key: "sets", value: 2.0},
        ]
    },
    {
        label: "Week 3", segments: [
            {key: "maxRep", value: 1.4},
            {key: "minutes", value: 1.3},
            {key: "volume", value: 2.2},
            {key: "sets", value: 1.0},
        ]
    },
    {
        label: "Week 4", segments: [
            {key: "maxRep", value: 0.8},
            {key: "minutes", value: 0.9},
            {key: "volume", value: 2.0},
            {key: "sets", value: 0.7},
        ]
    },
];

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const SOCIAL_LINKS = [
    {
        key: "instagram",
        label: "instagram.com/Honen7",
        url: "https://instagram.com/Honen7",
        icon: "logo-instagram",
        bg: "#E1306C",
    },
    {
        key: "youtube",
        label: "youtube.com/Honen7",
        url: "https://youtube.com/Honen7",
        icon: "logo-youtube",
        bg: "#FF0000",
    },
    {
        key: "facebook",
        label: "facebook.com/Honen7",
        url: "https://facebook.com/Honen7",
        icon: "logo-facebook",
        bg: "#1877F2",
    },
    {
        key: "tiktok",
        label: "tiktok.com/@Honen7",
        url: "https://www.tiktok.com/@Honen7",
        icon: "logo-tiktok",
        bg: "#000000",
    },
    {
        key: "x",
        label: "x.com/Honen7",
        url: "https://x.com/Honen7",
        icon: "logo-twitter",
        bg: "#000000",
    },
    {
        key: "email",
        label: "Honen07@gmail.com",
        url: "mailto:Honen07@gmail.com",
        icon: "mail-outline",
        bg: "#3B82F6",
    },
];

export default function ProfileScreen({navigation, openDrawer}) {
    const monthDate = new Date();
    const [filterOpen, setFilterOpen] = useState(false);
    const [monthOpen, setMonthOpen] = useState(false);
    const [socialOpen, setSocialOpen] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const [selectedMonth, setSelectedMonth] = useState("May");
    const [activityFilter, setActivityFilter] = useState("All");

    const bars = useMemo(() => {
        if (activityFilter === "All") return RAW_BARS;
        const keyMap = {Sets: "sets", Volume: "volume", Minutes: "minutes", "Max Rap": "maxRep"};
        const k = keyMap[activityFilter];
        return RAW_BARS.map((b) => ({label: b.label, segments: b.segments.filter((s) => s.key === k)}));
    }, [activityFilter]);

    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const monthName = useMemo(
        () => new Date(year, month, 1).toLocaleString("en", {month: "long"}),
        [year, month]
    );

    useEffect(() => {
        setSelectedMonth(monthName);
    }, [monthName]);

    return (
        <>
            <TopBar
                variant="home"
                onSearch={() => {
                }}
                onNotificationPress={() => {
                }}
                onMenuPress={openDrawer}
            />
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 40}}>
                {/* Profile header */}
                <View style={styles.profileSection}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{
                                    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                                }}
                                style={styles.avatar}
                            />
                            <View style={styles.badge}>
                                <Image source={require("../../assets/images/home/Honen.jpg")}
                                       style={styles.badgeImage}/>
                            </View>
                        </View>

                        <View style={styles.stats}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>23</Text>
                                <Text style={styles.statLabel}>Workouts</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>300</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>190</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.profileDetails}>
                        <Text style={styles.username}>@Honen7</Text>
                        <Text style={styles.fullName}>Honen Marco</Text>
                        <Text style={styles.bio}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt{" "}
                            <Text style={styles.hashtag}>#hashTag #hashTag #hashTag</Text>
                        </Text>
                        <Pressable
                            onPress={() => setSocialOpen(true)}
                            accessibilityRole="link"
                            hitSlop={8}
                            style={({pressed}) => [styles.linkWrap, pressed && styles.linkWrapPressed]}
                        >
                            <Text style={styles.linkText}>Social Media</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actionsRow}>
                    <PillButton icon="create-outline" label="Edit Profile"
                                onPress={() => navigation.navigate('EditProfile')}/>
                    <PillButton icon="share-social-outline" label="Share Profile" onPress={() => setShowShareModal(true)}/>
                    <PillButton icon="chatbox-ellipses-outline" label="Message" onPress={() => {
                    }}/>
                </View>

                {/* Chart header */}
                <View style={styles.title}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Honen’s Track Record</Text>
                        <View style={{flexDirection: "row"}}>
                            <View style={styles.monthControls}>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={COLORS.gradient}
                                                style={[styles.wrapper]}>
                                    <TouchableOpacity onPress={() => setMonthOpen(true)} activeOpacity={0.8}
                                                      style={[styles.monthTag]}>
                                        <Text style={styles.monthText}>{selectedMonth}</Text>
                                        <Ionicons name="chevron-down" size={16} color={COLORS.text}/>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>

                            <IconPill onPress={() => setFilterOpen(true)}/>
                        </View>
                    </View>
                </View>

                {/* Chart */}
                <View style={styles.card}>
                    <WorkoutChartExactDesign bars={bars} activityFilter={activityFilter}/>
                </View>

                {/* Recent workouts grid (non-virtualized version recommended inside ScrollView) */}
                <RecentWorkoutsScreen/>

                {/* Filter Sheet */}
                <BottomSheet visible={filterOpen} title="Filter activity" onClose={() => setFilterOpen(false)}>
                    {["All", "Sets", "Volume", "Minutes", "Max Rap"].map((label) => (
                        <OptionRow
                            key={label}
                            label={label}
                            selected={activityFilter === label}
                            onPress={() => {
                                setActivityFilter(label);
                                setFilterOpen(false);
                            }}
                        />
                    ))}
                </BottomSheet>

                {/* Month Sheet */}
                <BottomSheet visible={monthOpen} title="Select Month" onClose={() => setMonthOpen(false)} scroll>
                    {MONTHS.map((m) => (
                        <OptionRow
                            key={m}
                            label={m}
                            selected={selectedMonth === m}
                            onPress={() => {
                                setSelectedMonth(m);
                                setMonthOpen(false);
                            }}
                        />
                    ))}
                </BottomSheet>

                {/* Social Media Sheet */}
                <SocialLinksSheet
                    visible={socialOpen}
                    onClose={() => setSocialOpen(false)}
                    accounts={SOCIAL_LINKS}
                />
            </ScrollView>
            <ShareModal
                visible={showShareModal}
                onClose={() => setShowShareModal(false)}
                postTitle="Your Post"
                userName={"SPLT"}
            />
        </>
    );
}

/* ----------- Small Reusable Bits ----------- */
function PillButton({icon, label, onPress}) {
    return (
        <Pressable style={styles.pill} onPress={onPress}>
            <Ionicons style={styles.pillIcon} name={icon} size={15}/>
            <Text style={styles.pillText}>{label}</Text>
        </Pressable>
    );
}

function IconPill({onPress}) {
    return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={COLORS.gradient} style={styles.dropdown}>
            <Pressable style={[{justifyContent: "center"}]} onPress={onPress}>
                <Ionicons color={"white"} size={20} name={"options-outline"}/>
            </Pressable>
        </LinearGradient>
    );
}

function BottomSheet({visible, onClose, title, children, scroll}) {
    const Body = scroll ? ScrollView : View;

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
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Body>{children}</Body>
                </View>
            </LinearGradient>
        </Modal>
    );
}

function OptionRow({label, selected, onPress}) {
    return (
        <Pressable onPress={onPress} style={styles.optionRow}>
            <Text style={[styles.optionText, selected && {color: PURPLE}]}>{label}</Text>
            {selected && <Text style={styles.check}>✓</Text>}
        </Pressable>
    );
}

/* ----------- Social Links Sheet ----------- */
function SocialLinksSheet({visible, onClose, accounts}) {
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
                    <Text style={styles.modalTitle}>Social Media Accounts</Text>

                    {/* Divider */}
                    <View style={styles.divider}/>

                    {accounts.map((acc) => (
                        <Pressable
                            key={acc.key}
                            style={styles.socialRow}
                            onPress={() => Linking.openURL(acc.url)}
                        >
                            <View style={[styles.socialIconWrap, {backgroundColor: acc.bg}]}>
                                <Ionicons name={acc.icon} size={18} color="#fff"/>
                            </View>
                            <Text style={styles.socialText}>{acc.label}</Text>
                        </Pressable>
                    ))}
                </View>
            </LinearGradient>
        </Modal>
    );
}

/* ---------------------- Styles ---------------------- */
const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: COLORS.background},

    profileSection: {backgroundColor: "transparent", paddingTop: 20, paddingHorizontal: 20},
    profileInfo: {flexDirection: "row", alignItems: "center", marginBottom: 10},
    avatarContainer: {position: "relative", marginRight: 20},
    avatar: {width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: COLORS.secondary},
    badge: {position: "absolute", bottom: 0, right: 0, width: 30, height: 30},
    badgeImage: {width: 30, height: 30, borderRadius: 15},
    stats: {flexDirection: "row", flex: 1, justifyContent: "space-around"},
    statItem: {alignItems: "center"},
    statNumber: {color: "white", fontSize: 24, fontWeight: "bold"},
    statLabel: {color: "#FFFFFF", fontSize: 17},
    profileDetails: {marginBottom: 20},
    username: {color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 5},
    fullName: {color: "#888", fontSize: 16, marginBottom: 5},
    bio: {color: "#CCC", fontSize: 14, lineHeight: 20, marginBottom: 1},
    hashtag: {color: "#9F7AEA"},
    category: {color: "#888", fontSize: 14},

    actionsRow: {flexDirection: "row", paddingHorizontal: 16, justifyContent: "space-between", flexWrap: "wrap"},
    pill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginTop: 8,
    },
    pillIcon: {color: TEXT, marginRight: 8},
    pillText: {color: TEXT, fontWeight: "600"},

    title: {backgroundColor: "transparent", marginHorizontal: 16, paddingVertical: 16, marginTop: 10},
    cardHeader: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4},
    cardTitle: {color: TEXT, fontWeight: "700", fontSize: 16},
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#241f34",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#383050",
    },

    card: {backgroundColor: "transparent", marginTop: 16, marginHorizontal: 16},

    // Sheet base styles (used by filter/month + socials)
    modalOverlay: {flex: 1, backgroundColor: "rgba(0,0,0,0.35)"},
    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(14,14,18,0.9)",
        borderTopLeftRadius: SHEET_RADIUS,
        borderTopRightRadius: SHEET_RADIUS,
        overflow: "hidden",
    },
    sheetStroke: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: SHEET_RADIUS,
        borderTopRightRadius: SHEET_RADIUS,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.06)",
    },
    content: {padding: 16, paddingBottom: 24},
    grabber: {
        alignSelf: "center",
        width: 44,
        height: 4,
        borderRadius: 2,
        backgroundColor: "rgba(255,255,255,0.35)",
        marginVertical: 10,
    },
    modalTitle: {color: "#FFFFFF", fontWeight: "700", fontSize: 16, marginBottom: 6},
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "rgba(255,255,255,0.18)",
        marginHorizontal: 0,
        marginBottom: 10,
    },

    optionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#333",
    },
    optionText: {color: TEXT, fontSize: 15},
    check: {color: PURPLE, fontSize: 15},

    monthControls: {flexDirection: "row", alignItems: "center"},
    monthTag: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 6,
        gap: 6,
    },
    monthText: {color: COLORS.text, fontWeight: "400", fontSize: 13},
    wrapper: {borderRadius: 10, marginHorizontal: 12},

    // Social rows
    socialRow: {flexDirection: "row", alignItems: "center", paddingVertical: 12},
    socialIconWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    socialText: {color: "#FFFFFF", fontSize: 14},
    linkWrap: {
        alignSelf: 'flex-start',
    },
    linkWrapPressed: {
        opacity: 0.6,
    },
    linkText: {
        color: '#B3B7C0',
        fontWeight: '700',
        fontSize: 16,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: 'rgba(255,255,255,0.35)',
    },
});
