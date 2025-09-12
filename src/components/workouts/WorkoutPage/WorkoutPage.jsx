import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

import TopBar from "../../common/TopBar";
import SectionTitle from "../../Track/SectionTitle";
import Colors from "../../../constants/Colors";
import WorkoutActionSheet from "./WorkoutActionSheet";

const { width } = Dimensions.get("window");

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    textDim: "#CFCBDA",
    stroke: "#2B2340",
    dashed: "#7B57F266",
};

const PAD = 18;

const THUMB = {
    uri: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=640",
};

export default function WorkoutPlanScreen({ navigation, openDrawer }) {
    const [sheetVisible, setSheetVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const handleAction = (type, item) => {
        if (type === "view") {
            navigation.navigate("WorkoutDetail", {
                title: item,
                videoSource: { uri: "https://www.w3schools.com/html/mov_bbb.mp4" },
            });
        }

        if (type === "superset") {
        }

        if (type === "reorder") {
        }

        if (type === "delete") {
        }
    };
    return (
        <View style={[styles.container, { backgroundColor: Colors?.background || THEME.bg }]}>
            <TopBar
                variant="workouts"
                onSearch={() => {}}
                onNotificationPress={() => {}}
                onMenuPress={openDrawer}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
                {/* Metrics pill */}
                <View style={{ paddingHorizontal: PAD, paddingTop: 10 }}>
                    <LinearGradient
                        colors={["#B57FE6", "#6645AB"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.metricsCard}
                    >
                        <Metric icon="time-outline" label="Duration" value="1h : 0s" />
                        {/*<View style={styles.vRule} />*/}
                        <Metric icon="barbell-outline" label="Volume" value="20kg" />
                        {/*<View style={styles.vRule} />*/}
                        <Metric icon="flame" label="Sets" value="12" />
                        {/*<View style={styles.vRule} />*/}
                        <Metric icon="trophy-outline" label="PR" value="5" />
                    </LinearGradient>
                </View>

                <SectionTitle title="Leg Day" style={{ paddingVertical: PAD, paddingHorizontal: 2 }} />

                {/* Regular exercises */}
                <View style={{ paddingHorizontal: PAD, gap: 12 }}>
                    <ExerciseCard
                        title="Leg Extension"
                        onMore={() => {
                            setActiveItem("Leg Extension");
                            setSheetVisible(true);
                        }}
                    />
                    <ExerciseCard
                        title="Leg Curl"
                        onMore={() => {
                            setActiveItem("Leg Curl");
                            setSheetVisible(true);
                        }}
                    />
                </View>

                {/* Superset */}
                <View
                    style={{
                        paddingHorizontal: PAD,
                        marginTop: 18,
                        marginBottom: 6,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                    }}
                >
                    <Text style={[styles.micro, { color: THEME.textDim }]}>Super Set</Text>
                    <Ionicons name="flame" size={14} color={THEME.text} />
                </View>

                <View style={{ paddingHorizontal: PAD }}>
                    <View style={styles.supersetBox}>
                        <ExerciseCard
                            title="Squat"
                            compact
                            onMore={() => {
                                setActiveItem("Squat");
                                setSheetVisible(true);
                            }}
                        />
                        <ExerciseCard
                            title="Deadlift"
                            compact
                            onMore={() => {
                                setActiveItem("Deadlift");
                                setSheetVisible(true);
                            }}
                        />
                    </View>
                </View>

                {/* Buttons */}
                <View style={{ paddingHorizontal: PAD, marginTop: 25, gap: 12, paddingVertical: PAD }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate('StartWorkoutPage')}>
                        <LinearGradient
                            colors={["#B57FE6", "#6645AB"]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={[styles.btn, { borderWidth: 0 }]}
                        >
                            <Text style={styles.btnTxt}>Start workout</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9} style={[styles.btn, styles.btnGhost]} onPress={()=>navigation.navigate('AddExercise')}>
                        <Text style={[styles.btnTxt, { color: THEME.text }]}>Add Exercise</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 18 }} />
            </ScrollView>

            <WorkoutActionSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                onAction={(type) => {
                    handleAction(type, activeItem);
                    setSheetVisible(false);
                }}
            />
        </View>
    );
}

/* ---------------- components ---------------- */

function Metric({ icon, label, value }) {
    return (
        <View style={styles.metricItem}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Ionicons name={icon} size={14} color={THEME.text} />
                <Text style={styles.metricLabel}>{label}</Text>
            </View>
            <Text style={styles.metricValue}>{value}</Text>
        </View>
    );
}

function ExerciseCard({ title, compact = false, onMore }) {
    return (
        <LinearGradient
            colors={["#6645AB33", "#FFFFFF00"]}
            style={[styles.card, compact && { marginVertical: 6 }]}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={THUMB} style={styles.thumb} />
                <Text style={styles.cardTitle} numberOfLines={1}>
                    {title}
                </Text>
            </View>

            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={onMore}>
                <Ionicons name="ellipsis-vertical" size={18} color={THEME.text} />
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    metricsCard: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: THEME.stroke,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    metricItem: { flex: 1, gap: 6 },
    metricLabel: { color: THEME.textDim, fontSize: 12 },
    metricValue: { color: THEME.text, fontSize: 13, fontWeight: "600" },
    vRule: { width: 1, height: 28, backgroundColor: THEME.stroke, opacity: 0.7 },

    card: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: THEME.stroke,
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    thumb: {
        width: 40,
        height: 40,
        borderRadius: 6,
        marginRight: 10,
        backgroundColor: "#1b1623",
    },
    cardTitle: { color: THEME.text, fontSize: 14, fontWeight: "600", maxWidth: width * 0.6 },

    supersetBox: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: THEME.dashed,
        borderRadius: 14,
        padding: 10,
    },

    btn: {
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: THEME.stroke,
    },
    btnGhost: { backgroundColor: "transparent" },
    btnTxt: { color: THEME.text, fontSize: 15, fontWeight: "600" },

    micro: { fontSize: 12 },

    // Action sheet
    backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
    sheetWrap: { position: "absolute", left: 0, right: 0, bottom: 0 },
    sheetCard: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },
    handle: {
        alignSelf: "center",
        width: 44,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.9)",
        marginBottom: 14,
    },
    actionRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
    actionIcon: {
        flex: 1,
        height: 78,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        backgroundColor: "rgba(255,255,255,0.06)",
        alignItems: "center",
        justifyContent: "center",
    },
    actionIconText: { color: THEME.text, fontSize: 13, fontWeight: "600" },
    homeIndicator: {
        alignSelf: "center",
        width: 120,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.8)",
        marginTop: 16,
    },
});
