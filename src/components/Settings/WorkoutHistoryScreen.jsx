import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Pressable,
    Alert,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#141623",
    line: "rgba(110,86,205,0.35)",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
    purple: COLORS?.primary ?? "#7b61ff",
};

const GOutline = ({children, radius = 9, style, pressable, onPress}) => {
    const inner = (
        <View style={[{borderRadius: radius - 1, backgroundColor: THEME.card}, pressable && {
            paddingVertical: 8,
            paddingHorizontal: 10,
            alignItems: "center"
        }]}>
            {children}
        </View>
    );
    return (
        <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        style={[{borderRadius: radius, padding: 1}, style]}>
            {pressable ? <Pressable onPress={onPress}>{inner}</Pressable> : inner}
        </LinearGradient>
    );
};

const GFillButton = ({children, onPress, style}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[{borderRadius: 8}, style]}>
        <Pressable onPress={onPress} style={{paddingVertical: 10, alignItems: "center"}}>
            <Text style={{color: "#fff", fontWeight: "700"}}>{children}</Text>
        </Pressable>
    </LinearGradient>
);

const GOutlineButton = ({children, onPress, style}) => (
    <GOutline radius={8} style={style} pressable onPress={onPress}>
        <Text style={{color: "#fff", fontWeight: "700"}}>{children}</Text>
    </GOutline>
);

const seed = [
    {
        id: "w1",
        title: "Full Body Workout",
        dateISO: "2025-08-30",
        months: 3,
        calories: 4300,
        image: {uri: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=800&auto=format&fit=crop"},
    },
    {
        id: "w2",
        title: "Full Body Workout",
        dateISO: "2025-08-30",
        months: 3,
        calories: 4300,
        image: {uri: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=800&auto=format&fit=crop"},
    },
];

const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, {day: "2-digit", month: "short", year: "numeric"});

const WorkoutCard = ({item, onEdit, onDelete}) => (
    <View style={styles.card}>
        <LinearGradient
            colors={["transparent", "rgba(123,97,255,0.25)"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
        />
        <Image source={item.image} style={styles.cardImg}/>

        <View style={{flex: 1, paddingLeft: 12}}>
            <View style={styles.cardTop}>
                <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{fmtDate(item.dateISO)}</Text>
            </View>

            <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="calendar-clock" size={16} color="#c8c6ff"/>
                    <Text style={styles.metaText}>{item.months} Months</Text>
                </View>
                <View style={styles.metaItem}>
                    <Ionicons name="flame-outline" size={16} color="#c8c6ff"/>
                    <Text style={styles.metaText}>{item.calories}</Text>
                </View>
            </View>

            <View style={styles.btnRow}>
                <GFillButton onPress={() => onEdit(item)} style={{flex: 1, marginRight: 10}}>Edit</GFillButton>
                <GOutlineButton onPress={() => onDelete(item)} style={{flex: 1}}>Delete</GOutlineButton>
            </View>
        </View>
    </View>
);

export default function WorkoutHistoryScreen({navigation}) {
    const [list, setList] = useState(seed);

    const onEdit = (w) => {
        Alert.alert("Edit", `Open editor for "${w.title}"`);
    };

    const onDelete = (w) => {
        Alert.alert("Delete workout", `Delete "${w.title}"?`, [
            {text: "Cancel", style: "cancel"},
            {text: "Delete", style: "destructive", onPress: () => setList((prev) => prev.filter((x) => x.id !== w.id))},
        ]);
    };

    const resetAll = () => {
        if (list.length === 0) return;
        Alert.alert("Reset All", "Remove all workout history?", [
            {text: "Cancel", style: "cancel"},
            {text: "Reset", style: "destructive", onPress: () => setList([])},
        ]);
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            {/* header */}
            <View style={styles.header}>
                <Text style={styles.h1}>Workout History</Text>
                <GOutline pressable onPress={resetAll}>
                    <Text style={{color: "#fff", fontWeight: "700"}}>Reset All</Text>
                </GOutline>
            </View>

            <FlatList
                data={list}
                keyExtractor={(i) => i.id}
                renderItem={({item}) => (
                    <WorkoutCard item={item} onEdit={onEdit} onDelete={onDelete}/>
                )}
                contentContainerStyle={{paddingHorizontal: 12, paddingBottom: 24}}
                ItemSeparatorComponent={() => <View style={{height: 12}}/>}
                ListEmptyComponent={
                    <Text style={{color: THEME.muted, alignSelf: "center", marginTop: 24}}>
                        No workouts yet.
                    </Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {flex: 1},

    header: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    h1: {color: "#fff", fontSize: 22, fontWeight: "800"},

    card: {
        flexDirection: "row",
        backgroundColor: THEME.card,
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: THEME.line,
    },
    cardImg: {
        width: 92,
        height: 92,
        borderRadius: 10,
        backgroundColor: "#0d0f1a",
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: {color: "#fff", fontWeight: "700", fontSize: 15, flexShrink: 1, paddingRight: 10},
    cardDate: {color: "#d8dbff", fontSize: 12},

    metaRow: {flexDirection: "row", alignItems: "center", gap: 14, marginTop: 8},
    metaItem: {flexDirection: "row", alignItems: "center", gap: 6},
    metaText: {color: "#c8c6ff", fontSize: 12},

    btnRow: {flexDirection: "row", marginTop: 10},
});
