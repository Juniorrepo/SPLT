import MaskedView from '@react-native-masked-view/masked-view';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../../../constants/Colors';
import { View } from 'react-native';

const GradientProgressBar = ({
    progress = 0.5,
    height = 6,
    borderRadius = 4,
    colors = COLORS.postCardGradient,
    style,
}) => {
    return (
        <View
            style={[
                {
                    backgroundColor: COLORS.progressBarColor,
                    height,
                    borderRadius,
                    overflow: 'hidden',
                },
                style,
            ]}
        >
            <MaskedView
                maskElement={
                    <Progress.Bar
                        progress={progress}
                        width={null}
                        height={height}
                        borderRadius={borderRadius}
                        color="black"
                        unfilledColor="transparent"
                        borderWidth={0}
                    />
                }
            >
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ height, borderRadius }}
                />
            </MaskedView>
        </View>
    );
};

export default GradientProgressBar;
