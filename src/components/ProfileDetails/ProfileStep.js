import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import PropTypes from "prop-types";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import NextButton from "./NextButton";
import ProfileInputField from "./ProfileInputField";
import COLORS from "../../constants/Colors";

const ProfileStep = ({ label, unit = "", onNext, stepIndex, onBack }) => {
  const [value, setValue] = useState("");

  const totalSteps = 5;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Header onBack={onBack} />
        <ProgressBar totalSteps={totalSteps} currentStep={stepIndex} />
        <View style={styles.contentContainer}>
          <ProfileInputField
            label={label}
            unit={unit}
            value={value}
            onChange={setValue}
          />
          <NextButton onPress={() => onNext(value)} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

ProfileStep.propTypes = {
  label: PropTypes.string.isRequired,
  unit: PropTypes.string,
  onNext: PropTypes.func.isRequired,
  stepIndex: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});

export default ProfileStep;
