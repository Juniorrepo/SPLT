import React, {useMemo, useState} from "react";
import {SafeAreaView, View, Text, StyleSheet, FlatList, Pressable, Image, Alert} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#ffffff",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
    purple: COLORS?.primary ?? "#7b61ff",
};

const GradientButton = ({onPress, children, style}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.gbtn, style]}>
        <Pressable onPress={onPress} style={styles.gbtnPress}>
            <Text style={styles.gbtnText}>{children}</Text>
        </Pressable>
    </LinearGradient>
);

const Avatar = ({uri, size = 40}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={{width: size, height: size, borderRadius: size / 2, padding: 2}}>
        <View style={{flex: 1, borderRadius: (size - 4) / 2, overflow: "hidden", backgroundColor: "#151726"}}>
            <Image source={uri} style={{width: "100%", height: "100%"}}/>
        </View>
    </LinearGradient>
);

const SquareCheckbox = ({checked, onPress}) => (
    <Pressable onPress={onPress} >
        <LinearGradient colors={THEME.gradient} style={{width: 22, height: 22, borderRadius: 4, padding: 1}}>
            <View style={{
                flex: 1,
                borderRadius: 3,
                backgroundColor: THEME.background,
                alignItems: "center",
                justifyContent: "center"
            }}>
                {checked ?
                    <View style={{width: 12, height: 12, borderRadius: 2, backgroundColor: THEME.purple}}/> : null}
            </View>
        </LinearGradient>
    </Pressable>
);

const seed = [
    {id: "1", name: "Andy", avatar: {uri: "https://i.pravatar.cc/100?img=11"}},
    {id: "2", name: "NatlieB", avatar: {uri: "https://i.pravatar.cc/100?img=12"}},
    {id: "3", name: "Samyxx", avatar: {uri: "https://i.pravatar.cc/100?img=13"}},
    {id: "4", name: "Muh_", avatar: {uri: "https://i.pravatar.cc/100?img=14"}},
    {id: "5", name: "Antonie", avatar: {uri: "https://i.pravatar.cc/100?img=15"}},
    {id: "6", name: "Jana", avatar: {uri: "https://i.pravatar.cc/100?img=16"}},
    {id: "7", name: "Antonie", avatar: {uri: "https://i.pravatar.cc/100?img=17"}},
];
const wait = (ms = 450) => new Promise(r => setTimeout(r, ms));

async function apiSaveCloseFriends(ids) {
    await wait();
    return {ok: true, ids};
}

export default function CloseFriendsScreen({navigation}) {
    const [users] = useState(seed);
    const [selected, setSelected] = useState(new Set(["4"])); // one preselected like mock
    const toggle = (id) => setSelected(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
    });

    const onSave = async () => {
        const ids = [...selected];
        const res = await apiSaveCloseFriends(ids);
        Alert.alert(res.ok ? "Saved" : "Error", res.ok ? "Close friends updated." : "Try again.");
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <View style={styles.container}>
                <Text style={styles.title}>Close Friends</Text>
                <Text style={styles.subtitle}>Select who can see your close friends’ content</Text>

                <FlatList
                    data={users}
                    keyExtractor={(i) => i.id}
                    renderItem={({item}) => (
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Avatar uri={item.avatar}/>
                                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                            </View>
                            <SquareCheckbox checked={selected.has(item.id)} onPress={() => toggle(item.id)}/>
                        </View>
                    )}
                    // ItemSeparatorComponent={() => <View style={styles.sep}/>}
                    contentContainerStyle={{paddingBottom: 16}}
                />

                <GradientButton onPress={onSave} style={{marginTop: 8}}>Save</GradientButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {flex: 1, padding: 16},
    title: {color: "#fff", fontSize: 20, fontWeight: "700"},
    subtitle: {color: THEME.muted, marginTop: 6, marginBottom: 10},

    row: {height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
    left: {flexDirection: "row", alignItems: "center", gap: 12, flex: 1, paddingRight: 8},
    name: {color: "#fff", fontSize: 16, flexShrink: 1},
    sep: {height: StyleSheet.hairlineWidth, backgroundColor: "rgba(110,86,205,0.35)"},

    gbtn: {borderRadius: 10, padding: 1},
    gbtnPress: {paddingVertical: 12, alignItems: "center", borderRadius: 9},
    gbtnText: {color: "#fff", fontWeight: "700"},
});
