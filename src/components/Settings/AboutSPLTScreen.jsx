import React from "react";
import {SafeAreaView, View, Text, StyleSheet, ScrollView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

const BORDER = 1;
const GradientCard = ({children, style}) => (
    <View style={{borderRadius: 9, overflow: "hidden", padding: 16}}>
        {children}
    </View>
);

const Bullet = ({children}) => (
    <View style={styles.bulletRow}>
        <Ionicons name="radio-button-on-outline" size={10} color="#cfc6ff" style={{marginTop: 3}}/>
        <Text style={styles.body}>{children}</Text>
    </View>
);

const AboutSPLTScreen = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: COLORS.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>About SPLT</Text>
                <Text style={[styles.body, {marginBottom: 12, color: "#cfd2dc"}]}>
                    Learn more about our vision, mission, and what makes SPLT more than just a fitness app.
                </Text>

                <GradientCard>
                    <Bullet>SPLT is an app that helps you achieve your health goals in a personalized way.</Bullet>
                    <Bullet>
                        Our vision is to empower every person to develop better health habits through smart technology.
                    </Bullet>
                    <Bullet>
                        Behind SPLT is a team of athletes, coaches, and developers passionate about results and
                        wellness.
                    </Bullet>
                </GradientCard>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AboutSPLTScreen;

const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16},
    title: {color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginBottom: 8},
    body: {color: "#EDEFF4", fontSize: 14, lineHeight: 20},
    bulletRow: {flexDirection: "row", gap: 8, marginBottom: 8, alignItems: "flex-start"},
});
