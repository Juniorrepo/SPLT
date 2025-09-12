import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
} from "react-native";
import COLORS from "../../constants/Colors";

const MONTHS = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
];

export default function MonthDropdown({
                                          visible,
                                          selectedMonth = new Date().getMonth(), // 0-11
                                          onSelect,
                                          onClose,
                                          // Position of the popover panel (relative to the screen)
                                          anchorStyle = { top: 140, right: 20 },
                                      }) {
    const BORDER = COLORS.border || "rgba(255,255,255,0.10)";
    const CARD_BG = COLORS.background || "rgba(0,0,0,0.85)";
    const SUBTLE = COLORS.subText || "rgba(255,255,255,0.75)";

    return (
        <Modal visible={visible} transparent animationType="fade">
            {/* Backdrop */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            {/* Popover */}
            <View style={[styles.popover, anchorStyle, { borderColor: BORDER, backgroundColor: CARD_BG }]}>
                <Text style={[styles.header, { color: SUBTLE }]}>Select month</Text>

                <View style={styles.grid}>
                    {MONTHS.map((m, i) => {
                        const isActive = i === selectedMonth;
                        return (
                            <TouchableOpacity
                                key={m}
                                style={[
                                    styles.item,
                                    isActive && {
                                        backgroundColor: "rgba(123,87,242,0.22)",
                                        borderColor: "rgba(123,87,242,0.7)",
                                    },
                                ]}
                                activeOpacity={0.85}
                                onPress={() => {
                                    onSelect?.(i);
                                    onClose?.();
                                }}
                            >
                                <Text
                                    style={[
                                        styles.itemText,
                                        isActive && { color: COLORS.text },
                                    ]}
                                >
                                    {m}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    popover: {
        position: "absolute",
        width: 260,
        borderRadius: 12,
        opacity:1,
        borderWidth: 1,
        padding: 12,
    },
    header: {
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 8,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    item: {
        width: "31%",
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
    },
    itemText: {
        color: "rgba(255,255,255,0.85)",
        fontWeight: "800",
        fontSize: 13,
    },
});
