import { View, StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default function InnerShadowCard({ children, style, radius = 16 }) {

    return (
        <View style={[styles.shadowWrap, { borderRadius: radius }]}>

            <View style={[styles.card, { borderRadius: radius }, style]}>
                <View style={{ position: 'relative' }}>{children}</View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowWrap: {
        shadowColor: theme.colors.text,
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
        // Android
        elevation: 7,
        backgroundColor: 'transparent',
    },
    card: {
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
        overflow: 'hidden',
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',


    },
});
