import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../../constants/theme';

const StatItem = ({ title, value }) => (
  <View style={styles.item}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  title: {
    fontSize: 12,
    color: theme.colors.gray,
    fontFamily: theme.fonts.regular,
  },
});

export default StatItem;
