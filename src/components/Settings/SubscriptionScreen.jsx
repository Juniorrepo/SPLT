// screens/subscription/SubscriptionScreen.jsx
import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    Alert,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";
import VipPaywallScreen from "./VipPaywallScreen";
import PricingScreen from "./VipPaywallScreen";

/* ----------------- Theme ----------------- */
const T = {
    bg: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B8B9C5",
    card: COLORS?.card ?? "#101119",
    grad: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
    line: "rgba(110,86,205,0.35)",
    success: "#8BE28B",
};

const GradientFrame = ({children, radius = 12, pad = 12, style}) => (
    <LinearGradient colors={T.grad} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={[{borderRadius: radius, padding: 1}, style]}>
        <View style={{borderRadius: radius - 1, backgroundColor: T.card, overflow: "hidden", padding: pad}}>
            {children}
        </View>
    </LinearGradient>
);

const GradientButton = ({label, onPress, style}) => (
    <LinearGradient colors={T.grad} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={[styles.btn, style]}>
        <Pressable onPress={onPress} style={{paddingVertical: 12, alignItems: "center"}}>
            <Text style={styles.btnText}>{label}</Text>
        </Pressable>
    </LinearGradient>
);

/* ----------------- Fake APIs ----------------- */
const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

async function apiApplyCoupon(code) {
    await wait();
    return {ok: code?.toUpperCase() === "SAVE10", discountPct: 10};
}

async function apiRedeemPoints(points) {
    await wait();
    return {ok: true, amount: Math.min(points, 500) / 100};
} // 100 pts = 1.00
async function apiSubscribe({plan, price}) {
    await wait();
    return {ok: true, message: `Subscribed to ${plan} for ${price.toFixed(2)}`};
}

