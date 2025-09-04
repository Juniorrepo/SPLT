import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import theme from '../../../constants/theme';
import ShareModal from './ShareModal';

const PostHeader = ({ userName, avatar, postId }) => {
    const navigation = useNavigation();
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [showLinkCopied, setShowLinkCopied] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const handleCopyLink = useCallback(async () => {
        try {
            // Copy link to clipboard
            await Clipboard.setStringAsync(`https://app.splt.com/workout/${postId}`);
            setShowActionSheet(false);
            setShowLinkCopied(true);

            // Hide the "Link copied" message after 2 seconds
            setTimeout(() => {
                setShowLinkCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    }, [postId]);

    const handleDelete = useCallback(() => {
        setShowActionSheet(false);
        setTimeout(() => {
            setShowDeleteModal(true);
        }, 100);
    }, []);

    const confirmDelete = useCallback(() => {
        setShowDeleteModal(false);
        setShowDeleteMessage(true);
        setTimeout(() => {
            setShowDeleteMessage(false);
        }, 2000);
    }, [postId]);

    const ActionSheetItem = ({ icon, iconFamily, label, onPress, destructive = false }) => (
        <TouchableOpacity
            style={styles.actionItem}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.actionIconContainer, destructive && styles.destructiveIcon]}>
                {iconFamily === 'MaterialIcons' && (
                    <MaterialIcons name={icon} size={22} color={destructive ? '#FF4444' : '#fff'} />
                )}
                {iconFamily === 'AntDesign' && (
                    <AntDesign name={icon} size={22} color={destructive ? '#FF4444' : '#fff'} />
                )}
                {iconFamily === 'Feather' && (
                    <Feather name={icon} size={22} color={destructive ? '#FF4444' : '#fff'} />
                )}
            </View>
            <Text style={[styles.actionLabel, destructive && styles.destructiveLabel]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            <LinearGradient
                colors={theme.colors.postCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <View style={styles.left}>
                    <Image source={avatar} style={styles.avatar} />
                    <Text style={styles.userName}>{userName}</Text>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity
                        style={styles.workoutBtn}
                        onPress={() => navigation.navigate('WorkoutDetails')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.workoutText}>View Workout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowActionSheet(true)}
                        style={styles.moreButton}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="more-vert" size={23} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Link Copied Notification */}
            {showLinkCopied && (
                <View style={styles.linkCopiedContainer}>
                    <View style={styles.linkCopiedNotification}>
                        <AntDesign name="link" size={16} color="#4CAF50" />
                        <Text style={styles.linkCopiedText}>Link copied to clip board</Text>
                    </View>
                </View>
            )}

            {showDeleteMessage && (
                <View style={styles.linkCopiedContainer}>
                    <View style={styles.linkCopiedNotification}>
                        <AntDesign name="delete" size={16} color="#4CAF50" />
                        <Text style={styles.linkCopiedText}>Your post has been deleted</Text>
                    </View>
                </View>
            )}

            {/* Custom Action Sheet Modal */}
            <Modal
                visible={showActionSheet}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowActionSheet(false)}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={styles.modalBackground}
                        activeOpacity={1}
                        onPress={() => setShowActionSheet(false)}
                    />
                    <View style={styles.actionSheet}>
                        <View style={styles.actionSheetHandle} />

                        <ActionSheetItem
                            icon="link"
                            iconFamily="AntDesign"
                            label="Link"
                            onPress={handleCopyLink}
                        />

                        <ActionSheetItem
                            icon="mode-edit-outline"
                            iconFamily="MaterialIcons"
                            label="Edit"
                            onPress={() => {
                                setShowActionSheet(false);
                                navigation.navigate('WorkoutDetails');
                            }}
                        />

                        <ActionSheetItem
                            icon="share"
                            iconFamily="Feather"
                            label="Share"
                            onPress={() => {
                                setShowActionSheet(false);
                                setTimeout(() => {
                                    setShowShareModal(true);
                                }, 100);
                            }}
                        />

                        <View style={styles.separator} />

                        <ActionSheetItem
                            icon="delete"
                            iconFamily="AntDesign"
                            label="Delete"
                            onPress={handleDelete}
                            destructive={true}
                        />
                    </View>
                </View>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDeleteModal(false)}
            >
                <View style={styles.deleteModalOverlay}>
                    <View style={styles.deleteModal}>
                        <Text style={styles.deleteTitle}>Delete Workout Post?</Text>
                        <Text style={styles.deleteMessage}>
                            This post will be permanently deleted,{'\n'}but your workout data will stay saved.
                        </Text>

                        <View style={styles.deleteActions}>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={confirmDelete}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowDeleteModal(false)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Share Modal */}
            <ShareModal
                visible={showShareModal}
                onClose={() => setShowShareModal(false)}
                postTitle="Your Post"
                userName={userName}
            />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8
    },
    userName: {
        ...theme.textStyles.subtitle,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 0,
        fontSize: 18
    },
    workoutBtn: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderRadius: 10,
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    workoutText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    },
    moreButton: {
        marginLeft: 10,
        padding: 5,
    },

    // Link Copied Notification
    linkCopiedContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        alignItems: 'center',
        paddingTop: 60,
    },
    linkCopiedNotification: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    linkCopiedText: {
        color: '#6645AB',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },

    // Action Sheet Modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    actionSheet: {
        backgroundColor: '#2D2D2D',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 34,
        paddingHorizontal: 0,
    },
    actionSheetHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#666',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 20,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    actionIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    destructiveIcon: {
        backgroundColor: 'rgba(255, 68, 68, 0.1)',
    },
    actionLabel: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
    destructiveLabel: {
        color: '#FF4444',
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 20,
        marginVertical: 8,
    },

    // Delete Modal
    deleteModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    deleteModal: {
        backgroundColor: 'rgba(140, 94, 200, 0.17)',
        borderRadius: 20,
        padding: 28,
        width: '85%',
        maxWidth: 300,
        alignItems: 'center',
    },
    deleteTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    deleteMessage: {
        fontSize: 12,
        color: '#CCCCCC',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    deleteActions: {
        width: '100%',
        gap: 0,
    },
    cancelButton: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#fff',
    },
    deleteButton: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    deleteButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#FF4757',
    },
});

export default PostHeader;