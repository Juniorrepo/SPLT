
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from '../../common/ActionSheet';
import { useCallback, useMemo, useRef } from 'react';

const PostHeader = ({ userName, avatar }) => {
    const navigation = useNavigation()
    const sheetRef = useRef(null);

    const openSheet = useCallback(() => {
        sheetRef.current?.present();
    }, []);
    const actions = useMemo(() => ([
        {
            key: 'link',
            label: 'Link',
            icon: 'link',
            family: 'AntDesign',
            onPress: () => sheetRef.current?.dismiss(),
        },
        {
            key: 'edit',
            label: 'Edit',
            icon: 'mode-edit-outline',
            family: 'MaterialIcons',
            onPress: () => {
                sheetRef.current?.dismiss();
                navigation.navigate('WorkoutDetails');
            },
        },
        {
            key: 'share',
            label: 'Share',
            icon: 'share',
            family: 'Feather',
            onPress: () => sheetRef.current?.dismiss(),
        },
        {
            key: 'delete',
            label: 'Delete',
            icon: 'delete',
            family: 'AntDesign',
            destructive: true,
            onPress: () => sheetRef.current?.dismiss(),
        },
    ]), [navigation]);

    return (
        <>
            <LinearGradient
                colors={theme.colors.postCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <View style={styles.left}>
                    <Image source={avatar} style={styles.avatar} />
                    <Text style={styles.userName}>{userName}</Text>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity style={styles.workoutBtn} onPress={() => navigation.navigate('WorkoutDetails')}>
                        <Text style={styles.workoutText}>View Workout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openSheet} style={{ marginLeft: 10 }}>
                        <MaterialIcons name="more-vert" size={23} color="white" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ActionSheet ref={sheetRef} actions={actions} />
        </>

    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    right: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
    userName: { ...theme.textStyles.subtitle, color: 'white', fontWeight: 'bold', marginBottom: 0, fontSize: 18 },
    workoutBtn: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderRadius: 10,
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,

    },
    workoutText: { fontSize: 14, color: 'white', fontWeight: 'bold' },
});

export default PostHeader;
