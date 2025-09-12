import React, {useState, useMemo} from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import PagerView from "react-native-pager-view";

const COLORS = {text: "#F2F1F6", textMuted: "#9C95AD"};
const {width} = Dimensions.get("window");
const src = (img) => (typeof img === "string" ? {uri: img} : img);

export default function Carousel({
                                     items = [],
                                     onPressItem,
                                     cardSize = Math.min(300, width - 72),
                                 }) {
    const [page, setPage] = useState(0);
    const pagerHeight = cardSize + 64;

    if (!items.length) return null;

    return (
        <View style={{marginTop: 8}}>
            <PagerView
                style={{height: pagerHeight, width: "100%"}}
                initialPage={0}
                onPageSelected={(e) => setPage(e.nativeEvent.position)}
            >
                {items.map((item) => (
                    <View key={item.id} style={styles.page}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => onPressItem?.(item)} style={styles.wrap}>
                            <Image source={src(item.image)}
                                   style={[styles.image, {width: cardSize, height: cardSize}]}/>
                            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.author}>By : {item.author ?? "SPLT"}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </PagerView>

            <View style={styles.pageControl}>
                {items.map((_, i) => {
                    const isActive = i === page;
                    return (
                        <View
                            key={i}
                            style={[
                                styles.pcDot,
                                {
                                    width: isActive ? 28 : 6,
                                    backgroundColor: isActive ? "#fff" : "rgba(255,255,255,0.35)"
                                },
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {flex: 1, justifyContent: "center", alignItems: "center"},
    wrap: {alignItems: "center"},
    image: {borderRadius: 12, marginBottom: 10},
    title: {color: COLORS.text, textAlign: "center", fontWeight: "600"},
    author: {color: COLORS.textMuted, textAlign: "center", marginTop: 4},

    pageControl: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 6,
    },
    pcDot: {
        height: 6,
        borderRadius: 3,
        marginHorizontal: 3,
    },
});
