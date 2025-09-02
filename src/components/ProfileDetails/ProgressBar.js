import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import COLORS from "../../constants/Colors";

const ProgressBar = ({ totalSteps, currentStep }) => {
  return (
    <View style={styles.progressBar}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          key={i}
          style={i < currentStep ? styles.stepActive : styles.stepInactive}
          accessible={true}
          accessibilityLabel={`Step ${i + 1} ${
            i < currentStep ? "completed" : "pending"
          }`}
        />
      ))}
    </View>
  );
};

ProgressBar.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  stepActive: {
    height: 4,
    width: 60,
    backgroundColor: COLORS.text,
    marginHorizontal: 5,
    borderRadius: 2,
  },
  stepInactive: {
    height: 4,
    width: 60,
    backgroundColor: COLORS.stepInactive,
    marginHorizontal: 5,
    borderRadius: 2,
  },
});

export default ProgressBar;
