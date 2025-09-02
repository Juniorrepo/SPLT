import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateGoalScreen from "../screens/Profile/CreateGoalScreen";
import AddGoalDetailsScreen from "../screens/Profile/AddGoalDetailsScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
      <Stack.Screen name="AddGoalDetails" component={AddGoalDetailsScreen} />
    </Stack.Navigator>
  );
}
