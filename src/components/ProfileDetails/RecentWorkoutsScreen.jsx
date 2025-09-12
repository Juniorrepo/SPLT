import React, {useMemo} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../constants/Colors"; // adjust path if needed

const {width} = Dimensions.get("window");
const PADDING_H = 16;
const GAP = 10;
const NUM_COLUMNS = 3;

const tileSize = Math.floor((width - PADDING_H * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS);

const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

// ---- Mock data (replace with API/state as needed) ----
const WORKOUTS = [
    {
        id: "1",
        title: "LEG DAY",
        date: "2023-08-20",
        image: "https://images.unsplash.com/photo-1534361960057-19889db9621e"
    },
    {
        id: "2",
        title: "BACK DAY",
        date: "2023-08-21",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
    },
    {
        id: "3",
        title: "ARM DAY",
        date: "2023-08-22",
        image: "https://images.unsplash.com/photo-1514996937319-344454492b37"
    },
    {
        id: "4",
        title: "SHOULDER DAY",
        date: "2023-08-23",
        image: "https://images.unsplash.com/photo-1534361960057-19889db9621e"
    },
    {
        id: "5",
        title: "LEG DAY",
        date: "2023-08-24",
        image: "https://images.unsplash.com/photo-1514996937319-344454492b37"
    },
    {
        id: "6",
        title: "BACK DAY",
        date: "2023-08-25",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
    },
    {
        id: "7",
        title: "ARM DAY",
        date: "2023-08-20",
        image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5"
    },
    {
        id: "8",
        title: "SHOULDER DAY",
        date: "2023-08-20",
        image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c"
    },
    {
        id: "9",
        title: "LEG DAY",
        date: "2023-08-20",
        image: "https://images.unsplash.com/photo-1534361960057-19889db9621e"
    },
    {
        id: "10",
        title: "ARM DAY",
        date: "2023-08-22",
        image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5"
    },
    {
        id: "11",
        title: "SHOULDER DAY",
        date: "2023-08-23",
        image: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c"
    },
];

const WorkoutTile = React.memo(({item}) => {
    const day = useMemo(() => new Date(item.date).getDate().toString().padStart(2, "0"), [item.date]);

    return (
        <TouchableOpacity activeOpacity={0.85} style={styles.card}>
            <ImageBackground
                source={{uri: item.image}}
                style={styles.bg}
                imageStyle={styles.bgImage}
                blurRadius={5}
            >
                <LinearGradient colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.55)"]} style={styles.overlay}/>
                <View style={styles.contentCenter}>
                    <Text style={styles.day}>{day}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
});

export default function RecentWorkoutsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Recent Workouts</Text>

            <View style={styles.grid}>
                {WORKOUTS.map((item, index) => (
                    <View
                        key={item.id}
                        style={[
                            styles.cardWrap,
                            (index + 1) % NUM_COLUMNS !== 0 && {marginRight: GAP},
                        ]}
                    >
                        <WorkoutTile item={item}/>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: PADDING_H,
        paddingBottom: 24,
    },
    header: {
        color: COLORS?.text ?? "#FFFFFF",
        fontWeight: "700",
        fontSize: 18,
        marginBottom: 8,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    cardWrap: {
        width: tileSize,
        marginBottom: GAP,
    },

    card: {
        width: "100%",
        height: tileSize * 1.1,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#1b1b1f",
    },
    bg: {flex: 1},
    bgImage: {width: "100%", height: "100%"},
    overlay: {...StyleSheet.absoluteFillObject, borderRadius: 10},
    contentCenter: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 6,
    },
    day: {color: "#fff", fontSize: 36, fontWeight: "800", marginBottom: 2},
    title: {color: "#fff", fontWeight: "800", fontSize: 14, letterSpacing: 0.5},
    date: {color: "#E0E0E0", fontSize: 12, marginTop: 2},
});
