import { View } from "react-native";
import COLORS from "../../constants/Colors";

export default function Divider({ h = 2, color = COLORS.primaryDark, mt = 12, mb = 12 }) {
    return <View style={{ height: h, backgroundColor: color, marginTop: mt, marginBottom: mb }} />;
}
