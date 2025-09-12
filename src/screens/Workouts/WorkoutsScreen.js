// WorkoutsScreen.jsx — full screen with clickable Gradient Action Sheet
import React, {useMemo, useRef, useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    Pressable,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import TopBar from '../../components/common/TopBar';
import COLORS from '../../constants/Colors';
import ContinueWorkoutModal from "../../components/workouts/WorkoutPage/ContinueWorkoutModal";

/********************** THEME **************************/
const PRIMARYCOLORS = {
    bg: '#0E0A14',
    surface: '#171120',
    surfaceAlt: '#1E1729',
    surfaceMuted: '#221A34',
    primary: '#7B57F2',
    primaryAlt: '#9B6CFF',
    text: '#F2F1F6',
    textDim: '#CFCBDA',
    textMuted: '#9C95AD',
    stroke: '#2B2340',
    danger: '#F87171',
};
const GRADIENT = COLORS?.gradient || [PRIMARYCOLORS.primaryAlt, PRIMARYCOLORS.primary];

const RADIUS = 10;
const GAP = 12;
const {width} = Dimensions.get('window');

/********************** MOCK DATA **************************/
const SUGGESTIONS = [
    {
        id: 's1',
        title: 'Daily Abdominal Workout',
        subtitle: '10 exercises • 15m',
        image:
            'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        id: 's2',
        title: 'Yoga for Beginner',
        subtitle: '15 exercises • 30m',
        image:
            'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
];

const WORKOUTS = [
    {
        id: 'w1',
        title: 'Cardio',
        description: 'squats, hip hinges (deadlifts), lunges, sit ups, box jumps...',
        brand: 'SPLT',
        progress: 0.68,
        image:
            'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        id: 'w2',
        title: 'Cardio',
        description: 'squats, hip hinges (deadlifts), lunges, sit ups, box jumps...',
        brand: 'SPLT',
        progress: 0.42,
        image:
            'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        id: 'w3',
        title: 'Cardio',
        description: 'squats, hip hinges (deadlifts), lunges, sit ups, box jumps...',
        brand: 'SPLT',
        progress: 0.81,
        image:
            'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
];

const FOLDERS = [
    {
        id: 'f1',
        title: 'Your Favorite Exercises',
        image:
            'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        id: 'f2',
        title: 'Back + Squats',
        image:
            'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        id: 'f3',
        title: 'Pro Split',
        image:
            'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
];

const imgSource = (img) => (typeof img === 'string' ? {uri: img} : img);

/********************** SCREEN **************************/
export default function WorkoutsScreen({navigation, openDrawer}) {
    const [query, setQuery] = useState('');
    const [actionFor, setActionFor] = useState(null); // workout for action sheet
    const [continueVisible, setContinueVisible] = useState(false);

    useEffect(() => {
        const workoutInProgress = true;
        if (workoutInProgress) setContinueVisible(true);
    }, []);
    const filteredWorkouts = useMemo(() => {
        if (!query) return WORKOUTS;
        return WORKOUTS.filter((w) =>
            [w.title, w.description].join(' ').toLowerCase().includes(query.toLowerCase()),
        );
    }, [query]);

    return (
        <View style={styles.container}>
            <TopBar
                variant="workouts"
                onSearch={() => {
                }}
                onNotificationPress={() => {
                }}
                onMenuPress={openDrawer}
            />

            <FlatList
                data={filteredWorkouts}
                keyExtractor={(i) => i.id}
                contentContainerStyle={styles.listContent}
                renderItem={({item}) => <WorkoutCard workout={item}
                                                     onStart={() => navigation.navigate('WorkoutPlanScreen')}
                                                     onMore={() => setActionFor(item)}/>}
                ListHeaderComponent={
                    <>
                        <View style={{paddingTop: 12}}>
                            <Text style={styles.screenTitle}>Explore Workouts</Text>
                            <View style={styles.searchRow}>
                                <View style={styles.searchInputWrap}>
                                    <Icon name="search" size={18} color={PRIMARYCOLORS.textMuted}/>
                                    <TextInput
                                        placeholder="Search your workout"
                                        placeholderTextColor={PRIMARYCOLORS.textMuted}
                                        value={query}
                                        onChangeText={setQuery}
                                        style={styles.searchInput}
                                    />
                                </View>
                            </View>
                        </View>

                        <SectionHeader
                            title="Suggestions"
                            style={{marginTop: 20, marginBottom: 15}}
                            rightActionLabel="Explore page"
                            onRightAction={() => navigation.navigate("WorkoutsExplore")}
                        />
                        <SuggestionsCarousel items={SUGGESTIONS}/>

                        <SectionHeader title={`My Workouts (${filteredWorkouts.length})`}/>
                    </>
                }
                ListFooterComponent={
                    <>
                        <View style={styles.rowSpace}>
                            <ActionButton label="Create New Workout" icon="add"
                                          onPress={() => navigation.navigate('CreateWorkoutName')}/>
                            <ActionButton label="Rest Day" icon="moon" onPress={() => {
                            }} variant="ghost"/>
                        </View>

                        <SectionHeader
                            title={`My Folders (${FOLDERS.length})`}
                            rightActionLabel="Create New Folder"
                            onRightAction={() => navigation.navigate("CreateFolder")}
                        />
                        <FolderGrid
                            folders={FOLDERS}
                            onPressFolder={(folder) =>
                                navigation.navigate("WorkoutsStart", { folderId: folder.id })
                            }
                        />

                        <View style={{height: 24}}/>
                    </>
                }
            />

            <GradientActionSheet
                visible={!!actionFor}
                onClose={() => setActionFor(null)}
                onAction={(type) => {
                    // handle actions here (navigate, share, etc.)
                    console.log('Action:', type, 'for', actionFor?.id);
                    setActionFor(null);
                }}
            />

            <ContinueWorkoutModal
                visible={continueVisible}
                onRequestClose={() => setContinueVisible(false)}
                onContinue={() => {
                    setContinueVisible(false);
                    navigation.navigate("StartWorkoutPage");
                }}
                onDiscard={() => {
                    setContinueVisible(false);
                }}
            />
        </View>
    );
}

function SectionHeader({title, style, rightActionLabel, onRightAction}) {
    return (
        <View style={[styles.sectionHeaderRow, style]}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {rightActionLabel ? (
                <TouchableOpacity style={styles.rightLink} onPress={onRightAction}>
                    <Text style={styles.rightLinkText}>{rightActionLabel}</Text>
                    <Icon name="arrow-forward" size={16} color={PRIMARYCOLORS.text}/>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

function SuggestionsCarousel({items}) {
    return (
        <FlatList
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 12, marginBottom: 20}}
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={({item}) => (
                <TouchableOpacity>
                    <View style={styles.suggestCardV2}>
                        <Image source={imgSource(item.image)} style={styles.suggestImageV2}/>
                        <View style={{paddingHorizontal: 8, paddingBottom: 8, paddingTop: 6}}>
                            <Text style={styles.suggestLink} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text style={styles.suggestMeta} numberOfLines={1}>
                                {item.subtitle}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}

function WorkoutCard({workout, onMore, onStart}) {
    return (
        <View style={styles.workoutCard}>
            <View style={styles.workoutRow}>
                <Image source={imgSource(workout.image)} style={styles.workoutThumb}/>

                <View style={{flex: 1, paddingLeft: 12}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.workoutTitle} numberOfLines={1}>
                            {workout.title}
                        </Text>
                        <TouchableOpacity style={{marginLeft: 'auto'}} onPress={() => onMore?.(workout)}>
                            <Icon name="ellipsis-vertical" size={18} color={PRIMARYCOLORS.textDim}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.workoutDesc} numberOfLines={2}>
                        {workout.description}
                    </Text>

                    <TouchableOpacity activeOpacity={0.9} style={{marginTop: 10}} onPress={onStart}>
                        <LinearGradient colors={GRADIENT} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={styles.startBtn}>
                            <Text style={styles.startBtnText}>Start Workout</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function ActionButton({label, icon, onPress, variant = 'solid'}) {
    const ghost = variant === 'ghost';
    return (
        <TouchableOpacity
            style={[styles.actionBtn, ghost && {
                backgroundColor: PRIMARYCOLORS.surface,
                borderWidth: 1,
                borderColor: PRIMARYCOLORS.stroke
            }]}
            onPress={onPress}
        >
            <Icon name={icon} size={16} color={ghost ? PRIMARYCOLORS.text : '#fff'}/>
            <Text style={[styles.actionBtnText, ghost && {color: PRIMARYCOLORS.text}]}>{label}</Text>
        </TouchableOpacity>
    );
}

function FolderGrid({ folders, onPressFolder }) {
    return (
        <FlatList
            data={folders}
            keyExtractor={(i) => i.id}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            contentContainerStyle={{ rowGap: 12, marginTop: 15, marginBottom: 8 }}
            renderItem={({ item }) => (
                <Pressable style={{ flex: 1 }} onPress={() => onPressFolder?.(item)}>
                    <FolderCard folder={item} />
                </Pressable>
            )}
            scrollEnabled={false}
        />
    );
}
function FolderCard({folder}) {
    if (!folder) return <View style={[styles.folderCard, {opacity: 0}]}/>;
    return (
        <View style={styles.folderCard}>
            <Image source={imgSource(folder.image)} style={styles.folderImage}/>
            <LinearGradient colors={GRADIENT} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.folderOverlay}>
                <Text style={styles.folderOverlayText} numberOfLines={1}>
                    {folder.title}
                </Text>
            </LinearGradient>
        </View>
    );
}

/********************** GRADIENT ACTION SHEET **************************/
function GradientActionSheet({visible, onClose, onAction, closeOnAction = true}) {
    const slideY = useRef(new Animated.Value(120)).current;
    const fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideY, {
                    toValue: 0,
                    duration: 220,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true
                }),
                Animated.timing(fade, {toValue: 1, duration: 180, useNativeDriver: true}),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideY, {
                    toValue: 120,
                    duration: 200,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true
                }),
                Animated.timing(fade, {toValue: 0, duration: 180, useNativeDriver: true}),
            ]).start();
        }
    }, [visible]);

    const handle = (type) => {
        onAction?.(type);
        if (closeOnAction) onClose?.();
    };

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
            {/* Backdrop */}
            <Animated.View style={[styles.backdrop, {opacity: fade}]}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose}/>
            </Animated.View>

            {/* Sheet */}
            <Animated.View style={[styles.sheetWrap, {transform: [{translateY: slideY}]}]}>
                <LinearGradient colors={[PRIMARYCOLORS.primary, 'rgba(25,19,37,0.96)']} start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}} style={styles.sheetCard}>
                    <View style={styles.handle}/>

                    <View style={styles.actionRow}>
                        <ActionIcon icon="link-outline" label="Link" onPress={() => handle('link')}/>
                        <ActionIcon icon="create-outline" label="Edit" onPress={() => handle('edit')}/>
                        <ActionIcon icon="share-outline" label="Share" onPress={() => handle('share')}/>
                        <ActionIcon icon="trash-outline" label="Delete" danger onPress={() => handle('delete')}/>
                    </View>

                    <View style={styles.homeIndicator}/>
                </LinearGradient>
            </Animated.View>
        </Modal>
    );
}

