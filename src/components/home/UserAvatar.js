
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../../constants/theme';


const UserAvatar = ({ name, avatar }) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarWrapper}>
                <Image source={avatar} style={styles.avatar} />
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                {name}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 80,
        marginHorizontal: 1,
    },
    avatarWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    name: {
        ...theme.textStyles.small,
        marginTop: 6,
        maxWidth: '100%',
    },
});

export default UserAvatar;
