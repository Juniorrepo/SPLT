import React, { useMemo, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GroupLeaderboardScreen from "./GroupLeaderboardScreen";

export default function GroupChallengesScreen({ navigation }) {
    const [tab, setTab] = useState('Challenges'); // <-- fixed

    const challenges = useMemo(
        () => [
            { id: '1', title: 'Walking Every day', current: 3000, durationDays: 30, target: 10000, unit: 'Step' },
            { id: '2', title: 'Walking Every day', current: 3000, durationDays: 30, target: 10000, unit: 'Step' },
            { id: '3', title: 'Walking Every day', current: 3000, durationDays: 30, target: 10000, unit: 'Step' },
        ],
        []
    );

    const renderCard = ({ item }) => <ChallengeCard item={item} />;

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack?.()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerLogo}>SPLT</Text>
                <View style={{ width: 24 }} />
            </LinearGradient>

            <View style={styles.tabsWrap}>
                <TouchableOpacity style={styles.tabItem} onPress={() => setTab('Challenges')}>
                    <Text style={[styles.tabText, tab === 'Challenges' && styles.tabTextActive]}>Challenges</Text>
                    {tab === 'Challenges' && <View style={styles.tabUnderline} />}
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => setTab('Leaderboard')}>
                    <Text style={[styles.tabText, tab === 'Leaderboard' && styles.tabTextActive]}>Leaderboard</Text>
                    {tab === 'Leaderboard' && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
            </View>

            {tab === 'Challenges' ? (
                <FlatList
                    data={challenges}
                    keyExtractor={(i) => i.id}
                    renderItem={renderCard}
                    contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
                />
            ) : (
                <GroupLeaderboardScreen></GroupLeaderboardScreen>
            )}

            <View style={styles.bottomBar}>
                <Ionicons name="home-outline" size={22} color="#9C9C9C" />
                <Ionicons name="barbell-outline" size={22} color="#9C9C9C" />
                <Ionicons name="map-outline" size={22} color="#9C9C9C" />
                <Ionicons name="cart-outline" size={22} color="#9C9C9C" />
                <Ionicons name="person-outline" size={22} color="#9C9C9C" />
            </View>
        </SafeAreaView>
    );
}

const ChallengeCard = ({ item }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        <View style={styles.columns}>
            <Text style={styles.colHeader}>Current</Text>
            <Text style={styles.colHeader}>Duration</Text>
            <Text style={styles.colHeader}>Target</Text>
        </View>

        <View style={styles.lineWrap}>
            <View style={styles.dashedLine} />
            <View style={[styles.dot, { left: '12%' }]} />
            <View style={[styles.dot, { left: '49%' }]} />
            <View style={[styles.dot, { left: '86%' }]} />
        </View>

        <View style={styles.valuesRow}>
            <View style={styles.valueCol}>
                <Text style={styles.valueNumber}>{item.current}</Text>
                <Text style={styles.valueUnit}>{item.unit}</Text>
            </View>

            <View style={styles.valueCol}>
                <Text style={styles.valueNumber}>{item.durationDays}</Text>
                <Text style={styles.valueUnit}>Days</Text>
            </View>

            <View style={styles.valueCol}>
                <Text style={styles.valueNumber}>{item.target}</Text>
                <Text style={styles.valueUnit}>{item.unit}</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.startBtn} activeOpacity={0.85}>
            <LinearGradient colors={['#6E59E6', '#5B44C8']} style={styles.startBtnGrad}>
                <Text style={styles.startBtnText}>Start Challenge</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 },
    headerLogo: { color: '#fff', fontWeight: '800', fontSize: 22, letterSpacing: 2 },

    tabsWrap: { flexDirection: 'row', paddingHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, justifyContent : "center", marginTop : 15,},
    tabItem: { paddingVertical: 10, marginRight: 18, alignItems: 'center' },
    tabText: { color: '#A0A0A0', fontSize: 14 },
    tabTextActive: { color: '#FFFFFF', fontWeight: '700' },
    tabUnderline: { marginTop: 6, height: 3, width: '100%', backgroundColor: '#FFFFFF', borderRadius: 3 },

    card: { backgroundColor: '#0F0F12', borderColor: '#241F33', borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
    cardTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 14, marginBottom: 10 },

    columns: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6 },
    colHeader: { color: '#B8B8B8', fontSize: 12 },

    lineWrap: { height: 18, marginTop: 8, marginBottom: 6, justifyContent: 'center' },
    dashedLine: { borderTopWidth: 1, borderTopColor: '#3B3452', borderStyle: 'dashed' },
    dot: { position: 'absolute', top: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: '#7E6AE6' },

    valuesRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6, marginBottom: 10, marginTop: 2 },
    valueCol: { alignItems: 'center', minWidth: 70 },
    valueNumber: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
    valueUnit: { color: '#C9C9C9', fontSize: 12, marginTop: 2 },

    startBtn: { marginTop: 4 },
    startBtnGrad: { height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    startBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },

    placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    placeholderText: { color: '#BDBDBD' },

    bottomBar: { height: 56, borderTopColor: '#121212', borderTopWidth: 1, backgroundColor: '#000', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
});
