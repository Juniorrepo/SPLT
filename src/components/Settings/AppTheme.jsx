// screens/settings/DarkModeScreen.jsx
import React, {useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import TopBar from "../common/TopBar";
import COLORS from "../../constants/Colors";

const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
};

const Radio = ({selected}) => {
    if (!selected) {
        return (
            <View
                style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    borderWidth: 2,
                    borderColor: "rgba(200,198,255,0.5)",
                }}
            />
        );
    }
    return (
        <LinearGradient
            colors={THEME.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#fff",
                }}
            />
        </LinearGradient>
    );
};

const Row = ({title, subtitle, selected, onPress}) => (
    <Pressable onPress={onPress} style={styles.row} android_ripple={{color: "rgba(255,255,255,0.06)"}}>
        <View style={{flex: 1}}>
            <Text style={styles.rowTitle}>{title}</Text>
            {subtitle ? <Text style={styles.rowSub}>{subtitle}</Text> : null}
        </View>
        <Radio selected={selected}/>
    </Pressable>
);

export default function AppThemeScreen({navigation}) {
    // 'on' | 'off' | 'system'
    const [mode, setMode] = useState("on");

    const select = (val) => {
        setMode(val);
        // If you have a theme provider, apply it here:
        // onApply(val)
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <View style={styles.container}>
                <Text style={styles.header}>Dark mode</Text>

                {/* No bottom borders; just spacious rows */}
                <Row
                    title="On"
                    selected={mode === "on"}
                    onPress={() => select("on")}
                />
                <Row
                    title="Off"
                    selected={mode === "off"}
                    onPress={() => select("off")}
                />
                <Row
                    title="Use system settings"
                    subtitle="We’ll adjust your appearance based on your device’s system settings."
                    selected={mode === "system"}
                    onPress={() => select("system")}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16, paddingTop: 4},
    header: {color: "#fff", fontSize: 18, fontWeight: "800", marginBottom: 10},

    row: {
        minHeight: 56,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    rowTitle: {color: "#fff", fontSize: 15, fontWeight: "700"},
    rowSub: {color: THEME.muted, fontSize: 12, lineHeight: 18, marginTop: 4},
});
