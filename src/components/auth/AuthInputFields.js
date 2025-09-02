import InputField from "../common/InputField";

export default function AuthInputFields({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  return (
    <>
      <InputField
        icon="mail-outline"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        icon="lock-closed-outline"
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        rightIcon={showPassword ? "eye" : "eye-off"}
        onRightIconPress={() => setShowPassword(!showPassword)}
      />
    </>
  );
}
