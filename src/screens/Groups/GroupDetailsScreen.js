import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function GroupDetailsScreen({ navigation, route }) {
    const group = route?.params?.group ?? {
        name: 'Group_1',
        description: 'This is group description',
        avatar: { uri: 'https://i.pravatar.cc/200?img=12' },
        requestsCount: 8,
    };

    const NavItem = ({ icon, label, onPress }) => (
        <TouchableOpacity style={styles.navItem} onPress={onPress}>
            <Ionicons name={icon} size={18} color="#C9C9C9" />
            <Text style={styles.navLabel}>{label}</Text>
        </TouchableOpacity>
    );

    const StatCard = ({ label, icon, onPress, tint = 'purple' }) => (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <LinearGradient
                colors={tint === 'purple' ? ['#5E3CC5', '#2B2345'] : ['#17161C', '#17161C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardInner}
            >
                <View style={styles.cardLeft}>
                    <Ionicons name={icon} size={20} color="#E7DAFF" />
                    <Text style={styles.cardLabel}>{label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#DDD" />
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerLogo}>SPLT</Text>
                <TouchableOpacity onPress={() => navigation.navigate('GroupRequests')}>
                    <Text style={styles.headerAction}>Next</Text>
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                {/* group header */}
                <View style={styles.groupHeader}>
                    <Image source={group.avatar} style={styles.avatar} />
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={styles.groupName}>{group.name}</Text>
                        <Text style={styles.groupDesc}>{group.description}</Text>
                        <TouchableOpacity>
                            <Text style={styles.editText}>Edit Group Details</Text>
                        </TouchableOpacity>
                    </View>

                    {/* small circle accent */}
                    <View style={styles.tinyRing} />
                </View>

                {/* quick actions row */}
                <View style={styles.rowActions}>
                    <NavItem icon="add-circle-outline" label="Challenge" onPress={() => navigation.navigate('GroupChallengeCreate')} />
                    <NavItem icon="person-add-outline" label="Invite" onPress={() => navigation.navigate('InviteMembers')} />
                    <NavItem icon="people-outline" label="Members" onPress={() => {}} />
                    <NavItem icon="settings-outline" label="Settings" onPress={() => {}} />
                    <NavItem icon="share-social-outline" label="Share" onPress={() => {}} />
                    <NavItem icon="exit-outline" label="Leave" onPress={() => {}} />
                </View>

                {/* cards list */}
                <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                    <StatCard
                        label={`Requests ( ${group.requestsCount} )`}
                        icon="mail-unread-outline"
                        onPress={() => navigation.navigate('GroupRequests')}
                    />

                    <StatCard
                        label="Live Challenges"
                        icon="flame-outline"
                        onPress={() => {}}
                        tint="dark"
                    />

                    <StatCard
                        label="Group Challenges"
                        icon="people-circle-outline"
                        onPress={() => navigation.navigate('GroupChallenges')}
                    />

                    <StatCard
                        label="TOP VOLUME LIFTED"
                        icon="barbell-outline"
                        onPress={() => navigation.navigate('GroupTopVolume')}
                    />

                    <StatCard
                        label="LONGEST WORKOUT SESSION"
                        icon="time-outline"
                        onPress={() => navigation.navigate('GroupLongestSession')}
                    />

                    <StatCard
                        label="HIGHEST PERSONAL RECORD"
                        icon="trophy-outline"
                        onPress={() => navigation.navigate('GroupHighestSession')}
                    />
                </View>
            </ScrollView>

            {/* bottom nav visual (like figma) */}
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

const AVATAR = 86;

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
    headerLogo: { color: '#FFF', fontWeight: '800', fontSize: 22, letterSpacing: 2 },
    headerAction: { color: '#FFF', fontWeight: '600', fontSize: 16 },

    groupHeader: {
        alignItems: 'center',
        paddingTop: 18,
        paddingBottom: 8,
        backgroundColor: '#0B0B0B',
    },
    avatar: { width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2 },
    groupName: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 10 },
    groupDesc: { color: '#AFAFAF', fontSize: 12, marginTop: 4 },
    editText: { color: '#C9B8FF', fontSize: 12, marginTop: 4, textDecorationLine: 'underline' },
    tinyRing: {
        position: 'absolute',
        top: AVATAR / 2 - 4,
        left: 26,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#7C3AED',
    },

    rowActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 14,
        backgroundColor: '#0B0B0B',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#151515',
    },
    navItem: { alignItems: 'center' },
    navLabel: { marginTop: 6, color: '#CFCFCF', fontSize: 12, textAlign: 'center' },

    card: { marginBottom: 12 },
    cardInner: {
        height: 64,
        borderRadius: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    cardLabel: { color: '#F2ECFF', fontWeight: '600', fontSize: 14 },

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
