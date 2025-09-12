import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
    rating: number;
    downloads: number | string;
    level: string;
    goal: string;
    daysPerWeek: string;
    duration: string;
    style?: ViewStyle;
};

const COLORS = {
    text: "#FFFFFF",
    textDim: "#CFCBDA",
    star: "#FFD700",
};

export default function ProgramMetaCard({
                                            rating,
                                            downloads,
                                            level,
                                            goal,
                                            daysPerWeek,
                                            duration,
                                            style,
                                        }: Props) {
    return (
        <View style={[styles.wrapper, style]}>
            <View style={styles.row}>
                <View style={styles.colCenter}>
                    <Text style={styles.kpi}>{Number(rating).toFixed(1)}</Text>
                    <View style={styles.starsRow}>
                        {[...Array(5)].map((_, i) => (
                            <Ionicons
                                key={i}
                                name={"star"}
                                size={23}
                                color={COLORS.star}
                                style={{ marginRight: 2 }}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.vDivider} />

                <View style={styles.colCenter}>
                    <Text style={styles.kpi}>{downloads}</Text>
                    <Text style={styles.caption}>Downloads</Text>
                </View>
            </View>

            <View style={styles.hDivider} />

            <View style={styles.row}>
                <View style={styles.colLeft}>
                    <Ionicons
                        name="bar-chart-outline"
                        size={30}
                        color={COLORS.text}
                        style={styles.icon}
                    />
                    <View style={styles.detail}>
                        <Text style={styles.label}>Level :</Text>
                        <Text style={styles.value}>{level}</Text>
                    </View>
                </View>

                <View style={styles.vDivider} />

                <View style={styles.colLeft}>
                    <Ionicons
                        name="heart-outline"
                        size={30}
                        color={COLORS.text}
                        style={styles.icon}
                    />
                    <View style={styles.detail} >
                        <Text style={styles.label}>Main Goal :</Text>
                        <Text style={styles.value}>{goal}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.hDivider} />

            {/* Days per week and Duration */}
            <View style={styles.row}>
                <View style={styles.colLeft}>
                    <Ionicons
                        name="calendar-outline"
                        size={30}
                        color={COLORS.text}
                        style={styles.icon}
                    />
                    <View style={styles.detail} >
                        <Text style={styles.label}>Days/Week:</Text>
                        <Text style={styles.value}>{daysPerWeek}</Text>
                    </View>
                </View>

                <View style={styles.vDivider} />

                <View style={styles.colLeft}>
                    <Ionicons
                        name="time-outline"
                        size={30}
                        color={COLORS.text}
                        style={styles.icon}
                    />
                    <View style={styles.detail} >
                        <Text style={styles.label}>Duration:</Text>
                        <Text style={styles.value}>{duration}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 20,
        marginTop: 16,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    colCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    colLeft: {
        flex: 1,
        flexDirection: "row",
        justifyContent:"center",
        marginLeft: 20,
        alignItems: "center",
        paddingVertical: 20,

    },
    kpi: {
        color: COLORS.text,
        fontSize: 40,
        fontWeight: "400",
    },
    caption: {
        fontSize: 18,
        marginTop: 2,
        color: COLORS.textDim,
    },
    starsRow: {
        flexDirection: "row",
        marginTop: 4,
    },
    vDivider: {
        width: 2,
        height: "60%",
        alignSelf: "center",
        marginHorizontal: 14,
        backgroundColor: "#363636",
    },
    hDivider: {
        height: 1,
        marginVertical: 10,
        backgroundColor: "#363636",
    },
    icon: {
        marginRight: 8,
    },
    detail: {
        width: 110,
        // maxWidth: 150,
    },
    label: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 2,
    },
    value: {
        color: COLORS.textDim,
        fontSize: 16,
    },
});
