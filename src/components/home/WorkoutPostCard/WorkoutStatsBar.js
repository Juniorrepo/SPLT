
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../constants/theme';

const stats = [
    { label: 'Time', value: '2:04' },
    { label: 'Sets', value: '12' },
    { label: 'Volume', value: '10,200' },
    { label: 'PR', value: '1' },
];

const WorkoutStatsBar = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            {stats.map((item, idx) => (
                <View key={idx} style={styles.statItem}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(102, 69, 171, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    statItem: { alignItems: 'center' },
    value: {
        color: theme.colors.text,
        fontWeight: 'bold',
        fontSize: 15,
    },
    label: {
        fontWeight: 'bold',
        color: theme.colors.text,
        fontSize: 14,
        marginTop: 2,
    },
});

export default WorkoutStatsBar;
