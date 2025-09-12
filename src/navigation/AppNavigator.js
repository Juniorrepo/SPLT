import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
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
import PersonalRecordsScreen from "../screens/Track/PersonalRecordsScreen";
import SetsRecordsScreen from "../screens/Track/SetRecordsScreen";
import VolumeRecordsScreen from "../screens/Track/VolumeRecordsScreen";
import WorkoutsExploreListScreen from "../components/workouts/WorkoutsExploreListScreen";
import ProgramDetails from "../components/workouts/ProgramDetails";
import WorkoutPlanScreen from "../components/workouts/WorkoutPage/WorkoutPage";
import WorkoutDetailScreen from "../components/workouts/WorkoutPage/WorkoutDetailScreen";
import AddExercise from "../components/workouts/WorkoutPage/AddExerciseScreen";
import StartedWorkoutScreen from "../components/workouts/WorkoutPage/StartWorkoutPage";
import PostWorkoutCongratsScreen from "../components/workouts/PostWorkoutCongratsScreen";
import CreateNewWorkoutNameScreen from "../components/workouts/WorkoutPage/createnewworkout/NameWorkoutScreen";
import SelectExerciseScreen from "../components/workouts/WorkoutPage/createnewworkout/SelectExerciseScreen";
import CreateWorkoutScreen from "../components/workouts/WorkoutPage/createnewworkout/CreateWorkoutScreen";
import CreateExerciseScreen from "../components/workouts/WorkoutPage/createnewexercise/CreateExerciseScreen";
import CreateFolderScreen from "../components/workouts/WorkoutPage/createnewfolder/CreateFolderScreen";
import SelectWorkoutScreen from "../components/workouts/WorkoutPage/createnewworkout/SelectWorkout";
import WorkoutsStartScreen from "../components/workouts/WorkoutPage/WorkoutsStartScreen";
import EditProfileScreen from "../components/ProfileDetails/EditProfileScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import MeasurmentsScreen from "../components/ProfileDetails/Measurments";
import SettingsHubScreen from "../components/common/SettingsHubScreen";
import ProgressPicturesScreen from "../components/ProfileDetails/Measurments/ProgressPicturesScreen";
import UpdateMeasurementsScreen from "../components/ProfileDetails/Measurments/MeasurementsScreen";
import ContactSPLTScreen from "../components/Settings/Addresses";
import AboutSPLTScreen from "../components/Settings/AboutSPLTScreen";
import FaqScreen from "../components/Settings/FaqScreen";
import GettingStartedScreen from "../components/Settings/GettingStartedScreen";
import ContentPreferencesScreen from "../components/Settings/ContentPreferencesScreen";
import BlockedUsersScreen from "../components/Settings/BlockwdUsersScreen";
import CloseFriendsScreen from "../components/Settings/CloseFriendsScreen";
import AccountPrivacyScreen from "../components/Settings/AccountPrivacyScreen";
import UnitsScreen from "../components/Settings/UnitsScreen";
import AppleHealth from "../components/Settings/AppleHealth";
import IntegrationsScreen from "../components/Settings/IntegrationsScreen";
import WorkoutHistoryScreen from "../components/Settings/WorkoutHistoryScreen";
import AccountHelp from "../components/Settings/Account";
import ReviewsScreen from "../components/Settings/ReviewsScreen";
import AccountHistoryScreen from "../components/Settings/AccountHistory";
import TimeSpentScreen from "../components/Settings/TimeSpentScreen";
import AppThemeScreen from "../components/Settings/AppTheme";
import SubscriptionScreen from "../components/Settings/SubscriptionScreen";
import CreditCardForm from "../components/Settings/CreditCardForm";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName="Splash"
            >
                <Stack.Screen name="Splash" component={SplashScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="Weight" component={WeightScreen}/>
                <Stack.Screen name="Height" component={HeightScreen}/>
                <Stack.Screen name="ChatInterface" component={ChatInterface}/>
                <Stack.Screen name="CreateGroup" component={CreateGroupScreen}/>
                <Stack.Screen name="InviteMembers" component={InviteMembersScreen}/>
                <Stack.Screen name="GroupDetails" component={GroupDetailsScreen}/>
                <Stack.Screen name="GroupRequests" component={GroupRequestsScreen}/>
                <Stack.Screen name="GroupTopVolume" component={GroupTopVolumeScreen}/>
                <Stack.Screen name="GroupLongestSession" component={GroupLongestSessionScreen}/>
                <Stack.Screen name="GroupHighestSession" component={GroupHighestSessionScreen}/>
                <Stack.Screen name="GroupChallengeCreate" component={GroupChallengeCreateScreen}/>
                <Stack.Screen name="GroupChallenges" component={GroupChallengesScreen}/>
                <Stack.Screen name="ExercisePicker" component={ExercisePickerScreen}/>
                <Stack.Screen name="Gender" component={GenderScreen}/>
                <Stack.Screen name="Groups" component={GroupsInterface}/>
                <Stack.Screen name="Age" component={AgeScreen}/>
                <Stack.Screen name="DOB" component={DOBScreen}/>
                <Stack.Screen
                    name="Congratulations"
                    component={CongratulationsScreen}
                />
                <Stack.Screen name="MainApp" component={TabNavigator}/>

                <Stack.Screen
                    name="PersonalRecords"
                    component={PersonalRecordsScreen}
                />
                <Stack.Screen name="SetsRecords" component={SetsRecordsScreen}/>
                <Stack.Screen name="VolumeRecords" component={VolumeRecordsScreen}/>
                <Stack.Screen name="WorkoutsExplore" component={WorkoutsExploreListScreen}/>
                <Stack.Screen name="ProgramDetails" component={ProgramDetails}/>
                <Stack.Screen name="WorkoutPlanScreen" component={WorkoutPlanScreen}/>
                <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen}/>
                <Stack.Screen name="AddExercise" component={AddExercise}/>
                <Stack.Screen name="StartWorkoutPage" component={StartedWorkoutScreen}/>
                <Stack.Screen name={"PostWorkoutCongrats"} component={PostWorkoutCongratsScreen}/>

                <Stack.Screen name={"CreateWorkoutName"} component={CreateNewWorkoutNameScreen}/>
                <Stack.Screen name={"SelectExercise"} component={SelectExerciseScreen}/>
                <Stack.Screen name={"CreateWorkout"} component={CreateWorkoutScreen}/>
                <Stack.Screen name={"CreateExercise"} component={CreateExerciseScreen}/>
                <Stack.Screen name={"CreateFolder"} component={CreateFolderScreen}/>
                <Stack.Screen name={"SelectWorkout"} component={SelectWorkoutScreen}/>
                <Stack.Screen name="WorkoutsStart" component={WorkoutsStartScreen}/>

                <Stack.Screen name={"EditProfile"} component={EditProfileScreen}/>

                <Stack.Screen name={"AccountScreen"} component={AccountScreen}/>
                <Stack.Screen name={"MeasurmentsScreen"} component={MeasurmentsScreen}/>

                <Stack.Screen name={"SettingsHubScreen"} component={SettingsHubScreen}/>
                <Stack.Screen name={"ProgressPicturesScreen"} component={ProgressPicturesScreen}/>
                <Stack.Screen name={"UpdateMeasurements"} component={UpdateMeasurementsScreen}/>
                <Stack.Screen name={"Addresses"} component={ContactSPLTScreen}/>
                <Stack.Screen name={"AboutSPLT"} component={AboutSPLTScreen}/>
                <Stack.Screen name={"FaqScreen"} component={FaqScreen}/>
                <Stack.Screen name={"GettingStartedScreen"} component={GettingStartedScreen}/>
                <Stack.Screen name={"ContentPreferences"} component={ContentPreferencesScreen}/>
                <Stack.Screen name={"BlockedUsersScreen"} component={BlockedUsersScreen}/>
                <Stack.Screen name={"CloseFriend"} component={CloseFriendsScreen}/>
                <Stack.Screen name={"AccountPrivacy"} component={AccountPrivacyScreen}/>
                <Stack.Screen name={"Units"} component={UnitsScreen}/>
                <Stack.Screen name={"AppleHealth"} component={AppleHealth}/>
                <Stack.Screen name={"Integrations"} component={IntegrationsScreen}/>
                <Stack.Screen name={"WorkoutHistory"} component={WorkoutHistoryScreen}/>
                <Stack.Screen name={"Account"} component={AccountHelp}/>
                <Stack.Screen name={"Reviews"} component={ReviewsScreen}/>
                <Stack.Screen name={"AccountHistory"} component={AccountHistoryScreen}/>
                <Stack.Screen name={"TimeSpent"} component={TimeSpentScreen}/>
                <Stack.Screen name={"AppTheme"} component={AppThemeScreen}/>
                <Stack.Screen name={"Subscriptions"} component={SubscriptionScreen}/>
                <Stack.Screen name={"CreditCard"} component={CreditCardForm}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
