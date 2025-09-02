import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import WorkoutDetailsScreen from "../screens/WorkoutDetails/WorkoutDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack({ openDrawer }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain">
                {(props) => <HomeScreen {...props} openDrawer={openDrawer} />}
            </Stack.Screen>
            <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
        </Stack.Navigator>
    );
}