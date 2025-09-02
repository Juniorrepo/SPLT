import { TextInput, StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";

export default function AppTextArea({ value, onChangeText, placeholder }) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.gray}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        color: COLORS.text,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.primaryDark,
        minHeight: 110,
        marginVertical:15
    },
});
