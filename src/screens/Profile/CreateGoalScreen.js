import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const CreateGoalScreen = ({ navigation }) => {
  const [goal, setGoal] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNext = () => {
    if (goal) navigation.navigate("AddGoalDetails");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Text style={theme.textStyles.title}>Please Select Your Goal</Text>

      <View style={styles.inputWrapper}>
        <Pressable onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <RNPickerSelect
            onValueChange={(value) => setGoal(value)}
            value={goal}
            darkTheme={true}
            placeholder={{
              label: "Select Your Goal",
              value: "",
              color: COLORS.placeholdertColor,
            }}
            items={[
              { label: "Lose Weight", value: "lose" },
              { label: "Gain Muscle", value: "gain" },
            ]}
            onOpen={() => setIsDropdownOpen(true)}
            onClose={() => setIsDropdownOpen(false)}
            Icon={() => (
              <View style={styles.dropdownIconWrapper}>
                <Ionicons
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={COLORS.placeholdertColor}
                />
              </View>
            )}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </Pressable>
      </View>

      <TouchableOpacity
        style={[styles.button, { opacity: goal ? 1 : 0.5 }]}
        onPress={handleNext}
        // disabled={!goal}
      >
        <LinearGradient
          colors={COLORS.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default CreateGoalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  inputWrapper: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  button: {
    marginTop: 20,
  },
  gradient: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.text,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
  dropdownIconWrapper: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: 13,
    zIndex: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    paddingVertical: 14,
  },
  inputAndroid: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    paddingVertical: 14,
  },
  placeholder: {
    color: COLORS.placeholdertColor,
  },
});
