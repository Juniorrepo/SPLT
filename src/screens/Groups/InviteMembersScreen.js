import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TABS = ['Followers', 'Following', 'Public'];

export default function InviteMembersScreen({ navigation, onNext }) {
    const [activeTab, setActiveTab] = useState('Followers');
    const [query, setQuery] = useState('');

    const members = useMemo(
        () => [
            { id: '1', name: 'Andy', role: 'Personal Trainer', avatar: require('../../assets/images/home/user1.png'), status: 'invite' },
            { id: '2', name: 'Maria', role: 'Personal Trainer', avatar: require('../../assets/images/home/user2.png'), status: 'invited' },
            { id: '3', name: 'Mariam', role: 'Personal Trainer', avatar: require('../../assets/images/home/user3.png'), status: 'invite' },
            { id: '4', name: 'Adam', role: 'Personal Trainer', avatar: require('../../assets/images/home/user4.png'), status: 'invite' },
            { id: '5', name: 'Ali', role: 'Personal Trainer', avatar: require('../../assets/images/home/user5.png'), status: 'joined' },
            { id: '6', name: 'Candyxx', role: 'Personal Trainer', status: 'invited' },
            { id: '7', name: 'Mario', role: 'Personal Trainer', status: 'invite' },
            { id: '8', name: 'Hossam', role: 'Personal Trainer', status: 'invite' },
        ],
        []
    );

    const filtered = members.filter(m => m.name.toLowerCase().includes(query.trim().toLowerCase()));

    const renderRow = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.avatarRing}>
                {item.avatar ? (
                    <Image source={item.avatar} style={styles.avatar} />
                ) : (
                    <Ionicons name="person-outline" size={18} color="#C6B5F5" />
                )}
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.rowName}>{item.name}</Text>
                <Text style={styles.rowSub}>Personal Trainer</Text>
            </View>

            {item.status === 'invite' && (
                <TouchableOpacity style={styles.inviteBtn}>
                    <Text style={styles.inviteBtnText}>Invite</Text>
                </TouchableOpacity>
            )}
            {item.status === 'invited' && (
                <View style={styles.badgeMuted}>
                    <Text style={styles.badgeMutedText}>Invited</Text>
                </View>
            )}
            {item.status === 'joined' && (
                <View style={styles.badgeMuted}>
                    <Text style={styles.badgeMutedText}>Joined</Text>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack?.()}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.headerLogo}>SPLT</Text>

                <TouchableOpacity onPress={() => onNext?.([])}>
                    <Text style={styles.headerAction}>Next</Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* Tabs */}
            <View style={styles.tabs}>
                {TABS.map(t => (
                    <TouchableOpacity
                        key={t}
                        onPress={() => setActiveTab(t)}
                        style={[styles.tabItem, activeTab === t && styles.tabItemActive]}
                    >
                        <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Search */}
            <View style={styles.searchWrap}>
                <Ionicons name="search" size={18} color="#777" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#777"
                    value={query}
                    onChangeText={setQuery}
                    style={styles.searchInput}
                />
                <Ionicons name="mic-outline" size={18} color="#777" />
            </View>

            {/* List */}
            <FlatList
                data={filtered}
                keyExtractor={i => i.id}
                renderItem={renderRow}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* Bottom nav bar (visual only, to match Figma) */}
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
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'space-between',
    },
    headerLogo: { color: '#FFF', fontWeight: '800', fontSize: 22, letterSpacing: 2 },
    headerAction: { color: '#FFF', fontSize: 16, fontWeight: '600' },

    tabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 8,
        borderBottomColor: '#1D1D1D',
        borderBottomWidth: 1,
    },
    tabItem: { paddingVertical: 10, marginRight: 18 },
    tabItemActive: { borderBottomWidth: 2, borderBottomColor: '#FFF' },
    tabText: { color: '#A0A0A0', fontSize: 14 },
    tabTextActive: { color: '#FFF', fontWeight: '700' },

    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        backgroundColor: '#0F0F0F',
        borderWidth: 1,
        borderColor: '#262626',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
    searchInput: { flex: 1, color: '#FFF', marginLeft: 8, marginRight: 8 },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 70,
        borderBottomColor: '#0E0E0E',
        borderBottomWidth: 1,
    },
    avatarRing: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#7C3AED',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatar: { width: '100%', height: '100%' },
    rowName: { color: '#FFF', fontWeight: '600', fontSize: 15 },
    rowSub: { color: '#8A8A8A', fontSize: 12, marginTop: 2 },

    inviteBtn: {
        borderRadius: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        borderColor: '#363636',
    },
    inviteBtnText: { color: '#CFCFCF', fontWeight: '600', fontSize: 12 },
    badgeMuted: {
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#0F0F0F',
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    badgeMutedText: { color: '#8C8C8C', fontWeight: '600', fontSize: 12 },

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
