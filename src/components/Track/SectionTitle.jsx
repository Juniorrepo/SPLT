import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import theme from "../../constants/theme";

const SectionTitle = ({ title, style }) => (
    <View style={[styles.wrapper, style]}>
        <LinearGradient
            colors={COLORS.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.line}
        />
         <Text style={[theme.textStyles.small, styles.text]}>{title}</Text>
        <LinearGradient
            colors={COLORS.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.line}
        />
    </View>
);

export default SectionTitle;

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 5,
        backgroundColor: COLORS.borderColor,
    },
    text: {
        marginHorizontal: 10,
        color: theme.colors.text,
        fontSize: 18,
    },
});
