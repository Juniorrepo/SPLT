import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../constants/Colors";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileStack from "./ProfileStack";
import ShopScreen from "../screens/Shop/ShopScreen";
import TrackScreen from "../screens/Track/TrackScreen";
import WorkoutsScreen from "../screens/Workouts/WorkoutsScreen";
import { useState } from "react";
import { View } from "react-native";
import DrawerMenu from "../components/common/DrawerMenu";
import HomeStack from "./HomeStack";
import {useNavigation} from "@react-navigation/native";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible((prev) => !prev);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: COLORS.background,
            height: 90,
            borderTopColor: COLORS.borderColor,
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: COLORS.text,
          tabBarInactiveTintColor: COLORS.stepInactive,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            let IconComponent = Ionicons;

            switch (route.name) {
              case "Home":
                iconName = "home-outline";
                break;
              case "Workouts":
                iconName = "barbell-outline";
                break;
              case "Track":
                iconName = "play-outline";
                break;
              case "Shop":
                iconName = "shopping-bag";
                IconComponent = Feather;
                break;
              case "Profile":
                iconName = "person-outline";
                break;
              default:
                iconName = "ellipse";
            }

            return <IconComponent name={iconName} size={26} color={color} />;
          },
          tabBarLabelStyle: {
            fontFamily: "Roboto_400Regular",
            fontSize: 14,
            marginBottom: 8,
          },
        })}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }}>
          {() => <HomeStack openDrawer={toggleDrawer} />}
        </Tab.Screen>
        <Tab.Screen
          name="Workouts"
          component={WorkoutsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Track"
          component={TrackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
        {isDrawerVisible && (
            <DrawerMenu
                onClose={() => setDrawerVisible(false)}
                navigation={navigation}
            />
        )}
    </View>

  );
}
