// WorkoutActionSheet.jsx
import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    Animated,
    Easing,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
    text: "#F2F1F6",
    danger: "#F87171",
    g1: "#B57FE6",
    g2: "#6645AB",
};

export default function WorkoutActionSheet({ visible, onClose, onAction }) {
    const slideY = useRef(new Animated.Value(200)).current;
    const fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideY, {
                    toValue: 0,
                    duration: 220,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(fade, {
                    toValue: 1,
                    duration: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideY, {
                    toValue: 200,
                    duration: 200,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(fade, {
                    toValue: 0,
                    duration: 160,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handle = (type) => {
        onAction && onAction(type);
        onClose && onClose();
    };

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
            {/* Backdrop */}
            <Animated.View style={[styles.backdrop, { opacity: fade }]}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
            </Animated.View>

            {/* Sheet */}
            <Animated.View style={[styles.sheetWrap, { transform: [{ translateY: slideY }] }]}>
                {/* Base purple gradient */}
                <LinearGradient
                    colors={[COLORS.g1, COLORS.g2]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.sheetCard}
                >
                    {/* 20% black overlay (like stacked CSS gradients) */}
                    <LinearGradient
                        colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.2)"]}
                        style={styles.sheetInner}
                    >
                        <View style={styles.handle} />

                        <View style={styles.actionRow}>
                            <ActionIcon icon="flame" label="Super set" onPress={() => handle("superset")} />
                            <ActionIcon icon="swap-vertical" label="Reorder" onPress={() => handle("reorder")} />
                            <ActionIcon icon="eye-outline" label="View" onPress={() => handle("view")} />
                            <ActionIcon
                                icon="trash-outline"
                                label="Delete"
                                danger
                                onPress={() => handle("delete")}
                            />
                        </View>

                        <View style={styles.homeIndicator} />
                    </LinearGradient>
                </LinearGradient>
            </Animated.View>
        </Modal>
    );
}

function ActionIcon({ icon, label, onPress, danger }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.actionIcon,
                pressed && { backgroundColor: "rgba(255,255,255,0.12)" },
            ]}
        >
            <Ionicons
                name={icon}
                size={22}
                color={danger ? COLORS.danger : COLORS.text}
                style={{ marginBottom: 6 }}
            />
            <Text style={[styles.actionIconText, danger && { color: COLORS.danger }]}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    sheetWrap: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    sheetCard: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },
    sheetInner: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    handle: {
        alignSelf: "center",
        width: 44,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.9)",
        marginBottom: 14,
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
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
    actionIconText: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: "600",
    },
    homeIndicator: {
        alignSelf: "center",
        width: 120,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.8)",
        marginTop: 16,
    },
});
