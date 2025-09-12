import React, {useMemo} from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Pressable,
    ScrollView,
    Dimensions,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/Colors";
import {LineChart} from "react-native-chart-kit";
import TopBar from "../common/TopBar";
import {LinearGradient} from "expo-linear-gradient";

const SCREEN_W = Dimensions.get("window").width;

const pictures = [
    {id: "1", uri: require("../../assets/images/home/user4.png"), date: "15 Oct 2023"},
    {id: "2", uri: require("../../assets/images/home/user1.png"), date: "15 Oct 2023"},
    {id: "3", uri: require("../../assets/images/home/user4.png"), date: "15 Oct 2023"},
    {id: "4", uri: require("../../assets/images/home/user1.png"), date: "15 Oct 2023"},
];

const rawData = [
    {day: "Tue", value: 25},
    {day: "Wed", value: 55},
    {day: "Thu", value: 30},
    {day: "Fri", value: 65},
    {day: "Sat", value: 80},
    {day: "Sun", value: 70},
    {day: "Mon", value: 89},
];

const ProgressScreen = ({navigation}) => {
    const labels = useMemo(() => rawData.map(d => d.day), []);
    const values = useMemo(() => rawData.map(d => d.value), []);
    const CHART_W = SCREEN_W - 32;
    return (
        <SafeAreaView style={styles.safe}>
            <TopBar variant="measurments" onBackPress={() => navigation.goBack()}/>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Progress Pictures */}
                <View style={styles.headerRow}>
                    <Text style={styles.sectionTitle}>Progress Pictures</Text>
                    <LinearGradient
                        colors={["#B57FE6", "#6645AB"]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.addBtn}
                    >
                        <Pressable style={{flexDirection: "row"}}
                                   onPress={() => navigation.navigate("ProgressPicturesScreen")}>
                            <Ionicons name="add" size={16} color="#fff"/>
                            <Text style={styles.addBtnText}>Add measurement</Text>
                        </Pressable>
                    </LinearGradient>
                </View>

                <FlatList
                    data={pictures}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <View style={styles.picWrap}>
                            <Image source={item.uri} style={styles.pic}/>
                            <View style={styles.picOverlay}>
                                <Text style={styles.picDate}>{item.date}</Text>
                            </View>
                        </View>
                    )}
                />
                <Pressable style={{alignSelf: "flex-end", marginTop: 4, marginBottom: 4}}>
                    <Text style={styles.viewAll}>View All</Text>
                </Pressable>

                <View style={styles.dropdownRow}>
                    <LinearGradient
                        colors={["#B57FE6", "#6645AB"]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.dropdown}
                    >
                        <Pressable style={{flexDirection: "row"}}>
                            <Text style={styles.dropdownText}>Body weight</Text>
                            <Ionicons name="chevron-down" size={16} color="#fff"/>
                        </Pressable>
                    </LinearGradient>
                    <LinearGradient
                        colors={["#B57FE6", "#6645AB"]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.dropdown}
                    >
                        <Pressable style={{flexDirection: "row"}}>
                            <Text style={styles.dropdownText}>This Month</Text>
                            <Ionicons name="chevron-down" size={16} color="#fff"/>
                        </Pressable>
                    </LinearGradient>
                </View>

                <View style={{marginTop: 12, marginBottom: 4}}>
                    <LineChart
                        data={{
                            labels,
                            datasets: [{data: values, color: () => "#9b6eff", strokeWidth: 2.5}],
                            legend: [],
                        }}
                        width={CHART_W}
                        height={220}
                        withDots={true}
                        withShadow={false}
                        withInnerLines={true}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={true}
                        yAxisInterval={1}
                        bezier
                        chartConfig={{
                            backgroundGradientFrom: COLORS.background,
                            backgroundGradientTo: COLORS.background,
                            decimalPlaces: 0,
                            color: (o) => `rgba(203, 200, 255, ${o ?? 1})`,
                            labelColor: (o) => `rgba(203, 200, 255, ${o ?? 1})`,
                            propsForBackgroundLines: {
                                strokeDasharray: "",
                                stroke: "rgba(110, 86, 205, 0.35)",
                                strokeWidth: 1,
                            },
                            propsForLabels: {fontSize: 15},
                            propsForDots: {r: "0"},
                        }}
                        style={styles.chart}
                        formatYLabel={(y) => `${y}`}
                        renderDotContent={({x, y, index, indexData}) => {
                            const lastIndex = values.length - 1;
                            if (index !== lastIndex) return null;

                            const px = typeof x === "function" ? x(index) : Number(x);
                            const py = typeof y === "function" ? y(indexData) : Number(y);

                            const bubbleW = 64, bubbleH = 26;
                            const left = Math.min(Math.max(px - bubbleW / 2, 6), CHART_W - bubbleW - 6);
                            const top = Math.max(py - 36, 8);

                            return (
                                <React.Fragment key={`dot-${index}`}>
                                    <View
                                        key={`bbl-${index}`}
                                        style={{
                                            position: "absolute",
                                            left, top,
                                            width: bubbleW, height: bubbleH, borderRadius: 6,
                                            backgroundColor: COLORS.secondary,
                                            alignItems: "center", justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{color: "#fff", fontWeight: "700", fontSize: 12}}>
                                            {`${indexData} KG`}
                                        </Text>
                                    </View>
                                </React.Fragment>
                            );
                        }}
                    />
                </View>

                <View style={{flexDirection: "row", alignItems: "center", marginTop: 6}}>
                    <View style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: COLORS.primary,
                        marginRight: 8
                    }}/>
                    <Text style={{color: "#FFFFFF"}}>This Month</Text>
                </View>

                <View style={{marginTop: 16}}>
                    <Text style={[styles.sectionTitle, {marginBottom: 12, fontSize: 20}]}>Weight History</Text>
                    {[1, 2, 3, 4].map((i) => (
                        <View key={i} style={styles.historyRow}>
                            <Text style={styles.historyDate}>12 Oct 2024</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Ionicons name="camera-outline" size={18} color="white"/>
                                <Text style={styles.historyWeight}>50 KG</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: COLORS.background},
    container: {padding: 16},

    headerRow: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16},
    sectionTitle: {color: "#fff", fontSize: 19, fontWeight: "400"},

    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8
    },
    addBtnText: {color: "#fff", marginLeft: 4, fontWeight: "600"},

    picWrap: {marginRight: 8, overflow: "hidden", marginBottom: 10},
    pic: {width: 120, height: 130, borderRadius: 10},
    picOverlay: {
        position: "absolute",
        bottom: 0,
        borderRadius: 4,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingVertical: 8,
        alignItems: "center"
    },
    picDate: {color: "#fff", fontSize: 13},

    viewAll: {color: "#FFFFFF", fontSize: 14, fontWeight: "400", textDecorationLine: "underline"},

    dropdownRow: {flexDirection: "row", justifyContent: "space-between", marginTop: 12},
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3a2f75",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6
    },
    dropdownText: {color: "#fff", marginRight: 6},

    chart: {marginTop: 4, borderRadius: 12},

    historyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 0.6,
        paddingVertical: 12
    },
    historyDate: {color: "#fff", fontSize: 15},
    historyWeight: {color: "#fff", marginLeft: 6, fontSize: 15, marginRight: 5, paddingRight: 10},
});

export default ProgressScreen;
