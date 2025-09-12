import React, {useState} from "react";
import {SafeAreaView, View, Text, StyleSheet, Switch, Pressable, Alert} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

/* Theme */
const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#ffffff",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
};

/* Button */
const GradientButton = ({onPress, children, style}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.gbtn, style]}>
        <Pressable onPress={onPress} style={styles.gbtnPress}>
            <Text style={styles.gbtnText}>{children}</Text>
        </Pressable>
    </LinearGradient>
);

export default function AccountPrivacyScreen({navigation}) {
    // mutually exclusive: public or private
    const [isPublic, setIsPublic] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);

    const choosePublic = (v) => {
        setIsPublic(v);
        setIsPrivate(!v);
    };
    const choosePrivate = (v) => {
        setIsPrivate(v);
        setIsPublic(!v);
    };

    const onSave = async () => {
        const payload = {visibility: isPublic ? "public" : "private"};
        // TODO: call your API here
        Alert.alert("Saved", `Account set to ${payload.visibility}.`);
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <View style={styles.container}>
                <Text style={styles.title}>Account Privacy</Text>
                <Text style={styles.subtitle}>Choose who can see your posts and comments</Text>

                <View style={styles.row}>
                    <View style={{flex: 1}}>
                        <Text style={styles.rowTitle}>Public</Text>
                        <Text style={styles.rowDesc}>Anyone can see your content</Text>
                    </View>
                    <Switch
                        value={isPublic}
                        onValueChange={choosePublic}
                        thumbColor="#fff"
                        trackColor={{false: "#3a2f75", true: "#a799ff"}}
                    />
                </View>

                <View style={styles.row}>
                    <View style={{flex: 1}}>
                        <Text style={styles.rowTitle}>Private</Text>
                        <Text style={styles.rowDesc}>Only approved followers can see your content</Text>
                    </View>
                    <Switch
                        value={isPrivate}
                        onValueChange={choosePrivate}
                        thumbColor="#fff"
                        trackColor={{false: "#3a2f75", true: "#a799ff"}}
                    />
                </View>

                <GradientButton onPress={onSave} style={{marginTop: 20}}>Save</GradientButton>
            </View>
        </SafeAreaView>
    );
}

/* styles */
const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16},
    title: {color: "#fff", fontSize: 20, fontWeight: "700"},
    subtitle: {color: THEME.muted, marginTop: 6, marginBottom: 14},

    row: {
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "rgba(110,86,205,0.35)",
        flexDirection: "row",
        alignItems: "center",
    },
    rowTitle: {color: "#fff", fontSize: 15, fontWeight: "700", marginBottom: 2},
    rowDesc: {color: THEME.muted, fontSize: 12},

    gbtn: {borderRadius: 10, padding: 1},
    gbtnPress: {paddingVertical: 12, alignItems: "center", borderRadius: 9},
    gbtnText: {color: "#fff", fontWeight: "700"},
});
