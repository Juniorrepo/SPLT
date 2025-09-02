import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../constants/theme';

const PostComments = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.likes}>Liked by sammyx and 60 others.</Text>
            <Text style={styles.comment}><Text style={styles.bold}>Honen </Text>Nothing will stop this highlight</Text>
            <Text style={styles.viewAll}>View all 30 comments</Text>
            <Text style={styles.comment}><Text style={styles.bold}>Sammyx </Text>Great work!</Text>
            <Text style={styles.comment}><Text style={styles.bold}>xovio </Text>Amazing 🔥</Text>
            <Text style={styles.date}>October 10, 2024 at 10:00 AM</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingBottom: 16,
        backgroundColor: theme.colors.background,
    },
    likes: { color: 'white', fontSize: 13, marginBottom: 4 },
    comment: { color: 'white', fontSize: 13, marginBottom: 2 },
    bold: { fontWeight: 'bold' },
    viewAll: { color: theme.colors.gray, fontSize: 13, marginVertical: 4 },
    date: { color: theme.colors.gray, fontSize: 11, marginTop: 6 },
});

export default PostComments;
