import React from "react";
import { View, StyleSheet } from "react-native";
import SocialIcon from "../common/SocialIcons";
import COLORS from "../../constants/Colors";

export default function SocialRow() {
  return (
    <View style={styles.row}>
      <SocialIcon
        imageSource={require("../../assets/images/google.png")}
        backgroundColor={COLORS.text}
      />
      <SocialIcon
        imageSource={require("../../assets/images/facebook.png")}
        backgroundColor={COLORS.text}
      />
      <SocialIcon
        imageSource={require("../../assets/images/Apple.png")}
        backgroundColor={COLORS.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
