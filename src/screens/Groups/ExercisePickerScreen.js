// screens/Groups/ExercisePickerScreen.js
import React, { useMemo, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";

const TABS = ['All Muscles', 'All Equipment', 'Sort By'];

export default function ExercisePickerScreen({ navigation, route }) {
    const [active, setActive] = useState('All Muscles');
    const [q, setQ] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const exercises = useMemo(
        () =>
            Array.from({ length: 12 }).map((_, i) => ({
                id: String(i + 1),
                name: 'Ab-Scissors',
                muscle: 'Abs',
                thumb: 'https://i.pravatar.cc/200?img=12',
            })),
        []
    );

    const filtered = exercises.filter((e) =>
        e.name.toLowerCase().includes(q.trim().toLowerCase())
    );

    const pick = () => {
        const ex = exercises.find((e) => e.id === selectedId);
        if (!ex) return;
        // Option A: set params then goBack
        navigation.navigate({
            name: 'GroupChallengeCreate',
            params: { pickedExercise: ex },
            merge: true,
        });
    };

    const Row = ({ item }) => {
        const selected = selectedId === item.id;
        return (
            <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                style={styles.row}
                activeOpacity={0.85}
            >
                <View style={styles.thumbRing}>
                    <Image source={{ uri: item.thumb }} style={styles.thumb} />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.rowTitle}>{item.name}</Text>
                    <Text style={styles.rowSub}>{item.muscle}</Text>
                </View>

                <View style={[styles.checkbox, selected && styles.checkboxActive]}>
                    {selected && <Ionicons name="checkmark" size={14} color="#1A1A1A" />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerLogo}>SPLT</Text>
                <View style={{ width: 24 }} />
            </LinearGradient>

            <View style={styles.orContainer}>
                <LinearGradient
                    colors={COLORS.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.line}
                />
                <Text style={[theme.textStyles.small, styles.or]}>Group Challange</Text>
                <LinearGradient
                    colors={COLORS.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.line}
                />
            </View>

            {/* search */}
            <View style={styles.searchWrap}>
                <Ionicons name="search" size={18} color="#777" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#777"
                    value={q}
                    onChangeText={setQ}
                    style={styles.searchInput}
                />
            </View>

            {/* chips */}
            <View style={styles.tabRow}>
                {TABS.map((t) => (
                    <TouchableOpacity
                        key={t}
                        onPress={() => setActive(t)}
                        style={[styles.chip, active === t && styles.chipActive]}
                    >
                        <Text style={[styles.chipText, active === t && styles.chipTextActive]}>{t}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filtered}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => <Row item={item} />}
                contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 16, paddingTop: 6 }}
            />

            {/* bottom done */}
            <TouchableOpacity
                style={[styles.bottomDone, !selectedId && { opacity: 0.45 }]}
                activeOpacity={selectedId ? 0.85 : 1}
                onPress={pick}
            >
                <Text style={styles.bottomDoneText}>Done</Text>
            </TouchableOpacity>

            {/* bottom nav (visual) */}
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
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        paddingHorizontal: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.borderColor,
    },
    or: {
        marginHorizontal: 10,
        color: theme.colors.text,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
    },
    headerLogo: { color: '#fff', fontWeight: '800', fontSize: 22, letterSpacing: 2 },

    titleWrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, backgroundColor: '#0B0B0B' },
    title: { color: '#fff', fontWeight: '700', fontSize: 16 },

    searchWrap: {
        marginHorizontal: 16,
        marginTop: 10,
        height: 44,
        backgroundColor: '#0F0F0F',
        borderColor: '#262626',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: { flex: 1, color: '#fff', marginLeft: 8 },

    tabRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 10 , marginBottom: 10,},
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2B2440',
        backgroundColor: '#0F0F0F',
    },
    chipActive: { backgroundColor: '#222' },
    chipText: { color: '#8F8F8F', fontSize: 12 },
    chipTextActive: { color: '#fff', fontWeight: '700' },

    row: {
        height: 64,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2440',
        backgroundColor: '#0F0F12',
        marginTop: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumbRing: {
        width: 40, height: 40, borderRadius: 10, overflow: 'hidden',
        borderWidth: 1, borderColor: '#6F56E9', marginRight: 12,
    },
    thumb: { width: '100%', height: '100%' },
    rowTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
    rowSub: { color: '#8A8A8A', fontSize: 12, marginTop: 2 },

    checkbox: {
        width: 20, height: 20, borderRadius: 4,
        borderWidth: 1, borderColor: '#6F56E9',
        alignItems: 'center', justifyContent: 'center',
    },
    checkboxActive: { backgroundColor: '#6F56E9' },

    bottomDone: {
        marginHorizontal: 16,
        height: 46,
        borderRadius: 10,
        backgroundColor: '#5B44C8',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    bottomDoneText: { color: '#fff', fontWeight: '700' },

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
