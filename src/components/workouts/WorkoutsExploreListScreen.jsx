import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TopBar from "../common/TopBar";
import Carousel from "./Carousel";
import VariableGrid from "./VariableGrid";

const COLORS = {
    bg: "#0E0A14",
    surface: "#171120",
    surfaceAlt: "#1E1729",
    stroke: "#2B2340",
    text: "#F2F1F6",
    textDim: "#CFCBDA",
    textMuted: "#9C95AD",
    purple: "#7B57F2",
};
const PAD = 20;

const IMAGE_SOURCE =
    { uri: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200" };

const makeArray = (n: number, prefix: string, title = "Pro Split") =>
    new Array(n).fill(0).map((_, i) => ({
        id: `${prefix}${i}`,
        title,
        image: IMAGE_SOURCE,
    }));

const HERO_PROGRAMS = [
    { id: "h1", title: "Splt’s 3 Days Full Body Workout Program", author: "SPLT", image: IMAGE_SOURCE },
    { id: "h2", title: "12-Week Fat Destroyer", author: "SPLT", image: IMAGE_SOURCE },
    { id: "h3", title: "Pro Split: Strength & Tone", author: "SPLT", image: IMAGE_SOURCE },
];

const BIG_CARDS = makeArray(8, "b");
const ICON_TILES = makeArray(2, "i");

const COACHES = [
    { id: "c1", name: "Nehal Ahmed",  avatar: IMAGE_SOURCE },
    { id: "c2", name: "Ali Salem",    avatar: IMAGE_SOURCE },
    { id: "c3", name: "Muhamed",      avatar: IMAGE_SOURCE },
    { id: "c4", name: "Ahmed",        avatar: IMAGE_SOURCE },
];

/* ----------------- SCREEN ----------------- */
export default function WorkoutsExplore({ navigation, openDrawer }) {
    const [query, setQuery] = useState("");

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <TopBar
                variant="workouts"
                onSearch={() => {}}
                onNotificationPress={() => {}}
                onMenuPress={openDrawer}
            />

            <FlatList
                data={[]}
                keyExtractor={() => "x"}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 28, paddingTop: 10 }}
                ListHeaderComponent={
                    <>
                        {/* Search */}
                        <View style={{ paddingHorizontal: PAD, paddingTop: 8 }}>
                            <SearchBar
                                value={query}
                                onChange={setQuery}
                                placeholder="Search for programs"
                            />
                        </View>

                        <Carousel
                            items={HERO_PROGRAMS}
                            cardSize={260}
                            onPressItem={(item) =>
                                navigation.navigate("ProgramDetails", { program: item })
                            }
                        />

                        <View style={{ paddingHorizontal: PAD }}>
                            <Text style={styles.greeting}>Good Morning, Honen</Text>
                        </View>

                        <Section
                            title="Exercises for you"
                            onPressRight={() => {}}
                        />
                        <VariableGrid
                            data={ICON_TILES}
                            onBack={() => navigation.goBack()}
                            onPressItem={(item) => navigation.navigate("ProgramDetails", { program: item })}
                        />

                        <Section
                            title="Exercises for you"
                            onPressRight={() => {}}
                        />

                        <VariableGrid
                            data={BIG_CARDS}
                            onPressItem={(item) => console.log("Pressed:", item.id)}
                        />

                        <Section
                            title="Coaches Program"
                            onPressRight={() => {}}
                        />

                        <VariableGrid
                            data={ICON_TILES}
                            onPressItem={(item) => console.log("Pressed:", item.id)}
                        />

                        <Section
                            title="New Coaches"
                            right="View all"
                            onPressRight={() => {}}
                            data={COACHES}
                            contentContainerStyle={{ paddingHorizontal: PAD, gap: 14 }}
                            renderItem={({ item }) => <Coach item={item} />}
                        />

                        <Section
                            title="Popular Workouts"
                            onPressRight={() => {}}
                        />

                        <VariableGrid
                            data={ICON_TILES}
                            onPressItem={(item) => console.log("Pressed:", item.id)}
                        />
                    </>
                }
                renderItem={null}
            />
        </View>
    );
}

/* ----------------- COMPONENTS ----------------- */
function SearchBar({ value, onChange, placeholder }) {
    return (
        <View style={styles.search}>
            <Ionicons name="search" size={18} color={COLORS.textMuted} />
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textMuted}
                style={styles.searchInput}
            />
        </View>
    );
}

function Section({
                     title,
                     right = "View All",
                     onPressRight,
                     data,
                     renderItem,
                     contentContainerStyle,
                 }) {
    return (
        <>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity style={styles.rightLink} onPress={onPressRight}>
                    <Text style={styles.rightLinkText}>{right}</Text>
                    <Ionicons name="chevron-forward" size={16} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(i) => i.id}
                data={data}
                contentContainerStyle={[
                    { paddingHorizontal: PAD, gap: 12 },
                    contentContainerStyle,
                ]}
                renderItem={renderItem}
            />
        </>
    );
}

function Coach({ item }) {
    return (
        <View style={{ alignItems: "center", paddingHorizontal: 2, }}>
            <Image source={item.avatar} style={styles.coachAvatar} />
            <Text style={styles.coachName} numberOfLines={1}>
                {item.name}
            </Text>
        </View>
    );
}

/* ----------------- STYLES ----------------- */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg },

    search: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        height: 44,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: COLORS.stroke,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    searchInput: { flex: 1, color: COLORS.text, paddingVertical: 0 },

    greeting: {
        color: COLORS.text,
        fontWeight: "480",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 6,
    },

    sectionHeader: {
        paddingHorizontal: PAD,
        marginTop: 10,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: "400" },
    rightLink: { flexDirection: "row", alignItems: "center", gap: 4 },
    rightLinkText: { color: COLORS.text, opacity: 0.9 },

    bigCard: {
        width: 180,
        overflow: "hidden",
    },
    bigCardImg: {
        width: "100%",
        height: 160,
        borderRadius: 12,
        backgroundColor: "#1D1A22",
    },
    bigCardLabel: {
        color: COLORS.text,
        textAlign: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    iconTile: {
        width: 110,
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.stroke,
        overflow: "hidden",
    },
    iconTileImg: { width: "100%", height: 110, backgroundColor: "#1D1A22" },
    iconTileLabel: {
        color: COLORS.text,
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 8,
    },

    coachAvatar: {
        width: 110,
        height: 110,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: COLORS.stroke,
    },
    coachName: {
        color: COLORS.text,
        marginTop: 6,
        width: 86,
        textAlign: "center",
    },
});
