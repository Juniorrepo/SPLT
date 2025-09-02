import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import theme from '../../../constants/theme';

const PostActions = () => {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity><Ionicons name="heart-outline" size={24} color="white" style={{ marginRight: 15 }} /></TouchableOpacity>
                <TouchableOpacity><Feather name="message-circle" size={24} color="white" /></TouchableOpacity>
            </View>
            <TouchableOpacity><Feather name="upload" size={24} color={theme.colors.primary} /></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
    },
    subContainer: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-around',

    },
});

export default PostActions;
