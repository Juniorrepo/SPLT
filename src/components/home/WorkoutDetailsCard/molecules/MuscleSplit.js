import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../../constants/theme';
import GradientProgressBar from '../atoms/GradientProgressBar';

const MuscleSplit = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Muscle Split</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Legs</Text>
        <GradientProgressBar progress={0.9} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Core</Text>
        <GradientProgressBar progress={0.4} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10
  },
  title: {
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    marginBottom: 10,
  },
  row: {
    marginBottom: 12,
    width: '90%'
  },
  label: {
    color: theme.colors.text,
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    marginBottom: 6,
  },
});

export default MuscleSplit;
