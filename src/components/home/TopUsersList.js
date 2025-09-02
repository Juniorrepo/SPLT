import { Text, View, StyleSheet } from 'react-native';
import theme from '../../constants/theme';
import { ScrollView } from 'react-native';
import UserAvatar from "./UserAvatar"

const users = [
    {
        id: '1',
        name: 'Sammyx',
        avatar: require('../../assets/images/home/user1.png'),
    },
    {
        id: '2',
        name: 'xovio',
        avatar: require('../../assets/images/home/user2.png'),
    },
    {
        id: '3',
        name: 'Honen',
        avatar: require('../../assets/images/home/user3.png'),
    },
    {
        id: '4',
        name: 'xovio',
        avatar: require('../../assets/images/home/user4.png'),
    },
    {
        id: '5',
        name: 'ChrisMu..',
        avatar: require('../../assets/images/home/user5.png'),
    },
];

const TopUsersList = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top Users</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {users.map((user) => (
                    <UserAvatar key={user.id} name={user.name} avatar={user.avatar} />
                ))}
            </ScrollView>
        </View>
    );
};

export default TopUsersList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    title: {
        ...theme.textStyles.title,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 12,
    },
});
