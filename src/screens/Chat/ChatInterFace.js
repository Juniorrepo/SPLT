import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image, StatusBar, SafeAreaView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ChatInterface = ({ navigation }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');

    // Mock data - replace with your actual data
    const onlineUsers = [
        { id: 1, name: 'Sammyx', avatar: require('../../assets/images/home/user1.png'), isOnline: true },
        { id: 2, name: 'Honen', avatar: require('../../assets/images/home/user2.png'), isOnline: true },
        { id: 3, name: 'xovio', avatar: require('../../assets/images/home/user3.png'), isOnline: true },
        { id: 4, name: 'Honen', avatar: require('../../assets/images/home/user4.png'), isOnline: true },
        { id: 5, name: 'ChrisMu..', avatar: require('../../assets/images/home/user5.png'), isOnline: true },
    ];

    const chatList = [
        {
            id: 1,
            name: 'Martin Randolph',
            lastMessage: 'You: What\'s that? · 9:40 AM',
            time: '9:40 AM',
            avatar: require('../../assets/images/home/user1.png'),
            unreadCount: 0,
            isOnline: true
        },
        {
            id: 2,
            name: 'Andrew Parker',
            lastMessage: 'Hi Sam. what are you doing?',
            time: '9:25 AM',
            avatar: require('../../assets/images/home/user2.png'),
            unreadCount: 0,
            isOnline: false
        },
        {
            id: 3,
            name: 'Karen Castillo',
            lastMessage: 'perfect! I\'ll see you then · Fri',
            time: 'Fri',
            avatar: require('../../assets/images/home/user3.png'),
            unreadCount: 0,
            isOnline: true
        },
        {
            id: 4,
            name: 'Missy Humphrey',
            lastMessage: 'omg that\'s AMAZING! · Fri',
            time: 'Fri',
            avatar: require('../../assets/images/home/user4.png'),
            unreadCount: 0,
            isOnline: true
        },
        {
            id: 5,
            name: 'Joshua Lawrence',
            lastMessage: 'Hey, everything ok? See... · Thu',
            time: 'Thu',
            avatar: require('../../assets/images/home/user5.png'),
            unreadCount: 0,
            isOnline: false
        }
    ];

    const messages = [
        {
            id: 1,
            text: "Hello Honen, how are you today?",
            time: "9:40 AM",
            isSent: false,
            avatar: require('../../assets/images/home/user2.png')
        },
        {
            id: 2,
            text: "Hello,I'm fine,how can I help you?",
            time: "9:41 AM",
            isSent: true
        },
        {
            id: 3,
            text: "What is the best programming language?",
            time: "9:42 AM",
            isSent: false,
            avatar: require('../../assets/images/home/user2.png')
        },
        {
            id: 4,
            text: "There are many programming languages in the market that are used for developing and building systems, applications, websites, mobile apps. All these languages are popular in their field and all the way they are unique from each other. So explain to me more",
            time: "9:43 AM",
            isSent: true
        },
        {
            id: 5,
            text: "There are many programming languages in the market that are used for developing and building systems, applications, websites, mobile apps. All these languages are popular in their field and all the way they are unique from each other. So explain to me more",
            time: "9:44 AM",
            isSent: false,
            avatar: require('../../assets/images/home/user2.png')
        }
    ];

    const OnlineUserItem = ({ user }) => (
        <TouchableOpacity style={styles.onlineUserItem}>
            <View style={styles.onlineAvatarContainer}>
                <Image source={user.avatar} style={styles.onlineAvatar} />
                {user.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <Text style={styles.onlineUserName} numberOfLines={1}>
                {user.name}
            </Text>
        </TouchableOpacity>
    );

    const ChatListItem = ({ chat, onPress }) => (
        <TouchableOpacity style={styles.chatListItem} onPress={() => onPress(chat)}>
            <View style={styles.chatAvatarContainer}>
                <Image source={chat.avatar} style={styles.chatAvatar} />
                {chat.isOnline && <View style={styles.chatOnlineIndicator} />}
            </View>
            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{chat.name}</Text>
                    <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {chat.lastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const MessageBubble = ({ message }) => (
        <View style={[
            styles.messageBubble,
            message.isSent ? styles.sentMessage : styles.receivedMessage
        ]}>
            {!message.isSent && (
                <Image source={message.avatar} style={styles.messageAvatar} />
            )}
            <View style={[
                styles.messageContent,
                message.isSent ? styles.sentMessageContent : styles.receivedMessageContent
            ]}>
                <Text style={[
                    styles.messageText,
                    message.isSent ? styles.sentMessageText : styles.receivedMessageText
                ]}>
                    {message.text}
                </Text>
            </View>
        </View>
    );

    const ChatListView = () => (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#8B5CF6', '#A855F7']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Chats</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
            </LinearGradient>

            {/* Online Users */}
            <View style={styles.onlineUsersSection}>
                <Text style={styles.sectionTitle}>Online Users</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.onlineUsersScroll}>
                    {onlineUsers.map(user => (
                        <OnlineUserItem key={user.id} user={user} />
                    ))}
                </ScrollView>
            </View>

            {/* Current Chats */}
            <View style={styles.chatListSection}>
                <View style={styles.chatListHeader}>
                    <Text style={styles.sectionTitle}>Current Chats</Text>
                    <Text style={styles.requestsText}>Requests (0)</Text>
                </View>
                <ScrollView style={styles.chatListScroll}>
                    {chatList.map(chat => (
                        <ChatListItem key={chat.id} chat={chat} onPress={setSelectedChat} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    const ChatView = () => (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#8B5CF6', '#A855F7']}
                style={styles.chatHeader}
            >
                <TouchableOpacity onPress={() => setSelectedChat(null)}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.chatHeaderInfo}>
                    <Image source={selectedChat.avatar} style={styles.headerAvatar} />
                    <Text style={styles.chatHeaderName}>{selectedChat.name}</Text>
                </View>
                <View style={styles.chatHeaderActions}>
                    <TouchableOpacity style={styles.headerAction}>
                        <Ionicons name="call" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerAction}>
                        <Ionicons name="videocam" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerAction}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Messages */}
            <ScrollView style={styles.messagesContainer}>
                {messages.map(message => (
                    <MessageBubble key={message.id} message={message} />
                ))}
            </ScrollView>

            {/* Message Input */}
            <View style={styles.messageInputContainer}>
                <TouchableOpacity style={styles.attachButton}>
                    <Ionicons name="attach" size={20} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.emojiButton}>
                    <Ionicons name="happy" size={20} color="#8B5CF6" />
                </TouchableOpacity>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Write your message"
                    placeholderTextColor="#999"
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton}>
                    <LinearGradient
                        colors={['#8B5CF6', '#A855F7']}
                        style={styles.sendButtonGradient}
                    >
                        <Ionicons name="send" size={18} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    return selectedChat ? <ChatView /> : <ChatListView />;
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

    // Online Users Section
    onlineUsersSection: {
        backgroundColor: '#1A1A1A',
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        marginHorizontal: 16,
        marginBottom: 12,
    },
    onlineUsersScroll: {
        paddingHorizontal: 12,
    },
    onlineUserItem: {
        alignItems: 'center',
        marginHorizontal: 4,
        width: 60,
    },
    onlineAvatarContainer: {
        position: 'relative',
        marginBottom: 4,
    },
    onlineAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#333',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#10B981',
        borderWidth: 2,
        borderColor: '#1A1A1A',
    },
    onlineUserName: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    },

    // Chat List Section
    chatListSection: {
        flex: 1,
        backgroundColor: '#000',
    },
    chatListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    requestsText: {
        fontSize: 14,
        color: '#8B5CF6',
    },
    chatListScroll: {
        flex: 1,
    },
    chatListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    chatAvatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    chatAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatOnlineIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#10B981',
        borderWidth: 2,
        borderColor: '#000',
    },
    chatInfo: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    chatTime: {
        fontSize: 12,
        color: '#999',
    },
    lastMessage: {
        fontSize: 14,
        color: '#999',
    },

    // Chat View
    // chatHeader: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 16,
    //     paddingVertical: 12,
    //     paddingTop: 16,
    // },
    chatHeaderInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    headerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    chatHeaderName: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    chatHeaderActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerAction: {
        marginLeft: 16,
    },

    // Messages
    messagesContainer: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    messageBubble: {
        flexDirection: 'row',
        marginVertical: 8,
        alignItems: 'flex-end',
    },
    sentMessage: {
        justifyContent: 'flex-end',
    },
    receivedMessage: {
        justifyContent: 'flex-start',
    },
    messageAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    messageContent: {
        maxWidth: '75%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
    },
    sentMessageContent: {
        backgroundColor: '#8B5CF6',
        marginLeft: 'auto',
    },
    receivedMessageContent: {
        backgroundColor: '#1A1A1A',
        marginRight: 'auto',
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    sentMessageText: {
        color: 'white',
    },
    receivedMessageText: {
        color: 'white',
    },

    // Message Input
    messageInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#1A1A1A',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    attachButton: {
        padding: 8,
        marginRight: 8,
    },
    emojiButton: {
        padding: 8,
        marginRight: 12,
    },
    messageInput: {
        flex: 1,
        backgroundColor: '#000',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: 'white',
        fontSize: 14,
        maxHeight: 100,
    },
    sendButton: {
        marginLeft: 12,
    },
    sendButtonGradient: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatInterface;