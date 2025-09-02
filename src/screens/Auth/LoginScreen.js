import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import theme from "../../constants/theme";
import COLORS from "../../constants/Colors";
import SwitchButton from "../../components/common/SwitchButton";
import InputField from "../../components/common/InputField";
import OrComponent from "../../components/common/OrComponent";
import SocialRow from "../../components/auth/SocialRow";
import AuthGradientButton from "../../components/auth/AuthGradientButton";

export default function LoginScreen({ navigation }) {
  const [isClient, setIsClient] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login clicked");
    navigation.navigate("MainApp", { screen: "Home" });

    // TODO: Replace with API call
  };

  return (
    <View style={styles.container}>
      <Text style={[theme.textStyles.subtitle, styles.welcome]}>
        Hey there,
      </Text>
      <Text style={theme.textStyles.title}>Welcome Back</Text>

      <View style={styles.switchContainer}>
        <SwitchButton
          label="Client"
          active={isClient}
          onPress={() => setIsClient(true)}
        />
        <SwitchButton
          label="Trainer"
          active={!isClient}
          onPress={() => setIsClient(false)}
        />
      </View>

      <InputField
        icon="mail-outline"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        icon="lock-closed-outline"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        showPassword={showPassword}
        togglePassword={() => setShowPassword(!showPassword)}
      />

      <TouchableOpacity>
        <View style={styles.forgotContainer}>
          <Text style={[theme.textStyles.small, styles.forgot]}>
            Forgot your password?
          </Text>
        </View>
      </TouchableOpacity>

      <AuthGradientButton
        title="Login"
        iconName="log-in"
        onPress={handleLogin}
      />

      <OrComponent />

      <SocialRow />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={[theme.textStyles.body, styles.footerText]}>
          Don't have an account?{" "}
          <Text style={{ color: COLORS.subPrimary }}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    justifyContent: "center",
  },
  welcome: {
    textAlign: "center",
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  forgotContainer: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text,
    marginBottom: 55,
  },
  forgot: {
    textAlign: "center",
    paddingBottom: 2,
  },
  footerText: {
    textAlign: "center",
    marginTop: 10,
    color: COLORS.text,
  },
});
