import React, {useEffect, useRef, useState} from "react";
import {Modal, View, Text, ScrollView, Pressable, Image, Animated, Easing, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../../../constants/Colors";

const T = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.7)",
    stroke: "rgba(255,255,255,0.14)",
    card: "rgba(255,255,255,0.06)",
    accent: "#6C4AB0"
};

export default function AllGroupsModal({
                                           visible,
                                           title = "Select",
                                           groups = [],                // [{id, label, subtitle?, thumb?}]
                                           selected = [],              // array of ids
                                           multi = true,
                                           onApply,
                                           onClose,
                                           gradient = ["#B57FE6", "#6645AB"],
                                       }) {
    const [local, setLocal] = useState(new Set(selected));
    const slide = useRef(new Animated.Value(40)).current;

    useEffect(() => setLocal(new Set(selected)), [selected, visible]);
    useEffect(() => {
        Animated.timing(slide, {
            toValue: visible ? 0 : 40,
            duration: 220,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true
        }).start();
    }, [visible]);

    const toggle = (id) => {
        if (!multi) return setLocal(new Set([id]));
        const n = new Set(local);
        n.has(id) ? n.delete(id) : n.add(id);
        setLocal(n);
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Animated.View style={[styles.sheet, {transform: [{translateY: slide}]}]}>
                <View style={{justifyContent : "center", alignItems : "center", paddingHorizontal: 12, paddingVertical: 16}}>
                    <Text style={{color: "white", fontSize: 18}}>{title}</Text>
                </View>
                <View style={{height: 1.5, backgroundColor: "#6645AB", marginHorizontal: 18, marginBottom: 10}}></View>
                <ScrollView contentContainerStyle={{paddingBottom: 92}}>
                    {groups.map(g => (
                        <Pressable key={g.id} onPress={() => toggle(g.id)} style={styles.row}>
                            {g.thumb ? <Image source={{uri: g.thumb}} style={styles.thumb}/> :
                                <View style={[styles.thumb, {backgroundColor: "rgba(255,255,255,0.12)"}]}/>}
                            <View style={{flex: 1}}>
                                <Text style={styles.title}>{g.label}</Text>
                                {!!g.subtitle && <Text style={styles.sub}>{g.subtitle}</Text>}
                            </View>
                            <View style={[styles.box, local.has(g.id) && styles.boxChecked]}>
                                {local.has(g.id) && <Ionicons name="checkmark" size={16} color="#fff"/>}
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>

                <Pressable onPress={() => onApply?.(Array.from(local))} style={styles.applyWrap}>
                    <LinearGradient colors={gradient} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                                    style={styles.applyBtn}>
                        <Text style={styles.applyText}>Apply</Text>
                    </LinearGradient>
                </Pressable>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)"},
    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
        backgroundColor: T.bg,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    headerGrad: {
        paddingTop: 18,
        paddingBottom: 10,
        paddingHorizontal: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    headerTitle: {color: T.text, textAlign: "center", fontWeight: "700", fontSize: 14},
    hairline: {height: 1, backgroundColor: "rgba(255,255,255,0.45)", marginTop: 8},
    row: {
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 14,
        backgroundColor: T.card,
        borderWidth: 1,
        borderColor: T.stroke,
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    thumb: {width: 44, height: 44, borderRadius: 8, backgroundColor: "#fff", marginRight: 12},
    title: {color: T.text, fontSize: 15, fontWeight: "700"},
    sub: {color: T.dim, fontSize: 12, marginTop: 4},
    box: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: T.accent,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10
    },
    boxChecked: {backgroundColor: T.accent, borderColor: "transparent"},
    applyWrap: {position: "absolute", left: 16, right: 16, bottom: 18},
    applyBtn: {
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)"
    },
    applyText: {color: T.text, fontWeight: "700"},
});
