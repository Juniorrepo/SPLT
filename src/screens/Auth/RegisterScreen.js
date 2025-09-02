import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import theme from "../../constants/theme";
import COLORS from "../../constants/Colors";
import SwitchButton from "../../components/common/SwitchButton";
import InputField from "../../components/common/InputField";
import PrivacyCheckbox from "../../components/common/PrivacyCheckbox";
import SocialRow from "../../components/auth/SocialRow";
import OrComponent from "../../components/common/OrComponent";
import AuthGradientButton from "../../components/auth/AuthGradientButton";
import FormError from "../../components/auth/FormError";

export default function RegisterScreen({ navigation }) {
  const [isClient, setIsClient] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");

  const handleRegister = () => {
    let valid = true;
    if (userName.trim() === "") {
      setUserNameError("User Name is required");
      valid = false;
    } else if (userName.trim().toLowerCase() === "taken") {
      setUserNameError("This user name is already taken");
      valid = false;
    } else setUserNameError("");

    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else setEmailError("");

    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else setPasswordError("");

    if (!accepted) {
      setCheckboxError("You must accept our terms");
      valid = false;
    } else setCheckboxError("");

    // if (valid) navigation.navigate("Gender");
     navigation.navigate("Gender");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[theme.textStyles.subtitle, styles.welcome]}>
          Hey there,
        </Text>
        <Text style={theme.textStyles.title}>Create an Account</Text>

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
          icon="person-outline"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <InputField
          icon="person-outline"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <InputField
          icon="person-outline"
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
        />
        <FormError message={userNameError} />

        <InputField
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <FormError message={emailError} />

        <InputField
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <FormError message={passwordError} />

        <PrivacyCheckbox
          isChecked={accepted}
          onToggle={() => setAccepted(!accepted)}
        />
        <FormError message={checkboxError} />

        <AuthGradientButton
          title="Register"
          iconName="person-add"
          onPress={handleRegister}
        />

        <OrComponent />
        <SocialRow />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[theme.textStyles.body, styles.footerText]}>
            Already have an account?{" "}
            <Text style={{ color: COLORS.subPrimary }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
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
  iconSpacing: {
    marginRight: 8,
  },
  registerButton: {
    marginBottom: 20,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
  },
  registerText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  footerText: {
    textAlign: "center",
    marginTop: 10,
    color: COLORS.text,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 5,
  },
  errorIcon: {
    marginRight: 6,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    flex: 1,
  },
});
