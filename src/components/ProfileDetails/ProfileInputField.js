import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
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
  { label: "Other", value: "Other" },
  { label: "Prefer not to say", value: "Prefer not to say" },
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
    if (selectedDate && event.type === 'set') {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      onChange(formattedDate);
    }
  };

  const getDefaultDate = () => {
    if (value) {
      return new Date(value);
    }
    // Default to 25 years ago for a reasonable birth date
    const date = new Date();
    date.setFullYear(date.getFullYear() - 25);
    return date;
  };

  const renderInputContent = () => {
    if (label === "Your Weight" || label === "Your Height") {
      return (
          <View style={styles.figmaWrapper}>
            <View style={styles.figmaFieldOnly}>
              <View style={styles.iconContainer}>
                {renderIcon(icon)}
              </View>
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
          <View style={styles.iconContainer}>
            {renderIcon(icon)}
          </View>
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
                          <Ionicons
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
              <>
                <TouchableOpacity
                    style={styles.dateContainer}
                    onPress={() => setShowDatePicker(true)}
                    activeOpacity={0.7}
                >
                  <Text
                      style={[
                        styles.dateText,
                        { color: value ? COLORS.text : COLORS.placeholdertColor }
                      ]}
                  >
                    {value || "Select your birth date"}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        themeVariant="dark"
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        value={getDefaultDate()}
                        onChange={handleDateChange}
                        maximumDate={new Date()} // Prevent future dates
                        minimumDate={new Date(1900, 0, 1)} // Reasonable minimum date
                    />
                )}
              </>
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
      <View style={styles.container}>
        <Text style={styles.centeredLabel}>Complete your profile</Text>
        {renderInputContent()}
      </View>
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
    paddingVertical: 12,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    fontFamily: theme.fonts.regular,
  },
  inputIOS: {
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 12,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    fontFamily: theme.fonts.regular,
  },
  placeholder: {
    color: COLORS.placeholdertColor,
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  centeredLabel: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: theme.fonts.semibold || theme.fonts.medium,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
    width: 20,
    alignItems: 'center',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  dateContainer: {
    flex: 1,
    paddingVertical: 4,
  },
  dateText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    paddingVertical: 4,
  },
  figmaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  figmaFieldOnly: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  figmaInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontFamily: theme.fonts.regular,
    paddingVertical: 4,
  },
  unitGradientSeparate: {
    marginLeft: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  unitText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: "#fff",
    textAlign: 'center',
  },
  dropdownIconWrapper: {
    position: "absolute",
    right: 0,
    top: "50%",
    marginTop: -10,
    zIndex: 1,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    padding: 20,
    width: '85%',
    maxHeight: '60%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.placeholdertColor + '20',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.semibold || theme.fonts.medium,
    color: COLORS.text,
  },
  closeButton: {
    padding: 5,
  },
  genderList: {
    maxHeight: 300,
  },
  genderOption: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.placeholdertColor + '20',
  },
  selectedGenderOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50' + '10',
  },
  genderOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  genderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.placeholdertColor + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  selectedGenderIconContainer: {
    backgroundColor: '#4CAF50',
  },
  genderOptionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: COLORS.text,
  },
  selectedGenderOptionText: {
    color: COLORS.text,
    fontFamily: theme.fonts.medium,
  },
  checkmarkContainer: {
    marginLeft: 10,
  },
});

export default ProfileInputField;