import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";

const AddGoalDetailsScreen = () => {
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = () => {
    console.log({
      currentWeight,
      targetWeight,
      duration,
    });
  };

  const pickerIcon = () => (
    <Ionicons name="chevron-down" size={20} color={COLORS.text} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.background}
        />
        <Text
          style={[
            theme.textStyles.title,
            { textAlign: "left", marginBottom: 30 },
          ]}
        >
          Weight
        </Text>

        <Text style={theme.textStyles.body}>Your Current Weight</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
           darkTheme={true}
            onValueChange={setCurrentWeight}
            value={currentWeight}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Select Your Weight",
              value: "",
              color: COLORS.placeholdertColor,
            }}
            items={[
              { label: "60 kg", value: "60" },
              { label: "70 kg", value: "70" },
            ]}
            Icon={pickerIcon}
            style={pickerSelectStyles}
          />
        </View>

        <Text style={theme.textStyles.body}>Target Weight</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
          darkTheme={true}
            onValueChange={setTargetWeight}
            value={targetWeight}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Select Your Target Weight",
              value: "",
              color: COLORS.placeholdertColor,
            }}
            items={[
              { label: "65 kg", value: "65" },
              { label: "75 kg", value: "75" },
            ]}
            Icon={pickerIcon}
            style={pickerSelectStyles}
          />
        </View>

        <Text style={theme.textStyles.body}>Duration</Text>
        <View style={styles.inputWrapper}>
          <RNPickerSelect
           darkTheme={true}
            onValueChange={setDuration}
            value={duration}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Duration",
              value: "",
              color: COLORS.placeholdertColor,
            }}
            items={[
              { label: "4 Weeks", value: "4" },
              { label: "8 Weeks", value: "8" },
            ]}
            Icon={pickerIcon}
            style={pickerSelectStyles}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { opacity: currentWeight && targetWeight && duration ? 1 : 0.5 },
          ]}
          onPress={handleSubmit}
        //   disabled={!(currentWeight && targetWeight && duration)}
        >
          <LinearGradient
            colors={COLORS.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddGoalDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 80,
  },
  inputWrapper: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 0,
  },
  button: {
    marginTop: 30,
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
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    paddingVertical: 5,
  },
  inputAndroid: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    paddingVertical: 10,
  },
  placeholder: {
    color: COLORS.placeholdertColor,
  },
  iconContainer: {
    top: Platform.OS === "ios" ? 5 : 18,
    right: 5,
  },
});
