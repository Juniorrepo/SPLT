import React, {useEffect, useRef} from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
    Easing,
    Platform,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

const DEFAULT_GRADIENT = ["#B57FE6", "#6645AB"];

export default function ActionModal({
                                        visible,
                                        onClose,
                                        actions = [],
                                        gradientColors = DEFAULT_GRADIENT,
                                    }) {
    const slideY = useRef(new Animated.Value(200)).current;
    const fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const show = Animated.parallel([
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
        ]);

        const hide = Animated.parallel([
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
        ]);

        visible ? show.start() : hide.start();
    }, [visible, slideY, fade]);

    const handlePress = (a) => {
        a?.onPress?.();
        onClose?.();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            statusBarTranslucent
            presentationStyle="overFullScreen"
            onRequestClose={onClose}
        >
            <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, {opacity: fade}]}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose}/>
            </Animated.View>

            {/* Sheet */}
            <Animated.View style={[styles.sheetWrap, {transform: [{translateY: slideY}]}]}>
                <LinearGradient
                    colors={gradientColors}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    style={styles.sheetCard}
                >
                    <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.2)"]} style={styles.sheetInner}>
                        <View style={styles.handle}/>

                        <View style={styles.actionRow}>
                            {actions.map((a) => (
                                <Pressable
                                    key={a.key}
                                    onPress={() => handlePress(a)}
                                    style={({pressed}) => [styles.actionIcon, pressed && {backgroundColor: "rgba(255,255,255,0.12)"}]}
                                    android_ripple={{color: "rgba(255,255,255,0.12)", radius: 44}}
                                >
                                    <Ionicons
                                        name={a.icon}
                                        size={22}
                                        color={a.danger ? "#F87171" : "#F2F1F6"}
                                        style={{marginBottom: 6}}
                                    />
                                    <Text style={[styles.actionIconText, a.danger && {color: "#F87171"}]}
                                          numberOfLines={1}>
                                        {a.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>

                        <View style={styles.homeIndicator}/>
                    </LinearGradient>
                </LinearGradient>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {},
    sheetWrap: {position: "absolute", left: 0, right: 0, bottom: 0},
    sheetCard: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },
    sheetInner: {paddingVertical: 16, paddingHorizontal: 16},
    handle: {
        alignSelf: "center",
        width: 44,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.9)",
        marginBottom: 14,
    },
    actionRow: {flexDirection: "row", justifyContent: "space-between", gap: 12},
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
    actionIconText: {color: "#F2F1F6", fontSize: 13, fontWeight: "600"},
    homeIndicator: {
        alignSelf: "center",
        width: 120,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.8)",
        marginTop: 16,
        marginBottom: Platform.OS === "ios" ? 6 : 10,
    },
});
