import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "./TopBar";

/* ---------- Gradient 1px border wrapper ---------- */
const BORDER_WIDTH = 1;
const GradientBorder: React.FC<{ radius?: number; style?: any }> = ({
                                                                        radius = 8,
                                                                        style,
                                                                        children,
                                                                    }) => (
    <LinearGradient
        colors={["#B57FE6", "#6645AB"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[{borderRadius: radius, padding: BORDER_WIDTH}, style]}
    >
        <View
            style={{
                borderRadius: radius - BORDER_WIDTH,
                overflow: "hidden",
                backgroundColor: COLORS.background,
            }}
        >
            {children}
        </View>
    </LinearGradient>
);

/* ---------- One setting row ---------- */
type Row = {
    label: string;
    icon: React.ReactNode;
    onPress?: () => void;
};

const SettingRow: React.FC<Row> = ({label, icon, onPress}) => (
    <GradientBorder style={styles.rowWrap}>
        <Pressable
            onPress={onPress}
            android_ripple={{color: "rgba(255,255,255,0.06)"}}
            style={styles.row}
        >
            <View style={styles.rowLeft}>
                <View style={styles.iconBox}>{icon}</View>
                <Text style={styles.rowLabel}>{label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#c8c6ff"/>
        </Pressable>
    </GradientBorder>
);

const SettingsHubScreen: React.FC = ({navigation}: any) => {
    // ⬇️ Build sections here so you can call navigation.navigate(...)
    const sections: { title: string; rows: Row[] }[] = [
        {
            title: "How you use SPLT",
            rows: [
                {
                    label: "Account",
                    icon: <Ionicons name="person-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("Account")
                },
                {
                    label: "Time Spent",
                    icon: <Ionicons name="time-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("TimeSpent")
                },
                {
                    label: "Account History",
                    icon: <Ionicons name="newspaper-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("AccountHistory")
                },
                {
                    label: "Reviews",
                    icon: <Ionicons name="chatbubbles-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("Reviews")
                },
                {
                    label: "Subscriptions",
                    icon: <Ionicons name="card-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("Subscriptions")
                },
                {
                    label: "Push Notification",
                    icon: <Ionicons name="notifications-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("PushNotification")
                },
                {
                    label: "App Theme",
                    icon: <Ionicons name="color-palette-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("AppTheme")
                },
            ],
        },
        {
            title: "Manage your progress",
            rows: [
                {
                    label: "Workout History",
                    icon: <Ionicons name="barbell-outline" size={20} color="#fff"/>,
                    onPress: () => navigation.navigate("WorkoutHistory")
                },
                {
                    label: "Measurements",
                    icon: <Ionicons name="people-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("MeasurmentsScreen")
                },
                {
                    label: "Apple Health",
                    icon: <Ionicons name="logo-apple" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("AppleHealth")
                },
                {
                    label: "Units",
                    icon: <Ionicons name="stats-chart-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("Units")
                },
                {
                    label: "Integrations",
                    icon: <Ionicons name="stats-chart-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("Integrations")
                },
            ],
        },
        {
            title: "Who can see your content",
            rows: [
                {
                    label: "Account Privacy",
                    icon: <Ionicons name="lock-closed-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("AccountPrivacy")
                },
                {
                    label: "Close Friends",
                    icon: <Ionicons name="people-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("CloseFriend")
                },
                {
                    label: "Blocked",
                    icon: <Ionicons name="remove-circle-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("BlockedUsersScreen")
                },
                {
                    label: "Content Preferences",
                    icon: <Ionicons name="options-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("ContentPreferences")
                },
            ],
        },
        {
            title: "More info and support",
            rows: [
                {
                    label: "Getting Started",
                    icon: <Ionicons name="rocket-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("GettingStartedScreen")
                },
                {
                    label: "FAQs",
                    icon: <Ionicons name="help-circle-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("FaqScreen")
                },
                {
                    label: "About SPLT",
                    icon: <Ionicons name="information-circle-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("AboutSPLT")
                },
                {
                    label: "Contact SPLT",
                    icon: <Ionicons name="mail-outline" size={20} color="#c8c6ff"/>,
                    onPress: () => navigation.navigate("ContactSPLT")
                },
            ],
        },
    ];

    return (
        <SafeAreaView style={styles.safe}>
            <TopBar variant="setting" onBackPress={() => navigation.goBack()}/>
            <ScrollView contentContainerStyle={styles.container}>
                {sections.map((section) => (
                    <View key={section.title} style={{marginBottom: 16}}>
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                        <View style={{gap: 10}}>
                            {section.rows.map((r) => (
                                <SettingRow key={r.label} {...r} />
                            ))}
                        </View>
                    </View>
                ))}
                <View style={{height: 8}}/>
            </ScrollView>
        </SafeAreaView>
    );
};

/* ---------- styles ---------- */
const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: COLORS.background},
    container: {padding: 16},

    sectionHeader: {
        color: "#b8b9c5",
        fontSize: 14,
        marginBottom: 10,
        fontWeight: "700",
    },

    // no solid border here; GradientBorder draws it
    rowWrap: {backgroundColor: 'transparent', borderRadius: 6, borderWidth: 1.5, borderColor: '#6645AB', overflow: 'hidden'},

    row: {
        minHeight: 56,
        paddingHorizontal: 14,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowLeft: {flexDirection: "row", alignItems: "center", gap: 12},
    iconBox: {width: 34, height: 34, alignItems: "center", justifyContent: "center"},
    rowLabel: {color: "#e7e7ff", fontSize: 16, fontWeight: "600", letterSpacing: 0.2},
});

export default SettingsHubScreen;
