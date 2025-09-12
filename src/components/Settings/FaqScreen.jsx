import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    primary: COLORS?.primary ?? "#7b61ff",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
};

/* --------- Gradient 1px border wrapper (your style) --------- */
const BORDER = 2;
const GradientBorder = ({radius = 10, style, children}) => (
    <LinearGradient
        colors={THEME.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[{borderRadius: radius, padding: BORDER}, style]}
    >
        <View
            style={{
                borderRadius: radius - BORDER,
                overflow: "hidden",
                backgroundColor: COLORS.background,
            }}
        >
            {children}
        </View>
    </LinearGradient>
);

/* --------- Mock FAQs (replace with your API data) --------- */
const FAQS = [
    {
        q: "How do I change my goal?",
        a: "Go to the “My Account” page, tap on “My Goals” and choose a new one.",
    },
    {
        q: "How do I start a workout?",
        a: "From the Workouts tab, pick a plan or routine, then tap “Start”.",
    },
    {
        q: "Can I change my goal later?",
        a: "Yes. You can update goals anytime from Account → My Goals.",
    },
    {
        q: "How do I connect my smartwatch?",
        a: "Open Settings → Integrations, choose your device, and follow the prompts.",
    },
    {
        q: "Do I need internet to track workouts?",
        a: "No. You can track offline; data syncs automatically when you’re back online.",
    },
    {
        q: "Can I delete my account?",
        a: "Yes. Go to Account → Privacy → Delete Account. This is permanent.",
    },
];

/* --------- Row --------- */
const FaqItem = ({item, expanded, onToggle}) => (
    <GradientBorder radius={10} style={{marginBottom: 16}}>
        <Pressable onPress={onToggle} style={styles.rowHead}>
            <Text style={styles.rowTitle}>{item.q}</Text>
            <Ionicons
                name={expanded ? "chevron-down" : "chevron-forward"}
                size={18}
                color="#c8c6ff"
            />
        </Pressable>
        {expanded && (
            <View style={styles.rowBody}>
                <Text style={styles.rowAnswer}>{item.a}</Text>
            </View>
        )}
    </GradientBorder>
);

/* --------- Screen --------- */
export default function FaqScreen({navigation}) {
    const [query, setQuery] = useState("");
    const [openIndex, setOpenIndex] = useState(null); // only one open (like your mock)
    const [composerOpen, setComposerOpen] = useState(false);
    const [message, setMessage] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return FAQS;
        return FAQS.filter(
            (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
        );
    }, [query]);

    const onToggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const sendQuestion = async () => {
        if (!message.trim()) {
            Alert.alert("Type your question", "Please enter a question first.");
            return;
        }
        setMessage("");
        setComposerOpen(false);
        Alert.alert("Thanks!", "We’ll get back to you soon.");
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <View style={styles.container}>
                    {/* Title (rightmost mock) */}
                    <Text style={styles.pageTitle}>FAQs</Text>

                    {/* Search */}
                    <GradientBorder radius={10} style={{marginBottom: 16}}>
                        <View style={styles.searchWrap}>
                            <Ionicons name="search" size={16} color="#c8c6ff"/>
                            <TextInput
                                value={query}
                                onChangeText={setQuery}
                                placeholder="Search a topic"
                                placeholderTextColor="#7d81a2"
                                style={styles.searchInput}
                                returnKeyType="search"
                            />
                            {query.length > 0 && (
                                <Pressable onPress={() => setQuery("")} hitSlop={10}>
                                    <Ionicons name="close" size={18} color="#9aa0ad"/>
                                </Pressable>
                            )}
                        </View>
                    </GradientBorder>

                    {/* FAQs list */}
                    <FlatList
                        data={filtered}
                        keyExtractor={(item, idx) => `${item.q}-${idx}`}
                        renderItem={({item, index}) => (
                            <FaqItem
                                item={item}
                                expanded={openIndex === index}
                                onToggle={() => onToggle(index)}
                            />
                        )}
                        contentContainerStyle={{paddingBottom: composerOpen ? 140 : 88}}
                    />

                    {/* Bottom CTA / Composer */}
                    {!composerOpen ? (
                        <LinearGradient
                            colors={THEME.gradient}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            style={styles.askBtn}
                        >
                            <Pressable onPress={() => setComposerOpen(true)} style={styles.askPress}>
                                <Text style={styles.askText}>Have a Question ?</Text>
                            </Pressable>
                        </LinearGradient>
                    ) : (
                        <>
                            <LinearGradient
                                colors={THEME.gradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                style={styles.composerBar}
                            />
                            <View style={styles.composerWrap}>
                                <TextInput
                                    value={message}
                                    onChangeText={setMessage}
                                    placeholder="Type your question..."
                                    placeholderTextColor="#8f93ad"
                                    style={styles.composerInput}
                                    multiline
                                />
                                <LinearGradient
                                    colors={THEME.gradient}
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    style={styles.sendBtn}
                                >
                                    <Pressable onPress={sendQuestion} style={styles.sendPress}>
                                        <Text style={styles.sendText}>Send your question</Text>
                                    </Pressable>
                                </LinearGradient>
                            </View>
                        </>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

/* --------- styles --------- */
const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {flex: 1, padding: 16},

    pageTitle: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
    },

    /* Search */
    searchWrap: {
        minHeight: 44,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
        paddingVertical: 10,
    },

    /* Row */
    rowHead: {
        minHeight: 50,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowTitle: {color: "#fff", fontSize: 15, fontWeight: "600"},
    rowBody: {paddingHorizontal: 14, paddingBottom: 12},
    rowAnswer: {color: "#d7daf0", lineHeight: 20},

    /* Ask button */
    askBtn: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 20,
        borderRadius: 10,
        padding: 1,
    },
    askPress: {
        paddingVertical: 14,
        alignItems: "center",
        borderRadius: 9,
    },
    askText: {color: "#fff", fontWeight: "700"},

    /* Composer */
    composerBar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 10,
        opacity: 0.7,
    },
    composerWrap: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 20,
    },
    composerInput: {
        minHeight: 90,
        maxHeight: 160,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
        color: "#111",
    },
    sendBtn: {
        marginTop: 10,
        borderRadius: 10,
        padding: 1,
        alignSelf: "flex-end",
    },
    sendPress: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 9,
    },
    sendText: {color: "#fff", fontWeight: "700"},
});
