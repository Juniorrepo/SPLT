import { View, ScrollView, StyleSheet } from 'react-native';
import TopBar from "../../components/common/TopBar";
import TopUsersList from "../../components/home/TopUsersList"
import COLORS from '../../constants/Colors';
import PostCard from '../../components/home/WorkoutPostCard/PostCard';
import WorkoutDetailsCard from '../../components/home/WorkoutDetailsCard/WorkoutDetailsCard';



const HomeScreen = ({ openDrawer }) => {
  return (
    <>

      <View style={styles.container}>
        <TopBar
          variant="home"
          onSearch={() => console.log("Search")}
          onNotificationPress={() => console.log("Notifications")}
          onMenuPress={openDrawer}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TopUsersList />
          <PostCard />
          <WorkoutDetailsCard />
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
});
