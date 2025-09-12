import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    LayoutAnimation,
    UIManager,
    Platform,
    useWindowDimensions,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

/* Enable LayoutAnimation on Android Paper; harmless to skip on Fabric */
const isAndroid = Platform.OS === "android";
const isFabric = !!global?.nativeFabricUIManager;
if (isAndroid && !isFabric && UIManager?.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* Theme */
const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
    line: "rgba(110,86,205,0.35)",
};

/* 1px gradient frame */
const GradientFrame = ({children, radius = 12, pad = 10, style}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={[{borderRadius: radius, padding: 1}, style]}>
        <View style={{borderRadius: radius - 1, backgroundColor: THEME.card, overflow: "hidden", padding: pad}}>
            {children}
        </View>
    </LinearGradient>
);

/* ---- Images (ensure files exist; names are case-sensitive) ---- */
const IMAGES = {
    step1: require("../../assets/getting-started/setp1.png"),
    step2: require("../../assets/getting-started/setp2.png"),
    step3: require("../../assets/getting-started/setp3.png"),
    step4: require("../../assets/getting-started/step4.png"),
};

/* ---- Content (edit text/images as you like) ---- */
const CONTENT = [
    {
        key: "Account",
        body:
            "At the top of your account page, you’ll see your profile picture, username, full name, and short bio. Your connected social media icons also appear here.",
        image: IMAGES.step1,
    },
    {
        key: "Time Spent",
        body:
            "View your workout time stats for the current week. The number at the top is your average daily training time. Bars show each day from Fri → Today.",
        image: IMAGES.step4,
    },
    {
        key: "Account History",
        body: "Review changes to your profile and key account events in a single timeline.",
        image: IMAGES.step2,
    },
    {
        key: "Reviews",
        body: "See feedback you’ve received and manage which reviews are visible on your profile.",
        image: IMAGES.step3,
    },
    {
        key: "Subscriptions",
        body: "Manage your active plans, billing cycle, and renewal preferences.",
        image: IMAGES.step2,
    },
    {
        key: "Push Notification",
        body: "Choose the alerts you want for workouts, reminders, and progress updates.",
        image: IMAGES.step3,
    },
    {
        key: "App Theme",
        body:
            "Manage dark/light mode.\n• On: dark mode permanently\n• Off: light mode permanently\n• Use system setting: match your device theme automatically.",
        image: IMAGES.step1,
    },
];

/* ---- Screen ---- */
export default function AccountHelpAccordion({navigation}) {
    const {width} = useWindowDimensions();
    const [openKey, setOpenKey] = useState(CONTENT[0].key); // first open (like your screenshot)

    const IMG_H = Math.round((width - 32) * 0.62); // responsive image height

    const toggle = (key) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenKey((prev) => (prev === key ? null : key));
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <ScrollView contentContainerStyle={styles.container}>
                {/* List */}
                {CONTENT.map((item) => {
                    const active = openKey === item.key;
                    return (
                        <View key={item.key} style={{marginBottom: 10}}>
                            <GradientFrame radius={10} pad={0}>
                                <Pressable onPress={() => toggle(item.key)} style={styles.row}>
                                    <Text style={styles.rowText}>{item.key}</Text>
                                    <Ionicons name={active ? "chevron-down" : "chevron-forward"} size={18}
                                              color="#c8c6ff"/>
                                </Pressable>
                            </GradientFrame>

                            {/* Detail directly under the item */}
                            {active && (
                                <View style={styles.detailWrap}>
                                    <Text style={styles.detailTitle}>{item.key}</Text>
                                    <Text style={styles.detailBody}>{item.body}</Text>
                                    <GradientFrame>
                                        <Image source={item.image} resizeMode="cover"
                                               style={{width: "100%", height: IMG_H, borderRadius: 10}}/>
                                    </GradientFrame>
                                </View>
                            )}
                        </View>
                    );
                })}

                <View style={{height: 16}}/>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---- Styles ---- */
const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16, paddingBottom: 24},

    row: {
        minHeight: 52,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowText: {color: "#fff", fontSize: 15, fontWeight: "600"},

    detailWrap: {marginTop: 10, marginBottom: 6},
    detailTitle: {color: "#fff", fontSize: 14, fontWeight: "700", marginBottom: 6},
    detailBody: {color: THEME.muted, fontSize: 13, lineHeight: 19, marginBottom: 10},
});
