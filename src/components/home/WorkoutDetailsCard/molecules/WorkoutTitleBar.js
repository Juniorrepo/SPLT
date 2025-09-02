import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const WorkoutTitleBar = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.gradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.line}
      ></LinearGradient>
      <Text style={styles.text}>Workout Details</Text>
      <LinearGradient
        colors={theme.colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.line}
      ></LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  line: {
    flex: 1,
    height: 4,
    opacity: 0.7,
    borderRadius: 2,
  },
  text: {
    marginHorizontal: 14,
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: 14,
  },
});

export default WorkoutTitleBar;
