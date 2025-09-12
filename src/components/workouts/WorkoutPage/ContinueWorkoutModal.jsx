// ContinueWorkoutModal.js
import React, {useEffect, useRef} from "react";
import {View, Text, Modal, Pressable, StyleSheet, Animated, Easing} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const THEME = {
    text: "#F2F1F6",
    textDim: "#CFCBDA",
    stroke: "rgba(255,255,255,0.12)",
};

export default function ContinueWorkoutModal({
                                                 visible,
                                                 onContinue,
                                                 onDiscard,
                                                 onRequestClose,
                                             }) {
    const slide = useRef(new Animated.Value(80)).current; // start slightly below

    useEffect(() => {
        Animated.timing(slide, {
            toValue: visible ? 0 : 80,
            duration: 220,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
            <Pressable style={styles.backdrop} onPress={onRequestClose}/>

            <Animated.View style={[styles.wrap, {transform: [{translateY: slide}]}]}>
                <LinearGradient
                    colors={["#B57FE6", "#6645AB"]}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    style={styles.card}
                >
                    <Text style={styles.title}>Workout in progress</Text>

                    <View style={styles.row}>
                        <Pressable onPress={onContinue} style={[styles.action, styles.continue]}>
                            <Text style={styles.actionText}>Continue ✓</Text>
                        </Pressable>

                        <Pressable onPress={onDiscard} style={[styles.action, styles.discard]}>
                            <Text style={[styles.actionText, {opacity: 0.92}]}>Discard ✗</Text>
                        </Pressable>
                    </View>

                    <View style={styles.homeIndicator}/>
                </LinearGradient>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)"},
    wrap: {
        position: "absolute",
        left: 18,
        right: 18,
        bottom: 24,
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: THEME.stroke,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    title: {color: THEME.text, textAlign: "center", fontWeight: "600", marginBottom: 12},
    row: {flexDirection: "row", gap: 10},
    action: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    continue: {
        backgroundColor: "rgba(255,255,255,0.18)",
    },
    discard: {
        backgroundColor: "transparent",
    },
    actionText: {color: THEME.text, fontSize: 15, fontWeight: "600"},
    homeIndicator: {
        alignSelf: "center",
        width: 120,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.8)",
        marginTop: 14,
    },
});
