import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../constants/theme';

export default function SheetGradientBackground({ children, style, radius = 16 }) {
    const fadeDark = theme.colors.primaryDark; 
    const fadeLight = 'rgba(255,255,255,0.10)';
    const edge = 150; 

    return (
        <View style={[styles.wrap, { borderRadius: radius }, style]}>
            {/* Left edge */}
            <LinearGradient
                colors={[fadeDark, 'transparent']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.edge, { width: edge, left: 0 }]}
            />

            {/* Right edge */}
            <LinearGradient
                colors={['transparent', fadeDark]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.edge, { width: edge, right: 0 }]}
            />

            {/* Main horizontal background */}
            <LinearGradient
                colors={[theme.colors.primaryDark, '#5b4171ff', theme.colors.primaryDark]}
                locations={[0, 1, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Soft light overlay */}
            <LinearGradient
                colors={[fadeLight, 'transparent', 'transparent']}
                locations={[0, 0.25, 1]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={{ position: 'relative' }}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    edge: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 2,
    },
});
