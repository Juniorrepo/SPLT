import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    LayoutAnimation,
    UIManager,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import COLORS from "../../constants/Colors";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PLANS = [
    {
        id: "starter",
        title: "Starter",
        subtitle: "Just getting into lifting—basic plans and tracking.",
        features: ["Access to starter programs", "Training log", "Basic analytics"],
        monthly: 200,
        yearly: 160,
        icon: <Ionicons name="body-outline" size={22} color="#9CA3AF"/>,
    },
    {
        id: "pro",
        title: "Pro",
        subtitle: "Advanced programming, progressive overload planning, and form tips.",
        features: ["Unlock advanced programs", "Weekly progress insights", "Community leaderboards"],
        monthly: 800,
        yearly: 650,
        icon: <MaterialCommunityIcons name="arm-flex" size={22} color="#A78BFA"/>,
        tag: "Most Popular",
    },
    {
        id: "vip",
        title: "VIP",
        subtitle:
            "For serious lifters: elite programs, nutrition tracking, and monthly coaching calls.",
        features: [
            "Unlock premium training programs",
            "Meal & nutrition tracking",
            "Exclusive challenges & leaderboards",
        ],
        monthly: 1500,
        yearly: 1200,
        icon: (
            <View style={{flexDirection: "row", gap: 6, alignItems: "center"}}>
                <MaterialCommunityIcons name="crown-outline" size={20} color="#A78BFA"/>
                <MaterialCommunityIcons name="arm-flex" size={20} color="#A78BFA"/>
            </View>
        ),
        tag: "Best Value",
    },
];

export default function PricingScreen({onContinue}) {
    const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"
    const [selectedId, setSelectedId] = useState("vip");

    const priceFor = (plan) => (billing === "monthly" ? plan.monthly : plan.yearly);

    const handleSelect = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedId(id);
    };

    const handleContinue = () => {
        onContinue?.({id: selectedId, billing});
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.header}>
                <Text style={styles.brand}>SPLT</Text>
                <Text style={styles.premium}>Premium</Text>
            </View>

            {/* Billing Toggle */}
            <View style={styles.toggleWrap}>
                <SegmentedToggle
                    value={billing}
                    onChange={(v) => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setBilling(v);
                    }}
                    options={[
                        {key: "monthly", label: "Monthly"},
                        {key: "yearly", label: "Yearly • Save 20%"},
                    ]}
                />
            </View>

            {/* Plans (no FlatList) */}
            <View style={{padding: 16, paddingBottom: 24}}>
                {PLANS.map((item, idx) => {
                    const selected = selectedId === item.id;
                    const isVIP = item.id === "vip";
                    return (
                        <View key={item.id} style={idx > 0 ? {marginTop: 14} : null}>
                            <PlanCard
                                plan={item}
                                price={priceFor(item)}
                                billing={billing}
                                selected={selected}
                                highlight={isVIP}
                                onPress={() => handleSelect(item.id)}
                            />
                        </View>
                    );
                })}

                <GradientButton label="Get Started" onPress={handleContinue}/>
            </View>
        </SafeAreaView>
    );
}

/* -------------------------- components -------------------------- */

