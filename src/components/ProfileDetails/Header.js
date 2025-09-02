import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import theme from "../../constants/theme";
import COLORS from "../../constants/Colors";

const Header = ({ onBack }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        accessible={true}
        accessibilityLabel="Go back"
      >
        <Icon name="arrow-back" size={26} color={COLORS.text} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={theme.textStyles.title}>Let’s complete your profile</Text>
        <Text style={[styles.subtext, theme.textStyles.small]}>
          It will help us to know more about you!
        </Text>
      </View>
    </View>
  );
};

Header.propTypes = {
  onBack: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  backButton: {
    padding: 16,
    paddingTop: 40,
  },
  titleContainer: {
  paddingTop:90
  },
  subtext: {
    lineHeight: 20,
    marginBottom: 20,
  },

});
export default Header;
