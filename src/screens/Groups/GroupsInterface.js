import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const GroupsInterface = ({ navigation }) => {
    const [currentView, setCurrentView] = useState('home'); // 'home', 'search', 'yourGroups'
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data
    const userStats = {
        username: '@Lorem1',
        date: '12, Aug, 2024',
        volume: '7,000',
        sets: '12',
        highestPR: '5'
    };

    const suggestedGroups = [
        {
            id: 1,
            name: 'Group Name',
            description: 'This is a description for Group',
            image: require('../../assets/images/home/user1.png'),
            members: '12k'
        },
        {
            id: 2,
            name: 'Group Name',
            description: 'This is a description for Group',
            image: require('../../assets/images/home/user2.png'),
            members: '12k'
        },
        {
            id: 3,
            name: 'Group Name',
            description: 'This is a description for Group',
            image: require('../../assets/images/home/user3.png'),
            members: '12k'
        }
    ];

    const allGroups = [
        {
            id: 1,
            name: 'Group 1',
            description: 'This is a description for Group',
            image: require('../../assets/images/home/user1.png')
        },
        {
            id: 2,
            name: 'Group 2',
            description: 'This is a description for Group 2',
            image: require('../../assets/images/home/user2.png')
        },
        {
            id: 3,
            name: 'Group 3',
            description: 'This is a description for Group 3',
            image: require('../../assets/images/home/user3.png')
        },
        {
            id: 4,
            name: 'Group 4',
            description: 'This is a description for Group 4',
            image: require('../../assets/images/home/user4.png')
        },
        {
            id: 5,
            name: 'Group 5',
            description: 'This is a description for Group 5',
            image: require('../../assets/images/home/user5.png')
        },
        {
            id: 6,
            name: 'Group 6',
            description: 'This is a description for Group 6',
            image: require('../../assets/images/home/user1.png')
        },
        {
            id: 7,
            name: 'Group 7',
            description: 'This is a description for Group 7',
            image: require('../../assets/images/home/user2.png')
        },
        {
            id: 8,
            name: 'Group 8',
            description: 'This is a description for Group 8',
            image: require('../../assets/images/home/user3.png')
        }
    ];

    const yourGroups = [
        {
            id: 1,
            name: 'Group 1',
            description: 'This is a description for Group',
            image: require('../../assets/images/home/user1.png')
        },
        {
            id: 2,
            name: 'Group 1',
            description: 'This is a description for Group',
            image: require('../../assets/images/home/user2.png')
        }
    ];

    const Header = ({ title, showSearch = false }) => (
        <LinearGradient
            colors={['#8B5CF6', '#A855F7']}
            style={styles.header}
        >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            {showSearch ? (
                <TouchableOpacity onPress={() => setCurrentView('search')}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                <View style={{ width: 24 }} />
            )}
        </LinearGradient>
    );

    const StatsCard = () => (
        <View style={styles.cardContainer}>
            <LinearGradient
                colors={['#6D28D9', '#9333EA']}
                style={styles.usernameBar}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={styles.usernameText}>{userStats.username}</Text>
                <Ionicons name="chevron-forward" size={18} color="#FFF" />
            </LinearGradient>

            <LinearGradient
                colors={['#1F1F1F', '#111']}
                style={styles.statsSection}
            >
                <View style={styles.datePill}>
                    <Text style={styles.dateText}>{userStats.date}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userStats.volume}</Text>
                    <Text style={styles.statLabel}>Volume</Text>
                </View>

                <LinearGradient
                    colors={['#6D28D9', '#9333EA']}
                    style={styles.centerStat}
                >
                    <Text style={styles.centerStatNumber}>{userStats.sets}</Text>
                    <Text style={styles.centerStatLabel}>Sets</Text>
                </LinearGradient>

                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userStats.highestPR}</Text>
                    <Text style={styles.statLabel}>Highest PR</Text>
                </View>
            </LinearGradient>
        </View>
    );

    const ActionButtons = () => (
        <View style={styles.actionButtons}>
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate('CreateGroup')}
            >
                <Text style={styles.buttonText}>Create Group</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.joinButton}
                onPress={() => navigation.navigate('InviteMembers')}
            >
                <Text style={styles.buttonText}>Join Group</Text>
            </TouchableOpacity>
        </View>
    );

    const GroupCard = ({ group, showJoinButton = false }) => (
        <View style={styles.groupCard}>
            <View style={styles.groupHeader}>

                <Image source={group.image} style={styles.groupImage} />
                <View style={styles.groupInfo}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupDescription}>{group.description}</Text>
                    {group.members && (
                        <Text style={styles.groupMembers}>{group.members}</Text>
                    )}
                </View>

                {showJoinButton ? (
                    <TouchableOpacity style={styles.joinBtn}>
                        <Text style={styles.joinBtnText}>Join</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.groupCardDetail}
                        onPress={() => navigation.navigate('GroupDetails')}
                    >
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const SuggestedGroupCard = ({ group }) => (
        <View style={styles.suggestedCard}>
            <Image source={group.image} style={styles.suggestedImage} />
            <Text style={styles.suggestedName}>{group.name}</Text>
            <Text style={styles.suggestedDescription}>{group.description}</Text>
            <Text style={styles.suggestedMembers}>{group.members}</Text>
        </View>
    );

    const ChallengeCard = () => (
        <View style={styles.challengeCard}>
            <Image
                source={require('../../assets/images/home/Honen.jpg')}
                style={styles.challengeImage}
            />
            <View style={styles.challengeOverlay}>
                <Text style={styles.challengeTitle}>Join the 30 days push ups Challenge now !</Text>
                <TouchableOpacity style={styles.challengeButton}>
                    <Text style={styles.challengeButtonText}>Join Now !</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const SearchView = () => (
        <SafeAreaView style={styles.container}>
            <Header title="Groups" />

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#666" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#666"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView style={styles.content}>
                {allGroups.map(group => (
                    <GroupCard key={group.id} group={group} showJoinButton={true} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );

    const YourGroupsView = () => (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <ChallengeCard />

                {yourGroups.map(group => (
                    <GroupCard key={group.id} group={group} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );

    const HomeView = () => (
        <SafeAreaView style={styles.container}>
            <Header title="Groups" showSearch={true} />

            <StatsCard />
            <ActionButtons />

            <View style={styles.sectionDividerContainer}>
                <LinearGradient
                    colors={['#3B2F5C', '#1E1E1E']}
                    style={styles.dividerLine}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
                <Text style={styles.sectionDividerText}>Your Groups</Text>
                <LinearGradient
                    colors={['#1E1E1E', '#3B2F5C']}
                    style={styles.dividerLine}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </View>
            {yourGroups.length > 0 ? (
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <YourGroupsView />
                </ScrollView>
            ):(
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No groups yet? Start exploring!</Text>
                    </View>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Suggested Groups</Text>
                        <TouchableOpacity>
                            <Text style={styles.showMoreText}>Show More</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.suggestedScroll}
                    >
                        {suggestedGroups.map(group => (
                            <SuggestedGroupCard key={group.id} group={group} />
                        ))}
                    </ScrollView>

                    <ChallengeCard />

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Suggested Groups</Text>
                        <TouchableOpacity>
                            <Text style={styles.showMoreText}>Show More</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.suggestedScroll}
                    >
                        {suggestedGroups.map(group => (
                            <SuggestedGroupCard key={`${group.id}-2`} group={group} />
                        ))}
                    </ScrollView>
                </ScrollView>
            )}
        </SafeAreaView>
    );

    if (currentView === 'search') {
        return <SearchView />;
    }

    return <HomeView />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },

    cardContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 16,
    },

    usernameBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    usernameText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },

    datePill: {
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        backgroundColor: '#2D2D2D',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        zIndex: 10,
    },
    dateText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },

    /** Stats Section */
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 24,
        borderWidth: 1.5,
        borderColor: '#00B2FF', // Blue border
        marginTop: 16,
        backgroundColor: '#1A1A1A', // fallback in case gradient fails
        position: 'relative',
    },

    /** Stat Items */
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    statLabel: {
        color: '#AAA',
        fontSize: 12,
    },

    /** Center Stat Highlight */
    centerStat: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 30,
        alignItems: 'center',
    },
    centerStatNumber: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    centerStatLabel: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },

    // Stats Card
    statsCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        padding: 16,
        margin: 16,
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    date: {
        fontSize: 14,
        color: '#999',
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // statItem: {
    //     alignItems: 'center',
    // },
    // statNumber: {
    //     fontSize: 18,
    //     fontWeight: '700',
    //     color: 'white',
    //     marginBottom: 4,
    // },
    // statLabel: {
    //     fontSize: 12,
    //     color: '#999',
    // },

    // Action Buttons
    actionButtons: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 20,
    },
    createButton: {
        flex: 1,
        backgroundColor: '#8B5CF6',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    joinButton: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    // Section Headers
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    showMoreText: {
        fontSize: 14,
        color: '#8B5CF6',
    },

    sectionDividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    dividerLine: {
        flex: 1,
        height: 3,
        borderRadius: 3,
        marginHorizontal: 8,
    },
    sectionDividerText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    // Empty State
    emptyState: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },

    // Group Cards
    groupCard: {
        marginBottom: 16,
    },
    groupCardDetail : {
        flexDirection: 'row',
    },
    groupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        padding: 16,
        borderRadius: 12,
    },
    groupImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    groupInfo: {
        flex: 1,
    },
    groupName: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        marginBottom: 4,
    },
    groupDescription: {
        fontSize: 14,
        color: '#999',
        marginBottom: 4,
    },
    groupMembers: {
        fontSize: 12,
        color: '#666',
    },
    joinBtn: {
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    joinBtnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },

    // Suggested Groups
    suggestedScroll: {
        marginBottom: 20,
    },
    suggestedCard: {
        width: 120,
        marginRight: 12,
        alignItems: 'center',
    },
    suggestedImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    suggestedName: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        marginBottom: 4,
    },
    suggestedDescription: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginBottom: 4,
    },
    suggestedMembers: {
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    },

    // Challenge Card
    challengeCard: {
        height: 120,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        position: 'relative',
    },
    challengeImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    challengeOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    challengeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        marginBottom: 12,
    },
    challengeButton: {
        backgroundColor: '#B57FE6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    challengeButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },

    // Search
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: 'white',
    },
});

export default GroupsInterface;