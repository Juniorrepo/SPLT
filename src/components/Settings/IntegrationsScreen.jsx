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

const GradientButton = ({onPress, children, style}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.gbtn, style]}>
        <Pressable onPress={onPress} style={styles.gbtnPress}>
            <Text style={styles.gbtnText}>{children}</Text>
        </Pressable>
    </LinearGradient>
);

export default function IntegrationsScreen({navigation}) {
    const [connected, setConnected] = useState(false);
    const [perms, setPerms] = useState({
        steps: false,
        heartRate: false,
        calories: false,
        workouts: false,
        exerciseStatus: false,
        notifications: false,
    });

    const toggleConnect = (v) => {
        setConnected(v);
        if (!v) {
            setPerms({
                steps: false,
                heartRate: false,
                calories: false,
                workouts: false,
                exerciseStatus: false,
                notifications: false,
            });
        }
    };

    const togglePerm = (k) => (v) => {
        if (!connected) return;
        setPerms((p) => ({...p, [k]: v}));
    };

    const onConfirm = async () => {
        // Replace with your SDK + server calls
        const payload = {connected, ...perms};
        Alert.alert("Saved", JSON.stringify(payload, null, 2));
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Integrations</Text>

                <Text style={styles.subheader}>Smartwatch</Text>
                <Text style={styles.desc}>
                    To accurately sync your health data, the app needs access to Apple Health. You’ll be able
                    to record exercises, heart rate, calories, and completion status for each session.
                </Text>

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
                    label="Workouts"
                    right={
                        <Switch
                            value={perms.workouts}
                            onValueChange={togglePerm("workouts")}
                            disabled={!connected}
                            thumbColor="#fff"
                            trackColor={{false: "#3a2f75", true: "#a799ff"}}
                        />
                    }
                />
                <Row
                    label="Exercise Completion Status"
                    right={
                        <Switch
                            value={perms.exerciseStatus}
                            onValueChange={togglePerm("exerciseStatus")}
                            disabled={!connected}
                            thumbColor="#fff"
                            trackColor={{false: "#3a2f75", true: "#a799ff"}}
                        />
                    }
                />
                <Row
                    label="Notifications"
                    right={
                        <Switch
                            value={perms.notifications}
                            onValueChange={togglePerm("notifications")}
                            disabled={!connected}
                            thumbColor="#fff"
                            trackColor={{false: "#3a2f75", true: "#a799ff"}}
                        />
                    }
                />

                <GradientButton onPress={onConfirm} style={{marginTop: 24}}>
                    Confirm
                </GradientButton>

                <View style={{height: 16}}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16, paddingBottom: 24},

    title: {color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 12},
    subheader: {color: "#fff", fontSize: 16, fontWeight: "800", marginTop: 4, marginBottom: 6},
    desc: {color: THEME.muted, lineHeight: 18, marginBottom: 14},

    sectionTitle: {color: "#fff", fontSize: 16, fontWeight: "800", marginTop: 8, marginBottom: 6},

    row: {
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowLabel: {color: "#fff", fontSize: 15},

    gbtn: {borderRadius: 10, padding: 1},
    gbtnPress: {paddingVertical: 12, alignItems: "center", borderRadius: 9},
    gbtnText: {color: "#fff", fontWeight: "700"},
});
