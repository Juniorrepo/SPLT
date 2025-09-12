import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Pressable,
    Alert,
    useWindowDimensions,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../../constants/Colors";
import TopBar from "../../common/TopBar";

const PAD = 16;
const GUTTER = 12;
const RATIO = 1.05; // card height = width * RATIO (tweak to taste)

const FALLBACK = {
    background: "#0E0E12",
    text: "#ffffff",
    muted: "#b8b9c5",
    card: "#101119",
    primary: "#7b61ff",
    gradient: ["#B57FE6", "#6645AB"],
};

const THEME = {
    background: COLORS?.background ?? FALLBACK.background,
    text: COLORS?.text ?? FALLBACK.text,
    muted: COLORS?.muted ?? FALLBACK.muted,
    card: COLORS?.card ?? FALLBACK.card,
    primary: COLORS?.primary ?? FALLBACK.primary,
    gradient: COLORS?.gradient ?? FALLBACK.gradient,
};

const initialPics = [
    {id: "1", uri: require("../../../assets/images/home/user4.png"), date: "15 Oct 2023"},
    {id: "2", uri: require("../../../assets/images/home/user1.png"), date: "15 Oct 2023"},
    {id: "3", uri: require("../../../assets/images/home/user4.png"), date: "15 Oct 2023"},
    {id: "4", uri: require("../../../assets/images/home/user1.png"), date: "15 Oct 2023"},
    {id: "5", uri: require("../../../assets/images/home/user4.png"), date: "15 Oct 2023"},
    {id: "6", uri: require("../../../assets/images/home/user1.png"), date: "15 Oct 2023"},
];

function formatDate(d = new Date()) {
    return d.toLocaleDateString(undefined, {day: "2-digit", month: "short", year: "numeric"});
}

/* ----------------- Small UI helpers ----------------- */
const Tab = ({active, label, onPress}) => (
    <Pressable onPress={onPress} style={styles.tabBtn}>
        <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
        {active ? (
            <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.tabUnderline}/>
        ) : null}
    </Pressable>
);

const DateOverlay = ({date, inner}) => (
    <View style={[styles.dateOverlay, inner && styles.dateOverlayInner]}>
        <Text style={styles.dateText}>{date}</Text>
    </View>
);

const BigCard = ({pic, placeholder, padded, width, height}) => (
    <View style={[styles.bigCard, padded && styles.bigCardPadded, {width, height}]}>
        {pic ? (
            <View style={[styles.bigInner, padded && styles.bigInnerRounded]}>
                <Image source={pic.uri} style={styles.bigImg} resizeMode="cover"/>
                <DateOverlay date={pic.date} inner={padded}/>
            </View>
        ) : (
            <View style={styles.bigPlaceholder}>
                <Ionicons name="image-outline" size={28} color="#bfb8ff"/>
                <Text style={styles.placeholderText}>{placeholder || "Select a photo below"}</Text>
            </View>
        )}
    </View>
);

const Thumb = ({pic, selected, onPress, size}) => (
    <Pressable onPress={onPress}
               style={[styles.thumbWrap, {width: size, height: size}, selected && styles.thumbSelected]}>
        <Image source={pic.uri} style={styles.thumbImg} resizeMode="cover"/>
        <DateOverlay date={pic.date}/>
    </Pressable>
);

