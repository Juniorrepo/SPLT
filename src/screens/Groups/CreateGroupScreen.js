import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    Switch,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CreateGroupScreen({ navigation, onCreate }) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [photoUri, setPhotoUri] = useState(undefined);
    const descRef = useRef(null);

    const submit = () => {
        if (!name.trim()) {
            Alert.alert('Group name required', 'Please enter a group name.');
            return;
        }
        const payload = { name: name.trim(), description: desc.trim(), isPublic, photoUri };
        onCreate?.(payload);
    };

    const pickFromLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Allow photo library access to upload a picture.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.9,
        });
        if (!result.canceled) setPhotoUri(result.assets[0].uri);
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Allow camera access to take a picture.');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.9,
        });
        if (!result.canceled) setPhotoUri(result.assets[0].uri);
    };

    const choosePhoto = () => {
        Alert.alert(
            'Group Photo',
            'Select an option',
            [
                { text: 'Choose from Library', onPress: pickFromLibrary },
                { text: 'Take Photo', onPress: takePhoto },
                { text: 'Remove Photo', onPress: () => setPhotoUri(undefined), style: 'destructive' },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack?.()}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerLogo}>SPLT</Text>
                <TouchableOpacity onPress={submit}>
                    <Text style={styles.headerAction}>Create</Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* Body */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <View style={styles.body}>
                    {/* Photo */}
                    <TouchableOpacity style={styles.photoCircle} activeOpacity={0.9} onPress={choosePhoto}>
                        {photoUri ? (
                            <Image source={{ uri: photoUri }} style={styles.photo} />
                        ) : (
                            <>
                                <View style={styles.placeholderRing}>
                                    <Ionicons name="person" size={52} color="#C9C9C9" />
                                </View>
                                <Text style={styles.addPhotoText}>Add Photo</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Group Name */}
                    <View style={styles.inputWrap}>
                        <Ionicons name="person-outline" size={18} color="#7C7C7C" style={styles.inputIcon} />
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Group Name"
                            placeholderTextColor="#666"
                            style={styles.input}
                            returnKeyType="next"
                            onSubmitEditing={() => descRef.current?.focus()}
                        />
                    </View>

                    {/* Group Description */}
                    <View style={styles.inputWrap}>
                        <Ionicons name="document-text-outline" size={18} color="#7C7C7C" style={styles.inputIcon} />
                        <TextInput
                            ref={descRef}
                            value={desc}
                            onChangeText={setDesc}
                            placeholder="Group Description"
                            placeholderTextColor="#666"
                            style={styles.input}
                            returnKeyType="done"
                            onSubmitEditing={submit}     // ENTER submits
                        />
                    </View>

                    {/* Public toggle */}
                    <View style={styles.toggleRow}>
                        <Text style={styles.toggleLabel}>Public</Text>
                        <Switch
                            value={isPublic}
                            onValueChange={setIsPublic}
                            thumbColor="#FFFFFF"
                            trackColor={{ false: '#3A3A3A', true: '#8B5CF6' }}
                        />
                    </View>
                </View>

                {/* Bottom primary Create button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={submit}
                        style={[styles.primaryBtn, !name.trim() && { opacity: 0.6 }]}
                        disabled={!name.trim()}
                    >
                        <Text style={styles.primaryBtnText}>Create Group</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const AVATAR = 96;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'space-between',
    },
    headerLogo: { color: '#FFF', fontWeight: '800', fontSize: 22, letterSpacing: 2 },
    headerAction: { color: '#FFF', fontSize: 16, fontWeight: '600' },

    body: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },

    photoCircle: { alignSelf: 'center', marginTop: 6, marginBottom: 22, alignItems: 'center' },
    placeholderRing: {
        width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2,
        borderWidth: 4, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#111',
    },
    photo: { width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2 },
    addPhotoText: { color: '#9CA3AF', marginTop: 8, fontSize: 14 },

    inputWrap: {
        backgroundColor: '#0F0F0F',
        borderColor: '#262626',
        borderWidth: 1,
        borderRadius: 12,
        height: 54,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    inputIcon: { marginRight: 8 },
    input: { flex: 1, color: '#FFF', fontSize: 16 },

    toggleRow: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toggleLabel: { color: '#FFF', fontSize: 16 },

    footer: { padding: 16, paddingBottom: 24 },
    primaryBtn: {
        backgroundColor: '#8B5CF6',
        borderRadius: 14,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});