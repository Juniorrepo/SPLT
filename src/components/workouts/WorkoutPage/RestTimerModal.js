// components/RestTimerModal.js
import React, {useEffect, useRef, useState} from "react";
import {View, Text, Modal, Pressable, StyleSheet, Dimensions} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import Svg, {Circle, Defs, LinearGradient as SvgGradient, Stop} from "react-native-svg";

const {width: SW} = Dimensions.get("window");

export default function RestTimerModal({
                                           visible,
                                           onClose,
                                           presetSec = 120,          // external preset from parent
                                           onOpenPicker,             // parent opens DurationPickerSheet
                                       }) {
    const [mode, setMode] = useState("timer"); // "timer" | "stopwatch"
    const [running, setRunning] = useState(false);
    const [timerLeft, setTimerLeft] = useState(presetSec);
    const [elapsed, setElapsed] = useState(0);
    const tick = useRef(null);

    // keep timer in sync with latest preset (when not running and in timer mode)
    useEffect(() => {
        if (visible && mode === "timer" && !running) setTimerLeft(presetSec);
    }, [presetSec, visible, mode, running]);

    // engine
    useEffect(() => {
        if (!running) return;
        tick.current = setInterval(() => {
            if (mode === "timer") {
                setTimerLeft((t) => {
                    if (t <= 1) {
                        clearInterval(tick.current);
                        setRunning(false);
                        return 0;
                    }
                    return t - 1;
                });
            } else {
                setElapsed((t) => t + 1);
            }
        }, 1000);
        return () => clearInterval(tick.current);
    }, [running, mode]);

    const onToggle = () => setRunning((v) => !v);
    const onReset = () => {
        setRunning(false);
        if (mode === "timer") setTimerLeft(presetSec);
        else setElapsed(0);
    };

    const timeText = mode === "timer" ? formatMMSS(timerLeft) : formatMMSS(elapsed);
    const progress =
        mode === "timer"
            ? presetSec > 0 ? 1 - timerLeft / presetSec : 0
            : (elapsed % 60) / 60;

    // ring geometry
    const size = SW * 0.72;
    const stroke = 12;
    const r = (size - stroke) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const C = 2 * Math.PI * r;
    const dash = Math.max(0, Math.min(1, progress)) * C;

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.backdrop}>
                <LinearGradient colors={["#1A1426", "#0E0A14"]} style={styles.card}>
                    {/* Segments */}
                    <View style={styles.header}>
                        <Pressable
                            onPress={() => {
                                setRunning(false);
                                setMode("stopwatch");
                                onReset();
                            }}
                            style={[styles.segment, mode === "stopwatch" && styles.segmentOn]}
                        >
                            <Text style={[styles.segmentTxt, mode === "stopwatch" && styles.segmentTxtOn]}>
                                Stop Watch
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setRunning(false);
                                setMode("timer");
                                onReset();
                            }}
                            style={[styles.segment, mode === "timer" && styles.segmentOn]}
                        >
                            <Text style={[styles.segmentTxt, mode === "timer" && styles.segmentTxtOn]}>Timer</Text>
                        </Pressable>
                        <Pressable onPress={onClose} style={{marginLeft: "auto"}} hitSlop={8}>
                            <Ionicons name="close" size={20} color="#EDEAFB"/>
                        </Pressable>
                    </View>

                    {/* Circle */}
                    <View style={{alignItems: "center", marginTop: 8}}>
                        <Svg width={size} height={size}>
                            <Defs>
                                <SvgGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                                    <Stop offset="0" stopColor="#EAEAEA" stopOpacity="0.85"/>
                                    <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2"/>
                                </SvgGradient>
                                <SvgGradient id="prog" x1="0" y1="0" x2="1" y2="1">
                                    <Stop offset="0" stopColor="#C9BFFF"/>
                                    <Stop offset="1" stopColor="#7B61FF"/>
                                </SvgGradient>
                            </Defs>

                            <Circle cx={cx} cy={cy} r={r} stroke="url(#ring)" strokeWidth={stroke} opacity={0.25}/>
                            <Circle
                                cx={cx}
                                cy={cy}
                                r={r}
                                stroke="url(#prog)"
                                strokeWidth={stroke}
                                strokeDasharray={`${dash},${C}`}
                                strokeLinecap="round"
                                rotation="-90"
                                origin={`${cx},${cy}`}
                            />
                        </Svg>

                        <View style={styles.center} pointerEvents="none">
                            <Text style={styles.time}>{timeText}</Text>
                        </View>
                    </View>

                    {/* Adjust + preset */}
                    <View style={styles.adjustRow}>
                        <Pressable
                            disabled={mode !== "timer" || (mode === "timer" && timerLeft <= 0)}
                            onPress={() => setTimerLeft((t) => Math.max(0, t - 15))}
                            style={[styles.adjustBtn, (mode !== "timer" || timerLeft <= 0) && {opacity: 0.4}]}
                        >
                            <Text style={styles.adjustTxt}>-15s</Text>
                        </Pressable>

                        <Pressable onPress={onOpenPicker} style={styles.durationBtn}>
                            <Text style={styles.durationTxt}>Set Duration</Text>
                        </Pressable>

                        <Pressable
                            disabled={mode !== "timer"}
                            onPress={() => setTimerLeft((t) => t + 15)}
                            style={[styles.adjustBtn, mode !== "timer" && {opacity: 0.4}]}
                        >
                            <Text style={styles.adjustTxt}>+15s</Text>
                        </Pressable>
                    </View>

                    {/* Start / Pause */}
                    <Pressable onPress={onToggle} style={styles.startWrap}>
                        <LinearGradient colors={["#7B61FF", "#5D3BCF"]} style={styles.startBtn}>
                            <Text style={styles.startTxt}>{running ? "Pause" : "Start"}</Text>
                        </LinearGradient>
                    </Pressable>
                </LinearGradient>
            </View>
        </Modal>
    );
}

const formatMMSS = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m} : ${s}`;
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16
    },
    card: {width: "100%", borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", padding: 14},
    header: {flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8},
    segment: {
        backgroundColor: "#1E1830",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#32295A"
    },
    segmentOn: {backgroundColor: "#6C52E1", borderColor: "#6C52E1"},
    segmentTxt: {color: "#BFB7E6", fontWeight: "700", fontSize: 12},
    segmentTxtOn: {color: "#FFFFFF"},
    center: {position: "absolute", top: "42%", left: 0, right: 0, alignItems: "center"},
    time: {color: "#FFFFFF", fontWeight: "800", fontSize: 34, letterSpacing: 1},
    adjustRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8
    },
    adjustBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#3A2E62",
        backgroundColor: "#201838"
    },
    adjustTxt: {color: "#D8D3FF", fontWeight: "700"},
    durationBtn: {paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, backgroundColor: "#5F49C6"},
    durationTxt: {color: "#fff", fontWeight: "700"},
    startWrap: {marginTop: 12, borderRadius: 12, overflow: "hidden"},
    startBtn: {paddingVertical: 12, alignItems: "center", justifyContent: "center"},
    startTxt: {color: "#fff", fontWeight: "800", fontSize: 16},
});
