import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import COLORS from '../../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

const WorkoutChartExactDesign = ({ bars, activityFilter }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const transformData = () => {
        const labels = bars.map((bar) => bar.label);

        if (activityFilter === 'All') {
            const data = bars.map((bar) => {
                const segments = bar.segments;
                return [
                    segments.find((s) => s.key === 'sets')?.value || 0,
                    segments.find((s) => s.key === 'volume')?.value || 0,
                    segments.find((s) => s.key === 'minutes')?.value || 0,
                    segments.find((s) => s.key === 'maxRep')?.value || 0,
                ];
            });

            return {
                labels,
                legend: ['Sets', 'Volume', 'Minutes', 'Max Rep'],
                data,
                barColors: ['#6645AB', '#6645ABBF', '#6645AB99', '#6645AB66'],
            };
        } else {
            const keyMap = { Sets: 'sets', Volume: 'volume', Minutes: 'minutes', 'Max Rap': 'maxRep' };
            const key = keyMap[activityFilter];
            const colorMap = {
                Sets: '#6645AB',
                Volume: '#6645ABBF',
                Minutes: '#6645AB99',
                'Max Rap': '#6645AB66',
            };

            const data = bars.map((bar) => {
                const segment = bar.segments.find((s) => s.key === key);
                return [segment?.value || 0];
            });

            return {
                labels,
                legend: [activityFilter],
                data,
                barColors: [colorMap[activityFilter]],
            };
        }
    };

    const data = transformData();

    const chartConfig = {
        backgroundColor: COLORS.background,
        backgroundGradientFrom: COLORS.background,
        backgroundGradientTo: COLORS.background,
        decimalPlaces: 1,
        color: () => 'white', // fixed
        style: { borderRadius: 0 },
        propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: '#404040',
            strokeWidth: 1,
        },
        fillShadowGradient: 'transparent',
        fillShadowGradientOpacity: 0,
        // may be ignored by chart-kit, but safe to keep
        propsForLabels: {
            fontSize: 16,
        },
    };

    const handleBarClick = (index) => {
        const bar = bars[index];
        const weekData = { week: bar.label, segments: bar.segments };

        const chartWidth = screenWidth - 40;
        const barWidth = chartWidth / bars.length; // dynamic
        const barCenter = barWidth * index + barWidth / 2 + 20;

        setTooltipPosition({ x: barCenter, y: 16 }); // y inside chart area
        setSelectedData(weekData);
        setTooltipVisible(true);
    };

    const CustomTooltip = () => {
        if (!tooltipVisible || !selectedData) return null;

        return (
            // This overlay is confined to the chart only
            <Pressable
                style={styles.chartOverlay}
                onPress={() => setTooltipVisible(false)}
            >
                <View
                    style={[
                        styles.tooltipContainer,
                        {
                            left: Math.max(10, Math.min(tooltipPosition.x - 90, screenWidth - 190)),
                            top: tooltipPosition.y,
                        },
                    ]}
                >
                    <View style={styles.tooltip}>
                        <View style={styles.tooltipContent}>
                            {selectedData?.segments.map((segment) => {
                                const colors = {
                                    maxRep: '#c6baff',
                                    minutes: '#957BFF',
                                    volume: '#7b61ff',
                                    sets: '#5a46d5',
                                };
                                const names = {
                                    maxRep: 'Max Rep',
                                    minutes: 'Minutes',
                                    volume: 'Volume',
                                    sets: 'Sets',
                                };

                                if (activityFilter !== 'All') {
                                    const keyMap = { Sets: 'sets', Volume: 'volume', Minutes: 'minutes', 'Max Rap': 'maxRep' };
                                    const filterKey = keyMap[activityFilter];
                                    if (segment.key !== filterKey) return null;
                                }

                                return (
                                    <View key={segment.key} style={styles.tooltipRow}>
                                        <View style={[styles.tooltipDot, { backgroundColor: colors[segment.key] }]} />
                                        <Text style={styles.tooltipText}>
                                            {names[segment.key]} = {segment.value}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={styles.tooltipArrow} />
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.chartWrapper}>
                <StackedBarChart
                    data={data}
                    width={screenWidth - 40}
                    height={280}
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                    style={styles.chart}
                    hideLegend
                    showValuesOnTopOfBars={false}
                />

                {/* invisible hit zones to detect bar taps */}
                <View style={styles.clickableOverlay}>
                    {data.labels.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.clickableBar,
                                {
                                    left: `${12.5 + index * 25}%`, // fixed string template
                                    width: '20%',
                                },
                            ]}
                            onPress={() => handleBarClick(index)}
                            activeOpacity={0.3}
                        />
                    ))}
                </View>

                {/* Tooltip that stays INSIDE the chart */}
                <CustomTooltip />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    chartWrapper: {
        position: 'relative',
        width: screenWidth - 40,
        height: 300,
    },
    chart: {
        borderRadius: 0,
        fontSize: 20,
    },

    // big invisible touch layer over the bars
    clickableOverlay: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        height: 200,
        flexDirection: 'row',
        zIndex: 10,
    },
    clickableBar: {
        height: '100%',
        position: 'absolute',
    },

    // overlay used ONLY inside the chart
    chartOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 20,
    },

    tooltipContainer: {
        position: 'absolute',
        zIndex: 30,
    },
    tooltip: {
        backgroundColor: 'rgba(75, 75, 95, 0.95)',
        borderRadius: 12,
        padding: 16,
        minWidth: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 12, // for Android layering
        position: 'relative',
    },
    tooltipContent: { gap: 8 },
    tooltipRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    tooltipDot: { width: 10, height: 10, borderRadius: 5 },
    tooltipText: { color: 'white', fontSize: 14, fontWeight: '500' },
    tooltipArrow: {
        position: 'absolute',
        bottom: -6,
        left: '50%',
        marginLeft: -6,
        width: 12,
        height: 12,
        backgroundColor: 'rgba(75, 75, 95, 0.95)',
        transform: [{ rotate: '45deg' }],
        borderRadius: 1,
    },
});

export default WorkoutChartExactDesign;
