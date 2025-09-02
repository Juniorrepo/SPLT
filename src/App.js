import AppNavigator from "./navigation/AppNavigator";
import { useLoadFonts } from "./hooks/useLoadFonts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
export default function App() {
  const [fontsLoaded] = useLoadFonts();
  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      {/* <AuthProvider> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      {/* </AuthProvider> */}
    </SafeAreaProvider>
  );
}
