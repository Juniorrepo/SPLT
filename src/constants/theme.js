import COLORS from "./Colors";

export default {
  colors: COLORS,

  fonts: {
    regular: "Roboto_400Regular",
    medium: "Roboto_500Medium",
    bold: "Roboto_700Bold",
    rubikRegular: "Rubik_400Regular",
    rubikMedium: "Rubik_500Medium",
    rubikBold: "Rubik_700Bold",
  },

  textStyles: {
    title: {
      fontFamily: "Roboto_700Bold",
      fontSize: 22,
      fontWeight: "bold",
      color: COLORS.text,
      textAlign: "center",
      marginBottom: 20,

    },
    subtitle: {
      fontFamily: "Roboto_400Regular",
      fontSize: 16,
      color: COLORS.text,
      textAlign: "center",
      marginBottom: 10,
    },
    body: {
      fontFamily: "Roboto_400Regular",
      fontSize: 14,
      color: COLORS.text,
    },
    small: {
      fontFamily: "Roboto_400Regular",
      fontSize: 13,
      color: COLORS.text,
      textAlign: "center",
    },
  },
};
