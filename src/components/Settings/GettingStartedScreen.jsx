import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    useWindowDimensions,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
};

const GradientFrame = ({children, style, radius = 14, pad = 10}) => (
    <LinearGradient
        colors={THEME.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[{borderRadius: radius, padding: 1}, style]}
    >
        <View
            style={{
                borderRadius: radius - 1,
                backgroundColor: THEME.card,
                overflow: "hidden",
                padding: pad,
            }}
        >
            {children}
        </View>
    </LinearGradient>
);

const STEPS = [
    {
        title: "Create your account",
        src: require("../../assets/getting-started/setp1.png"),
    },
    {
        title: "Choose your health and fitness goals",
        src: require("../../assets/getting-started/setp2.png"),
    },
    {
        title: "Start tracking your workouts",
        src: require("../../assets/getting-started/setp3.png"),
    },
    {
        title: "Connect your smartwatch for higher accuracy",
        src: require("../../assets/getting-started/step4.png"),
    },
];

const StepBlock = ({title, source, width}) => {
    const CARD_W = width - 32;
    const CARD_H = Math.round(CARD_W * 0.62);

    return (
        <View style={{marginBottom: 18}}>
            <Text style={styles.stepTitle}>{title}</Text>
            <Image
                source={source}
                style={{width: "100%", height: CARD_H, borderRadius: 10}}
                resizeMode="cover"
            />
        </View>
    );
};

const GettingStartedScreen = ({navigation}) => {
    const {width} = useWindowDimensions();

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Getting Started</Text>
                <Text style={styles.subtitle}>
                    A quick guide to help you get started with the app effectively
                </Text>

                {STEPS.map((s) => (
                    <StepBlock key={s.title} title={s.title} source={s.src} width={width}/>
                ))}

                <View style={{height: 16}}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GettingStartedScreen;

const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16, paddingBottom: 24},

    title: {color: "#fff", fontSize: 20, fontWeight: "700"},
    subtitle: {color: THEME.muted, marginTop: 6, marginBottom: 14},

    stepTitle: {
        color: "#dfe1ea",
        fontSize: 14,
        marginBottom: 8,
    },
});
