// PostWorkoutCongratsScreen.js
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import ConfettiCannon from "react-native-confetti-cannon";
import TopBar from "../common/TopBar";

const { width } = Dimensions.get("window");

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "#CFCBDA",
    stroke: "rgba(255,255,255,0.14)",
};

export default function PostWorkoutCongratsScreen({ navigation, route, openDrawer }) {
    const points = route?.params?.points ?? 100;

    const handlePost = route?.params?.onPost
        ? route.params.onPost
        : () => navigation?.navigate?.("PostWorkout");

    const handleLater = route?.params?.onLater
        ? route.params.onLater
        : () => navigation?.goBack?.();

    return (
        <SafeAreaView style={styles.container}>
            <TopBar
                variant="finishedworkout"
                onBackPress={() => navigation.goBack()}
                onSearch={() => {}}
                onNotificationPress={() => {}}
                onMenuPress={openDrawer}
            />
            {/* Confetti overlay */}
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                <ConfettiCannon
                    count={140}
                    origin={{ x: width * 0.5, y: -10 }}
                    fadeOut
                    fallSpeed={2500}
                />
            </View>

            <View style={styles.content}>
                {/* Check Ring */}
                <LinearGradient
                    colors={["#7A51D3", "#4B2F86"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.ring}
                >
                    <View style={styles.ringHole}>
                        <View style={styles.innerDot}>
                            <Ionicons name="checkmark" size={44} color={THEME.text} />
                        </View>
                    </View>
                </LinearGradient>

                <View style={{ height: 24 }} />

                {/* Copy */}
                <Text style={styles.title}>
                    Congratulations you got <Text style={styles.titleEm}>{points} Point</Text>
                </Text>
                <Text style={styles.subtitle}>For posting your workout</Text>

                <View style={{ height: 28 }} />

                {/* Buttons */}
                <TouchableOpacity activeOpacity={0.9} onPress={handlePost}>
                    <LinearGradient
                        colors={["#B57FE6", "#6645AB"]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.primaryBtn}
                    >
                        <Text style={styles.primaryBtnText}>Post Workout</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handleLater}
                    style={styles.secondaryBtn}
                >
                    <Text style={styles.secondaryBtnText}>Later</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.bg },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    // Ring
    ring: {
        width: 180,
        height: 180,
        borderRadius: 90,
        padding: 12, // creates the ring thickness
        alignItems: "center",
        justifyContent: "center",
    },
    ringHole: {
        width: "100%",
        height: "100%",
        borderRadius: 90,
        backgroundColor: THEME.bg, // makes the donut hole
        alignItems: "center",
        justifyContent: "center",
    },
    innerDot: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#3B2A67",
        alignItems: "center",
        justifyContent: "center",
    },

    // Text
    title: {
        color: THEME.text,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500",
    },
    titleEm: { fontWeight: "800" },
    subtitle: {
        marginTop: 2,
        color: THEME.dim,
        fontSize: 14,
        textAlign: "center",
    },

    // Buttons
    primaryBtn: {
        height: 48,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        minWidth: 260,
    },
    primaryBtnText: { color: THEME.text, fontSize: 15, fontWeight: "700" },
    secondaryBtn: {
        height: 48,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        minWidth: 260,
        borderWidth: 1,
        borderColor: THEME.stroke,
        marginTop: 12,
        backgroundColor: "transparent",
    },
    secondaryBtnText: {
        color: THEME.text,
        fontSize: 15,
        fontWeight: "700",
        opacity: 0.9,
    },
});
