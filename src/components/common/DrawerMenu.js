import { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    runOnJS,
} from "react-native-reanimated";
import {
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome5,
    SimpleLineIcons,
} from "@expo/vector-icons";

import theme from "../../constants/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const menuItems = [
    { label: "Account", icon: <Ionicons name="person-outline" size={20} color="white" /> },
    { label: "Messages", icon: <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" /> },
    { label: "Groups", icon: <Ionicons name="people-outline" size={20} color="white" /> },
    { label: "Addresses", icon: <Feather name="map-pin" size={20} color="white" /> },
    { label: "Payment Cards", icon: <Feather name="credit-card" size={20} color="white" /> },
    { label: "Orders", icon: <Feather name="box" size={20} color="white" /> },
    { label: "Goals & Achievements", icon: <SimpleLineIcons name="trophy" size={20} color="white" /> },
    { label: "Trainers", icon: <MaterialCommunityIcons name="arm-flex-outline" size={20} color="white" /> },
    { label: "Loyalty Points", icon: <Feather name="star" size={20} color="white" /> },
    { label: "Settings", icon: <Feather name="settings" size={20} color="white" /> },
    { label: "Contact Us", icon: <Feather name="phone" size={20} color="white" /> },
    { label: "Terms & Conditions", icon: <Feather name="file-text" size={20} color="white" /> },
];

const DrawerMenu = ({ onClose }) => {
    const translateX = useSharedValue(-SCREEN_WIDTH);

    useEffect(() => {
        translateX.value = withTiming(0, { duration: 300 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const handleClose = () => {
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, (finished) => {
            if (finished) {
                runOnJS(onClose)();
            }
        });
    };

    return (
        <View style={styles.overlay}>
            <Animated.View style={[styles.container, animatedStyle]}>
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/images/splt-logo.png")}
                        style={styles.logo}
                    />
                    <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                        <Feather name="x" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            {item.icon}
                            <Text style={styles.menuText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.background,
        zIndex: 999,
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.background,
        paddingTop: 60,
        paddingHorizontal: 20,
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    logo: {
        width: 90,
        height: 26,
        resizeMode: "contain",
    },
    closeBtn: {
        padding: 10,
    },
    scrollContainer: {
        paddingTop: 20,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomColor: theme.colors.text,
        borderBottomWidth: 1,
    },
    menuText: {
        color: theme.colors.text,
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        marginLeft: 12,
    },
});

export default DrawerMenu;
