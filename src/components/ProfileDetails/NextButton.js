import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";
const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.nextButton}
      onPress={onPress}
      accessible={true}
      accessibilityLabel="Proceed to next step"
    >
      <LinearGradient
        colors={COLORS.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.nextText}>Next</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

NextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  nextButton: {
    marginBottom: 20,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
  },
  nextText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
});

export default NextButton;
