import React, {useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Switch,
    Pressable,
    Alert,
    ScrollView,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#ffffff",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
};

const Row = ({label, right}) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        {right}
    </View>
);

export default function AppleHealth({navigation}) {
    const [connected, setConnected] = useState(false);
    const [perms, setPerms] = useState({
        steps: false,
        heartRate: false,
        calories: false,
        dailyActivity: false,
    });

    const toggleConnect = (v: boolean) => {
        setConnected(v);
        if (!v) {
            setPerms({steps: false, heartRate: false, calories: false, dailyActivity: false});
        } else {
            Alert.alert("Connected", "Your smartwatch is connected.");
        }
    };

    const togglePerm = (key) => () => {
        console.log("aaa")
        if (!connected) return;
        setPerms((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Connect Smartwatch</Text>

                <Row
                    label="Connect"
                    right={
                        <Switch
                            value={connected}
                            onValueChange={toggleConnect}
                            thumbColor="#fff"
                            trackColor={{false: "#3a2f75", true: "#a799ff"}}
                        />
                    }
                />

                <Text style={styles.desc}>
                    To accurately sync your health data, the app needs access to Apple Health. You’ll be able
                    to record exercises, heart rate, calories, and completion status for each session.
                </Text>

                <Text style={styles.sectionTitle}>Permissions</Text>

                <Row
                    label="Steps"
                    right={
                        <Switch
                            value={perms.steps}
                            onValueChange={togglePerm("steps")}
                            disabled={!connected}
                            thumbColor="#fff"
                            trackColor={{false: "#3a2f75", true: "#a799ff"}}
                        />
                    }
                />
                <Row
                    label="Heart Rate"
                    right={
                        <Switch
                            value={perms.heartRate}
                            onValueChange={togglePerm("heartRate")}
                            disabled={!connected}
                            thumbColor="#fff"
                            trackColor={{false: "#3a2f75", true: "#a799ff"}}
                        />
                    }
                />
                <Row
                    label="Calories"
                    right={
                        <Switch
                            value={perms.calories}
                            onValueChange={togglePerm("calories")}
                            disabled={!connected}
                            thumbColor="#fff"
                            trackColor={{false: "#3a2f75", true: "#a799ff"}}
                        />
                    }
                />
                <Row
                    label="Daily Activity"
                    right={
                        <Switch
                            value={perms.dailyActivity}
                            onValueChange={togglePerm("dailyActivity")}
                            disabled={!connected}
                            thumbColor="#fff"
                            trackColor={{false: "#3a2f75", true: "#a799ff"}}
                        />
                    }
                />

                <View style={{height: 24}}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16, paddingBottom: 24},
    title: {color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 12},
    desc: {color: THEME.muted, marginTop: 6, marginBottom: 18, lineHeight: 18},
    sectionTitle: {color: "#fff", fontSize: 16, fontWeight: "800", marginTop: 8, marginBottom: 6},
    row: {
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowLabel: {color: "#fff", fontSize: 15},
});