function PlanCard({plan, price, billing, selected, highlight, onPress}) {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
            <View
                style={[
                    styles.card,
                    highlight && styles.cardVIP,
                    selected && styles.cardSelected,
                ]}
            >
                {plan.tag && (
                    <TagRibbon text={plan.tag} gradient={highlight || plan.tag === "Most Popular"}/>
                )}

                <View style={styles.cardHeader}>
                    {plan.icon}
                    <Text style={[styles.planTitle, highlight && styles.planTitleVIP]}>
                        {plan.title}
                    </Text>
                </View>

                <Text style={styles.subtitle}>{plan.subtitle}</Text>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.per}>
                        {" "}
                        / {billing === "monthly" ? "Monthly" : "Monthly (billed yearly)"}
                    </Text>
                </View>

                <View style={styles.divider}/>

                {plan.features.map((f) => (
                    <View key={f} style={styles.featureRow}>
                        <Ionicons name="checkmark-circle" size={18} color="#A78BFA"/>
                        <Text style={styles.featureText}>{f}</Text>
                    </View>
                ))}

                {selected && (
                    <View style={styles.selectedDotWrap}>
                        <View style={styles.selectedDot}/>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

function TagRibbon({text, gradient}) {
    const content = (
        <View style={styles.ribbonContent}>
            <Text style={styles.ribbonText}>{text}</Text>
        </View>
    );
    if (!gradient) return <View style={styles.ribbon}>{content}</View>;
    return (
        <LinearGradient
            colors={["#A78BFA", "#7C3AED"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.ribbon}
        >
            {content}
        </LinearGradient>
    );
}

function SegmentedToggle({value, onChange, options}) {
    return (
        <View style={styles.segment}>
            {options.map((opt) => {
                const active = value === opt.key;
                return (
                    <TouchableOpacity
                        key={opt.key}
                        style={[styles.segmentItem, active && styles.segmentItemActive]}
                        onPress={() => onChange(opt.key)}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                            {opt.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

function GradientButton({label, onPress}) {
    return (
        <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={{marginTop: 22}}>
            <LinearGradient
                colors={["#A78BFA", "#7C3AED"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.cta}
            >
                <Text style={styles.ctaText}>{label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

/* ---------------------------- styles ---------------------------- */

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: COLORS.background},
    header: {alignItems: "center", marginTop: 8, marginBottom: 4},
    brand: {fontSize: 28, color: "#FFFFFF", fontWeight: "900", letterSpacing: 2},
    premium: {fontSize: 16, color: "#A78BFA", marginTop: 4, fontWeight: "600"},

    toggleWrap: {paddingHorizontal: 16, marginTop: 8},
    segment: {
        backgroundColor: "#141418",
        borderRadius: 14,
        flexDirection: "row",
        padding: 4,
        gap: 6,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#2A2A33",
    },
    segmentItem: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    segmentItemActive: {backgroundColor: "#1B1B22", borderWidth: 1, borderColor: "#3B3B45"},
    segmentText: {color: "#9CA3AF", fontWeight: "600"},
    segmentTextActive: {color: "#E5E7EB"},

    card: {
        backgroundColor: "#121217",
        borderRadius: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: "#2A2A33",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 14,
        shadowOffset: {width: 0, height: 8},
        elevation: 4,
    },
    cardVIP: {borderColor: "#6D28D9"},
    cardSelected: {borderColor: "#A78BFA", shadowOpacity: 0.35, elevation: 8},
    cardHeader: {flexDirection: "row", alignItems: "center", gap: 10},
    planTitle: {color: "#E5E7EB", fontWeight: "800", fontSize: 16},
    planTitleVIP: {color: "#C4B5FD"},
    subtitle: {color: "#9CA3AF", marginTop: 8, lineHeight: 20},
    priceRow: {flexDirection: "row", alignItems: "flex-end", marginTop: 14},
    price: {color: "#C4B5FD", fontSize: 28, fontWeight: "900"},
    per: {color: "#9CA3AF", marginLeft: 6, marginBottom: 4},
    divider: {height: 1, backgroundColor: "#23232B", marginVertical: 14},
    featureRow: {flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10},
    featureText: {color: "#E5E7EB"},

    cta: {borderRadius: 16, paddingVertical: 14, alignItems: "center"},
    ctaText: {color: "white", fontWeight: "800", fontSize: 16},

    ribbon: {
        position: "absolute",
        top: 10,
        right: 10,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        overflow: "hidden",
    },
    ribbonContent: {paddingVertical: 4, paddingHorizontal: 10, backgroundColor: "rgba(167,139,250,0.12)"},
    ribbonText: {color: "#EDE9FE", fontSize: 11, fontWeight: "700"},

    selectedDotWrap: {
        position: "absolute",
        top: -8,
        left: -8,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "#121217",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#A78BFA",
    },
    selectedDot: {width: 10, height: 10, borderRadius: 5, backgroundColor: "#A78BFA"},
});
