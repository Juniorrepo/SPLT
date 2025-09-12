// ProgramDetails.tsx
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TopBar from "../common/TopBar";
import ProgramMetaCard from "./Program/ProgramMetaCard";
import ColorS from "../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";

const {width} = Dimensions.get("window");

// ====== THEME ======
const COLORS = {
    bg: "#0E0A14",
    surface: "#171120",
    surfaceAlt: "#1E1729",
    stroke: "#2B2340",
    text: "#F2F1F6",
    textDim: "#CFCBDA",
    textMuted: "#9C95AD",
    purple: "#7B57F2",
    yellow: "#FFC247",
    overlay: "rgba(0,0,0,0.35)",
};

const PAD = 20;
const RADIUS = 14;

const IMAGE = {
    uri: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

// ====== TYPES (optional) ======
type Program = {
    title: string;
    author: string;
    rating: number;
    downloads: number;
    level: string;
    goal: string;
    daysPerWeek: string;
    duration: string;
    description: string;
    workouts: {
        id: string;
        title: string;
        image: any;
        exercises: { id: string; name: string; sets: string; reps: string }[];
    }[];
};

type Props = {
    program?: Program;
    onBack?: () => void;
    onShare?: () => void;
    onSaveToFolders?: () => void;
};

// ====== MOCK (falls back if no props.program) ======
const DEFAULT_PROGRAM: Program = {
    title: "12 Week Fat Destroyer",
    author: "SPLT",
    rating: 4.8,
    downloads: 200,
    level: "Intermediate",
    goal: "Cutting / Losing weight",
    daysPerWeek: "4 Days",
    duration: "3 Months",
    description:
        "This workout plan is designed to help you build strength, improve endurance, and enhance overall fitness. It includes a mix of cardio, strength training, and flexibility exercises tailored to your fitness level. Each week, you'll progressively challenge yourself with varied workouts to keep things engaging and effective. Let's get started on your fitness journey!",
    workouts: [
        {
            id: "w1",
            title: "Upper Body",
            image: IMAGE,
            exercises: [
                {id: "e1", name: "Ab Scissors", sets: "5 sets", reps: "8 - 10 reps"},
                {id: "e2", name: "Bench Press", sets: "4 sets", reps: "6 - 8 reps"},
                {id: "e3", name: "Lat Pulldown", sets: "4 sets", reps: "10 - 12 reps"},
                {id: "e4", name: "Shoulder Press", sets: "3 sets", reps: "8 - 10 reps"},
            ],
        },
    ],
};

export default function ProgramDetails({
                                           program = DEFAULT_PROGRAM,
                                           onBack,
                                           onShare,
                                           onSaveToFolders,
                                           navigation, openDrawer,
                                       }: Props) {
    const firstWorkout = program.workouts[0];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                    <Ionicons name="chevron-back" size={22} color={COLORS.text}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={styles.headerBtn}>
                    <Ionicons name="share-social-outline" size={20} color={COLORS.text}/>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 36}}
            >
                <View style={styles.heroCard}>
                    <Image source={IMAGE} style={styles.heroImg}/>
                    <View style={styles.heroInfo}>
                        <Text style={styles.heroTitle} numberOfLines={1}>
                            {program.title}
                        </Text>
                        <Text style={styles.heroBy}>By: {program.author}</Text>
                    </View>
                </View>

                <ProgramMetaCard
                    rating={program.rating}
                    downloads={program.downloads}
                    level={program.level}
                    goal={program.goal}
                    daysPerWeek={program.daysPerWeek}
                    duration={program.duration}
                />

                {/* CTA */}
                <LinearGradient
                    colors={ColorS.gradient}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.cta}
                >
                    <TouchableOpacity onPress={onSaveToFolders}>
                        <Text style={styles.ctaText}>Save to Folders</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <SectionTitle title="Description :"/>
                <Text style={styles.description}>{program.description}</Text>

                <SectionTitle title="Workouts :"/>
                <LinearGradient colors={["#36464C", "#121212"]} style={styles.workoutCard}>
                    <View >
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={firstWorkout.image} style={styles.workoutImg}/>
                            <Text style={styles.workoutTitle}>{firstWorkout.title}</Text>

                            <TouchableOpacity style={styles.bookmarkBtn}>
                                <Ionicons name="bookmark-outline" size={30} color={COLORS.text}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.workoutOverlay}/>

                        <View style={styles.exerciseList}>
                            {firstWorkout.exercises.map((ex) => (
                                <View key={ex.id} style={styles.exerciseRow}>
                                    <View style={styles.exerciseLeft}>
                                        <View style={styles.exerciseIcon}>
                                            <Image source={firstWorkout.image}
                                                   style={{height: 60, width: 60, borderRadius: 6,}}/>
                                        </View>
                                        <Text style={styles.exerciseName} numberOfLines={1}>
                                            {ex.name}
                                        </Text>
                                    </View>
                                    <View style={styles.exerciseRight}>
                                        <Text style={styles.exerciseMeta}>{ex.sets}</Text>
                                        <Text style={[styles.exerciseMeta, {opacity: 0.8}]}>
                                            {ex.reps}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
}

function SectionTitle({title}: { title: string }) {
    return (
        <Text style={styles.sectionTitle}>
            {title}
        </Text>
    );
}

// ====== STYLES ======
const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: ColorS.background},

    header: {
        paddingHorizontal: PAD,
        paddingTop: 30,
        paddingBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerBtn: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },

    heroCard: {
        padding: PAD,
        marginHorizontal: PAD,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    heroImg: {
        width: "70%",
        height: width * 0.6,
        backgroundColor: "#1D1A22",
    },
    heroInfo: {
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    heroTitle: {
        color: COLORS.text,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    heroBy: {
        color: COLORS.textDim,
        textAlign: "center",
        fontSize: 12,
    },

    metricsRow: {
        marginHorizontal: PAD,
        marginTop: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    metric: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    metricBig: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },
    metricCaption: {
        color: COLORS.textDim,
        fontSize: 12,
    },
    starsRow: {
        flexDirection: "row",
        gap: 2,
    },
    dividerV: {
        width: 1,
        height: 42,
        backgroundColor: "#363636",
        marginHorizontal: 10,
    },

    statGrid: {
        marginHorizontal: PAD,
        marginTop: 14,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS,
        borderWidth: 1,
        borderColor: COLORS.stroke,
        overflow: "hidden",
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.stroke,
    },
    statIconWrap: {
        width: 30,
        height: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surfaceAlt,
        borderWidth: 1,
        borderColor: COLORS.stroke,
        marginRight: 12,
    },
    statLabel: {
        color: COLORS.textDim,
        fontSize: 12,
        marginBottom: 4,
    },
    statValue: {
        color: COLORS.text,
        fontSize: 14,
    },

    cta: {
        marginHorizontal: PAD,
        marginTop: 16,
        height: 60,
        borderRadius: 10,
        backgroundColor: COLORS.purple,
        alignItems: "center",
        justifyContent: "center",
    },
    ctaText: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "600",
    },

    sectionTitle: {
        marginHorizontal: PAD,
        marginTop: 18,
        marginBottom: 8,
        color: COLORS.text,
        fontSize: 20,
        fontWeight: "600",
    },
    description: {
        marginHorizontal: PAD,
        marginTop: 18,
        marginBottom: 8,
        color: COLORS.text,
        fontSize: 20,
        fontWeight: "400",
    },
    workoutCard: {
        marginHorizontal: PAD,
        paddingVertical: PAD,
        marginBottom: 28,
        backgroundColor: "#36464C",
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: RADIUS,
        overflow: "hidden",
    },
    workoutImg: {
        borderRadius: RADIUS,
        width: "70%",
        height: width * 0.65,
    },
    workoutOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.overlay,
    },
    workoutTitle: {
        color: COLORS.text,
        fontSize: 20,
        paddingVertical: PAD,
        fontWeight: "600",
    },
    bookmarkBtn: {
        position: "absolute",
        right: 20,
        top: 0,
        width: 30,
        height: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    exerciseList: {
        padding: 12,
        gap: 10,
    },
    exerciseRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: COLORS.stroke,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 80,
    },
    exerciseLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    exerciseIcon: {
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    exerciseName: {
        color: COLORS.text,
        fontSize: 14,
    },
    exerciseRight: {
        alignItems: "flex-end",
    },
    exerciseMeta: {
        color: COLORS.textDim,
        fontSize: 12,
    },
});
