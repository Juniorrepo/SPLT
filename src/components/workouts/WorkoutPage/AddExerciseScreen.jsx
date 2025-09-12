import React, {useMemo, useState, useCallback} from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    SafeAreaView,
    Alert,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import TopBar from "../../common/TopBar";
import COLORS from "../../../constants/Colors"; // or from "react-native-linear-gradient"

const EXERCISES = [
    {
        id: "leg-extension",
        name: "Leg Extension",
        image:
            "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=320&auto=format&fit=crop",
    },
    {
        id: "leg-curl",
        name: "Leg Curl",
        image:
            "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=320&auto=format&fit=crop",
    },
    {
        id: "squat",
        name: "Squat",
        image:
            "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=320&auto=format&fit=crop",
    },
    {
        id: "deadlift",
        name: "Deadlift",
        image:
            "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=320&auto=format&fit=crop",
    },
    {
        id: "leg-press",
        name: "Leg Press",
        image:
            "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=320&auto=format&fit=crop",
    },
    {
        id: "lunge",
        name: "Lunge",
        image:
            "https://images.unsplash.com/photo-1517963628607-235ccdd5476c?q=80&w=320&auto=format&fit=crop",
    },
];

const AddExercise = ({navigation, openDrawer}) => {
    const [selected, setSelected] = useState({}); // no type here

    const toggle = useCallback((id) => {
        setSelected((prev) => ({...prev, [id]: !prev[id]}));
    }, []);

    const selectedCount = useMemo(
        () => Object.values(selected).filter(Boolean).length,
        [selected]
    );

    const onAdd = useCallback(() => {
        const chosen = EXERCISES.filter((e) => selected[e.id]).map((e) => e.name);
        Alert.alert(
            "Exercises added",
            chosen.length ? chosen.join(", ") : "No exercises selected."
        );
    }, [selected]);

    const renderItem = ({item}) => {
        const checked = !!selected[item.id];
        return (
            <LinearGradient
                colors={["#2B2235", "#2D233B", "#3B2B56"]}
                start={{x: 0, y: 0.3}}
                end={{x: 1, y: 0.7}}
                style={styles.cardWrapper}
            >
                <Pressable
                    style={styles.card}
                    onPress={() => toggle(item.id)}
                    android_ripple={{color: "rgba(255,255,255,0.08)"}}
                >
                    <View style={styles.left}>
                        <Image source={{uri: item.image}} style={styles.thumb}/>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>

                    {/* Custom checkbox */}
                    <Pressable
                        onPress={() => toggle(item.id)}
                        hitSlop={12}
                        style={[styles.checkbox, checked && styles.checkboxChecked]}
                    >
                        {checked ? <View style={styles.checkboxDot}/> : null}
                    </Pressable>
                </Pressable>
            </LinearGradient>
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
            <TopBar
                variant="workouts"
                onSearch={() => {
                }}
                onNotificationPress={() => {
                }}
                onMenuPress={openDrawer}
            />
            <View style={styles.container}>
                <FlatList
                    data={EXERCISES}
                    keyExtractor={(i) => i.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={{height: 14}}/>}
                    showsVerticalScrollIndicator={false}
                />

                <Pressable
                    onPress={onAdd}
                    style={({pressed}) => [
                        styles.addBtnContainer,
                        pressed && {transform: [{scale: 0.995}]},
                    ]}
                >
                    <LinearGradient
                        colors={["#B57FE6", "#6645AB"]}
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 0.5}}
                        style={styles.addBtn}
                    >
                        <Text style={styles.addText}>
                            {selectedCount ? `Add Exercise (${selectedCount})` : "Add Exercise"}
                        </Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const CARD_RADIUS = 8;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: 14,
        paddingBottom: 16,
    },
    listContent: {
        paddingTop: 12,
        paddingBottom: 18,
    },
    cardWrapper: {
        borderRadius: CARD_RADIUS,
    },
    card: {
        borderRadius: CARD_RADIUS,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    thumb: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    title: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.7)",
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        borderColor: "#A78BFA",
        backgroundColor: "rgba(167,139,250,0.15)",
    },
    checkboxDot: {
        width: 10,
        height: 10,
        borderRadius: 3,
        backgroundColor: "#A78BFA",
    },
    addBtnContainer: {
        marginTop: 10,
    },
    addBtn: {
        height: 46,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    addText: {
        color: "white",
        fontSize: 15,
        fontWeight: "700",
        letterSpacing: 0.2,
    },
});

export default AddExercise;
