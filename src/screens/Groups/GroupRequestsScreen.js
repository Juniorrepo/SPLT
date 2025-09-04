import React, { useMemo } from 'react';
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

export default function GroupRequestsScreen({ navigation }) {
    const requests = useMemo(
        () => [
            { id: '1', name: 'Andy', role: 'Personal Trainer', avatar: { uri: 'https://i.pravatar.cc/200?img=31' } },
            { id: '2', name: 'Maria', role: 'Personal Trainer', avatar: { uri: 'https://i.pravatar.cc/200?img=32' } },
            { id: '3', name: 'Mariam', role: 'Personal Trainer', avatar: { uri: 'https://i.pravatar.cc/200?img=33' } },
            { id: '4', name: 'Adam', role: 'Personal Trainer', avatar: { uri: 'https://i.pravatar.cc/200?img=34' } },
            { id: '5', name: 'Ali', role: 'Personal Trainer', avatar: { uri: 'https://i.pravatar.cc/200?img=35' } },
            { id: '6', name: 'Candyxx', role: 'Personal Trainer', avatar: { uri: 'https://i.pravatar.cc/200?img=36' } },
            { id: '7', name: 'Mario', role: 'Personal Trainer', avatar: { uri: 'https://i.pravatar.cc/200?img=37' } },
            { id: '8', name: 'Hossam', role: 'Personal Trainer', avatar: { uri: 'https://i.pravatar.cc/200?img=38' } },
        ],
        []
    );

    const Row = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.avatarRing}>
                <Image source={item.avatar} style={styles.avatar} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.rowName}>{item.name}</Text>
                <Text style={styles.rowSub}>{item.role}</Text>
            </View>

            <TouchableOpacity style={styles.acceptBtn} onPress={() => {}}>
                <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectBtn} onPress={() => {}}>
                <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerLogo}>SPLT</Text>
                <View style={{ width: 24 }} />
            </LinearGradient>

            <Text style={styles.title}>Requests</Text>

            <FlatList
                data={requests}
                keyExtractor={(i) => i.id}
                renderItem={Row}
                contentContainerStyle={{ paddingBottom: 24 }}
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'space-between',
    },
    headerLogo: { color: '#FFF', fontWeight: '800', fontSize: 22, letterSpacing: 2 },

    title: { color: '#fff', fontWeight: '700', fontSize: 18, marginTop: 14, marginBottom: 8, paddingHorizontal: 16 },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 76,
        borderBottomColor: '#0E0E0E',
        borderBottomWidth: 1,
    },
    avatarRing: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 2,
        borderColor: '#7C3AED',
        marginRight: 12,
        overflow: 'hidden',
    },
    avatar: { width: '100%', height: '100%' },
    rowName: { color: '#FFF', fontWeight: '600', fontSize: 15 },
    rowSub: { color: '#8A8A8A', fontSize: 12, marginTop: 2 },

    acceptBtn: {
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        borderColor: '#3B3B3B',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    acceptText: { color: '#EDEDED', fontWeight: '600', fontSize: 12 },

    rejectBtn: {
        backgroundColor: '#FF2D2D',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
    },
    rejectText: { color: '#fff', fontWeight: '700', fontSize: 12 },

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
