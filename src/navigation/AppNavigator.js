import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/Auth/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import {
  AgeScreen,
  DOBScreen,
  GenderScreen,
  HeightScreen,
  WeightScreen,
} from "../screens/Profile/ProfileDetailsScreen";
import CongratulationsScreen from "../screens/Profile/CongratulationsScreen";
import TabNavigator from "./TabNavigator";
import ChatInterface from "../screens/Chat/ChatInterFace";
import GroupsInterface from "../screens/Groups/GroupsInterface";
import CreateGroupScreen from "../screens/Groups/CreateGroupScreen";
import InviteMembersScreen from "../screens/Groups/InviteMembersScreen";
import GroupDetailsScreen from "../screens/Groups/GroupDetailsScreen";
import GroupRequestsScreen from "../screens/Groups/GroupRequestsScreen";
import GroupTopVolumeScreen from "../screens/Groups/GroupTopVolumeScreen";
import GroupLongestSessionScreen from "../screens/Groups/GroupLongstSessionScreen";
import GroupHighestSessionScreen from "../screens/Groups/GroupHighestSessionScreen";
import GroupChallengesScreen from "../screens/Groups/GroupChallengesScreen";
import GroupChallengeCreateScreen from "../screens/Groups/GroupChallengeCreateScreen";
import ExercisePickerScreen from "../screens/Groups/ExercisePickerScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Weight" component={WeightScreen} />
        <Stack.Screen name="Height" component={HeightScreen} />
        <Stack.Screen name="ChatInterface" component={ChatInterface} />
        <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
        <Stack.Screen name="InviteMembers" component={InviteMembersScreen} />
        <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
        <Stack.Screen name="GroupRequests" component={GroupRequestsScreen} />
        <Stack.Screen name="GroupTopVolume" component={GroupTopVolumeScreen} />
        <Stack.Screen name="GroupLongestSession" component={GroupLongestSessionScreen} />
        <Stack.Screen name="GroupHighestSession" component={GroupHighestSessionScreen} />
        <Stack.Screen name="GroupChallengeCreate" component={GroupChallengeCreateScreen} />
        <Stack.Screen name="GroupChallenges" component={GroupChallengesScreen} />
        <Stack.Screen name="ExercisePicker" component={ExercisePickerScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Groups" component={GroupsInterface} />
        <Stack.Screen name="Age" component={AgeScreen} />
        <Stack.Screen name="DOB" component={DOBScreen} />
        <Stack.Screen
          name="Congratulations"
          component={CongratulationsScreen}
        />
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
