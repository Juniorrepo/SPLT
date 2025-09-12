import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../../constants/Colors";

export default function TopBar(props) {
    const {
        variant = "home",
        onSearch,
        onNotificationPress,
        onMenuPress,
        onBackPress,
        rightText = "Later",
        onRightTextPress,
    } = props;

    const insets = useSafeAreaInsets();

    const renderLeft = () => {
        if (variant === "home") {
            return (
                <TouchableOpacity onPress={onSearch}>
                    <Ionicons name="search" size={24} color={COLORS.text} />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity onPress={onBackPress}>
                <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
        );
    };
    {/* <TopBar variant="backOnly" onBackPress={() => navigation.goBack()} /> */ }
    const renderRight = () => {
        if (variant === "home") {
            return (
                <View style={styles.rightRow}>
                    <TouchableOpacity onPress={onNotificationPress} style={styles.mr16}>
                        <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onMenuPress}>
                        <Feather name="menu" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            );
        }
        if (variant === "backWithText") {
            return (
                <TouchableOpacity onPress={onRightTextPress}>
                    <Text style={styles.rightText}>{rightText}</Text>
                </TouchableOpacity>
            );
        }
        return <View />;
    };

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={COLORS.gradient}
            style={[styles.wrapper, { paddingTop: insets.top + 8 }]}
        >
            <View style={styles.bar}>
                <View style={styles.side}>{renderLeft()}</View>

                <Image
                    source={require("../../../assets/images/splt-logo.png")}
                    style={styles.logo}
                />

                <View style={[styles.side, { alignItems: "flex-end" }]}>
                    {renderRight()}
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    bar: {
        flexDirection: "row",
        alignItems: "center",
    },
    side: {
        flex: 1,
        justifyContent: "flex-start",
    },
    logo: {
        width: 80,
        height: 26,
        resizeMode: "contain",
        marginHorizontal: 12,
    },
    rightRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    mr16: { marginRight: 16 },
    rightText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: "600",
    },
});
