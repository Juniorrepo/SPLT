import ProfileStep from "../../components/ProfileDetails/ProfileStep";

export const GenderScreen = ({ navigation }) => (
  <ProfileStep
    label="Choose Gender"
    stepIndex={1}
    onNext={() => navigation.navigate("Age")}
    onBack={() => navigation.goBack()}
  />
);
export const AgeScreen = ({ navigation }) => (
  <ProfileStep
    label="Age"
    stepIndex={2}
    onNext={() => navigation.navigate("DOB")}
    onBack={() => navigation.goBack()}
  />
);
export const DOBScreen = ({ navigation }) => (
  <ProfileStep
    label="Date of birth"
    stepIndex={3}
    onNext={() => navigation.navigate("Weight")}
    onBack={() => navigation.goBack()}
  />
);

export const WeightScreen = ({ navigation }) => (
  <ProfileStep
    label="Your Weight"
    unit="KG"
    stepIndex={4}
    onNext={() => navigation.navigate("Height")}
    onBack={() => navigation.goBack()}
  />
);

export const HeightScreen = ({ navigation }) => (
  <ProfileStep
    label="Your Height"
    unit="CM"
    stepIndex={5}
    onNext={() => navigation.navigate("Congratulations")}
    onBack={() => navigation.goBack()}
  />
);
