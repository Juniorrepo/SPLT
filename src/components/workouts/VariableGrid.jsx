// VariableGrid.tsx (or FixedDynamicGrid.tsx)
import React, {useMemo} from "react";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    ImageSourcePropType,
    View,
} from "react-native";

type Item = { id: string; title: string; image: ImageSourcePropType };

type Props = {
    data: Item[];
    onPressItem?: (item: Item) => void;
    pad?: number;         // outer left/right padding
    gap?: number;         // gap between tiles
    imageHeight?: number;
};

const {width: SCREEN_W} = Dimensions.get("window");

const COLORS = {
    surface: "#171120",
    stroke: "#2B2340",
    text: "#F2F1F6",
};

export default function VariableGrid({
                                         data,
                                         onPressItem,
                                         pad = 20,
                                         gap = 12,
                                         imageHeight = 140,
                                     }: Props) {
    const numColumns = data.length === 2 ? 2 : data.length >= 3 ? 3 : 1;
    const listKey = useMemo(() => `grid-${numColumns}`, [numColumns]);

    const totalWidth = SCREEN_W - pad * 2;
    const itemWidth = (totalWidth - gap * (numColumns - 1)) / numColumns;

    return (
        <View style={{paddingHorizontal: pad, paddingTop: 5, paddingBottom: pad}}>
            <FlatList
                key={listKey}
                data={data}
                numColumns={numColumns}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                columnWrapperStyle={numColumns > 1 ? {justifyContent: "flex-start"} : undefined}
                renderItem={({item, index}) => {
                    const col = index % numColumns;
                    const isLastRow =
                        index >= data.length - (data.length % numColumns || numColumns);

                    return (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => onPressItem?.(item)}
                            style={{
                                width: itemWidth,
                                marginLeft: col === 0 ? 0 : gap,
                                marginBottom: isLastRow ? 0 : gap,
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                source={item.image}
                                style={{
                                    width: itemWidth,
                                    height: numColumns === 2 ? imageHeight + 50 : imageHeight,
                                    borderRadius: 12,
                                    resizeMode: "cover",
                                    backgroundColor: "#1D1A22",
                                }}
                            />
                            <Text
                                numberOfLines={2}
                                style={{
                                    color: COLORS.text,
                                    fontSize: 14,
                                    textAlign: "center",
                                    paddingVertical: 8,
                                    paddingHorizontal: 8,
                                }}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}
