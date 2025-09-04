import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function GroupMembersScreen({ navigation }) {
    const [q, setQ] = useState('');
    const [members, setMembers] = useState(() => ([
        { id: '1', name: 'Andy',    role: 'Personal Trainer', avatar: 'https://i.pravatar.cc/100?img=11' },
        { id: '2', name: 'Maria',   role: 'Personal Trainer', avatar: 'https://i.pravatar.cc/100?img=12' },
        { id: '3', name: 'Mariam',  role: 'Personal Trainer', avatar: 'https://i.pravatar.cc/100?img=13' },
        { id: '4', name: 'Adam',    role: 'Personal Trainer', avatar: 'https://i.pravatar.cc/100?img=14' },
        { id: '5', name: 'Ali',     role: 'Personal Trainer', avatar: 'https://i.pravatar.cc/100?img=15' },
        { id: '6', name: 'Candyxx', role: 'Personal Trainer', avatar: 'https://i.pravatar.cc/100?img=16' },
        { id: '7', name: 'Mario',   role: 'Personal Trainer', avatar: 'https://i.pravatar.cc/100?img=17' },
        { id: '8', name: 'Hossam',  role: 'Personal Trainer', avatar: 'https://i.pravatar.cc/100?img=18' },
    ]));

    const filtered = useMemo(
        () => members.filter(m => m.name.toLowerCase().includes(q.trim().toLowerCase())),
        [q, members]
    );

    const remove = (id) => setMembers(prev => prev.filter(m => m.id !== id));

    const Row = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.left}>
                <View style={styles.ring}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                </View>
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.role}>{item.role}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.deleteBtn} onPress={() => remove(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={24} color="#fff" /></TouchableOpacity>
                <Text style={styles.headerLogo}>SPLT</Text>
                <View style={{ width: 24 }} />
            </LinearGradient>

            <View style={styles.searchBox}>
                <Ionicons name="search" size={18} color="#777" />
                <TextInput
                    value={q}
                    onChangeText={setQ}
                    placeholder="Search"
                    placeholderTextColor="#777"
                    style={styles.input}
                />
                <Ionicons name="mic-outline" size={18} color="#777" />
            </View>

            <FlatList
                data={filtered}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => <Row item={item} />}
                contentContainerStyle={{ paddingBottom: 90 }}
            />

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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 },
    headerLogo: { color: '#fff', fontWeight: '800', fontSize: 22, letterSpacing: 2 },

    searchBox: {
        marginHorizontal: 16, marginTop: 12, height: 44, backgroundColor: '#0F0F0F',
        borderWidth: 1, borderColor: '#262626', borderRadius: 10, paddingHorizontal: 12,
        flexDirection: 'row', alignItems: 'center',
    },
    input: { flex: 1, color: '#fff', marginLeft: 8, marginRight: 8 },

    row: {
        height: 70, borderBottomColor: '#0E0E0E', borderBottomWidth: 1,
        paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    left: { flexDirection: 'row', alignItems: 'center' },
    ring: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#7C3AED', marginRight: 12, overflow: 'hidden' },
    avatar: { width: '100%', height: '100%' },
    name: { color: '#fff', fontWeight: '600', fontSize: 15 },
    role: { color: '#8A8A8A', fontSize: 12, marginTop: 2 },

    deleteBtn: { borderRadius: 6, paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#B91C1C' },
    deleteText: { color: '#fff', fontWeight: '700', fontSize: 12 },

    bottomBar: { height: 56, borderTopColor: '#121212', borderTopWidth: 1, backgroundColor: '#000', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
});
