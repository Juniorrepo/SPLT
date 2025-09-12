import React, {useCallback, useMemo, useState} from "react";
import {
    SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity,
    TextInput, Pressable, Alert, FlatList
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import TopBar from "../../../common/TopBar";
import COLORS from "../../../../constants/Colors";
import ActionModal from "../../../common/ActionModal";
import ReorderModalFlat from "../../../common/ReorderModal"; // <— use the fixed sheet

const THEME = {
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.7)",
    stroke: "rgba(255,255,255,0.14)",
    card: "rgba(255,255,255,0.06)",
};

export default function CreateWorkoutScreen({navigation, route}) {
    const initial = useMemo(
        () => (route?.params?.initialExercises || []).map((e, idx) => ({
            key: e.id ?? String(idx),
            id: e.id ?? String(idx),
            name: e.name,
            muscle: e.muscle,
            img: e.img,
        })),
        [route?.params?.initialExercises]
    );

    const [image, setImage] = useState(null);
    const [name, setName] = useState(route?.params?.workoutName || "");
    const [data, setData] = useState(initial);
    const [reorderOpen, setReorderOpen] = useState(false);

    const [sheetOpen, setSheetOpen] = useState(false);
    const [active, setActive] = useState(null);

    const pickImage = useCallback(async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "We need access to your photos to upload a picture.");
            return;
        }
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.85,
        });
        if (!res.canceled) setImage(res.assets[0].uri);
    }, []);

    const onSave = () => {
        const payload = {
            name: name.trim(),
            image,
            exercises: data.map((d, i) => ({id: d.id, order: i + 1})),
        };
        console.log("SAVE WORKOUT", payload);
        Alert.alert("Saved", "Workout saved (log in console).");
        navigation.goBack();
    };

    const onMore = (item) => {
        setActive(item);
        setSheetOpen(true);
    };


    const handleSheetAction = (type) => {
        if (type === "reorder") setReorderOpen(true);
    };

    const onReorderDone = ({order, superset}) => {
        const map = new Map(data.map(d => [d.id, d]));
        setData(order.map(o => map.get(o.id)).filter(Boolean));
        console.log("Superset IDs:", superset);
    };

    const actions = useMemo(() => (active ? [
        {
            key: "superset",
            label: "Super set",
            icon: "flame",
            onPress: () => console.log("Super set with", active?.name)
        },
        {key: "reorder", label: "Reorder", icon: "swap-vertical", onPress: () => handleSheetAction("reorder")},
        {
            key: "view",
            label: "View",
            icon: "eye",
            onPress: () => navigation.navigate("ExerciseDetails", {id: active?.id})
        },
        {
            key: "delete",
            label: "Delete",
            icon: "trash",
            danger: true,
            onPress: () => setData(d => d.filter(x => x.id !== active?.id))
        },
    ] : []), [active, navigation]);

    const addExercises = () => {
        navigation.navigate("SelectExercise", {
            onSelect: (picked) => {
                setData((list) => {
                    const existing = new Set(list.map((x) => x.id));
                    const toAdd = picked
                        .filter((p) => !existing.has(p.id))
                        .map((p) => ({key: p.id, id: p.id, name: p.name, muscle: p.muscle, img: p.img}));
                    return [...list, ...toAdd];
                });
            },
        });
    };

    const renderItem = ({item}) => (
        <LinearGradient
            colors={COLORS.gradient}
            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
            style={styles.pillBorder}
        >
            <View style={styles.pillCard}>
                <Pressable hitSlop={8} style={{marginRight: 6, paddingRight: 4}}>
                    <Ionicons name="reorder-three" size={22} color={THEME.dim}/>
                </Pressable>
                <Image
                    source={item.img ? {uri: item.img} : require("../../../../assets/images/home/workout-placeholder.png")}
                    style={styles.thumb}
                />
                <Text numberOfLines={1} style={styles.title}>{item.name}</Text>

                <Pressable onPress={() => onMore(item)} hitSlop={16} style={{paddingHorizontal: 4, paddingVertical: 6}}>
                    <Ionicons name="ellipsis-vertical" size={25} color={THEME.text}/>
                </Pressable>
            </View>
        </LinearGradient>
    );

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
            <TopBar variant="selectworkout" onBackPress={() => navigation.goBack()}/>

            <View style={styles.container}>
                {/* Upload box */}
                <View style={styles.uploadBox}>
                    <Pressable onPress={pickImage} style={styles.uploadPress}>
                        {image ? (
                            <Image source={{uri: image}} style={styles.preview}/>
                        ) : (
                            <View style={styles.emptyPreview}>
                                <Ionicons name="image" size={34} color={COLORS.primary}/>
                            </View>
                        )}
                    </Pressable>
                    <Text style={styles.uploadText}>Add Picture</Text>
                </View>

                {/* Name */}
                <View style={styles.row}><Text style={styles.label}>Workout Name :</Text></View>
                <View style={{paddingHorizontal: 16}}>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter a name"
                        placeholderTextColor={THEME.dim}
                        style={styles.input}
                    />
                </View>

                {/* Header */}
                <View style={styles.divider}/>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Exercises</Text>
                    <Text style={styles.sectionCount}>Selected Exercises ( {data.length} )</Text>
                </View>

                {/* List */}
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{padding: 16, paddingBottom: 24}}
                />

                {/* Buttons */}
                <View style={{padding: 16, gap: 12}}>
                    <TouchableOpacity activeOpacity={0.9} onPress={onSave}>
                        <LinearGradient colors={COLORS.gradient} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                                        style={styles.primaryBtn}>
                            <Text style={styles.primaryText}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9} onPress={addExercises} style={styles.ghostBtn}>
                        <Text style={styles.ghostText}>Add exercise</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ActionModal
                visible={sheetOpen}
                onClose={() => setSheetOpen(false)}
                actions={actions}
                gradientColors={COLORS.gradient}
            />
            <ReorderModalFlat
                visible={reorderOpen}
                onClose={() => setReorderOpen(false)}
                items={data}
                initialSuperset={[]}
                gradient={COLORS.gradient}
                onDone={onReorderDone}
            />
        </SafeAreaView>
    );
}

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
    container: {flex: 1},

    uploadBox: {alignItems: "center", paddingTop: 20, paddingBottom: 12},
    uploadPress: {
        width: 167, height: 167, borderRadius: 5, borderWidth: 1,
        borderColor: COLORS.primary, alignItems: "center", justifyContent: "center", overflow: "hidden",
    },
    emptyPreview: {
        width: "100%", height: "100%", alignItems: "center", justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.02)",
    },
    preview: {width: "100%", height: "100%"},
    uploadText: {marginTop: 8, color: THEME.dim, fontWeight: "500"},

    row: {paddingHorizontal: 16, paddingTop: 8},
    label: {color: THEME.text, fontWeight: "700"},
    input: {
        height: 44, borderRadius: 5, borderWidth: 1, borderColor: THEME.stroke,
        paddingHorizontal: 12, color: THEME.text, backgroundColor: THEME.card, marginTop: 6,
    },

    divider: {height: 1, backgroundColor: THEME.stroke, opacity: 0.4, marginTop: 14},
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 12
    },
    sectionTitle: {color: THEME.text, fontWeight: "700"},
    sectionCount: {color: THEME.dim},

    /* pill card like your image */
    pillBorder: {borderRadius: 12, padding: 1.2, marginBottom: 10},
    pillCard: {
        flexDirection: "row", alignItems: "center",
        backgroundColor: COLORS.background,
        borderRadius: 12,
        borderWidth: 1, borderColor: "rgba(124,91,242,0.28)",
        paddingVertical: 10, paddingHorizontal: 10,
    },
    thumb: {width: 55, height: 55, borderRadius: 4, marginRight: 10, backgroundColor: "#111"},
    title: {flex: 1, color: THEME.text, fontSize: 16, fontWeight: "800"},

    primaryBtn: {
        height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "rgba(255,255,255,0.18)",
    },
    primaryText: {color: THEME.text, fontWeight: "700"},
    ghostBtn: {
        height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "rgba(255,255,255,0.18)", backgroundColor: "transparent",
    },
    ghostText: {color: THEME.text, fontWeight: "700", opacity: 0.9},
});
