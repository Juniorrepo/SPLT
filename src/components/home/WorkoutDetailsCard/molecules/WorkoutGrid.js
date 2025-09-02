import { View, StyleSheet } from 'react-native';
import IconLabelCard from '../atoms/IconLabelCard';

const placeholderIcon = require('../../../../assets/images/home/Rectangle 7.png');

const WorkoutGrid = () => {
    const items = Array(12).fill('12x3 Sets Bridges');
    return (
        <View style={styles.grid}>
            {items.map((item, i) => (
                <IconLabelCard key={i} icon={placeholderIcon} label={item} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default WorkoutGrid;
