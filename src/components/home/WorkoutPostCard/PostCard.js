import { View, Image, StyleSheet } from 'react-native';
import PostHeader from './PostHeader';
import WorkoutStatsBar from './WorkoutStatsBar';
import PostActions from './PostActions';
import PostComments from './PostComments';

const PostCard = () => {
    return (
        <View>
            <PostHeader
                userName="Honen"
                avatar={require('../../../assets/images/home/Honen.jpg')}
            />
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/images/home/workout-placeholder.png')}
                    style={styles.image}
                />
                <WorkoutStatsBar style={styles.workoutStatsOverlay} />
            </View>
            <PostActions />
            <PostComments />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
    },

    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
    },

    workoutStatsOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});

export default PostCard;
