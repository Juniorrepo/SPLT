import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Pressable,
    Alert,
    Linking,
    Platform,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard"; // optional (install via expo)
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

/* ----- 1px gradient border wrapper ----- */
const BORDER = 1;
const GradientBorder = ({radius = 10, style, children}) => (
    <View style={{borderRadius: radius - BORDER, overflow: "hidden", backgroundColor: COLORS.background}}>
        {children}
    </View>
);

const ContactRow = ({icon, label, value, onPress, onLongPress}) => (
    <GradientBorder radius={10} style={{marginBottom: 12}}>
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            android_ripple={{color: "rgba(255,255,255,0.06)"}}
            style={styles.row}
        >
            <View style={styles.rowLeft}>
                <Ionicons name={icon} size={20} color="#ffffff" style={{width: 24}}/>
                <Text style={styles.value}>{value}</Text>
            </View>
        </Pressable>
    </GradientBorder>
);

const ContactSPLTScreen = ({navigation}) => {
    const email = "SPLTEG@gmail.com";
    const phone = "02452535235";

    const openEmail = async () => {
        const url = `mailto:${email}`;
        const ok = await Linking.canOpenURL(url);
        ok ? Linking.openURL(url) : Alert.alert("No email app available");
    };

    const openPhone = async () => {
        const clean = phone.replace(/[^\d+]/g, "");
        const url = Platform.select({ios: `telprompt:${clean}`, default: `tel:${clean}`});
        const ok = await Linking.canOpenURL(url);
        ok ? Linking.openURL(url) : Alert.alert("Calling not supported on this device");
    };

    const copy = async (text) => {
        try {
            await Clipboard.setStringAsync(text);
            Alert.alert("Copied", text);
        } catch {
        }
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: COLORS.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <View style={styles.container}>
                <ContactRow
                    icon="mail-outline"
                    label="Email"
                    value={email}
                    onPress={openEmail}
                    onLongPress={() => copy(email)}
                />
                <ContactRow
                    icon="call-outline"
                    label="Phone"
                    value={phone}
                    onPress={openPhone}
                    onLongPress={() => copy(phone)}
                />
            </View>
        </SafeAreaView>
    );
};

export default ContactSPLTScreen;

const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16},
    row: {
        minHeight: 64,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowLeft: {flexDirection: "row", alignItems: "center", gap: 12},
    value: {color: "#FFFFFF", fontSize: 16},
});
