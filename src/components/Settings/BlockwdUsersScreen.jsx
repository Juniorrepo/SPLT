import React, {useMemo, useState} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    TextInput,
    Alert,
    Image,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/Colors";
import TopBar from "../common/TopBar";

const THEME = {
    background: COLORS?.background ?? "#0E0E12",
    text: COLORS?.text ?? "#FFFFFF",
    muted: COLORS?.muted ?? "#B4B8C2",
    card: COLORS?.card ?? "#101119",
    gradient: COLORS?.gradient ?? ["#B57FE6", "#6645AB"],
};

const BORDER = 1;

const GradientOutline = ({radius = 10, style, children}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={[{borderRadius: radius, padding: BORDER}, style]}>
        <View style={{borderRadius: radius - BORDER, backgroundColor: THEME.background, overflow: "hidden"}}>
            {children}
        </View>
    </LinearGradient>
);

const Avatar = ({uri, size = 40}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={{width: size, height: size, borderRadius: size / 2, padding: 2}}>
        <View style={{flex: 1, borderRadius: (size - 4) / 2, overflow: "hidden", backgroundColor: "#151726"}}>
            <Image source={uri} style={{width: "100%", height: "100%"}} resizeMode="cover"/>
        </View>
    </LinearGradient>
);

const OutlinePill = ({onPress, children}) => (
    <LinearGradient colors={THEME.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    style={{borderRadius: 8, padding: 1}}>
        <Pressable onPress={onPress} style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: THEME.card
        }}>
            <Text style={{color: "#fff", fontSize: 12, fontWeight: "600"}}>{children}</Text>
        </Pressable>
    </LinearGradient>
);

const seedUsers = [
    {id: "1", name: "Andy", avatar: {uri: "https://i.pravatar.cc/100?img=11"}},
    {id: "2", name: "NatlieB", avatar: {uri: "https://i.pravatar.cc/100?img=12"}},
    {id: "3", name: "Ranaa", avatar: {uri: "https://i.pravatar.cc/100?img=13"}},
    {id: "4", name: "Samyxxx", avatar: {uri: "https://i.pravatar.cc/100?img=14"}},
    {id: "5", name: "Chris", avatar: {uri: "https://i.pravatar.cc/100?img=15"}},
    {id: "6", name: "Muh_", avatar: {uri: "https://i.pravatar.cc/100?img=16"}},
    {id: "7", name: "Antonie", avatar: {uri: "https://i.pravatar.cc/100?img=17"}},
    {id: "8", name: "Jana", avatar: {uri: "https://i.pravatar.cc/100?img=18"}},
];

const wait = (ms = 500) => new Promise(r => setTimeout(r, ms));

async function apiUnblock(userId) {
    await wait();
    return {ok: true};
}

const BlockedRow = ({user, onUnblock}) => (
    <View style={styles.row}>
        <View style={styles.left}>
            <Avatar uri={user.avatar}/>
            <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
        </View>
        <OutlinePill onPress={() => onUnblock(user)}>Unblock</OutlinePill>
    </View>
);

export default function BlockedUsersScreen({navigation}) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState(seedUsers);
    const [busyId, setBusyId] = useState(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return users;
        return users.filter(u => u.name.toLowerCase().includes(q));
    }, [query, users]);

    const handleUnblock = (user) => {
        Alert.alert("Unblock user", `Unblock ${user.name}?`, [
            {text: "Cancel", style: "cancel"},
            {
                text: "Unblock", style: "destructive", onPress: async () => {
                    setBusyId(user.id);
                    const res = await apiUnblock(user.id);
                    setBusyId(null);
                    if (res.ok) setUsers(prev => prev.filter(u => u.id !== user.id));
                }
            }
        ]);
    };

    return (
        <SafeAreaView style={[styles.safe, {backgroundColor: THEME.background}]}>
            <TopBar variant="setting" onBackPress={() => navigation?.goBack?.()}/>

            <View style={styles.container}>
                {/* Search */}
                <GradientOutline radius={10} style={{marginBottom: 10}}>
                    <View style={styles.searchRow}>
                        <Ionicons name="search" size={16} color="#c8c6ff"/>
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search"
                            placeholderTextColor="#7d81a2"
                            style={styles.searchInput}
                        />
                        {query.length > 0 && (
                            <Pressable onPress={() => setQuery("")} hitSlop={10}>
                                <Ionicons name="close" size={18} color="#9aa0ad"/>
                            </Pressable>
                        )}
                    </View>
                </GradientOutline>

                {/* List */}
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <BlockedRow
                            user={item}
                            onUnblock={busyId ? () => {
                            } : handleUnblock}
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.empty}>No blocked users{query ? " match your search" : ""}.</Text>
                    }
                    contentContainerStyle={{paddingBottom: 24}}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    container: {flex: 1, padding: 16},

    searchRow: {
        minHeight: 44,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    searchInput: {flex: 1, color: "#fff", fontSize: 14, paddingVertical: 10},

    row: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    left: {flexDirection: "row", alignItems: "center", gap: 12, flex: 1, paddingRight: 8},
    name: {color: "#fff", fontSize: 16, flexShrink: 1},

    separator: {height: StyleSheet.hairlineWidth, backgroundColor: "rgba(110,86,205,0.35)"},

    empty: {color: THEME.muted, textAlign: "center", marginTop: 24},
});
