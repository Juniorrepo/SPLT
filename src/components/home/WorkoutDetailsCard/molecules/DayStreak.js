import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../../../../constants/theme';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
const DayStreak = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.number}>29</Text>
                <MaskedView
                    maskElement={
                        <Image
                            source={require('../../../../assets/images/home/calories.png')}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    }
                >
                    <LinearGradient
                        colors={theme.colors.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.icon}
                    />
                </MaskedView>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.label}>DAY STREAK</Text>
                <Text style={styles.subtext}>SPLT @honen</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    number: {
        color: theme.colors.text,
        fontSize: 48,
        fontFamily: theme.fonts.rubikBold,
        marginRight: 4,
    },
    icon: {
        width: 20,
        height: 20,
    },
    textBox: {
        alignItems: 'flex-end',
        width: '100%',
        marginTop: 4,
    },
    label: {
        color: theme.colors.text,
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        textAlign: 'center',
        width: '100%',
    },
    subtext: {
        color: theme.colors.text,
        fontSize: 12,
        fontFamily: theme.fonts.bold,
        marginTop: 2,
        textAlign: 'right',
        width: "100%"
    },
});

export default DayStreak;
