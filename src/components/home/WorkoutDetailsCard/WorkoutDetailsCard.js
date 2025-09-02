
import { View, StyleSheet } from 'react-native';
import PostHeader from '../WorkoutPostCard/PostHeader';
import PostActions from '../WorkoutPostCard/PostActions';
import PostComments from '../WorkoutPostCard/PostComments';
import WorkoutTitleBar from "./molecules/WorkoutTitleBar"
import WorkoutGrid from "./molecules/WorkoutGrid"
import MuscleSplit from "./molecules/MuscleSplit"
import WorkoutStats from "./molecules/WorkoutStats"
import theme from '../../../constants/theme';
import WorkoutStatsBar from '../WorkoutPostCard/WorkoutStatsBar';
import DayStreak from './molecules/DayStreak';

const WorkoutDetailsCard = () => {
    return (
        <>
            <PostHeader
                userName="Honen"
                avatar={require('../../../assets/images/home/Honen.jpg')}
            />
            <View style={styles.card}>
                <WorkoutTitleBar />
                <WorkoutGrid />
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: 16,
                    marginBottom: 12,
                }}>
                    <MuscleSplit />
                    <DayStreak />
                </View>

                <WorkoutStatsBar />
            </View>
            <PostActions />
            <PostComments />
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        marginVertical: 20,

    },

});

export default WorkoutDetailsCard;
