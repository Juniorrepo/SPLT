import { TouchableOpacity, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import theme from "../../constants/theme";
import COLORS from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedImage = Animatable.createAnimatableComponent(Image);

const CongratulationsScreen = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("MainApp", {
      screen: "Profile",
      params: {
        screen: "CreateGoal",
      },
    });
  };

  return (
    <View style={styles.container}>
      <AnimatedImage
        animation="bounceIn"
        iterationCount="infinite"
        duration={2500}
        source={require("../../assets/images/congratulations.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={theme.textStyles.title}>Congratulations !</Text>
      <Text style={[styles.subtext, theme.textStyles.small]}>
        Everything is set now you can choose{"\n"}your own{" "}
        <Text style={{ fontWeight: "bold" }}>Goal</Text>
      </Text>

      <TouchableOpacity
        style={styles.creatButton}
        onPress={onPress}
        accessible={true}
        accessibilityLabel="Proceed to create your own goal"
      >
        <LinearGradient
          colors={["#B57FE6", "#6645AB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={[styles.subtext, theme.textStyles.body]}>
            Create your own goal
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={theme.textStyles.small}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CongratulationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },

  creatButton: {
    marginTop: 40,
    marginBottom: 20,
    width: "70%",
    alignItems: "center",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
  },
  creatText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
});
