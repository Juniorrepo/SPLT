import {TouchableOpacity, StyleSheet, Image } from "react-native";

export default function SocialIcon  ({ imageSource, backgroundColor })  {
  return(
  <TouchableOpacity style={[styles.socialIcon, { backgroundColor }]}>
    <Image
      source={imageSource}
      
      resizeMode="contain"
    />
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  socialIcon: {
    width: 53,
    height: 53,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
