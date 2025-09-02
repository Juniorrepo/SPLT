import { View, Text, StyleSheet } from 'react-native';
import StatItem from '../atoms/StatItem';
import theme from '../../../../constants/theme';

const WorkoutStats = () => (
  <View style={styles.container}>
    <View style={styles.streakBox}>
      <Text style={styles.streakNumber}>29</Text>
      <Text style={styles.streakLabel}>DAY STREAK</Text>
      <Text style={styles.username}>SPLT @honen</Text>
    </View>

    <View style={styles.stats}>
      <StatItem title="Time" value="2:04:00" />
      <StatItem title="Sets" value="12" />
      <StatItem title="Volume" value="10,200" />
      <StatItem title="PR" value="1" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  streakBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  streakNumber: {
    fontSize: 32,
    color: theme.colors.secondary,
    fontFamily: theme.fonts.bold,
  },
  streakLabel: {
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
  },
  username: {
    fontSize: 12,
    color: theme.colors.gray,
    fontFamily: theme.fonts.regular,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default WorkoutStats;
