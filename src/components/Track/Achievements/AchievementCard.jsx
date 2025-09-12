import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../../constants/Colors";

const AchievementCard = ({
                             variant = "gradient",
                             title,
                             value,
                             icon,
                             onPress,
                         }) => {
    const Comp = onPress ? TouchableOpacity : View;

    const isRow = variant === "outline";

    if (isRow) {
        return (
            <Comp style={styles.cardBase} activeOpacity={0.9} onPress={onPress}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={COLORS.gradient}
                    style={[styles.row, styles.gradBg]}
                >
                    <View style={styles.rowLeft}>
                        <View style={styles.iconWrap}>
                            <Ionicons name={icon} size={40} color="#FFF" />
                        </View>
                        <Text style={styles.rowTitle}>{title}</Text>
                    </View>
                    {!!value && <Text style={styles.rowValue}>{value}</Text>}
                </LinearGradient>
            </Comp>
        );
    }

    // if (isWideGrad) {
    //     // Gradient wide row (Measurements)
    //     return (
    //         <Comp style={styles.cardBase} activeOpacity={0.9} onPress={onPress}>
    //             <LinearGradient
    //                 start={{ x: 0, y: 0 }}
    //                 end={{ x: 1, y: 1 }}
    //                 colors={COLORS.gradient}
    //                 style={[styles.row, styles.gradBg]}
    //             >
    //                 <View style={styles.rowLeft}>
    //                     <View style={styles.iconWrap}>
    //                         <Ionicons name={icon} size={22} color="#FFF" />
    //                     </View>
    //                     <Text style={styles.rowTitle}>{title}</Text>
    //                 </View>
    //                 {!!value && <Text style={styles.rowValue}>{value}</Text>}
    //             </LinearGradient>
    //         </Comp>
    //     );
    // }

    // Gradient tile (half width)
    return (
        <Comp style={styles.cardBase} activeOpacity={0.9} onPress={onPress}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={COLORS.gradient}
                style={[styles.tile, styles.gradBg]}
            >
                <View style={styles.left}>
                    <View style={styles.iconWrap}>
                        <Ionicons name={icon} size={22} color="#FFF" />
                    </View>
                    <Text style={styles.tileTitle}>{title}</Text>
                </View>
                {!!value && <Text style={styles.tileValue}>{value}</Text>}
            </LinearGradient>
        </Comp>
    );
};

export default AchievementCard;

const styles = StyleSheet.create({
    cardBase: { marginBottom: 12 },

    gradBg: {
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.10)",
    },
    rowBg: {
        backgroundColor: "rgba(126,68,255,0.15)",
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.10)",
    },

    iconWrap: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    tile: {
        minHeight: 110,
        padding: 14,
        justifyContent: "space-between",
    },
    left: { flexDirection: "row", alignItems: "center" },
    tileTitle: {
        marginLeft: 10,
        color: "rgba(255,255,255,0.88)",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 0.3,
    },
    tileValue: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "900",
    },

    row: {
        minHeight: 72,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowLeft: { flexDirection: "row", alignItems: "center" },
    rowTitle: {
        marginLeft: 10,
        color: "rgba(255,255,255,0.88)",
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 0.3,
    },
    rowValue: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "900",
    },
});
