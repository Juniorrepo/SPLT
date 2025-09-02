import { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../../components/common/TopBar";
import COLORS from "../../constants/Colors";
import Divider from "../../components/common/Divider";
import UploadBox from "../../components/common/UploadBox";
import AppTextArea from "../../components/common/AppTextArea";
import theme from "../../constants/theme";
import MetricsRow from "../../components/home/workout/MetricsRow";
import AuthGradientButton from "../../components/auth/AuthGradientButton";

const MAX_IMAGES = 20;

export default function WorkoutDetailsScreen() {
    const navigation = useNavigation();
    const [desc, setDesc] = useState("");
    const [images, setImages] = useState([]);

    const pickImage = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (result.canceled) return;

        const newUris = (result.assets || [])
            .map(a => a.uri)
            .filter(Boolean);

        setImages(prev => {
            const merged = [...prev, ...newUris].filter(
                (uri, idx, arr) => arr.indexOf(uri) === idx
            );
            if (merged.length > MAX_IMAGES) {
                Alert.alert("Limit reached", `Max ${MAX_IMAGES} images allowed.`);
            }
            return merged.slice(0, MAX_IMAGES);
        });
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const confirmRemoveImage = (index) => {
        Alert.alert("Remove photo", "Are you sure you want to remove this photo?", [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", style: "destructive", onPress: () => removeImage(index) },
        ]);
    };

    const clearAll = () => {
        if (!images.length) return;
        Alert.alert("Remove all", "Delete all selected photos?", [
            { text: "Cancel", style: "cancel" },
            { text: "Remove all", style: "destructive", onPress: () => setImages([]) },
        ]);
    };

    return (
        <View style={styles.container}>
            <TopBar
                variant="backWithText"
                onBackPress={() => navigation.goBack()}
                rightText="Later"
                onRightTextPress={() => navigation.goBack()}
            />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Workout Details</Text>

                <View style={{ paddingHorizontal: 16 }}>
                    <MetricsRow
                        duration={{ h: 1, m: 0, s: 0, onChange: () => { } }}
                        volume="20kg"
                        sets="12"
                        pr="5"
                    />
                </View>

                <Divider />

                <Text style={styles.blockLabel}>Upload Photo(s)</Text>
                <UploadBox onPress={pickImage} />

                {images.length > 0 && (
                    <>
                        <TouchableOpacity onPress={clearAll} style={{ alignSelf: "flex-end", marginTop: 8 }}>
                            <Text style={{ color: "#FF6B6B", fontWeight: "700" }}>Remove all</Text>
                        </TouchableOpacity>

                        <View style={styles.grid}>
                            {images.map((uri, index) => (
                                <View key={uri + index} style={styles.thumbWrap}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onLongPress={() => confirmRemoveImage(index)}
                                    >
                                        <Image source={{ uri }} style={styles.thumb} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => removeImage(index)}
                                        style={styles.closeBtn}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <Ionicons name="close" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </>
                )}


                <AppTextArea
                    value={desc}
                    onChangeText={setDesc}
                    placeholder="Describe your workout session"
                />
                <Divider />

                <AuthGradientButton title="Post" onPress={() => { /* submit */ }} style={{ marginTop: 16 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { padding: 16, paddingBottom: 40 },
    sectionTitle: {
        ...theme.textStyles.title,
        fontSize: 16,
        textAlign: "left",
        marginTop: 8,
    },
    blockLabel: {
        ...theme.textStyles.title,
        textAlign: "left",
        fontSize: 16,
        marginBottom: 8,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    thumbWrap: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
        overflow: "hidden",
        position: "relative",
        borderWidth: 1,
        borderColor: "#333",
        backgroundColor: "#1a1a1a",
    },
    thumb: {
        width: "100%",
        height: "100%",
    },
    closeBtn: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "rgba(0,0,0,0.6)",
        alignItems: "center",
        justifyContent: "center",
    },
});