const ProgressPicturesScreen = ({navigation}) => {
    const {width: W} = useWindowDimensions();

    const SINGLE_W = Math.round(W - PAD * 2);
    const SINGLE_H = Math.round(SINGLE_W * RATIO);

    const COMP_W = Math.round((W - PAD * 2 - GUTTER) / 2);
    const COMP_H = Math.round(COMP_W * RATIO);

    const THUMB = Math.round(Math.min(130, Math.max(96, (W - PAD * 2) / 3 - 8)));

    const [mode, setMode] = useState("single");
    const [pics, setPics] = useState(initialPics);

    const [selA, setSelA] = useState(pics[0]?.id ?? null);
    const [selB, setSelB] = useState(pics[1]?.id ?? null);

    const selectedA = useMemo(() => pics.find((p) => p.id === selA), [pics, selA]);
    const selectedB = useMemo(() => pics.find((p) => p.id === selB), [pics, selB]);

    // const onPickFromGallery = async () => {
    //     const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== "granted") {
    //         Alert.alert("Permission required", "Please allow photo library access.");
    //         return;
    //     }
    //     const res = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         quality: 0.85,
    //     });
    //     if (res.canceled || !res.assets?.length) return;
    //
    //     const asset = res.assets[0];
    //     const newPic = {
    //         id: String(Date.now()),
    //         uri: {uri: asset.uri},
    //         date: formatDate(new Date()),
    //     };
    //     setPics((prev) => [newPic, ...prev]);
    //
    //     if (mode === "single") setSelA(newPic.id);
    //     else if (!selA) setSelA(newPic.id);
    //     else if (!selB) setSelB(newPic.id);
    // };

    const onAddPost = () => {
        if (mode === "single") {
            if (!selectedA) return Alert.alert("Pick a photo", "Select a photo first.");
            Alert.alert("Create post", `Single photo ID: ${selectedA.id}`);
        } else {
            if (!selectedA || !selectedB) return Alert.alert("Pick two photos", "Select left and right photos.");
            Alert.alert("Create post", `Comparison: ${selectedA.id} vs ${selectedB.id}`);
        }
    };

    const toggleSelect = (pic) => {
        if (mode === "single") {
            setSelA((prev) => (prev === pic.id ? null : pic.id));
            return;
        }
        if (selA === pic.id) return setSelA(null);
        if (selB === pic.id) return setSelB(null);
        if (!selA) setSelA(pic.id);
        else if (!selB) setSelB(pic.id);
        else {
            setSelA(selB);
            setSelB(pic.id);
        }
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="measurments" onBackPress={() => navigation?.goBack?.()}/>

            <View style={styles.tabs}>
                <Tab label="Single" active={mode === "single"} onPress={() => setMode("single")}/>
                <Tab label="Comparison" active={mode === "comparison"} onPress={() => setMode("comparison")}/>
            </View>

            <FlatList
                ListHeaderComponent={
                    <View style={{paddingHorizontal: PAD, paddingTop: 12}}>
                        {mode === "single" ? (
                            <BigCard
                                pic={selectedA}
                                placeholder="Select a photo below"
                                padded
                                width={SINGLE_W}
                                height={SINGLE_H}
                            />
                        ) : (
                            <View style={styles.compareRow}>
                                <BigCard pic={selectedA} placeholder="Left photo" width={COMP_W} height={COMP_H}/>
                                <BigCard pic={selectedB} placeholder="Right photo" width={COMP_W} height={COMP_H}/>
                            </View>
                        )}

                        {/* Thumbnails */}
                        <View style={{marginTop: 14}}>
                            <FlatList
                                data={pics}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View style={{width: 8}}/>}
                                renderItem={({item}) => (
                                    <Thumb
                                        pic={item}
                                        selected={item.id === selA || (mode === "comparison" && item.id === selB)}
                                        onPress={() => toggleSelect(item)}
                                        size={THUMB}
                                    />
                                )}
                            />
                        </View>

                        {/* Add post */}
                        <View style={{marginTop: 16, alignItems: "center"}}>
                            <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                            style={styles.addPostBtn}>
                                <Pressable onPress={onAddPost} style={styles.addPostPress}>
                                    <Ionicons name="add" size={18} color="#fff"/>
                                    <Text style={styles.addPostText}>Add post</Text>
                                </Pressable>
                            </LinearGradient>
                        </View>
                        {/*<Pressable onPress={onPickFromGallery} style={{alignSelf: "center", marginTop: 8}}>*/}
                        {/*    <Text style={{color: THEME.muted, textDecorationLine: "underline"}}>Add from gallery</Text>*/}
                        {/*</Pressable>*/}
                    </View>
                }
                data={[]}
                renderItem={null}
                keyExtractor={() => "x"}
            />
        </SafeAreaView>
    );
};

export default ProgressPicturesScreen;

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
    safe: {flex: 1},

    /* Tabs */
    tabs: {paddingHorizontal: PAD, paddingTop: 8, flexDirection: "row", gap: 24},
    tabBtn: {paddingVertical: 10, alignItems: "center", flex: 1},
    tabText: {color: "#bfbfbf", fontSize: 18, fontWeight: "500"},
    tabTextActive: {color: "#ffffff"},
    tabUnderline: {height: 3, borderRadius: 3, width: "80%", marginTop: 8},

    /* Big cards */
    compareRow: {flexDirection: "row", gap: GUTTER},

    bigCard: {
        borderRadius: 12,
        overflow: "hidden",
    },
    bigCardPadded: {
        padding: 12,
    },
    bigInner: {
        flex: 1,
        overflow: "hidden",
    },
    bigInnerRounded: {
        borderRadius: 12,
    },
    bigImg: {width: "100%", height: "100%"},

    dateOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingVertical: 8,
        alignItems: "center",
    },
    dateOverlayInner: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },

    thumbWrap: {
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: THEME.card,
    },
    thumbSelected: {borderWidth: 2, borderColor: "#7b61ff"},
    thumbImg: {width: "100%", height: "100%"},

    addPostBtn: {borderRadius: 8, padding: 1},
    addPostPress: {paddingHorizontal: 22, paddingVertical: 10, flexDirection: "row", alignItems: "center", gap: 8},
    addPostText: {color: "#fff", fontWeight: "600"},

    placeholderText: {color: "#c8c6ff", fontSize: 13},
    bigPlaceholder: {flex: 1, alignItems: "center", justifyContent: "center", gap: 8},
    dateText: {color: "#fff", fontSize: 13, fontWeight: "500"},
});
