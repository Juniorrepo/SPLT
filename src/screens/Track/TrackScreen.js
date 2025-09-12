import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import TopBar from "../../components/common/TopBar";
import COLORS from "../../constants/Colors";

import SectionTitle from "../../components/Track/SectionTitle";
import ActivityLevelsHeader from "../../components/Track/ActivityLevelsHeader";
import StepsCard from "../../components/Track/StepsCard/StepsCard";
import MonthProgress from "../../components/Track/MonthProgress";
import AchievementsGrid from "../../components/Track/Achievements/AchievementsGrid";

const TrackScreen = ({ navigation, openDrawer }) => {
    const [monthDate, setMonthDate] = useState(new Date()); // today by default

    return (
        <View style={styles.container}>
            <TopBar
                variant="home"
                onSearch={() => {}}
                onNotificationPress={() => {}}
                onMenuPress={openDrawer}
            />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SectionTitle title="Activity Levels" style={{ marginTop: 20 }} />
                <ActivityLevelsHeader streakDays={29} activityPercent={100} />

                <StepsCard
                    title="Today's Steps"
                    stats={{ minutes: 13, distanceKm: 0.6, kcal: 42 }}
                    // Tue ➜ Mon to match your mock
                    weeklySteps={[600, 1900, 650, 550, 2400, 2100, 3500]}
                    legendLeft={{ dotColor: "#9B6CFF", label: "This Week" }}
                    legendRight="Avg. 2035 steps"
                    bubbleColor="#7B57F2"
                    lineColor="#9B6CFF"
                    tickValues={[4000, 3000, 2000, 1000, 500]}
                />

                <MonthProgress
                    title="This Month's Progress"
                    date={monthDate}
                    onChangeMonth={setMonthDate}
                    // highlight these in-month days as circles
                    activeDays={[1, 2]}
                />

                <SectionTitle title="Achievements" />
                <AchievementsGrid
                    items={[
                        { id: "longest", title: "LONGEST WORKOUT", value: "2hr", icon: "bar-chart-outline", variant: "gradient" },
                        { id: "minutes", title: "TOTAL MINUTES", value: "850 min", icon: "time-outline", variant: "gradient" },
                        {
                            id: "prs",
                            title: "PERSONAL RECORDS",
                            value: "4",
                            icon: "trophy-outline",
                            variant: "outline",
                            onPress: () => navigation.navigate("PersonalRecords"),
                        },
                        {
                            id: "sets",
                            title: "SETS",
                            value: "45",
                            icon: "star-outline",
                            variant: "outline",
                            onPress: () => navigation.navigate("SetsRecords"),
                        },
                        {
                            id: "volume",
                            title: "VOLUME",
                            value: "1200",
                            icon: "barbell-outline",
                            variant: "outline",
                            onPress: () => navigation.navigate("VolumeRecords"),
                        },
                        {
                            id: "measure",
                            title: "Measurements",
                            value: "",
                            icon: "clipboard-outline",
                            variant: "outline",
                            onPress: () => {},
                        },
                    ]}
                />
            </ScrollView>
        </View>
    );
};

export default TrackScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContainer: { paddingBottom: 90 },
});
