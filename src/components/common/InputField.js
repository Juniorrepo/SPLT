import { TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import COLORS from "../../constants/Colors";
import { StyleSheet } from "react-native";
import theme from "../../constants/theme";
const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showPassword,
  togglePassword,
}) => (
  <View style={styles.inputContainer}>
    <Ionicons
      name={icon}
      size={18}
      color="#7B6F72"
      style={styles.iconSpacing}
    />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={COLORS.placeholdertColor}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
    {togglePassword && (
      <TouchableOpacity onPress={togglePassword}>
        <Feather
          name={showPassword ? "eye" : "eye-off"}
          size={18}
          color="#7B6F72"
        />
      </TouchableOpacity>
    )}
  </View>
);
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBackground,
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    padding: 12,
    fontFamily: theme.fonts.regular,
  },

  iconSpacing: {
    marginRight: 8,
  },
});
export default InputField;
