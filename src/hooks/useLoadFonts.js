import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  useFonts as useRubikFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';

export const useLoadFonts = () => {
  return useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });
};
