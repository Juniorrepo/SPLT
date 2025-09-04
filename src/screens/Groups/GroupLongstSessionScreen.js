import React, { useMemo, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// ⬇️ One big and one small image for each tab
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

export default function GroupLongestSessionScreen({ navigation }) {
    const [period, setPeriod] = useState('Monthly');

    const data = useMemo(() => {
        const monthly = [
            { id: '1', name: 'Cbum', value: '15,00 Kg', avatar: 'https://i.pravatar.cc/100?img=21' },
            { id: '2', name: 'Honen', value: '12,00 Kg', avatar: 'https://i.pravatar.cc/100?img=22' },
            { id: '3', name: 'Shein', value: '12,50 Kg', avatar: 'https://i.pravatar.cc/100?img=23' },
            { id: '4', name: 'Mark', value: '11,00 Kg', avatar: 'https://i.pravatar.cc/100?img=24' },
            { id: '5', name: 'Paul', value: '10,00 Kg', avatar: 'https://i.pravatar.cc/100?img=25' },
        ];
        return { Weekly: monthly, 'All Time': monthly, Monthly: monthly }[period];
    }, [period]);

    const TopItem = ({ index, item }) => {
        const rank = index + 1;
        const is1 = rank === 1;
        const is3 = rank === 3;

        return (
            <LinearGradient
                colors={['#4D2AA8', '#2B2345']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.topItem,
                    is1 && { borderColor: '#D7BF5A', backgroundColor: '#1A150B' },
                    is3 && { borderColor: '#BFBFBF' },
                ]}
            >
                <View style={styles.rankBadge}>
                    <Text style={styles.rankBadgeText}>{rank}</Text>
                </View>
                <View style={styles.topCenter}>
                    <Image source={{ uri: item.avatar }} style={styles.topAvatar} />
                    <Text style={styles.topName} numberOfLines={1}>{item.name}</Text>
                </View>
                <Text style={styles.topValue}>{item.value}</Text>
            </LinearGradient>
        );
    };

    const Row = ({ index, item }) => {
        if (index < 3) return <TopItem index={index} item={item} />;

        return (
            <View style={styles.row}>
                <View style={styles.rowLeft}>
                    <View style={styles.rowIndexCircle}>
                        <Text style={styles.rowIndexText}>{index + 1}</Text>
                    </View>
                    <Image source={{ uri: item.avatar }} style={styles.rowAvatar} />
                    <Text style={styles.rowName}>{item.name}</Text>
                </View>
                <Text style={styles.rowValue}>{item.value}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerLogo}>SPLT</Text>
                <View style={{ width: 24 }} />
            </LinearGradient>

            {/* Image + label period tabs */}
            <View style={styles.periodTabs}>
                {PERIODS.map(p => {
                    const active = period === p.key;
                    return (
                        <TouchableOpacity
                            key={p.key}
                            onPress={() => setPeriod(p.key)}
                            style={styles.periodItem}
                            activeOpacity={0.85}
                        >
                            <Image
                                source={active ? p.bigImg : p.smallImg}
                                style={[styles.periodIcon, active && styles.periodIconActive]}
                                resizeMode="contain"
                            />
                            <Text style={[styles.periodText, active && styles.periodTextActive]}>
                                {p.label}
                            </Text>
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
                            <View style={styles.promoZone}>
                                <Ionicons name="caret-down" size={16} color="#FF4A4A" />
                                <Text style={styles.promoText}>Promotion Zone</Text>
                                <Ionicons name="caret-up" size={16} color="#4ADE80" />
                            </View>
                        )}
                        <Row item={item} index={index} />
                    </>
                )}
                contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 16, paddingTop: 8 }}
            />

            {/* Bottom visual nav */}
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
    },
    headerLogo: { color: '#fff', fontWeight: '800', fontSize: 22, letterSpacing: 2 },

    /* ---- segment with images ---- */
    periodTabs: {
        backgroundColor: '#0B0B0B',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#181818',
    },
    periodItem: { alignItems: 'center', paddingHorizontal: 6, paddingVertical: 4 },
    periodIcon: { width: 55, height: 40, opacity: 0.85 },
    periodIconActive: { width: 80, height: 60, opacity: 1 , marginTop:10,},
    periodText: { marginTop: 4, fontSize: 12, color: '#9B9B9B' },
    periodTextActive: { color: '#FFFFFF', fontWeight: '700' },

    // Top 3 cards
    topItem: {
        height: 56,
        borderRadius: 10,
        marginTop: 12,
        paddingHorizontal: 12,
        backgroundColor: '#211A2F',
        borderWidth: 1,
        borderColor: '#5E3CC5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rankBadge: {
        width: 28, height: 28, borderRadius: 6,
        borderWidth: 1, borderColor: '#E8DFA8',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rankBadgeText: { color: '#fff', fontWeight: '800', fontSize: 12 },
    topCenter: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 10 },
    topAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
    topName: { color: '#fff', fontWeight: '600', fontSize: 14 },
    topValue: { color: '#EAEAEA', fontWeight: '700', fontSize: 14 },

    // Promotion zone
    promoZone: {
        height: 28,
        borderRadius: 8,
        marginTop: 14,
        backgroundColor: '#0E0D12',
        borderWidth: 1,
        borderColor: '#4B3A7A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    promoText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },

    // List rows
    row: {
        height: 60,
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 12,
        backgroundColor: '#0F0F12',
        borderWidth: 1,
        borderColor: '#2E2548',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowLeft: { flexDirection: 'row', alignItems: 'center' },
    rowIndexCircle: {
        width: 24, height: 24, borderRadius: 12,
        borderWidth: 2, borderColor: '#7745EA',
        alignItems: 'center', justifyContent: 'center',
        marginRight: 10,
    },
    rowIndexText: { color: '#BCA8FF', fontWeight: '800', fontSize: 12 },
    rowAvatar: { width: 28, height: 28, borderRadius: 14, marginRight: 10 },
    rowName: { color: '#EDEDED', fontSize: 14, fontWeight: '600' },
    rowValue: { color: '#D8D8D8', fontWeight: '700', fontSize: 14 },

    bottomBar: {
        height: 56,
        borderTopColor: '#121212',
        borderTopWidth: 1,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