function ActionIcon({icon, label, onPress, danger}) {
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [
                styles.actionIcon,
                pressed && {backgroundColor: 'rgba(255,255,255,0.12)'},
            ]}
        >
            <Icon name={icon} size={20} color={danger ? PRIMARYCOLORS.danger : PRIMARYCOLORS.text}
                  style={{marginBottom: 6}}/>
            <Text style={[styles.actionIconText, danger && {color: PRIMARYCOLORS.danger}]}>{label}</Text>
        </Pressable>
    );
}

/********************** STYLES **************************/
const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: PRIMARYCOLORS.bg},
    listContent: {paddingBottom: 32, gap: GAP, paddingHorizontal: 16},

    screenTitle: {color: PRIMARYCOLORS.text, fontSize: 30, opacity: 0.9, marginBottom: 10},
    searchRow: {flexDirection: 'row', gap: 8, alignItems: 'center'},
    searchInputWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: PRIMARYCOLORS.surface,
        borderRadius: RADIUS,
        paddingHorizontal: 12,
        height: 44,
        borderWidth: 1,
        borderColor: PRIMARYCOLORS.stroke,
    },
    searchInput: {color: PRIMARYCOLORS.text, flex: 1, paddingVertical: 0},

    sectionHeaderRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
    sectionTitle: {color: PRIMARYCOLORS.text, fontSize: 20, fontWeight: '600'},
    rightLink: {flexDirection: 'row', alignItems: 'center', gap: 6},
    rightLinkText: {color: PRIMARYCOLORS.text, opacity: 0.9, fontSize: 16},

    suggestCardV2: {width: width * 0.62, backgroundColor: 'transparent', borderRadius: 16},
    suggestImageV2: {width: '100%', height: 180, borderRadius: 16},
    suggestLink: {color: '#fff', fontSize: 18, fontWeight: '400', paddingHorizontal: 16},
    suggestMeta: {color: PRIMARYCOLORS.textMuted, fontSize: 12, marginTop: 2, paddingHorizontal: 16},

    workoutCard: {
        backgroundColor: PRIMARYCOLORS.surface,
        borderRadius: RADIUS,
        borderWidth: 1,
        borderColor: PRIMARYCOLORS.stroke,
        padding: 12,
    },
    workoutRow: {flexDirection: 'row', alignItems: 'flex-start'},
    workoutThumb: {width: 100, height: 100, borderRadius: 12, marginTop: 10, backgroundColor: PRIMARYCOLORS.surfaceAlt},
    workoutTitle: {color: PRIMARYCOLORS.text, fontSize: 20, fontWeight: '700'},
    workoutDesc: {color: PRIMARYCOLORS.textDim, fontSize: 16, lineHeight: 18, marginTop: 4, marginBottom: 5},

    startBtn: {height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center'},
    startBtnText: {color: '#fff', fontWeight: '700'},

    rowSpace: {flexDirection: 'row', gap: 12, marginTop: 12, marginBottom: 20},
    actionBtn: {
        flex: 1,
        backgroundColor: PRIMARYCOLORS.primary,
        height: 50,
        borderRadius: RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    actionBtnText: {color: '#fff', fontWeight: '600', fontSize: 12},

    // Folder cards with border and rounded top, overlay gradient label
    folderCard: {
        marginTop: 15,
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: PRIMARYCOLORS.stroke,
        backgroundColor: PRIMARYCOLORS.surface,
    },
    folderImage: {width: '100%', height: 200},
    folderOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 14,
    },
    folderOverlayText: {color: '#fff', fontWeight: '400'},

    // Action sheet
    backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)'},
    sheetWrap: {position: 'absolute', left: 0, right: 0, bottom: 0},
    sheetCard: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
    },
    handle: {
        alignSelf: 'center',
        width: 44,
        height: 5,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginBottom: 12
    },
    actionRow: {flexDirection: 'row', justifyContent: 'space-between', gap: 12},
    actionIcon: {
        flex: 1,
        height: 72,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.18)',
        backgroundColor: 'rgba(255,255,255,0.06)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIconText: {color: PRIMARYCOLORS.text, fontSize: 12, fontWeight: '600'},
    homeIndicator: {
        alignSelf: 'center',
        width: 120,
        height: 5,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.92)',
        marginTop: 14
    },
});
