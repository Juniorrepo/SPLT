import React, {useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Pressable,
    Alert,
    ScrollView,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

/* ------- Theme (fallbacks to keep it portable) ------- */
const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#ffffff",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
    purple: COLORS?.primary ?? "#7b61ff",
};

/* ------- UI helpers ------- */
const Radio = ({checked}) => (
    <View style={styles.radioWrap}>
        <View style={[styles.radioDot, checked && {backgroundColor: THEME.purple}]}/>
    </View>
);

const RadioOption = ({label, checked, onPress}) => (
    <Pressable onPress={onPress} style={styles.option}>
        <Radio checked={checked}/>
        <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
);

const GradientButton = ({onPress, children, style}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.gbtn, style]}>
        <Pressable onPress={onPress} style={styles.gbtnPress}>
            <Text style={styles.gbtnText}>{children}</Text>
        </Pressable>
    </LinearGradient>
);

/* ------- Screen ------- */
export default function UnitsScreen({navigation}) {
    const [weightUnit, setWeightUnit] = useState("kg"); // kg | lbs
    const [heightUnit, setHeightUnit] = useState("cm"); // cm | inch
    const [hipUnit, setHipUnit] = useState("cm");
    const [waistUnit, setWaistUnit] = useState("cm");
    const [chestUnit, setChestUnit] = useState("cm");

    const onConfirm = async () => {
        // replace with your API call
        const payload = {weightUnit, heightUnit, hipUnit, waistUnit, chestUnit};
        console.log("Units saved:", payload);
        Alert.alert("Saved", "Your preferred units have been updated.");
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Units</Text>
                <Text style={styles.subtitle}>
                    To accurately sync your health data, the app needs access to Apple Health.
                    You’ll be able to record exercises, heart rate, calories, and completion status
                    for each session.
                </Text>

                {/* Weight */}
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Weight</Text>
                    <View style={styles.optionsRight}>
                        <RadioOption label="Kg" checked={weightUnit === "kg"} onPress={() => setWeightUnit("kg")}/>
                        <RadioOption label="lbs" checked={weightUnit === "lbs"} onPress={() => setWeightUnit("lbs")}/>
                    </View>
                </View>

                {/* Height */}
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Height</Text>
                    <View style={styles.optionsRight}>
                        <RadioOption label="cm" checked={heightUnit === "cm"} onPress={() => setHeightUnit("cm")}/>
                        <RadioOption label="inch" checked={heightUnit === "inch"}
                                     onPress={() => setHeightUnit("inch")}/>
                    </View>
                </View>

                {/* Hip */}
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Hip Circumference</Text>
                    <View style={styles.optionsRight}>
                        <RadioOption label="cm" checked={hipUnit === "cm"} onPress={() => setHipUnit("cm")}/>
                        <RadioOption label="inch" checked={hipUnit === "inch"} onPress={() => setHipUnit("inch")}/>
                    </View>
                </View>

                {/* Waist */}
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Waist Circumference</Text>
                    <View style={styles.optionsRight}>
                        <RadioOption label="cm" checked={waistUnit === "cm"} onPress={() => setWaistUnit("cm")}/>
                        <RadioOption label="inch" checked={waistUnit === "inch"} onPress={() => setWaistUnit("inch")}/>
                    </View>
                </View>

                {/* Chest */}
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Chest Circumference</Text>
                    <View style={styles.optionsRight}>
                        <RadioOption label="cm" checked={chestUnit === "cm"} onPress={() => setChestUnit("cm")}/>
                        <RadioOption label="inch" checked={chestUnit === "inch"} onPress={() => setChestUnit("inch")}/>
                    </View>
                </View>

                <GradientButton onPress={onConfirm} style={{marginTop: 20}}>Confirm</GradientButton>
                <View style={{height: 16}}/>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ------- styles ------- */
const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16},

    title: {color: "#fff", fontSize: 20, fontWeight: "700"},
    subtitle: {color: THEME.muted, marginTop: 6, marginBottom: 16, lineHeight: 18},

    row: {
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowLabel: {color: "#fff", fontSize: 14, flex: 1, paddingRight: 10},

    optionsRight: {flexDirection: "row", alignItems: "center", gap: 18},
    option: {flexDirection: "row", alignItems: "center", gap: 8},
    optionLabel: {color: "#fff", fontSize: 14},

    radioWrap: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: "#6C54D4", // subtle purple ring
        alignItems: "center",
        justifyContent: "center",
    },
    radioDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: "transparent"},

    gbtn: {borderRadius: 10, padding: 1},
    gbtnPress: {paddingVertical: 12, alignItems: "center", borderRadius: 9},
    gbtnText: {color: "#fff", fontWeight: "700"},
});
