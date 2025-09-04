// screens/Groups/GroupChallengeCreateScreen.js
import React, { useMemo, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    Pressable,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../../constants/Colors";
import theme from "../../constants/theme";

const pad = (n) => n.toString().padStart(2, '0');

export default function GroupChallengeCreateScreen({ navigation, route }) {
    const [selectedExercise, setSelectedExercise] = useState(null);

    // get exercise returned from picker (optional merge)
    React.useEffect(() => {
        if (route?.params?.pickedExercise) {
            setSelectedExercise(route.params.pickedExercise);
        }
    }, [route?.params?.pickedExercise]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const [durationOpen, setDurationOpen] = useState(false);
    const [durH, setDurH] = useState(0);
    const [durM, setDurM] = useState(0);

    const [successOpen, setSuccessOpen] = useState(false);

    const canSubmit = useMemo(
        () => !!selectedExercise && !!startDate && !!endDate && (durH > 0 || durM > 0),
        [selectedExercise, startDate, endDate, durH, durM]
    );

    const formatDate = (d) => (d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}` : '');

    const openExercisePicker = () => {
        navigation.navigate('ExercisePicker', {
            // optional: you can pass a callback if preferred:
            // onPick: (it) => setSelectedExercise(it)
        });
    };

    const submit = () => {
        if (!canSubmit) return;
        // TODO: call your API here
        setSuccessOpen(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerLogo}>SPLT</Text>
                <View style={{ width: 24 }} />
            </LinearGradient>

            <View style={{ flex: 1 }}>
                {/* Title bar */}
                <View style={styles.orContainer}>
                    <LinearGradient
                        colors={COLORS.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.line}
                    />
                    <Text style={[theme.textStyles.small, styles.or]}>Group Challange</Text>
                    <LinearGradient
                        colors={COLORS.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.line}
                    />
                </View>

                {/* Card */}
                <View style={styles.card}>
                    {/* Select exercise */}
                    <TouchableOpacity style={styles.row} onPress={openExercisePicker} activeOpacity={0.85}>
                        <View>
                            <Text style={styles.rowLabel}>Select Exercise</Text>
                            <Text style={styles.rowValue}>
                                {selectedExercise ? selectedExercise.name : 'Select'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#C7B7FF" />
                    </TouchableOpacity>

                    {/* Dates */}
                    <View style={styles.rowSplit}>
                        <Pressable style={styles.inputBox} onPress={() => setShowStart(true)}>
                            <Text style={styles.inputLabel}>Start Date</Text>
                            <View style={styles.dateField}>
                                <Text style={styles.inputText}>{startDate ? formatDate(startDate) : 'dd/mm/yyyy'}</Text>
                                <Ionicons name="calendar-outline" size={18} color="#C7B7FF" />
                            </View>
                        </Pressable>

                        <Pressable style={styles.inputBox} onPress={() => setShowEnd(true)}>
                            <Text style={styles.inputLabel}>End Date</Text>
                            <View style={styles.dateField}>
                                <Text style={styles.inputText}>{endDate ? formatDate(endDate) : 'dd/mm/yyyy'}</Text>
                                <Ionicons name="calendar-outline" size={18} color="#C7B7FF" />
                            </View>
                        </Pressable>
                    </View>

                    {/* Duration */}
                    <Pressable style={styles.durationRow} onPress={() => setDurationOpen(true)}>
                        <Text style={styles.inputLabel}>Duration</Text>
                        <View style={styles.durationBubbleRow}>
                            <View style={styles.durationBubble}><Text style={styles.bubbleText}>{pad(durH)}</Text></View>
                            <Text style={styles.hmText}>h</Text>
                            <View style={styles.durationBubble}><Text style={styles.bubbleText}>{pad(durM)}</Text></View>
                            <Text style={styles.hmText}>m</Text>
                        </View>
                    </Pressable>
                </View>

                <TouchableOpacity
                    onPress={submit}
                    activeOpacity={canSubmit ? 0.85 : 1}
                    style={[styles.doneBtn, !canSubmit && { opacity: 0.45 }]}
                >
                    <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom nav (visual only) */}
            <View style={styles.bottomBar}>
                <Ionicons name="home-outline" size={22} color="#9C9C9C" />
                <Ionicons name="barbell-outline" size={22} color="#9C9C9C" />
                <Ionicons name="map-outline" size={22} color="#9C9C9C" />
                <Ionicons name="cart-outline" size={22} color="#9C9C9C" />
                <Ionicons name="person-outline" size={22} color="#9C9C9C" />
            </View>

            {/* Start Date modal */}
            {showStart && (
                <Modal transparent animationType="fade" onRequestClose={() => setShowStart(false)}>
                    <View style={styles.modalBackdrop}>
                        <View style={styles.calendarModal}>
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
                                onChange={(_, d) => {
                                    if (Platform.OS === 'android') setShowStart(false);
                                    if (d) setStartDate(d);
                                }}
                            />
                            {Platform.OS === 'ios' && (
                                <TouchableOpacity style={styles.modalClose} onPress={() => setShowStart(false)}>
                                    <Text style={styles.modalCloseText}>Close</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Modal>
            )}

            {/* End Date modal */}
            {showEnd && (
                <Modal transparent animationType="fade" onRequestClose={() => setShowEnd(false)}>
                    <View style={styles.modalBackdrop}>
                        <View style={styles.calendarModal}>
                            <DateTimePicker
                                value={endDate || (startDate || new Date())}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
                                onChange={(_, d) => {
                                    if (Platform.OS === 'android') setShowEnd(false);
                                    if (d) setEndDate(d);
                                }}
                            />
                            {Platform.OS === 'ios' && (
                                <TouchableOpacity style={styles.modalClose} onPress={() => setShowEnd(false)}>
                                    <Text style={styles.modalCloseText}>Close</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Modal>
            )}

            {/* Duration bottom sheet */}
            <Modal visible={durationOpen} transparent animationType="slide" onRequestClose={() => setDurationOpen(false)}>
                <View style={styles.sheetWrap}>
                    <View style={styles.sheet}>
                        <View style={styles.sheetHandle} />
                        <Text style={styles.sheetTitle}>Select Timer Duration</Text>

                        <View style={styles.wheelsRow}>
                            <Wheel
                                range={[...Array(13).keys()]} // 0..12h
                                selected={durH}
                                onChange={setDurH}
                                unit="h"
                            />
                            <Wheel
                                range={[...Array(60).keys()]} // 0..59m
                                selected={durM}
                                onChange={setDurM}
                                unit="m"
                            />
                        </View>

                        <TouchableOpacity style={styles.sheetDoneBtn} onPress={() => setDurationOpen(false)}>
                            <Text style={styles.sheetDoneText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Success modal */}
            <Modal visible={successOpen} transparent animationType="fade" onRequestClose={() => setSuccessOpen(false)}>
                <View style={styles.modalBackdrop}>
                    <LinearGradient colors={['#3B2F5C', '#1E1E1E']} style={styles.successCard}>
                        <Ionicons name="checkmark-done-circle-outline" size={46} color="#E7DAFF" />
                        <Text style={styles.successTitle}>Challenge Created!</Text>

                        <TouchableOpacity style={styles.primaryBtn} onPress={() => { setSuccessOpen(false); /* navigation.navigate('ChallengeView') */ }}>
                            <Text style={styles.primaryBtnText}>View Challenge</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryBtn} onPress={() => setSuccessOpen(false)}>
                            <Text style={styles.secondaryBtnText}>Back to Challenges</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

/** simple wheel picker */
const Wheel = ({ range, selected, onChange, unit }) => {
    const ITEM_H = 36;

    return (
        <View style={{ width: 110, alignItems: 'center' }}>
            {/* center marker lines (like picker) */}
            <View style={{ position: 'absolute', top: ITEM_H * 2, left: 0, right: 0, height: ITEM_H, borderTopColor: '#DDD', borderBottomColor: '#DDD', borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, zIndex: 2 }} />
            <FlatList
                style={{ height: ITEM_H * 5 }}
                data={range}
                keyExtractor={(i) => String(i)}
                initialScrollIndex={selected}
                getItemLayout={(_, i) => ({ length: ITEM_H, offset: ITEM_H * i, index: i })}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_H}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => {
                    const idx = Math.round(e.nativeEvent.contentOffset.y / ITEM_H);
                    onChange(range[idx] ?? 0);
                }}
                renderItem={({ item }) => (
                    <View style={{ height: ITEM_H, justifyContent: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>{pad(item)}</Text>
                    </View>
                )}
            />
            <Text style={{ color: '#9B9B9B', marginTop: 4 }}>{unit === 'h' ? 'h' : 'm'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        paddingHorizontal: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.borderColor,
    },
    or: {
        marginHorizontal: 10,
        color: theme.colors.text,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
    },
    headerLogo: { color: '#fff', fontWeight: '800', fontSize: 22, letterSpacing: 2 },

    titleWrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, backgroundColor: '#0B0B0B' },
    title: { color: '#fff', fontWeight: '700', fontSize: 16 },

    card: {
        margin: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#3A314F',
        backgroundColor: '#0E0E0E',
        padding: 12,
        gap: 10,
    },

    row: {
        height: 58,
        paddingHorizontal: 12,
        backgroundColor: '#101010',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2440',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowLabel: { color: '#A9A9A9', fontSize: 12 },
    rowValue: { color: '#fff', fontWeight: '700', marginTop: 4 },

    rowSplit: { flexDirection: 'row', gap: 10 },
    inputBox: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2440',
        backgroundColor: '#101010',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    inputLabel: { color: '#A9A9A9', fontSize: 12 },
    dateField: { marginTop: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    inputText: { color: '#fff', fontWeight: '600' },

    durationRow: {
        height: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2B2440',
        backgroundColor: '#101010',
        paddingHorizontal: 12,
        paddingVertical: 8,
        justifyContent: 'space-between',
    },
    durationBubbleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
    durationBubble: {
        width: 44, height: 32, borderRadius: 6,
        backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#3B3B3B',
        alignItems: 'center', justifyContent: 'center',
    },
    bubbleText: { color: '#fff', fontWeight: '700' },
    hmText: { color: '#C1C1C1' },

    doneBtn: {
        marginHorizontal: 16,
        marginTop: 10,
        height: 48,
        borderRadius: 10,
        backgroundColor: '#5B44C8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneText: { color: '#fff', fontWeight: '700', fontSize: 15 },

    bottomBar: {
        height: 56,
        borderTopColor: '#121212',
        borderTopWidth: 1,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    /* Modals */
    modalBackdrop: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center', justifyContent: 'center',
        padding: 24,
    },
    calendarModal: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#1A1A1A',
        padding: 12,
    },
    modalClose: { marginTop: 8, alignSelf: 'flex-end', padding: 8 },
    modalCloseText: { color: '#E7DAFF', fontWeight: '700' },

    sheetWrap: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
    sheet: {
        backgroundColor: '#0F0F12',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        padding: 16,
        paddingBottom: 24,
    },
    sheetHandle: {
        alignSelf: 'center',
        width: 60,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#7C6BB7',
        marginBottom: 12,
    },
    sheetTitle: { color: '#fff', fontWeight: '700', textAlign: 'center', marginBottom: 8 },
    wheelsRow: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 6 },
    sheetDoneBtn: {
        marginTop: 14,
        height: 44,
        backgroundColor: '#5B44C8',
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'center',
    },
    sheetDoneText: { color: '#fff', fontWeight: '700' },

    successCard: {
        width: '85%',
        borderRadius: 14,
        padding: 20,
        alignItems: 'center',
        gap: 12,
    },
    successTitle: { color: '#fff', fontWeight: '800', fontSize: 16, marginTop: 4 },
    primaryBtn: {
        marginTop: 8, width: '100%', height: 44, borderRadius: 10,
        backgroundColor: '#5B44C8', alignItems: 'center', justifyContent: 'center',
    },
    primaryBtnText: { color: '#fff', fontWeight: '700' },
    secondaryBtn: {
        marginTop: 8, width: '100%', height: 44, borderRadius: 10,
        borderWidth: 1, borderColor: '#6A5AAE', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#0F0F12',
    },
    secondaryBtnText: { color: '#E7DAFF', fontWeight: '700' },
});
