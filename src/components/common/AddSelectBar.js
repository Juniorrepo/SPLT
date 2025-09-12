// AddSelectedBar.js
import React from "react";
import {Pressable, Text, StyleSheet, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AddSelectedBar({count, onPress, gradient = ["#B57FE6", "#6645AB"]}) {
    if (!count) return null;
    return (
        <View style={styles.wrap} pointerEvents="box-none">
            <LinearGradient colors={gradient} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.card}>
                <Pressable style={styles.press} onPress={onPress}>
                    <Ionicons name="add-circle-outline" size={23} color="#fff" style={{marginRight: 8}}/>
                    <Text style={styles.text}>Add {count} Exercises</Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        position: "absolute",
        left: 15, right: 15, bottom: 80, // keeps it above the tab bar / home indicator
    },
    card: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },
    press: {height: 48, alignItems: "center", justifyContent: "center", flexDirection: "row"},
    text: {color: "#fff", fontWeight: "400", fontSize:16},
});
