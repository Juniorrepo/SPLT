import { forwardRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import SheetGradientBackground from './SheetGradientBackground';
import InnerShadowCard from './InnerShadowCard';
import theme from '../../constants/theme';

const ActionIcon = ({ icon, family = 'AntDesign' }) => {
    const IconSet = family === 'Feather' ? Feather : 'MaterialIcons' ? MaterialIcons : AntDesign;
    return <IconSet name={icon} size={22} color={theme.colors.text} />;
};
const ActionSheet = forwardRef(({ actions = [] }, ref) => {
    const snapPoints = useMemo(() => [220], []);

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
            opacity={0.7}
        />
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            handleIndicatorStyle={styles.indicator}
            backgroundComponent={SheetGradientBackground}
        >

            <BottomSheetView style={styles.container}>
                <View style={styles.row}>
                    {actions.map((action) => (
                        <TouchableOpacity key={action.key} onPress={action.onPress} activeOpacity={0.92} style={{ flex: 1 }}>
                            <InnerShadowCard>
                                <View style={styles.iconWrap}>

                                    <ActionIcon icon={action.icon} family={action.family} />

                                </View>
                                <Text style={styles.actionLabel}>{action.label}</Text>
                            </InnerShadowCard>
                        </TouchableOpacity>
                    ))}
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default ActionSheet;

const styles = StyleSheet.create({
    indicator: {
        width: 54,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.colors.text,
        opacity: 0.95,
        marginTop: Platform.select({ ios: 6, android: 10 }),
        alignSelf: 'center',
    },
    container: {
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: 25,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 14,
    },
    iconWrap: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionLabel: {
        ...theme.textStyles.title,
        fontSize: 14,
        marginTop: 8,
        marginBottom: 2,
        textAlign: "center"
    },

});
