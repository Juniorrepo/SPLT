// NameWorkoutScreen.js
import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Pressable,
    Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TopBar from "../../../common/TopBar";
import COLORS from "../../../../constants/Colors";

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.7)",
    stroke: "rgba(255,255,255,0.18)",
};

export default function CreateNewWorkoutNameScreen({ navigation, route }) {
    const [name, setName] = useState("");

    const disabled = name.trim().length === 0;

    const handleNext = () => {
        if (disabled) return;
        if (route?.params?.onDone) route.params.onDone(name.trim());
        if (navigation?.navigate) {
            navigation.navigate("SelectExercise", { workoutName: name.trim() });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TopBar
                variant="createnewworkoutname"
                onBackPress={()=> navigation.goBack()}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Name Your Workout</Text>

                        <View style={styles.inputWrap}>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter Workout Name"
                                placeholderTextColor={THEME.dim}
                                style={styles.input}
                                returnKeyType="done"
                                onSubmitEditing={handleNext}
                                maxLength={60}
                            />
                            <View style={styles.underline} />
                        </View>

                        <TouchableOpacity activeOpacity={0.9} onPress={handleNext} disabled={disabled}>
                            <LinearGradient
                                colors={disabled ? ["#2B2240", "#2B2240"] : ["#B57FE6", "#6645AB"]}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={[styles.nextBtn, disabled && { opacity: 0.7 }]}
                            >
                                <Text style={styles.nextText}>Next</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: {
        color: THEME.text,
        fontSize: 25,
        fontWeight: "600",
        marginBottom: 28,
        textAlign: "center",
    },
    inputWrap: {
        width: "100%",
        maxWidth: 400,
        marginBottom: 24,
        alignItems: "center",
    },
    input: {
        width: "100%",
        color: THEME.text,
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 8,
    },
    underline: {
        height: 1,
        width: "70%",
        backgroundColor: "rgba(255,255,255,0.5)",
        marginTop: 6,
    },
    nextBtn: {
        height: 48,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        minWidth: 400,
        borderWidth: 1,
        borderColor: THEME.stroke,
    },
    nextText: { color: THEME.text, fontSize: 15, fontWeight: "700" },
});
