import React, { useMemo, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Modal,
    Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PERIODS = [
    {
        key: 'Weekly',
        label: 'Weekly',
        bigImg: require('../../assets/images/home/thick_arms.png'),
        smallImg: require('../../assets/images/home/thin_arms.png'),
    },
    {
        key: 'Monthly',
        label: 'Monthly',
        bigImg: require('../../assets/images/home/thick_arms.png'),
        smallImg: require('../../assets/images/home/thin_arms.png'),
    },
    {
        key: 'All Time',
        label: 'All Time',
        bigImg: require('../../assets/images/home/thick_arms.png'),
        smallImg: require('../../assets/images/home/thin_arms.png'),
    },
];

export default function GroupLeaderboardScreen() {
    const [period, setPeriod] = useState('Monthly');
    const [selected, setSelected] = useState(null); // {item, index}

    const data = useMemo(() => {
        const base = [
            { id: '1', name: 'Cbum',  value: '15,00 Kg', avatar: 'https://i.pravatar.cc/100?img=12' },
            { id: '2', name: 'Honen', value: '12,00 Kg', avatar: 'https://i.pravatar.cc/100?img=13' },
            { id: '3', name: 'Cbum',  value: '11,50 Kg', avatar: 'https://i.pravatar.cc/100?img=14' },
            { id: '4', name: 'Mark',  value: '11,00 Kg', avatar: 'https://i.pravatar.cc/100?img=15' },
            { id: '5', name: 'Paul',  value: '10,00 Kg', avatar: 'https://i.pravatar.cc/100?img=16' },
        ];
        return { Weekly: base, Monthly: base, 'All Time': base }[period];
    }, [period]);

    // --- helpers for the detail view ---
    const parseKg = (str) => {
        // "15,00 Kg" -> 15
        if (!str) return 0;
        const n = parseFloat(String(str).replace(/[^\d,.-]/g, '').replace(',', '.'));
        return isNaN(n) ? 0 : n;
    };

    const openDetails = (item, index) => setSelected({ item, index });
    const closeDetails = () => setSelected(null);

    // ----- list item components -----
    const TopRow = ({ item, index }) => {
        const rank = index + 1;
        const gold  = rank === 1;
        const third = rank === 3;

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => openDetails(item, index)}
                style={[
                    styles.topItem,
                    gold  && { borderColor: '#D7BF5A', backgroundColor: '#1A150B' },
                    third && { borderColor: '#BFBFBF' },
                ]}
            >
                <View style={styles.rankBadge}><Text style={styles.rankText}>{rank}</Text></View>
                <View style={styles.center}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                </View>
                <Text style={styles.value}>{item.value}</Text>
            </TouchableOpacity>
        );
    };

    const Row = ({ item, index }) => {
        if (index < 3) return <TopRow item={item} index={index} />;
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => openDetails(item, index)}
                activeOpacity={0.85}
            >
                <View style={styles.rowLeft}>
                    <View style={styles.indexCircle}><Text style={styles.indexText}>{index + 1}</Text></View>
                    <Image source={{ uri: item.avatar }} style={styles.rowAvatar} />
                    <Text style={styles.rowName}>{item.name}</Text>
                </View>
                <Text style={styles.rowValue}>{item.value}</Text>
            </TouchableOpacity>
        );
    };

    // ----- detail card -----
    const DetailModal = () => {
        if (!selected) return null;

        const { item, index } = selected;
        const rank = index + 1;

        // mock previous/current/progress numbers just to illustrate UI
        const current = parseKg(item.value);
        const previous = Math.max(0, current - 3); // pretend previous is -3 kg
        const progress = current - previous;

        return (
            <Modal
                visible
                transparent
                animationType="fade"
                onRequestClose={closeDetails}
            >
                <View style={styles.modalBackdrop}>
                    <Pressable style={styles.modalBackdrop} onPress={closeDetails} />
                    <LinearGradient
                        colors={['#1a1a1a', '#121016', '#0e0d12']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.detailCardWrapper}
                    >
                        <View style={styles.detailCard}>
                            <View style={styles.detailHeader}>
                                <View style={styles.detailRankCircle}>
                                    <Text style={styles.detailRankText}>{rank}</Text>
                                </View>

                                <View style={styles.detailCenter}>
                                    <Image source={{ uri: item.avatar }} style={styles.detailAvatar} />
                                    <Text style={styles.detailName} numberOfLines={1}>{item.name}</Text>
                                </View>

                                <Text style={styles.detailValue}>
                                    {item.value}
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <Text style={styles.exerciseText}>
                                <Text style={{ textDecorationLine: 'underline' }}>Exercise: Bench Press</Text>
                            </Text>

                            <View style={styles.metricsRow}>
                                <View style={styles.metric}>
                                    <Text style={styles.metricLabel}>Previous:</Text>
                                    <Text style={styles.metricValue}>{previous.toFixed(0)}kg</Text>
                                    <Ionicons name="caret-down" size={14} color="#FF4A4A" style={{ marginLeft: 4 }} />
                                </View>

                                <View style={styles.metric}>
                                    <Text style={styles.metricLabel}>Current:</Text>
                                    <Text style={styles.metricValue}>{current.toFixed(0)}kg</Text>
                                    <Ionicons name="caret-up" size={14} color="#4ADE80" style={{ marginLeft: 4 }} />
                                </View>
                            </View>

                            <Text style={styles.progressText}>
                                Progress: <Text style={{ color: '#86efac', fontWeight: '800' }}>+{progress.toFixed(0)}kg</Text>
                                <Ionicons name="caret-up" size={14} color="#86efac" />
                            </Text>

                            <Pressable onPress={closeDetails} style={styles.closeBtn}>
                                <Text style={styles.closeBtnText}>Close</Text>
                            </Pressable>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Period Tabs */}
            <View style={styles.periodTabs}>
                {PERIODS.map(p => {
                    const active = p.key === period;
                    return (
                        <TouchableOpacity key={p.key} onPress={() => setPeriod(p.key)} style={styles.periodItem} activeOpacity={0.85}>
                            <Image source={active ? p.bigImg : p.smallImg} style={[styles.periodIcon, active && styles.periodIconActive]} />
                            <Text style={[styles.periodText, active && styles.periodTextActive]}>{p.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* List */}
            <FlatList
                data={data}
                keyExtractor={(i) => i.id}
                renderItem={({ item, index }) => (
                    <>
                        {index === 3 && (
                            <View style={styles.promo}>
                                <Ionicons name="caret-down" size={16} color="#FF4A4A" />
                                <Text style={styles.promoText}>Promotion Zone</Text>
                                <Ionicons name="caret-up" size={16} color="#4ADE80" />
                            </View>
                        )}
                        <Row item={item} index={index} />
                    </>
                )}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, paddingBottom: 90 }}
            />

            <DetailModal />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },

    periodTabs: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' },
    periodItem: { alignItems: 'center', paddingHorizontal: 6, paddingVertical: 4 },
    periodIcon: { width: 55, height: 40, opacity: 0.85 , resizeMode: 'contain' },
    periodIconActive: { width: 80, height: 60, opacity: 1 , marginTop:10, },
    periodText: { marginTop: 4, fontSize: 12, color: '#9B9B9B' },
    periodTextActive: { color: '#fff', fontWeight: '700' },

    topItem: {
        height: 56, borderRadius: 10, marginTop: 12, paddingHorizontal: 12,
        backgroundColor: '#151515', borderWidth: 1, borderColor: '#463D6B',
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    rankBadge: { width: 28, height: 28, borderRadius: 6, borderWidth: 1, borderColor: '#E8DFA8', alignItems: 'center', justifyContent: 'center' },
    rankText: { color: '#fff', fontWeight: '800', fontSize: 12 },
    center: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 10 },
    avatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
    name: { color: '#fff', fontWeight: '600', fontSize: 14 },
    value: { color: '#EAEAEA', fontWeight: '700', fontSize: 14 },

    promo: { height: 28, borderRadius: 8, marginTop: 14, backgroundColor: '#0E0D12', borderWidth: 1, borderColor: '#4B3A7A', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
    promoText: { color: '#fff', fontWeight: '700', fontSize: 12 },

    row: { height: 60, borderRadius: 10, marginTop: 10, paddingHorizontal: 12, backgroundColor: '#0F0F12', borderWidth: 1, borderColor: '#2E2548', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    rowLeft: { flexDirection: 'row', alignItems: 'center' },
    indexCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#7745EA', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    indexText: { color: '#BCA8FF', fontWeight: '800', fontSize: 12 },
    rowAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 10 },
    rowName: { color: '#EDEDED', fontSize: 14, fontWeight: '600' },
    rowValue: { color: '#D8D8D8', fontWeight: '700', fontSize: 14 },

    bottomBar: { height: 56, borderTopColor: '#121212', borderTopWidth: 1, backgroundColor: '#000', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },

    // modal
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    detailCardWrapper: {
        width: '100%',
        borderRadius: 12,
        padding: 1.5,
    },
    detailCard: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#BFBFBF',
        padding: 14,
    },
    detailHeader: {
        height: 64,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#151515',
        borderWidth: 1,
        borderColor: '#58545F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailRankCircle: {
        width: 30, height: 30, borderRadius: 8,
        borderColor: '#E8DFA8', borderWidth: 1,
        alignItems: 'center', justifyContent: 'center',
    },
    detailRankText: { color: '#fff', fontWeight: '800', fontSize: 12 },
    detailCenter: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 10 },
    detailAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
    detailName: { color: '#fff', fontWeight: '600', fontSize: 14 },
    detailValue: { color: '#EAEAEA', fontWeight: '700', fontSize: 14 },

    divider: {
        height: 1, backgroundColor: '#2A2A2A', marginVertical: 12, opacity: 0.8,
    },
    exerciseText: { color: '#CFCFCF', fontSize: 13, marginBottom: 10 },
    metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, marginBottom: 8 },
    metric: { flexDirection: 'row', alignItems: 'center' },
    metricLabel: { color: '#A9A9A9', marginRight: 6, fontSize: 13 },
    metricValue: { color: '#EDEDED', fontWeight: '700', fontSize: 13 },
    progressText: { color: '#CFCFCF', marginTop: 6, fontSize: 13, textAlign: 'center' },

    closeBtn: {
        marginTop: 14,
        backgroundColor: '#1f1f1f',
        borderWidth: 1,
        borderColor: '#3b3b3b',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeBtnText: { color: '#fff', fontWeight: '700' },
});
