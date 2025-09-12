import React, {useMemo, useState} from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Picker} from "@react-native-picker/picker";
import {TouchableOpacity} from "react-native-gesture-handler";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

const ACCENT = "#8B5CF6"; // purple border
const BG = "#0B0B0F";     // dark background
const CARD = "#121218";
const BORDER = "#2C2740";
const TEXT = "#FFFFFF";
const MUTED = "#9CA3AF";

export default function CreditCardForm({onSubmit, navigation}) {
    const [cardNumber, setCardNumber] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");

    const years = useMemo(() => {
        const now = new Date().getFullYear();
        return Array.from({length: 15}, (_, i) => String(now + i));
    }, []);

    const months = Array.from({length: 12}, (_, i) =>
        String(i + 1).padStart(2, "0")
    );

    const handleSubmit = () => {
        // Your screenshot says "Enter 12 Digital Card Numbers" so we’ll validate 12.
        if (cardNumber.length !== 12) {
            return Alert.alert("Card Number", "Please enter a 12-digit card number.");
        }
        if (!month || !year) {
            return Alert.alert("Valid Thru", "Please select month and year.");
        }
        if (cvv.length < 3) {
            return Alert.alert("CVV", "Please enter a valid CVV (3–4 digits).");
        }
        if (!name.trim()) {
            return Alert.alert("Card Holder Name", "Please enter the card holder name.");
        }

        const payload = {cardNumber, expMonth: month, expYear: year, cvv, name};
        if (onSubmit) onSubmit(payload);
        Alert.alert("Saved", "Your card has been saved.");
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
            <TopBar variant="setting" onBackPress={() => navigation.goBack()}></TopBar>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={{padding: 16, paddingBottom: 28}}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Card Number */}
                    <FieldLabel>Card Number</FieldLabel>
                    <Input
                        value={cardNumber}
                        onChangeText={(t) => setCardNumber(t.replace(/[^0-9]/g, "").slice(0, 12))}
                        placeholder="Enter 12 Digital Card Numbers"
                        keyboardType="number-pad"
                        maxLength={12}
                    />

                    {/* Valid Thru + CVV (row) */}
                    <View style={styles.rowBetween}>
                        <View style={{flex: 1, marginRight: 10}}>
                            <FieldLabel>Valid Thru</FieldLabel>

                            <View style={styles.row}>
                                <View style={[styles.pickerWrap, {flex: 1, marginRight: 10}]}>
                                    <Picker
                                        selectedValue={month}
                                        dropdownIconColor={MUTED}
                                        onValueChange={(v) => setMonth(v)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Month" value="" color={MUTED}/>
                                        {months.map((m) => (
                                            <Picker.Item key={m} label={m} value={m}/>
                                        ))}
                                    </Picker>
                                </View>

                                <View style={[styles.pickerWrap, {flex: 1}]}>
                                    <Picker
                                        selectedValue={year}
                                        dropdownIconColor={MUTED}
                                        onValueChange={(v) => setYear(v)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Year" value="" color={MUTED}/>
                                        {years.map((y) => (
                                            <Picker.Item key={y} label={y} value={y}/>
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        <View style={{width: 120}}>
                            <FieldLabel>CVV</FieldLabel>
                            <Input
                                value={cvv}
                                onChangeText={(t) => setCvv(t.replace(/[^0-9]/g, "").slice(0, 4))}
                                placeholder="CVV"
                                keyboardType="number-pad"
                                maxLength={4}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    {/* Card Holder Name */}
                    <FieldLabel>Card Holder Name</FieldLabel>
                    <Input
                        value={name}
                        onChangeText={setName}
                        placeholder="Card Holder Name"
                        autoCapitalize="words"
                        returnKeyType="done"
                    />

                    {/* Save & Proceed */}
                    <TouchableOpacity activeOpacity={0.95} onPress={handleSubmit} style={{marginTop: 10}}>
                        <LinearGradient
                            colors={["#9B87F5", "#5B21B6"]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            style={styles.btn}
                        >
                            <Text style={styles.btnText}>Save &amp; Proceed</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

/* ---------- tiny building blocks ---------- */

function FieldLabel({children}) {
    return <Text style={styles.label}>{children}</Text>;
}

function Input(props) {
    return (
        <TextInput
            placeholderTextColor={MUTED}
            style={styles.input}
            selectionColor={ACCENT}
            {...props}
        />
    );
}

/* ---------------------------- styles ---------------------------- */

const styles = StyleSheet.create({
    label: {
        color: TEXT,
        fontWeight: "700",
        marginBottom: 8,
        marginTop: 8,
    },
    input: {
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: BORDER,
        color: TEXT,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    pickerWrap: {
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 10,
        overflow: "hidden",
        height: 46,
        justifyContent: "center",
    },
    picker: {
        color: TEXT,
        height: 46,
        marginTop: -4,
        paddingVertical: 12,
    },
    rowBetween: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    btn: {
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 6},
        elevation: 4,
    },
    btnText: {
        color: "#FFFFFF",
        fontWeight: "800",
        fontSize: 16,
    },
});
