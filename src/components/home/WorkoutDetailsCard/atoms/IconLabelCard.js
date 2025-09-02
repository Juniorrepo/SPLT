import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../../../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const IconLabelCard = ({ icon, label }) => (
    <LinearGradient
        colors={theme.colors.postCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
    >
        <View style={styles.iconWrapper}>
            <Image source={icon} style={styles.icon} />
        </View>
        <Text style={styles.label}>{label}</Text>
    </LinearGradient>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,

    },
    icon: {
        width: 26,
        height: 26,
        marginRight: 8,
        resizeMode: 'contain',
    },
    label: {
        color: theme.colors.text,
        fontSize: 12,
        fontFamily: theme.fonts.regular,
    },
});

export default IconLabelCard;
