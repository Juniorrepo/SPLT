import React, {useMemo, useState, useCallback} from "react";
import {
    Modal, View, Text, StyleSheet, Pressable, SafeAreaView, FlatList, Image, Platform
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../constants/Colors";

const THEME = {
    bg: "#0E0A14",
    text: "#F2F1F6",
    dim: "rgba(255,255,255,0.7)",
    card: "rgba(255,255,255,0.06)",
    stroke: "rgba(255,255,255,0.14)",
};

export default function ReorderModalFlat({
                                             visible,
                                             onClose,
                                             items = [],
                                             initialSuperset = [],
                                             gradient = ["#6645AB33", "#FFFFFF00"],
                                             onDone
                                         }) {
    const [main, setMain] = useState(() => items.filter(i => !initialSuperset.includes(i.id)));
    const [superSet, setSuperSet] = useState(() => items.filter(i => initialSuperset.includes(i.id)));

    const move = useCallback((list, setList, index, dir) => {
        const to = index + dir;
        if (to < 0 || to >= list.length) return;
        const next = list.slice();
        const tmp = next[index];
        next[index] = next[to];
        next[to] = tmp;
        setList(next);
    }, []);

    const toggleSuperset = useCallback((item, inSuper) => {
        if (inSuper) {
            setSuperSet(l => l.filter(x => x.id !== item.id));
            setMain(l => [...l, item]);
        } else {
            setMain(l => l.filter(x => x.id !== item.id));
            setSuperSet(l => [...l, item]);
        }
    }, []);

    const Row = useCallback(({item, index, inSuper}) => (
        <LinearGradient colors={gradient} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.borderWrap}>
            <View style={styles.rowCard}>
                <Image
                    source={item.img ? {uri: item.img} : require("../../assets/images/home/workout-placeholder.png")}
                    style={styles.thumb}
                />
                <Text style={styles.title} numberOfLines={1}>{item.name}</Text>

                {/* Toggle to/from superset */}
                <Pressable onPress={() => toggleSuperset(item, inSuper)} hitSlop={8} style={{padding: 6}}>
                    <Ionicons
                        name={inSuper ? "flame" : "flame-outline"}
                        size={20}
                        color={inSuper ? "#FF6B6B" : THEME.dim}
                    />
                </Pressable>
            </View>
        </LinearGradient>
    ), [gradient, main, superSet, move, toggleSuperset]);

    const onPressDone = () => {
        const order = [...main, ...superSet].map((d, i) => ({id: d.id, order: i + 1}));
        const superset = superSet.map(s => s.id);
        onDone?.({order, superset});
        onClose?.();
    };

    return (
        <Modal
            visible={visible}
            transparent
            statusBarTranslucent
            presentationStyle="overFullScreen"
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Backdrop */}
            <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
                <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.55)"}}/>
            </Pressable>

            {/* Sheet */}
            <SafeAreaView style={styles.safe} pointerEvents="box-none">
                <View style={styles.sheet}>
                    <View style={styles.handle}/>

                    <Text style={styles.header}>Reorder</Text>
                    <View style={{height :1, backgroundColor: "#697077", marginHorizontal: 18, marginVertical : 10}}></View>
                    <FlatList
                        data={main}
                        keyExtractor={(i) => i.id}
                        renderItem={({item, index}) => <Row item={item} index={index} inSuper={false}/>}
                        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 10}}
                    />

                    <Text style={[styles.subHeader, {marginHorizontal: 16}]}>Super Set</Text>

                    <View style={[styles.supersetBox, {borderColor: "rgba(181,127,230,0.35)"}]}>
                        <FlatList
                            data={superSet}
                            keyExtractor={(i) => i.id}
                            renderItem={({item, index}) => <Row item={item} index={index} inSuper={true}/>}
                            contentContainerStyle={{padding: 10}}
                            ListEmptyComponent={<Text style={styles.emptySuperset}>No exercises yet</Text>}
                        />
                    </View>

                    <View style={{padding: 16}}>
                        <Pressable onPress={onPressDone}>
                            <LinearGradient colors={gradient} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                                            style={styles.doneBtn}>
                                <Text style={styles.doneText}>Done</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
    safe: {flex: 1, justifyContent: "flex-end"},
    sheet: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        maxHeight: "92%",
        overflow: "hidden",
    },
    handle: {
        alignSelf: "center", width: 64, height: 3, borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.8)", marginTop: 8, marginBottom: 6,
    },
    header: {textAlign: "center", color: "#F2F1F6", fontWeight: "400", paddingVertical: 6},
    subHeader: {color: "#F2F1F6", opacity: 0.8, fontWeight: "600", marginBottom: 6, marginTop: 4},

    borderWrap: {borderRadius: 12, padding: 1.5, marginBottom: 10},
    rowCard: {
        flexDirection: "row", alignItems: "center",
        backgroundColor: COLORS.background,
        borderRadius: 12, borderWidth: 1, borderColor: "rgba(124,91,242,0.28)",
        paddingVertical: 10, paddingHorizontal: 10,
    },
    thumb: {width: 42, height: 42, borderRadius: 8, marginRight: 10, backgroundColor: "#15121B"},
    title: {color: "#F2F1F6", fontWeight: "800", fontSize: 15, flex: 1},

    reorderBtns: {flexDirection: "column", marginRight: 4, gap: 2},
    circleBtn: {
        width: 28, height: 28, borderRadius: 14,
        alignItems: "center", justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1, borderColor: "rgba(255,255,255,0.14)",
        marginLeft: 6,
    },

    supersetBox: {
        marginHorizontal: 16, marginTop: 6, marginBottom: 8,
        borderWidth: 1, borderStyle: "dashed", borderRadius: 12, paddingVertical: 4,
    },
    emptySuperset: {textAlign: "center", color: "rgba(255,255,255,0.6)", paddingVertical: 12},

    doneBtn: {
        height: 46, borderRadius: 10, alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
    },
    doneText: {color: "#fff", fontWeight: "700"},
});
