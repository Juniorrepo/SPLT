import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Image } from 'react-native';
import { MaterialIcons, AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';

const ShareModal = ({ visible, onClose, postTitle = "Your Post", userName = "SPLT" }) => {
    const [showLinkCopied, setShowLinkCopied] = useState(false);

    const contacts = [
        { id: 1, name: 'AirDrop', type: 'airdrop', avatar: null },
        { id: 2, name: 'Ur Mom', avatar: require('../../../assets/images/home/user1.png') },
        { id: 3, name: 'Group 1', avatar: null, groupSize: '2 People' },
        { id: 4, name: 'Ur Mom', avatar: require('../../../assets/images/home/user2.png') },
        { id: 5, name: 'Ur Mom', avatar: require('../../../assets/images/home/user3.png') },
        { id: 6, name: 'Ur Mom', avatar: require('../../../assets/images/home/user5.png') },
    ];

    const socialApps = [
        { id: 1, name: 'Instagram', icon: 'instagram', color: '#E4405F', type: 'gradient' },
        { id: 2, name: 'WhatsApp', icon: 'whatsapp', color: '#25D366', type: 'solid' },
        { id: 3, name: 'Snapchat', icon: 'snapchat-ghost', color: '#FFFC00', type: 'solid' },
        { id: 4, name: 'Facebook', icon: 'facebook', color: '#1877F2', type: 'solid' },
    ];

    const actions = [
        { id: 1, label: 'Copy Link', icon: 'link', iconFamily: 'Feather', onPress: handleCopyLink },
        { id: 2, label: 'Add to Reading List', icon: 'bookmark-outline', iconFamily: 'MaterialIcons' },
        { id: 3, label: 'Add Bookmark', icon: 'bookmark', iconFamily: 'MaterialIcons' },
        { id: 4, label: 'Add to Favorites', icon: 'star-outline', iconFamily: 'MaterialIcons' },
        { id: 5, label: 'Find on Page', icon: 'search', iconFamily: 'MaterialIcons' },
        { id: 6, label: 'Edit Actions...', icon: 'more-horiz', iconFamily: 'MaterialIcons', isBlue: true },
    ];

    async function handleCopyLink() {
        try {
            await Clipboard.setStringAsync('https://app.splt.com/workout/12345');
            setShowLinkCopied(true);
            setTimeout(() => {
                setShowLinkCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    }

    const ContactItem = ({ contact }) => (
        <TouchableOpacity style={styles.contactItem} activeOpacity={0.7}>
            <View style={styles.contactAvatar}>
                {contact.type === 'airdrop' ? (
                    <View style={styles.airdropIcon}>
                        <MaterialIcons name="wifi" size={24} color="#007AFF" />
                    </View>
                ) : contact.avatar ? (
                    <Image source={contact.avatar} style={styles.avatarImage} />
                ) : (
                    <View style={[styles.avatarPlaceholder, contact.groupSize && styles.groupAvatar]}>
                        <MaterialIcons name="group" size={20} color="#666" />
                    </View>
                )}
            </View>
            <Text style={styles.contactName} numberOfLines={1}>
                {contact.name}
            </Text>
            {contact.groupSize && (
                <Text style={styles.groupSize}>{contact.groupSize}</Text>
            )}
        </TouchableOpacity>
    );

    const SocialAppItem = ({ app }) => (
        <TouchableOpacity style={styles.socialAppItem} activeOpacity={0.7}>
            <View style={[styles.socialAppIcon, { backgroundColor: app.color }]}>
                {app.name === 'Instagram' ? (
                    <LinearGradient
                        colors={['#833AB4', '#FD1D1D', '#F77737']}
                        style={styles.instagramGradient}
                    >
                        <FontAwesome5 name="instagram" size={28} color="white" />
                    </LinearGradient>
                ) : (
                    <FontAwesome5
                        name={app.icon}
                        size={28}
                        color={app.name === 'Snapchat' ? '#000' : 'white'}
                    />
                )}
            </View>
            <Text style={styles.socialAppName} numberOfLines={1}>
                {app.name}
            </Text>
        </TouchableOpacity>
    );

    const ActionItem = ({ action }) => (
        <TouchableOpacity
            style={styles.actionItem}
            onPress={action.onPress}
            activeOpacity={0.7}
        >
            <View style={styles.actionIconContainer}>
                <MaterialIcons
                    name={action.icon}
                    size={22}
                    color={action.isBlue ? '#007AFF' : '#666'}
                />
            </View>
            <Text style={[styles.actionLabel, action.isBlue && styles.blueActionLabel]}>
                {action.label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={styles.modalBackground}
                        activeOpacity={1}
                        onPress={onClose}
                    />

                    <View style={styles.shareModal}>
                        {/* Header */}
                        <View style={styles.shareHeader}>
                            <View style={styles.postInfo}>
                                <Text style={styles.postTitle}>{postTitle}</Text>
                                <Text style={styles.postSource}>{userName}</Text>
                            </View>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <MaterialIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Contacts Section */}
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.contactsScrollView}
                                contentContainerStyle={styles.contactsContainer}
                            >
                                {contacts.map((contact) => (
                                    <ContactItem key={contact.id} contact={contact} />
                                ))}
                            </ScrollView>

                            {/* Social Apps Section */}
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.socialAppsScrollView}
                                contentContainerStyle={styles.socialAppsContainer}
                            >
                                {socialApps.map((app) => (
                                    <SocialAppItem key={app.id} app={app} />
                                ))}
                            </ScrollView>

                            {/* Actions Section */}
                            <View style={styles.actionsSection}>
                                {actions.map((action, index) => (
                                    <View key={action.id}>
                                        <ActionItem action={action} />
                                        {index < actions.length - 1 && <View style={styles.actionSeparator} />}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Link Copied Notification */}
            {showLinkCopied && (
                <View style={styles.linkCopiedContainer}>
                    <View style={styles.linkCopiedNotification}>
                        <Feather name="link" size={16} color="#007AFF" />
                        <Text style={styles.linkCopiedText}>Link copied to clipboard</Text>
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    shareModal: {
        backgroundColor: '#1C1C1E',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '85%',
        paddingBottom: 34, // Safe area
    },
    shareHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#38383A',
    },
    postInfo: {
        flex: 1,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    postSource: {
        fontSize: 13,
        color: '#8E8E93',
    },
    closeButton: {
        padding: 4,
    },

    // Contacts Section
    contactsScrollView: {
        marginTop: 20,
    },
    contactsContainer: {
        paddingHorizontal: 16,
        paddingRight: 32,
    },
    contactItem: {
        alignItems: 'center',
        marginRight: 16,
        width: 70,
    },
    contactAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 8,
        overflow: 'hidden',
    },
    airdropIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#38383A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitial: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    contactName: {
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 2,
    },
    groupSize: {
        fontSize: 10,
        color: '#8E8E93',
        textAlign: 'center',
    },

    // Social Apps Section
    socialAppsScrollView: {
        marginTop: 20,
    },
    socialAppsContainer: {
        paddingHorizontal: 16,
        paddingRight: 32,
    },
    socialAppItem: {
        alignItems: 'center',
        marginRight: 16,
        width: 70,
    },
    socialAppIcon: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    instagramGradient: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialAppName: {
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
    },

    // Actions Section
    actionsSection: {
        marginTop: 32,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    actionIconContainer: {
        width: 24,
        alignItems: 'center',
        marginRight: 16,
    },
    actionLabel: {
        fontSize: 16,
        color: '#FFFFFF',
        flex: 1,
    },
    blueActionLabel: {
        color: '#007AFF',
    },
    actionSeparator: {
        height: 0.5,
        backgroundColor: '#38383A',
        marginLeft: 40,
    },

    // Link Copied Notification
    linkCopiedContainer: {
        position: 'absolute',
        top: 60,
        left: 16,
        right: 16,
        zIndex: 1001,
        alignItems: 'center',
    },
    linkCopiedNotification: {
        backgroundColor: '#2C2C2E',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#38383A',
    },
    linkCopiedText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },
});

export default ShareModal;