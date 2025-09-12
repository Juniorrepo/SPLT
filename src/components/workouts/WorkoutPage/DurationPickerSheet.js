// components/DurationPickerSheet.js
import React, {useMemo} from "react";
import {Modal, View, StyleSheet, Pressable, FlatList, Text, Dimensions} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const {height: SH} = Dimensions.get("window");

export default function DurationPickerSheet({visible, initialSec = 120, onClose, onSelect}) {
    const data = useMemo(() => {
        const arr = [];
        for (let s = 0; s <= 300; s += 5) arr.push(s);
        return arr;
    }, []);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.backdrop}>
                <Pressable style={{flex: 1}} onPress={onClose}/>
                <LinearGradient colors={["#221B33", "#181326"]} style={styles.sheet}>
                    <Text style={styles.title}>Select Timer Duration</Text>
                    <View style={styles.divider}/>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => String(item)}
                        contentContainerStyle={{paddingBottom: 18}}
                        style={{maxHeight: SH * 0.45}}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <Pressable onPress={() => onSelect(item)}
                                       style={({pressed}) => [styles.row, pressed && {opacity: 0.8}]}>
                                <Text style={styles.rowText}>{item} s</Text>
                            </Pressable>
                        )}
                    />
                </LinearGradient>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "flex-end"},
    sheet: {
        paddingTop: 12,
        paddingBottom: 18,
        paddingHorizontal: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)"
    },
    title: {color: "#FFFFFF", fontWeight: "700", fontSize: 16, textAlign: "center"},
    divider: {height: 1, backgroundColor: "rgba(255,255,255,0.15)", marginVertical: 12},
    row: {height: 44, alignItems: "center", justifyContent: "center", borderRadius: 10},
    rowText: {color: "#EDEAFB", fontSize: 16, fontWeight: "600"},
});
