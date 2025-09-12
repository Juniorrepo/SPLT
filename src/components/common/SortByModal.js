// SortByModal.js
import React, {useRef, useEffect} from "react";
import {Modal, View, Text, Pressable, StyleSheet, Animated, Easing} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../constants/Colors";

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    hair: "rgba(255,255,255,0.45)",
    accent: "#6C4AB0",
};

export default function SortByModal({visible, value, onChange, onClose}) {
    const slide = useRef(new Animated.Value(36)).current;

    useEffect(() => {
        Animated.timing(slide, {
            toValue: visible ? 0 : 36,
            duration: 220,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const Row = ({label, val}) => {
        const checked = value === val;
        return (
            <Pressable onPress={() => onChange(val)} style={styles.row}>
                <Text style={styles.rowText}>{label}</Text>
                <View style={[styles.box, checked && styles.boxChecked]}>
                    {checked && <Ionicons name="checkmark" size={16} color="#fff"/>}
                </View>
            </Pressable>
        );
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.backdrop} onPress={onClose}/>
            <Animated.View style={[styles.sheet, {transform: [{translateY: slide}]}]}>
                <LinearGradient
                    colors={["#1E0C24", "#3B144D", "#6A2C8F"]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.header}
                >
                    <View style={styles.handle}/>
                    <Text style={styles.title}>Sort By</Text>
                    <View style={styles.hairline}/>
                </LinearGradient>
                <LinearGradient
                    colors={["#1E0C24", "#3B144D", "#6A2C8F"]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                >
                    <View style={{paddingHorizontal: 16, paddingBottom: 26}}>
                        <Row label="Popularity" val="popularity"/>
                        <Row label="Alphabetical" val="alpha"/>
                    </View>
                </LinearGradient>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)"},
    sheet: {
        position: "absolute",
        left: 0, right: 0, bottom: 0,
        backgroundColor: THEME.bg,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    handle: {
        alignSelf: "center",
        width: 60,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.85)",
        marginBottom: 6
    },
    title: {color: THEME.text, textAlign: "center", fontWeight: "400", paddingTop: 16,},
    hairline: {height: 1, backgroundColor: THEME.hair, marginTop: 8},
    row: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14},
    rowText: {color: THEME.text, fontSize: 15},
    box: {
        width: 20, height: 20, borderRadius: 4, borderWidth: 2,
        borderColor: THEME.text, alignItems: "center", justifyContent: "center",
    },
    boxChecked: {backgroundColor: COLORS.secondary, borderColor: "transparent"},
});