/* ----------------- Screen ----------------- */
export default function SubscriptionScreen({navigation}) {
    // plan pricing (you can fetch this)
    const monthly = 15.0;
    const yearly = monthly * 12 * 0.8; // 20% off
    const [coupon, setCoupon] = useState("");
    const [couponPct, setCouponPct] = useState(0);
    const [points, setPoints] = useState(200);
    const [redeemAmt, setRedeemAmt] = useState(0);

    const finalYearly = useMemo(() => {
        const afterCoupon = yearly * (1 - couponPct / 100);
        const afterPoints = Math.max(0, afterCoupon - redeemAmt);
        return afterPoints;
    }, [yearly, couponPct, redeemAmt]);

    const onApplyCoupon = async () => {
        const r = await apiApplyCoupon(coupon.trim());
        if (!r.ok) return Alert.alert("Invalid code", "Please check the promo code and try again.");
        setCouponPct(r.discountPct);
        Alert.alert("Applied", `Coupon applied: -${r.discountPct}%`);
    };

    const onRedeem = async () => {
        if (points <= 0) return;
        const r = await apiRedeemPoints(points);
        if (r.ok) {
            setRedeemAmt(r.amount);
            Alert.alert("Redeemed", `Redeemed points: -$${r.amount.toFixed(2)}`);
        }
    };

    const onSubscribe = async () => {
        navigation.navigate("CreditCard")
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: T.bg}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>
            <ScrollView contentContainerStyle={styles.container}>

                {/* VIP plan card */}
                <PricingScreen
                    onContinue={({id, billing}) => {
                        // Navigate to checkout / call your paywall here
                        console.log("Selected:", id, "Billing:", billing);
                    }}
                />

                {/* Feature checklist (like your list) */}
                <View style={{marginTop: 6, marginBottom: 10, gap: 10}}>
                    {[
                        "Workout Plan",
                        "Access to a range of group fitness classes (e.g., yoga, spinning, HIIT)",
                        "Daily follow-up",
                        "Dedicated chat",
                        "Chat Support",
                        "Invoice Generate",
                    ].map((t) => (
                        <View key={t} style={styles.tickRow}>
                            <Ionicons name="checkmark-circle" size={18} color={T.success}/>
                            <Text style={styles.tickText}>{t}</Text>
                        </View>
                    ))}
                </View>

                {/* Promo Code */}
                <Text style={styles.sectionTitle}>Have a promo code ?</Text>
                <GradientFrame pad={0} style={{marginBottom: 12}}>
                    <View style={styles.rowField}>
                        <Ionicons name="pricetag-outline" size={16} color="#c8c6ff"/>
                        <TextInput
                            value={coupon}
                            onChangeText={setCoupon}
                            placeholder="Coupon Code"
                            placeholderTextColor="#9393a8"
                            style={styles.input}
                            autoCapitalize="characters"
                        />
                        <Pressable onPress={onApplyCoupon} style={styles.smallBtn}>
                            <Text style={styles.smallBtnText}>Apply</Text>
                        </Pressable>
                    </View>
                </GradientFrame>

                {/* Loyalty points */}
                <View style={styles.rowBetween}>
                    <Text style={styles.label}>Loyalty Points Balance <Text style={{color: "#c8c6ff"}}>({points})</Text></Text>
                    <Pressable onPress={onRedeem} style={[styles.smallBtn, {paddingHorizontal: 12}]}>
                        <Text style={styles.smallBtnText}>Redeem</Text>
                    </Pressable>
                </View>

                {/* Subscribe CTA */}
                <GradientButton
                    label={`Subscribe to Yearly Plan  •  $${finalYearly.toFixed(2)}`}
                    onPress={onSubscribe}
                    style={{marginTop: 10}}
                />
                <Text style={styles.helper}>Cancel your subscription at any time</Text>

                {/* Comparison */}
                <View style={{marginTop: 18}}>
                    <Text style={styles.sectionTitle}>Need to compare ?</Text>
                    <GradientFrame>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tHead, {flex: 2}]}>Feature</Text>
                            <Text style={[styles.tHead, {flex: 1, textAlign: "center"}]}>Free</Text>
                            <Text style={[styles.tHead, {flex: 1, textAlign: "center"}]}>Premium</Text>
                        </View>
                        {[
                            ["Leaderboards", "—", "●"],
                            ["Unlimited Followers", "2 Max", "∞"],
                            ["Unlimited Workouts", "3 Max", "∞"],
                            ["Data Analysis", "1 Month", "All Time"],
                        ].map(([f, free, pro]) => (
                            <View key={f} style={styles.tableRow}>
                                <Text style={[styles.tCell, {flex: 2}]}>{f}</Text>
                                <Text style={[styles.tCell, {
                                    flex: 1,
                                    textAlign: "center",
                                    color: "#c8c6ff"
                                }]}>{free}</Text>
                                <Text style={[styles.tCell, {flex: 1, textAlign: "center", color: "#fff"}]}>{pro}</Text>
                            </View>
                        ))}
                    </GradientFrame>
                </View>

                {/* FAQ accordions */}
                <View style={{marginTop: 16}}>
                    <Text style={styles.sectionTitle}>Any questions ?</Text>
                    {FAQ.map((f, i) => <FaqRow key={i} {...f} />)}
                </View>

                <View style={{marginTop: 14, flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={[styles.link, {textDecorationLine: "underline"}]}>Terms & Conditions</Text>
                    <Text style={[styles.link, {textDecorationLine: "underline"}]}>Privacy Policy</Text>
                </View>

                <View style={{alignItems: "center", marginTop: 20, marginBottom: 18}}>
                    <Text style={[styles.muted, {textAlign: "center"}]}>Are you having any issues ?</Text>
                    <Text style={[styles.link, {marginTop: 6}]}>Contact us at: splt@xyzgmail.com</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ----------------- FAQ ----------------- */
const FAQ = [
    {
        q: "What is included in SPLT Premium ?",
        a: "You’ll unlock premium programs, nutrition tracking, advanced analytics, and exclusive challenges."
    },
    {
        q: "Is SPLT Premium Renewable ?",
        a: "Yes. Subscriptions renew automatically unless you cancel at least 24 hours before the end of the period."
    },
    {
        q: "Can the subscription be canceled",
        a: "Any time from Settings → Subscriptions. Access remains until the period ends."
    },
    {
        q: "Can you change subscription plans",
        a: "Yes. Upgrading prorates immediately; downgrading takes effect next cycle."
    },
];

const FaqRow = ({q, a}) => {
    const [open, setOpen] = useState(false);
    return (
        <GradientFrame pad={0} style={{marginBottom: 10}}>
            <Pressable onPress={() => setOpen((o) => !o)} style={styles.faqHead}>
                <Text style={styles.faqQ}>{q}</Text>
                <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#c8c6ff"/>
            </Pressable>
            {open ? <View style={{paddingHorizontal: 14, paddingBottom: 12}}><Text
                style={styles.muted}>{a}</Text></View> : null}
        </GradientFrame>
    );
};

/* ----------------- Styles ----------------- */
const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {padding: 16, paddingBottom: 28},

    price: {color: "#fff", fontSize: 22, fontWeight: "900"},
    priceUnit: {color: "#c8c6ff", fontSize: 12, fontWeight: "700"},

    tickRow: {flexDirection: "row", alignItems: "center", gap: 8},
    tickText: {color: "#e7e7ff", fontSize: 14},

    badge: {paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, backgroundColor: "rgba(197,183,255,0.18)"},
    badgeText: {color: "#c8c6ff", fontSize: 12, fontWeight: "700"},

    sectionTitle: {color: "#fff", fontWeight: "800", marginTop: 8, marginBottom: 8},

    rowField: {flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingVertical: 10},
    input: {flex: 1, color: "#fff", paddingVertical: 6},
    smallBtn: {paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, backgroundColor: "#6c5ce7"},
    smallBtnText: {color: "#fff", fontWeight: "700"},

    rowBetween: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8},
    label: {color: "#fff", fontWeight: "700"},

    btn: {borderRadius: 10, marginTop: 10},
    btnText: {color: "#fff", fontWeight: "800", letterSpacing: 0.2},

    helper: {color: T.muted, marginTop: 8, fontSize: 12},

    tableHeader: {
        flexDirection: "row",
        paddingBottom: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: T.line
    },
    tHead: {color: "#fff", fontWeight: "800"},
    tableRow: {flexDirection: "row", paddingTop: 10},
    tCell: {color: "#e7e7ff", fontSize: 13},

    faqHead: {
        minHeight: 48,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    faqQ: {color: "#fff", fontWeight: "700"},
    muted: {color: T.muted},

    link: {color: "#c8c6ff"},
});
