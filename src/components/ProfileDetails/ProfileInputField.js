import  { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";


const ICON_MAP = {
  "Choose Gender": { name: "venus-mars", type: "FontAwesome5" },
  Age: { name: "people-outline", type: "Ionicons" },
  "Date of birth": { name: "calendar-outline", type: "Ionicons" },
  "Your Weight": { name: "scale-outline", type: "Ionicons" },
  "Your Height": { name: "swap-vertical", type: "Ionicons" },
  default: { name: "person-outline", type: "Ionicons" },
};

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const renderIcon = (iconData) => {
  const { name, type } = iconData;
  switch (type) {
    case "FontAwesome5":
      return <FontAwesome5 name={name} size={20} color={COLORS.placeholdertColor} />;
    case "Ionicons":
      return <Ionicons name={name} size={20} color={COLORS.placeholdertColor} />;
    default:
      return <Icon name={name} size={20} color={COLORS.placeholdertColor} />;
  }
};

const ProfileInputField = ({ label, unit, value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const icon = ICON_MAP[label] || ICON_MAP.default;

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onChange(selectedDate.toLocaleDateString());
    }
  };

  const renderInputContent = () => {
    if (label === "Your Weight" || label === "Your Height") {
      return (
        <View style={styles.figmaWrapper}>
          <View style={styles.figmaFieldOnly}>
            {renderIcon(icon)}
            <TextInput
              placeholder={label}
              placeholderTextColor={COLORS.placeholdertColor}
              style={styles.figmaInput}
              value={value}
              keyboardType="numeric"
              onChangeText={onChange}
            />
          </View>
          {unit && (
            <LinearGradient
              colors={COLORS.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.unitGradientSeparate}
            >
              <Text style={styles.unitText}>{unit}</Text>
            </LinearGradient>
          )}
        </View>
      );
    }

    return (
      <View style={styles.inputWrapper}>
        {renderIcon(icon)}
        {label === "Choose Gender" ? (
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              darkTheme={true}
              placeholder={{ label: "Select Gender", value: null }}
              onValueChange={onChange}
              onOpen={() => setDropdownOpen(true)}
              onClose={() => setDropdownOpen(false)}
              items={GENDER_OPTIONS}
              value={value}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <View style={styles.dropdownIconWrapper}>
                  <Icon
                    name={dropdownOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={COLORS.placeholdertColor}
                  />
                </View>
              )}
              style={pickerSelectStyles}
            />
          </View>
        ) : label === "Date of birth" ? (
          <View style={styles.dateContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text
                style={{
                  color: value ? COLORS.text : COLORS.placeholdertColor,
                  fontSize: 16,
                  fontFamily: theme.fonts.regular,
                }}
              >
                {value || "Select your date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                themeVariant="dark"
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                value={new Date()}
                onChange={handleDateChange}
              />
            )}
          </View>
        ) : (
          <TextInput
            placeholder={label}
            placeholderTextColor={COLORS.placeholdertColor}
            style={styles.input}
            value={value}
            keyboardType={label === "Age" ? "numeric" : "default"}
            onChangeText={onChange}
          />
        )}
      </View>
    );
  };

  return (
    <>
      <Text style={styles.centeredLabel}>Complete your profile</Text>
      {renderInputContent()}
    </>
  );
};

ProfileInputField.propTypes = {
  label: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    fontFamily: theme.fonts.regular,
  },
  inputIOS: {
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    fontFamily: theme.fonts.regular,
  },
  placeholder: { color: COLORS.placeholdertColor },
});

const styles = StyleSheet.create({
  centeredLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: theme.fonts.medium,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 25,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  dateContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  figmaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  figmaFieldOnly: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  figmaIcon: {
    marginRight: 10,
  },
  figmaInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontFamily: theme.fonts.regular,
  },
  unitGradientSeparate: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  unitText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: "#fff",
  },
  dropdownIconWrapper: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: 10,
    zIndex: 1,
  },
});

export default ProfileInputField;